/**
 * Purges the Cloudflare edge cache for every URL in the built sitemap, then
 * checks that the edge really serves the build. Runs at the end of
 * `npm run deploy`, after the new assets are live:
 *
 *   npm run purge                 purges, then checks; needs the two env vars
 *   npm run purge -- --dry-run    prints what it would purge, sends nothing
 *   npm run purge -- --check-only runs the check alone, no purge, no token
 *   npm run purge -- --html-only  pages only, no RSC payloads
 *   npm run purge -- --no-check   purge without the check afterwards
 *
 * Why this exists: a deploy replaces the Worker's assets but leaves whatever
 * Cloudflare already holds at the edge. On 27.10.2026 /tesla/ served the
 * Finnish page for five days after English moved to the root, from an edge copy
 * that never revalidated, while the origin served the new page correctly. The
 * HTML goes out as "max-age=0, must-revalidate" and the edge still answered
 * HIT, so correct cache headers are not enough on their own.
 *
 * Credentials come from the environment and are never committed:
 *   CLOUDFLARE_API_TOKEN   token whose only permission is Zone / Cache Purge
 *   CLOUDFLARE_ZONE_ID     zone id for the domain, on the Cloudflare overview
 *
 * Pages alone are not enough. Client side navigation renders from the RSC
 * payload beside each page (index.txt, see scripts/postbuild.mjs), so a stale
 * payload shows old content under the right URL, which is the same bug wearing
 * a different hat. Both are purged unless --html-only says otherwise.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SITEMAP = join("out", "sitemap.xml");
const API = "https://api.cloudflare.com/client/v4";
// Cloudflare accepts 100 URLs per purge request on Free, Pro and Business.
const BATCH = 100;

// The three pages the October 2026 incident turned on: the two roots that tell
// the languages apart, and the page that was actually stale.
const CHECK_PATHS = ["/", "/tesla/", "/fi/tesla/"];
const ATTEMPTS = 3;
const WAIT_MS = 5000;

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const htmlOnly = args.has("--html-only");
const checkOnly = args.has("--check-only");
const skipCheck = args.has("--no-check");

if (!existsSync(SITEMAP)) {
  console.error(`purge: ${SITEMAP} not found. Run npm run build first.`);
  process.exit(1);
}

// The sitemap is the list of URLs that exist, written from lib/routes.ts and
// checked against the export by scripts/verify.mjs. Reading it here keeps this
// script from holding a second, drifting copy of the same list.
const pages = [...readFileSync(SITEMAP, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (pages.length === 0) {
  console.error(`purge: ${SITEMAP} lists no URLs.`);
  process.exit(1);
}

const origin = new URL(pages[0]).origin;
const urls = htmlOnly
  ? pages
  : pages.flatMap((url) => (url.endsWith("/") ? [url, `${url}index.txt`] : [url]));

if (dryRun) {
  console.log(urls.join("\n"));
  console.log(`purge: ${urls.length} URLs from ${pages.length} pages, dry run, nothing sent`);
  process.exit(0);
}

/* --- Purge ---------------------------------------------------------------- */

/*
 * Nothing below calls process.exit(). On Windows, exiting while fetch's
 * keepalive sockets are still closing trips a libuv assertion and the process
 * dies with 127 instead of the code it meant to return, which would fail a
 * deploy that had in fact succeeded. These set process.exitCode and return.
 */
async function purge() {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const zone = process.env.CLOUDFLARE_ZONE_ID;
  if (!token || !zone) {
    console.error("purge: CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID must both be set.");
    console.error("purge: the token needs the Zone / Cache Purge permission and nothing else.");
    console.error("purge: run with --dry-run to list the URLs without credentials.");
    return false;
  }

  let sent = 0;
  for (let i = 0; i < urls.length; i += BATCH) {
    const files = urls.slice(i, i + BATCH);
    const response = await fetch(`${API}/zones/${zone}/purge_cache`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ files }),
    });
    // Cloudflare answers 200 with success:false for things like a bad zone id,
    // so the status alone does not say whether anything was purged.
    const body = await response.json().catch(() => ({}));
    if (!response.ok || body.success !== true) {
      const detail = (body.errors ?? []).map((e) => `${e.code} ${e.message}`).join("; ");
      console.error(`purge: failed on URLs ${i + 1} to ${i + files.length} (HTTP ${response.status})`);
      console.error(`purge: ${detail || "no detail returned"}`);
      return false;
    }
    sent += files.length;
  }
  console.log(`purge: ${sent} URLs purged, ${pages.length} pages${htmlOnly ? "" : " plus RSC payloads"}`);
  return true;
}

/* --- Check ----------------------------------------------------------------
 * Asks the edge for the pages the way a visitor would and compares what comes
 * back with the files just deployed. A GET, not a HEAD: the title and the lang
 * live in the body, and HEAD can be answered from different cache state. No
 * cache busting query and no no-cache header either, deliberately. Both would
 * reach past the cached object and report success while a stale copy sits there
 * serving everyone else, which is the failure this check exists to catch.
 * -------------------------------------------------------------------------*/

const identity = (html) => ({
  title: html.match(/<title>([^<]*)<\/title>/)?.[1] ?? null,
  lang: html.match(/<html[^>]*\slang="([^"]+)"/)?.[1] ?? null,
});

const expected = new Map();

function readBuilt() {
  for (const path of CHECK_PATHS) {
    const file = join("out", path.slice(1), "index.html");
    if (!existsSync(file)) {
      console.error(`purge: ${file} is not in the build, so ${path} cannot be checked.`);
      console.error("purge: update CHECK_PATHS in scripts/purge-cache.mjs if the route moved.");
      return false;
    }
    expected.set(path, identity(readFileSync(file, "utf8")));
  }
  return true;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function compare(path) {
  const want = expected.get(path);
  let response;
  try {
    response = await fetch(`${origin}${path}`, { redirect: "follow" });
  } catch (error) {
    return `${path}: request failed (${error.message})`;
  }
  if (!response.ok) return `${path}: HTTP ${response.status}`;
  const got = identity(await response.text());
  const cache = response.headers.get("cf-cache-status") ?? "none";
  if (got.lang !== want.lang) return `${path}: lang is "${got.lang}", build has "${want.lang}" (cf-cache-status ${cache})`;
  if (got.title !== want.title) return `${path}: title is "${got.title}", build has "${want.title}" (cf-cache-status ${cache})`;
  return null;
}

async function check() {
  if (!readBuilt()) return false;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    const problems = (await Promise.all(CHECK_PATHS.map(compare))).filter(Boolean);
    if (problems.length === 0) {
      console.log(`purge: edge matches the build on ${CHECK_PATHS.length} pages (attempt ${attempt})`);
      return true;
    }
    // A purge is not instant at every edge, so one stale answer on the first
    // look is expected rather than alarming. Three looks, five seconds apart.
    if (attempt < ATTEMPTS) {
      console.log(`purge: ${problems.length} page(s) still stale, retrying in ${WAIT_MS / 1000}s`);
      await sleep(WAIT_MS);
      continue;
    }
    console.error(`purge: the edge is still serving something else after ${ATTEMPTS} attempts:`);
    console.error(problems.map((p) => `  ${p}`).join("\n"));
    return false;
  }
  return false;
}

const purged = checkOnly || (await purge());
const verified = purged && !skipCheck ? await check() : purged;
process.exitCode = verified ? 0 : 1;

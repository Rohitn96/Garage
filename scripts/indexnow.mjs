/**
 * Tells IndexNow that the site changed, so Bing and the other participating
 * engines recrawl within minutes instead of whenever they next come round.
 * Runs at the end of `npm run deploy`, after the new pages are live:
 *
 *   npm run indexnow                submits every URL in the built sitemap
 *   npm run indexnow -- --dry-run   prints what it would submit, sends nothing
 *
 * Why this matters here: Bing is not only Bing. It is the index behind
 * DuckDuckGo and behind ChatGPT's search, so a page Bing has not crawled is
 * missing from more places than its own result list. The site is new, which is
 * exactly when crawl frequency is lowest and a nudge is worth most.
 *
 * Google does NOT take part in IndexNow. Google recrawls on its own schedule,
 * and Search Console's URL inspection is the only way to ask it directly.
 *
 * The key is public by design: IndexNow verifies ownership by fetching
 * https://revampmotors.fi/<key>.txt and checking it contains the same key, so
 * the file in public/ and the constant here have to stay in step. There is no
 * secret to leak and nothing to rotate.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SITEMAP = join("out", "sitemap.xml");
const KEY = "4382771ad3b2f5b427d4d05a69654d08";
const ENDPOINT = "https://api.indexnow.org/IndexNow";
/** IndexNow accepts 10000 URLs per request; the site is nowhere near that. */
const MAX_URLS = 10000;

const dryRun = process.argv.includes("--dry-run");

if (!existsSync(SITEMAP)) {
  console.error(`indexnow: ${SITEMAP} not found. Run npm run build first.`);
  process.exit(1);
}

const urls = [...readFileSync(SITEMAP, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length === 0) {
  console.error(`indexnow: ${SITEMAP} lists no URLs.`);
  process.exit(1);
}
if (urls.length > MAX_URLS) {
  console.error(`indexnow: ${urls.length} URLs is over the ${MAX_URLS} limit for one request.`);
  process.exit(1);
}

const host = new URL(urls[0]).host;
const keyLocation = `https://${host}/${KEY}.txt`;

if (dryRun) {
  console.log(urls.join("\n"));
  console.log(`indexnow: ${urls.length} URLs for ${host}, key at ${keyLocation}, dry run, nothing sent`);
  process.exit(0);
}

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation, urlList: urls }),
});

/*
 * 200 accepted, 202 accepted but the key is still being checked. Both are
 * fine. 403 means the key file did not match, which on a fresh key usually
 * means the deploy carrying public/<key>.txt has not landed yet.
 */
if (response.status === 200 || response.status === 202) {
  console.log(`indexnow: ${urls.length} URLs submitted for ${host} (HTTP ${response.status})`);
} else {
  const detail = await response.text().catch(() => "");
  console.error(`indexnow: rejected with HTTP ${response.status}. ${detail.slice(0, 300)}`);
  if (response.status === 403) console.error(`indexnow: check that ${keyLocation} is live and contains the key.`);
  process.exitCode = 1;
}

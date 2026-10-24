/**
 * Checks the built site in out/ against the release criteria. Run after a build:
 *   npm run verify
 *
 *   1. every internal link and asset reference resolves to a file in out/
 *   2. sitemap.xml lists exactly the exported pages
 *   3. canonical is self-referencing; hreflang (fi, en, x-default) is
 *      symmetrical between every pair of translations
 *   4. every page has a unique title and meta description
 *   5. every JSON-LD block parses
 *   6. no pricing language in user-facing HTML (scripts stripped)
 *   7. no em or en dashes anywhere in tracked source files
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import { execSync } from "node:child_process";

const OUT = "out";
const ORIGIN = "https://revampmotors.fi";
const problems = [];
const fail = (msg) => problems.push(msg);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

// The not-found page is noindex and has no translation, so it is not a "page" here.
const htmlFiles = walk(OUT).filter((f) => f.endsWith("index.html") && !/[\\/]404[\\/]/.test(f));
const toPath = (file) => "/" + file.slice(OUT.length + 1).replace(/\\/g, "/").replace(/index\.html$/, "");
const pages = new Map(htmlFiles.map((f) => [toPath(f), readFileSync(f, "utf8")]));

function resolves(href) {
  const clean = decodeURIComponent(href.split("#")[0].split("?")[0]);
  if (!clean) return true;
  const target = join(OUT, clean);
  if (clean.endsWith("/")) return existsSync(join(target, "index.html"));
  return existsSync(target) || existsSync(`${target}.html`) || existsSync(join(target, "index.html"));
}

// 1. Links and assets
for (const [path, html] of pages) {
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const href = m[1].replace(/&amp;/g, "&");
    if (href.startsWith("//")) continue;
    if (!resolves(href)) fail(`broken link on ${path}: ${href}`);
  }
}

// 2. Sitemap
const sitemap = readFileSync(join(OUT, "sitemap.xml"), "utf8");
const listed = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(ORIGIN, "")));
for (const path of pages.keys()) if (!listed.has(path)) fail(`page missing from sitemap: ${path}`);
for (const path of listed) if (!pages.has(path)) fail(`sitemap lists a page that does not exist: ${path}`);

// 3. Canonical and hreflang
const alternates = new Map();
for (const [path, html] of pages) {
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]?.replace(ORIGIN, "");
  if (canonical !== path) fail(`canonical mismatch on ${path}: ${canonical}`);
  const alts = {};
  for (const m of html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/gi)) alts[m[1]] = m[2].replace(ORIGIN, "");
  if (!alts.fi || !alts.en || !alts["x-default"]) fail(`hreflang incomplete on ${path}: ${JSON.stringify(alts)}`);
  if (alts.fi !== path && alts.en !== path) fail(`hreflang on ${path} does not include itself`);
  alternates.set(path, alts);
}
for (const [path, alts] of alternates) {
  for (const lang of ["fi", "en"]) {
    const other = alternates.get(alts[lang]);
    if (!other) fail(`hreflang ${lang} on ${path} points at a missing page: ${alts[lang]}`);
    else if (other.fi !== alts.fi || other.en !== alts.en || other["x-default"] !== alts["x-default"])
      fail(`hreflang not symmetrical between ${path} and ${alts[lang]}`);
  }
}

// 4. Unique titles and descriptions
const seen = { title: new Map(), description: new Map() };
for (const [path, html] of pages) {
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!title) fail(`no title on ${path}`);
  if (!description) fail(`no description on ${path}`);
  for (const [kind, value] of [["title", title], ["description", description]]) {
    if (!value) continue;
    if (seen[kind].has(value)) fail(`duplicate ${kind} on ${path} and ${seen[kind].get(value)}`);
    seen[kind].set(value, path);
  }
}

// 5. JSON-LD
let blocks = 0;
for (const [path, html] of pages) {
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    blocks++;
    try {
      const data = JSON.parse(m[1]);
      // The launch inspection's Offer is the one place a price is allowed.
      const priced = data["@type"] === "Offer" ? "" : JSON.stringify(data);
      if (priced.match(/"price"|priceRange|priceCurrency|currenciesAccepted/)) fail(`price field in JSON-LD on ${path}`);
      if (data["@type"] === "Offer" && data.price !== "99.00") fail(`Offer price is not 99.00 on ${path}`);
    } catch {
      fail(`invalid JSON-LD on ${path}`);
    }
  }
}

// 6. Pricing language in user-facing HTML
// The launch inspection price (site.config.ts, inspection.price) is the only one
// allowed; it is cut out first so that any other price still fails.
const PRICING = [/€/, /\bEUR\b/, /\/\s?hr\b/i, /hinnasto/i, /pricing/i, /\d\s?euroa?\b/i];
const ALLOWED_PRICES = /€99(?![\d.,])|(?<![\d,.])99 €/g;
for (const [path, html] of pages) {
  const visible = html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(ALLOWED_PRICES, "");
  for (const re of PRICING) if (re.test(visible)) fail(`pricing language ${re} on ${path}`);
}

// 7. Dashes in tracked source
const tracked = execSync("git ls-files", { encoding: "utf8" })
  .split("\n")
  .filter(Boolean)
  .filter((f) => !f.endsWith("package-lock.json") && existsSync(f))
  .filter((f) => [".ts", ".tsx", ".mjs", ".js", ".cjs", ".css", ".md", ".json", ".jsonc", ".txt", ".html", ""].includes(extname(f)) || f.startsWith("public/_"));
for (const file of tracked) {
  const text = readFileSync(file, "utf8");
  if (/[\u2013\u2014]/.test(text)) fail(`em or en dash in ${file}`);
}
for (const [path, html] of pages) if (/[\u2013\u2014]/.test(html)) fail(`em or en dash in built page ${path}`);

console.log(`verify: ${pages.size} pages, ${listed.size} sitemap URLs, ${blocks} JSON-LD blocks, ${tracked.length} source files`);
if (problems.length) {
  console.error(problems.map((p) => `  FAIL ${p}`).join("\n"));
  console.error(`\n${problems.length} problem(s)`);
  process.exit(1);
}
console.log("verify: all checks passed");

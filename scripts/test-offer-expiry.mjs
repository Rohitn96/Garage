/**
 * End-to-end check that the launch offer disappears after 31.12.2026.
 *
 *   node scripts/test-offer-expiry.mjs
 *
 * Builds the site twice with the clock mocked (OFFER_NOW), once on the last
 * day of the offer and once just after it, and inspects every exported page.
 * Leaves out/ as the "after" build, so run `npm run build` afterwards.
 */
import { execSync } from "node:child_process";
import { readdirSync, readFileSync, statSync, rmSync } from "node:fs";
import { join } from "node:path";

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const f = join(dir, n);
    return statSync(f).isDirectory() ? walk(f) : f.endsWith("index.html") ? [f] : [];
  });
}

function build(now) {
  rmSync(".next", { recursive: true, force: true });
  execSync("npx next build", { stdio: "ignore", env: { ...process.env, OFFER_NOW: now } });
  return walk("out").map((f) => ({ file: f, html: readFileSync(f, "utf8") }));
}

const visible = (html) => html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
const problems = [];

console.log("building as of 2026-12-31 23:00 Helsinki ...");
const before = build("2026-12-31T23:00:00+02:00");
const home = before.find((p) => /^out[\\/]index\.html$/.test(p.file)).html;
if (!home.includes('data-offer="live"')) problems.push("before: home is not marked live");
if (!home.includes('data-offer-variant="live"')) problems.push("before: home has no live offer content");
const offerFi = before.find((p) => /fi[\\/]tesla[\\/]tarkastus[\\/]/.test(p.file)).html;
if (!offerFi.includes('"@type":"Offer"')) problems.push("before: offer page has no Offer schema");
if (!offerFi.includes('"validThrough":"2026-12-31"')) problems.push("before: Offer schema lacks validThrough");
if (!offerFi.includes('"price":"124.25"')) problems.push("before: Offer schema lacks the launch price");

console.log("building as of 2027-01-01 00:00:01 Helsinki ...");
const after = build("2027-01-01T00:00:01+02:00");
for (const { file, html } of after) {
  if (html.includes('data-offer="live"')) problems.push(`after: ${file} still marked live`);
  if (html.includes('data-offer-variant="live"')) problems.push(`after: ${file} still has live offer content`);
  if (html.includes('"@type":"Offer"')) problems.push(`after: ${file} still has Offer schema`);
  const text = visible(html);
  for (const re of [/ilmai/i, /\bfree\b/i, /€/, /31\.12\.2026 asti/, /until 31/i]) {
    const m = text.match(new RegExp(`.{0,60}${re.source}.{0,60}`, re.flags));
    // The ended notice ("the launch offer ended on 31.12.2026") is expected.
    if (m && !/päättyi|ended/i.test(m[0])) problems.push(`after: ${file} mentions ${re}: "${m[0].trim()}"`);
  }
}
const navAfter = after.find((p) => /^out[\\/]fi[\\/]index\.html$/.test(p.file)).html;
if (!navAfter.includes("Varaa huolto")) problems.push('after: Finnish CTA "Varaa huolto" missing');
const enAfter = after.find((p) => /^out[\\/]index\.html$/.test(p.file)).html;
if (!enAfter.includes("Book a service")) problems.push('after: English CTA "Book a service" missing');

if (problems.length) {
  console.error(problems.map((p) => `  FAIL ${p}`).join("\n"));
  process.exit(1);
}
console.log(`offer expiry: ${before.length} pages live before, ${after.length} pages clean after. Passed.`);

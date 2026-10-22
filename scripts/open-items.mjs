/**
 * Lists everything the site still needs from the owner:
 *   - every TODO(owner) marker in the source
 *   - every site.config.ts value that is still empty, and therefore hidden
 *
 *   npm run open-items
 *
 * docs/open-items.md explains each item and what to send.
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { SITE } from "../site.config.ts";

const markers = [];
for (const file of execSync("git ls-files", { encoding: "utf8" }).split("\n").filter((f) => /\.(ts|tsx|mjs)$/.test(f))) {
  if (file === "scripts/open-items.mjs") continue;
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (line.includes("TODO(owner)")) markers.push(`${file}:${i + 1}  ${line.trim().replace(/^\*\s?|^\/\/\s?/, "")}`);
    });
}

const empty = [
  ["Weekend opening hours", !SITE.hours.weekend.saturday && !SITE.hours.weekend.sunday],
  ["Weekend appointment rule", SITE.hours.weekendAppointmentRequired === null],
  ["Free diagnosis scope confirmed", !SITE.diagnosis.confirmed],
  ["Map coordinates (geo)", !SITE.business.geo],
  ["Public profiles (sameAs)", SITE.business.sameAs.length === 0],
  ["Customer reviews", SITE.reviews.length === 0],
  ["Certificates", SITE.certificates.length === 0],
  ["Team", SITE.team.length === 0],
  ["Workshop photos", SITE.garagePhotos.length === 0],
  ["Battery report sample", !SITE.batteryReportSample],
  ["F-gas certificate (acLicensed)", !SITE.acLicensed],
  ["Analytics token", !SITE.analyticsToken && !process.env.NEXT_PUBLIC_CF_BEACON_TOKEN],
];

console.log("Still empty in site.config.ts (hidden on the site until filled):");
for (const [label, open] of empty) console.log(`  ${open ? "[ ]" : "[x]"} ${label}`);
console.log(`\nTODO(owner) markers in source (${markers.length}):`);
for (const m of markers) console.log(`  ${m}`);
console.log("\nAlso see docs/open-items.md for content to confirm and the Finnish review.");

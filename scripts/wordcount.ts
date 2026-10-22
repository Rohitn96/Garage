/**
 * Word count for every service and model page, per language.
 * Target: 500 to 800 words. Run: node scripts/wordcount.ts
 */
import { SERVICES } from "../content/services.ts";
import { MODELS } from "../content/models.ts";

const words = (value: unknown): number => {
  if (typeof value === "string") return value.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").split(/\s+/).filter(Boolean).length;
  if (Array.isArray(value)) return value.reduce((n: number, v) => n + words(v), 0);
  if (value && typeof value === "object")
    return Object.entries(value).reduce((n, [k, v]) => (k === "seo" || k === "related" ? n : n + words(v)), 0);
  return 0;
};

let failed = 0;
for (const [group, data] of [
  ["service", SERVICES],
  ["model", MODELS],
] as const) {
  for (const lang of ["fi", "en"] as const) {
    for (const [id, page] of Object.entries(data[lang])) {
      const n = words(page);
      const ok = n >= 500 && n <= 800;
      if (!ok) failed++;
      console.log(`${ok ? "ok  " : "FAIL"} ${group.padEnd(8)} ${lang} ${id.padEnd(16)} ${n}`);
    }
  }
}
if (failed) {
  console.error(`\n${failed} page(s) outside 500 to 800 words`);
  process.exit(1);
}

import type { Lang } from "@/site.config";

/** Share card facts. Kept apart from the renderer so layouts never import node:fs. */
export const OG_SIZE = { width: 1200, height: 630 };

/** Served by app/(fi)/og.png and app/(en)/en/og.png. */
export const ogImagePath = (lang: Lang) => (lang === "en" ? "/en/og.png" : "/og.png");

export function ogAlt(lang: Lang): string {
  return lang === "fi"
    ? "Revamp Motors: Tesla- ja sähköautojen huolto Helsingissä"
    : "Revamp Motors: Tesla and EV service in Helsinki";
}

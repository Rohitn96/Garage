import type { Lang } from "@/site.config";

/** Share card facts. Kept apart from the renderer so layouts never import node:fs. */
export const OG_SIZE = { width: 1200, height: 630 };

/** Served by app/(en)/og.png and app/(fi)/fi/og.png. */
export const ogImagePath = (lang: Lang) => (lang === "fi" ? "/fi/og.png" : "/og.png");

export function ogAlt(lang: Lang): string {
  return lang === "fi"
    ? "Revamp Motors: Tesla- ja sähköautojen huolto Helsingissä"
    : "Revamp Motors: Tesla and EV service in Helsinki";
}

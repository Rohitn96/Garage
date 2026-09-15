import { CONTENT } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

/**
 * Share-card facts the page metadata needs. Kept apart from the renderer
 * (lib/ogImage.tsx) so the layouts do not import node:fs or next/og.
 */
export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Where each card is served: app/(fi)/og.png and app/(en)/en/og.png.
 *
 * Route handlers rather than the `opengraph-image.tsx` convention, for two
 * reasons found in the export: inside route groups that convention emits a
 * hashed file with NO extension (so the asset server cannot send image/png),
 * and a page that sets its own `openGraph` silently drops the inherited image —
 * both Tesla pages lost it.
 */
export const ogImagePath = (lang: Lang) => (lang === "en" ? "/en/og.png" : "/og.png");

export function ogAlt(lang: Lang): string {
  const h = CONTENT.hero;
  return `Revamp Motors — ${h.headlineA[lang]} ${h.headlineAccent[lang]}`;
}

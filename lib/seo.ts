import type { Metadata } from "next";
import { SITE, type Lang } from "@/site.config";
import type { Seo } from "@/content/types";
import { ROUTES, type RouteId } from "./routes";
import { OG_SIZE, ogAlt, ogImagePath } from "./og";

const OG_LOCALE: Record<Lang, string> = { fi: "fi_FI", en: "en_FI" };

/**
 * Metadata for one page in one language: unique title and description,
 * canonical, hreflang for both languages plus x-default (English, the primary
 * language), Open Graph and Twitter.
 */
export function pageMetadata(id: RouteId, lang: Lang, seo: Seo, type: "website" | "article" = "website"): Metadata {
  const route = ROUTES[id];
  const own = route[lang];
  const title = seo.title.includes("Revamp Motors") ? { absolute: seo.title } : seo.title;
  return {
    title,
    description: seo.description,
    alternates: {
      canonical: own,
      languages: { en: route.en, fi: route.fi, "x-default": route.en },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: own,
      siteName: SITE.business.name,
      locale: OG_LOCALE[lang],
      alternateLocale: OG_LOCALE[lang === "fi" ? "en" : "fi"],
      type,
      images: [{ url: ogImagePath(lang), ...OG_SIZE, alt: ogAlt(lang), type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImagePath(lang)],
    },
  };
}

/** Shared by both root layouts. */
export const BASE_METADATA: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.business.name, template: "%s · Revamp Motors" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
};

import type { MetadataRoute } from "next";
import { SITE } from "@/site.config";
import { ROUTES, ROUTE_IDS } from "@/lib/routes";

/**
 * Static /sitemap.xml generated from the route registry, so it lists exactly
 * the pages that exist: every page in Finnish and English, each declaring both
 * languages and x-default (English). No lastmod: a build date is not a content
 * change, and an unreliable lastmod teaches Google to ignore it.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTE_IDS.flatMap((id) => {
    const route = ROUTES[id];
    const fi = `${SITE.url}${route.fi}`;
    const en = `${SITE.url}${route.en}`;
    const languages = { en, fi, "x-default": en };
    return [
      { url: en, changeFrequency: "monthly" as const, priority: route.priority, alternates: { languages } },
      { url: fi, changeFrequency: "monthly" as const, priority: route.priority, alternates: { languages } },
    ];
  });
}

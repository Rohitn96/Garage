import type { MetadataRoute } from "next";
import { SITE } from "@/site.config";
import { ROUTES, ROUTE_IDS, type RouteId } from "@/lib/routes";
import { BLOG } from "@/content/blog";

/**
 * Static /sitemap.xml generated from the route registry, so it lists exactly
 * the pages that exist: every page in Finnish and English, each declaring both
 * languages and x-default (English).
 *
 * `lastmod` appears only on the articles, because they are the only pages that
 * carry a real date of their own. It used to be absent everywhere, and before
 * that it was the build timestamp, which claimed every page changed on every
 * deploy; both Bing and Google stop trusting the field when it does that. A
 * date on the pages that have one and nothing on the rest is the honest
 * version, and it is the version a crawler can act on.
 */
export const dynamic = "force-static";

const isPost = (id: RouteId) => ROUTES[id].kind === "blog-post";

/** The article's own publication date, as written in content/blog.ts. */
function lastModified(id: RouteId): { lastModified: Date } | undefined {
  if (!isPost(id)) return undefined;
  const published = BLOG.en[id as keyof typeof BLOG.en]?.published;
  return published ? { lastModified: new Date(published) } : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTE_IDS.flatMap((id) => {
    const route = ROUTES[id];
    const fi = `${SITE.url}${route.fi}`;
    const en = `${SITE.url}${route.en}`;
    const languages = { en, fi, "x-default": en };
    const modified = lastModified(id);
    return [
      { url: en, ...modified, changeFrequency: "monthly" as const, priority: route.priority, alternates: { languages } },
      { url: fi, ...modified, changeFrequency: "monthly" as const, priority: route.priority, alternates: { languages } },
    ];
  });
}

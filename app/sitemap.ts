import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Emitted as a static /sitemap.xml at build time.
 *
 * Every page is listed in both languages, and each entry declares the other via
 * `alternates.languages`. That is what stops the English and Finnish trees from
 * competing with each other in the index: without it Google sees four URLs and
 * has to guess which are translations and which are duplicates.
 */
export const dynamic = "force-static";

const PATHS = [
  { path: "/", priority: 1 },
  { path: "/tesla/", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PATHS.flatMap(({ path, priority }) => {
    const en = `${SITE_URL}${path}`;
    const fi = `${SITE_URL}/fi${path}`;
    const languages = { en, fi, "x-default": en };

    return [
      { url: en, lastModified, changeFrequency: "monthly" as const, priority, alternates: { languages } },
      { url: fi, lastModified, changeFrequency: "monthly" as const, priority, alternates: { languages } },
    ];
  });
}

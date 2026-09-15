import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Emitted as a static /sitemap.xml at build time.
 *
 * Every page is listed in both languages — Finnish at the root, English under
 * /en/ — and each entry declares the other via `alternates.languages`. That is
 * what stops the two trees competing in the index: without it Google sees four
 * URLs and has to guess which are translations and which are duplicates.
 */
export const dynamic = "force-static";

const PATHS = [
  { path: "/", priority: 1 },
  { path: "/tesla/", priority: 0.9 },
];

/*
 * No `lastModified`. It used to be `new Date()`, which stamped every URL as
 * changed on every deploy — Google checks lastmod against the page, finds it
 * unreliable, and then ignores it for the whole site. Leaving it out is honest;
 * add a real per-page date only if one is tracked.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap(({ path, priority }) => {
    const fi = `${SITE_URL}${path}`;
    const en = `${SITE_URL}/en${path}`;
    const languages = { fi, en, "x-default": fi };

    return [
      { url: fi, changeFrequency: "monthly" as const, priority, alternates: { languages } },
      { url: en, changeFrequency: "monthly" as const, priority, alternates: { languages } },
    ];
  });
}

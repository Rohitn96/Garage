import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * The site was closed to crawlers through pre-launch (`robots: { index: false }`
 * in the layout metadata). It is now open, so it needs a robots.txt that says
 * so and points at the sitemap.
 *
 * Next emits this as a static /robots.txt during `next build`, which is the only
 * reason it works in an `output: "export"` build — there is no server to run it.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

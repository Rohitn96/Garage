import type { MetadataRoute } from "next";
import { SITE } from "@/site.config";

/** Static /robots.txt: open to crawlers, pointing at the generated sitemap. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}

import type { MetadataRoute } from "next";
import { SITE } from "@/site.config";

/** Static /manifest.webmanifest: the icons a pinned or installed site uses. */
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.business.name,
    short_name: SITE.business.name,
    description: "Tesla- ja sähköautokorjaamo Tattarisuolla, Helsingissä.",
    start_url: "/",
    lang: "fi",
    display: "standalone",
    background_color: "#0C0E10",
    theme_color: "#0C0E10",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

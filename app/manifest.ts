import type { MetadataRoute } from "next";
import { SITE } from "@/site.config";

/** Static /manifest.webmanifest: the icons a pinned or installed site uses. */
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.business.name,
    short_name: SITE.business.name,
    description: "Tesla and EV specialist garage in Tattarisuo, Helsinki.",
    start_url: "/",
    lang: "en",
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

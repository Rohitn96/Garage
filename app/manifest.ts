import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";

/**
 * The web app manifest, which is where a PINNED icon comes from.
 *
 * A single 512px `icon.png` is enough for a browser tab and nothing else. When
 * the site is pinned to a taskbar, added to a home screen or installed, the
 * operating system asks the manifest for the icon — with no manifest it falls
 * back to a downscaled favicon or, on some platforms, a generic page glyph.
 * So the mark is declared here at the sizes those surfaces actually ask for,
 * plus a `maskable` copy that fills the square: Android and Windows crop icons
 * to their own shape, and a transparent-cornered icon gets a white plate behind
 * it when they do.
 *
 * `app/favicon.ico` covers the other half of the same problem. Windows reads it
 * for taskbar pins and desktop shortcuts, and it carries six sizes down to
 * 16px, each drawn with its own padding so the arrow survives at tab size.
 *
 * Emitted as a static /manifest.webmanifest at build time, the same way
 * robots.ts and sitemap.ts are — there is no server to generate one.
 */
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS.name,
    short_name: BUSINESS.name,
    description:
      "Riippumaton täyden palvelun autokorjaamo Tattarisuolla, Helsingissä.",
    // Finnish holds the root; see lib/i18n.tsx.
    start_url: "/",
    lang: "fi",
    display: "standalone",
    background_color: "#14181B",
    theme_color: "#14181B",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

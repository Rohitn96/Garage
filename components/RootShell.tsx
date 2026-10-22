import localFont from "next/font/local";
import type { ReactNode } from "react";
import { SITE, type Lang } from "@/site.config";
import { LanguageProvider } from "@/lib/i18n";
import { headScript, isOfferLiveAtBuild } from "@/lib/offer";
import { pathOf } from "@/lib/routes";
import { businessSchema } from "@/lib/schema";
import { UI } from "@/content/ui";
import { Nav } from "./Nav";
import { OfferBanner } from "./OfferBanner";
import { Footer } from "./Footer";
import { MobileActionBar } from "./MobileActionBar";
import { JsonLd } from "./JsonLd";
import { Reveal } from "./Reveal";

/*
 * Archivo (heavy) for headings, echoing the wide letterforms of the logo; Plex
 * Sans for reading; Plex Mono for small numerals. All three are OFL licensed
 * and self-hosted from assets/fonts, so the build never depends on reaching
 * Google Fonts (it failed intermittently when it did). next/font sizes the
 * fallbacks to match, so the swap does not move the layout.
 *
 * `optional`, not `swap`: a late swap re-lays out the largest text on the page,
 * which on a slow phone is both a visible shift and a later LCP. If a face is
 * not ready by first paint, the size-matched fallback stays for this view and
 * the web font is used from cache on the next.
 */
const display = localFont({
  src: "../assets/fonts/archivo-800-latin.woff2",
  weight: "800",
  variable: "--font-display",
  display: "optional",
  adjustFontFallback: "Arial",
});
const sans = localFont({
  src: "../assets/fonts/plex-sans-latin.woff2",
  weight: "100 700",
  variable: "--font-sans",
  display: "optional",
  adjustFontFallback: "Arial",
});
const mono = localFont({
  src: [
    { path: "../assets/fonts/plex-mono-400-latin.woff2", weight: "400" },
    { path: "../assets/fonts/plex-mono-500-latin.woff2", weight: "500" },
  ],
  variable: "--font-mono",
  display: "optional",
  preload: false,
  adjustFontFallback: false,
});

const BEACON = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN || SITE.analyticsToken;

/** The <html> document, shared by the Finnish and English root layouts. */
export function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html
      lang={lang}
      data-theme="dark"
      data-offer={isOfferLiveAtBuild() ? "live" : "ended"}
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      // The head script sets theme and offer state before hydration.
      suppressHydrationWarning
    >
      {/* A root layout owns <head>; next/head is for the pages router. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript(pathOf("contact", lang)) }} />
      </head>
      <body>
        <LanguageProvider lang={lang}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-accent focus:px-4 focus:py-3 focus:text-onAccent"
          >
            {UI[lang].skip}
          </a>
          <OfferBanner lang={lang} />
          <Nav />
          <main id="main">{children}</main>
          <Footer lang={lang} />
          <MobileActionBar lang={lang} />
          <Reveal />
          <JsonLd data={businessSchema(lang)} />
          {BEACON ? (
            <script
              defer
              src="https://static.cloudflareinsights.com/beacon.min.js"
              data-cf-beacon={JSON.stringify({ token: BEACON })}
            />
          ) : null}
        </LanguageProvider>
      </body>
    </html>
  );
}

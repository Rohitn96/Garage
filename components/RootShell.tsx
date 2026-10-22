import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
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

/*
 * Archivo at an expanded width for display, echoing the wide letterforms of
 * the logo; Plex Sans for reading; Plex Mono for system labels and data.
 * next/font self-hosts them and sizes the fallbacks to match, so swapping in
 * the web font does not move the layout.
 */
const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-display", display: "swap" });
const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

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

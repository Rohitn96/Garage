import type { Metadata } from "next";
import { Instrument_Serif, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { LanguageProvider, type Lang } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { OG_SIZE, ogAlt, ogImagePath } from "@/lib/og";
import { Nav } from "./Nav";
import { StructuredData } from "./StructuredData";

// Serif display against a technical grotesque: the serif carries the voice,
// the Plex family carries the engineering.
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SKIP = { en: "Skip to content", fi: "Siirry sisältöön" } as const;

/**
 * The `<html>` document, shared by both language trees.
 *
 * English and Finnish each have their own root layout (see app/(en) and
 * app/(fi)) so that `<html lang>` and the metadata are correct in the served
 * markup rather than patched after hydration. Everything that is identical
 * between them lives here, so "add it to both" is never a thing anyone has to
 * remember.
 */
export function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <LanguageProvider lang={lang}>
          {/* The nav is fixed, so without this a keyboard user tabs through six
              links on every page before reaching any content. */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-[0.7rem] focus:uppercase focus:tracking-label focus:text-paper"
          >
            {SKIP[lang]}
          </a>
          <Nav />
          <main id="main">{children}</main>
          <StructuredData lang={lang} />
        </LanguageProvider>
      </body>
    </html>
  );
}

/* --- Metadata ------------------------------------------------------------- */

type Copy = { title: string; description: string; ogTitle: string; ogDescription: string };

const HOME: Record<Lang, Copy> = {
  en: {
    title: "Revamp Motors — Tesla & EV specialists in Helsinki",
    description:
      "Independent Tesla and EV specialists in Tattarisuo, Helsinki — and a full general garage for petrol, diesel and hybrid cars. Opening the first week of October. Price agreed before the work starts.",
    ogTitle: "Revamp Motors — Tesla & EV specialists in Helsinki",
    ogDescription:
      "Independent Tesla and EV servicing in Tattarisuo, Helsinki. Every other car, too.",
  },
  fi: {
    title: "Revamp Motors — Tesla- ja sähköautohuolto Helsingissä",
    description:
      "Riippumaton Tesla- ja sähköautokorjaamo Tattarisuolla, Helsingissä — ja täyden palvelun korjaamo bensa-, diesel- ja hybridiautoille. Avaamme lokakuun ensimmäisellä viikolla. Hinta sovitaan ennen työn aloitusta.",
    ogTitle: "Revamp Motors — Tesla- ja sähköautohuolto Helsingissä",
    ogDescription:
      "Riippumatonta Tesla- ja sähköautohuoltoa Tattarisuolla, Helsingissä. Myös kaikki muut autot.",
  },
};

const TESLA: Record<Lang, Copy> = {
  en: {
    title: "Tesla servicing in Helsinki",
    description:
      "Independent Tesla servicing in Tattarisuo, Helsinki. Model S, 3, X and Y — battery health, drive units, brakes and regen, suspension, heat pump. Warranty-safe, at independent prices.",
    ogTitle: "Tesla servicing in Helsinki — Revamp Motors",
    ogDescription: "Model S, 3, X and Y. Independent Tesla servicing in Helsinki.",
  },
  fi: {
    title: "Tesla-huolto Helsingissä",
    description:
      "Riippumatonta Tesla-huoltoa Tattarisuolla, Helsingissä. Model S, 3, X ja Y — akun kunto, voimalinja, jarrut ja regen, alusta, lämpöpumppu. Takuu säilyy, riippumattomin hinnoin.",
    ogTitle: "Tesla-huolto Helsingissä — Revamp Motors",
    ogDescription: "Model S, 3, X ja Y. Riippumatonta Tesla-huoltoa Helsingissä.",
  },
};

const OG_LOCALE: Record<Lang, string> = { en: "en_FI", fi: "fi_FI" };

/**
 * Metadata for one page in one language, with both languages cross-declared.
 *
 * `languages` is what tells Google these are translations of each other rather
 * than duplicates, and `x-default` names the one to serve when neither matches
 * the searcher. Without it the two trees compete with each other in the index.
 */
function build(lang: Lang, copy: Record<Lang, Copy>, path: string): Metadata {
  const enPath = path;
  const fiPath = `/fi${path}`;
  const c = copy[lang];
  // A title that already names the brand is used as-is; any other gets the
  // "— Revamp Motors" template from BASE_METADATA.
  const title = c.title.includes("Revamp Motors") ? { absolute: c.title } : c.title;
  return {
    title,
    description: c.description,
    alternates: {
      canonical: lang === "fi" ? fiPath : enPath,
      languages: { en: enPath, fi: fiPath, "x-default": enPath },
    },
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
      url: lang === "fi" ? fiPath : enPath,
      siteName: "Revamp Motors",
      locale: OG_LOCALE[lang],
      alternateLocale: OG_LOCALE[lang === "fi" ? "en" : "fi"],
      type: "website",
      images: [{ url: ogImagePath(lang), ...OG_SIZE, alt: ogAlt(lang), type: "image/png" }],
    },
    // Title, description and image are inherited from openGraph.
    twitter: { card: "summary_large_image" },
  };
}

/** Shared by both root layouts: the parts that never vary by page. */
export const BASE_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  // The Tesla pages' titles did not carry the brand, so a search result for
  // them read "Tesla-huolto Helsingissä" with no name attached.
  title: { default: "Revamp Motors", template: "%s — Revamp Motors" },
  // The site was `noindex` through pre-launch. It is open to crawlers now, in
  // both languages.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const homeMetadata = (lang: Lang) => build(lang, HOME, "/");
export const teslaMetadata = (lang: Lang) => build(lang, TESLA, "/tesla/");

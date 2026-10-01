import type { Metadata } from "next";
import { Instrument_Serif, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { AC_LICENSED } from "@/lib/business";
import { LanguageProvider, type Lang } from "@/lib/i18n";
import { CF_BEACON_TOKEN, SITE_URL } from "@/lib/site";
import { OG_SIZE, ogAlt, ogImagePath } from "@/lib/og";
import { Nav } from "./Nav";
import { StructuredData } from "./StructuredData";

// Serif display against a technical grotesque: the serif carries the voice,
// the Plex family carries the engineering.
// Upright only. The italic was the accent style across the site and has been
// dropped, so shipping the italic face downloaded a second font nothing used.
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
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
          {/* Cloudflare Web Analytics. Without this the dashboard has no visits
              to show; see lib/site.ts. Renders nothing until a token is set. */}
          {CF_BEACON_TOKEN ? (
            <script
              defer
              src="https://static.cloudflareinsights.com/beacon.min.js"
              data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
            />
          ) : null}
        </LanguageProvider>
      </body>
    </html>
  );
}

/* --- Metadata ------------------------------------------------------------- */

type Copy = { title: string; description: string; ogTitle: string; ogDescription: string };

/**
 * The home page leads with the general trade and names the specialism second.
 *
 * It used to be the other way round — "Tesla & EV garage in Helsinki" — which
 * described the smaller half of the work and told a petrol or diesel owner, in
 * the one line they see in a search result, that the site was not for them.
 * Tesla and EV keywords are not lost: /tesla/ is the page that should own them
 * (see TESLA below), and the specialism is named in both the title and the
 * description here.
 */
const HOME: Record<Lang, Copy> = {
  en: {
    title: "Revamp Motors — Helsinki car garage, all makes, Tesla & EV specialty",
    description:
      "Independent full-service garage in Tattarisuo, Helsinki, Finland — every make and every fuel, petrol, diesel, hybrid and electric. Tesla and EV work is our specialty, not our only trade. Price agreed before the work starts.",
    ogTitle: "Revamp Motors — Helsinki car garage, all makes, Tesla & EV specialty",
    ogDescription:
      "A full-service garage in Tattarisuo, Helsinki for every make and every fuel. Tesla and EV work is our specialty.",
  },
  fi: {
    title: "Revamp Motors — autokorjaamo Helsingissä, erikoisalana Tesla",
    description:
      "Riippumaton täyden palvelun autokorjaamo Tattarisuolla, Helsingissä — kaikki merkit ja käyttövoimat: bensa, diesel, hybridi ja sähkö. Erikoisalanamme Tesla ja sähköautot. Hinta sovitaan ennen työn aloitusta. Y-tunnus 3651428-1.",
    ogTitle: "Revamp Motors — autokorjaamo Helsingissä, erikoisalana Tesla",
    ogDescription:
      "Täyden palvelun autokorjaamo Tattarisuolla, Helsingissä — kaikille merkeille ja käyttövoimille. Erikoisalanamme Tesla ja sähköautot.",
  },
};

/**
 * The systems named here have to be ones we can actually book in. The heat pump
 * is refrigerant work, so it is listed only while AC_LICENSED says we may do it
 * — see lib/business.ts.
 */
const TESLA: Record<Lang, Copy> = {
  en: {
    title: "Tesla servicing in Helsinki, Finland",
    description: `Independent Tesla servicing in Tattarisuo, Helsinki, Finland. Model S, 3, X and Y — battery health, drive units, brakes and regen, suspension${AC_LICENSED ? ", heat pump" : ", 12 V battery"}. Warranty-safe, at independent prices.`,
    ogTitle: "Tesla servicing in Helsinki, Finland — Revamp Motors",
    ogDescription: "Model S, 3, X and Y. Independent Tesla servicing in Helsinki.",
  },
  fi: {
    title: "Tesla-huolto Helsingissä",
    description: `Riippumatonta Tesla-huoltoa Tattarisuolla, Helsingissä. Model S, 3, X ja Y — akun kunto, voimalinja, jarrut ja regen, alusta${AC_LICENSED ? ", lämpöpumppu" : ", 12 V:n apuakku"}. Takuu säilyy, riippumattomin hinnoin.`,
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
  // Finnish holds the bare path; English is prefixed. See lib/i18n.tsx.
  const fiPath = path;
  const enPath = `/en${path}`;
  const c = copy[lang];
  // A title that already names the brand is used as-is; any other gets the
  // "— Revamp Motors" template from BASE_METADATA.
  const title = c.title.includes("Revamp Motors") ? { absolute: c.title } : c.title;
  return {
    title,
    description: c.description,
    alternates: {
      canonical: lang === "fi" ? fiPath : enPath,
      // x-default is the Finnish page: this is a Helsinki garage, so Finnish is
      // what a searcher with no matching language should be given.
      languages: { fi: fiPath, en: enPath, "x-default": fiPath },
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
  // Open to crawlers in both languages.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const homeMetadata = (lang: Lang) => build(lang, HOME, "/");
export const teslaMetadata = (lang: Lang) => build(lang, TESLA, "/tesla/");

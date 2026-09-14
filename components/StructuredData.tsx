import { BUSINESS } from "@/lib/business";
import { SITE_URL } from "@/lib/site";
import type { Lang } from "@/lib/i18n";
import { ogImagePath } from "@/lib/og";

/**
 * schema.org `AutoRepair` for the shop.
 *
 * What this does: tells a crawler, unambiguously, that the site belongs to a
 * garage at this address with this business ID, so the site and the business
 * are understood as one entity.
 *
 * What it does NOT do: put the shop in the map pack. That comes from a Google
 * Business Profile, not from markup — without a profile no amount of JSON-LD
 * produces a map pin. Once the profile exists, add its Maps URL as `hasMap` and
 * the shop's social profiles as `sameAs`; that is what ties the two together
 * (and separates this shop from the unrelated Revamp Motors Ltd in the UK).
 *
 * Emitted per language so the description matches the page it sits on, sharing
 * one `@id` — that tells a crawler these are the same business described twice,
 * not two businesses.
 *
 * Deliberately omitted, because inventing them would be worse than leaving them
 * out — Google will publish whatever is here:
 *   - `telephone`, until there is a number
 *   - `openingHoursSpecification`, until there are opening hours
 *   - `geo`, which Google derives from the postal address anyway
 *
 * `brand`/`sameAs` are not set to anything Tesla-owned. An independent shop
 * naming a marque in its services must not imply affiliation in its metadata
 * either; the disclaimer in the footer says so in words, and this says nothing
 * that contradicts it.
 */
const DESCRIPTION: Record<Lang, string> = {
  en: "Independent Tesla and EV specialists in Tattarisuo, Helsinki, and a full general garage for petrol, diesel and hybrid cars.",
  fi: "Riippumaton Tesla- ja sähköautokorjaamo Tattarisuolla, Helsingissä, sekä täyden palvelun korjaamo bensa-, diesel- ja hybridiautoille.",
};

const KNOWS_ABOUT: Record<Lang, string[]> = {
  en: [
    "Tesla servicing",
    "Electric vehicle repair",
    "High-voltage battery diagnostics",
    "Brake and suspension repair",
    "Vehicle inspection repairs",
  ],
  fi: [
    "Tesla-huolto",
    "Sähköauton korjaus",
    "Ajoakun diagnostiikka",
    "Jarru- ja alustakorjaukset",
    "Katsastuskorjaukset",
  ],
};

export function StructuredData({ lang }: { lang: Lang }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${SITE_URL}/#shop`,
    name: BUSINESS.name,
    url: lang === "fi" ? `${SITE_URL}/fi/` : `${SITE_URL}/`,
    // Google's LocalBusiness guidelines ask for an image. The share card is the
    // only branded raster the site has; swap in a photo of the shop when there is one.
    // (`inLanguage` used to be here; it is not a property of AutoRepair and
    // validators flag it.)
    image: `${SITE_URL}${ogImagePath(lang)}`,
    email: BUSINESS.email,
    description: DESCRIPTION[lang],
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      postalCode: BUSINESS.postalCode,
      addressLocality: BUSINESS.city,
      addressCountry: BUSINESS.country,
    },
    // The region, not a list of municipalities. Naming neighbouring cities
    // individually is a common local-SEO habit, but the shop is in Helsinki and
    // that is the only place it should claim to be.
    areaServed: {
      "@type": "AdministrativeArea",
      name: lang === "fi" ? "Pääkaupunkiseutu" : "Greater Helsinki",
    },
    knowsAbout: KNOWS_ABOUT[lang],
    priceRange: "€€",
    currenciesAccepted: "EUR",
    foundingDate: BUSINESS.founded,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "FI Business ID",
      value: BUSINESS.companyId,
    },
    ...(BUSINESS.phone ? { telephone: BUSINESS.phone } : {}),
  };

  return (
    <script
      type="application/ld+json"
      // The payload is built from local constants, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

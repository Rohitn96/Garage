import { SITE, type Lang } from "@/site.config";
import { ROUTE_NAMES } from "@/content/ui";
import type { QA } from "@/content/types";
import { pathOf, type RouteId } from "./routes";
import { streetAddress } from "./business";
import { ogImagePath } from "./og";

/**
 * schema.org builders. Every value comes from site.config.ts or page content.
 * Nothing is emitted for a fact that is not set: no geo until the coordinates
 * are entered, no weekend hours until they are known, no sameAs until there
 * are profiles. No price appears anywhere.
 *
 * `brand` and `sameAs` never point at anything Tesla owned: an independent shop
 * must not imply affiliation in its metadata either.
 */

const abs = (path: string) => `${SITE.url}${path}`;
const SHOP_ID = `${SITE.url}/#shop`;
const b = SITE.business;

const DESCRIPTION: Record<Lang, string> = {
  fi: "Riippumaton Tesla- ja sähköautokorjaamo Tattarisuolla, Helsingissä, yli 10 vuoden yhteenlasketulla kokemuksella. Vianhaku, akku ja 12 V, jarrut, alusta ja ilmajousitus, renkaat. Arvio ennen töitä.",
  en: "Independent Tesla and EV specialist garage in Tattarisuo, Helsinki, with 10+ years of combined industry experience. Diagnostics, battery and 12 V, brakes, suspension and air suspension, tyres. Estimate before any work.",
};

const KNOWS_ABOUT: Record<Lang, string[]> = {
  fi: ["Tesla-huolto", "Sähköauton huolto", "Tesla-diagnostiikka", "12 V:n akun vaihto", "Jarruhuolto", "Ilmajousitus", "Pyöränsuuntaus"],
  en: ["Tesla servicing", "Electric vehicle servicing", "Tesla diagnostics", "12 V battery replacement", "Brake service", "Air suspension", "Wheel alignment"],
};

function openingHours() {
  const { saturday, sunday } = SITE.hours.weekend;
  const out: object[] = [];
  if (saturday) out.push({ "@type": "OpeningHoursSpecification", dayOfWeek: "https://schema.org/Saturday", opens: saturday.opens, closes: saturday.closes });
  if (sunday) out.push({ "@type": "OpeningHoursSpecification", dayOfWeek: "https://schema.org/Sunday", opens: sunday.opens, closes: sunday.closes });
  return out;
}

export function businessSchema(lang: Lang) {
  const hours = openingHours();
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": SHOP_ID,
    name: b.name,
    url: abs(pathOf("home", lang)),
    logo: abs("/logo/revamp-motors-light.png"),
    image: abs(ogImagePath(lang)),
    description: DESCRIPTION[lang],
    email: b.email,
    telephone: b.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: streetAddress(lang),
      postalCode: b.postalCode,
      addressLocality: b.city,
      addressRegion: "Uusimaa",
      addressCountry: b.country,
    },
    ...(b.geo ? { geo: { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng } } : {}),
    hasMap: b.mapsUrl,
    areaServed: [
      { "@type": "City", name: "Helsinki" },
      { "@type": "City", name: "Vantaa" },
    ],
    knowsAbout: KNOWS_ABOUT[lang],
    foundingDate: b.founded,
    identifier: { "@type": "PropertyValue", propertyID: "FI Business ID", value: b.companyId },
    ...(hours.length ? { openingHoursSpecification: hours } : {}),
    ...(b.sameAs.length ? { sameAs: [...b.sameAs] } : {}),
  };
}

export function serviceSchema(id: RouteId, lang: Lang, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${abs(pathOf(id, lang))}#service`,
    name: ROUTE_NAMES[lang][id],
    serviceType: ROUTE_NAMES[lang][id],
    description,
    url: abs(pathOf(id, lang)),
    provider: { "@id": SHOP_ID },
    areaServed: { "@type": "City", name: "Helsinki" },
  };
}

/** The launch offer. No price field, by design. Removed after 31.12.2026. */
export function offerSchema(lang: Lang, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    "@id": `${abs(pathOf("offer", lang))}#offer`,
    name: lang === "fi" ? "Ilmainen Tesla-tarkastus" : "Free Tesla inspection",
    description,
    url: abs(pathOf("offer", lang)),
    validThrough: SITE.offer.validThrough,
    availability: "https://schema.org/InStock",
    offeredBy: { "@id": SHOP_ID },
    areaServed: { "@type": "City", name: "Helsinki" },
    itemOffered: {
      "@type": "Service",
      name: lang === "fi" ? "Tesla-tarkastus" : "Tesla inspection",
      provider: { "@id": SHOP_ID },
    },
  };
}

/** Markdown style links in content become plain text in schema. */
export const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

export function faqSchema(items: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: plain(item.q),
      acceptedAnswer: { "@type": "Answer", text: plain(item.a) },
    })),
  };
}

export function breadcrumbSchema(ids: RouteId[], lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: ids.map((id, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: ROUTE_NAMES[lang][id],
      item: abs(pathOf(id, lang)),
    })),
  };
}

export function blogPostingSchema(id: RouteId, lang: Lang, post: { title: string; description: string; published: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    dateModified: post.published,
    inLanguage: lang,
    mainEntityOfPage: abs(pathOf(id, lang)),
    image: abs(ogImagePath(lang)),
    author: { "@type": "Organization", name: b.name, url: abs(pathOf("home", lang)) },
    publisher: {
      "@type": "Organization",
      name: b.name,
      logo: { "@type": "ImageObject", url: abs("/logo/revamp-motors-light.png") },
    },
  };
}

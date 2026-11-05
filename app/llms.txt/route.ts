import { SITE } from "@/site.config";
import { addressLine } from "@/lib/business";
import { ROUTE_IDS, ROUTES, pathOf, type RouteId } from "@/lib/routes";
import { seoFor } from "@/components/pages/render";

/**
 * /llms.txt: the site in one plain-text file, for language models.
 *
 * The convention (llmstxt.org) is a markdown summary plus an annotated link
 * list, so a model answering "who services a Tesla in Helsinki" can read the
 * facts and the page list without rendering 56 pages of HTML.
 *
 * Honest about its status: no engine has committed to reading llms.txt, so
 * this is cheap insurance rather than a ranking feature. It costs one build
 * step and it cannot drift, because every line is generated from the same
 * route registry and page metadata the sitemap and the pages themselves use.
 *
 * Everything here is a fact already published on the site. Nothing is written
 * for this file alone, so it cannot contradict a page.
 */
export const dynamic = "force-static";

const abs = (path: string) => `${SITE.url}${path}`;

/** The pages worth naming, in the order a reader would want them. */
const ORDER: RouteId[] = [
  "home",
  "tesla",
  "offer",
  "battery-report",
  "model-3",
  "model-y",
  "model-s",
  "model-x",
  "svc-brakes",
  "svc-suspension",
  "svc-tyres",
  "svc-electrical",
  "svc-climate",
  "ev",
  "other",
  "weekend",
  "faq",
  "about",
  "contact",
  "blog",
];

function section(title: string, ids: RouteId[], lang: "fi" | "en"): string {
  const lines = ids.map((id) => {
    const seo = seoFor(id, lang);
    return `- [${seo.title}](${abs(pathOf(id, lang))}): ${seo.description}`;
  });
  return `## ${title}\n\n${lines.join("\n")}\n`;
}

export function GET() {
  const b = SITE.business;
  const posts = ROUTE_IDS.filter((id) => ROUTES[id].kind === "blog-post");

  const body = [
    "# Revamp Motors",
    "",
    "> An independent Tesla and electric vehicle garage in Tattarisuo, Helsinki, Finland.",
    "> Tesla is the specialism; other electric cars and petrol, diesel and hybrid cars are serviced too.",
    "",
    "The site is published in English at the root and in Finnish under /fi/. Every page exists in both languages.",
    "",
    "## Facts",
    "",
    `- Name: ${b.name} (${b.companyForm}), Finnish business ID ${b.companyId}`,
    `- Address: ${addressLine("en")}, Finland`,
    `- Phone: ${b.phoneDisplay}`,
    `- Email: ${b.email}`,
    `- Map: ${b.mapsUrl}`,
    ...(b.geo ? [`- Coordinates: ${b.geo.lat}, ${b.geo.lng}`] : []),
    "- Weekdays by appointment; weekends are full working days with times confirmed when booking.",
    `- Warranty on our own work: ${SITE.warranty.long.en}`,
    `- Experience: ${SITE.experience.long.en}`,
    ...(SITE.inspection.confirmed
      ? [
          `- Launch offer: a basic general inspection for Tesla vehicles at ${SITE.inspection.price.gross} EUR including VAT ${SITE.inspection.price.vatPercent} percent, valid through ${SITE.offer.validThroughDisplay.en}.`,
        ]
      : []),
    "",
    "## Not offered",
    "",
    "- High voltage battery and powertrain repairs.",
    "- Manufacturer warranty repairs and make-specific software updates, which belong with an authorised service.",
    ...(SITE.acLicensed ? [] : ["- Refrigerant circuit work, until the F-gas certification is in hand."]),
    "",
    section("Pages in English", ORDER, "en"),
    section("Articles in English", posts, "en"),
    section("Pages in Finnish", ORDER, "fi"),
    section("Articles in Finnish", posts, "fi"),
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

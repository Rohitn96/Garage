import type { Lang } from "@/site.config";
import { pathOf } from "./routes";

export type ContactPath = "diagnosis" | "quote";

/**
 * The contact page with one of its two paths preselected. The anchor both
 * scrolls to the form and tells the form which path to open.
 */
export function contactHref(lang: Lang, path: ContactPath): string {
  const anchor = path === "diagnosis" ? (lang === "fi" ? "tarkastus" : "inspection") : lang === "fi" ? "tarjous" : "quote";
  return `${pathOf("contact", lang)}#${anchor}`;
}

export const CONTACT_ANCHORS: Record<string, ContactPath> = {
  tarkastus: "diagnosis",
  inspection: "diagnosis",
  // Older links from when the offer was called a diagnosis.
  diagnostiikka: "diagnosis",
  diagnosis: "diagnosis",
  tarjous: "quote",
  quote: "quote",
};

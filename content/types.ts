import type { RouteId } from "@/lib/routes";

/**
 * Long-form content is written as a list of blocks, not as markup, so every
 * page renders with the same typography and every internal link is checked.
 *
 * Inline links: `[text](@route-id)` for a page on this site, resolved in the
 * reader's language, or `[text](https://...)` for an external page. An unknown
 * route id fails the build.
 */
export type Block =
  | { h2: string }
  | { h3: string }
  | { p: string }
  | { ul: string[] }
  | { note: string };

export type QA = { q: string; a: string };

export type Seo = { title: string; description: string };

export type TitledItem = { title: string; body: string };

/** A Tesla service page. Target: 500 to 800 words per language. */
export type ServiceContent = {
  seo: Seo;
  /** Short name for nav, cards and breadcrumbs. */
  name: string;
  h1: string;
  lead: string;
  symptoms: TitledItem[];
  checks: TitledItem[];
  diagnosis: Block[];
  whenToBook: Block[];
  body: Block[];
  faq: QA[];
  related: RouteId[];
};

/** A Tesla model page. Target: 500 to 800 words per language. */
export type ModelContent = {
  seo: Seo;
  name: string;
  h1: string;
  lead: string;
  intro: Block[];
  issues: TitledItem[];
  checks: string[];
  winter: Block[];
  faq: QA[];
  related: RouteId[];
};

export type BlogContent = {
  seo: Seo;
  title: string;
  dek: string;
  /** ISO date. */
  published: string;
  readMinutes: number;
  body: Block[];
  related: RouteId[];
};

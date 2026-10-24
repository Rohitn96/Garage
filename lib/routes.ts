import type { Lang } from "../site.config.ts";

/**
 * Every page on the site, with its Finnish and English path.
 *
 * English holds the root; Finnish lives under /fi/ with Finnish slugs. This
 * registry is the only place a path is written: links, the language switch,
 * hreflang, canonicals, breadcrumbs and sitemap.xml all read it, so a page
 * cannot exist in one of those and be missing from another.
 */

export type RouteKind =
  | "home"
  | "hub"
  | "model"
  | "service"
  | "offer"
  | "report"
  | "page"
  | "blog-index"
  | "blog-post"
  | "legal";

/** `parent` is a route id; typed as string here only to keep the type non-circular. */
type RouteDef = { fi: string; en: string; kind: RouteKind; parent?: string; priority: number };

const r = (fi: string, en: string, kind: RouteKind, priority: number, parent?: string): RouteDef => ({
  fi: `/fi${fi}`,
  en,
  kind,
  priority,
  parent,
});

export const BLOG_POSTS = [
  { id: "post-winter", fi: "tesla-talvella-suomessa", en: "tesla-winter-care-in-finland" },
  { id: "post-12v", fi: "tesla-12-v-akun-varoitusmerkit", en: "tesla-12-v-battery-warning-signs" },
  { id: "post-brakes", fi: "jarrujen-huolto-ja-regeneratiivinen-jarrutus", en: "brake-care-with-regenerative-braking" },
  { id: "post-used", fi: "kaytetyn-teslan-ostajan-tarkistuslista", en: "used-tesla-buying-checklist" },
  { id: "post-air", fi: "tesla-ilmajousituksen-viat", en: "tesla-air-suspension-faults" },
  { id: "post-diagnosis", fi: "mita-vianhaku-oikeasti-sisaltaa", en: "what-a-diagnosis-actually-involves" },
] as const;

export type BlogPostId = (typeof BLOG_POSTS)[number]["id"];

const STATIC = {
  home: r("/", "/", "home", 1),
  tesla: r("/tesla/", "/tesla/", "hub", 0.95, "home"),
  "model-3": r("/tesla/model-3/", "/tesla/model-3/", "model", 0.8, "tesla"),
  "model-y": r("/tesla/model-y/", "/tesla/model-y/", "model", 0.8, "tesla"),
  "model-s": r("/tesla/model-s/", "/tesla/model-s/", "model", 0.8, "tesla"),
  "model-x": r("/tesla/model-x/", "/tesla/model-x/", "model", 0.8, "tesla"),
  "svc-battery": r("/tesla/akku-ja-lataus/", "/tesla/battery-and-charging/", "service", 0.85, "tesla"),
  "svc-powertrain": r("/tesla/voimalinja-ja-suurjannite/", "/tesla/powertrain-and-high-voltage/", "service", 0.8, "tesla"),
  "svc-brakes": r("/tesla/jarrut-ja-regenerointi/", "/tesla/brakes-and-regen/", "service", 0.85, "tesla"),
  "svc-suspension": r("/tesla/alusta-ja-ilmajousitus/", "/tesla/suspension-and-air-suspension/", "service", 0.85, "tesla"),
  "svc-tyres": r("/tesla/renkaat-ja-suuntaus/", "/tesla/tyres-and-alignment/", "service", 0.8, "tesla"),
  "svc-electrical": r("/tesla/sahkoviat-ja-ohjelmisto/", "/tesla/electrical-and-software/", "service", 0.8, "tesla"),
  "svc-climate": r("/tesla/ilmastointi-ja-lampopumppu/", "/tesla/climate-and-heat-pump/", "service", 0.7, "tesla"),
  offer: r("/tesla/tarkastus/", "/tesla/inspection/", "offer", 0.9, "tesla"),
  "battery-report": r("/tesla/akun-kuntoraportti/", "/tesla/battery-health-report/", "report", 0.8, "tesla"),
  ev: r("/sahkoautot/", "/electric-cars/", "page", 0.8, "home"),
  other: r("/muut-autot/", "/other-cars/", "page", 0.5, "home"),
  weekend: r("/viikonloppuhuolto/", "/weekend-service/", "page", 0.8, "home"),
  faq: r("/usein-kysyttya/", "/faq/", "page", 0.7, "home"),
  blog: r("/blogi/", "/blog/", "blog-index", 0.6, "home"),
  about: r("/meista/", "/about/", "page", 0.5, "home"),
  contact: r("/yhteystiedot/", "/contact/", "page", 0.9, "home"),
  privacy: r("/tietosuoja/", "/privacy/", "legal", 0.2, "home"),
} satisfies Record<string, RouteDef>;

export type StaticRouteId = keyof typeof STATIC;
export type RouteId = StaticRouteId | BlogPostId;

export const ROUTES: Record<RouteId, RouteDef> = {
  ...STATIC,
  ...(Object.fromEntries(
    BLOG_POSTS.map((p) => [p.id, r(`/blogi/${p.fi}/`, `/blog/${p.en}/`, "blog-post", 0.5, "blog")]),
  ) as Record<BlogPostId, RouteDef>),
};

export const ROUTE_IDS = Object.keys(ROUTES) as RouteId[];

export function isRouteId(value: string): value is RouteId {
  return value in ROUTES;
}

/** The path of a page in one language. */
export function pathOf(id: RouteId, lang: Lang): string {
  return ROUTES[id][lang];
}

/** Finds the page a path belongs to, in either language. */
export function routeByPath(path: string): { id: RouteId; lang: Lang } | null {
  const normal = path.endsWith("/") ? path : `${path}/`;
  for (const id of ROUTE_IDS) {
    if (ROUTES[id].fi === normal) return { id, lang: "fi" };
    if (ROUTES[id].en === normal) return { id, lang: "en" };
  }
  return null;
}

/** The same page in the other language, falling back to that language's home. */
export function alternatePath(path: string, to: Lang): string {
  const hit = routeByPath(path);
  return hit ? ROUTES[hit.id][to] : ROUTES.home[to];
}

/** Home first, then each ancestor, then the page itself. */
export function trail(id: RouteId): RouteId[] {
  const chain: RouteId[] = [];
  let cur: RouteId | undefined = id;
  while (cur) {
    chain.unshift(cur);
    cur = ROUTES[cur].parent as RouteId | undefined;
  }
  return chain;
}

/** Slug segments for generateStaticParams in a language tree. */
export function slugSegments(id: RouteId, lang: Lang): string[] {
  const path = ROUTES[id][lang].replace(/^\/fi(?=\/)/, "");
  return path.split("/").filter(Boolean);
}

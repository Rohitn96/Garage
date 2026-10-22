import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Lang } from "@/site.config";
import { BLOG_POSTS, ROUTES, ROUTE_IDS, slugSegments, type BlogPostId, type RouteId } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { isOfferLiveAtBuild } from "@/lib/offer";
import type { Seo } from "@/content/types";
import { HOME } from "@/content/home";
import { HUB, OFFER_PAGE, REPORT } from "@/content/tesla";
import { MODELS, MODEL_IDS, type ModelId } from "@/content/models";
import { SERVICES, SERVICE_IDS, type ServiceId } from "@/content/services";
import { ABOUT_PAGE, CONTACT_PAGE, EV_PAGE, OTHER_PAGE, PRIVACY_PAGE, WEEKEND_PAGE } from "@/content/pages";
import { FAQ } from "@/content/faq";
import { BLOG } from "@/content/blog";
import { UI } from "@/content/ui";
import { HomePage } from "./HomePage";
import { ModelPage, OfferPage, ReportPage, ServicePage, TeslaHubPage } from "./TeslaPages";
import { AboutPage, ContactPage, EvPage, FaqPage, OtherPage, PrivacyPage, WeekendPage } from "./SitePages";
import { BlogIndexPage, BlogPostPage } from "./BlogPages";

/**
 * Every page on the site is rendered and described from here, by route id.
 * The catch-all routes in app/(fi) and app/(en)/en only translate a URL into
 * an id; nothing page specific lives in the app directory.
 */

const isModel = (id: RouteId): id is ModelId => (MODEL_IDS as string[]).includes(id);
const isService = (id: RouteId): id is ServiceId => (SERVICE_IDS as string[]).includes(id);
const isPost = (id: RouteId): id is BlogPostId => BLOG_POSTS.some((p) => p.id === id);

function seoFor(id: RouteId, lang: Lang): Seo {
  if (isModel(id)) return MODELS[lang][id].seo;
  if (isService(id)) return SERVICES[lang][id].seo;
  if (isPost(id)) return BLOG[lang][id].seo;
  switch (id) {
    case "home":
      return HOME[lang].seo;
    case "tesla":
      return HUB[lang].seo;
    case "offer":
      return isOfferLiveAtBuild() ? OFFER_PAGE[lang].seoLive : OFFER_PAGE[lang].seoEnded;
    case "battery-report":
      return REPORT[lang].seo;
    case "ev":
      return EV_PAGE[lang].seo;
    case "other":
      return OTHER_PAGE[lang].seo;
    case "weekend":
      return WEEKEND_PAGE[lang].seo;
    case "faq":
      return FAQ[lang].seo;
    case "blog":
      return {
        title: lang === "fi" ? "Blogi: Teslan ja sähköauton huolto Suomessa" : "Blog: Tesla and EV servicing in Finland",
        description: UI[lang].sections.blogLead,
      };
    case "about":
      return ABOUT_PAGE[lang].seo;
    case "contact":
      return CONTACT_PAGE[lang].seo;
    case "privacy":
      return PRIVACY_PAGE[lang].seo;
  }
  throw new Error(`No SEO copy for route ${id}`);
}

export function renderRoute(id: RouteId, lang: Lang) {
  if (isModel(id)) return <ModelPage id={id} lang={lang} />;
  if (isService(id)) return <ServicePage id={id} lang={lang} />;
  if (isPost(id)) return <BlogPostPage id={id} lang={lang} />;
  switch (id) {
    case "home":
      return <HomePage lang={lang} />;
    case "tesla":
      return <TeslaHubPage lang={lang} />;
    case "offer":
      return <OfferPage lang={lang} />;
    case "battery-report":
      return <ReportPage lang={lang} />;
    case "ev":
      return <EvPage lang={lang} />;
    case "other":
      return <OtherPage lang={lang} />;
    case "weekend":
      return <WeekendPage lang={lang} />;
    case "faq":
      return <FaqPage lang={lang} />;
    case "blog":
      return <BlogIndexPage lang={lang} />;
    case "about":
      return <AboutPage lang={lang} />;
    case "contact":
      return <ContactPage lang={lang} />;
    case "privacy":
      return <PrivacyPage lang={lang} />;
  }
  notFound();
}

export function routeMetadata(id: RouteId, lang: Lang): Metadata {
  return pageMetadata(id, lang, seoFor(id, lang), isPost(id) ? "article" : "website");
}

/** Static params for one language tree's catch-all route. */
export function staticParams(lang: Lang): Array<{ slug: string[] }> {
  return ROUTE_IDS.filter((id) => id !== "home").map((id) => ({ slug: slugSegments(id, lang) }));
}

/** Resolves a catch-all slug back to its route id, or 404. */
export function idFromSlug(slug: string[], lang: Lang): RouteId {
  const path = `${lang === "en" ? "/en" : ""}/${slug.map(decodeURIComponent).join("/")}/`;
  const id = ROUTE_IDS.find((rid) => ROUTES[rid][lang] === path);
  if (!id) notFound();
  return id;
}

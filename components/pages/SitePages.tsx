import Link from "@/components/Link";
import { SITE, type Lang } from "@/site.config";
import { addressLine, TEL_HREF, WHATSAPP_URL } from "@/lib/business";
import { contactHref } from "@/lib/links";
import { faqSchema } from "@/lib/schema";
import { ABOUT_PAGE, CONTACT_PAGE, EV_PAGE, OTHER_PAGE, PRIVACY_PAGE, WEEKEND_PAGE } from "@/content/pages";
import { FAQ, allFaq } from "@/content/faq";
import { UI } from "@/content/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { VideoPanel } from "@/components/VideoPanel";
import { LazyBookingSection as BookingSection } from "@/components/Lazy";
import { CtaPanel } from "@/components/blocks/Cta";
import { PageHero, Section, SectionHeading } from "@/components/blocks/Section";
import { ItemGrid, Steps } from "@/components/blocks/Steps";
import { FaqList } from "@/components/blocks/Faq";
import { Prose } from "@/components/blocks/Prose";
import { Hours } from "@/components/blocks/Hours";
import { RelatedLinks } from "@/components/blocks/Related";
import { Certificates, GaragePhotos, Team } from "@/components/blocks/Gated";

/* --- Other EVs ----------------------------------------------------------- */

export function EvPage({ lang }: { lang: Lang }) {
  const c = EV_PAGE[lang];
  return (
    <>
      <Breadcrumbs id="ev" lang={lang} />
      <PageHero label={c.label} title={c.h1} lead={c.lead}>
        <Link href={contactHref(lang, "quote")} className="btn-primary">
          {c.cta}
        </Link>
      </PageHero>
      <Section>
        <p className="label">{c.brandsTitle}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {c.brands.map((brand) => (
            <li key={brand} className="chip">
              {brand}
            </li>
          ))}
        </ul>
        <div className="mt-14">
          <SectionHeading title={c.workTitle} />
          <div className="mt-10">
            <ItemGrid items={c.work} />
          </div>
        </div>
      </Section>
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-12">
          <Prose blocks={c.body} lang={lang} className="lg:col-span-7 [&>h2:first-child]:mt-0" />
          <div className="lg:col-span-5">
            <RelatedLinks ids={["tesla", "svc-battery", "svc-brakes", "weekend"]} lang={lang} />
          </div>
        </div>
      </Section>
      <CtaPanel lang={lang} title={c.cta} tesla={false} />
    </>
  );
}

/* --- Other vehicles: deliberately quieter --------------------------------- */

export function OtherPage({ lang }: { lang: Lang }) {
  const c = OTHER_PAGE[lang];
  return (
    <>
      <Breadcrumbs id="other" lang={lang} />
      <section className="border-b border-rule">
        <div className="wrap grid gap-10 py-12 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label">{c.label}</p>
            <h1 className="h2 mt-5 max-w-[22ch]">{c.h1}</h1>
            <p className="lead mt-5 max-w-[56ch]">{c.lead}</p>
            <ul className="mt-8 grid max-w-prose gap-2">
              {c.work.map((item) => (
                <li key={item} className="flex gap-3 border-t border-rule pt-2.5">
                  <span aria-hidden className="h-px w-3 shrink-0 translate-y-[0.8em] bg-muted" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-prose text-step--1 text-muted">
              <span className="font-semibold text-ink">{c.notTitle}. </span>
              {c.not}
            </p>
            <div className="mt-8">
              <Link href={contactHref(lang, "quote")} className="btn-secondary">
                {c.cta}
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Hours lang={lang} className="card p-6" />
          </div>
        </div>
      </section>
    </>
  );
}

/* --- Weekend service ----------------------------------------------------- */

export function WeekendPage({ lang }: { lang: Lang }) {
  const c = WEEKEND_PAGE[lang];
  return (
    <>
      <Breadcrumbs id="weekend" lang={lang} />
      <PageHero
        label={c.label}
        title={c.h1}
        lead={c.lead}
        aside={<Hours lang={lang} className="corners card p-6" />}
      >
        <Link href={contactHref(lang, "quote")} className="btn-primary">
          {c.cta}
        </Link>
      </PageHero>
      <Section>
        <SectionHeading title={c.stepsTitle} />
        <div className="mt-10">
          <Steps items={c.steps} />
        </div>
      </Section>
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading title={c.suitsTitle} as="h2" />
            <ul className="mt-8 grid gap-2.5">
              {c.suits.map((item) => (
                <li key={item} className="flex gap-3 border-t border-rule pt-2.5">
                  <span aria-hidden className="font-mono text-ok">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title={c.needTitle} as="h2" />
            <ul className="mt-8 grid gap-2.5">
              {c.need.map((item) => (
                <li key={item} className="flex gap-3 border-t border-rule pt-2.5">
                  <span aria-hidden className="h-px w-3 shrink-0 translate-y-[0.8em] bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <p className="label mb-2">{UI[lang].faqTitle}</p>
            <FaqList items={c.faq} lang={lang} />
          </div>
          <div className="lg:col-span-5">
            <VideoPanel
              src="/videos/process.mp4"
              poster="/videos/process-poster.webp"
              alt={lang === "fi" ? "Työkalupakki avataan korjaamon työpöydällä" : "A toolbox being opened on a workshop bench"}
              width={960}
              height={540}
            />
          </div>
        </div>
      </Section>
      <CtaPanel lang={lang} title={c.cta} />
    </>
  );
}

/* --- FAQ ----------------------------------------------------------------- */

export function FaqPage({ lang }: { lang: Lang }) {
  const c = FAQ[lang];
  return (
    <>
      <Breadcrumbs id="faq" lang={lang} />
      <PageHero label={c.label} title={c.h1} lead={c.lead} />
      {c.groups.map((group, i) => (
        <Section key={group.title} tone={i % 2 ? "surface" : "ground"}>
          <div className="grid gap-8 lg:grid-cols-12">
            <h2 className="h3 lg:col-span-4">{group.title}</h2>
            <div className="lg:col-span-8">
              <FaqList items={group.items} lang={lang} schema={false} />
            </div>
          </div>
        </Section>
      ))}
      <JsonLd data={faqSchema(allFaq(lang))} />
      <CtaPanel lang={lang} title={lang === "fi" ? "Etkö löytänyt vastausta?" : "Did not find your answer?"} body={CONTACT_PAGE[lang].reply} />
    </>
  );
}

/* --- About --------------------------------------------------------------- */

export function AboutPage({ lang }: { lang: Lang }) {
  const c = ABOUT_PAGE[lang];
  const b = SITE.business;
  const t = UI[lang].footer;
  const facts: Array<[string, string]> = [
    [lang === "fi" ? "Nimi" : "Name", `${b.name} (${b.companyForm})`],
    [t.companyId, b.companyId],
    [t.address, `${addressLine(lang)} (${b.district})`],
    [t.phone, b.phoneDisplay],
    [t.email, b.email],
  ];
  return (
    <>
      <Breadcrumbs id="about" lang={lang} />
      <PageHero label={c.label} title={c.h1} lead={c.lead} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <Prose blocks={c.body} lang={lang} className="lg:col-span-7" />
          <dl className="card grid content-start gap-3 p-6 lg:col-span-5">
            <dt className="label">{c.factsTitle}</dt>
            {facts.map(([label, value]) => (
              <dd key={label} className="grid gap-0.5 border-t border-rule pt-3 text-step--1">
                <span className="text-muted">{label}</span>
                <span className="break-words">{value}</span>
              </dd>
            ))}
          </dl>
        </div>
      </Section>
      <Section tone="surface">
        <SectionHeading title={c.principlesTitle} />
        <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {c.principles.map((item) => (
            <li key={item.title} className="border-t border-rule pt-5">
              <h3 className="text-step-1 font-bold">{item.title}</h3>
              <p className="mt-2 text-step--1 text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 max-w-xl">
          <Certificates lang={lang} />
        </div>
      </Section>
      <Team lang={lang} />
      <GaragePhotos lang={lang} />
      <CtaPanel lang={lang} title={HOME_CTA[lang]} />
    </>
  );
}

const HOME_CTA: Record<Lang, string> = { fi: "Tuo autosi vianhakuun", en: "Bring your car in for a diagnosis" };

/* --- Contact ------------------------------------------------------------- */

export function ContactPage({ lang }: { lang: Lang }) {
  const c = CONTACT_PAGE[lang];
  const b = SITE.business;
  const t = UI[lang];
  return (
    <>
      <Breadcrumbs id="contact" lang={lang} />
      <section className="blueprint border-b border-rule">
        <div className="wrap pb-10 pt-10 md:pt-14">
          <p className="label flex items-center gap-3">
            <span aria-hidden className="h-px w-6 bg-accent" />
            {c.label}
          </p>
          <h1 className="h1 mt-6 max-w-[18ch]">{c.h1}</h1>
          <p className="lead mt-6 max-w-[58ch]">{c.lead}</p>
          <p className="mt-4 text-step--1 text-muted">{t.cta.estimateLine}</p>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <BookingSection />
          </div>
          <aside className="grid content-start gap-6 lg:col-span-4">
            <div className="card p-6">
              <p className="label">{c.visitTitle}</p>
              <address className="mt-3 not-italic">
                {addressLine(lang)}
                <span className="block text-step--1 text-muted">{b.district}, Helsinki</span>
              </address>
              <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-4 w-full">
                {t.footer.openMap}
              </a>
            </div>
            <div className="card p-6">
              <p className="label">{c.reachTitle}</p>
              <a href={TEL_HREF} className="mt-3 block font-mono text-step-1 font-medium hover:text-accent">
                {b.phoneDisplay}
              </a>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a href={TEL_HREF} className="btn-secondary">
                  {t.cta.call}
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  WhatsApp
                </a>
              </div>
              <a href={`mailto:${b.email}`} className="link mt-4 block break-all text-step--1">
                {b.email}
              </a>
              <p className="mt-4 text-step--1 text-muted">{c.reply}</p>
            </div>
            <Hours lang={lang} className="card p-6" />
          </aside>
        </div>
      </Section>
    </>
  );
}

/* --- Privacy ------------------------------------------------------------- */

export function PrivacyPage({ lang }: { lang: Lang }) {
  const c = PRIVACY_PAGE[lang];
  return (
    <>
      <Breadcrumbs id="privacy" lang={lang} />
      <section className="border-b border-rule">
        <div className="wrap py-10 md:py-14">
          <p className="label">{c.label}</p>
          <h1 className="h2 mt-5">{c.h1}</h1>
          <p className="lead mt-5 max-w-[58ch]">{c.lead}</p>
          <p className="mt-3 font-mono text-step--2 text-muted">{c.updated}</p>
        </div>
      </section>
      <Section>
        <Prose blocks={c.body} lang={lang} className="[&>h2:first-child]:mt-0" />
      </Section>
    </>
  );
}


import Link from "@/components/Link";
import { SITE, type Lang } from "@/site.config";
import { pathOf } from "@/lib/routes";
import { offerSchema, serviceSchema } from "@/lib/schema";
import { contactHref } from "@/lib/links";
import { HUB, OFFER_PAGE, REPORT } from "@/content/tesla";
import { MODELS, type ModelId } from "@/content/models";
import { CLIMATE_SCOPE, SERVICES, type ServiceId } from "@/content/services";
import { ROUTE_NAMES, UI } from "@/content/ui";
import { JsonLd } from "@/components/JsonLd";
import { OfferSwitch } from "@/components/OfferSwitch";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaButtons, CtaPanel } from "@/components/blocks/Cta";
import { ModelSelector, ServiceGrid } from "@/components/blocks/Cards";
import { PageHero, Section, SectionHeading } from "@/components/blocks/Section";
import { ItemGrid, Steps } from "@/components/blocks/Steps";
import { FaqList } from "@/components/blocks/Faq";
import { Prose } from "@/components/blocks/Prose";
import { RelatedLinks } from "@/components/blocks/Related";
import { BatteryReportSample } from "@/components/blocks/Gated";

/* --- Hub ----------------------------------------------------------------- */

export function TeslaHubPage({ lang }: { lang: Lang }) {
  const c = HUB[lang];
  const names = ROUTE_NAMES[lang];
  return (
    <>
      <Breadcrumbs id="tesla" lang={lang} />
      <PageHero label={c.label} title={c.h1} lead={c.lead}>
        <CtaButtons lang={lang} />
      </PageHero>

      <Section>
        <SectionHeading title={c.modelsTitle} />
        <div className="mt-8">
          <ModelSelector lang={lang} />
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading title={c.servicesTitle} lead={c.servicesLead} />
        <div className="mt-10">
          <ServiceGrid lang={lang} />
        </div>
        <p className="label mt-12">{c.extrasTitle}</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {(["offer", "battery-report"] as const).map((id) => (
            <li key={id}>
              <Link href={pathOf(id, lang)} className="card group flex min-h-[64px] items-center justify-between gap-4 px-5 py-4 transition-colors duration-2 hover:border-ruleStrong">
                <span className="font-semibold">{names[id]}</span>
                <span aria-hidden className="font-mono text-accent transition-transform duration-2 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <Prose blocks={c.approach} lang={lang} className="lg:col-span-7 [&>h2:first-child]:mt-0" />
          <div className="lg:col-span-5">
            <p className="label mb-2">{UI[lang].faqTitle}</p>
            <FaqList items={c.faq} lang={lang} />
          </div>
        </div>
      </Section>

      <CtaPanel lang={lang} title={c.cta} />
    </>
  );
}

/* --- Model --------------------------------------------------------------- */

export function ModelPage({ id, lang }: { id: ModelId; lang: Lang }) {
  const c = MODELS[lang][id];
  const s = UI[lang].sections;
  return (
    <>
      <Breadcrumbs id={id} lang={lang} />
      <PageHero
        label={`Tesla · ${c.name}`}
        title={c.h1}
        lead={c.lead}
        aside={
          <div className="card p-6">
            <p className="label">{s.checklist}</p>
            <ul className="mt-4 grid gap-2.5">
              {c.checks.map((check) => (
                <li key={check} className="flex items-start gap-3 text-step--1">
                  <span aria-hidden className="mt-[0.2em] font-mono text-ok">✓</span>
                  {check}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <CtaButtons lang={lang} />
      </PageHero>

      <Section>
        <Prose blocks={c.intro} lang={lang} />
      </Section>

      <Section tone="surface">
        <SectionHeading label={s.issues} title={s.issuesTitle} />
        <div className="mt-10">
          <ItemGrid items={c.issues} />
        </div>
      </Section>

      <Section>
        <Prose blocks={c.winter} lang={lang} className="[&>h2:first-child]:mt-0" />
      </Section>

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label mb-2">{UI[lang].faqTitle}</p>
            <FaqList items={c.faq} lang={lang} />
          </div>
          <div className="lg:col-span-5">
            <RelatedLinks ids={c.related} lang={lang} />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading label={s.otherModels} title={ROUTE_NAMES[lang].tesla} />
        <div className="mt-8">
          <ModelSelector lang={lang} current={id} />
        </div>
      </Section>

      <CtaPanel lang={lang} title={HUB[lang].cta} />
      <JsonLd data={serviceSchema(id, lang, c.seo.description)} />
    </>
  );
}

/* --- Service ------------------------------------------------------------- */

export function ServicePage({ id, lang }: { id: ServiceId; lang: Lang }) {
  const c = SERVICES[lang][id];
  const s = UI[lang].sections;
  return (
    <>
      <Breadcrumbs id={id} lang={lang} />
      <PageHero
        label={c.name}
        title={c.h1}
        lead={c.lead}
        aside={
          <div className="card p-6">
            <p className="label">{s.symptoms}</p>
            <ul className="mt-4 grid gap-2.5">
              {c.symptoms.map((symptom) => (
                <li key={symptom.title} className="flex items-start gap-3 text-step--1">
                  <span aria-hidden className="mt-[0.55em] h-px w-3 shrink-0 bg-accent" />
                  {symptom.title}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <CtaButtons lang={lang} />
      </PageHero>

      <Section>
        <SectionHeading label={s.symptoms} title={s.symptomsTitle} />
        <div className="mt-10">
          <ItemGrid items={c.symptoms} />
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading label={s.checks} title={s.checksTitle} />
        <div className="mt-10">
          <ItemGrid items={c.checks} marker="check" />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading label={s.diagnosis} title={s.diagnosisTitle} as="h2" />
            <Prose blocks={c.diagnosis} lang={lang} className="mt-6" />
          </div>
          <div>
            <SectionHeading label={s.when} title={s.whenTitle} as="h2" />
            <Prose blocks={c.whenToBook} lang={lang} className="mt-6" />
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <Prose blocks={c.body} lang={lang} className="[&>h2:first-child]:mt-0" />
        {id === "svc-climate" ? (
          <p className="cut mt-8 max-w-prose bg-ground px-5 py-4 text-step--1 shadow-[inset_4px_0_0_rgb(var(--accent))]">
            {SITE.acLicensed ? CLIMATE_SCOPE[lang].full : CLIMATE_SCOPE[lang].limited}
          </p>
        ) : null}
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label mb-2">{UI[lang].faqTitle}</p>
            <FaqList items={c.faq} lang={lang} />
          </div>
          <div className="lg:col-span-5">
            <RelatedLinks ids={c.related} lang={lang} />
          </div>
        </div>
      </Section>

      <CtaPanel lang={lang} title={HUB[lang].cta} />
      <JsonLd data={serviceSchema(id, lang, c.seo.description)} />
    </>
  );
}

/* --- Launch offer -------------------------------------------------------- */

export function OfferPage({ lang }: { lang: Lang }) {
  const c = OFFER_PAGE[lang];
  const s = UI[lang].sections;
  const d = SITE.inspection;

  const scope = (
    <Section tone="surface">
      <SectionHeading label={s.scope} title={c.scopeTitle} />
      <Prose blocks={c.scopeGeneral} lang={lang} className="mt-6" />
      {d.confirmed ? (
        <div className="mt-10">
          <p className="label">{c.includes}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {d.includes[lang].map((item, i) => (
              <li key={item} className="card flex items-center gap-4 p-5">
                <span className="font-mono text-step--1 text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-semibold">{item}</span>
                <span aria-hidden className="ml-auto font-mono text-ok">✓</span>
              </li>
            ))}
          </ul>
          {d.excludes[lang].length ? (
            <>
              <p className="label mt-8">{c.excludes}</p>
              <ul className="mt-4 grid gap-2">
                {d.excludes[lang].map((item) => (
                  <li key={item} className="flex gap-3 text-muted">
                    <span aria-hidden className="font-mono">×</span>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      ) : (
        <p className="mt-6 text-step--1 text-muted">{c.scopePending}</p>
      )}
    </Section>
  );

  const steps = (
    <Section>
      <SectionHeading title={c.howTitle} />
      <div className="mt-10">
        <Steps items={c.steps} />
      </div>
    </Section>
  );

  return (
    <>
      <Breadcrumbs id="offer" lang={lang} />
      <OfferSwitch
        live={
          <>
            <PageHero
              label={c.live.label}
              title={c.live.h1}
              lead={c.live.lead}
              aside={
                <div className="card p-6">
                  <p className="label">{c.endDateLabel}</p>
                  <p className="mt-3 font-display text-step-4 font-black [font-variation-settings:'wdth'_120]">
                    {SITE.offer.validThroughDisplay[lang]}
                  </p>
                  <p className="mt-3 text-step--1 text-muted">{UI[lang].cta.estimateLine}</p>
                </div>
              }
            >
              <Link href={contactHref(lang, "diagnosis")} className="btn-primary">
                {c.cta}
              </Link>
            </PageHero>
            {steps}
            {scope}
            <Section>
              <SectionHeading title={c.termsTitle} />
              <ul className="mt-8 grid max-w-prose gap-3">
                {c.terms.map((term) => (
                  <li key={term} className="flex gap-3 border-t border-rule pt-3">
                    <span aria-hidden className="h-px w-3 shrink-0 translate-y-[0.8em] bg-accent" />
                    {term}
                  </li>
                ))}
              </ul>
            </Section>
            <JsonLd offer data={offerSchema(lang, c.seoLive.description)} />
          </>
        }
        ended={
          <>
            <PageHero label={c.ended.label} title={c.ended.h1} lead={c.ended.lead}>
              <CtaButtons lang={lang} />
            </PageHero>
            {steps}
            {scope}
          </>
        }
      />
      <CtaPanel lang={lang} title={HUB[lang].cta} />
    </>
  );
}

/* --- Battery health report ----------------------------------------------- */

export function ReportPage({ lang }: { lang: Lang }) {
  const c = REPORT[lang];
  return (
    <>
      <Breadcrumbs id="battery-report" lang={lang} />
      <PageHero label={c.label} title={c.h1} lead={c.lead}>
        <Link href={contactHref(lang, "quote")} className="btn-primary">
          {c.cta}
        </Link>
      </PageHero>

      <Section>
        <SectionHeading title={c.coversTitle} />
        <div className="mt-10">
          <ItemGrid items={c.covers} marker="check" />
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading title={c.whenTitle} />
        <div className="mt-10">
          <ItemGrid items={c.when} />
        </div>
      </Section>

      {SITE.batteryReportSample ? (
        <Section>
          <SectionHeading title={c.sampleTitle} />
          <div className="mt-8 max-w-3xl">
            <BatteryReportSample lang={lang} />
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading title={c.limitsTitle} />
            <Prose blocks={c.limits} lang={lang} className="mt-6" />
          </div>
          <div className="lg:col-span-6">
            <p className="label mb-2">{UI[lang].faqTitle}</p>
            <FaqList items={c.faq} lang={lang} />
            <div className="mt-10">
              <RelatedLinks ids={["svc-electrical", "post-used", "model-s", "post-12v"]} lang={lang} />
            </div>
          </div>
        </div>
      </Section>

      <CtaPanel lang={lang} title={c.cta} />
      <JsonLd data={serviceSchema("battery-report", lang, c.seo.description)} />
    </>
  );
}

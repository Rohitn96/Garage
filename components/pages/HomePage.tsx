import Link from "@/components/Link";
import type { Lang } from "@/site.config";
import { pathOf } from "@/lib/routes";
import { HOME } from "@/content/home";
import { UI } from "@/content/ui";
import { faqPreview } from "@/content/faq";
import { serviceGroups } from "@/data/services";
import { LazyServiceExplorer as ServiceExplorer } from "@/components/Lazy";
import { VideoPanel } from "@/components/VideoPanel";
import { OfferSwitch } from "@/components/OfferSwitch";
import { CtaButtons, CtaPanel } from "@/components/blocks/Cta";
import { ModelSelector, ScanPanel, ServiceGrid } from "@/components/blocks/Cards";
import { Section, SectionHeading, SystemLabel } from "@/components/blocks/Section";
import { Steps } from "@/components/blocks/Steps";
import { FaqList } from "@/components/blocks/Faq";
import { Certificates, Reviews } from "@/components/blocks/Gated";

/*
 * Order is the argument: positioning and the offer first, then the car the
 * visitor owns, the systems we work on, the weekend promise, how a visit goes,
 * why to trust us, and the questions that block a booking.
 */
export function HomePage({ lang }: { lang: Lang }) {
  const c = HOME[lang];
  const t = UI[lang];

  return (
    <>
      {/* Hero. The H1 is the LCP element and is never animated. */}
      <section className="blueprint border-b border-rule">
        <div className="wrap grid gap-12 pb-16 pt-12 md:pb-24 md:pt-20 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SystemLabel>{c.hero.label}</SystemLabel>
            <h1 className="h1 mt-6 max-w-[16ch]">{c.hero.h1}</h1>
            <p className="lead mt-6 max-w-[54ch]">{c.hero.lead}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <CtaButtons lang={lang} />
            </div>
            <p className="mt-4 text-step--1 text-muted">{t.cta.estimateLine}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {c.hero.facts.map((fact) => (
                <li key={fact} className="chip">
                  {fact}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <ScanPanel lang={lang} title={c.scan.title} caption={c.scan.caption} states={c.scan.states} />
          </div>
        </div>
      </section>

      {/* The launch offer while it runs; the diagnosis-first promise after. */}
      <OfferSwitch
        live={
          <Section tone="surface">
            <div className="grid gap-10 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <SectionHeading label={c.offer.label} title={c.offer.title} lead={c.offer.body} />
              </div>
              <div className="md:col-span-5">
                <ul className="grid gap-3">
                  {c.offer.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 border-t border-rule pt-3">
                      <span aria-hidden className="font-mono text-ok">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <Link href={pathOf("offer", lang)} className="btn-ghost mt-6">
                  {c.offer.more} →
                </Link>
              </div>
            </div>
          </Section>
        }
        ended={
          <Section tone="surface">
            <SectionHeading label={c.diagnosisFirst.label} title={c.diagnosisFirst.title} lead={c.diagnosisFirst.body} />
          </Section>
        }
      />

      <Section>
        <SectionHeading label={c.models.label} title={c.models.title} lead={c.models.lead} />
        <div className="mt-10">
          <ModelSelector lang={lang} />
        </div>
      </Section>

      <ServiceExplorer
        groups={serviceGroups(lang)}
        label={c.systems.label}
        title={c.systems.title}
        lead={c.systems.lead}
        hint={t.sections.exploreHint}
      />

      <Section id="services">
        {/* On wide screens the explorer above carries this heading visually. */}
        <div className="lg:sr-only">
          <SectionHeading label={c.systems.label} title={c.systems.title} lead={c.systems.lead} />
        </div>
        <div className="mt-10 lg:mt-0">
          <ServiceGrid lang={lang} />
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeading label={c.weekend.label} title={c.weekend.title} lead={c.weekend.body} />
            <ol className="mt-8 grid gap-4">
              {c.weekend.steps.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-rule pt-4">
                  <span className="font-mono text-step--1 text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-semibold">{step.title}</span>
                    <span className="mt-1 block text-step--1 text-muted">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <Link href={pathOf("weekend", lang)} className="btn-ghost mt-8">
              {c.weekend.more} →
            </Link>
          </div>
          <div className="lg:col-span-6">
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

      <Section>
        <SectionHeading label={c.steps.label} title={c.steps.title} />
        <div className="mt-10">
          <Steps items={c.steps.items} />
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading label={c.trust.label} title={c.trust.title} />
            <div className="mt-10">
              <Certificates lang={lang} />
            </div>
          </div>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-7">
            {c.trust.items.map((item) => (
              <li key={item.title} className="border-t border-rule pt-5">
                <h3 className="text-step-1 font-bold">{item.title}</h3>
                <p className="mt-2 text-step--1 text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Reviews lang={lang} />

      <Section>
        <SectionHeading label={c.other.label} title={c.other.title} />
        <ul className="mt-10 grid gap-px overflow-hidden rounded border border-rule bg-rule md:grid-cols-2">
          {(
            [
              ["ev", c.other.ev],
              ["other", c.other.other],
            ] as const
          ).map(([id, body]) => (
            <li key={id} className="bg-ground">
              <Link href={pathOf(id, lang)} className="group flex h-full flex-col gap-2 p-6 transition-colors duration-2 hover:bg-surface">
                <span className="flex items-center justify-between text-step-1 font-bold">
                  {t.nav[id]}
                  <span aria-hidden className="font-mono text-accent transition-transform duration-2 group-hover:translate-x-1">
                    →
                  </span>
                </span>
                <span className="text-step--1 text-muted">{body}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading label={c.faq.label} title={c.faq.title} />
            <Link href={pathOf("faq", lang)} className="btn-ghost mt-6">
              {c.faq.all} →
            </Link>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={faqPreview(lang)} lang={lang} schema={false} />
          </div>
        </div>
      </Section>

      <CtaPanel lang={lang} title={c.cta.title} body={c.cta.body} />
    </>
  );
}

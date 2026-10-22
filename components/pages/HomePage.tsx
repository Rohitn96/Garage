import Link from "@/components/Link";
import type { Lang } from "@/site.config";
import { pathOf } from "@/lib/routes";
import { HOME } from "@/content/home";
import { UI } from "@/content/ui";
import { faqPreview } from "@/content/faq";
import { serviceGroups } from "@/data/services";
import { LazyServiceExplorer as ServiceExplorer } from "@/components/Lazy";
import { HeroVideo } from "@/components/HeroVideo";
import { VideoPanel } from "@/components/VideoPanel";
import { Icon } from "@/components/Icons";
import { WhileOfferLive } from "@/components/OfferSwitch";
import { CtaButtons, CtaPanel } from "@/components/blocks/Cta";
import { ModelSelector, ServiceGrid } from "@/components/blocks/Cards";
import { Section, SectionHeading, SystemLabel } from "@/components/blocks/Section";
import { Steps } from "@/components/blocks/Steps";
import { FaqList } from "@/components/blocks/Faq";
import { Certificates, Reviews } from "@/components/blocks/Gated";

/*
 * Order: who we are (hero), the launch promotion in one line, the car the
 * visitor owns, the car opened up, the services, the weekend promise, why us,
 * how a visit goes, other cars, questions, and the booking call.
 */
export function HomePage({ lang }: { lang: Lang }) {
  const c = HOME[lang];

  return (
    <>
      {/* Hero. Always dark, over footage. The H1 is the LCP and is never animated. */}
      <section className="relative isolate overflow-hidden border-b border-rule text-white">
        <HeroVideo alt={c.hero.videoAlt} />
        <div className="wrap relative flex min-h-[calc(88svh-4rem)] flex-col justify-end pb-12 pt-40 md:min-h-[min(82vh,820px)] md:justify-center md:pb-20 md:pt-20">
          <p className="flex items-center gap-3 text-step--2 font-semibold uppercase tracking-[0.16em] text-white/75">
            <span aria-hidden className="h-px w-6 bg-accent" />
            {c.hero.label}
          </p>
          <h1 className="h1 mt-5 max-w-[15ch] text-white">{c.hero.h1}</h1>
          <p className="mt-6 max-w-[52ch] text-step-1 leading-relaxed text-white/80">{c.hero.lead}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <CtaButtons lang={lang} onMedia />
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-step--1 text-white/75">
            {c.hero.facts.map((fact) => (
              <li key={fact} className="flex items-center gap-2">
                <span aria-hidden className="text-accent">✓</span>
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The launch offer, as a promotion strip. Gone after 31.12.2026. */}
      <WhileOfferLive>
        <section className="border-b border-rule bg-surface">
          <div data-reveal className="wrap flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="chip chip-accent mt-1 shrink-0">{c.offer.label}</span>
              <div>
                <p className="text-step-1 font-bold">{c.offer.title}</p>
                <p className="mt-1 text-step--1 text-muted">{c.offer.body}</p>
              </div>
            </div>
            <Link href={pathOf("offer", lang)} className="btn-ghost shrink-0">
              {c.offer.more} →
            </Link>
          </div>
        </section>
      </WhileOfferLive>

      <Section>
        <SectionHeading label={c.models.label} title={c.models.title} lead={c.models.lead} />
        <div className="mt-10">
          <ModelSelector lang={lang} />
        </div>
      </Section>

      <ServiceExplorer groups={serviceGroups(lang)} label={c.explorer.label} title={c.explorer.title} lead={c.explorer.lead} hint={c.explorer.hint} />

      <Section id="services" tone="surface">
        <SectionHeading label={c.services.label} title={c.services.title} lead={c.services.lead} />
        <div className="mt-10">
          <ServiceGrid lang={lang} />
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeading label={c.weekend.label} title={c.weekend.title} lead={c.weekend.body} />
            <ol className="mt-8 grid gap-4">
              {c.weekend.steps.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-rule pt-4">
                  <span className="font-display text-step-1 font-extrabold text-accent">{i + 1}</span>
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

      <Section tone="surface">
        <SectionHeading label={c.why.label} title={c.why.title} />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {c.why.items.map((item) => (
            <li key={item.title} className="card p-6">
              <span className="icon-tile">
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-step-1 font-bold">{item.title}</h3>
              <p className="mt-2 text-step--1 leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 max-w-xl">
          <Certificates lang={lang} />
        </div>
      </Section>

      <Reviews lang={lang} />

      <Section>
        <SectionHeading label={c.steps.label} title={c.steps.title} />
        <div className="mt-10">
          <Steps items={c.steps.items} />
        </div>
      </Section>

      <Section tone="surface">
        <SystemLabel>{c.other.label}</SystemLabel>
        <h2 className="h3 mt-5">{c.other.title}</h2>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {(
            [
              ["ev", c.other.ev],
              ["other", c.other.other],
            ] as const
          ).map(([id, body]) => (
            <li key={id}>
              <Link href={pathOf(id, lang)} className="card card-link group flex h-full flex-col gap-2 p-6">
                <span className="flex items-center justify-between text-step-1 font-bold">
                  {UI[lang].nav[id]}
                  <span aria-hidden className="text-accent transition-transform duration-2 group-hover:translate-x-1">
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

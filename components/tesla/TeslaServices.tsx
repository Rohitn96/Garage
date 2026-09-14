"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ModelPicker } from "./ModelPicker";
import {
  TESLA_COPY,
  TESLA_FAQ,
  TESLA_SERVICES,
  WINTER_POINTS,
  type TeslaModel,
} from "@/data/tesla";
import { useT } from "@/lib/i18n";
import { Reveal } from "../Reveal";

/**
 * The Tesla page's interactive half: the S3XY picker and the service list it
 * filters, plus the two blocks that do the actual persuading — what a Finnish
 * winter does to these cars, and whether independent servicing costs you your
 * warranty. Those two questions are what a Tesla owner is really here to
 * resolve; the service list is what they read once they trust the answer.
 */
export function TeslaServices() {
  const t = useT();
  const [model, setModel] = useState<TeslaModel | null>(null);

  // Groups with nothing left for the selected car drop out entirely, rather
  // than sitting there as empty headings.
  const groups = useMemo(() => {
    if (!model) return TESLA_SERVICES;
    return TESLA_SERVICES.map((group) => ({
      ...group,
      items: group.items.filter((item) => item.models.includes(model)),
    })).filter((group) => group.items.length > 0);
  }, [model]);

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="px-6 pb-8 pt-28 md:px-10 md:pt-36">
        <div className="mx-auto w-full max-w-page">
          {/* CSS entrance, not <Reveal>: this is the page's LCP, and Framer's
              server-rendered opacity:0 held it back until hydration. */}
          <div className="rise">
            <p className="label">{t(TESLA_COPY.eyebrow)}</p>
            <h1 className="mt-7 max-w-[14ch] font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.96] tracking-[-0.02em]">
              {t(TESLA_COPY.headlineA)}{" "}
              <em className="italic text-accent">{t(TESLA_COPY.headlineAccent)}</em>
            </h1>
            <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-graphite">
              {t(TESLA_COPY.standfirst)}
            </p>
          </div>

          <div className="mt-14">
            <ModelPicker selected={model} onSelect={setModel} />
          </div>
        </div>
      </section>

      {/* ---- Services ---- */}
      <section id="tesla-services" className="rule-above">
        <div className="section">
          <Reveal>
            <p className="label">{t(TESLA_COPY.servicesEyebrow)}</p>
            <h2 className="mt-7 max-w-[18ch] h-section">
              {t(TESLA_COPY.servicesHeadingA)}{" "}
              <em className="italic text-accent">{t(TESLA_COPY.servicesHeadingAccent)}</em>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2">
            {groups.map((group, i) => (
              <section key={group.id} className="rule-above pt-5">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[0.66rem] tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[1.6rem] leading-tight tracking-[-0.015em]">
                    {t(group.title)}
                  </h3>
                </div>
                <p className="mt-3 max-w-[42ch] pl-10 text-[0.9rem] leading-relaxed text-graphite">
                  {t(group.standfirst)}
                </p>
                <ul className="mt-6 grid gap-4 pl-10">
                  {group.items.map((item) => (
                    <li key={item.id} className="border-l border-rule pl-4">
                      <p className="font-display text-[1.15rem] leading-snug tracking-[-0.01em]">
                        {t(item.name)}
                      </p>
                      <p className="mt-1 text-[0.87rem] leading-relaxed text-graphite">
                        {t(item.blurb)}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <Link href="#pricing" className="link-underline mt-14 inline-block text-[0.95rem] font-medium">
            {t(TESLA_COPY.pricingLink)}
          </Link>
        </div>
      </section>

      {/* ---- Finnish winter ---- */}
      <section className="rule-above">
        <div className="section">
          <div className="grid gap-x-12 gap-y-8 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <p className="label">{t(TESLA_COPY.winterEyebrow)}</p>
              <h2 className="mt-7 max-w-[12ch] h-section">
                {t(TESLA_COPY.winterHeadingA)}{" "}
                <em className="italic text-accent">{t(TESLA_COPY.winterHeadingAccent)}</em>
              </h2>
            </Reveal>
            <Reveal delay={0.06} className="md:col-span-6 md:col-start-7">
              <p className="max-w-[44ch] text-[1.02rem] leading-relaxed text-graphite">
                {t(TESLA_COPY.winterStandfirst)}
              </p>
            </Reveal>
          </div>

          <ol className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {WINTER_POINTS.map((point, i) => (
              <Reveal key={point.title.en} delay={i * 0.06}>
                <li className="rule-above pt-5">
                  <span className="label">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 font-display text-[1.45rem] leading-tight tracking-[-0.01em]">
                    {t(point.title)}
                  </h3>
                  <p className="mt-2.5 max-w-[44ch] text-[0.93rem] leading-relaxed text-graphite">
                    {t(point.body)}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- The questions that actually block a booking ---- */}
      <section className="rule-above">
        <div className="section">
          <Reveal>
            <p className="label">{t(TESLA_COPY.faqEyebrow)}</p>
            <h2 className="mt-7 max-w-[16ch] h-section">
              {t(TESLA_COPY.faqHeadingA)}{" "}
              <em className="italic text-accent">{t(TESLA_COPY.faqHeadingAccent)}</em>
            </h2>
          </Reveal>

          <dl className="mt-14 border-t border-rule">
            {TESLA_FAQ.map((entry) => (
              <div
                key={entry.q.en}
                className="grid gap-x-12 gap-y-3 border-b border-rule py-7 md:grid-cols-12"
              >
                <dt className="font-display text-[1.35rem] leading-snug tracking-[-0.01em] md:col-span-5">
                  {t(entry.q)}
                </dt>
                <dd className="max-w-[54ch] text-[0.95rem] leading-relaxed text-graphite md:col-span-6 md:col-start-7">
                  {t(entry.a)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}

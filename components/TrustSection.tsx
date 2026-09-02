"use client";

import { Reveal } from "./Reveal";
import { useT } from "@/lib/i18n";
import { CONTENT } from "@/lib/content";

/*
 * PLACEHOLDER PRICING for the dry run.
 *
 * Indicative figures, which is why the note below sits directly under the list
 * rather than in a footer. Anything that puts a number on screen keeps a caveat
 * beside it.
 */
const PRICES: Array<{ service: { en: string; fi: string }; price: string }> = [
  { service: { en: "Comprehensive vehicle inspection", fi: "Auton kuntotarkastus" }, price: "120 €" },
  { service: { en: "Tesla service packages", fi: "Teslan huoltopaketit" }, price: "290–330 €" },
  { service: { en: "Filter change, oil change, tyre work", fi: "Suodattimet, öljynvaihto, rengastyöt" }, price: "80 €" },
  { service: { en: "AC service", fi: "Ilmastoinnin huolto" }, price: "150–200 €" },
  { service: { en: "Hourly labour rate", fi: "Tuntiveloitus" }, price: "80 € / hr" },
];

/*
 * This section used to carry four claim tiles — price agreed first, no extra
 * work without a call, all makes and models, warranty on parts and labour.
 * They were cut to reach the prices faster. The two that differentiate a garage
 * are folded into the standfirst; "all makes and models" and the warranty line
 * are no longer stated anywhere on the site.
 */

export function TrustSection() {
  const t = useT();
  const c = CONTENT.why;

  return (
    <section className="rule-above">
      <div className="mx-auto w-full max-w-page px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="label">{t(c.eyebrow)}</p>
            <h2 className="mt-8 max-w-[14ch] font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
              {t(c.headingA)} <em className="italic text-pine">{t(c.headingAccent)}</em>
            </h2>
          </Reveal>

          <Reveal delay={0.06} className="md:col-span-6 md:col-start-7">
            <p className="max-w-[48ch] text-[1.05rem] leading-relaxed text-graphite">
              {t(c.standfirst)}
            </p>

            <div className="mt-10 rule-above pt-5">
              <h3 className="font-display text-[1.4rem] leading-tight tracking-[-0.01em]">
                {t(c.b2bHeading)}
              </h3>
              <p className="mt-3 max-w-[48ch] text-[0.95rem] leading-relaxed text-graphite">
                {t(c.b2b)}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-20 grid gap-x-12 gap-y-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="label">{t(c.pricesEyebrow)}</p>
              <h3 className="mt-5 max-w-[14ch] font-display text-[1.9rem] leading-tight tracking-[-0.01em]">
                {t(c.pricesHeading)}
              </h3>
            </div>

            <dl className="md:col-span-7 md:col-start-6">
              {PRICES.map((row) => (
                <div
                  key={row.service.en}
                  className="flex items-baseline justify-between gap-6 border-b border-rule/70 py-3.5 first:border-t first:border-rule/70"
                >
                  <dt className="font-display text-[1.2rem] leading-snug tracking-[-0.01em]">
                    {t(row.service)}
                  </dt>
                  <dd className="shrink-0 whitespace-nowrap font-mono text-[0.85rem] text-pine">
                    {row.price}
                  </dd>
                </div>
              ))}
              <p className="mt-6 max-w-[52ch] text-[0.85rem] leading-relaxed text-graphite">
                {t(c.priceNote)}
              </p>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

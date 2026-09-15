"use client";

import { PRICES } from "@/data/pricing";
import { useT } from "@/lib/i18n";
import { CONTENT } from "@/lib/content";
import { Reveal } from "./Reveal";

/**
 * The price list: five headline figures, one column, one caveat.
 *
 * A grouped, tabbed, forty-row table was tried here and removed. It looked
 * thorough and was actually a liability — every row is a promise, and none of
 * them have been tested against a day of trading. This answers the question a
 * visitor really has (roughly what does this cost) and leaves the shop free to
 * set real rates before publishing them.
 */
export function Pricing() {
  const t = useT();
  const c = CONTENT.pricing;

  return (
    <section id="pricing" className="rule-above">
      <div className="section">
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="label">{t(c.eyebrow)}</p>
            <h2 className="mt-7 max-w-[12ch] h-section">
              {t(c.headingA)} <span className="text-accent">{t(c.headingAccent)}</span>
            </h2>
            <p className="mt-7 max-w-[38ch] text-[1.02rem] leading-relaxed text-graphite">
              {t(c.standfirst)}
            </p>
          </Reveal>

          <Reveal delay={0.06} className="md:col-span-6 md:col-start-7">
            <dl className="border-t border-rule">
              {PRICES.map((row) => (
                <div
                  key={row.id}
                  className="flex items-baseline justify-between gap-6 border-b border-rule py-4"
                >
                  <dt className="font-display text-[1.25rem] leading-snug tracking-[-0.01em]">
                    {t(row.service)}
                  </dt>
                  <dd className="shrink-0 whitespace-nowrap font-mono text-[0.85rem] text-accent">
                    {row.price}
                  </dd>
                </div>
              ))}
            </dl>

            {/* The caveat sits with the figures, not in a footer. Anything that
                puts a number on screen keeps its qualifier beside it. */}
            <p className="mt-7 max-w-[52ch] text-[0.85rem] leading-relaxed text-graphite">
              {t(c.disclaimer)}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Reveal } from "./Reveal";
import { useT } from "@/lib/i18n";
import { CONTENT } from "@/lib/content";

/*
 * PLACEHOLDER / DRY-RUN COPY.
 *
 * The "years in the trade" framing is deliberately unquantified because no real
 * credentials, dates or headcount have been supplied yet. Once there is an
 * actual history to point at — who, how long, which marques, which
 * certifications — this should be rewritten to say it plainly. Vague seniority
 * claims are exactly the thing a customer discounts.
 */

export function OurStory() {
  const t = useT();
  const c = CONTENT.story;

  return (
    <section className="rule-above">
      <div className="mx-auto w-full max-w-page px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="label">{t(c.eyebrow)}</p>
          <h2 className="mt-8 max-w-[18ch] font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
            {t(c.headingA)}{" "}
            <em className="italic text-pine">{t(c.headingAccent)}</em>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-12 gap-y-8 md:grid-cols-12">
          <Reveal delay={0.06} className="md:col-span-6 md:col-start-1">
            <p className="max-w-[52ch] leading-relaxed text-graphite">{t(c.p1)}</p>
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-6 md:col-start-7">
            <p className="max-w-[52ch] leading-relaxed text-graphite">{t(c.p2)}</p>
            <p className="mt-6 max-w-[52ch] leading-relaxed text-graphite">{t(c.p3)}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

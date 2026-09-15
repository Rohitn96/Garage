"use client";

import { Reveal } from "./Reveal";
import { useT } from "@/lib/i18n";
import { CONTENT } from "@/lib/content";

/*
 * This replaces two sections that were both doing the same job: an "Our story"
 * block of three unquantified paragraphs about years in the trade, and a "Why
 * us" block that repeated the price promise before listing prices. Prices now
 * have their own section, the story is one sentence, and what is left is three
 * claims a customer can actually check us against.
 *
 * PLACEHOLDER: the seniority claim is still unquantified because no real
 * credentials, dates or headcount have been supplied. Once there is a history
 * to point at — who, how long, which marques, which certifications — say it
 * plainly. Vague seniority is exactly what a customer discounts.
 */
export function Why() {
  const t = useT();
  const c = CONTENT.why;

  return (
    <section id="why" className="rule-above">
      <div className="section">
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="label">{t(c.eyebrow)}</p>
            <h2 className="mt-7 max-w-[14ch] h-section">
              {t(c.headingA)} <span className="text-accent">{t(c.headingAccent)}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.06} className="md:col-span-6 md:col-start-7">
            <p className="max-w-[46ch] text-[1.02rem] leading-relaxed text-graphite">
              {t(c.standfirst)}
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-3">
          {c.points.map((point, i) => (
            <Reveal key={point.title.en} delay={i * 0.07}>
              <li className="rule-above pt-5">
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-[1.45rem] leading-tight tracking-[-0.01em]">
                  {t(point.title)}
                </h3>
                <p className="mt-2.5 max-w-[36ch] text-[0.93rem] leading-relaxed text-graphite">
                  {t(point.body)}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

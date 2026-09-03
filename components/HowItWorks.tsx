"use client";

import { Reveal } from "./Reveal";
import { VideoBackdrop } from "./VideoBackdrop";
import { useT } from "@/lib/i18n";
import { CONTENT } from "@/lib/content";

export function HowItWorks() {
  const t = useT();
  const c = CONTENT.process;

  return (
    <section className="rule-above relative overflow-hidden">
      <VideoBackdrop src="/videos/process.mp4" poster="/videos/process-poster.jpg" scrim="even" opacity={0.56} />

      <div className="relative mx-auto w-full max-w-page px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="label">{t(c.eyebrow)}</p>
          <h2 className="mt-8 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
            {t(c.headingA)} <em className="italic text-pine">{t(c.headingAccent)}</em>
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-y-10 md:grid-cols-4 md:gap-x-10">
          {c.steps.map((step, i) => (
            <Reveal key={step.title.en} delay={i * 0.07}>
              <li className="rule-above pt-5">
                {/* The number is the content here — these are ordered steps,
                    not decoration — so it stays where other numbering went. */}
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-[1.5rem] leading-tight tracking-[-0.01em]">
                  {t(step.title)}
                </h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-graphite">
                  {t(step.body)}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

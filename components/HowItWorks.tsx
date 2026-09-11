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
      <VideoBackdrop
        src="/videos/process.mp4"
        poster="/videos/process-poster.jpg"
        scrim="even"
        opacity={0.5}
      />

      <div className="relative section">
        <Reveal>
          <p className="label">{t(c.eyebrow)}</p>
          <h2 className="mt-7 h-section">
            {t(c.headingA)} <em className="italic text-accent">{t(c.headingAccent)}</em>
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-y-10 md:grid-cols-4 md:gap-x-10">
          {c.steps.map((step, i) => (
            <Reveal key={step.title.en} delay={i * 0.07}>
              <li className="rule-above pt-5">
                {/* The number is the content here — these are ordered steps,
                    not decoration — so it stays where other numbering went. */}
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-[1.45rem] leading-tight tracking-[-0.01em]">
                  {t(step.title)}
                </h3>
                <p className="mt-2.5 text-[0.93rem] leading-relaxed text-graphite">
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

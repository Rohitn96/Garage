"use client";

import Link from "next/link";
import { Reveal } from "./Reveal";
import { useHref, useT } from "@/lib/i18n";
import { CONTENT } from "@/lib/content";

/**
 * The fork.
 *
 * The site's hardest structural problem was that it claimed a Tesla specialism
 * and general repair at the same time, and resolved the two nowhere — a Corolla
 * owner had to read three paragraphs to learn they were welcome. Both audiences
 * now get told inside one screen which half of the shop is theirs, and the
 * ordering does the positioning: Tesla first, everything else immediately after
 * and at the same weight.
 */
export function TwoDoors() {
  const t = useT();
  const h = useHref();
  const c = CONTENT.doors;

  const doors = [
    {
      ...c.tesla,
      href: h("/tesla/"),
      accent: true,
    },
    {
      ...c.general,
      href: "#pricing",
      accent: false,
    },
  ];

  return (
    <section className="rule-above">
      <div className="section">
        <Reveal>
          <p className="label">{t(c.eyebrow)}</p>
          <h2 className="mt-7 max-w-[16ch] h-section">
            {t(c.headingA)} <em className="italic text-accent">{t(c.headingAccent)}</em>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-rule bg-rule md:grid-cols-2">
          {doors.map((door, i) => (
            <Reveal key={door.href} delay={i * 0.08}>
              <Link
                href={door.href}
                className="group flex h-full flex-col justify-between gap-10 bg-paper p-8 transition-colors hover:bg-panel md:p-10"
              >
                <div>
                  <p
                    className={`font-mono text-[0.66rem] uppercase tracking-label ${
                      door.accent ? "text-accent" : "text-graphite"
                    }`}
                  >
                    {t(door.kicker)}
                  </p>
                  <h3 className="mt-5 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight tracking-[-0.015em]">
                    {t(door.title)}
                  </h3>
                  <p className="mt-4 max-w-[38ch] text-[0.95rem] leading-relaxed text-graphite">
                    {t(door.body)}
                  </p>
                </div>

                <span className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-label text-ink">
                  {t(door.cta)}
                  <span
                    aria-hidden
                    className="h-px w-6 bg-accent transition-all duration-300 group-hover:w-12"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

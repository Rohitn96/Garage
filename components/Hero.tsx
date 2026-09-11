"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { VideoBackdrop } from "./VideoBackdrop";
import { usePrefersReducedMotion } from "@/lib/useMotionPreference";
import { useHref, useT } from "@/lib/i18n";
import { CONTENT } from "@/lib/content";

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const t = useT();
  const h = useHref();
  const c = CONTENT.hero;

  // Both branches state initial AND animate. usePrefersReducedMotion reports
  // false until after mount, so dropping the props on the reduced branch strands
  // the element at opacity 0 when the flag flips.
  const rise = (delay: number) =>
    reduced
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] as const },
        };

  return (
    <section className="relative min-h-[100svh] overflow-hidden px-6 pb-10 pt-16 md:px-10 md:pt-[4.5rem]">
      <VideoBackdrop src="/videos/hero.mp4" poster="/videos/hero-poster.jpg" eager />

      <div className="relative mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-page flex-col">
        <div className="flex flex-1 flex-col justify-center py-14 md:py-20">
          <motion.p {...rise(0)} className="label mb-8">
            {t(c.eyebrow)}
          </motion.p>

          {/* Two lines, not three. The old headline spent its whole width on a
              tagline that said nothing a hundred other garages do not say. */}
          <motion.h1
            {...rise(0.08)}
            className="max-w-[16ch] font-display text-[clamp(2.6rem,7vw,5.5rem)] font-normal leading-[0.96] tracking-[-0.02em]"
          >
            {t(c.headlineA)}
            <br />
            <em className="italic text-accent">{t(c.headlineAccent)}</em>
          </motion.h1>

          <div className="mt-12 grid gap-10 border-t border-rule pt-8 md:grid-cols-12">
            <motion.p
              {...rise(0.16)}
              className="max-w-[44ch] text-[1.0625rem] leading-relaxed text-graphite md:col-span-6"
            >
              {t(c.standfirst)}
            </motion.p>

            <motion.div
              {...rise(0.24)}
              className="flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-5 md:col-start-8 md:justify-end"
            >
              <Link href="#contact" className="btn-accent">
                {t(c.ctaPrimary)}
              </Link>
              <Link href={h("/tesla/")} className="link-underline text-[0.95rem] font-medium">
                {t(c.ctaSecondary)}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Credential strip: the three things a visitor needs to know before
            they decide whether this page is for them. */}
        <motion.ul
          {...rise(0.32)}
          className="grid gap-y-3 border-t border-rule pt-5 sm:grid-cols-3"
        >
          {c.credentials.map((item) => (
            <li key={item.en} className="flex items-center gap-3">
              <span aria-hidden className="h-px w-5 shrink-0 bg-accent" />
              <span className="font-mono text-[0.66rem] uppercase tracking-label text-graphite">
                {t(item)}
              </span>
            </li>
          ))}
        </motion.ul>

        <a
          href="#services"
          className="label mt-5 flex items-center gap-3 border-t border-rule pt-5 transition-colors hover:text-ink"
        >
          <span>{t(c.scroll)}</span>
          <span aria-hidden className="h-px w-10 bg-rule" />
        </a>
      </div>
    </section>
  );
}

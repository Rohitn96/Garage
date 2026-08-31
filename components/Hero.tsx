"use client";

import { motion } from "framer-motion";
import { Wordmark } from "./Wordmark";
import { usePrefersReducedMotion } from "@/lib/useMotionPreference";

/*
 * Tagline alternatives in the same register, if you want to swap:
 *   1. "Honest work, fair price, back on the road."   <- in use
 *   2. "You'll know the price before we pick up a tool."
 *   3. "Straight answers. Fixed prices. Cars that pass."
 */

export function Hero() {
  const reduced = usePrefersReducedMotion();

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
    <header className="min-h-[100svh] px-6 pb-10 pt-8 md:px-10">
      <div className="mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-page flex-col">
        <div className="flex items-baseline justify-between border-b border-rule pb-5">
          <Wordmark />
          <span className="label">Vantaa, Finland</span>
        </div>

        <div className="flex flex-1 flex-col justify-center py-16 md:py-24">
          <motion.p {...rise(0)} className="label mb-10">
            01 — Opening soon
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className="max-w-[14ch] font-display text-[clamp(3rem,10vw,7.5rem)] font-normal leading-[0.94] tracking-[-0.02em]"
          >
            Honest work,
            <br />
            fair price,
            <br />
            <em className="italic text-pine">back on the road.</em>
          </motion.h1>

          <div className="mt-14 grid gap-10 border-t border-rule pt-8 md:grid-cols-12">
            <motion.p
              {...rise(0.16)}
              className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-graphite md:col-span-6 md:col-start-1"
            >
              A new independent garage for the Helsinki region. Every job is
              inspected, scoped and agreed with you before we start — no
              surprises on the invoice, and no work you did not ask for.
            </motion.p>

            <motion.div
              {...rise(0.24)}
              className="flex items-start gap-8 md:col-span-4 md:col-start-9 md:justify-end"
            >
              <a href="#contact" className="link-underline text-[0.95rem] font-medium">
                Register your interest
              </a>
              <a
                href="#services"
                className="link-underline text-[0.95rem] font-medium text-graphite"
              >
                What we do
              </a>
            </motion.div>
          </div>
        </div>

        <a
          href="#services"
          className="label flex items-center gap-3 border-t border-rule pt-5 transition-colors hover:text-ink"
        >
          <span>Scroll</span>
          <span aria-hidden className="h-px w-10 bg-rule" />
          <span>See the workshop</span>
        </a>
      </div>
    </header>
  );
}

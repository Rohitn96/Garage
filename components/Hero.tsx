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

  /*
   * Both branches must state initial AND animate explicitly.
   *
   * usePrefersReducedMotion reports false until after mount (it has to, or the
   * server and client markup disagree). Dropping the props entirely on the
   * reduced branch meant these mounted at opacity 0, then lost their `animate`
   * prop when the flag flipped — stranding the whole headline invisible for
   * anyone with reduced motion switched on. Resting values keep it on screen.
   */
  const rise = reduced
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden asphalt px-6 py-10">
      {/*
        Ambient parts illustration.

        Treated, not edited: greyscale + heavy brightness reduction knock the
        source's flat grey ground most of the way to black, then three gradient
        passes feather every edge into the page so no photo border is visible.
        Opacity is held low enough that headline contrast stays well past WCAG
        AA even if the source art is pure white — see the contrast check in the
        build notes.

        Decorative, so it is aria-hidden and deprioritised: the headline is the
        LCP element and this must not compete with it on a slow connection.
      */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="/images/parts-strip.jpg"
          alt=""
          decoding="async"
          fetchPriority="low"
          className="absolute left-1/2 top-1/2 h-[52%] min-h-[210px] w-[132%] min-w-[900px] -translate-x-1/2 -translate-y-1/2 object-cover object-center opacity-[0.14] [filter:grayscale(0.75)_brightness(0.4)_contrast(1.08)]"
        />
        {/* Feather the band's edges outward into the page background. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_54%_at_50%_50%,transparent_0%,rgba(10,11,13,0.5)_52%,#0A0B0D_86%)]" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-ink to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* Faint workshop-floor grid — reads as depth without carrying any content. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(#282C34 1px, transparent 1px), linear-gradient(90deg, #282C34 1px, transparent 1px)",
          backgroundSize: "78px 78px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)",
        }}
      />

      <header className="relative mx-auto flex w-full max-w-page items-center justify-between">
        <Wordmark className="text-base sm:text-lg" />
        <span className="text-xs uppercase tracking-[0.2em] text-fog">Vantaa</span>
      </header>

      <div className="relative mx-auto w-full max-w-page">
        <motion.p
          {...rise}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-steel/70 px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-fog backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-rust" />
          Opening soon in Vantaa
        </motion.p>

        <motion.h1
          {...rise}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="max-w-[16ch] font-display text-[clamp(2.75rem,9vw,6.5rem)] font-bold uppercase leading-[0.92] tracking-tight"
        >
          Honest work,
          <br />
          fair price,
          <br />
          <span className="text-rust">back on the road.</span>
        </motion.h1>

        <motion.p
          {...rise}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="mt-7 max-w-[52ch] text-base leading-relaxed text-fog sm:text-lg"
        >
          A new independent garage for the Helsinki region. Every job priced and
          agreed before we start — no surprises on the invoice, no work you did
          not ask for.
        </motion.p>

        <motion.div
          {...rise}
          transition={{ duration: 0.7, delay: 0.24 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact"
            className="rounded-full bg-rust px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-rust-glow"
          >
            Register your interest
          </a>
          <a
            href="#services"
            className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-chalk transition-colors hover:border-fog"
          >
            See what we do
          </a>
        </motion.div>
      </div>

      <a
        href="#services"
        className="relative mx-auto flex w-full max-w-page items-center gap-3 text-xs uppercase tracking-[0.16em] text-fog transition-colors hover:text-chalk"
      >
        <svg
          className={reduced ? "" : "animate-nudge"}
          width="14"
          height="20"
          viewBox="0 0 14 20"
          fill="none"
          aria-hidden
        >
          <path
            d="M7 1v16m0 0 5-5m-5 5-5-5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Scroll to see our services and prices
      </a>
    </section>
  );
}

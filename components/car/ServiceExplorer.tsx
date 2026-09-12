"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { SERVICE_GROUPS, type CarRegionId } from "@/data/services";
import { useT } from "@/lib/i18n";
import { CONTENT } from "@/lib/content";
import {
  useIsCompactViewport,
  usePrefersReducedMotion,
  useRenders3D,
} from "@/lib/useMotionPreference";
import { Reveal } from "../Reveal";

// three.js stays out of the initial bundle and never runs on the server.
const CarScene = dynamic(() => import("./CarScene").then((m) => m.CarScene), {
  ssr: false,
});

/* --- Timeline --------------------------------------------------------------
 * 0.00 – 0.10   the whole car, turning into view
 * 0.10 – 0.94   six systems, one after another
 * 0.94 – 1.00   back together before the next section
 *
 * Within each system's slice, `openness` ramps over the first 40% and then
 * holds. So the part is not playing an animation the scroll triggered — the
 * scroll IS the movement, and stopping halfway leaves it halfway open.
 * -------------------------------------------------------------------------*/
const START = 0.1;
const END = 0.94;
const SPAN = (END - START) / SERVICE_GROUPS.length;
const RAMP = 0.4;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (t: number) => t * t * (3 - 2 * t);

/** Everything, in document order — for crawlers, no-JS and assistive tech. */
function Catalogue() {
  const t = useT();
  return (
    <div>
      {SERVICE_GROUPS.map((group) => (
        <section key={group.id}>
          <h3>{t(group.title)}</h3>
          <p>{t(group.standfirst)}</p>
          <ul>
            {group.items.map((item) => (
              <li key={item.id}>
                <strong>{t(item.name)}</strong> {t(item.blurb)}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function Intro() {
  const t = useT();
  const c = CONTENT.explorer;
  return (
    <>
      <p className="label">{t(c.eyebrow)}</p>
      <h2 className="mt-7 max-w-[16ch] h-section">
        {t(c.headingA)} <em className="italic text-accent">{t(c.headingAccent)}</em>
      </h2>
      <p className="mt-6 max-w-[46ch] text-graphite">{t(c.standfirst)}</p>
    </>
  );
}

/** The scroll-driven stage. */
function ScrollExplorer() {
  const t = useT();
  const c = CONTENT.explorer;
  const use3D = useRenders3D();
  const compact = useIsCompactViewport();

  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [running, setRunning] = useState(false);

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  // How far the current system has separated. Held as a MotionValue so the
  // scene reads it inside useFrame and the scroll causes ZERO React re-renders.
  const openness = useTransform(scrollYProgress, (p) => {
    if (p <= START || p >= END) return 0;
    const local = ((p - START) / SPAN) % 1;
    return smooth(clamp01(local / RAMP));
  });

  // One slow, continuous yaw across the whole track.
  const turn = useTransform(scrollYProgress, [0, 1], [-0.5, 1.15]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p <= START || p >= END) {
      setIndex(null);
      return;
    }
    const i = Math.floor((p - START) / SPAN);
    setIndex(Math.min(Math.max(i, 0), SERVICE_GROUPS.length - 1));
  });

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => setRunning(entries.some((e) => e.isIntersecting)),
      { rootMargin: "150px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const group = index === null ? null : SERVICE_GROUPS[index];
  const region: CarRegionId | null = group?.id ?? null;

  return (
    <section id="services" className="rule-above">
      {/* The accessible copy. The stage below is a visual presentation of exactly
          this, so it is hidden from assistive tech rather than announced twice. */}
      <div className="sr-only">
        <Intro />
        <Catalogue />
      </div>

      <div aria-hidden className="mx-auto w-full max-w-page px-6 pb-6 pt-24 md:px-10 md:pt-32">
        <Reveal>
          <Intro />
        </Reveal>
      </div>

      {/* Track length: six systems at roughly two-thirds of a screen each, plus
          a lead-in and a tail. Long enough that each system has a moment;
          short enough that the section is not the whole page. */}
      <div aria-hidden ref={track} className="relative h-[440vh] md:h-[520vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* The canvas yields the right of the stage to the panel, so the car
              is centred in what is left of it rather than behind the text. */}
          <div className="absolute inset-x-0 top-0 h-[46svh] md:inset-0 md:left-[11rem] md:right-[25rem] md:h-auto">
            {use3D ? (
              <CarScene
                activeRegion={region}
                openness={openness}
                turn={turn}
                compact={compact}
                running={running}
              />
            ) : null}
          </div>

          {/* ---- Progress rail: where you are, and how far is left ---- */}
          <ol className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:left-10 md:flex">
            {SERVICE_GROUPS.map((g, i) => {
              const on = i === index;
              return (
                <li key={g.id} className="flex items-center gap-3">
                  <span
                    className={`h-px transition-all duration-500 ${
                      on ? "w-9 bg-accent" : "w-4 bg-rule"
                    }`}
                  />
                  <span
                    className={`font-mono text-[0.64rem] uppercase tracking-label transition-colors duration-500 ${
                      on ? "text-accent" : "text-graphite/40"
                    }`}
                  >
                    {t(g.title)}
                  </span>
                </li>
              );
            })}
          </ol>

          {/* ---- The services for the system on screen ---- */}
          {/* On a phone this is a panel BELOW the car, not a caption over it:
              floating the text on the stage left the standfirst sitting on the
              battery pack, and no scrim strong enough to fix that still let you
              see the car. Desktop keeps the overlay, where there is room. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[46svh] bg-paper px-6 pt-7 md:bottom-0 md:left-auto md:right-10 md:top-0 md:flex md:w-[24rem] md:items-center md:bg-transparent md:px-0 md:pt-0">
            {/* A hairline where the stage meets the panel, so the join is drawn
                rather than accidental. */}
            <div className="absolute inset-x-6 top-0 h-px bg-rule md:hidden" />

            <AnimatePresence mode="wait">
              {group && (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                  className="relative"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-mono text-[0.64rem] tabular-nums text-accent">
                      {String((index ?? 0) + 1).padStart(2, "0")}
                      <span className="text-graphite/50">
                        {" / "}
                        {String(SERVICE_GROUPS.length).padStart(2, "0")}
                      </span>
                    </span>
                    <span aria-hidden className="h-px flex-1 bg-rule md:max-w-[3rem]" />
                  </div>

                  <h3 className="font-display text-[clamp(1.7rem,4.5vw,2.3rem)] leading-tight tracking-[-0.015em]">
                    {t(group.title)}
                  </h3>
                  <p className="mt-2 max-w-[38ch] text-[0.88rem] leading-relaxed text-graphite">
                    {t(group.standfirst)}
                  </p>

                  <ul className="mt-5 grid gap-2.5 md:gap-3">
                    {group.items.map((item, i) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + i * 0.05, duration: 0.3 }}
                        className="border-l border-accent/35 pl-4"
                      >
                        <p className="font-display text-[1.1rem] leading-snug tracking-[-0.01em]">
                          {t(item.name)}
                        </p>
                        <p className="mt-0.5 hidden text-[0.83rem] leading-relaxed text-graphite md:block">
                          {t(item.blurb)}
                        </p>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ---- Scroll affordance, only before the first system ---- */}
          <AnimatePresence>
            {index === null && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-x-0 top-[calc(46svh+2.5rem)] text-center font-mono text-[0.64rem] uppercase tracking-label text-graphite/70 md:inset-x-auto md:right-10 md:top-1/2 md:w-[24rem] md:-translate-y-1/2 md:text-left"
              >
                {t(c.hint)}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/**
 * Reduced motion: no sticky stage, nothing scrubbed, no canvas. The catalogue
 * laid out to be read, which is what the stage was presenting anyway.
 */
function StaticExplorer() {
  const t = useT();
  return (
    <section id="services" className="rule-above">
      <div className="section">
        <Intro />
        <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2">
          {SERVICE_GROUPS.map((group, i) => (
            <section key={group.id} className="rule-above pt-5">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[0.64rem] tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[1.5rem] leading-tight tracking-[-0.015em]">
                  {t(group.title)}
                </h3>
              </div>
              <p className="mt-3 max-w-[42ch] pl-9 text-[0.9rem] leading-relaxed text-graphite">
                {t(group.standfirst)}
              </p>
              <ul className="mt-5 grid gap-3 pl-9">
                {group.items.map((item) => (
                  <li key={item.id} className="border-l border-rule pl-4">
                    <p className="font-display text-[1.1rem] leading-snug tracking-[-0.01em]">
                      {t(item.name)}
                    </p>
                    <p className="mt-0.5 text-[0.83rem] leading-relaxed text-graphite">
                      {t(item.blurb)}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceExplorer() {
  const reduced = usePrefersReducedMotion();
  return reduced ? <StaticExplorer /> : <ScrollExplorer />;
}

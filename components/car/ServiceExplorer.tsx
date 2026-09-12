"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
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
import type { CalloutRefs } from "./Callout";

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
 * holds. The part is not playing an animation the scroll triggered — the scroll
 * IS the movement, and stopping halfway leaves it halfway open.
 * -------------------------------------------------------------------------*/
const START = 0.1;
const END = 0.94;
const SPAN = (END - START) / SERVICE_GROUPS.length;
const RAMP = 0.32;

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

  // Written every frame by CalloutTracker, never by React.
  const labelRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const dotRef = useRef<SVGCircleElement | null>(null);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const calloutRefs: CalloutRefs = {
    label: labelRef,
    path: pathRef,
    dot: dotRef,
    ring: ringRef,
  };

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  // How far the current system has separated. A MotionValue, so the scene reads
  // it inside useFrame and scrolling causes ZERO React re-renders.
  const openness = useTransform(scrollYProgress, (p) => {
    if (p <= START || p >= END) return 0;
    const local = ((p - START) / SPAN) % 1;
    return smooth(clamp01(local / RAMP));
  });

  // Yaw: roughly three quarters of a turn across the track, about 50 degrees
  // per system. The earlier 95 degrees total meant each system arrived at
  // nearly the same angle as the last, so the only thing that ever moved was a
  // part sliding out and back. Now the car is genuinely turning under you and
  // every system is presented from its own side.
  const turn = useTransform(scrollYProgress, [0, 1], [-0.45, 4.9]);
  const bar = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });

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
          a lead-in and a tail. */}
      <div aria-hidden ref={track} className="relative h-[640vh] md:h-[560vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* The car gets the whole stage. There is no side panel to make room
              for any more — the services are pinned to the part they describe. */}
          <div className="absolute inset-x-0 top-0 h-[52svh] md:inset-0 md:h-auto">
            {use3D ? (
              <CarScene
                activeRegion={region}
                openness={openness}
                progress={scrollYProgress}
                turn={turn}
                compact={compact}
                running={running}
                calloutRefs={calloutRefs}
              />
            ) : null}

            {/* ---- The six systems, so you can see what is coming ---- */}
            {/* Clears the fixed nav: the stage is pinned to the top of the viewport,
                so anything at the top of it sits underneath the bar. */}
            <ol className="pointer-events-none absolute left-11 top-[6.5rem] hidden md:block">
              {SERVICE_GROUPS.map((g, i) => {
                const on = i === index;
                const done = index !== null && i < index;
                return (
                  <li key={g.id} className="flex items-center gap-3 py-[0.28rem]">
                    <span
                      className={`h-px shrink-0 transition-all duration-500 ${
                        on ? "w-7 bg-accent" : done ? "w-4 bg-accent/40" : "w-4 bg-rule"
                      }`}
                    />
                    <span
                      className={`font-mono text-[0.63rem] uppercase tracking-label transition-colors duration-500 ${
                        on ? "text-accent" : done ? "text-graphite/70" : "text-graphite/35"
                      }`}
                    >
                      {t(g.title)}
                    </span>
                  </li>
                );
              })}
            </ol>

            {/* ---- Leader line and the point it comes from ---- */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
              <circle
                ref={ringRef}
                r="13"
                className="fill-none stroke-accent/40 opacity-0 transition-opacity duration-300"
                strokeWidth="1"
              />
              <circle
                ref={dotRef}
                r="3"
                className="fill-accent opacity-0 transition-opacity duration-300"
              />
              <path
                ref={pathRef}
                className="fill-none stroke-accent/55 opacity-0 transition-opacity duration-300"
                strokeWidth="1"
              />
            </svg>

            {/* ---- The callout ---- */}
            <div
              ref={labelRef}
              data-side="right"
              // Phone: placed by CSS under the stage. Desktop: placed every frame
              // by CalloutTracker, in whichever margin the part is nearer.
              className="pointer-events-none absolute left-0 top-[calc(52svh+1.5rem)] w-full px-6 opacity-0 transition-opacity duration-300 data-[side=left]:text-right data-[side=right]:text-left md:top-0 md:w-[16rem] md:px-0 lg:w-[18rem]"
            >
              <AnimatePresence mode="wait">
                {group && (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    <p className="font-mono text-[0.62rem] tabular-nums tracking-label text-accent">
                      {String((index ?? 0) + 1).padStart(2, "0")}
                      <span className="text-graphite/50">
                        {" / "}
                        {String(SERVICE_GROUPS.length).padStart(2, "0")}
                      </span>
                    </p>
                    <h3 className="mt-1.5 font-display text-[1.55rem] leading-tight tracking-[-0.015em] sm:text-[1.8rem]">
                      {t(group.title)}
                    </h3>
                    <p className="mt-1.5 text-[0.83rem] leading-relaxed text-graphite">
                      {t(group.standfirst)}
                    </p>
                    <ul className="mt-3.5 grid gap-1.5">
                      {group.items.map((item, i) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.06 + i * 0.045, duration: 0.25 }}
                          className="font-display text-[1rem] leading-snug tracking-[-0.01em]"
                        >
                          {t(item.name)}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ---- Scroll affordance, only before the first system ---- */}
          <AnimatePresence>
            {index === null && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute inset-x-0 bottom-16 text-center font-mono text-[0.64rem] uppercase tracking-label text-graphite/70"
              >
                {t(c.hint)}
              </motion.p>
            )}
          </AnimatePresence>

          {/* ---- Progress: one hairline, filling. Replaces a second list. ---- */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-rule">
            <motion.div style={{ scaleX: bar }} className="h-full origin-left bg-accent" />
          </div>
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

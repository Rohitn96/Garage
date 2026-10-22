"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import type { CarRegionId, ServiceGroup } from "@/data/services";
import type { CalloutRefs } from "./Callout";

// three.js stays out of the initial bundle and never runs on the server.
const CarScene = dynamic(() => import("./CarScene").then((m) => m.CarScene), { ssr: false });

/* Timeline
 * 0.00 to 0.10   the whole car, turning into view
 * 0.10 to 0.94   every system, one after another
 * 0.94 to 1.00   back together before the next section
 * Within each system's slice, `openness` ramps over the first part and holds:
 * the scroll IS the movement, so stopping halfway leaves it halfway open.
 */
const START = 0.1;
const END = 0.94;
const RAMP = 0.32;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (t: number) => t * t * (3 - 2 * t);

function useCompact(): boolean {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(max-width: 767px)");
    const update = () => setCompact(q.matches);
    update();
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);
  return compact;
}

/**
 * The car opened up system by system, on every screen size. On a phone the car
 * takes the top of the stage and the system's details sit beneath it; on wider
 * screens the details sit in the margin with a leader line to the part. The
 * stage is a presentation of the service grid that follows, so it is hidden
 * from assistive tech.
 */
export function ServiceExplorer({ groups, label, title, lead, hint }: { groups: ServiceGroup[]; label: string; title: string; lead: string; hint: string }) {
  const compact = useCompact();
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const span = (END - START) / groups.length;

  const labelRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const dotRef = useRef<SVGCircleElement | null>(null);
  const ringRef = useRef<SVGCircleElement | null>(null);
  const calloutRefs: CalloutRefs = { label: labelRef, path: pathRef, dot: dotRef, ring: ringRef };

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const openness = useTransform(scrollYProgress, (p) => {
    if (p <= START || p >= END) return 0;
    return smooth(clamp01((((p - START) / span) % 1) / RAMP));
  });
  const turn = useTransform(scrollYProgress, [0, 1], [-0.45, 4.9]);
  const bar = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p <= START || p >= END) return setIndex(null);
    setIndex(Math.min(Math.max(Math.floor((p - START) / span), 0), groups.length - 1));
  });

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => setRunning(entries.some((e) => e.isIntersecting)), { rootMargin: "150px 0px" });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const group = index === null ? null : groups[index];
  const region: CarRegionId | null = group?.id ?? null;
  const held = useRef<{ group: ServiceGroup; index: number } | null>(null);
  if (group && index !== null) held.current = { group, index };
  const shown = group && index !== null ? { group, index } : held.current;

  return (
    <section aria-hidden className="border-b border-rule">
      <div className="wrap pt-16 md:pt-24">
        <p className="label flex items-center gap-3">
          <span aria-hidden className="h-px w-6 bg-accent" />
          {label}
        </p>
        <h2 className="h2 mt-5 max-w-[20ch]">{title}</h2>
        <p className="lead mt-5 max-w-[56ch]">{lead}</p>
      </div>

      <div
        ref={track}
        style={{ "--track": `${groups.length * 85}vh`, "--track-md": `${groups.length * 80}vh` } as CSSProperties}
        className="relative h-[var(--track)] md:h-[var(--track-md)]"
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* Soft floor light under the car. */}
          <div className="pointer-events-none absolute inset-x-0 top-[18%] mx-auto h-[45%] max-w-3xl rounded-full bg-accent/10 blur-3xl md:top-[30%]" />

          <div className="absolute inset-x-0 top-0 h-[54svh] md:inset-0 md:h-auto">
            <CarScene
              activeRegion={region}
              openness={openness}
              progress={scrollYProgress}
              turn={turn}
              compact={compact}
              running={running}
              calloutRefs={calloutRefs}
            />

            <ol className="pointer-events-none absolute left-10 top-28 hidden md:block">
              {groups.map((g, i) => {
                const on = i === index;
                const done = index !== null && i < index;
                return (
                  <li key={g.id} className="flex items-center gap-3 py-1">
                    <span className={`h-px shrink-0 transition-all duration-3 ${on ? "w-8 bg-accent" : done ? "w-4 bg-accent/40" : "w-4 bg-ruleStrong"}`} />
                    <span className={`text-step--2 font-semibold uppercase tracking-[0.14em] transition-colors duration-3 ${on ? "text-accent" : done ? "text-muted" : "text-faint"}`}>
                      {g.title}
                    </span>
                  </li>
                );
              })}
            </ol>

            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
              <circle ref={ringRef} r="13" className="fill-none stroke-accent/40 opacity-0 transition-opacity duration-3" strokeWidth="1" />
              <circle ref={dotRef} r="3" className="fill-accent opacity-0 transition-opacity duration-3" />
              <path ref={pathRef} className="fill-none stroke-accent/60 opacity-0 transition-opacity duration-3" strokeWidth="1" />
            </svg>

            {/* Phone: placed by CSS under the car. Wider: placed every frame by
                the callout tracker, in whichever margin the part is nearer. */}
            <div
              ref={labelRef}
              data-side="right"
              className="pointer-events-none absolute left-0 top-[calc(54svh+0.75rem)] w-full px-4 opacity-0 transition-opacity duration-3 data-[side=left]:md:text-right md:top-0 md:w-[19rem] md:px-0"
            >
              {shown && (
                <motion.div
                  key={shown.group.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
                  className="rounded-lg border border-rule bg-ground/90 p-5 shadow-[0_24px_48px_-32px_rgb(0_0_0/0.6)] backdrop-blur"
                >
                  <p className="font-mono text-step--2 tabular-nums text-accent">
                    {shown.index + 1} / {groups.length}
                  </p>
                  <h3 className="mt-1.5 text-step-2 font-bold">{shown.group.title}</h3>
                  <p className="mt-1.5 text-step--1 leading-relaxed text-muted">{shown.group.standfirst}</p>
                  <ul className="mt-3 grid gap-1.5">
                    {shown.group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-step--1">
                        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>

          {index === null && (
            <p className="pointer-events-none absolute inset-x-0 bottom-24 text-center text-step--2 font-semibold uppercase tracking-[0.16em] text-muted md:bottom-16">
              {hint}
            </p>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-rule">
            <motion.div style={{ scaleX: bar }} className="h-full origin-left bg-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}

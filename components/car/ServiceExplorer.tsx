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

/**
 * Whether this visitor gets the WebGL car: a wide screen, motion allowed, at
 * least four cores, and no Save-Data or slow connection. Everyone else gets the
 * service grid that follows this section, which carries the same content.
 */
function useCanRender3D(): boolean {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
    const slow = nav.connection?.saveData || /(^|-)2g|3g/.test(nav.connection?.effectiveType ?? "");
    const cores = navigator.hardwareConcurrency;
    const update = () => setOk(wide.matches && !reduced.matches && !slow && (typeof cores !== "number" || cores >= 4));
    update();
    wide.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);
  return ok;
}

/**
 * The car opened up system by system. Desktop only, decided by CSS so nothing
 * shifts after load; the whole stage is a visual presentation of the service
 * grid below it and is hidden from assistive tech.
 */
export function ServiceExplorer({ groups, label, title, lead, hint }: { groups: ServiceGroup[]; label: string; title: string; lead: string; hint: string }) {
  const can3D = useCanRender3D();
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [armed, setArmed] = useState(false);
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

  // three.js is fetched only once the track is near, never on load.
  useEffect(() => {
    if (armed || !can3D) return;
    const node = track.current;
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && setArmed(true), { rootMargin: "50% 0px" });
    if (node) io.observe(node);
    return () => io.disconnect();
  }, [armed, can3D]);

  const group = index === null ? null : groups[index];
  const region: CarRegionId | null = group?.id ?? null;
  const held = useRef<{ group: ServiceGroup; index: number } | null>(null);
  if (group && index !== null) held.current = { group, index };
  const shown = group && index !== null ? { group, index } : held.current;

  return (
    <section aria-hidden className="hidden border-b border-rule lg:block motion-reduce:hidden">
      <div className="wrap pt-24">
        <p className="label flex items-center gap-3">
          <span aria-hidden className="h-px w-6 bg-accent" />
          {label}
        </p>
        <h2 className="h2 mt-5 max-w-[20ch]">{title}</h2>
        <p className="lead mt-5 max-w-[56ch]">{lead}</p>
      </div>

      <div
        ref={track}
        style={{ "--track": `${groups.length * 80}vh` } as CSSProperties}
        className="relative h-[var(--track)]"
      >
        <div className="blueprint sticky top-0 h-[100svh] overflow-hidden">
          <div className="absolute inset-0">
            {can3D && armed ? (
              <CarScene
                activeRegion={region}
                openness={openness}
                progress={scrollYProgress}
                turn={turn}
                compact={false}
                running={running}
                calloutRefs={calloutRefs}
              />
            ) : null}

            <ol className="pointer-events-none absolute left-10 top-28">
              {groups.map((g, i) => {
                const on = i === index;
                const done = index !== null && i < index;
                return (
                  <li key={g.id} className="flex items-center gap-3 py-1">
                    <span className={`h-px shrink-0 transition-all duration-2 ${on ? "w-7 bg-accent" : done ? "w-4 bg-accent/40" : "w-4 bg-rule"}`} />
                    <span className={`font-mono text-step--2 uppercase tracking-label transition-colors duration-2 ${on ? "text-accent" : done ? "text-muted" : "text-faint"}`}>
                      {g.title}
                    </span>
                  </li>
                );
              })}
            </ol>

            <svg className="pointer-events-none absolute inset-0 h-full w-full">
              <circle ref={ringRef} r="13" className="fill-none stroke-accent/40 opacity-0 transition-opacity duration-3" strokeWidth="1" />
              <circle ref={dotRef} r="3" className="fill-accent opacity-0 transition-opacity duration-3" />
              <path ref={pathRef} className="fill-none stroke-accent/60 opacity-0 transition-opacity duration-3" strokeWidth="1" />
            </svg>

            <div
              ref={labelRef}
              data-side="right"
              className="pointer-events-none absolute left-0 top-0 w-[18rem] opacity-0 transition-opacity duration-3 data-[side=left]:text-right"
            >
              {shown && (
                <motion.div
                  key={shown.group.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
                  className="rounded border border-rule bg-ground/90 p-4 backdrop-blur"
                >
                  <p className="font-mono text-step--2 tabular-nums tracking-label text-accent">
                    SYS {String(shown.index + 1).padStart(2, "0")}
                    <span className="text-faint"> / {String(groups.length).padStart(2, "0")}</span>
                  </p>
                  <h3 className="mt-1.5 text-step-2 font-bold">{shown.group.title}</h3>
                  <p className="mt-1.5 text-step--1 leading-relaxed text-muted">{shown.group.standfirst}</p>
                  <ul className="mt-3 grid gap-1">
                    {shown.group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-step--1">
                        <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-ok" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>

          {index === null && (
            <p className="pointer-events-none absolute inset-x-0 bottom-16 text-center font-mono text-step--2 uppercase tracking-label text-muted">
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

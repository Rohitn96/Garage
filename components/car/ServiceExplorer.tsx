"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { SERVICE_GROUPS, type CarRegionId } from "@/data/services";
import {
  useIsCompactViewport,
  usePrefersReducedMotion,
  useRenders3D,
} from "@/lib/useMotionPreference";
import { ExplodedDiagram } from "./ExplodedDiagram";
import { ServiceNames } from "./ServiceNames";

// three.js stays out of the initial bundle and never runs on the server.
const CarScene = dynamic(() => import("./CarScene").then((m) => m.CarScene), {
  ssr: false,
});

/* --- Scroll timeline ------------------------------------------------------
 * 0.00 - 0.16  car assembled, then comes apart
 * 0.16 - 0.88  one region named at a time, six in sequence
 * 0.88 - 1.00  car reassembles before the next section
 * -------------------------------------------------------------------------*/
const FIRST_REGION = 0.16;
const LAST_REGION = 0.88;
const REGION_SPAN = (LAST_REGION - FIRST_REGION) / SERVICE_GROUPS.length;

function SectionIntro() {
  return (
    <>
      <p className="label">02 — Services</p>
      <h2 className="mt-8 max-w-[18ch] font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
        Everything a car needs, <em className="italic text-pine">taken apart.</em>
      </h2>
      <p className="mt-6 max-w-[52ch] text-graphite">
        Servicing, diagnostics and repair across the whole vehicle. Standard jobs
        carry a fixed price; anything that depends on your particular car gets
        inspected and quoted before we start.
      </p>
    </>
  );
}

/**
 * Every group and every service, in document order.
 *
 * Rendered visibly on the reduced-motion path, and screen-reader-only inside the
 * scroll experience — where the labels otherwise exist only once a visitor has
 * scrolled to the right offset, which leaves crawlers, no-JS visitors and
 * assistive tech with an empty section.
 */
function FullCatalogue() {
  return (
    <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
      {SERVICE_GROUPS.map((group, i) => (
        <section key={group.id} className="rule-above pt-5">
          <p className="label">
            {String(i + 1).padStart(2, "0")} / {group.title}
          </p>
          <p className="mt-3 max-w-[42ch] text-[0.95rem] leading-relaxed text-graphite">
            {group.standfirst}
          </p>
          <ul className="mt-6 grid gap-3">
            {group.items.map((item) => (
              <li key={item.id} className="border-b border-rule/70 pb-3 last:border-0">
                <h3 className="font-display text-[1.35rem] leading-snug tracking-[-0.01em]">
                  {item.name}
                </h3>
                <p className="mt-1 text-[0.9rem] leading-relaxed text-graphite">
                  {item.blurb}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

/** The scroll-scrubbed experience: sticky stage, car comes apart, names follow. */
function ScrollExplorer() {
  const track = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const use3D = useRenders3D();
  const compact = useIsCompactViewport();

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  const explode = useTransform(
    scrollYProgress,
    [0.04, 0.16, LAST_REGION, 0.97],
    [0, 1, 1, 0],
  );

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p < 0.12 || p > 0.94) {
      setActiveIndex(null);
      return;
    }
    const index = Math.floor((p - FIRST_REGION) / REGION_SPAN);
    setActiveIndex(Math.min(Math.max(index, 0), SERVICE_GROUPS.length - 1));
  });

  const activeGroup = activeIndex === null ? null : SERVICE_GROUPS[activeIndex];
  const activeRegion: CarRegionId | null = activeGroup?.id ?? null;

  return (
    <section id="services" className="rule-above">
      {/*
        The accessible copy of this section. The animated stage below is a visual
        presentation of exactly this content, so it is hidden from assistive tech
        rather than announced twice.
      */}
      <div className="sr-only">
        <SectionIntro />
        <FullCatalogue />
      </div>

      {/* Heading sits in normal flow and scrolls away before the car pins. */}
      <div aria-hidden className="mx-auto w-full max-w-page px-6 pb-8 pt-24 md:px-10 md:pt-32">
        <SectionIntro />
      </div>

      {/*
        Track length. Phones get a shorter run: six regions at ~65vh each plus
        lead-in and tail is ~4.7 screens, against ~7.2 on desktop where there is
        room to let each region breathe. The scroll fractions above are
        proportional, so they hold at either height.
      */}
      <div aria-hidden ref={track} className="relative h-[470vh] md:h-[720vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* Nothing in this stage scrolls: the page is the only scroll track,
              and the service names are set beside the parts themselves. */}
          <div className="absolute inset-0">
            {use3D ? (
              <CarScene
                explode={explode}
                activeRegion={activeRegion}
                compact={compact}
              />
            ) : (
              <div className="flex h-full items-center justify-center px-6">
                <ExplodedDiagram
                  explode={explode}
                  activeRegion={activeRegion}
                  className="h-auto w-full max-w-[620px]"
                />
              </div>
            )}
          </div>

          {/* Phone label. The desktop one is projected from the part inside the
              canvas; at this width that runs off the edge, so the same
              typography sits at the foot of the stage and the car above it
              carries the pointing. */}
          {compact && activeGroup && activeIndex !== null && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-10">
              <ServiceNames
                group={activeGroup}
                index={activeIndex}
                total={SERVICE_GROUPS.length}
                align="center"
              />
            </div>
          )}

          {/* Region index — where you are in the sequence. */}
          <ol className="pointer-events-none absolute left-6 top-8 hidden flex-col gap-2.5 md:left-10 md:flex">
            {SERVICE_GROUPS.map((group, i) => (
              <li key={group.id} className="flex items-center gap-3">
                <span
                  className={`h-px transition-all duration-500 ${
                    i === activeIndex ? "w-8 bg-rule" : "w-4 bg-rule/45"
                  }`}
                />
                <span
                  className={`font-mono text-[0.66rem] uppercase tracking-label transition-colors duration-500 ${
                    i === activeIndex ? "text-ink" : "text-graphite/45"
                  }`}
                >
                  {group.title}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/**
 * Reduced-motion path: no sticky stage, no scroll-jacking, nothing scrubbed.
 * One static exploded diagram and the whole catalogue laid out to be read.
 */
function StaticExplorer() {
  const explode = useMotionValue(0.85);

  return (
    <section id="services" className="rule-above">
      <div className="mx-auto w-full max-w-page px-6 py-24 md:px-10">
        <SectionIntro />
        <ExplodedDiagram
          explode={explode}
          activeRegion={null}
          className="mx-auto my-16 h-auto w-full max-w-[680px]"
        />
        <FullCatalogue />
      </div>
    </section>
  );
}

export function ServiceExplorer() {
  const reduced = usePrefersReducedMotion();
  return reduced ? <StaticExplorer /> : <ScrollExplorer />;
}

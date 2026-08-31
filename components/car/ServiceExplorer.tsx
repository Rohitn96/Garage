"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  PRICE_DISCLAIMER,
  SERVICE_GROUPS,
  type CarRegionId,
} from "@/data/services";
import { usePrefersReducedMotion, useRenders3D } from "@/lib/useMotionPreference";
import { ExplodedDiagram } from "./ExplodedDiagram";
import { DiagramStage } from "./DiagramStage";
import { PriceCard } from "./PriceCard";

// three.js stays out of the initial bundle and never runs on the server.
const CarScene = dynamic(() => import("./CarScene").then((m) => m.CarScene), {
  ssr: false,
});

/* --- Scroll timeline ------------------------------------------------------
 * 0.00 - 0.08  car assembled, section heading still up
 * 0.08 - 0.16  car comes apart
 * 0.16 - 0.88  one region focused at a time, six in sequence
 * 0.88 - 1.00  car reassembles before the next section
 * -------------------------------------------------------------------------*/
const FIRST_REGION = 0.16;
const LAST_REGION = 0.88;
const REGION_SPAN = (LAST_REGION - FIRST_REGION) / SERVICE_GROUPS.length;

function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-fog/70 ${className}`}>
      {PRICE_DISCLAIMER}
    </p>
  );
}

/**
 * Every group and every price, in document order.
 *
 * Rendered visibly on the reduced-motion path, and screen-reader-only inside the
 * scroll experience — where the cards otherwise exist only once a visitor has
 * scrolled to the right offset, which leaves crawlers, no-JS visitors and
 * assistive tech with an empty section.
 */
function FullCatalogue({ headingLevel = "h3" }: { headingLevel?: "h3" | "h4" }) {
  const Heading = headingLevel;

  return (
    <>
      <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
        {SERVICE_GROUPS.map((group) => (
          <div key={group.id}>
            <Heading className="font-display text-xl font-bold uppercase tracking-tight">
              {group.title}
            </Heading>
            <p className="mt-2 text-sm leading-relaxed text-fog">{group.standfirst}</p>
            <ul className="mt-4 grid gap-2.5">
              {group.items.map((item) => (
                <PriceCard key={item.id} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Disclaimer className="mt-12" />
    </>
  );
}

function SectionIntro() {
  return (
    <>
      <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.1rem)] font-bold uppercase leading-[1.02] tracking-tight">
        What we do,
        <br />
        <span className="text-rust">and what it costs</span>
      </h2>
      <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-fog sm:text-base">
        Standard jobs carry a fixed price. Anything that depends on your
        particular car gets inspected and quoted before we start — you approve
        the number, then we work.
      </p>
    </>
  );
}

/** The scroll-scrubbed experience: sticky stage, car comes apart, prices follow. */
function ScrollExplorer() {
  const track = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const use3D = useRenders3D();

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
    <section id="services" className="relative">
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
      <div aria-hidden className="mx-auto w-full max-w-page px-6 pb-6 pt-24 md:pt-32">
        <SectionIntro />
      </div>

      {/*
        Track length. Phones get a much shorter run: six regions at ~65vh each
        plus lead-in and tail is ~4.7 screens, against ~7.2 on desktop where
        there is room to let each region breathe. The scroll fractions below are
        proportional, so they hold at either height.
      */}
      <div aria-hidden ref={track} className="relative h-[470vh] md:h-[720vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Stage — 3D on capable desktops, the flat diagram everywhere else.
            Full width now: the price panel that used to occupy the right 430px
            is gone, replaced by callouts anchored to the parts themselves. */}
        <div className="absolute inset-0">
          {use3D ? (
            <CarScene explode={explode} activeRegion={activeRegion} />
          ) : (
            <DiagramStage
              explode={explode}
              activeRegion={activeRegion}
              activeIndex={activeIndex}
            />
          )}
        </div>

        {/* Always on screen while prices are, so no screenshot loses the caveat —
            at every width. It used to be md-only, with phones relying on a copy
            inside the old price panel; when that panel went, mobile briefly had
            placeholder prices and no disclaimer at all. */}
        <Disclaimer className="pointer-events-none absolute bottom-3 left-1/2 z-10 w-[92%] -translate-x-1/2 text-center md:bottom-4 md:left-6 md:w-auto md:max-w-[42ch] md:translate-x-0 md:text-left" />

        {/* Region rail — where you are in the sequence. Parked top-left so it
            stays clear of callouts anchored on the car's left-hand parts. */}
        <div className="pointer-events-none absolute left-6 top-8 hidden flex-col gap-3 md:flex">
          {SERVICE_GROUPS.map((group, i) => (
            <div key={group.id} className="flex items-center gap-3">
              <span
                className={`h-px transition-all duration-300 ${
                  i === activeIndex ? "w-7 bg-rust" : "w-3.5 bg-line"
                }`}
              />
              <span
                className={`text-[0.7rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
                  i === activeIndex ? "text-chalk" : "text-fog/40"
                }`}
              >
                {group.title}
              </span>
            </div>
          ))}
        </div>

        {/*
          No price panel here any more. The prices for the focused region are
          rendered as a callout anchored to the part itself — inside the canvas
          for the WebGL path (see CarModel), inside DiagramStage for the flat
          one. That removes the nested scroll container that used to fight the
          page scroll, and it is why nothing in this stage scrolls.
        */}
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
    <section id="services" className="mx-auto w-full max-w-page px-6 py-24">
      <SectionIntro />

      {/* Ahead of the prices, not just after them. The trailing copy alone left
          anyone reading the middle of a long catalogue looking at placeholder
          figures with no caveat anywhere on screen. */}
      <Disclaimer className="mt-6" />

      <ExplodedDiagram
        explode={explode}
        activeRegion={null}
        className="mx-auto mt-12 h-auto w-full max-w-[620px]"
      />

      <div className="mt-14">
        <FullCatalogue />
      </div>
    </section>
  );
}

export function ServiceExplorer() {
  const reduced = usePrefersReducedMotion();
  return reduced ? <StaticExplorer /> : <ScrollExplorer />;
}

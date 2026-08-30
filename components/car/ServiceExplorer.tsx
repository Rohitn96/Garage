"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  AnimatePresence,
  motion,
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

      <div
        aria-hidden
        ref={track}
        className="relative"
        style={{ height: `${(SERVICE_GROUPS.length + 2) * 100}vh` }}
      >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Stage — 3D on capable desktops, the flat diagram everywhere else.
            On wide screens the canvas stops short of the price panel so the car
            centres in the space it actually has. */}
        <div className="absolute inset-y-0 left-0 right-0 md:right-[430px]">
          {use3D ? (
            <CarScene explode={explode} activeRegion={activeRegion} />
          ) : (
            <div className="flex h-full items-center justify-center px-4 pb-[46svh] pt-16 md:pb-0">
              <ExplodedDiagram
                explode={explode}
                activeRegion={activeRegion}
                className="h-auto w-full max-w-[560px]"
              />
            </div>
          )}
        </div>

        {/* Always on screen while prices are, so no screenshot loses the caveat. */}
        <Disclaimer className="pointer-events-none absolute bottom-4 left-6 z-10 hidden max-w-[42ch] md:block" />

        {/* Region rail — where you are in the sequence. */}
        <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:flex">
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

        {/* Price cards for the region currently separated. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 md:inset-y-0 md:left-auto md:right-0 md:flex md:w-[430px] md:items-center">
          <AnimatePresence mode="wait">
            {activeGroup && (
              <motion.div
                key={activeGroup.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="pointer-events-auto max-h-[46svh] overflow-y-auto border-t border-line bg-graphite/95 px-6 py-5 backdrop-blur md:max-h-[76svh] md:border-l md:border-t-0 md:bg-graphite/80 md:px-7 md:py-7"
              >
                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-rust">
                  {String((activeIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                  {String(SERVICE_GROUPS.length).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight">
                  {activeGroup.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fog">
                  {activeGroup.standfirst}
                </p>
                <ul className="mt-5 grid gap-2.5">
                  {activeGroup.items.map((item) => (
                    <PriceCard key={item.id} item={item} />
                  ))}
                </ul>
                {/* Desktop keeps the persistent copy bottom-left instead. */}
                <Disclaimer className="mt-5 md:hidden" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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

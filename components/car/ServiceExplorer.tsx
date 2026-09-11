"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { SERVICE_GROUPS, type CarRegionId } from "@/data/services";
import { useT } from "@/lib/i18n";
import { CONTENT } from "@/lib/content";
import { useIsCompactViewport, useRenders3D } from "@/lib/useMotionPreference";
import { Reveal } from "../Reveal";

// three.js stays out of the initial bundle and never runs on the server.
const CarScene = dynamic(() => import("./CarScene").then((m) => m.CarScene), {
  ssr: false,
});

/**
 * The car section.
 *
 * This used to be a scroll-scrubbed, sticky, 720vh track: roughly half the
 * page's total height spent naming twenty services, which the visitor could
 * neither skim nor dwell on — scrolling to read pushed them off the thing they
 * were reading. It is now one screen, and the visitor chooses.
 *
 * The region list IS the control. That removes three things at once: the
 * scroll-jacking, the floating in-canvas labels that fell off narrow viewports,
 * and the screen-reader-only duplicate of the whole catalogue that existed
 * because the labels only rendered at the right scroll offset. Buttons and a
 * list are accessible by construction, so there is nothing to duplicate.
 *
 * No prices here. The explorer names what we do; every figure on the site is in
 * the pricing section.
 */
export function ServiceExplorer() {
  const t = useT();
  const c = CONTENT.explorer;
  const use3D = useRenders3D();
  const compact = useIsCompactViewport();

  const [active, setActive] = useState<CarRegionId | null>(null);
  const [hovered, setHovered] = useState<CarRegionId | null>(null);
  const [running, setRunning] = useState(false);
  const host = useRef<HTMLDivElement>(null);

  // The render loop only turns over while the section is on screen. On a page
  // this long, that is a small fraction of the visit.
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => setRunning(entries.some((e) => e.isIntersecting)),
      { rootMargin: "200px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const toggle = useCallback((id: CarRegionId) => {
    setActive((current) => (current === id ? null : id));
  }, []);

  // Clicking a part in the scene selects, rather than toggles: a click landing
  // on the system already open should not close it out from under the pointer.
  const selectFromScene = useCallback((id: CarRegionId) => setActive(id), []);

  return (
    <section id="services" className="rule-above">
      <div className="section">
        <Reveal>
          <p className="label">{t(c.eyebrow)}</p>
          <h2 className="mt-7 max-w-[16ch] h-section">
            {t(c.headingA)} <em className="italic text-accent">{t(c.headingAccent)}</em>
          </h2>
          <p className="mt-6 max-w-[46ch] text-graphite">{t(c.standfirst)}</p>
        </Reveal>

        <div ref={host} className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---- Stage ---- */}
          <div className="lg:col-span-7">
            <div
              aria-hidden
              className={`relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-rule bg-[#0E0E10] sm:aspect-[16/10] lg:aspect-auto lg:h-[min(64vh,560px)] ${
                hovered ? "cursor-pointer" : ""
              }`}
            >
              {use3D ? (
                <CarScene
                  activeRegion={active}
                  onSelect={selectFromScene}
                  onHover={setHovered}
                  compact={compact}
                  running={running}
                />
              ) : (
                /* Reduced motion, or a device that will drop frames. No canvas
                   at all — the list beside this is the content, and it is
                   complete on its own. */
                <div className="flex h-full items-center justify-center px-8 text-center">
                  <p className="max-w-[28ch] font-display text-[1.5rem] leading-snug text-graphite">
                    {t(c.standfirst)}
                  </p>
                </div>
              )}

              {use3D && (
                <p className="pointer-events-none absolute bottom-4 left-4 font-mono text-[0.62rem] uppercase tracking-label text-graphite/60">
                  {t(c.hint)}
                </p>
              )}
            </div>
          </div>

          {/* ---- Systems ---- */}
          <div className="lg:col-span-5">
            <ul className="border-t border-rule">
              {SERVICE_GROUPS.map((group, i) => {
                const open = active === group.id;
                return (
                  <li key={group.id} className="border-b border-rule">
                    <h3>
                      <button
                        type="button"
                        onClick={() => toggle(group.id)}
                        onMouseEnter={() => setHovered(group.id)}
                        onMouseLeave={() => setHovered(null)}
                        aria-expanded={open}
                        aria-controls={`system-${group.id}`}
                        className="group flex w-full items-baseline gap-4 py-4 text-left transition-colors"
                      >
                        <span
                          className={`font-mono text-[0.66rem] tabular-nums transition-colors ${
                            open ? "text-accent" : "text-graphite/50"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`flex-1 font-display text-[1.45rem] leading-snug tracking-[-0.01em] transition-colors ${
                            open ? "text-accent" : "text-ink group-hover:text-accent"
                          }`}
                        >
                          {t(group.title)}
                        </span>
                        <span
                          aria-hidden
                          className={`mt-2 h-px w-5 shrink-0 transition-all duration-300 ${
                            open ? "w-8 bg-accent" : "bg-rule group-hover:bg-accent/60"
                          }`}
                        />
                      </button>
                    </h3>

                    {/* Kept in the DOM and hidden, so the catalogue is complete
                        for crawlers and assistive tech without a second copy. */}
                    <div id={`system-${group.id}`} hidden={!open} className="pb-6 pl-10 pr-2">
                      <p className="max-w-[40ch] text-[0.9rem] leading-relaxed text-graphite">
                        {t(group.standfirst)}
                      </p>
                      <ul className="mt-5 grid gap-3.5">
                        {group.items.map((item) => (
                          <li key={item.id} className="border-l border-rule pl-4">
                            <p className="font-display text-[1.1rem] leading-snug tracking-[-0.01em]">
                              {t(item.name)}
                            </p>
                            <p className="mt-0.5 text-[0.85rem] leading-relaxed text-graphite">
                              {t(item.blurb)}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a href="#pricing" className="link-underline text-[0.92rem] font-medium">
                {t(c.pricingLink)}
              </a>
              {active && (
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="font-mono text-[0.66rem] uppercase tracking-label text-graphite transition-colors hover:text-ink"
                >
                  {t(c.reset)}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

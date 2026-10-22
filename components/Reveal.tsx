"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fades sections up as they scroll into view. Content is visible in the HTML;
 * this only arms the effect after hydration, marks anything already on screen
 * as shown first (so nothing above the fold ever blinks), and does nothing at
 * all under prefers-reduced-motion. Opacity and transform only: no layout shift.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    const fold = window.innerHeight * 0.92;
    for (const el of items) if (el.getBoundingClientRect().top < fold) el.classList.add("is-in");
    root.classList.add("reveal-on");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    items.filter((el) => !el.classList.contains("is-in")).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}

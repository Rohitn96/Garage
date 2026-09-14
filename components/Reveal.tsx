"use client";

import { motion, useInView } from "framer-motion";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/useMotionPreference";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * The page's one generic entrance: a short rise-and-fade when a block scrolls in.
 *
 * Deliberately understated and deliberately NOT what the car section does — the
 * exploded view is the only element on the page allowed to be scroll-scrubbed.
 *
 * Visible in the server HTML. This used to be `initial={{ opacity: 0 }}`, which
 * Framer writes into the markup, so every section of the site was shipped
 * invisible and stayed that way until the JS bundle had hydrated:
 *   - anything that does not run JS (link previews, most non-Google crawlers)
 *     saw a page of transparent text
 *   - a block already on screen at load became the Largest Contentful Paint and
 *     waited for hydration — on a phone the Tesla page's services heading did
 *
 * Now the block is hidden only if it starts below the fold. That is decided in
 * a layout effect, before the browser paints, so nothing visible ever flashes.
 * A block that is on screen at load simply stays put.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const [belowFold, setBelowFold] = useState(false);

  useLayoutEffect(() => {
    const top = ref.current?.getBoundingClientRect().top;
    if (top !== undefined && top > window.innerHeight) setBelowFold(true);
  }, []);

  const shown = reduced || !belowFold || inView;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={shown ? "shown" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 18, transition: { duration: 0 } },
        shown: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ComponentProps } from "react";

/*
 * Heavy client components, split out of the shared bundle so a page only
 * downloads them when it renders them: framer-motion and three.js for the
 * explorer, react-hook-form for the booking form.
 *
 * The form keeps a fixed minimum height while it loads, so the page does not
 * shift when it arrives.
 */
const ServiceExplorer = dynamic(() => import("./car/ServiceExplorer").then((m) => m.ServiceExplorer), { ssr: false });

/**
 * The explorer runs on phones and desktops alike, but its code is fetched only
 * when the visitor scrolls within a screen or so of it, never on page load.
 * Reduced motion, Save-Data, slow connections and low-core devices skip it;
 * the service grid that follows carries the same content.
 */
export function LazyServiceExplorer(props: ComponentProps<typeof ServiceExplorer>) {
  const sentinel = useRef<HTMLDivElement>(null);
  const [wanted, setWanted] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
    const slow = nav.connection?.saveData || /(^|-)2g|3g/.test(nav.connection?.effectiveType ?? "");
    const weak = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency < 4;
    if (slow || weak || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !sentinel.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setWanted(true);
          io.disconnect();
        }
      },
      // Half a screen of lead time: enough for the code to arrive before the
      // stage is reached, without loading it on page load on a phone.
      { rootMargin: "50% 0px" },
    );
    io.observe(sentinel.current);
    return () => io.disconnect();
  }, []);

  return wanted ? <ServiceExplorer {...props} /> : <div ref={sentinel} aria-hidden />;
}

export const LazyBookingSection = dynamic(() => import("./BookingForm").then((m) => m.BookingSection), {
  ssr: false,
  loading: () => <div className="min-h-[1400px] md:min-h-[1200px]" aria-busy="true" />,
});

"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ComponentProps } from "react";

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
 * The explorer is desktop only and hidden from assistive tech. Phones and
 * reduced-motion visitors never download its code at all; the service grid
 * that follows it carries the same content.
 */
export function LazyServiceExplorer(props: ComponentProps<typeof ServiceExplorer>) {
  const [wanted, setWanted] = useState(false);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setWanted(wide.matches && !reduced.matches);
    update();
    wide.addEventListener("change", update);
    return () => wide.removeEventListener("change", update);
  }, []);
  return wanted ? <ServiceExplorer {...props} /> : null;
}

export const LazyBookingSection = dynamic(() => import("./BookingForm").then((m) => m.BookingSection), {
  ssr: false,
  loading: () => <div className="min-h-[1400px] md:min-h-[1200px]" aria-busy="true" />,
});

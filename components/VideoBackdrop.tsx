"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useMotionPreference";

/**
 * Full-bleed looping video behind a section's content.
 *
 * The footage is treated hard rather than shown straight: desaturated, dimmed by
 * filter, held at low opacity, and then covered by two scrims — a horizontal one
 * that keeps the text column near-black, and a vertical one that darkens the top
 * and bottom edges so the section hairlines stay clean. The video reads as
 * atmosphere on the empty side of the layout, not as a picture competing with
 * the type.
 *
 * `prefers-reduced-motion` gets the poster frame and no video element at all —
 * an autoplaying loop is exactly what that setting opts out of.
 *
 * `eager={false}` defers mounting until the section is near the viewport, so a
 * visitor who never scrolls past the hero never downloads the second file.
 */
export function VideoBackdrop({
  src,
  poster,
  eager = false,
  opacity = 0.70,
  scrim = "left",
}: {
  src: string;
  poster: string;
  eager?: boolean;
  opacity?: number;
  /**
   * "left" for a left-aligned text column — keeps the type side near-black and
   * lets the footage breathe on the open side.
   * "even" for full-width layouts, where a left-heavy scrim would leave the
   * last column sitting on a visibly brighter ground than the first.
   */
  scrim?: "left" | "even";
}) {
  const reduced = usePrefersReducedMotion();
  const host = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(eager);

  /*
   * The poster is the first paint, always.
   *
   * usePrefersReducedMotion cannot know the answer until after mount, so
   * rendering the <video> on the first pass meant reduced-motion visitors
   * started downloading the file before the flag flipped and unmounted it —
   * they paid for 1.2 MB of exactly the thing they opted out of. Waiting one
   * commit costs nothing and makes the opt-out real.
   */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (eager || near || !host.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      // Start fetching a screen early so it is playing by the time it is read.
      { rootMargin: "600px 0px" },
    );
    io.observe(host.current);
    return () => io.disconnect();
  }, [eager, near]);

  /*
   * No CSS filter here on purpose.
   *
   * The desaturation and luma pull are baked into the encode instead. Filtering
   * a full-bleed <video> in CSS makes the compositor re-filter every frame,
   * which showed up as a micro-pause on each one. Decode alone composites on
   * the GPU and plays smoothly. translate3d keeps it on its own layer.
   */
  const media =
    "absolute inset-0 h-full w-full object-cover [transform:translate3d(0,0,0)]";

  return (
    <div
      ref={host}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {mounted && !reduced && near ? (
        <video
          className={media}
          style={{ opacity }}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload={eager ? "auto" : "metadata"}
          disablePictureInPicture
        />
      ) : (
        <img src={poster} alt="" className={media} style={{ opacity }} />
      )}

      {scrim === "left" ? (
        /* Text side stays near-black; the video breathes on the open side. */
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,12,12,0.93)_0%,rgba(12,12,12,0.82)_32%,rgba(12,12,12,0.2)_68%,rgba(12,12,12,0.02)_100%)]" />
      ) : (
        <div className="absolute inset-0 bg-[rgba(12,12,12,0.64)]" />
      )}
      {/* Keeps the section's top and bottom hairlines reading as hairlines. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0C0C0C_0%,rgba(12,12,12,0)_18%,rgba(12,12,12,0)_80%,#0C0C0C_100%)]" />
    </div>
  );
}

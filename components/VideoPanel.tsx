"use client";

import { useEffect, useRef, useState } from "react";
import { startMuted } from "@/lib/video";

/**
 * A poster image that becomes a muted loop on phones and desktops alike, with
 * a lighter encode for phones when `mobileSrc` is given. Save-Data, slow
 * connections and reduced motion keep the still. The video is fetched only
 * once the panel is near the viewport, and it sits in the same fixed-ratio box
 * as the poster, so nothing shifts.
 */
export function VideoPanel({
  src,
  mobileSrc,
  poster,
  alt,
  width,
  height,
}: {
  src: string;
  mobileSrc?: string;
  poster: string;
  alt: string;
  width: number;
  height: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState<string | null>(null);

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
    const slow = nav.connection?.saveData || /(^|-)2g|3g/.test(nav.connection?.effectiveType ?? "");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (slow || reduced || !host.current) return;
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPlay(narrow && mobileSrc ? mobileSrc : src);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(host.current);
    return () => io.disconnect();
  }, [src, mobileSrc]);

  return (
    <div ref={host} className="cut relative overflow-hidden bg-ink/5" style={{ aspectRatio: `${width} / ${height}` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt={alt} width={width} height={height} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      {play ? (
        <video
          aria-hidden
          ref={startMuted}
          className="absolute inset-0 h-full w-full object-cover"
          src={play}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
        />
      ) : null}
    </div>
  );
}

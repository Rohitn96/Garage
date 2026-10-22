"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A poster image that becomes a muted loop on wide screens with a fast
 * connection and motion allowed. Phones, Save-Data, slow connections and
 * reduced motion keep the still. The video is fetched only once the panel is
 * near the viewport, and it sits in the same fixed-ratio box as the poster,
 * so nothing shifts.
 */
export function VideoPanel({ src, poster, alt, width, height }: { src: string; poster: string; alt: string; width: number; height: number }) {
  const host = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
    const slow = nav.connection?.saveData || /(^|-)2g|3g/.test(nav.connection?.effectiveType ?? "");
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (slow || !wide || reduced || !host.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPlay(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(host.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} className="relative overflow-hidden rounded border border-rule" style={{ aspectRatio: `${width} / ${height}` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt={alt} width={width} height={height} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      {play ? (
        <video
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
        />
      ) : null}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

const SOURCES = {
  mobile: { video: "/videos/hero-mobile.mp4", poster: "/videos/hero-mobile.webp" },
  desktop: { video: "/videos/hero-desktop.mp4", poster: "/videos/hero-desktop.webp" },
};

/**
 * Full-bleed hero footage with two encodes: a 480x854 portrait cut for phones
 * and a 1280x720 landscape crop for wider screens.
 *
 * The poster is the first paint (a <picture>, so each screen size downloads
 * only its own still). The video is fetched after the page has loaded, only
 * when motion is allowed and the connection is not Save-Data or slow, and it
 * fades in over the identical first frame once it is actually playing, so the
 * swap is invisible and nothing shifts.
 */
export function HeroVideo({ alt }: { alt: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
    const slow = nav.connection?.saveData || /(^|-)2g|3g/.test(nav.connection?.effectiveType ?? "");
    if (slow || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const choose = () => setSrc(window.matchMedia("(min-width: 768px)").matches ? SOURCES.desktop.video : SOURCES.mobile.video);
    // Wait for an idle moment after load, so the download and first decode never
    // compete with the page becoming interactive. The poster covers the wait.
    const pick = () =>
      typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(choose, { timeout: 2500 }) : setTimeout(choose, 1200);
    if (document.readyState === "complete") pick();
    else {
      window.addEventListener("load", pick, { once: true });
      return () => window.removeEventListener("load", pick);
    }
  }, []);

  const media = "absolute inset-0 h-full w-full object-cover object-[50%_35%] md:object-center";

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-[#0c0e10]">
      <picture>
        <source media="(min-width: 768px)" srcSet={SOURCES.desktop.poster} width={1280} height={720} />
        <img src={SOURCES.mobile.poster} width={480} height={854} alt={alt} fetchPriority="high" decoding="async" className={media} />
      </picture>
      {src ? (
        <video
          key={src}
          className={`${media} transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onPlaying={() => setPlaying(true)}
        />
      ) : null}
      {/* Scrims: keep the headline readable over any frame. */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e10] via-[#0c0e10]/55 to-[#0c0e10]/10 md:bg-gradient-to-r md:from-[#0c0e10]/90 md:via-[#0c0e10]/45 md:to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0c0e10]/70 to-transparent" />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

/**
 * Subscribes to a media query, SSR-safe.
 *
 * Always reports `false` on the server and on the first client render so the
 * markup matches and React does not hydration-mismatch. Callers must therefore
 * treat `false` as "not yet known" and render the safe/static branch first —
 * see `useRenders3D`, which deliberately starts the canvas as opt-in.
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** True when the visitor has asked their OS to minimise animation. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Phones and small tablets, where we swap WebGL for the flat diagram. */
export function useIsCompactViewport(): boolean {
  return useMediaQuery("(max-width: 767px)");
}

/**
 * Decides whether this visitor gets the real WebGL car.
 *
 * Phones now get it too. The flat diagram was a poor substitute for the thing
 * that makes this page worth visiting, and a scene this small (≈34 primitives,
 * no textures, no post-processing) is well within a modern phone's budget —
 * CarScene caps device pixel ratio to keep the fill rate sane.
 *
 * Two ways to fall through to the static diagram:
 *   - reduced motion is requested; a scroll-scrubbed 3D scene is precisely what
 *     that setting opts out of
 *   - the device reports very few cores, a decent proxy for "will drop frames"
 *
 * Starts `false` and flips on after mount, so the server-rendered HTML is always
 * the lightweight diagram and the canvas is a progressive enhancement.
 */
export function useRenders3D(): boolean {
  const reduced = usePrefersReducedMotion();
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency;
    setCapable(typeof cores !== "number" || cores >= 4);
  }, []);

  return capable && !reduced;
}

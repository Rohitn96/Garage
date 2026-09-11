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

/** Phones and small tablets: tighter camera framing and a lower DPR cap. */
export function useIsCompactViewport(): boolean {
  return useMediaQuery("(max-width: 767px)");
}

/**
 * Decides whether this visitor gets the real WebGL car.
 *
 * Phones get it too. A scene this small (≈50 primitives, no textures, no
 * post-processing and no shadow maps) is well within a modern phone's budget —
 * CarScene caps device pixel ratio to keep the fill rate sane, and stops the
 * render loop entirely when the section is off screen.
 *
 * Two ways to fall through:
 *   - reduced motion is requested; an idling, animated 3D scene is precisely
 *     what that setting opts out of
 *   - the device reports very few cores, a decent proxy for "will drop frames"
 *
 * Starts `false` and flips on after mount, so the server-rendered HTML never
 * contains a canvas and the 3D scene is a progressive enhancement. When it
 * returns false there is no substitute rendering to maintain: the system list
 * beside the stage is the content, and it is complete on its own.
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

"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Object3D, Vector3 } from "three";
import type { CarRegionId } from "@/data/services";

/** The DOM nodes the tracker writes to, handed down from the stage. */
export type CalloutRefs = {
  label: React.RefObject<HTMLDivElement | null>;
  path: React.RefObject<SVGPathElement | null>;
  dot: React.RefObject<SVGCircleElement | null>;
  ring: React.RefObject<SVGCircleElement | null>;
};

/** The heading list holds the top-left corner; left labels start below it. */
const LEFT_MARGIN_FLOOR = 248;

/* --- Side switching --------------------------------------------------------
 * Which margin the label takes is decided with HYSTERESIS, not a midpoint test.
 *
 * A plain `ax < width / 2` looks correct and is not: the battery pack's anchor
 * sits at the centre of the car, so it projects within a few pixels of the
 * centre of the screen, and the slow scroll yaw walks it back and forth across
 * the line. The label flipped between margins repeatedly on the first system —
 * one part with two positions.
 *
 * The anchor now has to travel well past centre before the label moves, and the
 * choice resets only when the region does.
 * -------------------------------------------------------------------------*/
const FLIP_TO_LEFT = 0.4;
const FLIP_TO_RIGHT = 0.6;

/**
 * Pins the service list to the part it describes.
 *
 * Nothing here goes through React. Every frame this projects the anchor mesh's
 * world position to screen pixels and writes `transform` and a path `d`
 * straight to the DOM, so a label that tracks a moving part at 60fps costs no
 * re-renders at all. React runs only when the region changes — six times across
 * the whole section.
 */
export function CalloutTracker({
  region,
  refs,
  compact,
}: {
  region: CarRegionId | null;
  refs: CalloutRefs;
  compact: boolean;
}) {
  const { camera, size, scene } = useThree();
  const anchor = useRef<Object3D | null>(null);
  const world = useMemo(() => new Vector3(), []);

  /*
   * Cached label box.
   *
   * Reading offsetWidth/offsetHeight inside the frame loop forces a synchronous
   * layout on EVERY frame, and that was a large part of why scrolling this
   * section felt heavy: the browser could not batch style and layout work
   * because the render loop kept demanding an up-to-date box. The box only
   * changes when the region's content or the stage size changes, so it is
   * measured exactly then.
   */
  const box = useRef({ w: 0, h: 0 });
  const side = useRef<"left" | "right" | null>(null);

  useEffect(() => {
    anchor.current = null;
    side.current = null;
    const el = refs.label.current;
    if (!el) return;
    // One frame later, so the new region's content has been committed.
    const id = requestAnimationFrame(() => {
      box.current = { w: el.offsetWidth, h: el.offsetHeight };
    });
    return () => cancelAnimationFrame(id);
  }, [region, refs.label, size.width, size.height]);

  useFrame(() => {
    const label = refs.label.current;
    const path = refs.path.current;
    const dot = refs.dot.current;
    const ring = refs.ring.current;
    if (!label || !path || !dot || !ring) return;

    const setOpacity = (v: string) => {
      label.style.opacity = v;
      path.style.opacity = v;
      dot.style.opacity = v;
      ring.style.opacity = v;
    };

    if (!region) {
      setOpacity("0");
      return;
    }

    if (!anchor.current) {
      anchor.current = scene.getObjectByName(`anchor-${region}`) ?? null;
      if (!anchor.current) return;
    }

    anchor.current.getWorldPosition(world);
    world.project(camera);

    // Behind the camera: nothing sensible to point at.
    if (world.z > 1) {
      setOpacity("0");
      return;
    }

    const ax = (world.x * 0.5 + 0.5) * size.width;
    const ay = (-world.y * 0.5 + 0.5) * size.height;

    setOpacity("1");
    dot.setAttribute("cx", String(ax));
    dot.setAttribute("cy", String(ay));
    ring.setAttribute("cx", String(ax));
    ring.setAttribute("cy", String(ay));

    if (compact) {
      // On a phone the label is placed by CSS directly beneath the canvas, so
      // all the leader has to do is get there: straight down off the part, then
      // a short run to the left margin where the first word starts. The line
      // crossing the boundary is what keeps picture and text one object.
      path.setAttribute(
        "d",
        `M ${ax} ${ay} L ${ax} ${size.height - 26} L 24 ${size.height - 2}`,
      );
      return;
    }

    const frac = ax / size.width;
    if (side.current === null) side.current = frac < 0.5 ? "left" : "right";
    else if (side.current === "right" && frac < FLIP_TO_LEFT) side.current = "left";
    else if (side.current === "left" && frac > FLIP_TO_RIGHT) side.current = "right";
    const onLeft = side.current === "left";

    // The label lives in the MARGIN, not floating beside the part. Offsetting it
    // a fixed distance from the anchor was tried first and it constantly landed
    // on the bodywork, because the part it points at is by definition in the
    // middle of the car. Technical illustration settled this a century ago:
    // labels go in the clear space at the edge of the plate, and a leader
    // crosses the drawing to reach them.
    const { w: lw, h: lh } = box.current;
    const lx = onLeft ? 44 : size.width - lw - 44;
    const floor = onLeft ? LEFT_MARGIN_FLOOR : 22;
    const ceiling = Math.max(size.height - lh - 44, floor);
    const ly = Math.min(Math.max(ay - lh * 0.42, floor), ceiling);

    label.style.transform = `translate3d(${lx}px, ${ly}px, 0)`;
    // Only touch the attribute when it changes: writing it every frame
    // invalidates style for the whole subtree.
    const want = onLeft ? "left" : "right";
    if (label.dataset.side !== want) label.dataset.side = want;

    // Attach beside the title rather than at the block's corner: the line should
    // arrive at the name of the thing, not at empty space above it.
    const attachX = onLeft ? lx + lw + 12 : lx - 12;
    const attachY = ly + 34;
    const elbowX = attachX + (ax > attachX ? 38 : -38);
    path.setAttribute("d", `M ${ax} ${ay} L ${elbowX} ${attachY} L ${attachX} ${attachY}`);
  });

  return null;
}

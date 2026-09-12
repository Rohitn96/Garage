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

/**
 * Pins the service list to the part it describes.
 *
 * A panel off to one side made the visitor read in two places at once and
 * quietly became the thing they looked at instead of the car. A callout with a
 * leader line does what a technical illustration has always done: it puts the
 * words next to the thing, and draws a line so there is no doubt which thing.
 *
 * Nothing here goes through React. Every frame this projects the anchor mesh's
 * world position to screen pixels and writes `transform` and a path `d`
 * straight to the DOM, so a label that tracks a moving part at 60fps costs no
 * re-renders at all. React only runs when the region itself changes, which is
 * six times across the whole section.
 *
 * The leader flips to whichever side has room, because the car turns as you
 * scroll and a fixed side would eventually point the label across the body.
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

  // Re-resolve when the region changes; getObjectByName walks the graph, so it
  // must not happen per frame.
  useEffect(() => {
    anchor.current = null;
  }, [region]);

  useFrame(() => {
    const label = refs.label.current;
    const path = refs.path.current;
    const dot = refs.dot.current;
    const ring = refs.ring.current;
    if (!label || !path || !dot || !ring) return;

    if (!region) {
      label.style.opacity = "0";
      path.style.opacity = "0";
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      return;
    }

    if (!anchor.current) {
      anchor.current = scene.getObjectByName(`anchor-${region}`) ?? null;
      if (!anchor.current) return;
    }

    anchor.current.getWorldPosition(world);
    world.project(camera);

    const ax = (world.x * 0.5 + 0.5) * size.width;
    const ay = (-world.y * 0.5 + 0.5) * size.height;

    // Behind the camera, or off stage: nothing sensible to point at.
    if (world.z > 1) {
      label.style.opacity = "0";
      path.style.opacity = "0";
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      return;
    }

    label.style.opacity = "1";
    path.style.opacity = "1";
    dot.style.opacity = "1";
    ring.style.opacity = "1";
    dot.setAttribute("cx", String(ax));
    dot.setAttribute("cy", String(ay));
    ring.setAttribute("cx", String(ax));
    ring.setAttribute("cy", String(ay));

    const lw = label.offsetWidth;
    const lh = label.offsetHeight;

    if (compact) {
      // On a phone the label is placed by CSS directly beneath the canvas, so
      // all the leader has to do is get there: straight down off the part, then
      // a short run to the left margin where the first word starts. The line
      // crossing the boundary is what keeps the picture and the text one thing.
      label.style.transform = "";
      path.setAttribute(
        "d",
        `M ${ax} ${ay} L ${ax} ${size.height - 26} L 24 ${size.height - 2}`,
      );
      return;
    }

    // The label lives in the MARGIN, not floating beside the part.
    //
    // Offsetting it a fixed distance from the anchor was tried first and it
    // constantly landed on the bodywork, because the part it points at is by
    // definition in the middle of the car. Technical illustration solved this a
    // century ago: labels go in the clear space at the edge of the plate and a
    // leader crosses the drawing to reach them. So the label takes whichever
    // margin the part is nearer, and the line does the work.
    const onLeft = ax < size.width * 0.5;
    const lx = onLeft ? 44 : size.width - lw - 44;
    const ly = Math.min(Math.max(ay - lh * 0.42, 22), size.height - lh - 44);

    label.style.transform = `translate3d(${lx}px, ${ly}px, 0)`;
    // Text hugs the side the leader arrives from, so the eye travels the line
    // straight into the first word.
    label.dataset.side = onLeft ? "left" : "right";

    // Attach near the title rather than the block's corner: the line should
    // arrive at the name of the thing, not at empty space above it.
    const attachX = onLeft ? lx + lw + 12 : lx - 12;
    const attachY = ly + 34;
    const elbowX = attachX + (ax > attachX ? 38 : -38);
    path.setAttribute("d", `M ${ax} ${ay} L ${elbowX} ${attachY} L ${attachX} ${attachY}`);
  });

  return null;
}

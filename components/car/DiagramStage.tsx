"use client";

import { AnimatePresence, motion, type MotionValue } from "framer-motion";
import { REGION_ANCHORS, SERVICE_GROUPS, type CarRegionId } from "@/data/services";
import { ExplodedDiagram } from "./ExplodedDiagram";
import { Callout, Connector } from "./Callout";

/**
 * The flat rendering of the pinned stage: diagram above, anchored callout below.
 *
 * Phones get this instead of WebGL. At 375px there is no room to float a card
 * beside a part without it overlapping the car, so the callout sits under the
 * diagram and a connector points up to the focused part's position — same
 * component, same styling as the 3D anchored version, laid out for the width
 * that actually exists.
 *
 * Nothing here scrolls independently. The callout is sized by its content.
 */
export function DiagramStage({
  explode,
  activeRegion,
  activeIndex,
}: {
  explode: MotionValue<number>;
  activeRegion: CarRegionId | null;
  activeIndex: number | null;
}) {
  const group = activeIndex === null ? null : SERVICE_GROUPS[activeIndex];

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 px-4 pb-6 pt-16">
      <div className="w-full max-w-[560px] shrink-0">
        <ExplodedDiagram
          explode={explode}
          activeRegion={activeRegion}
          className="h-auto w-full"
        />
      </div>

      {/*
        Anchored callout. The CARD stays centred — at 375px a card nudged toward
        its part runs straight off the viewport edge — and the connector line
        does the pointing instead, sitting at the part's own x position.
      */}
      <div className="relative w-full max-w-[560px] pt-9">
        <AnimatePresence mode="wait">
          {group && activeIndex !== null && (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Connector
                orientation="up"
                length={36}
                offsetLeft={`${REGION_ANCHORS[group.id].svgX}%`}
              />
              <Callout
                group={group}
                index={activeIndex}
                total={SERVICE_GROUPS.length}
                className="mx-auto"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

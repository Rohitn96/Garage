"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";
import type { CarRegionId } from "@/data/services";

/**
 * Flat side-elevation of the same car, exploding on the same scroll progress.
 *
 * This is the server-rendered view and the one phones and reduced-motion
 * visitors keep. It is a peer of the 3D scene, not a placeholder for it: same
 * regions, same highlight behaviour, a fraction of the cost.
 */

/** Direction each region drifts, in SVG units. */
const DRIFT: Record<CarRegionId, [number, number]> = {
  engine: [46, -46],
  brakes: [10, 54],
  wheels: [-6, 62],
  climate: [30, -62],
  underbody: [-40, 52],
  body: [0, -30],
};

function Region({
  id,
  explode,
  activeRegion,
  children,
}: {
  id: CarRegionId;
  explode: MotionValue<number>;
  activeRegion: CarRegionId | null;
  children: ReactNode;
}) {
  const focused = activeRegion === id;
  const [dx, dy] = DRIFT[id];
  const reach = focused ? 1 : 0.4;

  const x = useTransform(explode, (e) => e * dx * reach);
  const y = useTransform(explode, (e) => e * dy * reach);

  return (
    <motion.g
      style={{ x, y }}
      animate={{ opacity: activeRegion && !focused ? 0.5 : 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.g>
  );
}

export function ExplodedDiagram({
  explode,
  activeRegion,
  className = "",
}: {
  explode: MotionValue<number>;
  activeRegion: CarRegionId | null;
  className?: string;
}) {
  const accent = "#FF6B2C";
  const paint = "#5A6472";
  const edge = "#7E8896";
  const metal = "#AEB7C2";

  const strokeFor = (id: CarRegionId) => (activeRegion === id ? accent : edge);

  return (
    <svg
      viewBox="0 0 400 230"
      className={className}
      role="img"
      aria-label="Exploded side view of a car, with engine, brakes, wheels, air conditioning, underbody and body panels separated."
    >
      {/* Underbody: floor pan, exhaust, muffler */}
      <Region id="underbody" explode={explode} activeRegion={activeRegion}>
        <rect x="52" y="146" width="300" height="9" rx="4" fill="#333944" stroke={strokeFor("underbody")} strokeWidth="1.5" />
        <rect x="74" y="160" width="150" height="7" rx="3.5" fill={metal} opacity="0.75" />
        <ellipse cx="66" cy="163.5" rx="16" ry="9" fill={metal} opacity="0.75" />
      </Region>

      {/* Body: shell, cabin glass, lights */}
      <Region id="body" explode={explode} activeRegion={activeRegion}>
        <path
          d="M46 138 L46 112 Q46 104 56 103 L128 100 L166 70 Q170 66 178 66 L258 66 Q266 66 270 71 L296 100 L346 106 Q356 108 356 116 L356 138 Z"
          fill={paint}
          stroke={strokeFor("body")}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M176 74 L246 74 L268 99 L150 99 Z" fill="#8CA3BB" opacity="0.6" />
        <rect x="342" y="112" width="16" height="12" rx="3" fill="#E8D9B8" opacity="0.9" />
      </Region>

      {/* Climate: condenser + blower */}
      <Region id="climate" explode={explode} activeRegion={activeRegion}>
        <rect x="316" y="98" width="12" height="30" rx="2" fill="#6E7A88" stroke={strokeFor("climate")} strokeWidth="1.5" />
        <circle cx="286" cy="92" r="11" fill="#5A6472" stroke={strokeFor("climate")} strokeWidth="1.5" />
        <circle cx="286" cy="92" r="4" fill="#20242B" />
      </Region>

      {/* Engine bay */}
      <Region id="engine" explode={explode} activeRegion={activeRegion}>
        <rect x="292" y="104" width="52" height="34" rx="4" fill={metal} stroke={strokeFor("engine")} strokeWidth="1.8" />
        <rect x="300" y="96" width="10" height="10" rx="2" fill="#6E7A88" />
        <rect x="318" y="96" width="10" height="10" rx="2" fill="#6E7A88" />
      </Region>

      {/* Brakes: discs + calipers, behind the wheels */}
      <Region id="brakes" explode={explode} activeRegion={activeRegion}>
        {[110, 300].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="160" r="16" fill="#9AA3AE" stroke={strokeFor("brakes")} strokeWidth="1.5" />
            <circle cx={cx} cy="160" r="6" fill="#20242B" />
            <rect x={cx - 22} y="152" width="9" height="16" rx="2" fill="#C2451E" />
          </g>
        ))}
      </Region>

      {/* Wheels — furthest out, so the discs stay visible */}
      <Region id="wheels" explode={explode} activeRegion={activeRegion}>
        {[110, 300].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="160" r="29" fill="#2B2F36" stroke={strokeFor("wheels")} strokeWidth="1.8" />
            <circle cx={cx} cy="160" r="14" fill="#5A6472" />
            <circle cx={cx} cy="160" r="5" fill="#565F6C" />
          </g>
        ))}
      </Region>
    </svg>
  );
}

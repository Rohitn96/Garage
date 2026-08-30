import type { CarRegionId } from "@/data/services";

/**
 * A low-poly car assembled from primitives — no external model, nothing to license.
 *
 * The car sits along +X (nose at +X), is ~4.2 long and ~1.8 wide, and rests on
 * y = 0. Every part carries the region it belongs to, so the scroll sequence can
 * push one region out further than the rest and tint it while its prices are up.
 */

export type Vec3 = [number, number, number];

export type PartKind = "box" | "cylinder";

export type CarPart = {
  id: string;
  kind: PartKind;
  region: CarRegionId;
  /** box: [w, h, d] — cylinder: [radius, height, radialSegments] */
  size: Vec3;
  /** Resting position, i.e. the assembled car. */
  at: Vec3;
  rotation?: Vec3;
  /** Unit-ish direction this part travels when the view explodes. */
  blowsTo: Vec3;
  color: string;
  metalness?: number;
  roughness?: number;
  opacity?: number;
};

const PAINT = "#5A6472";
const TRIM = "#333944";
const GLASS = "#7C93AB";
const METAL = "#AEB7C2";
const RUBBER = "#2B2F36";

export const CAR_PARTS: CarPart[] = [
  // ---- Body / whole car -------------------------------------------------
  {
    id: "floorpan",
    kind: "box",
    region: "underbody",
    size: [4.15, 0.14, 1.72],
    at: [0, 0.34, 0],
    blowsTo: [0, -1.5, 0],
    color: TRIM,
    metalness: 0.55,
    roughness: 0.65,
  },
  {
    id: "body",
    kind: "box",
    region: "body",
    size: [4.0, 0.58, 1.78],
    at: [0, 0.72, 0],
    blowsTo: [0, 0.35, 0],
    color: PAINT,
    metalness: 0.62,
    roughness: 0.34,
  },
  {
    id: "cabin",
    kind: "box",
    region: "body",
    size: [1.85, 0.46, 1.52],
    at: [-0.34, 1.21, 0],
    blowsTo: [0, 1.5, 0],
    color: GLASS,
    metalness: 0.35,
    roughness: 0.12,
    opacity: 0.72,
  },
  {
    id: "bonnet",
    kind: "box",
    region: "engine",
    size: [1.4, 0.1, 1.72],
    at: [1.22, 1.03, 0],
    blowsTo: [0.7, 1.35, 0],
    color: PAINT,
    metalness: 0.62,
    roughness: 0.34,
  },

  // ---- Engine bay -------------------------------------------------------
  {
    id: "engine-block",
    kind: "box",
    region: "engine",
    size: [0.92, 0.68, 0.94],
    at: [1.28, 0.92, 0],
    blowsTo: [1.9, 1.5, 0],
    color: METAL,
    metalness: 0.9,
    roughness: 0.35,
  },
  {
    id: "battery",
    kind: "box",
    region: "body",
    size: [0.42, 0.3, 0.32],
    at: [1.05, 1.0, 0.6],
    blowsTo: [1.1, 1.5, 1.5],
    color: "#3C4450",
    metalness: 0.4,
    roughness: 0.6,
  },
  {
    id: "headlight-l",
    kind: "box",
    region: "body",
    size: [0.16, 0.22, 0.44],
    at: [2.0, 0.9, 0.6],
    blowsTo: [2.1, 0.5, 1.1],
    color: "#E8D9B8",
    metalness: 0.2,
    roughness: 0.18,
  },
  {
    id: "headlight-r",
    kind: "box",
    region: "body",
    size: [0.16, 0.22, 0.44],
    at: [2.0, 0.9, -0.6],
    blowsTo: [2.1, 0.5, -1.1],
    color: "#E8D9B8",
    metalness: 0.2,
    roughness: 0.18,
  },

  // ---- Climate ----------------------------------------------------------
  {
    id: "ac-condenser",
    kind: "box",
    region: "climate",
    size: [0.16, 0.5, 1.1],
    at: [1.86, 0.88, 0],
    blowsTo: [2.3, 1.15, 0],
    color: "#6E7A88",
    metalness: 0.75,
    roughness: 0.45,
  },
  {
    id: "ac-blower",
    kind: "cylinder",
    region: "climate",
    size: [0.22, 0.26, 16],
    at: [0.62, 1.12, 0.42],
    rotation: [0, 0, Math.PI / 2],
    blowsTo: [0.4, 1.9, 1.4],
    color: "#5A6472",
    metalness: 0.6,
    roughness: 0.5,
  },

  // ---- Underbody --------------------------------------------------------
  {
    id: "exhaust",
    kind: "cylinder",
    region: "underbody",
    size: [0.075, 2.5, 14],
    at: [-0.55, 0.22, -0.42],
    rotation: [0, 0, Math.PI / 2],
    blowsTo: [-0.4, -1.9, -0.7],
    color: METAL,
    metalness: 0.85,
    roughness: 0.42,
  },
  {
    id: "muffler",
    kind: "cylinder",
    region: "underbody",
    size: [0.18, 0.6, 16],
    at: [-1.85, 0.24, -0.42],
    rotation: [0, 0, Math.PI / 2],
    blowsTo: [-1.4, -1.9, -0.7],
    color: METAL,
    metalness: 0.85,
    roughness: 0.42,
  },
  {
    id: "suspension-f",
    kind: "cylinder",
    region: "underbody",
    size: [0.09, 0.5, 12],
    at: [1.35, 0.6, 0.62],
    blowsTo: [1.0, -1.5, 1.0],
    color: "#B24A2A",
    metalness: 0.5,
    roughness: 0.55,
  },
  {
    id: "suspension-r",
    kind: "cylinder",
    region: "underbody",
    size: [0.09, 0.5, 12],
    at: [-1.35, 0.6, -0.62],
    blowsTo: [-1.0, -1.5, -1.0],
    color: "#B24A2A",
    metalness: 0.5,
    roughness: 0.55,
  },
];

/** Wheel + brake disc pairs, generated so the four corners stay in sync. */
const CORNERS: Array<{ id: string; x: number; z: number }> = [
  { id: "fl", x: 1.42, z: 0.92 },
  { id: "fr", x: 1.42, z: -0.92 },
  { id: "rl", x: -1.42, z: 0.92 },
  { id: "rr", x: -1.42, z: -0.92 },
];

for (const corner of CORNERS) {
  const outward = Math.sign(corner.z);

  CAR_PARTS.push({
    id: `wheel-${corner.id}`,
    kind: "cylinder",
    region: "wheels",
    size: [0.44, 0.3, 22],
    at: [corner.x, 0.44, corner.z],
    rotation: [Math.PI / 2, 0, 0],
    // Wheels travel furthest out so the disc behind them stays readable.
    blowsTo: [corner.x * 0.25, 0.15, outward * 2.6],
    color: RUBBER,
    metalness: 0.15,
    roughness: 0.9,
  });

  // A lighter hub face, so a tyre seen head-on still reads as a wheel rather
  // than a flat disc. Travels with its tyre.
  CAR_PARTS.push({
    id: `hub-${corner.id}`,
    kind: "cylinder",
    region: "wheels",
    size: [0.2, 0.32, 20],
    at: [corner.x, 0.44, corner.z],
    rotation: [Math.PI / 2, 0, 0],
    blowsTo: [corner.x * 0.25, 0.15, outward * 2.6],
    color: "#8A94A2",
    metalness: 0.8,
    roughness: 0.35,
  });

  CAR_PARTS.push({
    id: `disc-${corner.id}`,
    kind: "cylinder",
    region: "brakes",
    size: [0.28, 0.06, 20],
    at: [corner.x, 0.44, corner.z * 0.8],
    rotation: [Math.PI / 2, 0, 0],
    blowsTo: [corner.x * 0.25, 0.5, outward * 1.5],
    color: "#9AA3AE",
    metalness: 0.95,
    roughness: 0.28,
  });

  CAR_PARTS.push({
    id: `caliper-${corner.id}`,
    kind: "box",
    region: "brakes",
    size: [0.14, 0.26, 0.12],
    at: [corner.x - 0.22, 0.6, corner.z * 0.8],
    blowsTo: [corner.x * 0.25 - 0.5, 0.85, outward * 1.5],
    color: "#C2451E",
    metalness: 0.6,
    roughness: 0.4,
  });
}

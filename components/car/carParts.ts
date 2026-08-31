import type { CarRegionId } from "@/data/services";

/**
 * A low-poly car assembled from primitives — no external model, nothing to license.
 *
 * Proportioned as a three-box saloon, because that is what makes a silhouette
 * read as "car" rather than "box on wheels":
 *
 *   - one body mass running up to a beltline at y=0.95, with the bonnet and
 *     rear deck as shallow panels FLUSH with it. Sitting them proud of the body
 *     instead turns the whole thing into a flatbed with boxes on it.
 *   - a narrower greenhouse set back from the nose and inset from the body
 *     sides (1.52 against the body's 1.80), under a roof narrower again (1.40)
 *     for a little tumblehome
 *   - a short rear deck, stubbier than the bonnet
 *   - wheels at the four corners: 0.56 diameter against a 1.40 overall height
 *     (40%), standing proud of the flanks so they read as mounted, not tucked
 *   - a dark recessed arch panel framing each wheel opening
 *
 * The car sits along +X (nose at +X), is ~4.3 long and ~1.8 wide, and rests on
 * y = 0. Every part carries the region it belongs to, so the scroll sequence can
 * push one region out further than the rest and tint it while its prices are up.
 */

export type Vec3 = [number, number, number];

/** "rounded" is a drei RoundedBox — soft edges read as bodywork, hard ones as a crate. */
export type PartKind = "box" | "rounded" | "cylinder";

export type CarPart = {
  id: string;
  kind: PartKind;
  region: CarRegionId;
  /** box/rounded: [w, h, d] — cylinder: [radius, height, radialSegments] */
  size: Vec3;
  /** Resting position, i.e. the assembled car. */
  at: Vec3;
  rotation?: Vec3;
  /** Corner radius for `rounded` parts. Must stay under half the smallest side. */
  radius?: number;
  /** Unit-ish direction this part travels when the view explodes. */
  blowsTo: Vec3;
  color: string;
  metalness?: number;
  roughness?: number;
  opacity?: number;
};

const PAINT = "#2E7C5B";
const PAINT_DARK = "#215C43";
const TRIM = "#585E58";
const GLASS = "#1B2A24";
const METAL = "#C2C7C7";
/** Darker steel for parts that end up sitting on the pale ground. */
const UNDER_STEEL = "#8E948E";
const RUBBER = "#4A4D52";
const SHADOW = "#1E2B25";

/** Wheel geometry, referenced by the arches and brake parts so they stay in sync. */
const WHEEL_R = 0.28;
const WHEEL_W = 0.26;
const AXLE_Y = WHEEL_R; // wheel centre = radius, so the tyre touches the ground
const TRACK_Z = 0.9;
const AXLE_X = 1.42;

export const CAR_PARTS: CarPart[] = [
  // ---- Underbody --------------------------------------------------------
  {
    id: "floorpan",
    kind: "box",
    region: "underbody",
    size: [4.05, 0.1, 1.7],
    at: [0, 0.31, 0],
    blowsTo: [0, -0.4, 2.6],
    color: TRIM,
    metalness: 0.55,
    roughness: 0.65,
  },

  // ---- Main body mass ---------------------------------------------------
  {
    id: "body",
    kind: "rounded",
    region: "body",
    size: [4.3, 0.6, 1.8],
    at: [0, 0.65, 0],
    radius: 0.12,
    blowsTo: [0, 0.35, 0],
    color: PAINT,
    metalness: 0.6,
    roughness: 0.34,
  },
  // Long low bonnet, sitting forward and below the roofline.
  {
    id: "bonnet",
    kind: "rounded",
    region: "engine",
    size: [1.56, 0.07, 1.72],
    at: [1.3, 0.955, 0],
    radius: 0.03,
    blowsTo: [1.0, 1.5, 0],
    color: PAINT,
    metalness: 0.6,
    roughness: 0.34,
  },
  // Short rear deck — lower than the roof, stubbier than the bonnet.
  {
    id: "rear-deck",
    kind: "rounded",
    region: "body",
    size: [1.0, 0.07, 1.72],
    at: [-1.63, 0.955, 0],
    radius: 0.03,
    blowsTo: [-1.3, 1.1, 0],
    color: PAINT,
    metalness: 0.6,
    roughness: 0.34,
  },

  // ---- Greenhouse -------------------------------------------------------
  // Window band: inset from the body sides and darker, so the cabin reads as
  // glass even without a real transmissive material.
  {
    id: "cabin",
    kind: "rounded",
    region: "body",
    size: [1.76, 0.34, 1.52],
    at: [-0.3, 1.13, 0],
    radius: 0.07,
    blowsTo: [0, 1.5, 0],
    color: GLASS,
    metalness: 0.55,
    roughness: 0.06,
    opacity: 0.92,
  },
  // Painted roof panel capping the glass band.
  {
    id: "roof",
    kind: "rounded",
    region: "body",
    size: [1.56, 0.1, 1.4],
    at: [-0.32, 1.35, 0],
    radius: 0.04,
    blowsTo: [0, 1.9, 0],
    color: PAINT,
    metalness: 0.6,
    roughness: 0.34,
  },

  // ---- Engine bay -------------------------------------------------------
  {
    id: "engine-block",
    kind: "rounded",
    region: "engine",
    size: [0.86, 0.5, 0.9],
    at: [1.3, 0.66, 0],
    radius: 0.06,
    blowsTo: [1.9, 1.6, 0],
    color: METAL,
    metalness: 0.9,
    roughness: 0.35,
  },
  {
    id: "battery",
    kind: "box",
    region: "body",
    size: [0.38, 0.26, 0.3],
    at: [0.92, 0.74, 0.56],
    blowsTo: [1.0, 1.5, 1.6],
    color: "#6A736C",
    metalness: 0.4,
    roughness: 0.6,
  },
  {
    id: "headlight-l",
    kind: "box",
    region: "body",
    size: [0.12, 0.17, 0.4],
    at: [2.04, 0.72, 0.56],
    blowsTo: [2.1, 0.5, 1.2],
    color: "#D8CFAE",
    metalness: 0.2,
    roughness: 0.18,
  },
  {
    id: "headlight-r",
    kind: "box",
    region: "body",
    size: [0.12, 0.17, 0.4],
    at: [2.04, 0.72, -0.56],
    blowsTo: [2.1, 0.5, -1.2],
    color: "#D8CFAE",
    metalness: 0.2,
    roughness: 0.18,
  },

  // ---- Climate ----------------------------------------------------------
  {
    id: "ac-condenser",
    kind: "box",
    region: "climate",
    size: [0.14, 0.38, 1.05],
    at: [1.98, 0.66, 0],
    blowsTo: [2.4, 1.3, 0],
    color: "#8D9A93",
    metalness: 0.75,
    roughness: 0.45,
  },
  {
    id: "ac-blower",
    kind: "cylinder",
    region: "climate",
    size: [0.19, 0.24, 16],
    at: [0.52, 0.8, 0.4],
    rotation: [0, 0, Math.PI / 2],
    blowsTo: [0.3, 2.0, 1.5],
    color: "#78857E",
    metalness: 0.6,
    roughness: 0.5,
  },

  // ---- Underbody hardware ----------------------------------------------
  {
    id: "exhaust",
    kind: "cylinder",
    region: "underbody",
    size: [0.07, 2.5, 14],
    at: [-0.5, 0.2, -0.4],
    rotation: [0, 0, Math.PI / 2],
    blowsTo: [-0.3, -0.5, 2.9],
    color: UNDER_STEEL,
    metalness: 0.85,
    roughness: 0.42,
  },
  {
    id: "muffler",
    kind: "cylinder",
    region: "underbody",
    size: [0.16, 0.58, 16],
    at: [-1.86, 0.22, -0.4],
    rotation: [0, 0, Math.PI / 2],
    blowsTo: [-1.3, -0.5, 2.9],
    color: UNDER_STEEL,
    metalness: 0.85,
    roughness: 0.42,
  },
  {
    id: "suspension-f",
    kind: "cylinder",
    region: "underbody",
    size: [0.08, 0.42, 12],
    at: [AXLE_X, 0.5, 0.58],
    blowsTo: [1.4, -0.5, 2.4],
    color: "#C79A55",
    metalness: 0.5,
    roughness: 0.55,
  },
  {
    id: "suspension-r",
    kind: "cylinder",
    region: "underbody",
    size: [0.08, 0.42, 12],
    at: [-AXLE_X, 0.5, -0.58],
    blowsTo: [-1.4, -0.5, 2.4],
    color: "#C79A55",
    metalness: 0.5,
    roughness: 0.55,
  },
];

/** The four corners, so wheel/arch/brake parts stay in sync. */
const CORNERS: Array<{ id: string; x: number; z: number }> = [
  { id: "fl", x: AXLE_X, z: TRACK_Z },
  { id: "fr", x: AXLE_X, z: -TRACK_Z },
  { id: "rl", x: -AXLE_X, z: TRACK_Z },
  { id: "rr", x: -AXLE_X, z: -TRACK_Z },
];

for (const corner of CORNERS) {
  const outward = Math.sign(corner.z);

  // Dark recessed arch framing the opening, so the wheel reads as mounted into
  // the body rather than floating beside it. Belongs to the body, and barely
  // moves — the wheel pulling away from a stationary arch is the point.
  CAR_PARTS.push({
    id: `arch-${corner.id}`,
    kind: "box",
    region: "body",
    size: [WHEEL_R * 2.6, WHEEL_R * 1.85, 0.16],
    at: [corner.x, AXLE_Y + 0.14, corner.z * 0.95],
    blowsTo: [0, 0.3, outward * 0.25],
    color: SHADOW,
    metalness: 0.3,
    roughness: 0.85,
  });

  CAR_PARTS.push({
    id: `wheel-${corner.id}`,
    kind: "cylinder",
    region: "wheels",
    size: [WHEEL_R, WHEEL_W, 22],
    at: [corner.x, AXLE_Y, corner.z],
    rotation: [Math.PI / 2, 0, 0],
    // Wheels travel furthest out so the disc behind them stays readable.
    blowsTo: [corner.x * 0.2, 0.2, outward * 2.6],
    color: RUBBER,
    metalness: 0.15,
    roughness: 0.9,
  });

  // Lighter hub face, so a tyre seen head-on still reads as a wheel.
  CAR_PARTS.push({
    id: `hub-${corner.id}`,
    kind: "cylinder",
    region: "wheels",
    size: [WHEEL_R * 0.5, WHEEL_W * 1.15, 20],
    at: [corner.x, AXLE_Y, corner.z],
    rotation: [Math.PI / 2, 0, 0],
    blowsTo: [corner.x * 0.2, 0.2, outward * 2.6],
    color: "#D2D7D5",
    metalness: 0.8,
    roughness: 0.35,
  });

  CAR_PARTS.push({
    id: `disc-${corner.id}`,
    kind: "cylinder",
    region: "brakes",
    size: [WHEEL_R * 0.68, 0.05, 20],
    at: [corner.x, AXLE_Y, corner.z * 0.8],
    rotation: [Math.PI / 2, 0, 0],
    blowsTo: [corner.x * 0.2, 0.6, outward * 1.5],
    color: "#C8CECC",
    metalness: 0.95,
    roughness: 0.28,
  });

  CAR_PARTS.push({
    id: `caliper-${corner.id}`,
    kind: "box",
    region: "brakes",
    size: [0.12, 0.22, 0.1],
    at: [corner.x - 0.18, AXLE_Y + 0.14, corner.z * 0.8],
    blowsTo: [corner.x * 0.2 - 0.5, 0.95, outward * 1.5],
    color: "#D97A4A",
    metalness: 0.6,
    roughness: 0.4,
  });
}

/** Unused by the scene, but keeps the proportion intent checkable in one place. */
export const CAR_METRICS = {
  wheelDiameter: WHEEL_R * 2,
  overallHeight: 1.4,
  get wheelToHeightRatio() {
    return this.wheelDiameter / this.overallHeight;
  },
};

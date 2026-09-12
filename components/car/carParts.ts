import type { CarRegionId } from "@/data/services";
import { CAR } from "./evGeometry";

/**
 * The part table: which surface goes where, what it is made of, and where it
 * travels when its system opens up.
 *
 * Geometry lives in evGeometry.ts. `geo` names a builder there, which is called
 * once and shared — the four wheels are one tyre geometry used four times, not
 * four tyres.
 *
 * TWO LAYERS
 * ----------
 * `shell` is the bodywork, drawn as tinted lacquer you can see through, so the
 * mechanicals stay legible without the body being removed. `inner` is the
 * mechanicals, fully opaque. See CarModel for the depth ordering that stops the
 * glass swallowing what is behind it.
 */

export type Vec3 = [number, number, number];
export type PartLayer = "shell" | "inner";

export type GeoKey =
  | "lowerBody"
  | "greenhouse"
  | "tyre"
  | "rim"
  | "pack"
  | "driveUnit"
  | "disc"
  | "caliper"
  | "strut"
  | "seat"
  | "steeringWheel"
  | "dashboard"
  | "hvCables"
  | "mirror"
  | "tailBar"
  | "headBar"
  | "box"
  | "cylinder";

export type CarPart = {
  id: string;
  geo: GeoKey;
  layer: PartLayer;
  /** Which service group owns this part. `null` for the shell. */
  region: CarRegionId | null;
  at: Vec3;
  rotation?: Vec3;
  scale?: number;
  /** Only for the generic `box` / `cylinder` fallbacks. */
  args?: number[];
  /** Where it travels when its system is the one on screen. */
  blowsTo: Vec3;
  color: string;
  metalness?: number;
  roughness?: number;
  /** Automotive lacquer. Cheap, and most of why paint looks like paint. */
  clearcoat?: number;
  /**
   * Self-lit parts. Defaults to BLACK, deliberately — an earlier version
   * defaulted every part to a mint emissive, which was invisible on aluminium
   * and turned the tyres bright green, because rubber's albedo is no larger
   * than the glow was. Only lamps opt in.
   */
  emissive?: string;
  emissiveIntensity?: number;
  /** Draw this part's creases as lines. See CarModel for why not everything does. */
  edges?: boolean;
  /** The part a region's callout hangs off. Exactly one per region. */
  anchor?: boolean;
};

/* --- Materials ------------------------------------------------------------
 * Every mechanical part sits in a steel / graphite / aluminium range on purpose.
 * Colour on this model would mean "this is the system you are looking at", and
 * the accent is reserved for the interface, so the parts must not compete.
 * -------------------------------------------------------------------------*/
const SHELL = "#8FA7AE"; // body lacquer, pale so it reads as glass on a black ground
const GLASS = "#5E7A82"; // greenhouse, a shade deeper than the body
const ALLOY = "#D2D9DB";
const CASTING = "#B0BABC";
const STEEL = "#8F999B";
const DARK_STEEL = "#5A6265";
const PACK = "#343B40";
const TYRE = "#0E1013";
const HVAC = "#79868A";

const { axleF, axleR, trackHalf, wheelR } = CAR;

export const CAR_PARTS: CarPart[] = [
  /* ==== SHELL =========================================================== */
  {
    id: "lower-body",
    geo: "lowerBody",
    layer: "shell",
    region: null,
    at: [0, 0, 0],
    blowsTo: [0, 0.06, 0],
    color: SHELL,
    metalness: 0.85,
    roughness: 0.24,
    clearcoat: 1,
    edges: true,
  },
  {
    id: "greenhouse",
    geo: "greenhouse",
    layer: "shell",
    region: null,
    at: [0, 0, 0],
    blowsTo: [0, 0.3, 0],
    color: GLASS,
    metalness: 0.6,
    roughness: 0.08,
    clearcoat: 1,
  },

  /* ==== BATTERY & CHARGING ============================================== */
  {
    id: "hv-pack",
    anchor: true,
    geo: "pack",
    layer: "inner",
    region: "battery",
    at: [0, 0.375, 0],
    blowsTo: [0, -0.4, 0],
    color: PACK,
    metalness: 0.6,
    roughness: 0.38,
  },
  {
    id: "lv-battery",
    geo: "box",
    layer: "inner",
    region: "battery",
    args: [0.3, 0.2, 0.26],
    at: [1.62, 0.72, 0.46],
    blowsTo: [0.42, 0.55, 0.45],
    color: DARK_STEEL,
    metalness: 0.4,
    roughness: 0.55,
  },
  {
    id: "charge-port",
    geo: "cylinder",
    layer: "inner",
    region: "battery",
    args: [0.07, 0.07, 0.05, 18],
    at: [-1.98, 0.79, 0.76],
    rotation: [Math.PI / 2, 0, 0],
    blowsTo: [-0.24, 0.2, 0.42],
    color: DARK_STEEL,
    metalness: 0.55,
    roughness: 0.45,
  },

  /* ==== DRIVE UNITS ===================================================== */
  {
    id: "motor-rear",
    anchor: true,
    geo: "driveUnit",
    layer: "inner",
    region: "drive",
    at: [axleR, 0.46, 0],
    blowsTo: [-0.72, 0.5, 0],
    color: CASTING,
    metalness: 0.9,
    roughness: 0.3,
  },
  {
    id: "motor-front",
    geo: "driveUnit",
    layer: "inner",
    region: "drive",
    at: [axleF, 0.46, 0],
    rotation: [0, Math.PI, 0],
    scale: 0.88,
    blowsTo: [0.72, 0.5, 0],
    color: CASTING,
    metalness: 0.9,
    roughness: 0.3,
  },
  {
    id: "inverter",
    geo: "box",
    layer: "inner",
    region: "drive",
    args: [0.34, 0.2, 0.44],
    at: [axleR + 0.1, 0.76, 0],
    blowsTo: [-0.5, 0.72, 0],
    color: DARK_STEEL,
    metalness: 0.65,
    roughness: 0.4,
  },

  /* ==== HEAT PUMP & CLIMATE ============================================= */
  {
    id: "condenser",
    anchor: true,
    geo: "box",
    layer: "inner",
    region: "climate",
    args: [0.09, 0.36, 1.05],
    at: [2.08, 0.58, 0],
    blowsTo: [0.78, 0.46, 0],
    color: HVAC,
    metalness: 0.8,
    roughness: 0.4,
  },
  {
    id: "heat-pump",
    geo: "cylinder",
    layer: "inner",
    region: "climate",
    args: [0.13, 0.13, 0.26, 22],
    at: [1.84, 0.6, -0.44],
    rotation: [0, 0, Math.PI / 2],
    blowsTo: [0.6, 0.6, -0.45],
    color: CASTING,
    metalness: 0.75,
    roughness: 0.35,
  },
  {
    id: "octovalve",
    geo: "box",
    layer: "inner",
    region: "climate",
    args: [0.2, 0.2, 0.2],
    at: [1.66, 0.6, 0.36],
    rotation: [0, Math.PI / 5, 0],
    blowsTo: [0.5, 0.64, 0.42],
    color: ALLOY,
    metalness: 0.7,
    roughness: 0.35,
  },
  {
    id: "cabin-blower",
    geo: "cylinder",
    layer: "inner",
    region: "climate",
    args: [0.15, 0.15, 0.22, 20],
    at: [0.92, 0.8, 0.38],
    rotation: [0, 0, Math.PI / 2],
    blowsTo: [0.22, 0.7, 0.45],
    color: HVAC,
    metalness: 0.55,
    roughness: 0.5,
  },

  /* ==== SUSPENSION ====================================================== */
  {
    id: "subframe-front",
    geo: "box",
    layer: "inner",
    region: "suspension",
    args: [0.38, 0.09, 1.42],
    at: [axleF, 0.3, 0],
    blowsTo: [0.5, -0.34, 0],
    color: DARK_STEEL,
    metalness: 0.6,
    roughness: 0.55,
  },
  {
    id: "subframe-rear",
    geo: "box",
    layer: "inner",
    region: "suspension",
    args: [0.42, 0.09, 1.42],
    at: [axleR, 0.3, 0],
    blowsTo: [-0.5, -0.34, 0],
    color: DARK_STEEL,
    metalness: 0.6,
    roughness: 0.55,
  },
  {
    id: "steering-rack",
    geo: "cylinder",
    layer: "inner",
    region: "suspension",
    args: [0.042, 0.042, 1.22, 14],
    at: [axleF - 0.28, 0.44, 0],
    rotation: [Math.PI / 2, 0, 0],
    blowsTo: [0.6, -0.3, 0],
    color: STEEL,
    metalness: 0.85,
    roughness: 0.3,
  },

  /* ==== CABIN ============================================================
   * Belongs to no service group: it never separates, it is just there so the
   * greenhouse is not an empty box. An unfurnished cabin is the fastest way to
   * make a car model look like a shell.
   * ===================================================================== */
  {
    id: "dashboard",
    geo: "dashboard",
    layer: "inner",
    region: null,
    at: [0.74, 0.83, 0],
    blowsTo: [0, 0, 0],
    color: "#3A4247",
    metalness: 0.3,
    roughness: 0.7,
  },
  {
    id: "steering-wheel",
    geo: "steeringWheel",
    layer: "inner",
    region: null,
    at: [0.56, 0.87, 0.35],
    blowsTo: [0, 0, 0],
    color: "#22282B",
    metalness: 0.25,
    roughness: 0.75,
  },
  {
    id: "seat-fl",
    geo: "seat",
    layer: "inner",
    region: null,
    at: [0.06, 0.53, 0.35],
    blowsTo: [0, 0, 0],
    color: "#2C3236",
    metalness: 0.15,
    roughness: 0.85,
  },
  {
    id: "seat-fr",
    geo: "seat",
    layer: "inner",
    region: null,
    at: [0.06, 0.53, -0.35],
    blowsTo: [0, 0, 0],
    color: "#2C3236",
    metalness: 0.15,
    roughness: 0.85,
  },
  {
    id: "seat-rear",
    geo: "box",
    layer: "inner",
    region: null,
    args: [0.5, 0.46, 1.3],
    at: [-1.02, 0.66, 0],
    blowsTo: [0, 0, 0],
    color: "#2C3236",
    metalness: 0.15,
    roughness: 0.85,
  },

  /* ==== LAMPS AND MIRRORS ================================================ */
  {
    id: "tail-bar",
    geo: "tailBar",
    layer: "inner",
    region: null,
    at: [-2.3, 0.76, 0],
    blowsTo: [0, 0, 0],
    color: "#3A2321",
    metalness: 0.2,
    roughness: 0.35,
    emissive: "#B03A30",
    emissiveIntensity: 0.3,
  },
  {
    id: "head-bar-l",
    geo: "headBar",
    layer: "inner",
    region: null,
    at: [2.28, 0.71, 0.52],
    blowsTo: [0, 0, 0],
    color: "#8E9AA0",
    metalness: 0.4,
    roughness: 0.25,
    emissive: "#CFE0EC",
    emissiveIntensity: 0.5,
  },
  {
    id: "head-bar-r",
    geo: "headBar",
    layer: "inner",
    region: null,
    at: [2.28, 0.71, -0.52],
    blowsTo: [0, 0, 0],
    color: "#8E9AA0",
    metalness: 0.4,
    roughness: 0.25,
    emissive: "#CFE0EC",
    emissiveIntensity: 0.5,
  },
  {
    id: "mirror-l",
    geo: "mirror",
    layer: "inner",
    region: null,
    at: [0.7, 0.93, 0.84],
    blowsTo: [0, 0, 0],
    color: "#6A7479",
    metalness: 0.6,
    roughness: 0.35,
  },
  {
    id: "mirror-r",
    geo: "mirror",
    layer: "inner",
    region: null,
    at: [0.7, 0.93, -0.84],
    rotation: [0, Math.PI, 0],
    blowsTo: [0, 0, 0],
    color: "#6A7479",
    metalness: 0.6,
    roughness: 0.35,
  },

  /* ==== HIGH-VOLTAGE CABLING ============================================= */
  {
    id: "hv-cables",
    geo: "hvCables",
    layer: "inner",
    region: "drive",
    at: [0, 0, 0],
    blowsTo: [0, 0.28, 0],
    color: "#B2511F",
    metalness: 0.1,
    roughness: 0.72,
  },
];


/* --- Corners --------------------------------------------------------------
 * Wheels, brakes and suspension are generated per corner so they stay in sync
 * with the arch positions the body silhouette was drawn around.
 * -------------------------------------------------------------------------*/
const CORNERS: Array<{ id: string; x: number; z: number }> = [
  { id: "fl", x: axleF, z: trackHalf },
  { id: "fr", x: axleF, z: -trackHalf },
  { id: "rl", x: axleR, z: trackHalf },
  { id: "rr", x: axleR, z: -trackHalf },
];

for (const corner of CORNERS) {
  const out = Math.sign(corner.z);

  CAR_PARTS.push({
    id: `tyre-${corner.id}`,
    anchor: corner.id === "fl",
    geo: "tyre",
    layer: "inner",
    region: "wheels",
    at: [corner.x, wheelR, corner.z],
    blowsTo: [0, 0.08, out * 0.85],
    color: TYRE,
    metalness: 0.05,
    roughness: 0.95,
  });

  CAR_PARTS.push({
    id: `rim-${corner.id}`,
    geo: "rim",
    layer: "inner",
    region: "wheels",
    at: [corner.x, wheelR, corner.z + out * 0.012],
    // The face is modelled toward +Z, so the far-side wheels get turned around
    // or their spokes point into the hub and the corner reads as a black hole.
    rotation: [0, out > 0 ? 0 : Math.PI, 0],
    blowsTo: [0, 0.08, out * 0.85],
    color: ALLOY,
    metalness: 0.95,
    roughness: 0.2,
  });

  CAR_PARTS.push({
    id: `disc-${corner.id}`,
    anchor: corner.id === "fl",
    geo: "disc",
    layer: "inner",
    region: "brakes",
    at: [corner.x, wheelR, corner.z - out * 0.03],
    rotation: [0, out > 0 ? 0 : Math.PI, 0],
    blowsTo: [0, 0.3, out * 0.6],
    color: "#B9C1C2",
    metalness: 0.9,
    roughness: 0.32,
  });

  CAR_PARTS.push({
    id: `caliper-${corner.id}`,
    geo: "caliper",
    layer: "inner",
    region: "brakes",
    at: [corner.x - 0.2, wheelR + 0.1, corner.z - out * 0.03],
    blowsTo: [-0.24, 0.5, out * 0.6],
    color: "#6E7679",
    metalness: 0.65,
    roughness: 0.38,
  });

  CAR_PARTS.push({
    id: `strut-${corner.id}`,
    anchor: corner.id === "fl",
    geo: "strut",
    layer: "inner",
    region: "suspension",
    at: [corner.x, wheelR + 0.22, corner.z * 0.72],
    rotation: [0, 0, out * 0.07],
    blowsTo: [0, 0.42, out * 0.5],
    color: STEEL,
    metalness: 0.8,
    roughness: 0.35,
  });

  CAR_PARTS.push({
    id: `arm-${corner.id}`,
    geo: "box",
    layer: "inner",
    region: "suspension",
    args: [0.1, 0.055, 0.52],
    at: [corner.x, wheelR - 0.09, corner.z * 0.62],
    blowsTo: [0, -0.3, out * 0.5],
    color: DARK_STEEL,
    metalness: 0.7,
    roughness: 0.45,
  });

  CAR_PARTS.push({
    id: `shaft-${corner.id}`,
    geo: "cylinder",
    layer: "inner",
    region: "drive",
    args: [0.038, 0.038, 0.54, 12],
    at: [corner.x, wheelR + 0.1, corner.z * 0.5],
    rotation: [Math.PI / 2, 0, 0],
    blowsTo: [corner.x > 0 ? 0.72 : -0.72, 0.5, 0],
    color: STEEL,
    metalness: 0.88,
    roughness: 0.3,
  });
}

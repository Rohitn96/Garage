import type { CarRegionId } from "@/data/services";

/**
 * A low-poly EV assembled from primitives — no external model, nothing to license.
 *
 * This replaces the three-box combustion saloon that used to sit here. That car
 * had an engine block, a timing belt, an exhaust and a muffler, which meant the
 * centrepiece of a Tesla-first garage's website was an internal combustion
 * sedan. The silhouette now reads EV at a glance:
 *
 *   - a FASTBACK roofline: canopy set back from the nose and falling into a
 *     short deck, rather than a saloon's three distinct boxes
 *   - a full-length GLASS ROOF panel, the single most recognisable modern EV cue
 *   - a SKATEBOARD battery pack spanning the wheelbase under the floor, which is
 *     the thing that actually makes the packaging look electric
 *   - two drive units on the axles instead of a block behind the nose
 *   - a frunk lid at the front, because there is nothing under it
 *
 * The car sits along +X (nose at +X), is ~4.6 long and ~1.9 wide, and rests on
 * y = 0.
 *
 * TWO LAYERS
 * ----------
 * `shell` parts are the bodywork: rendered as near-invisible tinted glass with a
 * drawn edge, so the mechanicals inside are legible without the shell being
 * removed. `inner` parts are the mechanicals, fully opaque.
 *
 * The shell is what makes this work as a cutaway — see CarModel for the depth
 * ordering that stops the glass from swallowing what is behind it.
 */

export type Vec3 = [number, number, number];

/** "rounded" is a drei RoundedBox — soft edges read as bodywork, hard ones as a crate. */
export type PartKind = "box" | "rounded" | "cylinder";

/** Shell parts belong to no service region and can never be selected. */
export type PartLayer = "shell" | "inner";

export type CarPart = {
  id: string;
  kind: PartKind;
  layer: PartLayer;
  /** Which service group owns this part. `null` for the shell. */
  region: CarRegionId | null;
  /** box/rounded: [w, h, d] — cylinder: [radius, height, radialSegments] */
  size: Vec3;
  /** Resting position, i.e. the assembled car. */
  at: Vec3;
  rotation?: Vec3;
  /** Corner radius for `rounded` parts. Must stay under half the smallest side. */
  radius?: number;
  /** Direction and distance this part travels when its region is opened up. */
  blowsTo: Vec3;
  color: string;
  metalness?: number;
  roughness?: number;
  /** Self-lit parts: the HV pack reads as live rather than as another grey box. */
  emissive?: string;
  emissiveIntensity?: number;
};

/* --- Palette -------------------------------------------------------------
 * Every mechanical part sits in a steel/graphite range on purpose. The accent
 * is reserved ENTIRELY for the selected region, so highlight is the only thing
 * on screen that carries colour and selection is unmissable.
 * -------------------------------------------------------------------------*/
const GLASS = "#93AEB4";      // shell tint — pale, so it reads against a black ground
const PACK = "#20262B";       // HV battery: graphite, with a faint glow below
const PACK_RAIL = "#39423E";  // pack crash structure
const MOTOR = "#B4BDBE";      // drive unit castings
const INVERTER = "#69756F";   // power electronics
const STEEL = "#98A29E";      // struts, shafts
const SUBFRAME = "#474F4C";   // structural
const DISC = "#C6CDCB";       // brake discs
const CALIPER = "#7C8783";    // calipers
const TYRE = "#191B1C";
const RIM = "#C2C9C7";
const HVAC = "#7E8C88";

/** Wheel geometry, referenced by arches, brakes and suspension so they stay in sync. */
const WHEEL_R = 0.33;
const WHEEL_W = 0.28;
const AXLE_Y = WHEEL_R; // wheel centre = radius, so the tyre touches the ground
const TRACK_Z = 0.86;
const AXLE_X = 1.45;

export const CAR_PARTS: CarPart[] = [
  /* ==== SHELL =========================================================== */
  // Main body mass, sill to beltline. Long and low.
  {
    id: "body",
    kind: "rounded",
    layer: "shell",
    region: null,
    size: [4.55, 0.66, 1.88],
    at: [0, 0.63, 0],
    radius: 0.17,
    blowsTo: [0, 0.1, 0],
    color: GLASS,
  },
  // Greenhouse, set back from the nose — the fastback cue.
  {
    id: "canopy",
    kind: "rounded",
    layer: "shell",
    region: null,
    size: [2.45, 0.46, 1.62],
    at: [-0.3, 1.17, 0],
    radius: 0.19,
    blowsTo: [0, 0.35, 0],
    color: GLASS,
  },
  // The glass roof. One uninterrupted panel — the EV signature.
  {
    id: "glass-roof",
    kind: "box",
    layer: "shell",
    region: null,
    size: [2.05, 0.045, 1.44],
    at: [-0.32, 1.41, 0],
    blowsTo: [0, 0.75, 0],
    color: GLASS,
  },
  // Frunk lid. Lifts and forward, because there is nothing under it.
  {
    id: "frunk-lid",
    kind: "rounded",
    layer: "shell",
    region: null,
    size: [1.05, 0.06, 1.76],
    at: [1.62, 0.965, 0],
    radius: 0.025,
    blowsTo: [0.5, 0.7, 0],
    color: GLASS,
  },
  {
    id: "boot-lid",
    kind: "rounded",
    layer: "shell",
    region: null,
    size: [0.8, 0.06, 1.76],
    at: [-1.88, 0.965, 0],
    radius: 0.025,
    blowsTo: [-0.5, 0.6, 0],
    color: GLASS,
  },

  /* ==== BATTERY & CHARGING ============================================== */
  // The skateboard. Spans the wheelbase, sits under the floor, glows faintly.
  {
    id: "hv-pack",
    kind: "rounded",
    layer: "inner",
    region: "battery",
    size: [3.35, 0.17, 1.56],
    at: [0, 0.36, 0],
    radius: 0.04,
    blowsTo: [0, -0.62, 0],
    color: PACK,
    metalness: 0.4,
    roughness: 0.55,
    emissive: "#35D68A",
    emissiveIntensity: 0.035,
  },
  // Side rails: the pack's crash structure, and a visual frame for the glow.
  {
    id: "pack-rail-l",
    kind: "box",
    layer: "inner",
    region: "battery",
    size: [3.35, 0.13, 0.09],
    at: [0, 0.36, 0.79],
    blowsTo: [0, -0.62, 0.18],
    color: PACK_RAIL,
    metalness: 0.7,
    roughness: 0.4,
  },
  {
    id: "pack-rail-r",
    kind: "box",
    layer: "inner",
    region: "battery",
    size: [3.35, 0.13, 0.09],
    at: [0, 0.36, -0.79],
    blowsTo: [0, -0.62, -0.18],
    color: PACK_RAIL,
    metalness: 0.7,
    roughness: 0.4,
  },
  // The 12 V, in the frunk. Small, unglamorous, strands more cars than the pack.
  {
    id: "lv-battery",
    kind: "box",
    layer: "inner",
    region: "battery",
    size: [0.34, 0.22, 0.3],
    at: [1.58, 0.72, 0.48],
    blowsTo: [0.45, 0.6, 0.5],
    color: "#5E6A64",
    metalness: 0.35,
    roughness: 0.6,
  },
  // Charge port, rear quarter — where a Tesla actually wears it.
  {
    id: "charge-port",
    kind: "box",
    layer: "inner",
    region: "battery",
    size: [0.1, 0.18, 0.24],
    at: [-2.06, 0.8, 0.78],
    blowsTo: [-0.4, 0.35, 0.6],
    color: "#8E9995",
    metalness: 0.55,
    roughness: 0.4,
  },

  /* ==== DRIVE UNITS ===================================================== */
  {
    id: "motor-front",
    kind: "cylinder",
    layer: "inner",
    region: "drive",
    size: [0.23, 0.52, 20],
    at: [AXLE_X, 0.47, 0],
    rotation: [Math.PI / 2, 0, 0],
    blowsTo: [1.5, 0.95, 0],
    color: MOTOR,
    metalness: 0.85,
    roughness: 0.35,
  },
  {
    id: "motor-rear",
    kind: "cylinder",
    layer: "inner",
    region: "drive",
    size: [0.27, 0.58, 20],
    at: [-AXLE_X, 0.47, 0],
    rotation: [Math.PI / 2, 0, 0],
    blowsTo: [-1.5, 0.95, 0],
    color: MOTOR,
    metalness: 0.85,
    roughness: 0.35,
  },
  {
    id: "inverter-rear",
    kind: "rounded",
    layer: "inner",
    region: "drive",
    size: [0.36, 0.26, 0.52],
    at: [-AXLE_X + 0.05, 0.82, 0],
    radius: 0.04,
    blowsTo: [-1.2, 1.6, 0],
    color: INVERTER,
    metalness: 0.6,
    roughness: 0.45,
  },
  {
    id: "inverter-front",
    kind: "rounded",
    layer: "inner",
    region: "drive",
    size: [0.3, 0.22, 0.44],
    at: [AXLE_X - 0.06, 0.8, -0.3],
    radius: 0.04,
    blowsTo: [1.2, 1.5, -0.7],
    color: INVERTER,
    metalness: 0.6,
    roughness: 0.45,
  },

  /* ==== HEAT PUMP & CLIMATE ============================================= */
  // Front radiator stack, standing across the nose.
  {
    id: "condenser",
    kind: "box",
    layer: "inner",
    region: "climate",
    size: [0.11, 0.42, 1.24],
    at: [2.12, 0.6, 0],
    blowsTo: [1.7, 0.95, 0],
    color: HVAC,
    metalness: 0.75,
    roughness: 0.45,
  },
  {
    id: "heat-pump",
    kind: "cylinder",
    layer: "inner",
    region: "climate",
    size: [0.16, 0.3, 18],
    at: [1.9, 0.62, -0.48],
    rotation: [0, 0, Math.PI / 2],
    blowsTo: [1.3, 1.35, -1.1],
    color: "#6F7D79",
    metalness: 0.7,
    roughness: 0.42,
  },
  // The valve block that routes heat between pack, motors and cabin.
  {
    id: "octovalve",
    kind: "rounded",
    layer: "inner",
    region: "climate",
    size: [0.24, 0.24, 0.24],
    at: [1.72, 0.62, 0.4],
    radius: 0.04,
    blowsTo: [1.1, 1.4, 0.95],
    color: "#8A9793",
    metalness: 0.65,
    roughness: 0.4,
  },
  {
    id: "cabin-blower",
    kind: "cylinder",
    layer: "inner",
    region: "climate",
    size: [0.18, 0.26, 16],
    at: [0.95, 0.82, 0.42],
    rotation: [0, 0, Math.PI / 2],
    blowsTo: [0.5, 1.55, 1.0],
    color: HVAC,
    metalness: 0.55,
    roughness: 0.5,
  },

  /* ==== SUSPENSION & STEERING (structure) =============================== */
  {
    id: "subframe-front",
    kind: "box",
    layer: "inner",
    region: "suspension",
    size: [0.42, 0.1, 1.5],
    at: [AXLE_X, 0.3, 0],
    blowsTo: [1.2, -0.75, 0],
    color: SUBFRAME,
    metalness: 0.6,
    roughness: 0.6,
  },
  {
    id: "subframe-rear",
    kind: "box",
    layer: "inner",
    region: "suspension",
    size: [0.46, 0.1, 1.5],
    at: [-AXLE_X, 0.3, 0],
    blowsTo: [-1.2, -0.75, 0],
    color: SUBFRAME,
    metalness: 0.6,
    roughness: 0.6,
  },
  {
    id: "steering-rack",
    kind: "cylinder",
    layer: "inner",
    region: "suspension",
    size: [0.05, 1.3, 12],
    at: [AXLE_X - 0.3, 0.42, 0],
    rotation: [Math.PI / 2, 0, 0],
    blowsTo: [1.4, -0.6, 0],
    color: STEEL,
    metalness: 0.8,
    roughness: 0.4,
  },
];

/** The four corners, so wheel / brake / suspension parts stay in sync. */
const CORNERS: Array<{ id: string; x: number; z: number }> = [
  { id: "fl", x: AXLE_X, z: TRACK_Z },
  { id: "fr", x: AXLE_X, z: -TRACK_Z },
  { id: "rl", x: -AXLE_X, z: TRACK_Z },
  { id: "rr", x: -AXLE_X, z: -TRACK_Z },
];

for (const corner of CORNERS) {
  const outward = Math.sign(corner.z);

  /* ---- Wheels: furthest out, so everything behind them stays readable ---- */
  CAR_PARTS.push({
    id: `tyre-${corner.id}`,
    kind: "cylinder",
    layer: "inner",
    region: "wheels",
    size: [WHEEL_R, WHEEL_W, 24],
    at: [corner.x, AXLE_Y, corner.z],
    rotation: [Math.PI / 2, 0, 0],
    blowsTo: [0, 0.15, outward * 2.3],
    color: TYRE,
    metalness: 0.1,
    roughness: 0.92,
  });

  // Aero-style face, so a wheel seen head-on still reads as a wheel.
  CAR_PARTS.push({
    id: `rim-${corner.id}`,
    kind: "cylinder",
    layer: "inner",
    region: "wheels",
    size: [WHEEL_R * 0.64, WHEEL_W * 1.06, 22],
    at: [corner.x, AXLE_Y, corner.z],
    rotation: [Math.PI / 2, 0, 0],
    blowsTo: [0, 0.15, outward * 2.3],
    color: RIM,
    metalness: 0.82,
    roughness: 0.3,
  });

  /* ---- Brakes: sit inboard of the wheel and travel less far --------------- */
  CAR_PARTS.push({
    id: `disc-${corner.id}`,
    kind: "cylinder",
    layer: "inner",
    region: "brakes",
    size: [WHEEL_R * 0.7, 0.045, 22],
    at: [corner.x, AXLE_Y, corner.z * 0.86],
    rotation: [Math.PI / 2, 0, 0],
    blowsTo: [0, 0.55, outward * 1.35],
    color: DISC,
    metalness: 0.9,
    roughness: 0.3,
  });

  CAR_PARTS.push({
    id: `caliper-${corner.id}`,
    kind: "rounded",
    layer: "inner",
    region: "brakes",
    size: [0.13, 0.24, 0.11],
    at: [corner.x - 0.2, AXLE_Y + 0.15, corner.z * 0.86],
    radius: 0.03,
    blowsTo: [-0.45, 0.95, outward * 1.35],
    color: CALIPER,
    metalness: 0.6,
    roughness: 0.4,
  });

  /* ---- Suspension: strut and lower arm at each corner --------------------- */
  CAR_PARTS.push({
    id: `strut-${corner.id}`,
    kind: "cylinder",
    layer: "inner",
    region: "suspension",
    size: [0.07, 0.5, 14],
    at: [corner.x, AXLE_Y + 0.32, corner.z * 0.72],
    blowsTo: [0, 1.1, outward * 1.7],
    color: STEEL,
    metalness: 0.75,
    roughness: 0.4,
  });

  CAR_PARTS.push({
    id: `arm-${corner.id}`,
    kind: "box",
    layer: "inner",
    region: "suspension",
    size: [0.12, 0.07, 0.58],
    at: [corner.x, AXLE_Y - 0.06, corner.z * 0.6],
    blowsTo: [0, -0.7, outward * 1.6],
    color: SUBFRAME,
    metalness: 0.65,
    roughness: 0.5,
  });

  /* ---- Half-shaft from drive unit to hub --------------------------------- */
  CAR_PARTS.push({
    id: `shaft-${corner.id}`,
    kind: "cylinder",
    layer: "inner",
    region: "drive",
    size: [0.045, 0.62, 10],
    at: [corner.x, AXLE_Y + 0.14, corner.z * 0.5],
    rotation: [Math.PI / 2, 0, 0],
    blowsTo: [corner.x > 0 ? 1.5 : -1.5, 0.95, outward * 0.5],
    color: STEEL,
    metalness: 0.85,
    roughness: 0.35,
  });
}

/** Ids of every shell part, so the renderer can order them last in one check. */
export const SHELL_PART_IDS = new Set(
  CAR_PARTS.filter((p) => p.layer === "shell").map((p) => p.id),
);

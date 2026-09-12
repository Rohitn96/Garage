import {
  BoxGeometry,
  BufferGeometry,
  CylinderGeometry,
  ExtrudeGeometry,
  LatheGeometry,
  Shape,
  Vector2,
} from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/**
 * The car, built as surfaces rather than as a pile of primitives.
 *
 * The previous model was boxes and cylinders, and it read as a toy for a reason
 * that has nothing to do with polygon count: a car is not made of boxes. It has
 * ONE continuous side silhouette — a nose that drops, a windscreen that rakes
 * into a roof, a fastback that falls to a short deck, and wheel openings cut
 * into it. Stacking rectangles can approximate the volume but never the line.
 *
 * So the body here is a single extruded SILHOUETTE, drawn the way you would
 * sketch a car in side view, wheel arches included. Three passes then turn that
 * flat slab into something with a body:
 *
 *   PLAN TAPER      a real car is widest at the B-pillar and narrows toward both
 *                   bumpers. Scaling Z by a curve in X is what stops the
 *                   extrusion reading as a slab seen end-on.
 *   TUMBLEHOME      the sides lean inward toward the roof. Scaling Z by a curve
 *                   in Y gives the greenhouse its taper and the body its waist.
 *   SHOULDER CROWN  a slight barrel through the middle, so the flank catches a
 *                   moving highlight instead of a flat one.
 *
 * Together those three are most of what the eye reads as "car body", and they
 * cost one pass over the position buffer.
 *
 * Everything is procedural: no external model, nothing to license, nothing to
 * download at runtime.
 */

/* --- Dimensions (Model 3/Y proportions, in metres) ------------------------ */
export const CAR = {
  halfLength: 2.35,
  halfWidth: 0.925,
  height: 1.45,
  axleF: 1.44,
  axleR: -1.42,
  wheelR: 0.335,
  wheelW: 0.275,
  trackHalf: 0.79,
  beltline: 0.93,
  sill: 0.335,
} as const;

const ARCH_R = 0.47;

/* --- Shaping helpers ------------------------------------------------------ */

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
/** Smootherstep: zero first AND second derivative at both ends, so the taper
 *  never shows a crease where it starts. */
const smooth = (v: number) => {
  const t = clamp01(v);
  return t * t * t * (t * (t * 6 - 15) + 10);
};

type ShapeOpts = {
  /** How much narrower the nose gets, 0–1. */
  noseTaper: number;
  /** How much narrower the tail gets, 0–1. */
  tailTaper: number;
  /** How much narrower the top gets (tumblehome), 0–1. */
  tumblehome: number;
  /** Y at which tumblehome starts. */
  tumbleFrom: number;
  /** Y at which tumblehome is fully applied. */
  tumbleTo: number;
  /** Outward bulge at mid-height, in metres. */
  crown?: number;
};

/**
 * Turn a flat extrusion into a body: taper in plan, lean in section.
 *
 * Runs over the position buffer once, before normals are computed — doing it
 * after would leave the lighting describing the slab the geometry no longer is.
 */
function loft(geo: BufferGeometry, o: ShapeOpts): BufferGeometry {
  const pos = geo.attributes.position;
  const { halfLength } = CAR;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    // Plan taper: full width through the middle, pinching toward each bumper.
    const ax = x / halfLength;
    let planar = 1;
    if (ax > 0.45) planar -= o.noseTaper * smooth((ax - 0.45) / 0.55);
    if (ax < -0.45) planar -= o.tailTaper * smooth((-ax - 0.45) / 0.55);

    // Tumblehome: sides lean in as they rise.
    const ty = (y - o.tumbleFrom) / (o.tumbleTo - o.tumbleFrom);
    const tumble = 1 - o.tumblehome * smooth(ty);

    // Shoulder crown: a little barrel so the flank is not dead flat.
    const crown = o.crown
      ? 1 + (o.crown * Math.sin(Math.PI * clamp01((y - CAR.sill) / (CAR.beltline - CAR.sill)))) / Math.max(Math.abs(z), 0.001)
      : 1;

    pos.setZ(i, z * planar * tumble * crown);
  }

  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

function extrude(shape: Shape, depth: number, bevel: number, curveSegments = 24) {
  const geo = new ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments,
  });
  geo.translate(0, 0, -depth / 2);
  return geo;
}

/* --- Body ---------------------------------------------------------------- */

/**
 * The lower body: sill to beltline, with the wheel openings cut into it.
 *
 * The arches are part of the silhouette rather than separate parts stuck on.
 * That is the difference between a wheel that sits IN the body and one that
 * hovers beside it, and it is the single most legible thing in the whole model.
 */
export function buildLowerBody(): BufferGeometry {
  const { halfLength, axleF, axleR, sill, beltline } = CAR;
  const s = new Shape();

  // Front bumper, bottom edge, travelling rearwards.
  s.moveTo(halfLength - 0.08, sill);
  s.lineTo(axleF + ARCH_R, sill);
  s.absarc(axleF, sill, ARCH_R, 0, Math.PI, false); // front wheel opening
  s.lineTo(axleR + ARCH_R, sill);
  s.absarc(axleR, sill, ARCH_R, 0, Math.PI, false); // rear wheel opening
  s.lineTo(-halfLength + 0.06, sill);

  // Rear bumper up to the tail.
  s.quadraticCurveTo(-halfLength - 0.01, sill + 0.08, -halfLength, 0.62);
  s.quadraticCurveTo(-halfLength + 0.01, 0.84, -halfLength + 0.12, beltline - 0.02);

  // Beltline, running forward with a slight rise.
  s.lineTo(-0.6, beltline + 0.01);
  s.lineTo(1.15, beltline);
  s.quadraticCurveTo(1.95, beltline - 0.02, halfLength - 0.12, 0.80);

  // Nose, dropping to the bumper.
  s.quadraticCurveTo(halfLength + 0.02, 0.62, halfLength, 0.48);
  s.quadraticCurveTo(halfLength - 0.01, sill + 0.06, halfLength - 0.08, sill);

  const geo = extrude(s, CAR.halfWidth * 2 - 0.09, 0.045, 28);
  return loft(geo, {
    noseTaper: 0.13,
    tailTaper: 0.1,
    tumblehome: 0.05,
    tumbleFrom: 0.62,
    tumbleTo: CAR.beltline,
    crown: 0.012,
  });
}

/**
 * The greenhouse: windscreen, roof and the fastback fall to the deck.
 *
 * Narrower than the body and tapering hard toward the roof, which is what makes
 * a cabin read as a cabin rather than as a second box.
 */
export function buildGreenhouse(): BufferGeometry {
  const { beltline } = CAR;
  const s = new Shape();

  s.moveTo(0.86, beltline);
  s.quadraticCurveTo(0.42, 1.28, -0.16, 1.425); // windscreen rake
  s.quadraticCurveTo(-0.60, 1.47, -1.04, 1.40); // roof, lightly crowned
  s.quadraticCurveTo(-1.68, 1.24, -2.02, beltline + 0.03); // fastback
  s.lineTo(0.86, beltline);

  const geo = extrude(s, CAR.halfWidth * 2 - 0.30, 0.035, 28);
  return loft(geo, {
    noseTaper: 0.06,
    tailTaper: 0.06,
    tumblehome: 0.20,
    tumbleFrom: beltline,
    tumbleTo: 1.47,
  });
}

/* --- Wheels --------------------------------------------------------------- */

/**
 * Tyre as a lathe, not a cylinder.
 *
 * A cylinder has a hard 90° edge where the tread meets the sidewall; a real tyre
 * has a shoulder radius, and that shoulder is where the highlight sits. It is a
 * six-point profile and it is the difference between a wheel and a hockey puck.
 */
export function buildTyre(): BufferGeometry {
  const { wheelR, wheelW } = CAR;
  const hw = wheelW / 2;
  const profile = [
    new Vector2(0.205, -hw + 0.01),
    new Vector2(0.245, -hw),
    new Vector2(0.30, -hw),
    new Vector2(wheelR - 0.02, -hw + 0.045),
    new Vector2(wheelR, -hw + 0.09),
    new Vector2(wheelR, hw - 0.09),
    new Vector2(wheelR - 0.02, hw - 0.045),
    new Vector2(0.30, hw),
    new Vector2(0.245, hw),
    new Vector2(0.205, hw - 0.01),
  ];
  const geo = new LatheGeometry(profile, 40);
  geo.rotateX(Math.PI / 2); // lay the axis along Z
  return geo;
}

/**
 * An aero-style wheel face: dished disc, outer lip, and five recessed pockets.
 *
 * Merged into ONE geometry so all four corners are four draw calls, not forty.
 */
export function buildRim(): BufferGeometry {
  const { wheelW } = CAR;
  const parts: BufferGeometry[] = [];

  // Barrel behind the face.
  const barrel = new CylinderGeometry(0.2, 0.2, wheelW * 0.9, 28);
  parts.push(barrel);

  // Dished face.
  const face = new CylinderGeometry(0.208, 0.196, 0.035, 32);
  face.translate(0, wheelW * 0.45, 0);
  parts.push(face);

  // Outer lip, so the rim edge catches light against the tyre.
  const lip = new CylinderGeometry(0.213, 0.213, 0.03, 32);
  lip.translate(0, wheelW * 0.40, 0);
  parts.push(lip);

  // Five pockets pressed into the face.
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const pocket = new BoxGeometry(0.052, 0.02, 0.112);
    pocket.translate(0, wheelW * 0.47, 0.113);
    pocket.rotateY(a);
    parts.push(pocket);
  }

  const merged = mergeGeometries(parts, false)!;
  merged.rotateX(Math.PI / 2);
  return merged;
}

/* --- Mechanicals ---------------------------------------------------------- */

/**
 * The HV pack: a floor plate with the module divisions visible.
 *
 * A featureless slab is the single most toy-like thing that can sit under a car.
 * Real packs are a tray of modules, and showing them is what makes this read as
 * the actual component the service list is talking about.
 */
export function buildBatteryPack(): BufferGeometry {
  const parts: BufferGeometry[] = [];
  const L = 3.3;
  const W = 1.5;

  const tray = new BoxGeometry(L, 0.075, W);
  parts.push(tray);

  // Module rows, with visible gaps between them.
  const rows = 6;
  for (let i = 0; i < rows; i++) {
    const m = new BoxGeometry(L / rows - 0.055, 0.085, W - 0.1);
    m.translate(-L / 2 + (L / rows) * (i + 0.5), 0.08, 0);
    parts.push(m);
  }

  // Perimeter rails: the pack's crash structure.
  for (const z of [-1, 1]) {
    const rail = new BoxGeometry(L + 0.05, 0.13, 0.06);
    rail.translate(0, 0.03, z * (W / 2 + 0.01));
    parts.push(rail);
  }

  return mergeGeometries(parts, false)!;
}

/** Drive unit: motor barrel, end bells and the gearbox housing beside it. */
export function buildDriveUnit(scale = 1): BufferGeometry {
  const parts: BufferGeometry[] = [];

  const stator = new CylinderGeometry(0.155, 0.155, 0.38, 26);
  stator.rotateX(Math.PI / 2);
  parts.push(stator);

  for (const z of [-1, 1]) {
    const bell = new CylinderGeometry(0.125, 0.145, 0.07, 24);
    bell.rotateX(Math.PI / 2);
    bell.translate(0, 0, z * 0.225);
    parts.push(bell);
  }

  // Reduction gearbox, offset and below, the way a real unit packages.
  const box = new CylinderGeometry(0.13, 0.13, 0.2, 22);
  box.rotateX(Math.PI / 2);
  box.translate(-0.16, -0.09, 0.18);
  parts.push(box);

  const merged = mergeGeometries(parts, false)!;
  if (scale !== 1) merged.scale(scale, scale, scale);
  return merged;
}

/** Brake disc with a hat and a vented edge hint. */
export function buildDisc(): BufferGeometry {
  const parts: BufferGeometry[] = [];
  const face = new CylinderGeometry(0.24, 0.24, 0.024, 32);
  parts.push(face);
  const hat = new CylinderGeometry(0.105, 0.105, 0.06, 24);
  hat.translate(0, 0.03, 0);
  parts.push(hat);
  const merged = mergeGeometries(parts, false)!;
  merged.rotateX(Math.PI / 2);
  return merged;
}

/** Caliper: a body that wraps the disc edge rather than a floating cube. */
export function buildCaliper(): BufferGeometry {
  const parts: BufferGeometry[] = [];
  const body = new BoxGeometry(0.075, 0.2, 0.135);
  parts.push(body);
  for (const z of [-1, 1]) {
    const pad = new BoxGeometry(0.06, 0.155, 0.028);
    pad.translate(0, -0.015, z * 0.052);
    parts.push(pad);
  }
  return mergeGeometries(parts, false)!;
}

/** Strut: coil spring suggested by a tapered body, plus the damper rod. */
export function buildStrut(): BufferGeometry {
  const parts: BufferGeometry[] = [];
  const spring = new CylinderGeometry(0.072, 0.08, 0.3, 18);
  parts.push(spring);
  const rod = new CylinderGeometry(0.026, 0.026, 0.28, 14);
  rod.translate(0, 0.26, 0);
  parts.push(rod);
  const top = new CylinderGeometry(0.075, 0.05, 0.045, 18);
  top.translate(0, 0.4, 0);
  parts.push(top);
  return mergeGeometries(parts, false)!;
}

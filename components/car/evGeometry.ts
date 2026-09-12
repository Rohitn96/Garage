import {
  BoxGeometry,
  BufferGeometry,
  CatmullRomCurve3,
  CylinderGeometry,
  ExtrudeGeometry,
  LatheGeometry,
  Shape,
  TorusGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
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
  const carcass = new LatheGeometry(profile, 44);
  const parts: BufferGeometry[] = [carcass];

  // Tread blocks. Merged once and reused on all four corners, and they do more
  // for the silhouette than anything else on the wheel: a smooth torus reads as
  // a doughnut, a broken one reads as a tyre.
  const blocks = 30;
  for (let i = 0; i < blocks; i++) {
    const a = (i / blocks) * Math.PI * 2;
    const block = new BoxGeometry(0.05, 0.018, wheelW * 0.6);
    // Alternate either side of the centre line, like a real tread pattern.
    block.translate(0, (i % 2 ? 1 : -1) * wheelW * 0.17, wheelR - 0.004);
    block.rotateX(a);
    parts.push(block);
  }

  const geo = mergeGeometries(parts, false)!;
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

  // Ten turbine spokes, each raked slightly so the face has depth rather than
  // reading as a printed disc.
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const spoke = new BoxGeometry(0.034, 0.028, 0.125);
    spoke.rotateX(0.2);
    spoke.translate(0, wheelW * 0.47, 0.118);
    spoke.rotateY(a);
    parts.push(spoke);
  }

  // Hub cap and five lug bosses: the detail the eye checks for on a wheel.
  const hub = new CylinderGeometry(0.056, 0.052, 0.032, 20);
  hub.translate(0, wheelW * 0.5, 0);
  parts.push(hub);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const lug = new CylinderGeometry(0.013, 0.013, 0.022, 10);
    lug.translate(0.08, wheelW * 0.5, 0);
    lug.rotateY(a);
    parts.push(lug);
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

/**
 * Vented brake disc: two friction faces with a ring of vanes between them.
 *
 * Replaces a solid puck. The vanes only show at the rim — which is exactly where
 * the eye goes once the wheel has been pulled away from the car, so it is the
 * cheapest detail on the model per unit of attention it receives.
 */
export function buildDisc(): BufferGeometry {
  const parts: BufferGeometry[] = [];
  const R = 0.24;

  for (const y of [-0.018, 0.018]) {
    const face = new CylinderGeometry(R, R, 0.013, 36);
    face.translate(0, y, 0);
    parts.push(face);
  }
  for (let i = 0; i < 30; i++) {
    const a = (i / 30) * Math.PI * 2;
    const vane = new BoxGeometry(0.055, 0.024, 0.013);
    vane.translate(R - 0.05, 0, 0);
    vane.rotateY(a);
    parts.push(vane);
  }

  const hat = new CylinderGeometry(0.1, 0.094, 0.08, 24);
  hat.translate(0, 0.052, 0);
  parts.push(hat);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const stud = new CylinderGeometry(0.012, 0.012, 0.03, 8);
    stud.translate(0.062, 0.08, 0);
    stud.rotateY(a);
    parts.push(stud);
  }

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

/**
 * Strut: a real helical coil, the damper rod and a top mount.
 *
 * The coil is a tube swept along a helix rather than a tapered cylinder. It is
 * six turns of trigonometry and it is the difference between "a suspension
 * component" and "a peg" — a spring is the one part on a car that everybody can
 * identify on sight, so faking it is immediately obvious.
 */
export function buildStrut(): BufferGeometry {
  const parts: BufferGeometry[] = [];

  const turns = 6;
  const coilR = 0.072;
  const coilH = 0.3;
  const steps = turns * 16;
  const pts: Vector3[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = t * turns * Math.PI * 2;
    pts.push(new Vector3(Math.cos(a) * coilR, -coilH / 2 + t * coilH, Math.sin(a) * coilR));
  }
  const spring = new TubeGeometry(new CatmullRomCurve3(pts), steps, 0.0135, 8, false);
  parts.push(spring);
  const rod = new CylinderGeometry(0.026, 0.026, 0.28, 14);
  rod.translate(0, 0.26, 0);
  parts.push(rod);
  const top = new CylinderGeometry(0.075, 0.05, 0.045, 18);
  top.translate(0, 0.4, 0);
  parts.push(top);
  return mergeGeometries(parts, false)!;
}

/* --- Cabin ----------------------------------------------------------------
 * Seats and a wheel, seen through the glass.
 *
 * An empty greenhouse is the single thing that most makes a car model read as a
 * shell. You cannot see much through tinted glass, and that is the point: the
 * eye only needs the suggestion of an interior to stop reading the cabin as a
 * void.
 * -------------------------------------------------------------------------*/
export function buildSeat(): BufferGeometry {
  const parts: BufferGeometry[] = [];
  const base = new BoxGeometry(0.44, 0.1, 0.44);
  parts.push(base);
  const back = new BoxGeometry(0.13, 0.56, 0.42);
  back.rotateZ(-0.17);
  back.translate(-0.21, 0.3, 0);
  parts.push(back);
  const rest = new BoxGeometry(0.12, 0.15, 0.26);
  rest.translate(-0.29, 0.62, 0);
  parts.push(rest);
  return mergeGeometries(parts, false)!;
}

export function buildSteeringWheel(): BufferGeometry {
  const parts: BufferGeometry[] = [];
  const rim = new TorusGeometry(0.15, 0.018, 10, 30);
  parts.push(rim);
  const hub = new CylinderGeometry(0.048, 0.048, 0.04, 16);
  hub.rotateX(Math.PI / 2);
  parts.push(hub);
  for (const a of [-0.65, 0.65, Math.PI]) {
    const spoke = new BoxGeometry(0.11, 0.022, 0.028);
    spoke.translate(0.055, 0, 0);
    spoke.rotateZ(a);
    parts.push(spoke);
  }
  const geo = mergeGeometries(parts, false)!;
  geo.rotateY(Math.PI / 2);
  geo.rotateZ(-0.52); // raked, like a real column
  return geo;
}

/** Dashboard and centre screen, so the front of the cabin is not hollow. */
export function buildDashboard(): BufferGeometry {
  const parts: BufferGeometry[] = [];
  const binnacle = new BoxGeometry(0.3, 0.11, 1.42);
  parts.push(binnacle);
  const screen = new BoxGeometry(0.02, 0.19, 0.32);
  screen.rotateZ(0.06);
  screen.translate(-0.13, 0.02, 0.02);
  parts.push(screen);
  return mergeGeometries(parts, false)!;
}

/**
 * High-voltage cable runs, pack to drive units.
 *
 * Orange is not a styling choice here: HV cable is orange by international
 * convention, specifically so that nobody grabs it by accident. On a cutaway it
 * is the most legible "this is an EV, and working on it takes certification"
 * signal available — which is exactly the claim the page beside it makes.
 */
export function buildHvCables(): BufferGeometry {
  const runs: Vector3[][] = [
    [
      new Vector3(-0.95, 0.44, 0.24),
      new Vector3(-1.18, 0.54, 0.28),
      new Vector3(-1.36, 0.56, 0.15),
      new Vector3(-1.42, 0.5, 0.03),
    ],
    [
      new Vector3(0.95, 0.44, -0.22),
      new Vector3(1.18, 0.54, -0.26),
      new Vector3(1.36, 0.54, -0.13),
      new Vector3(1.42, 0.48, -0.02),
    ],
    [
      new Vector3(-1.0, 0.46, -0.22),
      new Vector3(-1.24, 0.6, -0.22),
      new Vector3(-1.38, 0.68, -0.09),
    ],
    [
      new Vector3(1.5, 0.5, 0.3),
      new Vector3(1.72, 0.62, 0.4),
      new Vector3(1.86, 0.6, 0.3),
    ],
  ];
  const parts = runs.map(
    (pts) => new TubeGeometry(new CatmullRomCurve3(pts), 30, 0.021, 8, false),
  );
  return mergeGeometries(parts, false)!;
}

/** Door mirror: stalk plus housing. Small, and badly missed when absent. */
export function buildMirror(): BufferGeometry {
  const parts: BufferGeometry[] = [];
  const stalk = new BoxGeometry(0.05, 0.028, 0.075);
  parts.push(stalk);
  const housing = new BoxGeometry(0.145, 0.075, 0.055);
  housing.translate(0.015, 0.026, 0.08);
  parts.push(housing);
  return mergeGeometries(parts, false)!;
}

/** A width-spanning light bar: the strip every modern EV wears at the back. */
export function buildLightBar(width: number, depth = 0.035): BufferGeometry {
  return new BoxGeometry(depth, 0.05, width);
}

"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BoxGeometry,
  Color,
  CylinderGeometry,
  FrontSide,
  MathUtils,
  type BufferGeometry,
  type Group,
  type Mesh,
  type MeshPhysicalMaterial,
} from "three";
import type { MotionValue } from "framer-motion";
import { CAR_PARTS, type CarPart, type GeoKey } from "./carParts";
import {
  buildBatteryPack,
  buildCaliper,
  buildDisc,
  buildDriveUnit,
  buildGreenhouse,
  buildLowerBody,
  buildRim,
  buildStrut,
  buildTyre,
} from "./evGeometry";
import type { CarRegionId } from "@/data/services";

/**
 * Focus and recession are both multiplicative. See the frame loop for why.
 *
 * Nothing is ever tinted with the accent, and nothing is self-lit. Both were
 * tried. A default mint emissive on every part looked harmless at 0.05 until it
 * landed on a tyre: rubber's albedo is about 0.05 too, so the glow was not a
 * highlight on the tyre, it WAS the tyre, and every focused wheel turned bright
 * green. Focus is carried by three things that cannot misfire like that — the
 * part moves, everything else washes back, and the panel names it.
 */

/* --- Shell -----------------------------------------------------------------
 * The bodywork is drawn as tinted lacquer you can see through, so the
 * mechanicals inside stay legible without the body being taken off.
 *
 * Two things make this work and both are easy to get wrong:
 *
 *   depthWrite={false} — a transparent surface that writes depth occludes
 *   whatever is drawn after it, regardless of its own opacity. With depth
 *   writing on, the near flank silently swallows half the car.
 *
 *   renderOrder — transparent surfaces composite in draw order, so the shell has
 *   to be drawn AFTER every opaque part. Without it the shell blends against
 *   whatever happened to be behind it, and parts flicker as the car turns.
 *
 * FrontSide, not DoubleSide: with both faces drawn, the far flank blends over
 * the near one and the whole body turns milky.
 *
 * No drawn edges. Outlining the shell was tried and abandoned: lofting bends the
 * extrusion's flat side caps into curved surfaces, so the fan of triangles they
 * were built from stops being coplanar and EVERY internal seam becomes an
 * "edge". No threshold separates those seams from the real creases, because
 * near the nose the taper makes them just as steep. The surface carries the
 * form on its own.
 * -------------------------------------------------------------------------*/
const SHELL_OPACITY = 0.3;
/** With a system open the shell steps back so the parts read clearly. */
const SHELL_OPACITY_OPEN = 0.13;

/** Geometry is built once per page and shared by every part that uses it. */
function useGeometries(): Record<GeoKey, BufferGeometry | null> {
  return useMemo(
    () => ({
      lowerBody: buildLowerBody(),
      greenhouse: buildGreenhouse(),
      tyre: buildTyre(),
      rim: buildRim(),
      pack: buildBatteryPack(),
      driveUnit: buildDriveUnit(),
      disc: buildDisc(),
      caliper: buildCaliper(),
      strut: buildStrut(),
      // Built per part from `args`, because each one differs.
      box: null,
      cylinder: null,
    }),
    [],
  );
}

function Part({
  part,
  geometry,
  activeRegion,
  openness,
}: {
  part: CarPart;
  geometry: BufferGeometry | null;
  activeRegion: CarRegionId | null;
  /** 0 = assembled, 1 = the active system fully separated. */
  openness: MotionValue<number>;
}) {
  const mesh = useRef<Mesh>(null);
  const material = useRef<MeshPhysicalMaterial>(null);
  const baseColor = useMemo(() => new Color(part.color), [part.color]);

  const spread = useRef(0);
  const glow = useRef(0);

  const isShell = part.layer === "shell";

  const geo = useMemo(() => {
    if (geometry) return geometry;
    const a = part.args ?? [];
    return part.geo === "cylinder"
      ? new CylinderGeometry(a[0], a[1], a[2], a[3] ?? 16)
      : new BoxGeometry(a[0], a[1], a[2]);
  }, [geometry, part.args, part.geo]);

  useFrame((_, delta) => {
    if (!mesh.current) return;

    const focused = !isShell && activeRegion === part.region;
    // The system on screen separates by exactly as much as the scroll has
    // travelled through its own stretch of the track — so the movement is the
    // scroll, not an animation the scroll happens to trigger.
    const target = focused ? openness.get() : 0;
    spread.current = MathUtils.damp(spread.current, target, 7, delta);
    glow.current = MathUtils.damp(glow.current, focused ? 1 : 0, 6, delta);

    mesh.current.position.set(
      part.at[0] + part.blowsTo[0] * spread.current,
      part.at[1] + part.blowsTo[1] * spread.current,
      part.at[2] + part.blowsTo[2] * spread.current,
    );

    const mat = material.current;
    if (!mat) return;

    if (isShell) {
      mat.opacity = MathUtils.damp(
        mat.opacity,
        activeRegion ? SHELL_OPACITY_OPEN : SHELL_OPACITY,
        5,
        delta,
      );
      return;
    }

    // Unselected parts recede by washing toward the ground colour, NOT by going
    // translucent — dropping opacity turns the mechanicals into ghost glass and
    // lets far parts sort through near ones.
    // Scale the part's own colour rather than blending toward a light or a dark.
    // Blending is the wrong operation here: three.js works in LINEAR space, so
    // lerping a near-black tyre 20% toward white does not tint it slightly, it
    // roughly triples its luminance and the wheel turns white. Multiplying
    // brightens every material by the same proportion and preserves its hue,
    // which is what "this one is lit, those are not" actually looks like.
    const dim = activeRegion && !focused ? 1 - glow.current : 0;
    const k = (1 + glow.current * 0.5) * (1 - dim * 0.72);
    mat.color.copy(baseColor).multiplyScalar(k);
  });

  return (
    <mesh
      ref={mesh}
      geometry={geo}
      position={part.at}
      rotation={part.rotation ?? [0, 0, 0]}
      scale={part.scale ?? 1}
      // The glass shell casts nothing, or it would throw a shadow of a body
      // panel across the parts it exists to reveal.
      castShadow={!isShell}
      renderOrder={isShell ? 10 : 0}
    >
      <meshPhysicalMaterial
        ref={material}
        color={part.color}
        metalness={part.metalness ?? 0.6}
        roughness={part.roughness ?? 0.4}
        clearcoat={part.clearcoat ?? 0}
        clearcoatRoughness={0.06}
        transparent={isShell}
        opacity={isShell ? SHELL_OPACITY : 1}
        depthWrite={!isShell}
        side={FrontSide}
        envMapIntensity={isShell ? 2.2 : 1.05}
      />
    </mesh>
  );
}

export function CarModel({
  activeRegion,
  openness,
  turn,
}: {
  activeRegion: CarRegionId | null;
  openness: MotionValue<number>;
  /** Scroll-driven yaw, in radians. */
  turn: MotionValue<number>;
}) {
  const group = useRef<Group>(null);
  const geometries = useGeometries();

  useFrame((state, delta) => {
    if (!group.current) return;

    // The whole car turns with the scroll, so the section reads as one
    // continuous move rather than six separate events.
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, turn.get(), 4, delta);

    // A breath of vertical float, small enough to read as "live", not as motion.
    group.current.position.y = -0.62 + Math.sin(state.clock.elapsedTime * 0.55) * 0.012;
  });

  return (
    <group ref={group} position={[0, -0.62, 0]}>
      {CAR_PARTS.map((part) => (
        <Part
          key={part.id}
          part={part}
          geometry={geometries[part.geo]}
          activeRegion={activeRegion}
          openness={openness}
        />
      ))}
    </group>
  );
}

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
  type MeshStandardMaterial,
} from "three";
import type { MotionValue } from "framer-motion";
import { CAR_PARTS, type GeoKey } from "./carParts";
import {
  buildBatteryPack,
  buildCaliper,
  buildDashboard,
  buildDisc,
  buildDriveUnit,
  buildGreenhouse,
  buildHvCables,
  buildLightBar,
  buildLowerBody,
  buildMirror,
  buildRim,
  buildSeat,
  buildSteeringWheel,
  buildStrut,
  buildTyre,
} from "./evGeometry";
import type { CarRegionId } from "@/data/services";

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
 * "edge". No threshold separates those seams from the real creases, because near
 * the nose the taper makes them just as steep.
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
      seat: buildSeat(),
      steeringWheel: buildSteeringWheel(),
      dashboard: buildDashboard(),
      hvCables: buildHvCables(),
      mirror: buildMirror(),
      tailBar: buildLightBar(1.3),
      headBar: buildLightBar(0.46, 0.05),
      // Built per part from `args`, because each one differs.
      box: null,
      cylinder: null,
    }),
    [],
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

  const meshes = useRef<(Mesh | null)[]>([]);
  const materials = useRef<(MeshStandardMaterial | null)[]>([]);

  /*
   * Per-part animation state, held in plain arrays.
   *
   * Each part used to own its own useFrame. Sixty subscriptions meant sixty
   * closures invoked per frame, each with its own scope and its own damp calls,
   * and R3F walking its subscriber list sixty times. Consolidating to ONE loop
   * over flat arrays is the single biggest per-frame saving in the scene, and
   * it costs nothing in readability — the work per part is identical.
   */
  const spread = useRef<Float32Array>(new Float32Array(CAR_PARTS.length));
  const glow = useRef<Float32Array>(new Float32Array(CAR_PARTS.length));
  const baseColors = useMemo(() => CAR_PARTS.map((p) => new Color(p.color)), []);

  // Per-part geometry for the generic box/cylinder fallbacks.
  const fallbacks = useMemo(
    () =>
      CAR_PARTS.map((part) => {
        const shared = geometries[part.geo];
        if (shared) return shared;
        const a = part.args ?? [];
        return part.geo === "cylinder"
          ? new CylinderGeometry(a[0], a[1], a[2], a[3] ?? 16)
          : new BoxGeometry(a[0], a[1], a[2]);
      }),
    [geometries],
  );

  useFrame((state, delta) => {
    // Clamp: a long frame (a tab regaining focus, a GC pause) otherwise makes
    // damp overshoot and the whole car snaps.
    const dt = Math.min(delta, 0.05);
    const open = openness.get();

    if (group.current) {
      group.current.rotation.y = MathUtils.damp(group.current.rotation.y, turn.get(), 5, dt);
      // A breath of vertical float, small enough to read as "live", not motion.
      group.current.position.y = -0.62 + Math.sin(state.clock.elapsedTime * 0.55) * 0.012;
    }

    for (let i = 0; i < CAR_PARTS.length; i++) {
      const part = CAR_PARTS[i];
      const mesh = meshes.current[i];
      if (!mesh) continue;

      const isShell = part.layer === "shell";
      const focused = !isShell && activeRegion !== null && activeRegion === part.region;

      // The system on screen separates by exactly as much as the scroll has
      // travelled through its own stretch of the track — so the movement IS the
      // scroll, not an animation the scroll happens to trigger.
      spread.current[i] = MathUtils.damp(spread.current[i], focused ? open : 0, 9, dt);
      glow.current[i] = MathUtils.damp(glow.current[i], focused ? 1 : 0, 6, dt);

      const s = spread.current[i];
      mesh.position.set(
        part.at[0] + part.blowsTo[0] * s,
        part.at[1] + part.blowsTo[1] * s,
        part.at[2] + part.blowsTo[2] * s,
      );

      const mat = materials.current[i];
      if (!mat) continue;

      if (isShell) {
        mat.opacity = MathUtils.damp(
          mat.opacity,
          activeRegion ? SHELL_OPACITY_OPEN : SHELL_OPACITY,
          5,
          dt,
        );
        continue;
      }

      // Scale the part's own colour rather than blending toward a light or a
      // dark. Blending is the wrong operation: three.js works in LINEAR space,
      // so lerping a near-black tyre 20% toward white does not tint it slightly,
      // it roughly triples its luminance and the wheel turns white. Multiplying
      // brightens every material by the same proportion and preserves its hue.
      const g = glow.current[i];
      const dim = activeRegion && !focused ? 1 - g : 0;
      const k = (1 + g * 0.5) * (1 - dim * 0.72);
      mat.color.copy(baseColors[i]).multiplyScalar(k);
    }
  });

  return (
    <group ref={group} position={[0, -0.62, 0]}>
      {CAR_PARTS.map((part, i) => {
        const isShell = part.layer === "shell";
        return (
          <mesh
            key={part.id}
            ref={(m) => {
              meshes.current[i] = m;
            }}
            // The callout overlay finds its anchor by name and projects this
            // mesh's world position every frame, so the label tracks the part
            // through the explode without any React work.
            name={part.anchor && part.region ? `anchor-${part.region}` : undefined}
            geometry={fallbacks[i]}
            position={part.at}
            rotation={part.rotation ?? [0, 0, 0]}
            scale={part.scale ?? 1}
            renderOrder={isShell ? 10 : 0}
          >
            {isShell ? (
              // Clearcoat only where there is paint. MeshPhysicalMaterial
              // compiles a heavier shader than standard, and it was on all sixty
              // parts for the sake of two.
              <meshPhysicalMaterial
                ref={(m) => {
                  materials.current[i] = m;
                }}
                color={part.color}
                metalness={part.metalness ?? 0.6}
                roughness={part.roughness ?? 0.4}
                clearcoat={part.clearcoat ?? 0}
                clearcoatRoughness={0.06}
                transparent
                opacity={SHELL_OPACITY}
                depthWrite={false}
                side={FrontSide}
                envMapIntensity={2.2}
              />
            ) : (
              <meshStandardMaterial
                ref={(m) => {
                  materials.current[i] = m;
                }}
                color={part.color}
                metalness={part.metalness ?? 0.6}
                roughness={part.roughness ?? 0.4}
                side={FrontSide}
                // Black by default: only lamps opt into a glow. An earlier
                // version defaulted every part to mint, which was invisible on
                // aluminium and turned the tyres bright green.
                emissive={part.emissive ?? "#000000"}
                emissiveIntensity={part.emissiveIntensity ?? 0}
                envMapIntensity={1.05}
              />
            )}
          </mesh>
        );
      })}
    </group>
  );
}

"use client";

import { useMemo, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import { MathUtils, Color, type Group, type Mesh, type MeshStandardMaterial } from "three";
import type { MotionValue } from "framer-motion";
import { CAR_PARTS, type CarPart } from "./carParts";
import { REGION_ANCHORS, SERVICE_GROUPS, type CarRegionId } from "@/data/services";
import { ServiceNames } from "./ServiceNames";

const HIGHLIGHT = new Color("#1B5E43");
/** Unfocused parts wash toward this, a shade off the paper ground. */
const WASH = new Color("#B0AA9B");

/** How far a part travels when its own region is the one being named. */
const FOCUSED_SPREAD = 1;
/** How far every other part travels, so the car opens up without hiding the focus. */
const AMBIENT_SPREAD = 0.42;

function Part({
  part,
  explode,
  activeRegion,
  children,
}: {
  part: CarPart;
  explode: MotionValue<number>;
  activeRegion: CarRegionId | null;
  /** Anchored label, rendered inside the mesh so it tracks the part. */
  children?: ReactNode;
}) {
  const mesh = useRef<Mesh>(null);
  const material = useRef<MeshStandardMaterial>(null);
  const baseColor = useMemo(() => new Color(part.color), [part.color]);

  // Damped per-part so a fast scroll flick doesn't snap parts across the screen.
  const spread = useRef(0);
  const glow = useRef(0);

  useFrame((_, delta) => {
    if (!mesh.current) return;

    const focused = activeRegion === part.region;
    const targetSpread = explode.get() * (focused ? FOCUSED_SPREAD : AMBIENT_SPREAD);

    spread.current = MathUtils.damp(spread.current, targetSpread, 6, delta);
    glow.current = MathUtils.damp(glow.current, focused ? 1 : 0, 5, delta);

    mesh.current.position.set(
      part.at[0] + part.blowsTo[0] * spread.current,
      part.at[1] + part.blowsTo[1] * spread.current,
      part.at[2] + part.blowsTo[2] * spread.current,
    );

    if (material.current) {
      // Unfocused parts recede by washing toward the paper, NOT by going
      // translucent: dropping opacity turned the whole car into ghost glass and
      // let the far wheels sort through the body. Everything stays solid.
      const dim = activeRegion && !focused ? 1 - glow.current : 0;
      material.current.color
        .lerpColors(baseColor, HIGHLIGHT, glow.current * 0.25)
        .lerp(WASH, dim * 0.28);
    }
  });

  const materialNode = (
    <meshStandardMaterial
      ref={material}
      color={part.color}
      metalness={part.metalness ?? 0.5}
      roughness={part.roughness ?? 0.5}
      transparent={part.opacity !== undefined}
      opacity={part.opacity ?? 1}
    />
  );

  if (part.kind === "rounded") {
    return (
      <RoundedBox
        ref={mesh}
        args={part.size}
        radius={part.radius ?? 0.06}
        smoothness={3}
        position={part.at}
        rotation={part.rotation ?? [0, 0, 0]}
        castShadow
        receiveShadow
      >
        {materialNode}
        {children}
      </RoundedBox>
    );
  }

  return (
    <mesh
      ref={mesh}
      position={part.at}
      rotation={part.rotation ?? [0, 0, 0]}
      castShadow
      receiveShadow
    >
      {part.kind === "box" ? (
        <boxGeometry args={part.size} />
      ) : (
        <cylinderGeometry args={[part.size[0], part.size[0], part.size[1], part.size[2]]} />
      )}
      {materialNode}
      {children}
    </mesh>
  );
}

/**
 * Service names for the focused region, set directly beside the part.
 *
 * No card, no panel, no prices — a rule, an index and a short list floating on
 * the page's own ground. A paper-coloured text-shadow keeps the names legible on
 * the frames where one crosses the car body.
 *
 * Nested inside the part's mesh, so drei projects it from the part's live world
 * position and it follows the explode with no per-frame React work. Pointer
 * events stay off: the page scroll is the only scroll here.
 *
 * Desktop only. A 240px label hung off a part that happens to sit near the edge
 * of a 375px viewport simply falls off it, so phones get the same typography as
 * a block at the foot of the stage instead (see ServiceExplorer).
 */
function PartLabel({ region }: { region: CarRegionId }) {
  const index = SERVICE_GROUPS.findIndex((g) => g.id === region);
  const side = REGION_ANCHORS[region].side;

  return (
    <Html center={false} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
      <div
        className="w-[15rem] select-none"
        style={{
          transform:
            side === "right"
              ? "translate(3rem, -50%)"
              : "translate(calc(-100% - 3rem), -50%)",
          textShadow:
            "0 0 10px #D4CDBB, 0 0 10px #D4CDBB, 0 0 3px #D4CDBB, 0 0 3px #D4CDBB",
        }}
      >
        <ServiceNames
          group={SERVICE_GROUPS[index]}
          index={index}
          total={SERVICE_GROUPS.length}
          align={side === "left" ? "right" : "left"}
        />
      </div>
    </Html>
  );
}

export function CarModel({
  explode,
  activeRegion,
  compact = false,
}: {
  explode: MotionValue<number>;
  activeRegion: CarRegionId | null;
  compact?: boolean;
}) {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const e = explode.get();

    // Assembled: a slow idle turn. Exploded: settle to a three-quarter view so the
    // separated parts stay legible instead of sweeping past the camera.
    const idle = state.clock.elapsedTime * 0.18;
    const target = MathUtils.lerp(idle, 0.62, Math.min(e * 1.4, 1));
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, target, 3, delta);
  });

  const anchorPartId = activeRegion ? REGION_ANCHORS[activeRegion].partId : null;

  return (
    <group ref={group} position={[0, -0.55, 0]}>
      {CAR_PARTS.map((part) => (
        <Part key={part.id} part={part} explode={explode} activeRegion={activeRegion}>
          {activeRegion && !compact && part.id === anchorPartId ? (
            <PartLabel region={activeRegion} />
          ) : null}
        </Part>
      ))}
    </group>
  );
}

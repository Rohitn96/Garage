"use client";

import { useMemo, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import { MathUtils, Color, type Group, type Mesh, type MeshStandardMaterial } from "three";
import type { MotionValue } from "framer-motion";
import { CAR_PARTS, type CarPart } from "./carParts";
import { REGION_ANCHORS, SERVICE_GROUPS, type CarRegionId } from "@/data/services";
import { Callout, Connector } from "./Callout";

const HIGHLIGHT = new Color("#FF6B2C");

/** How far a part travels when its own region is the one being priced. */
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
  /** Anchored callout, rendered inside the mesh so it tracks the part. */
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
      // Glow through emissive intensity mostly. Lerping the base colour hard
      // toward orange flattened dark parts (tyres especially) into solid discs —
      // the shading, and with it the shape, disappeared.
      material.current.emissiveIntensity = glow.current * 0.12;
      material.current.color.lerpColors(baseColor, HIGHLIGHT, glow.current * 0.18);
    }
  });

  const materialNode = (
    <meshStandardMaterial
      ref={material}
      color={part.color}
      emissive={HIGHLIGHT}
      emissiveIntensity={0}
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
 * The price callout for the focused region, anchored to that region's part.
 *
 * Nested inside the part's mesh, so drei projects it from the part's live world
 * position and it follows the explode with no per-frame React work. Pointer
 * events are off throughout: the page scroll is the only scroll here, and a
 * DOM layer over the canvas must never swallow it.
 */
function AnchoredCallout({ region }: { region: CarRegionId }) {
  const index = SERVICE_GROUPS.findIndex((g) => g.id === region);
  const group = SERVICE_GROUPS[index];
  const side = REGION_ANCHORS[region].side;

  return (
    <Html
      center={false}
      zIndexRange={[20, 0]}
      style={{ pointerEvents: "none" }}
      wrapperClass="revamp-callout"
    >
      <div
        className="relative"
        style={{
          // Offset the card off the anchor point by the connector's length,
          // on whichever side keeps it inside frame.
          transform:
            side === "right"
              ? "translate(3.5rem, -50%)"
              : "translate(calc(-100% - 3.5rem), -50%)",
        }}
      >
        <Connector orientation={side} />
        <Callout group={group} index={index} total={SERVICE_GROUPS.length} />
      </div>
    </Html>
  );
}

export function CarModel({
  explode,
  activeRegion,
}: {
  explode: MotionValue<number>;
  activeRegion: CarRegionId | null;
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
          {activeRegion && part.id === anchorPartId ? (
            <AnchoredCallout region={activeRegion} />
          ) : null}
        </Part>
      ))}
    </group>
  );
}

"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, RoundedBox } from "@react-three/drei";
import {
  MathUtils,
  Color,
  FrontSide,
  type Group,
  type Mesh,
  type MeshStandardMaterial,
} from "three";
import { CAR_PARTS, type CarPart } from "./carParts";
import type { CarRegionId } from "@/data/services";

/**
 * The selected system is NOT painted with the accent.
 *
 * Tinting toward `#35D68A` was tried and looks wrong for a reason worth writing
 * down: three.js lerps colour in LINEAR space, where the accent is an order of
 * magnitude brighter than a near-black graphite part, so even a 30% blend
 * resolves to vivid green and the battery pack rendered as a slab of neon
 * plastic. Selection is already carried by three stronger signals — the part
 * moves, everything else recedes, and the list entry opens — so the mechanicals
 * keep their true colour and the scene reads as a technical cutaway instead of
 * a toy. The accent stays where it means something: the interface.
 */
/** Focused parts lift slightly toward light, keeping their own hue. */
const LIFT = new Color("#DCE4E2");
/** Unselected mechanicals recede toward this rather than going translucent. */
const WASH = new Color("#14181A");

/* --- Shell -----------------------------------------------------------------
 * The bodywork is drawn as tinted glass with a lit edge, so the mechanicals
 * inside stay legible without the shell being taken off.
 *
 * Two things make this work and both are easy to get wrong:
 *
 *   depthWrite={false} — a transparent surface that writes depth occludes
 *   whatever is drawn after it, regardless of its own opacity. With depth
 *   writing on, the near side of the shell silently swallows half the car.
 *
 *   renderOrder — transparent surfaces composite in draw order, so the shell
 *   has to be drawn AFTER every opaque part. Without it the shell is blended
 *   against whatever happened to be behind it at the time, and parts flicker in
 *   and out as the car turns.
 *
 * FrontSide, not DoubleSide: with both faces drawn, the far wall of the shell
 * blends over the near one and the whole body turns milky.
 * -------------------------------------------------------------------------*/
const SHELL_OPACITY = 0.18;
/** With a system open, the shell steps further back so the parts read clearly. */
const SHELL_OPACITY_OPEN = 0.11;
const EDGE_COLOR = "#5A6C6A";
const EDGE_COLOR_OPEN = "#3C4846";

function Part({
  part,
  activeRegion,
  onSelect,
  onHover,
}: {
  part: CarPart;
  activeRegion: CarRegionId | null;
  onSelect: (region: CarRegionId) => void;
  onHover: (region: CarRegionId | null) => void;
}) {
  const mesh = useRef<Mesh>(null);
  const material = useRef<MeshStandardMaterial>(null);
  const baseColor = useMemo(() => new Color(part.color), [part.color]);

  // Damped per-part, so a fast click-through does not snap parts across screen.
  const spread = useRef(0);
  const glow = useRef(0);

  const isShell = part.layer === "shell";
  const baseEmissive = part.emissiveIntensity ?? 0;

  useFrame((_, delta) => {
    if (!mesh.current) return;

    const focused = !isShell && activeRegion === part.region;
    // Only the selected system separates. Everything else holds position, so
    // cause and effect stay obvious — one click, one thing moves.
    spread.current = MathUtils.damp(spread.current, focused ? 1 : 0, 5, delta);
    glow.current = MathUtils.damp(glow.current, focused ? 1 : 0, 5, delta);

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
        4,
        delta,
      );
      return;
    }

    // Unselected parts recede by washing toward the ground colour, NOT by going
    // translucent — dropping opacity turns the mechanicals into ghost glass and
    // lets far parts sort through near ones.
    const dim = activeRegion && !focused ? 1 - glow.current : 0;
    mat.color.lerpColors(baseColor, LIFT, glow.current * 0.16).lerp(WASH, dim * 0.6);

    if (part.emissive) {
      mat.emissiveIntensity = baseEmissive + glow.current * 0.05;
    } else {
      // A trace of self-lighting so a focused part does not sink into the floor.
      mat.emissiveIntensity = glow.current * 0.04;
    }
  });

  const interactive = !isShell && part.region !== null;
  const handlers = interactive
    ? {
        onClick: (event: { stopPropagation: () => void }) => {
          event.stopPropagation();
          onSelect(part.region as CarRegionId);
        },
        onPointerOver: (event: { stopPropagation: () => void }) => {
          event.stopPropagation();
          onHover(part.region as CarRegionId);
        },
        onPointerOut: () => onHover(null),
      }
    : {};

  const materialNode = (
    <meshStandardMaterial
      ref={material}
      color={part.color}
      metalness={isShell ? 0.2 : (part.metalness ?? 0.5)}
      roughness={isShell ? 0.08 : (part.roughness ?? 0.5)}
      transparent={isShell}
      opacity={isShell ? SHELL_OPACITY : 1}
      depthWrite={!isShell}
      side={FrontSide}
      emissive={part.emissive ?? "#35D68A"}
      emissiveIntensity={part.emissiveIntensity ?? 0}
    />
  );

  const edges = isShell ? (
    <Edges
      threshold={18}
      lineWidth={1}
      color={activeRegion ? EDGE_COLOR_OPEN : EDGE_COLOR}
      transparent
      opacity={0.85}
    />
  ) : null;

  const common = {
    ref: mesh as never,
    position: part.at,
    rotation: part.rotation ?? ([0, 0, 0] as const),
    // Opaque mechanicals cast and receive; the glass shell does neither, or it
    // would throw a shadow of a body panel across the parts it is meant to reveal.
    castShadow: !isShell,
    receiveShadow: !isShell,
    renderOrder: isShell ? 10 : 0,
    // The shell must not intercept clicks meant for the parts behind it.
    ...(isShell ? { raycast: () => null } : {}),
    ...handlers,
  };

  if (part.kind === "rounded") {
    return (
      <RoundedBox {...common} args={part.size} radius={part.radius ?? 0.06} smoothness={3}>
        {materialNode}
        {edges}
      </RoundedBox>
    );
  }

  return (
    <mesh {...common}>
      {part.kind === "box" ? (
        <boxGeometry args={part.size} />
      ) : (
        <cylinderGeometry args={[part.size[0], part.size[0], part.size[1], part.size[2]]} />
      )}
      {materialNode}
      {edges}
    </mesh>
  );
}

export function CarModel({
  activeRegion,
  onSelect,
  onHover,
}: {
  activeRegion: CarRegionId | null;
  onSelect: (region: CarRegionId) => void;
  onHover: (region: CarRegionId | null) => void;
}) {
  const group = useRef<Group>(null);
  const spin = useRef(0);

  useFrame((state, delta) => {
    if (!group.current) return;

    if (activeRegion) {
      // Settle to a three-quarter view, where a separated system is most legible.
      group.current.rotation.y = MathUtils.damp(group.current.rotation.y, 0.62, 3, delta);
      spin.current = group.current.rotation.y;
    } else {
      // Idle: a slow turn, picked up from wherever the settle left off so the
      // car never jumps when a system is closed.
      spin.current += delta * 0.16;
      group.current.rotation.y = MathUtils.damp(
        group.current.rotation.y,
        spin.current,
        3,
        delta,
      );
    }

    // A breath of vertical float. Small enough to read as "live", not as motion.
    group.current.position.y = -0.5 + Math.sin(state.clock.elapsedTime * 0.6) * 0.015;
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {CAR_PARTS.map((part) => (
        <Part
          key={part.id}
          part={part}
          activeRegion={activeRegion}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </group>
  );
}

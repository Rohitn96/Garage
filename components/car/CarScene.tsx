"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { MathUtils } from "three";
import { CarModel } from "./CarModel";
import type { CarRegionId } from "@/data/services";

/**
 * Frames the car, and eases back a little when a system opens up so the
 * separated parts stay inside the shot. Driven by selection, never by time.
 */
function Rig({ open, compact }: { open: boolean; compact: boolean }) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const t = open ? 1 : 0;
    const distance = compact
      ? MathUtils.lerp(7.6, 9.2, t)
      : MathUtils.lerp(6.9, 8.3, t);
    const height = MathUtils.lerp(1.9, 2.9, t);

    camera.position.x = MathUtils.damp(camera.position.x, distance * 0.66, 3, delta);
    camera.position.y = MathUtils.damp(camera.position.y, height, 3, delta);
    camera.position.z = MathUtils.damp(camera.position.z, distance * 0.75, 3, delta);
    camera.lookAt(0, compact ? 0.35 : 0.2, 0);
  });

  return null;
}

export function CarScene({
  activeRegion,
  onSelect,
  onHover,
  compact = false,
  running = true,
}: {
  activeRegion: CarRegionId | null;
  onSelect: (region: CarRegionId) => void;
  onHover: (region: CarRegionId | null) => void;
  compact?: boolean;
  /** False when the section is off screen — stops the render loop entirely. */
  running?: boolean;
}) {
  return (
    <Canvas
      // Phones render at 1x–1.5x: past that the extra pixels buy nothing on a
      // scene this simple and cost real battery.
      dpr={compact ? [1, 1.5] : [1, 2]}
      // No shadow maps. Forty meshes re-rendering a depth pass every frame paid
      // for a hard sun shadow nobody looked at; ContactShadows below grounds the
      // car for a fraction of the cost and reads better on a dark floor.
      shadows={false}
      // Rendering stops dead when the section scrolls out of view. On a page
      // this long that is most of the visit.
      frameloop={running ? "always" : "never"}
      camera={{ position: [4.6, 1.9, 5.2], fov: 42 }}
      // Transparent canvas: the PAGE is the scene's background, so the two can
      // never drift apart no matter what the page ground becomes.
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onPointerMissed={() => onHover(null)}
    >
      {/*
        A procedural environment, not a preset.

        drei's `preset="warehouse"` and friends fetch an HDR from a CDN at
        runtime, which is a third-party request on every visit and a blank car if
        it fails. These lightformers build the same job — a bright overhead
        strip and two side panels — into a 128px cube map, rendered once.

        It matters more than the lights do: every material here is metal, and
        metal with nothing to reflect renders as flat grey no matter how many
        lamps are pointed at it. The shell in particular only reads as glass
        because there is something for it to catch.
      */}
      <Environment resolution={128} frames={1}>
        <Lightformer
          form="rect"
          intensity={3.2}
          position={[0, 5, -1]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[10, 4, 1]}
          color="#FFFFFF"
        />
        <Lightformer
          form="rect"
          intensity={1.6}
          position={[-5, 1.5, 2]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[8, 3, 1]}
          color="#BFD6D2"
        />
        <Lightformer
          form="rect"
          intensity={1.1}
          position={[5, 1.5, -2]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[8, 3, 1]}
          color="#8FB6A4"
        />
        <Lightformer
          form="circle"
          intensity={2.0}
          position={[2, 2, 4]}
          scale={3}
          color="#FFF4E2"
        />
      </Environment>

      <ambientLight intensity={0.35} />
      {/* One key, for specular definition the environment alone will not give. */}
      <directionalLight position={[5, 8, 4]} intensity={1.5} />

      <Rig open={activeRegion !== null} compact={compact} />

      <CarModel activeRegion={activeRegion} onSelect={onSelect} onHover={onHover} />

      {/*
        Grounds the car without a floor plane. A lit surface tinted to the page
        colour still gets lit, so it rendered brighter than its own albedo and
        left a visible seam where the canvas met the page; this draws shadow and
        nothing else, so the page IS the ground at any lighting level.
      */}
      <ContactShadows
        position={[0, -0.52, 0]}
        opacity={0.55}
        scale={14}
        blur={2.4}
        far={2.2}
        resolution={compact ? 256 : 512}
        color="#000000"
      />
    </Canvas>
  );
}

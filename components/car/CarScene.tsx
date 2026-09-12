"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { ACESFilmicToneMapping, MathUtils } from "three";
import type { MotionValue } from "framer-motion";
import { CarModel } from "./CarModel";
import type { CarRegionId } from "@/data/services";

/**
 * Frames the car and eases back as a system opens up, so the separated parts
 * stay inside the shot. Driven by scroll, never by time.
 */
function Rig({
  openness,
  compact,
}: {
  openness: MotionValue<number>;
  compact: boolean;
}) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const t = openness.get();
    const distance = compact ? MathUtils.lerp(7.0, 8.2, t) : MathUtils.lerp(7.2, 8.5, t);
    const height = MathUtils.lerp(1.7, 2.7, t);

    camera.position.x = MathUtils.damp(camera.position.x, distance * 0.72, 3, delta);
    camera.position.y = MathUtils.damp(camera.position.y, height, 3, delta);
    camera.position.z = MathUtils.damp(camera.position.z, distance * 0.68, 3, delta);
    camera.lookAt(0, compact ? 0.2 : 0.16, 0);
  });

  return null;
}

export function CarScene({
  activeRegion,
  openness,
  turn,
  compact = false,
  running = true,
}: {
  activeRegion: CarRegionId | null;
  openness: MotionValue<number>;
  turn: MotionValue<number>;
  compact?: boolean;
  /** False when the section is off screen — stops the render loop entirely. */
  running?: boolean;
}) {
  return (
    <Canvas
      dpr={compact ? [1, 1.75] : [1, 2]}
      // No shadow maps: fifty meshes re-rendering a depth pass every frame paid
      // for a hard sun shadow nobody looked at. ContactShadows below grounds the
      // car for a fraction of the cost and reads better on a dark floor.
      shadows={false}
      // Rendering stops dead when the section scrolls out of view.
      frameloop={running ? "always" : "never"}
      camera={{ position: [6.1, 1.7, 5.8], fov: 34 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.25,
      }}
    >
      {/*
        A procedural studio, not a downloaded HDR.

        drei's `preset="warehouse"` and friends fetch an HDR from a CDN at
        runtime — a third-party request on every visit, and a black car if it
        fails. These lightformers build the same thing into a 256px cube map,
        rendered once.

        It matters more than the lights do. Car renders read as real almost
        entirely because of ONE cue: a long soft strip reflected down the flank.
        Bodywork is a mirror, so what sells it is not how brightly it is lit but
        what there is for it to reflect. The big overhead rect below IS the
        photograph; everything else is support.
      */}
      <Environment resolution={256} frames={1}>
        {/* The key: a long overhead softbox running the length of the car. */}
        <Lightformer
          form="rect"
          intensity={5}
          position={[0, 6, 1]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[14, 5, 1]}
          color="#FFFFFF"
        />
        {/* Second strip, offset, so the flank highlight has some shape to it. */}
        <Lightformer
          form="rect"
          intensity={2.2}
          position={[-3, 5, -3]}
          rotation={[Math.PI / 2, 0, 0.4]}
          scale={[8, 2.5, 1]}
          color="#DCE8F0"
        />
        {/* The flank light. Tall, near horizon level, on the camera side — this
            is what draws the long highlight down the side of the body, and it
            does more for realism than any amount of overhead intensity. */}
        <Lightformer
          form="rect"
          intensity={4.2}
          position={[-7, 1.9, 4]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[12, 5.5, 1]}
          color="#C6DCE8"
        />
        {/* Warm kicker on the far side, so the two flanks are not identical. */}
        <Lightformer
          form="rect"
          intensity={1.2}
          position={[6, 1.8, -3]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[9, 3, 1]}
          color="#FFE9CC"
        />
        {/* Rim light behind, to separate the tail from a black ground. */}
        <Lightformer
          form="circle"
          intensity={2.6}
          position={[-5, 2.2, -5]}
          scale={2.5}
          color="#CFE4F2"
        />
      </Environment>

      {/* Enough ambient to keep the shadow side from going pure black. */}
      <ambientLight intensity={0.22} />
      {/* One key, for the specular definition an environment alone will not give. */}
      <directionalLight position={[5, 7, 4]} intensity={1.1} />

      <Rig openness={openness} compact={compact} />
      <CarModel activeRegion={activeRegion} openness={openness} turn={turn} />

      {/*
        Grounds the car without a floor plane. A lit surface tinted to the page
        colour still gets lit, so it renders brighter than its own albedo and
        leaves a visible seam where the canvas meets the page; this draws shadow
        and nothing else, so the page IS the ground at any lighting level.
      */}
      <ContactShadows
        position={[0, -0.63, 0]}
        opacity={0.7}
        scale={13}
        blur={2.1}
        far={2}
        resolution={compact ? 256 : 512}
        color="#000000"
      />
    </Canvas>
  );
}

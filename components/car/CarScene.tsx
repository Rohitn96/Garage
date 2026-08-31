"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MathUtils } from "three";
import type { MotionValue } from "framer-motion";
import { CarModel } from "./CarModel";
import type { CarRegionId } from "@/data/services";

const PAPER = "#F4F2EC";

/**
 * Pulls the camera back and lifts it as the car comes apart, so the exploded
 * spread stays inside frame. Driven by scroll progress, never by time.
 *
 * `compact` frames tighter and higher for a portrait viewport, where the car
 * has width to spare but very little height.
 */
function ScrollCamera({
  explode,
  compact,
}: {
  explode: MotionValue<number>;
  compact: boolean;
}) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const e = explode.get();
    const distance = compact
      ? MathUtils.lerp(14.5, 19.5, e)
      : MathUtils.lerp(8.4, 12.6, e);
    const height = MathUtils.lerp(2.2, 4.4, e);

    camera.position.x = MathUtils.damp(camera.position.x, distance * 0.62, 3, delta);
    camera.position.y = MathUtils.damp(camera.position.y, height, 3, delta);
    camera.position.z = MathUtils.damp(camera.position.z, distance * 0.78, 3, delta);
    camera.lookAt(0, compact ? 0.95 : 0.1, 0);
  });

  return null;
}

export function CarScene({
  explode,
  activeRegion,
  compact = false,
}: {
  explode: MotionValue<number>;
  activeRegion: CarRegionId | null;
  compact?: boolean;
}) {
  return (
    <Canvas
      // Phones render at 1x–1.5x: past that the extra pixels buy nothing on a
      // scene this simple and cost real battery.
      dpr={compact ? [1, 1.5] : [1, 2]}
      shadows
      camera={{ position: [6, 2.2, 7.5], fov: 40 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={[PAPER]} />
      <fog attach="fog" args={[PAPER, 22, 52]} />

      {/* Studio lighting for a pale ground: a broad soft key, a cool sky fill,
          and a low bounce standing in for light coming back off the floor. */}
      <ambientLight intensity={1.15} />
      <hemisphereLight args={["#FFFFFF", "#C8C4B6", 1.5]} />
      <directionalLight
        position={[6, 10, 6]}
        intensity={2.6}
        castShadow
        shadow-mapSize={compact ? [512, 512] : [1024, 1024]}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-8, 5, -4]} intensity={0.85} color="#DCE6E4" />
      <pointLight position={[-2, 1.2, 5]} intensity={12} color="#FFF6E6" distance={16} />

      <ScrollCamera explode={explode} compact={compact} />
      <CarModel explode={explode} activeRegion={activeRegion} compact={compact} />

      {/* Seamless studio floor — same value as the page, so the horizon is only
          ever implied by the shadow the car casts on it. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.56, 0]} receiveShadow>
        <circleGeometry args={[220, 64]} />
        <meshStandardMaterial color={PAPER} metalness={0} roughness={1} />
      </mesh>
    </Canvas>
  );
}

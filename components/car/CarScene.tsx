"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MathUtils } from "three";
import type { MotionValue } from "framer-motion";
import { CarModel } from "./CarModel";
import type { CarRegionId } from "@/data/services";

/**
 * Pulls the camera back and lifts it as the car comes apart, so the exploded
 * spread stays inside frame. Driven by scroll progress, never by time.
 */
function ScrollCamera({ explode }: { explode: MotionValue<number> }) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const e = explode.get();
    // Far enough back that a fully exploded car still clears the frame edges.
    const distance = MathUtils.lerp(9.6, 14.2, e);
    const height = MathUtils.lerp(2.2, 4.4, e);

    camera.position.x = MathUtils.damp(camera.position.x, distance * 0.62, 3, delta);
    camera.position.y = MathUtils.damp(camera.position.y, height, 3, delta);
    camera.position.z = MathUtils.damp(camera.position.z, distance * 0.78, 3, delta);
    camera.lookAt(0, 0.1, 0);
  });

  return null;
}

export function CarScene({
  explode,
  activeRegion,
}: {
  explode: MotionValue<number>;
  activeRegion: CarRegionId | null;
}) {
  return (
    <Canvas
      // Capped DPR: past 2x the extra pixels buy nothing on a scene this simple.
      dpr={[1, 2]}
      shadows
      camera={{ position: [4.6, 1.6, 5.8], fov: 42 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#0A0B0D"]} />
      <fog attach="fog" args={["#0A0B0D", 16, 44]} />

      {/* Workshop lighting: bright key overhead, cool fill opposite, warm rim.
          A dark palette on a dark ground needs far more light than it looks. */}
      <ambientLight intensity={0.95} />
      <hemisphereLight args={["#AFC3DA", "#14171C", 1.1]} />
      <directionalLight
        position={[7, 11, 6]}
        intensity={2.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-8, 5, -6]} intensity={1.1} color="#8FB4FF" />
      <pointLight position={[-3, 2.4, 5]} intensity={20} color="#FF8A55" distance={18} />

      <ScrollCamera explode={explode} />
      <CarModel explode={explode} activeRegion={activeRegion} />

      {/* Shop floor — catches the shadow so the car isn't floating in black. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.56, 0]} receiveShadow>
        <circleGeometry args={[220, 64]} />
        <meshStandardMaterial color="#15181D" metalness={0.2} roughness={0.95} />
      </mesh>
    </Canvas>
  );
}

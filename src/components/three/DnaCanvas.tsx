"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BrandLights, DnaHelix } from "./primitives";
import type { SceneProps } from "./LazyScene";

function Tilt({ children }: { children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null);

  useFrame((state, dt) => {
    if (!g.current) return;
    g.current.rotation.z = THREE.MathUtils.damp(
      g.current.rotation.z,
      state.pointer.x * 0.18,
      2.5,
      dt,
    );
    g.current.rotation.x = THREE.MathUtils.damp(
      g.current.rotation.x,
      0.12 + state.pointer.y * 0.14,
      2.5,
      dt,
    );
  });

  return <group ref={g}>{children}</group>;
}

export default function DnaCanvas({ frozen }: SceneProps) {
  return (
    <Canvas
      frameloop={frozen ? "demand" : "always"}
      dpr={[1, 1.7]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 8], fov: 40 }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <BrandLights intensity={0.85} />
        <Tilt>
          <DnaHelix turns={3.4} perTurn={18} radius={1.15} height={9} speed={0.34} />
        </Tilt>
      </Suspense>
    </Canvas>
  );
}

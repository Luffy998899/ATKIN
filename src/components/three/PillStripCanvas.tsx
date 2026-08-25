"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { BrandLights, Pill } from "./primitives";
import type { SceneProps } from "./LazyScene";

const ROW = [
  { top: "#1272cd", bottom: "#2fa84f" },
  { top: "#8cc63e", bottom: "#04173f" },
  { top: "#6fd0f4", bottom: "#1272cd" },
  { top: "#2fa84f", bottom: "#eaf6ff" },
  { top: "#29a9e1", bottom: "#0d5a33" },
];

/**
 * Spaces the capsules across whatever frame it is given, so the row fills a
 * short wide band as convincingly as a tall panel.
 */
function Strip() {
  const g = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Lay the row across ~84% of the visible width, and size each capsule to the
  // gap between them so a wide band never looks sparse.
  const step = (viewport.width * 0.84) / (ROW.length - 1);
  const radius = THREE.MathUtils.clamp(step * 0.22, 0.22, 0.55);

  useFrame((state, dt) => {
    if (!g.current) return;
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, state.pointer.x * 0.4, 2.4, dt);
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, -state.pointer.y * 0.25, 2.4, dt);
  });

  return (
    <group ref={g}>
      {ROW.map((p, i) => (
        <Float key={i} speed={1.2 + i * 0.22} rotationIntensity={0.9} floatIntensity={1.2}>
          <Pill
            position={[
              (i - (ROW.length - 1) / 2) * step,
              Math.sin(i * 1.7) * radius * 0.9,
              0,
            ]}
            rotation={[0.5, i * 0.6, 0.9 + i * 0.3]}
            topColor={p.top}
            bottomColor={p.bottom}
            radius={radius}
            length={radius * 1.75}
          />
        </Float>
      ))}
    </group>
  );
}

export default function PillStripCanvas({ frozen }: SceneProps) {
  return (
    <Canvas
      frameloop={frozen ? "demand" : "always"}
      dpr={[1, 1.7]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <BrandLights />
        <Strip />
      </Suspense>
    </Canvas>
  );
}

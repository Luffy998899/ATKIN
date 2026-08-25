"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { BrandLights, Molecule, ParticleField, Pill } from "./primitives";
import type { SceneProps } from "./LazyScene";

/**
 * Whole rig eases toward the pointer and drifts down as the page scrolls.
 * On wide screens it also slides right so the headline keeps a clear column;
 * on narrow ones it shrinks and sits behind the copy instead of on top of it.
 */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const scroll = useRef(0);
  const { viewport, size } = useThree();

  // The scene now lives inside its own framed panel, so it stays centred.
  const baseScale = size.width < 520 ? 0.62 : size.width < 900 ? 0.78 : 0.92;
  const baseX = 0;
  const baseY = 0;

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;

    scroll.current = THREE.MathUtils.damp(
      scroll.current,
      typeof window !== "undefined" ? window.scrollY / Math.max(1, window.innerHeight) : 0,
      3,
      dt,
    );

    const px = (state.pointer.x * viewport.width) / 34;
    const py = (state.pointer.y * viewport.height) / 34;

    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, px * 0.35, 3.4, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -py * 0.3, 3.4, dt);
    g.position.x = THREE.MathUtils.damp(g.position.x, baseX + px * 0.4, 3, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, baseY + scroll.current * 2.4, 3, dt);

    const s = THREE.MathUtils.damp(g.scale.x, baseScale, 4, dt);
    g.scale.setScalar(s);
  });

  return (
    <group ref={group} scale={baseScale}>
      {children}
    </group>
  );
}

/** Slim ring that spins around the molecule like an orbit path. */
function OrbitRing({
  radius = 2.6,
  tilt = [1.15, 0.2, 0.4] as [number, number, number],
  color = "#6fd0f4",
  speed = 0.18,
  opacity = 0.35,
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * speed;
  });

  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.012, 12, 128]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <BrandLights />
      <ParticleField count={620} spread={18} />

      <Rig>
        <Float speed={1.6} rotationIntensity={0.55} floatIntensity={1.1}>
          <Molecule scale={1.05} position={[0, 0.1, 0]} />
        </Float>

        <OrbitRing radius={2.55} tilt={[1.15, 0.2, 0]} color="#6fd0f4" speed={0.2} />
        <OrbitRing radius={3.15} tilt={[1.5, -0.4, 0.6]} color="#8cc63e" speed={-0.14} opacity={0.28} />

        <Float speed={2.1} rotationIntensity={1.4} floatIntensity={1.8}>
          <Pill position={[-3.1, 1.2, -0.6]} rotation={[0.4, 0.2, 0.9]} />
        </Float>
        <Float speed={1.5} rotationIntensity={1.1} floatIntensity={1.4}>
          <Pill
            position={[3.2, -1.1, -0.4]}
            rotation={[-0.3, 0.6, -0.7]}
            topColor="#8cc63e"
            bottomColor="#04173f"
            radius={0.3}
          />
        </Float>
        <Float speed={1.9} rotationIntensity={0.9} floatIntensity={2}>
          <Pill
            position={[2.5, 1.9, -1.8]}
            rotation={[0.9, -0.3, 0.35]}
            topColor="#6fd0f4"
            bottomColor="#1272cd"
            radius={0.26}
            length={0.5}
          />
        </Float>
        <Float speed={1.3} rotationIntensity={1.3} floatIntensity={1.6}>
          <Pill
            position={[-2.6, -1.9, -1.2]}
            rotation={[-0.7, 0.4, 1.2]}
            topColor="#2fa84f"
            bottomColor="#eaf6ff"
            radius={0.28}
          />
        </Float>

        {/* floating micro-spheres for depth */}
        {[
          [-1.8, 2.4, 1.2, "#29a9e1"],
          [1.9, -2.5, 1.1, "#8cc63e"],
          [-3.6, -0.6, 0.8, "#2fa84f"],
          [3.7, 0.9, 0.9, "#6fd0f4"],
        ].map(([x, y, z, c], i) => (
          <Float key={i} speed={1 + i * 0.3} floatIntensity={2.2}>
            <mesh position={[x as number, y as number, z as number]}>
              <sphereGeometry args={[0.09, 20, 20]} />
              <meshBasicMaterial color={c as string} transparent opacity={0.85} />
            </mesh>
          </Float>
        ))}
      </Rig>
    </>
  );
}

export default function HeroCanvas({ frozen }: SceneProps) {
  return (
    <Canvas
      frameloop={frozen ? "demand" : "always"}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 8.5], fov: 42 }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}

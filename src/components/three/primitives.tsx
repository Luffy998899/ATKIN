"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ------------------------------------------------------------------ *
 * Capsule / pill — two domed halves so it reads as a real tablet shell
 * ------------------------------------------------------------------ */
export function Pill({
  topColor = "#1272cd",
  bottomColor = "#2fa84f",
  radius = 0.36,
  length = 0.58,
  glossy = true,
  ...props
}: {
  topColor?: string;
  bottomColor?: string;
  radius?: number;
  length?: number;
  glossy?: boolean;
} & React.ComponentProps<"group">) {
  const half = length / 2;

  const mat = (color: string) =>
    glossy ? (
      <meshPhysicalMaterial
        color={color}
        roughness={0.16}
        metalness={0.12}
        clearcoat={1}
        clearcoatRoughness={0.08}
        sheen={0.6}
        sheenColor={color}
        emissive={color}
        emissiveIntensity={0.14}
      />
    ) : (
      <meshStandardMaterial color={color} roughness={0.45} metalness={0.05} />
    );

  return (
    <group {...props}>
      {/* upper half */}
      <mesh position={[0, half / 2, 0]} castShadow>
        <cylinderGeometry args={[radius, radius, half, 40, 1, true]} />
        {mat(topColor)}
      </mesh>
      <mesh position={[0, half, 0]} castShadow>
        <sphereGeometry args={[radius, 40, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        {mat(topColor)}
      </mesh>

      {/* lower half */}
      <mesh position={[0, -half / 2, 0]} castShadow>
        <cylinderGeometry args={[radius * 0.985, radius * 0.985, half, 40, 1, true]} />
        {mat(bottomColor)}
      </mesh>
      <mesh position={[0, -half, 0]} castShadow>
        <sphereGeometry
          args={[radius * 0.985, 40, 24, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]}
        />
        {mat(bottomColor)}
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * Molecule — a nucleus with bonded satellites, slowly tumbling
 * ------------------------------------------------------------------ */
type Node = { pos: [number, number, number]; color: string; size: number };

export function Molecule({
  scale = 1,
  speed = 0.22,
  ...props
}: { scale?: number; speed?: number } & React.ComponentProps<"group">) {
  const group = useRef<THREE.Group>(null);

  const nodes = useMemo<Node[]>(() => {
    const palette = ["#29a9e1", "#2fa84f", "#8cc63e", "#1272cd", "#6fd0f4", "#1f8f4a"];
    const count = 6;
    const out: Node[] = [];
    // fibonacci sphere so the satellites never clump
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const d = 1.5;
      out.push({
        pos: [Math.cos(theta) * r * d, y * d, Math.sin(theta) * r * d],
        color: palette[i % palette.length],
        size: 0.2 + (i % 3) * 0.05,
      });
    }
    return out;
  }, []);

  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * speed;
    group.current.rotation.x += dt * speed * 0.35;
  });

  return (
    <group ref={group} scale={scale} {...props}>
      {/* nucleus */}
      <mesh>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshPhysicalMaterial
          color="#0e4fb0"
          roughness={0.18}
          metalness={0.35}
          clearcoat={1}
          emissive="#1272cd"
          emissiveIntensity={0.35}
          flatShading
        />
      </mesh>

      {nodes.map((n, i) => (
        <group key={i}>
          <mesh position={n.pos}>
            <sphereGeometry args={[n.size, 28, 28]} />
            <meshPhysicalMaterial
              color={n.color}
              roughness={0.12}
              metalness={0.2}
              clearcoat={1}
              emissive={n.color}
              emissiveIntensity={0.5}
            />
          </mesh>
          <Bond to={n.pos} color={n.color} />
        </group>
      ))}
    </group>
  );
}

function Bond({ to, color }: { to: [number, number, number]; color: string }) {
  const { position, quaternion, length } = useMemo(() => {
    const v = new THREE.Vector3(...to);
    const len = v.length();
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      v.clone().normalize(),
    );
    return { position: v.clone().multiplyScalar(0.5), quaternion: q, length: len };
  }, [to]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[0.028, 0.028, length, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.42} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ *
 * DNA double helix — two phosphate strands with rungs between them
 * ------------------------------------------------------------------ */
export function DnaHelix({
  turns = 3,
  perTurn = 16,
  radius = 1,
  height = 7,
  speed = 0.3,
  ...props
}: {
  turns?: number;
  perTurn?: number;
  radius?: number;
  height?: number;
  speed?: number;
} & React.ComponentProps<"group">) {
  const group = useRef<THREE.Group>(null);
  const total = turns * perTurn;

  const rows = useMemo(() => {
    return Array.from({ length: total }, (_, i) => {
      const t = i / total;
      const angle = t * Math.PI * 2 * turns;
      const y = (t - 0.5) * height;
      return {
        a: [Math.cos(angle) * radius, y, Math.sin(angle) * radius] as [number, number, number],
        b: [-Math.cos(angle) * radius, y, -Math.sin(angle) * radius] as [number, number, number],
        angle,
        t,
      };
    });
  }, [total, turns, radius, height]);

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * speed;
  });

  return (
    <group ref={group} {...props}>
      {rows.map((r, i) => (
        <group key={i}>
          <mesh position={r.a}>
            <sphereGeometry args={[0.115, 18, 18]} />
            <meshStandardMaterial
              color="#29a9e1"
              emissive="#29a9e1"
              emissiveIntensity={0.7}
              roughness={0.25}
            />
          </mesh>
          <mesh position={r.b}>
            <sphereGeometry args={[0.115, 18, 18]} />
            <meshStandardMaterial
              color="#2fa84f"
              emissive="#8cc63e"
              emissiveIntensity={0.6}
              roughness={0.25}
            />
          </mesh>
          {i % 2 === 0 && (
            <mesh position={[0, r.a[1], 0]} rotation={[0, -r.angle, Math.PI / 2]}>
              <cylinderGeometry args={[0.022, 0.022, radius * 2, 8]} />
              <meshBasicMaterial color="#6fd0f4" transparent opacity={0.3} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ *
 * Drifting particle field
 * ------------------------------------------------------------------ */
export function ParticleField({
  count = 700,
  spread = 16,
  size = 0.035,
  seed = 1337,
}: {
  count?: number;
  spread?: number;
  size?: number;
  seed?: number;
}) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    // Seeded so the field is identical on every render and on the server.
    const rand = mulberry32(seed);

    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c = new THREE.Color();

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rand() - 0.5) * spread;
      pos[i * 3 + 1] = (rand() - 0.5) * spread;
      pos[i * 3 + 2] = (rand() - 0.5) * spread;

      c.setHSL(0.33 + rand() * 0.22, 0.8, 0.55 + rand() * 0.2);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, [count, spread, seed]);

  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.018;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.09) * 0.06;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Tiny deterministic PRNG — keeps the particle field stable across renders. */
function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------ *
 * Shared three-point rig tuned to the brand palette
 * ------------------------------------------------------------------ */
export function BrandLights({ intensity = 1 }: { intensity?: number }) {
  return (
    <>
      <ambientLight intensity={0.55 * intensity} />
      <directionalLight position={[5, 6, 5]} intensity={1.5 * intensity} color="#ffffff" />
      <pointLight position={[-6, 2, 4]} intensity={38 * intensity} color="#29a9e1" distance={22} />
      <pointLight position={[6, -3, 3]} intensity={34 * intensity} color="#2fa84f" distance={22} />
      <pointLight position={[0, 5, -5]} intensity={26 * intensity} color="#8cc63e" distance={24} />
    </>
  );
}

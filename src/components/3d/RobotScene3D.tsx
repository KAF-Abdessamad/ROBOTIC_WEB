"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Sphere,
  Torus,
  Box,
  MeshDistortMaterial,
  Float,
  Stars,
  Environment,
  Ring,
} from "@react-three/drei";
import * as THREE from "three";

// ── Animated metallic robot-like object ──────────────────────────────────────
function RobotCore({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const [mx, my] = mouse.current;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.18 + mx * 0.35;
      groupRef.current.rotation.x = Math.sin(t * 0.12) * 0.15 + my * 0.25;
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.9;
      innerRef.current.rotation.z = t * 0.4;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5;
      ring1Ref.current.rotation.y = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.6;
      ring2Ref.current.rotation.x = t * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.7;
      ring3Ref.current.rotation.z = t * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central glowing core sphere */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Sphere args={[0.9, 64, 64]} ref={innerRef}>
          <MeshDistortMaterial
            color="#0ea5e9"
            emissive="#0369a1"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
            distort={0.35}
            speed={2}
          />
        </Sphere>
      </Float>

      {/* Outer metallic shell with gaps */}
      <Sphere args={[1.18, 32, 32]}>
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.95}
          roughness={0.05}
          transparent
          opacity={0.45}
          envMapIntensity={2}
          wireframe={false}
        />
      </Sphere>

      {/* Orbit ring 1 - cyan */}
      <Torus ref={ring1Ref} args={[1.65, 0.025, 16, 100]}>
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#06b6d4"
          emissiveIntensity={1.5}
          metalness={1}
          roughness={0}
        />
      </Torus>

      {/* Orbit ring 2 - blue */}
      <Torus ref={ring2Ref} args={[1.95, 0.018, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#2563eb"
          emissiveIntensity={1.2}
          metalness={1}
          roughness={0}
        />
      </Torus>

      {/* Orbit ring 3 - violet accent */}
      <Torus ref={ring3Ref} args={[2.2, 0.012, 16, 100]} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <meshStandardMaterial
          color="#818cf8"
          emissive="#6366f1"
          emissiveIntensity={0.9}
          metalness={1}
          roughness={0}
        />
      </Torus>

      {/* Floating mechanical cubes */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const r = 2.5;
        return (
          <FloatingCube
            key={i}
            position={[Math.cos(rad) * r, Math.sin(rad * 0.7) * 0.4, Math.sin(rad) * r]}
            speed={0.8 + i * 0.1}
            scale={0.08 + (i % 3) * 0.04}
          />
        );
      })}
    </group>
  );
}

function FloatingCube({ position, speed, scale }: {
  position: [number, number, number];
  speed: number;
  scale: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.x = t * speed;
      ref.current.rotation.y = t * speed * 1.3;
      ref.current.position.y = position[1] + Math.sin(t * speed + position[0]) * 0.2;
    }
  });

  return (
    <Box ref={ref} args={[scale, scale, scale]} position={position}>
      <meshStandardMaterial
        color="#38bdf8"
        emissive="#0284c7"
        emissiveIntensity={0.8}
        metalness={0.9}
        roughness={0.1}
      />
    </Box>
  );
}

// ── Particle field ────────────────────────────────────────────────────────────
function Particles({ count = 120 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#38bdf8" size={0.045} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// ── Main scene ────────────────────────────────────────────────────────────────
function Scene({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={3} color="#38bdf8" />
      <pointLight position={[-5, -3, -5]} intensity={2} color="#6366f1" />
      <pointLight position={[0, 8, 0]} intensity={1.5} color="#0ea5e9" />
      <Stars radius={60} depth={50} count={3000} factor={2.5} saturation={0.2} fade speed={0.4} />
      <Particles count={100} />
      <RobotCore mouse={mouse} />
      <Environment preset="city" />
    </>
  );
}

// ── Exported wrapper ──────────────────────────────────────────────────────────
export default function RobotScene3D({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <Scene mouse={mouse} />
    </Canvas>
  );
}

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * HeroCenterpiece — A custom procedural 3D model combining a morphing
 * torus knot, orbiting rings, and energy core. This is the main
 * centerpiece that greets the visitor — equivalent to a Blender-designed
 * hero asset, built entirely in code for zero loading overhead.
 */

function EnergyCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.5;
      coreRef.current.rotation.y = t * 0.7;
      const pulse = 0.85 + Math.sin(t * 2) * 0.15;
      coreRef.current.scale.setScalar(pulse);
    }
    if (glowRef.current) {
      const glow = 0.6 + Math.sin(t * 1.5) * 0.4;
      (glowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = glow;
      glowRef.current.rotation.z = -t * 0.3;
    }
  });

  return (
    <>
      {/* Inner geometric core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.4, 1]} />
        <meshStandardMaterial
          args={[{
            color: '#ffffff',
            emissive: '#9b87f5',
            emissiveIntensity: 2,
            metalness: 1,
            roughness: 0,
            transparent: true,
            opacity: 0.9,
          }]}
        />
      </mesh>

      {/* Outer glow sphere */}
      <mesh ref={glowRef} scale={1.2}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          args={[{
            color: '#6b46c1',
            emissive: '#D946EF',
            emissiveIntensity: 0.8,
            metalness: 0.5,
            roughness: 0.5,
            transparent: true,
            opacity: 0.15,
            side: THREE.BackSide,
          }]}
        />
      </mesh>
    </>
  );
}

function OrbitRing({ radius, speed, tilt, color }: {
  radius: number;
  speed: number;
  tilt: [number, number, number];
  color: string;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z += speed;
  });

  return (
    <mesh ref={ringRef} rotation={tilt}>
      <torusGeometry args={[radius, 0.012, 8, 100]} />
      <meshStandardMaterial
        args={[{
          color,
          emissive: color,
          emissiveIntensity: 1.5,
          transparent: true,
          opacity: 0.6,
          metalness: 0.8,
          roughness: 0.2,
        }]}
      />
    </mesh>
  );
}

function OrbitDot({ radius, speed, tilt, color }: {
  radius: number;
  speed: number;
  tilt: [number, number, number];
  color: string;
}) {
  const dotRef = useRef<THREE.Mesh>(null);
  const angle = useRef(Math.random() * Math.PI * 2);

  useFrame(() => {
    if (!dotRef.current) return;
    angle.current += speed;
    dotRef.current.position.x = Math.cos(angle.current) * radius;
    dotRef.current.position.y = Math.sin(angle.current) * radius;
  });

  return (
    <group rotation={tilt}>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          args={[{
            color: '#ffffff',
            emissive: color,
            emissiveIntensity: 3,
            metalness: 1,
            roughness: 0,
          }]}
        />
      </mesh>
    </group>
  );
}

export default function HeroCenterpiece() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.08;
  });

  const rings = useMemo(() => [
    { radius: 1.0, speed: 0.008, tilt: [0.3, 0.5, 0] as [number, number, number], color: '#9b87f5' },
    { radius: 1.3, speed: -0.006, tilt: [1.2, 0.3, 0.4] as [number, number, number], color: '#0EA5E9' },
    { radius: 1.6, speed: 0.004, tilt: [0.8, 1.1, 0.2] as [number, number, number], color: '#D946EF' },
  ], []);

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3} position={[4.5, -0.8, -4]}>
      <group ref={groupRef}>
        <EnergyCore />

        {/* Orbiting rings */}
        {rings.map((ring, i) => (
          <OrbitRing key={`ring-${i}`} {...ring} />
        ))}

        {/* Orbiting energy dots */}
        {rings.map((ring, i) => (
          <OrbitDot key={`dot-${i}`} {...ring} speed={ring.speed * 3} />
        ))}

        {/* Outer wireframe torus knot shell */}
        <mesh rotation={[0.5, 0, 0]}>
          <torusKnotGeometry args={[1.8, 0.06, 128, 8, 2, 3]} />
          <meshStandardMaterial
            args={[{
              color: '#9b87f5',
              emissive: '#6E59A5',
              emissiveIntensity: 0.4,
              wireframe: true,
              transparent: true,
              opacity: 0.2,
              metalness: 0.9,
              roughness: 0.1,
            }]}
          />
        </mesh>
      </group>
    </Float>
  );
}

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * FloatingCrystals — Procedurally generated crystal-like formations
 * that float and slowly rotate with emissive glow. These serve as
 * custom 3D "models" built programmatically (equivalent to Blender exports).
 */

function Crystal({ position, scale, color, emissive, speed }: {
  position: [number, number, number];
  scale: number;
  color: string;
  emissive: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y += speed;
    meshRef.current.rotation.z = Math.sin(t * speed * 10) * 0.15;
    meshRef.current.position.y = initialY + Math.sin(t * 0.5 + position[0]) * 0.4;
  });

  // Build a crystal from two opposing cones (double-terminated)
  return (
    <group ref={meshRef} position={position}>
      {/* Upper crystal spike */}
      <mesh scale={[scale, scale * 2.2, scale]} position={[0, scale * 0.5, 0]}>
        <coneGeometry args={[scale * 0.4, scale * 1.8, 6]} />
        <meshStandardMaterial
          args={[{
            color,
            emissive,
            emissiveIntensity: 0.6,
            metalness: 0.9,
            roughness: 0.1,
            transparent: true,
            opacity: 0.75,
          }]}
        />
      </mesh>
      {/* Lower crystal spike (inverted) */}
      <mesh scale={[scale, scale * 2.2, scale]} position={[0, -scale * 0.5, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[scale * 0.4, scale * 1.8, 6]} />
        <meshStandardMaterial
          args={[{
            color,
            emissive,
            emissiveIntensity: 0.6,
            metalness: 0.9,
            roughness: 0.1,
            transparent: true,
            opacity: 0.75,
          }]}
        />
      </mesh>
      {/* Central faceted gem */}
      <mesh>
        <octahedronGeometry args={[scale * 0.45, 0]} />
        <meshStandardMaterial
          args={[{
            color: '#ffffff',
            emissive,
            emissiveIntensity: 1.2,
            metalness: 1,
            roughness: 0,
            transparent: true,
            opacity: 0.3,
          }]}
        />
      </mesh>
    </group>
  );
}

export default function FloatingCrystals() {
  const crystalsData = useMemo(() => [
    { position: [-8, 2, -10] as [number, number, number], scale: 0.35, color: '#9b87f5', emissive: '#6b46c1', speed: 0.004 },
    { position: [8, -1, -12] as [number, number, number], scale: 0.28, color: '#0EA5E9', emissive: '#0284C7', speed: 0.003 },
    { position: [-5, -4, -14] as [number, number, number], scale: 0.42, color: '#D946EF', emissive: '#A21CAF', speed: 0.005 },
    { position: [10, 3, -16] as [number, number, number], scale: 0.3, color: '#9b87f5', emissive: '#7C3AED', speed: 0.002 },
    { position: [-10, 0, -13] as [number, number, number], scale: 0.2, color: '#22D3EE', emissive: '#06B6D4', speed: 0.006 },
    { position: [6, 5, -18] as [number, number, number], scale: 0.38, color: '#A78BFA', emissive: '#8B5CF6', speed: 0.003 },
    { position: [-7, -3, -20] as [number, number, number], scale: 0.25, color: '#0EA5E9', emissive: '#0369A1', speed: 0.004 },
    { position: [12, -4, -15] as [number, number, number], scale: 0.32, color: '#D946EF', emissive: '#C026D3', speed: 0.003 },
  ], []);

  return (
    <group>
      {crystalsData.map((data, i) => (
        <Crystal key={i} {...data} />
      ))}
    </group>
  );
}

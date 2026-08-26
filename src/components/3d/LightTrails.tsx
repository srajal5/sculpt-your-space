import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * LightTrails — Animated light streak lines that fly through the scene
 * like shooting stars or data streams, adding dynamic energy.
 * Uses mesh-based tubes instead of <line> to avoid R3F conflicts.
 */

function LightTrail({ start, end, color, speed, delay }: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: string;
  speed: number;
  delay: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const progress = useRef(-delay);
  const trailLength = 0.25;

  // Build a thin tube along the path
  const { geometry, totalLength } = useMemo(() => {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const geo = new THREE.CylinderGeometry(0.015, 0.015, length, 4, 1);
    // Rotate cylinder to align with the direction vector
    geo.rotateX(Math.PI / 2);
    return { geometry: geo, totalLength: length };
  }, [start, end]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    progress.current += delta * speed;
    if (progress.current > 1 + trailLength) {
      progress.current = -trailLength;
    }

    const t = Math.max(0, Math.min(1, progress.current));

    // Position the trail along the path
    const pos = new THREE.Vector3().lerpVectors(start, end, t);
    meshRef.current.position.copy(pos);

    // Orient toward the end
    meshRef.current.lookAt(end);

    // Fade in and out
    const fadeIn = Math.min(1, progress.current * 4);
    const fadeOut = Math.max(0, 1 - (progress.current - 0.8) * 5);
    const opacity = Math.max(0, Math.min(fadeIn, fadeOut)) * 0.7;

    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = opacity;

    // Scale length based on speed
    const scaleZ = 0.15 + Math.abs(Math.sin(progress.current * Math.PI)) * 0.3;
    meshRef.current.scale.set(1, 1, scaleZ);
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[0.012, 0.003, 2, 4, 1]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function LightTrails() {
  const trails = useMemo(() => [
    { start: new THREE.Vector3(-15, 5, -8), end: new THREE.Vector3(15, -3, -2), color: '#9b87f5', speed: 0.4, delay: 0 },
    { start: new THREE.Vector3(12, 8, -12), end: new THREE.Vector3(-12, -5, -1), color: '#0EA5E9', speed: 0.35, delay: 1.5 },
    { start: new THREE.Vector3(-10, -6, -10), end: new THREE.Vector3(10, 7, -3), color: '#D946EF', speed: 0.3, delay: 3 },
    { start: new THREE.Vector3(8, 6, -15), end: new THREE.Vector3(-8, -4, 0), color: '#22D3EE', speed: 0.45, delay: 0.8 },
    { start: new THREE.Vector3(-14, 2, -6), end: new THREE.Vector3(14, -6, -4), color: '#A78BFA', speed: 0.38, delay: 2.2 },
  ], []);

  return (
    <group>
      {trails.map((trail, i) => (
        <LightTrail key={i} {...trail} />
      ))}
    </group>
  );
}

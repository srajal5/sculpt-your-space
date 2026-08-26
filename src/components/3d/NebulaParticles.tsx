import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Nebula Particles — Creates a galaxy-like swirling particle field
 * with multiple color layers that drift and rotate slowly.
 */
export default function NebulaParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const innerPointsRef = useRef<THREE.Points>(null);
  const count = 1500;
  const innerCount = 600;

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const colorPalette = [
      new THREE.Color('#9b87f5'), // neon-purple
      new THREE.Color('#6E59A5'), // deep purple
      new THREE.Color('#0EA5E9'), // neon-blue
      new THREE.Color('#D946EF'), // neon-pink
      new THREE.Color('#1a1030'), // dark void
    ];

    for (let i = 0; i < count; i++) {
      // Spiral galaxy distribution
      const angle = (i / count) * Math.PI * 12;
      const radius = Math.pow(Math.random(), 0.6) * 20;
      const armOffset = (Math.random() - 0.5) * 2.5;

      pos[i * 3] = Math.cos(angle) * radius + armOffset;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = Math.sin(angle) * radius + armOffset;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      siz[i] = Math.random() * 0.12 + 0.02;
    }
    return { positions: pos, colors: col, sizes: siz };
  }, []);

  const innerPositions = useMemo(() => {
    const pos = new Float32Array(innerCount * 3);
    for (let i = 0; i < innerCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.pow(Math.random(), 0.5) * 5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.015;
      pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.1;
    }
    if (innerPointsRef.current) {
      innerPointsRef.current.rotation.y = -t * 0.03;
      innerPointsRef.current.rotation.z = t * 0.02;
    }
  });

  return (
    <>
      {/* Outer galaxy spiral */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          args={[{
            size: 0.08,
            vertexColors: true,
            transparent: true,
            opacity: 0.65,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }]}
        />
      </points>

      {/* Inner core glow particles */}
      <points ref={innerPointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[innerPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          args={[{
            size: 0.06,
            color: '#c4b5fd',
            transparent: true,
            opacity: 0.5,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }]}
        />
      </points>
    </>
  );
}

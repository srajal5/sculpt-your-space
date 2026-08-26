import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * WireframeGrid — A perspective grid plane with animated
 * scan lines, creating a retro-futuristic cyberpunk runway effect.
 * Uses a simpler grid approach for maximum compatibility.
 */
export default function WireframeGrid() {
  const gridRef = useRef<THREE.Group>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);

  // Build grid lines manually for reliable rendering
  const gridGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const size = 20;
    const divisions = 30;
    const step = (size * 2) / divisions;

    // Lines along Z axis
    for (let i = 0; i <= divisions; i++) {
      const x = -size + i * step;
      points.push(new THREE.Vector3(x, 0, -size));
      points.push(new THREE.Vector3(x, 0, size));
    }

    // Lines along X axis
    for (let i = 0; i <= divisions; i++) {
      const z = -size + i * step;
      points.push(new THREE.Vector3(-size, 0, z));
      points.push(new THREE.Vector3(size, 0, z));
    }

    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (scanLineRef.current) {
      // Scan line sweeps forward repeatedly
      const scanZ = ((t * 3) % 40) - 20;
      scanLineRef.current.position.z = scanZ;
    }
  });

  return (
    <group ref={gridRef} position={[0, -4.5, -5]} rotation={[-Math.PI / 6, 0, 0]}>
      {/* The grid as line segments */}
      <lineSegments geometry={gridGeometry}>
        <lineBasicMaterial
          color="#9b87f5"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Scan line that sweeps across the grid */}
      <mesh ref={scanLineRef} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 0.1, 1, 1]} />
        <meshBasicMaterial
          color="#9b87f5"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

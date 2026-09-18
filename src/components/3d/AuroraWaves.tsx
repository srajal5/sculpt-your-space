import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';


export default function AuroraWaves() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mesh2Ref = useRef<THREE.Mesh>(null);


  const { geometry, geometry2 } = useMemo(() => {
    const width = 30;
    const height = 8;
    const segW = 24;
    const segH = 8;
    const geo = new THREE.PlaneGeometry(width, height, segW, segH);
    const geo2 = new THREE.PlaneGeometry(width * 0.8, height * 0.6, segW, segH);
    return { geometry: geo, geometry2: geo2 };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();


    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const waveZ =
          Math.sin(x * 0.3 + t * 0.4) * 0.8 +
          Math.sin(y * 0.5 + t * 0.6) * 0.4 +
          Math.sin((x + y) * 0.2 + t * 0.3) * 0.6;
        positions.setZ(i, waveZ);
      }
      positions.needsUpdate = true;

    }


    if (mesh2Ref.current) {
      const positions = mesh2Ref.current.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const waveZ =
          Math.sin(x * 0.4 + t * 0.3 + 2) * 0.6 +
          Math.sin(y * 0.3 + t * 0.5 + 1) * 0.5;
        positions.setZ(i, waveZ);
      }
      positions.needsUpdate = true;

    }
  });

  return (
    <group position={[0, 5, -15]} rotation={[-0.3, 0, 0]}>
      {/* Primary aurora ribbon */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          args={[{
            color: '#9b87f5',
            emissive: '#6b46c1',
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.12,
            side: THREE.DoubleSide,
            wireframe: false,
            metalness: 0.3,
            roughness: 0.7,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }]}
        />
      </mesh>

      {/* Secondary aurora ribbon — pink/blue */}
      <mesh ref={mesh2Ref} geometry={geometry2} position={[2, -1, 1]}>
        <meshStandardMaterial
          args={[{
            color: '#0EA5E9',
            emissive: '#D946EF',
            emissiveIntensity: 0.2,
            transparent: true,
            opacity: 0.08,
            side: THREE.DoubleSide,
            wireframe: false,
            metalness: 0.2,
            roughness: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }]}
        />
      </mesh>
    </group>
  );
}

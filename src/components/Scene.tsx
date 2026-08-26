import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import NebulaParticles from './3d/NebulaParticles';
import FloatingCrystals from './3d/FloatingCrystals';
import AuroraWaves from './3d/AuroraWaves';
import WireframeGrid from './3d/WireframeGrid';
import HeroCenterpiece from './3d/HeroCenterpiece';
import LightTrails from './3d/LightTrails';

/**
 * SmoothCameraController — Follows the mouse with gentle parallax
 * and subtle breathing motion. Does NOT use OrbitControls so it
 * won't interfere with page scrolling.
 */
function SmoothCameraController() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef(new THREE.Vector3(0, 0, 7));

  useEffect(() => {
    camera.position.set(0, 0, 7);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [camera]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Target position based on mouse + gentle breathing
    target.current.x = mouse.current.x * 1.5;
    target.current.y = mouse.current.y * 1.0 + Math.sin(t * 0.3) * 0.15;
    target.current.z = 7 + Math.sin(t * 0.2) * 0.3;

    // Smooth interpolation
    camera.position.x += (target.current.x - camera.position.x) * 0.03;
    camera.position.y += (target.current.y - camera.position.y) * 0.03;
    camera.position.z += (target.current.z - camera.position.z) * 0.03;

    camera.lookAt(0, 0, 0);
  });

  return null;
}

/**
 * SceneLighting — Multi-point lighting setup with animated
 * color-shifting point lights for dynamic atmosphere.
 */
function SceneLighting() {
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);
  const light3Ref = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(t * 0.3) * 8;
      light1Ref.current.position.y = Math.cos(t * 0.2) * 5;
      light1Ref.current.intensity = 1.5 + Math.sin(t * 0.5) * 0.5;
    }
    if (light2Ref.current) {
      light2Ref.current.position.x = Math.cos(t * 0.4) * 6;
      light2Ref.current.position.z = Math.sin(t * 0.3) * 4;
      light2Ref.current.intensity = 1.2 + Math.sin(t * 0.7 + 1) * 0.4;
    }
    if (light3Ref.current) {
      light3Ref.current.position.y = Math.sin(t * 0.25) * 4;
      light3Ref.current.intensity = 0.8 + Math.sin(t * 0.6 + 2) * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.08} color="#1a1030" />
      <pointLight ref={light1Ref} position={[8, 5, 5]} intensity={1.5} color="#9b87f5" distance={25} decay={2} />
      <pointLight ref={light2Ref} position={[-6, 3, -5]} intensity={1.2} color="#0EA5E9" distance={20} decay={2} />
      <pointLight ref={light3Ref} position={[0, -5, 3]} intensity={0.8} color="#D946EF" distance={18} decay={2} />
      <directionalLight position={[0, 10, 5]} intensity={0.15} color="#c4b5fd" />
    </>
  );
}

export default function Scene() {
  return (
    <div className="canvas-container">
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 7] }}
        dpr={[1, 1.5]}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
        }}
      >
        <Suspense fallback={null}>
          {/* Camera & Lighting */}
          <SmoothCameraController />
          <SceneLighting />
          <fog attach="fog" args={['#06050a', 8, 35]} />

          {/* Background atmosphere layers */}
          <NebulaParticles />
          <AuroraWaves />

          {/* Custom 3D models */}
          <HeroCenterpiece />
          <FloatingCrystals />

          {/* Dynamic effects */}
          <LightTrails />
          <WireframeGrid />
        </Suspense>
      </Canvas>
    </div>
  );
}

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function ComplexShape() {
  const mesh = useRef<THREE.Mesh>(null);
  const [isRotating, setIsRotating] = useState(false);
  const rotationSpeed = 0.02;
  const targetRotation = useRef({ x: 0, y: 0 });
  
  useFrame((state) => {
    if (!mesh.current || !isRotating) return;
    
    mesh.current.rotation.y += rotationSpeed;
    
    // Complete one full rotation
    if (mesh.current.rotation.y >= targetRotation.current.y + Math.PI * 2) {
      setIsRotating(false);
      mesh.current.rotation.y = targetRotation.current.y;
    }
  });
  
  const handleClick = () => {
    if (!mesh.current || isRotating) return;
    targetRotation.current.y = mesh.current.rotation.y;
    setIsRotating(true);
  };
  
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={mesh} onClick={handleClick}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial
          color="#0EA5E9"
          emissive="#1EAEDB"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

function CameraController() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 0, 5);
  }, [camera]);
  
  return null;
}

export default function Scene() {
  return (
    <div className="canvas-container">
      <Canvas>
        <CameraController />
        <Environment preset="night" />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight
          position={[-10, 10, -10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
        />
        <ComplexShape />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}

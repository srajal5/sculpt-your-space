
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
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={mesh} onClick={handleClick}>
        <dodecahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial 
          color="#9b87f5"
          emissive="#6b46c1"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          wireframe={true}
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
        <Environment preset="city" />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
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

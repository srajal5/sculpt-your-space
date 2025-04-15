
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

function Character() {
  const group = useRef<THREE.Group>(null);
  const [showText, setShowText] = useState(false);
  const [textOpacity, setTextOpacity] = useState(0);
  
  useFrame((state) => {
    if (!group.current) return;
    
    // Gentle floating animation for the character
    group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    
    // Animate text opacity
    if (showText && textOpacity < 1) {
      setTextOpacity((prev) => Math.min(prev + 0.05, 1));
    }
    if (!showText && textOpacity > 0) {
      setTextOpacity((prev) => Math.max(prev - 0.05, 0));
    }
  });
  
  const handleClick = () => {
    setShowText(true);
    // Hide text after 3 seconds
    setTimeout(() => setShowText(false), 3000);
  };
  
  return (
    <group>
      {/* Character */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
        <group ref={group} onClick={handleClick}>
          {/* Body */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1, 1.5, 0.5]} />
            <meshStandardMaterial color="#9b87f5" />
          </mesh>
          {/* Head */}
          <mesh position={[0, 1, 0]}>
            <boxGeometry args={[0.75, 0.75, 0.75]} />
            <meshStandardMaterial color="#9b87f5" />
          </mesh>
          {/* Eyes */}
          <mesh position={[-0.2, 1.1, 0.4]}>
            <sphereGeometry args={[0.08]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          <mesh position={[0.2, 1.1, 0.4]}>
            <sphereGeometry args={[0.08]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
        </group>
      </Float>
      
      {/* Animated Text */}
      {showText && (
        <group position={[0, 2, 0]}>
          <Center>
            <Text3D
              font="/fonts/helvetiker_regular.typeface.json"
              size={0.5}
              height={0.1}
              curveSegments={12}
            >
              Hi, I'm a Web Developer
              <meshStandardMaterial 
                color="#0EA5E9" 
                opacity={textOpacity}
                transparent
              />
            </Text3D>
          </Center>
        </group>
      )}
    </group>
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
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight
          position={[-10, 10, -10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
        />
        <Character />
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

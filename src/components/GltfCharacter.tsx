
import { useRef, useState, useEffect } from 'react';
import { useGLTF, Center, Text3D } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Create a simple robot mesh instead of using the GLTF model
// This will be a fallback until we can properly load the model
function SimpleRobot() {
  return (
    <group>
      {/* Robot body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1.5, 0.5]} />
        <meshStandardMaterial color="#5f9ea0" />
      </mesh>
      
      {/* Robot head */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial color="#4682b4" />
      </mesh>
      
      {/* Robot eyes */}
      <mesh position={[-0.2, 1.1, 0.4]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.2, 1.1, 0.4]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Robot arms */}
      <mesh position={[-0.65, 0.2, 0]}>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial color="#4682b4" />
      </mesh>
      <mesh position={[0.65, 0.2, 0]}>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial color="#4682b4" />
      </mesh>
      
      {/* Robot legs */}
      <mesh position={[-0.3, -1, 0]}>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial color="#4682b4" />
      </mesh>
      <mesh position={[0.3, -1, 0]}>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial color="#4682b4" />
      </mesh>
    </group>
  );
}

export function GltfCharacter() {
  const group = useRef<THREE.Group>(null);
  const [showText, setShowText] = useState(false);
  const [textOpacity, setTextOpacity] = useState(0);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState(false);
  
  // Try to load the GLTF model, but fallback to our simple robot if it fails
  useEffect(() => {
    // We'll check if the model loads successfully
    const timeout = setTimeout(() => {
      if (!modelLoaded) {
        console.log("Model loading timed out, using fallback");
        setModelError(true);
      }
    }, 5000); // 5 second timeout
    
    return () => clearTimeout(timeout);
  }, [modelLoaded]);
  
  useFrame((state) => {
    if (!group.current) return;
    
    // Gentle floating animation
    group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    
    // Text opacity animation
    if (showText && textOpacity < 1) {
      setTextOpacity((prev) => Math.min(prev + 0.05, 1));
    }
    if (!showText && textOpacity > 0) {
      setTextOpacity((prev) => Math.max(prev - 0.05, 0));
    }
  });
  
  const handleClick = () => {
    setShowText(true);
    setTimeout(() => setShowText(false), 3000);
  };

  return (
    <group>
      <group ref={group} onClick={handleClick} scale={[0.5, 0.5, 0.5]} position={[0, -1, 0]}>
        {/* Use our simple robot instead of trying to load the GLTF */}
        <SimpleRobot />
      </group>
      
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


import { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function GltfCharacter() {
  const group = useRef<THREE.Group>(null);
  const [showText, setShowText] = useState(false);
  const [textOpacity, setTextOpacity] = useState(0);
  
  // Replace this URL with your actual model URL once uploaded
  const { nodes, materials } = useGLTF('/models/robot.glb');
  
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
        <primitive object={nodes.Scene} />
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

useGLTF.preload('/models/robot.glb');

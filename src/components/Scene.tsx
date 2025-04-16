
import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// Floating particles component
function ParticleField() {
  const particles = useRef<THREE.Points>(null);
  const count = 200;
  
  // Create particles
  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    
    return positions;
  });
  
  useFrame((state) => {
    if (!particles.current) return;
    
    // Subtle rotation of particle field
    particles.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });
  
  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.1} 
        color="#9b87f5" 
        transparent 
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// Interactive geometric shapes
function GeometricShapes() {
  const shapes = useRef<THREE.Group>(null);
  const shapesCount = 15;
  const [shapesData] = useState(() => 
    Array.from({ length: shapesCount }, () => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      scale: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.002 + 0.001,
      geometryType: Math.floor(Math.random() * 5)
    }))
  );
  
  useFrame((state) => {
    if (!shapes.current) return;
    
    // Animate each shape
    shapes.current.children.forEach((shape, i) => {
      const data = shapesData[i];
      shape.rotation.x += data.speed;
      shape.rotation.y += data.speed * 1.5;
    });
  });
  
  return (
    <group ref={shapes}>
      {shapesData.map((data, index) => {
        // Choose geometry based on type
        let geometry;
        switch(data.geometryType) {
          case 0:
            geometry = <octahedronGeometry args={[data.scale, 0]} />;
            break;
          case 1:
            geometry = <tetrahedronGeometry args={[data.scale, 0]} />;
            break;
          case 2:
            geometry = <dodecahedronGeometry args={[data.scale, 0]} />;
            break;
          case 3:
            geometry = <icosahedronGeometry args={[data.scale, 0]} />;
            break;
          default:
            geometry = <boxGeometry args={[data.scale, data.scale, data.scale]} />;
        }
        
        return (
          <mesh
            key={index}
            position={data.position as [number, number, number]}
            rotation={data.rotation as [number, number, number]}
          >
            {geometry}
            <meshStandardMaterial
              color={index % 2 === 0 ? "#9b87f5" : "#0EA5E9"}
              wireframe={index % 3 === 0}
              transparent
              opacity={0.7}
              metalness={0.5}
              roughness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

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
  const { camera, mouse } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 5));
  
  useEffect(() => {
    camera.position.set(0, 0, 5);
  }, [camera]);
  
  useFrame(() => {
    // Smooth camera movement based on mouse position
    targetPosition.current.x = (mouse.x * 2);
    targetPosition.current.y = (mouse.y * 2);
    
    // Interpolate current camera position to target position
    camera.position.x += (targetPosition.current.x - camera.position.x) * 0.05;
    camera.position.y += (targetPosition.current.y - camera.position.y) * 0.05;
    
    // Always look at the center
    camera.lookAt(0, 0, 0);
  });
  
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
        <ParticleField />
        <GeometricShapes />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={true}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}

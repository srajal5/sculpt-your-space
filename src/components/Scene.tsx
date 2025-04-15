
import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useTexture, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleProps {
  count: number;
  mouse: React.MutableRefObject<THREE.Vector2>;
}

function Particles({ count, mouse }: ParticleProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();
  const particles = useRef<{ position: THREE.Vector3; velocity: THREE.Vector3; factor: number }[]>([]);
  
  useEffect(() => {
    if (!mesh.current) return;
    
    particles.current = Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      ),
      factor: Math.random() * 30
    }));

    // Initial positioning
    for (let i = 0; i < count; i++) {
      const { position } = particles.current[i];
      dummy.position.copy(position);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    
    for (let i = 0; i < count; i++) {
      const { position, velocity, factor } = particles.current[i];
      
      position.add(velocity);
      
      // Boundary check
      if (position.length() > 10) {
        position.normalize().multiplyScalar(10);
        velocity.negate().multiplyScalar(0.5);
      }
      
      // Mouse interaction
      const mouseInfluence = 0.001;
      const mouseDist = 3;
      const mousePos = new THREE.Vector3(mouse.current.x, mouse.current.y, 0);
      const distance = position.distanceTo(mousePos);
      
      if (distance < mouseDist) {
        const force = mouseDist / Math.max(0.1, distance);
        const direction = new THREE.Vector3().subVectors(position, mousePos).normalize();
        velocity.add(direction.multiplyScalar(force * mouseInfluence * factor));
      }
      
      dummy.position.copy(position);
      dummy.scale.set(0.05, 0.05, 0.05);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshStandardMaterial 
        color="#8B5CF6" 
        emissive="#8B5CF6"
        emissiveIntensity={0.5}
        toneMapped={false} 
        roughness={0.5}
        metalness={0.8}
      />
    </instancedMesh>
  );
}

function CameraController() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 0, 5);
  }, [camera]);
  
  return null;
}

function AnimatedSphere() {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.15;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.2;
  });
  
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
        <meshStandardMaterial 
          color="#0EA5E9" 
          emissive="#0EA5E9"
          emissiveIntensity={0.5}
          roughness={0.3} 
          metalness={0.8}
          wireframe={true}
        />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  const mouseRef = useRef(new THREE.Vector2());
  
  const updateMousePosition = (e: MouseEvent) => {
    // Convert screen coordinates to normalized device coordinates (-1 to +1)
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };
  
  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  
  return (
    <div className="canvas-container">
      <Canvas>
        <CameraController />
        <Environment preset="city" />
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AnimatedSphere />
        <Particles count={100} mouse={mouseRef} />
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

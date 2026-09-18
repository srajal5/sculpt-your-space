import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePerformance } from '@/context/PerformanceContext';

/**
 * Nebula Particles — Creates a galaxy-like swirling particle field
 * with performance mode awareness and scroll-aware density attenuation.
 */
export default function NebulaParticles() {
  const { isLow, isOff } = usePerformance();
  const pointsRef = useRef<THREE.Points>(null);
  const innerPointsRef = useRef<THREE.Points>(null);
  const outerMatRef = useRef<THREE.PointsMaterial>(null);
  const innerMatRef = useRef<THREE.PointsMaterial>(null);

  // Scaled particle counts based on performance mode
  const count = isLow ? 400 : 1500;
  const innerCount = isLow ? 150 : 600;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color('#9b87f5'), // neon-purple
      new THREE.Color('#6E59A5'), // deep purple
      new THREE.Color('#0EA5E9'), // neon-blue
      new THREE.Color('#D946EF'), // neon-pink
      new THREE.Color('#1a1030'), // dark void
    ];

    for (let i = 0; i < count; i++) {
      // Spiral galaxy distribution
      const angle = (i / count) * Math.PI * 12;
      const radius = Math.pow(Math.random(), 0.6) * 20;
      const armOffset = (Math.random() - 0.5) * 2.5;

      pos[i * 3] = Math.cos(angle) * radius + armOffset;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = Math.sin(angle) * radius + armOffset;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  const innerPositions = useMemo(() => {
    const pos = new Float32Array(innerCount * 3);
    for (let i = 0; i < innerCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.pow(Math.random(), 0.5) * 5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [innerCount]);

  const isReducedRef = useRef(false);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      isReducedRef.current = motionQuery.matches;
    };
    update();
    motionQuery.addEventListener('change', update);

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      motionQuery.removeEventListener('change', update);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state) => {
    if (isOff) return;

    const t = state.clock.getElapsedTime();
    const speed = isReducedRef.current ? 0.2 : 1;

    // Smooth scroll fade factor (1 at hero, down to 0.35 on deep scroll)
    const scrollFactor = Math.max(0.35, 1 - Math.min(scrollYRef.current / 1800, 0.65));

    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.012 * speed;
      pointsRef.current.rotation.x = isReducedRef.current ? 0 : Math.sin(t * 0.01) * 0.08;
    }
    if (innerPointsRef.current) {
      innerPointsRef.current.rotation.y = -t * 0.025 * speed;
      innerPointsRef.current.rotation.z = isReducedRef.current ? 0 : t * 0.018 * speed;
    }

    if (outerMatRef.current) {
      outerMatRef.current.opacity = 0.65 * scrollFactor;
    }
    if (innerMatRef.current) {
      innerMatRef.current.opacity = 0.5 * scrollFactor;
    }
  });

  if (isOff) {
    return null;
  }

  return (
    <>
      {/* Outer galaxy spiral */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={outerMatRef}
          args={[{
            size: isLow ? 0.09 : 0.08,
            vertexColors: true,
            transparent: true,
            opacity: 0.65,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }]}
        />
      </points>

      {/* Inner core glow particles */}
      {!isLow && (
        <points ref={innerPointsRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[innerPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            ref={innerMatRef}
            args={[{
              size: 0.06,
              color: '#c4b5fd',
              transparent: true,
              opacity: 0.5,
              sizeAttenuation: true,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
            }]}
          />
        </points>
      )}
    </>
  );
}

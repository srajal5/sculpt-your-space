import React, { useRef } from 'react';
import { motion, useMotionTemplate, useSpring } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTiltDegrees?: number;
  glowColor?: string;
}

export default function TiltCard({
  children,
  className = '',
  maxTiltDegrees = 6,
  glowColor = 'rgba(155, 135, 245, 0.18)',
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionPreference();

  const springConfig = { stiffness: 260, damping: 22, mass: 0.45 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const glowX = useSpring(50, springConfig);
  const glowY = useSpring(50, springConfig);
  const glowOpacity = useSpring(0, { stiffness: 220, damping: 24 });
  const liftY = useSpring(0, springConfig);

  const glowBackground = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, ${glowColor}, transparent 42%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    glowX.set((mouseX / rect.width) * 100);
    glowY.set((mouseY / rect.height) * 100);

    if (reduceMotion) return;

    const normalizedX = (mouseX / rect.width) * 2 - 1;
    const normalizedY = (mouseY / rect.height) * 2 - 1;

    rotateX.set(-normalizedY * maxTiltDegrees);
    rotateY.set(normalizedX * maxTiltDegrees);
  };

  const handleMouseEnter = () => {
    glowOpacity.set(1);
    if (!reduceMotion) {
      liftY.set(-4);
    }
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
    glowOpacity.set(0);
    liftY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        y: reduceMotion ? 0 : liftY,
        transformStyle: reduceMotion ? 'flat' : 'preserve-3d',
      }}
      className={`relative perspective-1000 ${className}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl z-10"
        style={{
          background: glowBackground,
          opacity: glowOpacity,
        }}
      />
      <div className="relative z-20 h-full w-full">{children}</div>
    </motion.div>
  );
}

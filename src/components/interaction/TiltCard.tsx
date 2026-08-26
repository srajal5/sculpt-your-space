import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

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
  glowColor = 'rgba(155, 135, 245, 0.15)',
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const springConfig = { stiffness: 300, damping: 20 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const glowX = useSpring(50, springConfig);
  const glowY = useSpring(50, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const normalizedX = (mouseX / width) * 2 - 1;
    const normalizedY = (mouseY / height) * 2 - 1;

    // Calculate subtle 3D rotation
    rotateX.set(-normalizedY * maxTiltDegrees);
    rotateY.set(normalizedX * maxTiltDegrees);

    // Calculate light glow position (percentage)
    glowX.set((mouseX / width) * 100);
    glowY.set((mouseY / height) * 100);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative perspective-1000 ${className}`}
    >
      {/* Interactive Cursor Spotlight Radial Glow */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
          style={{
            background: `radial-gradient(600px circle at ${glowX.get()}% ${glowY.get()}%, ${glowColor}, transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-20 h-full w-full">{children}</div>
    </motion.div>
  );
}

import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = '',
  magneticStrength = 0.25,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const positionX = useSpring(0, springConfig);
  const positionY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = (e.clientX - centerX) * magneticStrength;
    const distanceY = (e.clientY - centerY) * magneticStrength;

    positionX.set(distanceX);
    positionY.set(distanceY);
  };

  const handleMouseLeave = () => {
    positionX.set(0);
    positionY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: positionX,
        y: positionY,
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

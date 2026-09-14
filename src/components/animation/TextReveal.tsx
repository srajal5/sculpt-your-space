import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0,
    },
  },
};

const letterVariantsNormal: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    rotateX: -70,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 15,
      mass: 0.7,
    },
  },
};

const letterVariantsReduced: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
    },
  },
};

const gradientCharStyle: React.CSSProperties = {
  background: 'inherit',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

export function TextReveal({
  text,
  className = '',
  delay = 0,
  as: Component = 'h1',
}: TextRevealProps) {
  const reduceMotion = useReducedMotionPreference();
  const useGradientChars =
    className.includes('bg-clip-text') || className.includes('text-transparent');

  const resolvedContainerVariants: Variants = {
    ...containerVariants,
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0.03 : 0.055,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = reduceMotion ? letterVariantsReduced : letterVariantsNormal;

  return (
    <Component
      className={className}
      style={{ perspective: reduceMotion ? undefined : 900 }}
    >
      <motion.span
        variants={resolvedContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="inline-block"
        style={{ transformStyle: reduceMotion ? 'flat' : 'preserve-3d' }}
      >
        {Array.from(text).map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={letterVariants}
            className="inline-block"
            style={{
              transformOrigin: 'bottom center',
              ...(useGradientChars ? gradientCharStyle : undefined),
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
}

export function Reveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.6,
}: RevealProps) {
  const reduceMotion = useReducedMotionPreference();

  const getInitialPosition = () => {
    if (reduceMotion) return { x: 0, y: 0 };
    switch (direction) {
      case 'up':
        return { y: 40, x: 0 };
      case 'down':
        return { y: -40, x: 0 };
      case 'left':
        return { x: 40, y: 0 };
      case 'right':
        return { x: -40, y: 0 };
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: reduceMotion ? 'none' : 'blur(6px)',
        ...getInitialPosition(),
      }}
      whileInView={{
        opacity: 1,
        filter: 'blur(0px)',
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? Math.min(duration, 0.4) : duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


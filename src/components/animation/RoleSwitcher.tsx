import { useEffect, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';

interface RoleSwitcherProps {
  roles?: string[];
  interval?: number;
  className?: string;
}

const DEFAULT_ROLES = [
  'AI Engineer',
  'Generative AI Engineer',
  'Full-Stack AI Developer',
  'Computer Vision Developer',
];

export default function RoleSwitcher({
  roles = DEFAULT_ROLES,
  interval = 2450,
  className = '',
}: RoleSwitcherProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reduceMotion = useReducedMotionPreference();

  useEffect(() => {
    if (roles.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length);
    }, interval);

    return () => clearInterval(timer);
  }, [roles.length, interval]);

  const roleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 12,
      scale: reduceMotion ? 1 : 0.98,
      filter: reduceMotion ? 'none' : 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.45,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : -12,
      scale: reduceMotion ? 1 : 0.98,
      filter: reduceMotion ? 'none' : 'blur(6px)',
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const currentRole = roles[currentIndex] || roles[0];

  return (
    <div className={`flex flex-wrap items-center gap-2 sm:gap-3 mb-6 ${className}`}>
      {/* Technical prefix */}
      <span className="text-xs font-mono font-semibold tracking-widest text-neon-blue/90 uppercase select-none flex items-center gap-1.5 shrink-0">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
        CURRENT ROLE //
      </span>

      {/* Role transition viewport - expansive width & height without clipping */}
      <div className="relative inline-flex items-center min-w-[280px] sm:min-w-[360px] md:min-w-[450px] h-10 sm:h-11 py-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRole}
            variants={roleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              text-lg sm:text-xl md:text-2xl
              font-mono font-semibold tracking-wide
              bg-gradient-to-r from-white via-purple-200 to-neon-cyan
              bg-clip-text text-transparent
              drop-shadow-[0_0_16px_rgba(139,92,246,0.45)]
              select-none whitespace-nowrap
            "
          >
            {currentRole}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

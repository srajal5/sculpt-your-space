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
  interval = 2850,
  className = '',
}: RoleSwitcherProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotionPreference();

  useEffect(() => {
    if (roles.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length);
    }, interval);

    return () => clearInterval(timer);
  }, [roles.length, interval]);

  const currentRole = roles[currentIndex] || roles[0];
  const roleIndexFormatted = String(currentIndex + 1).padStart(2, '0');
  const totalRolesFormatted = String(roles.length).padStart(2, '0');

  // Entrance & Exit animation variants
  // The exit preserves full readability (>90% opacity) for 65% of the exit time while moving up
  const roleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 14,
      scale: reduceMotion ? 1 : 0.985,
      filter: reduceMotion ? 'none' : 'blur(2px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: reduceMotion ? 0.25 : 0.38,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: [1, 0.92, 0],
      y: reduceMotion ? 0 : -14,
      scale: reduceMotion ? 1 : 0.985,
      filter: reduceMotion ? 'none' : 'blur(1.5px)',
      transition: {
        duration: reduceMotion ? 0.2 : 0.34,
        times: [0, 0.65, 1],
        ease: [0.4, 0, 0.7, 1],
      },
    },
  };

  // Subtly animate the technical index counter
  const indexVariants: Variants = {
    initial: { opacity: 0.4, y: reduceMotion ? 0 : 4 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.28, ease: 'easeOut' },
    },
    exit: {
      opacity: 0.2,
      y: reduceMotion ? 0 : -4,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3.5 mb-6 select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Technical HUD Prefix */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs font-mono font-semibold tracking-widest text-neon-blue/90 uppercase flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan shadow-[0_0_8px_#06b6d4]" />
          </span>
          CURRENT ROLE //
        </span>

        {/* Dynamic 2-digit index counter */}
        <div className="relative inline-flex items-center justify-center font-mono text-xs font-bold text-neon-cyan/95 bg-neon-blue/10 px-1.5 py-0.5 rounded border border-neon-cyan/30 shadow-[0_0_10px_rgba(6,182,212,0.2)] min-w-[2.2rem] h-5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndexFormatted}
              variants={indexVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="inline-block"
            >
              {roleIndexFormatted}
            </motion.span>
          </AnimatePresence>
        </div>

        <span className="text-[10px] font-mono text-muted-foreground/60 hidden sm:inline-block">
          / {totalRolesFormatted}
        </span>
      </div>

      {/* Role viewport container: expansive min-width prevents any layout shift or clipping */}
      <div className="relative inline-flex flex-col justify-center min-w-[280px] sm:min-w-[360px] md:min-w-[460px] h-11 sm:h-12 py-0.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRole}
            variants={roleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileHover={
              !reduceMotion
                ? {
                  y: -1,
                  scale: 1.01,
                  transition: { duration: 0.18, ease: 'easeOut' },
                }
                : undefined
            }
            className="relative inline-flex flex-col group cursor-default"
          >
            {/* Main Gradient Typography with Adaptive Glow */}
            <div className="relative inline-flex items-center">
              <span
                className={`
                  text-lg sm:text-xl md:text-2xl
                  font-mono font-semibold tracking-wide
                  bg-gradient-to-r from-white via-purple-100 to-neon-cyan
                  bg-clip-text
                  whitespace-nowrap transition-all duration-300
                  
                `}
              >
                {currentRole}
              </span>

              {/* Energy Scan Beam: sweeps across the active text once on enter */}
              {!reduceMotion && (
                <motion.div
                  key={`scan-${currentRole}`}
                  initial={{ x: '-110%', opacity: 0 }}
                  animate={{
                    x: '220%',
                    opacity: [0, 0.9, 0.9, 0],
                  }}
                  transition={{
                    duration: 0.62,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.08,
                  }}
                  className="pointer-events-none absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
                />
              )}
            </div>

            {/* Active Technical Underline with Draw & Glow Effect */}
            <div className="relative w-full h-[2px] mt-1 overflow-hidden bg-white/5 rounded-full">
              {!reduceMotion ? (
                <motion.div
                  key={`underline-${currentRole}`}
                  initial={{ width: '0%', opacity: 0.5 }}
                  animate={{
                    width: ['0%', '100%', '76%'],
                    opacity: isHovered ? 1 : 0.85,
                  }}
                  transition={{
                    duration: 0.48,
                    times: [0, 0.65, 1],
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full bg-gradient-to-r from-neon-cyan via-purple-400 to-transparent shadow-[0_0_8px_rgba(6,182,212,0.8)] rounded-full"
                />
              ) : (
                <div className="h-full w-[76%] bg-gradient-to-r from-neon-cyan via-purple-400 to-transparent" />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

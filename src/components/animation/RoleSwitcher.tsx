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
  // In reduced motion mode: pure opacity crossfade without displacement or blur
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
        duration: reduceMotion ? 0.3 : 0.38,
        ease: reduceMotion ? 'easeOut' : [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: reduceMotion ? 0 : [1, 0.92, 0],
      y: reduceMotion ? 0 : -14,
      scale: reduceMotion ? 1 : 0.985,
      filter: reduceMotion ? 'none' : 'blur(1.5px)',
      transition: {
        duration: reduceMotion ? 0.25 : 0.34,
        times: reduceMotion ? undefined : [0, 0.65, 1],
        ease: reduceMotion ? 'easeIn' : [0.4, 0, 0.7, 1],
      },
    },
  };

  // Subtly animate the technical index counter
  const indexVariants: Variants = {
    initial: { opacity: reduceMotion ? 0 : 0.4, y: reduceMotion ? 0 : 4 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: reduceMotion ? 0 : -4,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3.5 mb-7 sm:mb-8 select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Technical HUD Prefix */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.16em] text-neon-blue uppercase flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan shadow-[0_0_8px_#06b6d4]" />
          </span>
          CURRENT ROLE //
        </span>

        {/* Dynamic 2-digit index counter */}
        <div className="relative inline-flex items-center justify-center font-mono text-[11px] font-semibold text-neon-cyan/95 bg-neon-blue/10 px-1.5 py-0.5 rounded border border-neon-cyan/30 shadow-[0_0_8px_rgba(6,182,212,0.2)] min-w-[2rem] h-5 overflow-hidden">
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
      <div className="relative inline-flex flex-col justify-center min-w-[260px] sm:min-w-[340px] md:min-w-[420px] h-10 sm:h-11 py-0.5">
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
                className="
                  text-lg sm:text-xl md:text-[1.35rem]
                  font-sans font-semibold tracking-tight
                  bg-gradient-to-r from-[#ffffff] via-[#ddd5ff] via-[35%] via-[#9d8cff] via-[65%] to-[#58d9ff]
                  bg-clip-text text-transparent
                  whitespace-nowrap transition-all duration-300
                  drop-shadow-[0_0_10px_rgba(157,140,255,0.25)]
                "
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
                    opacity: [0, 0.85, 0.85, 0],
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

            {/* Active 1px Subtle Horizontal Energy Line (transparent -> cyan -> violet -> transparent) */}
            <div className="relative w-full h-[1px] mt-1 overflow-hidden bg-white/5 rounded-full">
              {!reduceMotion ? (
                <motion.div
                  key={`underline-${currentRole}`}
                  initial={{ width: '0%', opacity: 0.4 }}
                  animate={{
                    width: ['0%', '100%', '80%'],
                    opacity: isHovered ? 1 : [0.4, 0.95, 0.75],
                  }}
                  transition={{
                    duration: 0.45,
                    times: [0, 0.6, 1],
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full bg-gradient-to-r from-transparent via-neon-cyan via-50% to-neon-purple to-transparent shadow-[0_0_6px_rgba(6,182,212,0.6)]"
                />
              ) : (
                <div className="h-full w-[80%] bg-gradient-to-r from-transparent via-neon-cyan to-neon-purple to-transparent opacity-75" />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

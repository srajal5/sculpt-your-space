import { useCallback, useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import { setCursorState } from '@/lib/cursor';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
}

const letterVariants: Variants = {
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.15,
    },
  },
};

const titleClassName = `
  relative z-[2] max-w-full
  text-5xl sm:text-7xl lg:text-[7rem] xl:text-[8rem]
  font-black tracking-[-0.055em] leading-[0.85]
  select-none
`;

const rgbLayerClassName = `
  absolute inset-0 z-0
  text-5xl sm:text-7xl lg:text-[7rem] xl:text-[8rem]
  font-black tracking-[-0.055em] leading-[0.85]
  pointer-events-none select-none
`;

interface CursorReactiveTextProps {
  text: string;
  className?: string;
}

export default function CursorReactiveText({
  text,
  className = '',
}: CursorReactiveTextProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const letterInnerRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const rafRef = useRef<number | null>(null);
  const sheenTimerRef = useRef<number | null>(null);
  const glitchTimerRef = useRef<number | null>(null);
  const burstTimerRef = useRef<number | null>(null);

  // Position and velocity tracking
  const targetRef = useRef({ px: -500, py: -500, nx: 0.5, ny: 0.5 });
  const currentRef = useRef({ px: -500, py: -500, nx: 0.5, ny: 0.5 });
  const lastPointerRef = useRef({ x: 0, y: 0, time: 0 });
  const velocityRef = useRef(0);
  const proximityRef = useRef(0);
  const interactiveRef = useRef(false);
  const intensityRef = useRef(1);
  const reducedMotionRef = useRef(false);

  // Local particles for the entrance/hover burst
  const [particles, setParticles] = useState<Particle[]>([]);

  // Smooth springs for 3D micro-movement and magnetic tilt
  const rotateX = useSpring(0, { stiffness: 220, damping: 24, mass: 0.35 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 24, mass: 0.35 });
  const translateX = useSpring(0, { stiffness: 180, damping: 22, mass: 0.35 });
  const translateY = useSpring(0, { stiffness: 180, damping: 22, mass: 0.35 });
  const titleScale = useSpring(1, { stiffness: 220, damping: 24, mass: 0.35 });
  const auraX = useSpring(0, { stiffness: 120, damping: 20, mass: 0.5 });
  const auraY = useSpring(0, { stiffness: 120, damping: 20, mass: 0.5 });

  const proximity = useMotionValue(0);
  const smoothProximity = useSpring(proximity, { stiffness: 150, damping: 22, mass: 0.4 });
  const lineBase = useMotionValue(0);
  const glitchBoost = useMotionValue(0);

  // RGB Chromatic Separation with velocity boost
  const rgbOffset = useTransform(
    [smoothProximity, glitchBoost],
    ([prox, glitch]: number[]) => prox * 2.2 + glitch * 1.8
  );
  const rgbOffsetNeg = useTransform(
    [smoothProximity, glitchBoost],
    ([prox, glitch]: number[]) => -(prox * 2.2 + glitch * 1.8)
  );
  const rgbOpacity = useTransform(
    [smoothProximity, glitchBoost],
    ([prox, glitch]: number[]) => prox * 0.2 + glitch * 0.08
  );

  const auraOpacity = useTransform(smoothProximity, [0, 1], [0.35, 0.8]);
  const auraScale = useTransform(smoothProximity, [0, 1], [0.96, 1.06]);

  const lineWidth = useTransform(
    [lineBase, smoothProximity],
    ([base, prox]: number[]) => `${base + prox * 15}%`
  );
  const lineGlow = useTransform(
    smoothProximity,
    [0, 1],
    [
      '0 0 10px rgba(34,211,238,0.35), 0 0 8px rgba(139,92,246,0.28)',
      '0 0 22px rgba(34,211,238,0.9), 0 0 18px rgba(139,92,246,0.7)',
    ]
  );

  // Reset letters to baseline transform
  const resetLetters = useCallback(() => {
    letterInnerRefs.current.forEach((el) => {
      if (!el) return;
      el.style.transform = 'translate3d(0, 0, 0) scale(1)';
      el.style.filter = 'drop-shadow(0 0 18px rgba(139,92,246,0.35))';
    });
  }, []);

  // Calculate proximity and displacement for individual letters
  const updateLetterProximity = useCallback((cursorPx: number, cursorPy: number, proxIntensity: number) => {
    if (proxIntensity <= 0.02) {
      resetLetters();
      return;
    }

    const vel = velocityRef.current;
    const velBoost = Math.min(1.5, 1 + vel * 0.3);

    letterInnerRefs.current.forEach((el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const wrapperRect = wrapperRef.current?.getBoundingClientRect();
      if (!wrapperRect || rect.width === 0) return;

      const letterCenterX = rect.left - wrapperRect.left + rect.width / 2;
      const letterCenterY = rect.top - wrapperRect.top + rect.height / 2;

      const dist = Math.hypot(cursorPx - letterCenterX, cursorPy - letterCenterY);
      const maxDist = 110;
      const influence = Math.max(0, 1 - dist / maxDist) * proxIntensity;

      if (influence > 0) {
        const ty = -5 * influence * velBoost;
        const tx = (letterCenterX - cursorPx > 0 ? 1.5 : -1.5) * influence;
        const tz = 8 * influence;
        const scale = 1 + 0.035 * influence;
        const glowBlur = 12 + 16 * influence;

        el.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, ${tz.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        el.style.filter = `drop-shadow(0 0 ${glowBlur.toFixed(1)}px rgba(34, 211, 238, ${(0.4 + 0.5 * influence).toFixed(2)})) drop-shadow(0 0 20px rgba(139, 92, 246, 0.4))`;
      } else {
        el.style.transform = 'translate3d(0, 0, 0) scale(1)';
        el.style.filter = 'drop-shadow(0 0 18px rgba(139,92,246,0.35))';
      }
    });
  }, [resetLetters]);

  // Main animation tick loop
  const tick = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || reducedMotionRef.current || !interactiveRef.current) {
      rafRef.current = null;
      return;
    }

    const current = currentRef.current;
    const target = targetRef.current;

    // Smooth coordinate interpolation
    current.px += (target.px - current.px) * 0.22;
    current.py += (target.py - current.py) * 0.22;
    current.nx += (target.nx - current.nx) * 0.2;
    current.ny += (target.ny - current.ny) * 0.2;

    // Decay velocity smoothly
    velocityRef.current *= 0.92;

    wrapper.style.setProperty('--title-mouse-x', `${current.px.toFixed(1)}px`);
    wrapper.style.setProperty('--title-mouse-y', `${current.py.toFixed(1)}px`);
    wrapper.style.setProperty('--mouse-x', `${(current.nx * 100).toFixed(2)}%`);
    wrapper.style.setProperty('--mouse-y', `${(current.ny * 100).toFixed(2)}%`);
    wrapper.style.setProperty('--spotlight-opacity', Math.min(1, proximityRef.current * 1.25).toFixed(3));
    wrapper.style.setProperty('--glow-strength', (0.35 + proximityRef.current * 0.45).toFixed(3));

    updateLetterProximity(current.px, current.py, proximityRef.current);

    const stillMoving =
      Math.abs(target.px - current.px) > 0.5 ||
      Math.abs(target.py - current.py) > 0.5 ||
      proximityRef.current > 0.01 ||
      velocityRef.current > 0.05;

    if (stillMoving) {
      rafRef.current = window.requestAnimationFrame(tick);
    } else {
      rafRef.current = null;
    }
  }, [updateLetterProximity]);

  const startLoop = useCallback(() => {
    if (rafRef.current == null) {
      rafRef.current = window.requestAnimationFrame(tick);
    }
  }, [tick]);

  // Trigger lightweight particle burst on hover enter
  const triggerParticleBurst = useCallback((originX: number, originY: number) => {
    if (reducedMotionRef.current) return;
    const colors = ['#22d3ee', '#9b87f5', '#d946ef', '#ffffff'];
    const newParticles: Particle[] = [];
    const count = 12;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 35 + Math.random() * 45;
      newParticles.push({
        id: Date.now() + i,
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[i % colors.length],
        size: 3 + Math.random() * 3,
        alpha: 0.9,
      });
    }

    setParticles(newParticles);

    if (burstTimerRef.current != null) window.clearTimeout(burstTimerRef.current);
    burstTimerRef.current = window.setTimeout(() => {
      setParticles([]);
    }, 650);
  }, []);

  // Trigger holographic sheen sweep across the title
  const playHoverSheen = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || reducedMotionRef.current || !interactiveRef.current) return;

    wrapper.classList.remove('is-sheening', 'is-glitching');
    void wrapper.offsetWidth;
    wrapper.classList.add('is-sheening', 'is-glitching');
    glitchBoost.set(1);

    if (glitchTimerRef.current != null) window.clearTimeout(glitchTimerRef.current);
    glitchTimerRef.current = window.setTimeout(() => {
      glitchBoost.set(0);
      wrapper.classList.remove('is-glitching');
    }, 140);

    if (sheenTimerRef.current != null) window.clearTimeout(sheenTimerRef.current);
    sheenTimerRef.current = window.setTimeout(() => {
      wrapper.classList.remove('is-sheening');
    }, 900);
  }, [glitchBoost]);

  // Track pointer coordinates, proximity, and velocity
  const handlePointerCoordinates = useCallback(
    (clientX: number, clientY: number) => {
      if (!interactiveRef.current || !wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const pad = 120;
      const inProximity =
        clientX >= rect.left - pad &&
        clientX <= rect.right + pad &&
        clientY >= rect.top - pad &&
        clientY <= rect.bottom + pad;

      if (!inProximity) {
        if (proximityRef.current > 0) {
          proximityRef.current = 0;
          proximity.set(0);
          rotateX.set(0);
          rotateY.set(0);
          translateX.set(0);
          translateY.set(0);
          titleScale.set(1);
          auraX.set(0);
          auraY.set(0);
          resetLetters();
          startLoop();
        }
        return;
      }

      // Calculate velocity
      const now = performance.now();
      const last = lastPointerRef.current;
      if (last.time > 0) {
        const dt = Math.max(1, now - last.time);
        const distMoved = Math.hypot(clientX - last.x, clientY - last.y);
        const speed = (distMoved / dt) * 16;
        velocityRef.current = Math.min(2.5, speed);
      }
      lastPointerRef.current = { x: clientX, y: clientY, time: now };

      const px = clientX - rect.left;
      const py = clientY - rect.top;
      const nx = Math.min(1, Math.max(0, px / rect.width));
      const ny = Math.min(1, Math.max(0, py / rect.height));

      const dx = clientX - (rect.left + rect.width / 2);
      const dy = clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy);
      const radius = Math.max(rect.width, rect.height) * 0.75 + pad;
      const nextProximity = Math.max(0, 1 - dist / radius) * intensityRef.current;

      targetRef.current = { px, py, nx, ny };
      proximityRef.current = nextProximity;
      proximity.set(nextProximity);

      // Micro 3D responsive tilts & magnetic pull: rotateX ±2deg, rotateY ±2deg, translateX ±3px, translateY ±3px, scale 1.018
      rotateX.set((0.5 - ny) * 4 * intensityRef.current);
      rotateY.set((nx - 0.5) * 4 * intensityRef.current);
      translateX.set((nx - 0.5) * 6 * intensityRef.current);
      translateY.set((ny - 0.5) * 6 * intensityRef.current);
      titleScale.set(1 + 0.018 * nextProximity * intensityRef.current);

      auraX.set((nx - 0.5) * 32);
      auraY.set((ny - 0.5) * 22);
      startLoop();
    },
    [auraX, auraY, intensityRef, proximity, resetLetters, rotateX, rotateY, startLoop, titleScale, translateX, translateY]
  );

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    const syncCapabilities = () => {
      reducedMotionRef.current = motionQuery.matches || !pointerQuery.matches;
      interactiveRef.current = !reducedMotionRef.current;
      intensityRef.current = window.innerWidth < 1024 ? 0.6 : 1;
      if (reducedMotionRef.current) {
        resetLetters();
        proximity.set(0);
        rotateX.set(0);
        rotateY.set(0);
        translateX.set(0);
        translateY.set(0);
        titleScale.set(1);
        auraX.set(0);
        auraY.set(0);
        glitchBoost.set(0);
        wrapperRef.current?.classList.remove('is-sheening', 'is-glitching');
      }
    };

    syncCapabilities();
    motionQuery.addEventListener('change', syncCapabilities);
    pointerQuery.addEventListener('change', syncCapabilities);
    window.addEventListener('resize', syncCapabilities);

    const lineAnimation = animate(lineBase, [0, 65, 45], {
      delay: 0.8,
      duration: 1.4,
      ease: 'easeOut',
    });

    const handleWindowPointerMove = (event: PointerEvent) => {
      handlePointerCoordinates(event.clientX, event.clientY);
    };

    window.addEventListener('pointermove', handleWindowPointerMove, { passive: true });

    return () => {
      motionQuery.removeEventListener('change', syncCapabilities);
      pointerQuery.removeEventListener('change', syncCapabilities);
      window.removeEventListener('resize', syncCapabilities);
      window.removeEventListener('pointermove', handleWindowPointerMove);
      lineAnimation.stop();
      if (sheenTimerRef.current != null) window.clearTimeout(sheenTimerRef.current);
      if (glitchTimerRef.current != null) window.clearTimeout(glitchTimerRef.current);
      if (burstTimerRef.current != null) window.clearTimeout(burstTimerRef.current);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [auraX, auraY, glitchBoost, handlePointerCoordinates, lineBase, proximity, resetLetters, rotateX, rotateY, titleScale, translateX, translateY]);

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactiveRef.current) return;
    setCursorState('hover', 'IDENTITY');
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = e.clientX - rect.left;
    const originY = e.clientY - rect.top;
    handlePointerCoordinates(e.clientX, e.clientY);
    playHoverSheen();
    triggerParticleBurst(originX, originY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    handlePointerCoordinates(e.clientX, e.clientY);
  };

  const handlePointerLeave = () => {
    setCursorState('default');
  };

  const characters = Array.from(text);

  return (
    <div
      ref={wrapperRef}
      className={`cursor-reactive-title relative mb-7 max-w-full group cursor-default ${className}`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Dynamic Background Aura Glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-12 -inset-y-10 -z-20 rounded-full blur-3xl"
        style={{
          opacity: auraOpacity,
          scale: auraScale,
          x: auraX,
          y: auraY,
          background:
            'radial-gradient(ellipse at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139,92,246,0.35), rgba(34,211,238,0.20), rgba(217,70,239,0.15), transparent 70%)',
        }}
      />

      {/* Decorative Local Particle Burst on Enter */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full z-40"
          initial={{
            x: p.x,
            y: p.y,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            x: p.x + p.vx,
            y: p.y + p.vy,
            scale: 1,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}`,
          }}
        />
      ))}

      {/* Layer 3: Cyan RGB Chromatic Depth Layer */}
      <motion.div
        aria-hidden="true"
        className={`${rgbLayerClassName} text-cyan-400 opacity-0`}
        style={{ x: rgbOffset, opacity: rgbOpacity }}
      >
        {text}
      </motion.div>

      {/* Layer 4: Magenta RGB Chromatic Depth Layer */}
      <motion.div
        aria-hidden="true"
        className={`${rgbLayerClassName} text-fuchsia-500 opacity-0`}
        style={{ x: rgbOffsetNeg, opacity: rgbOpacity }}
      >
        {text}
      </motion.div>

      {/* 3D Micro-Motion Title Wrapper */}
      <motion.div
        className="relative max-w-full"
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          scale: titleScale,
          transformPerspective: 900,
        }}
      >
        <h1 className={titleClassName} style={{ perspective: 900 }}>
          {/* Layer 1: Base Character Reveal Text with Interactive Proximity Displacement */}
          <motion.span
            className="inline-block relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {characters.map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                variants={letterVariants}
                className="letter-shell inline-block"
                style={{ transformOrigin: 'bottom center' }}
              >
                <span
                  ref={(node) => {
                    letterInnerRefs.current[index] = node;
                  }}
                  className="letter-fill inline-block will-change-transform bg-gradient-to-r from-white via-violet-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(139,92,246,0.35)]"
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              </motion.span>
            ))}
          </motion.span>

          {/* Layer 2: Radiant Cursor-Reactive Spotlight Overlay */}
          <span
            aria-hidden="true"
            className="title-spotlight-overlay absolute inset-0 z-20 pointer-events-none select-none inline-block"
          >
            {characters.map((char, index) => (
              <span key={`spotlight-${char}-${index}`} className="inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>

          {/* Layer 5: Holographic Sheen Sweep Layer */}
          <span
            aria-hidden="true"
            className="title-sheen-overlay absolute inset-0 z-30 pointer-events-none select-none inline-block opacity-0"
          >
            {characters.map((char, index) => (
              <span key={`sheen-${char}-${index}`} className="inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        </h1>
      </motion.div>

      {/* Energy Underline Line */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 bottom-[-14px] h-[2px] rounded-full bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        style={{ width: lineWidth, boxShadow: lineGlow }}
        transition={{ delay: 0.8, duration: 0.6 }}
      />
    </div>
  );
}

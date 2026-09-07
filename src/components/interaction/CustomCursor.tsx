import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { CursorMode } from '@/lib/cursor';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Motion values for pointer coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth physics damping
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device or reduced motion preferences
    const touchCheck = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const isReduced = import.meta.env.PROD ? reducedMotionQuery.matches : false;

    if (touchCheck || isReduced) {
      setIsTouchDevice(true);
      setReducedMotion(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleCustomCursorEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode: CursorMode; text?: string }>;
      if (customEvent.detail) {
        setCursorMode(customEvent.detail.mode || 'default');
        setCursorText(customEvent.detail.text || '');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('set-cursor', handleCustomCursorEvent as EventListener);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('set-cursor', handleCustomCursorEvent as EventListener);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || reducedMotion || !isVisible) {
    return null;
  }

  const isExpanded = cursorMode !== 'default';

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Follow Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-neon-purple/50 bg-neon-purple/10 backdrop-blur-[2px] flex items-center justify-center pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isExpanded ? (cursorText ? 80 : 48) : 32,
          height: isExpanded ? (cursorText ? 80 : 48) : 32,
          borderColor: cursorMode === 'view' ? '#0EA5E9' : cursorMode === 'interact' ? '#D946EF' : '#9b87f5',
          scale: cursorMode === 'hover' ? 1.2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-[10px] font-extrabold uppercase tracking-widest text-foreground font-mono text-center px-1"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-neon-blue pointer-events-none shadow-[0_0_10px_#0EA5E9]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: cursorText ? 0 : 1,
          scale: isExpanded ? 0.5 : 1,
        }}
      />
    </div>
  );
}

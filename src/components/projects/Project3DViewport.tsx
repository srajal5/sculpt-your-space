import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';
import { ExternalLink, ArrowRight, Terminal, Cpu } from 'lucide-react';

interface Project3DViewportProps {
  image: string;
  title: string;
  category: string;
  number: string;
  onOpenCaseStudy: () => void;
}

export default function Project3DViewport({
  image,
  title,
  category,
  number,
  onOpenCaseStudy,
}: Project3DViewportProps) {
  const reduceMotion = useReducedMotionPreference();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);

  // Normalized mouse coords (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.2 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ perspective: 1000 }}
      className="relative w-full cursor-pointer group"
      onClick={onOpenCaseStudy}
    >
      <motion.div
        style={
          reduceMotion
            ? {}
            : {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
        }
        className="relative w-full h-[220px] sm:h-[240px] rounded-2xl border border-white/15 bg-slate-950/80 backdrop-blur-md overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300 group-hover:border-neon-purple/60 group-hover:shadow-[0_20px_45px_rgba(155,135,245,0.25)]"
      >
        {/* Terminal Header Bar */}
        <div className="absolute top-0 inset-x-0 h-7 bg-black/60 backdrop-blur-md border-b border-white/10 px-3 flex items-center justify-between z-20">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/80" />
            <span className="w-2 h-2 rounded-full bg-amber-500/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
          </div>

          <span className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-wider">
            PROJECT // #{number} • {category}
          </span>

          <div className="text-[10px] font-mono text-neon-cyan/70 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            LIVE
          </div>
        </div>

        {/* Project Screenshot or Tech Telemetry Fallback Display */}
        <div className="pt-7 w-full h-full relative overflow-hidden bg-black/60">
          {image && !hasImageError ? (
            <img
              src={image}
              alt={title}
              onError={() => setHasImageError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-slate-950 via-purple-950/30 to-black relative">
              <div className="flex items-center justify-between font-mono text-[10px] text-neon-cyan/80">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-neon-purple" /> PIPELINE_TELEMETRY
                </span>
                <span className="text-emerald-400">STATUS // ACTIVE</span>
              </div>
              <div className="space-y-1 my-auto">
                <div className="font-mono text-xs font-semibold text-white/90 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-neon-purple" /> {title}
                </div>
                <div className="font-mono text-[10px] text-muted-foreground">
                  HIGH-THROUGHPUT RUNTIME • 363/363 VERIFIED
                </div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 border-t border-white/5 pt-2">
                <span>RECORDS: 5,400+</span>
                <span className="text-neon-cyan">LATENCY: &lt;18ms</span>
              </div>
            </div>
          )}

          {/* Vignette Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Glare Lighting Gradient */}
          {!reduceMotion && (
            <motion.div
              style={{
                background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.25) 0%, rgba(155, 135, 245, 0.1) 40%, transparent 70%)`,
              }}
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          )}

          {/* Interactive Action Prompt on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
            <motion.div
              initial={false}
              animate={isHovered ? { scale: 1, y: 0 } : { scale: 0.9, y: 8 }}
              transition={{ duration: 0.2 }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue text-white font-semibold text-xs tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(155,135,245,0.5)]"
            >
              <span>Explore Architecture & Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

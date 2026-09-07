import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PROFILE_DATA } from '@/data/profile';
import { MapPin, GraduationCap, Building2, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { setCursorState } from '@/lib/cursor';

export default function Profile3DCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Mouse position relative to card center (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Cursor position in pixels relative to card for light reflection spotlight
  const lightX = useMotionValue(150);
  const lightY = useMotionValue(150);

  // Smooth physical spring damping configuration
  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };

  // Constrain max rotation to ~6-7 degrees for physical elegance
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

  // Parallax translation depth for layered elements
  const imgZ = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const textZ = useSpring(useTransform(mouseY, [-0.5, 0.5], [25, -25]), springConfig);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (import.meta.env.PROD && mediaQuery.matches) {
      setReducedMotion(true);
    }

    // Trigger scanning line animation once on initial mount
    const timer = setTimeout(() => setScanned(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    // Normalize coordinates from -0.5 (top/left) to 0.5 (bottom/right)
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(normX);
    mouseY.set(normY);

    lightX.set(e.clientX - rect.left);
    lightY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    if (reducedMotion) return;
    setIsHovered(true);
    setCursorState('interact', 'CARD 3D');
  };

  const handleMouseLeave = () => {
    if (reducedMotion) return;
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    setCursorState('default');
  };

  return (
    <div className="relative w-full max-w-[420px] mx-auto perspective-1000 py-4 select-none">
      {/* Subtle Orbital Outer Ring (3D Background Layer) */}
      {!reducedMotion && (
        <motion.div
          className="absolute -inset-10 rounded-full border border-neon-purple/20 pointer-events-none z-0"
          animate={{
            rotateZ: [0, 360],
            rotateX: [65, 70, 65],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            rotateZ: { duration: 25, repeat: Infinity, ease: 'linear' },
            rotateX: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{
            transformStyle: 'preserve-3d',
            background: 'radial-gradient(circle, rgba(155,135,245,0.05) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Main Interactive 3D Floating Glass Profile Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={
          reducedMotion
            ? {}
            : {
              y: isHovered ? -6 : [0, -10, 0],
              rotateZ: isHovered ? 0 : [-0.5, 0.5, -0.5],
            }
        }
        transition={{
          y: isHovered ? { duration: 0.3 } : { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          rotateZ: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="relative z-10 w-full rounded-2xl border border-white/15 bg-slate-950/60 backdrop-blur-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(155,135,245,0.15)] transition-shadow duration-500 hover:shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_45px_rgba(14,165,233,0.25)] group overflow-hidden"
      >
        {/* Dynamic Light Reflection Spotlight (Follows Cursor) */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30"
          style={{
            background: useTransform(
              [lightX, lightY],
              ([x, y]) =>
                `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.12), rgba(155,135,245,0.08) 40%, transparent 80%)`
            ),
          }}
        />

        {/* Outer Border Glow Highlight */}
        <div className="absolute inset-0 rounded-2xl border border-gradient-to-br from-neon-purple/30 via-transparent to-neon-blue/30 pointer-events-none z-20" />

        {/* Signature Digital Identity Scan Line Sweep (Runs once on entrance) */}
        <motion.div
          initial={{ top: '-10%', opacity: 1 }}
          animate={{ top: '110%', opacity: [1, 1, 0] }}
          transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.6 }}
          className="pointer-events-none absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent shadow-[0_0_15px_#0EA5E9] z-40"
        />

        {/* TOP TECHNICAL METADATA ROW */}
        <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mb-4 border-b border-white/10 pb-3">
          <div className="flex items-center gap-1.5 text-neon-purple font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-neon-cyan" />
            <span>01 / PROFILE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-medium tracking-wider text-[10px] uppercase">
              ONLINE
            </span>
          </div>
        </div>

        {/* STATUS INDICATOR BADGE */}
        <div className="mb-4 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{PROFILE_DATA.status}</span>
          </div>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[10px] font-mono text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/30 px-2 py-0.5 rounded"
            >
              INTERACTIVE 3D
            </motion.span>
          )}
        </div>

        {/* PROFILE PORTRAIT IMAGE AREA (PARALLAX LAYER) */}
        <motion.div
          style={{ translateZ: imgZ }}
          className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-5 border border-white/15 shadow-inner bg-slate-900 group/img"
        >
          <img
            src="./src/Imagecomponents/a757c937-345b-4de3-8ccb-97dd899bdbcc.png"
            alt={PROFILE_DATA.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
            onError={(e) => {
              // Fallback to placeholder if avatar fail to load
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          {/* Subtle Overlay Gradient for Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

          {/* Verification Badge overlay on Image */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium text-foreground">
            <CheckCircle2 className="w-3.5 h-3.5 text-neon-blue" />
            <span>Identity Verified</span>
          </div>
        </motion.div>

        {/* PROFILE INFORMATION (PARALLAX LAYER) */}
        <motion.div style={{ translateZ: textZ }} className="space-y-3">
          {/* Name & Primary Role */}
          <div>
            <h3 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>{PROFILE_DATA.name}</span>
              <Sparkles className="w-4 h-4 text-neon-purple animate-pulse" />
            </h3>
            <p className="text-sm font-semibold bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-blue bg-clip-text text-transparent mt-0.5">
              {PROFILE_DATA.role}
            </p>
          </div>

          {/* Education & Location Meta Rows */}
          <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-neon-purple shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="font-semibold text-white">{PROFILE_DATA.course}</span>
                <span className="text-slate-500"> • </span>
                <span className="text-slate-400">{PROFILE_DATA.college}</span>
                <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                  CGPA: {PROFILE_DATA.cgpa} · {PROFILE_DATA.educationPeriod}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neon-cyan shrink-0" />
                <span className="text-slate-300">{PROFILE_DATA.location}</span>
              </div>
              <span className="text-[11px] font-mono text-neon-blue bg-neon-blue/10 px-2 py-0.5 rounded border border-neon-blue/20">
                AI + Full-Stack
              </span>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM TECHNICAL METADATA FOOTER */}
        <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span className="hover:text-neon-purple transition-colors">
            {PROFILE_DATA.course} · CGPA {PROFILE_DATA.cgpa}
          </span>
          <span className="hover:text-neon-cyan transition-colors">
            {PROFILE_DATA.location.toUpperCase()}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

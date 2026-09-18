import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';
import { PROFILE_DATA } from '@/data/profile';
import { MapPin, GraduationCap, Building2, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { setCursorState } from '@/lib/cursor';
import ProfileImg from '@/Imagecomponents/a757c937-345b-4de3-8ccb-97dd899bdbcc.png';

export default function Profile3DCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [scanned, setScanned] = useState(false);
  const reduceMotion = useReducedMotionPreference();

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
    // Trigger scanning line animation once on initial mount
    const timer = setTimeout(() => setScanned(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    // Coordinates for light reflection spotlight
    lightX.set(e.clientX - rect.left);
    lightY.set(e.clientY - rect.top);

    if (reduceMotion) return;

    // Normalize coordinates from -0.5 (top/left) to 0.5 (bottom/right)
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCursorState('interact', reduceMotion ? 'PROFILE' : 'CARD 3D');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    setCursorState('default');
  };

  return (
    <div className="relative w-full max-w-[400px] mx-auto perspective-1000 py-1 select-none">
      {/* Orbital Outer Ring Layer */}
      {!reduceMotion ? (
        <motion.div
          className="absolute -inset-8 rounded-full border border-neon-purple/15 pointer-events-none z-0"
          animate={{
            rotateZ: [0, 360],
            rotateX: [65, 70, 65],
            scale: [0.96, 1.04, 0.96],
          }}
          transition={{
            rotateZ: { duration: 25, repeat: Infinity, ease: 'linear' },
            rotateX: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{
            transformStyle: 'preserve-3d',
            background: 'radial-gradient(circle, rgba(155,135,245,0.04) 0%, transparent 70%)',
          }}
        />
      ) : (
        <motion.div
          className="absolute -inset-6 rounded-full border border-neon-purple/20 pointer-events-none z-0"
          animate={{
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'radial-gradient(circle, rgba(155,135,245,0.05) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Main Interactive Glass Profile Card */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          transformStyle: reduceMotion ? 'flat' : 'preserve-3d',
        }}
        animate={
          reduceMotion
            ? {
                boxShadow: isHovered
                  ? '0 20px 60px rgba(0,0,0,0.85), 0 0 35px rgba(14,165,233,0.25)'
                  : '0 16px 50px rgba(0,0,0,0.8), 0 0 20px rgba(155,135,245,0.12)',
              }
            : {
                y: isHovered ? -5 : [0, -8, 0],
                rotateZ: isHovered ? 0 : [-0.4, 0.4, -0.4],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0.3 }
            : {
                y: isHovered ? { duration: 0.3 } : { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                rotateZ: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
              }
        }
        className="relative z-10 w-full rounded-2xl border border-white/15 bg-slate-950/60 backdrop-blur-2xl p-5 shadow-[0_16px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(155,135,245,0.12)] transition-all duration-300 hover:border-white/30 group overflow-hidden"
      >
        {/* Dynamic Light Reflection Spotlight (Follows Cursor) */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-30"
          style={{
            background: useTransform(
              [lightX, lightY],
              ([x, y]) =>
                `radial-gradient(350px circle at ${x}px ${y}px, rgba(255,255,255,0.12), rgba(155,135,245,0.08) 40%, transparent 80%)`
            ),
          }}
        />

        {/* Outer Border Glow Highlight */}
        <div className="absolute inset-0 rounded-2xl border border-gradient-to-br from-neon-purple/20 via-transparent to-neon-blue/20 pointer-events-none z-20" />

        {/* Signature Digital Identity Scan Line Sweep (Runs once on entrance) */}
        <motion.div
          initial={{ top: '-10%', opacity: 1 }}
          animate={{ top: '110%', opacity: [1, 1, 0] }}
          transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.6 }}
          className="pointer-events-none absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent shadow-[0_0_15px_#0EA5E9] z-40"
        />

        {/* TOP TECHNICAL METADATA ROW */}
        <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground mb-3 border-b border-white/10 pb-2.5">
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
        <div className="mb-3 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{PROFILE_DATA.status}</span>
          </div>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[10px] font-mono text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/30 px-2 py-0.5 rounded"
            >
              {reduceMotion ? 'ACCESSIBLE PROFILE' : 'INTERACTIVE 3D'}
            </motion.span>
          )}
        </div>

        {/* PROFILE PORTRAIT IMAGE AREA (PARALLAX LAYER) */}
        <motion.div
          style={{ translateZ: reduceMotion ? 0 : imgZ }}
          className="relative w-full aspect-[16/11] rounded-xl overflow-hidden mb-3 border border-white/15 shadow-inner bg-slate-900 group/img"
        >
          <img
            src={ProfileImg}
            alt={PROFILE_DATA.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
            onError={(e) => {
              // Fallback to placeholder if avatar fails to load
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          {/* Subtle Overlay Gradient for Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

          {/* Verification Badge overlay on Image */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-medium text-foreground">
            <CheckCircle2 className="w-3 h-3 text-neon-blue" />
            <span>Identity Verified</span>
          </div>
        </motion.div>

        {/* PROFILE INFORMATION (PARALLAX LAYER) */}
        <motion.div style={{ translateZ: reduceMotion ? 0 : textZ }} className="space-y-2">
          {/* Name & Primary Role */}
          <div>
            <h3 className="text-lg sm:text-xl font-sans font-bold tracking-tight text-white flex items-center gap-2">
              <span>{PROFILE_DATA.name}</span>
              <Sparkles className="w-4 h-4 text-neon-purple animate-pulse" />
            </h3>
            <p className="text-xs sm:text-sm font-sans font-semibold bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-blue bg-clip-text text-transparent mt-0.5">
              {PROFILE_DATA.role}
            </p>
          </div>

          {/* Education & Location Meta Rows */}
          <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-neon-purple shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="font-sans font-semibold text-white">{PROFILE_DATA.course}</span>
                <span className="text-slate-500"> • </span>
                <span className="font-sans text-slate-400">{PROFILE_DATA.college}</span>
                <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                  CGPA: {PROFILE_DATA.cgpa} · {PROFILE_DATA.educationPeriod}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neon-cyan shrink-0" />
                <span className="font-sans text-slate-300 text-xs">{PROFILE_DATA.location}</span>
              </div>
              <span className="text-[10px] font-mono text-neon-blue bg-neon-blue/10 px-2 py-0.5 rounded border border-neon-blue/20">
                AI + Full-Stack
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

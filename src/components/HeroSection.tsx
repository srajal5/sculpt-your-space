import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/animation/MagneticButton';
import CursorReactiveText from '@/components/animation/CursorReactiveText';
import RoleSwitcher from '@/components/animation/RoleSwitcher';
import KineticHeroStatement from '@/components/animation/KineticHeroStatement';
import Profile3DCard from '@/components/profile/Profile3DCard';
import { PROFILE_DATA } from '@/data/profile';
import {
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Sparkles,
  ArrowDown,
} from 'lucide-react';
import { setCursorState } from '@/lib/cursor';

export default function HeroSection() {
  const reduceMotion = useReducedMotionPreference();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Parallax motion values normalized from -1 to 1
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 120, mass: 0.5 };

  // Multi-depth parallax springs for hero layers
  const bgParallaxX = useSpring(useTransform(mouseX, [-1, 1], [-8, 8]), springConfig);
  const bgParallaxY = useSpring(useTransform(mouseY, [-1, 1], [-8, 8]), springConfig);
  const textParallaxX = useSpring(useTransform(mouseX, [-1, 1], [-4, 4]), springConfig);
  const textParallaxY = useSpring(useTransform(mouseY, [-1, 1], [-4, 4]), springConfig);
  const cardParallaxX = useSpring(useTransform(mouseX, [-1, 1], [-8, 8]), springConfig);
  const cardParallaxY = useSpring(useTransform(mouseY, [-1, 1], [-8, 8]), springConfig);

  // Smooth ambient glow follower
  const glowFollowX = useSpring(useTransform(mouseX, [-1, 1], [-140, 140]), { damping: 32, stiffness: 70 });
  const glowFollowY = useSpring(useTransform(mouseY, [-1, 1], [-100, 100]), { damping: 32, stiffness: 70 });

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || isTouchDevice) return;
    const { innerWidth, innerHeight } = window;
    const nx = (e.clientX / innerWidth) * 2 - 1;
    const ny = (e.clientY / innerHeight) * 2 - 1;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  /* --------------------------------
     Timeline Entrance Variants
  --------------------------------- */

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const leftItemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -25,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 95,
        damping: 15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.92,
      x: 35,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 16,
        delay: 0.35,
      },
    },
  };

  return (
    <section
      id="home"
      onPointerMove={handlePointerMove}
      className="
        section
        relative
        pt-28
        pb-16
        min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden
      "
    >
      {/* =========================================
          BACKGROUND ATMOSPHERE WITH SMOOTH PARALLAX
      ========================================== */}

      {/* Ambient Mouse Glow Follower */}
      {!reduceMotion && !isTouchDevice && (
        <motion.div
          aria-hidden="true"
          style={{ x: glowFollowX, y: glowFollowY }}
          className="
            pointer-events-none
            absolute
            w-[520px]
            h-[520px]
            rounded-full
            bg-gradient-to-r
            from-neon-purple/12
            via-neon-cyan/8
            to-neon-pink/6
            blur-[140px]
            -z-10
          "
        />
      )}

      {/* Purple atmospheric glow */}
      <motion.div
        aria-hidden="true"
        style={{ x: bgParallaxX, y: bgParallaxY }}
        className="
          absolute
          top-1/4
          left-1/4
          w-[500px]
          h-[500px]
          bg-neon-purple/10
          rounded-full
          blur-[150px]
          pointer-events-none
          -z-10
        "
      />

      {/* Cyan atmospheric glow */}
      <motion.div
        aria-hidden="true"
        style={{ x: bgParallaxX, y: bgParallaxY }}
        className="
          absolute
          top-1/2
          right-1/4
          w-[450px]
          h-[450px]
          bg-neon-cyan/10
          rounded-full
          blur-[150px]
          pointer-events-none
          -z-10
        "
      />

      {/* Pink atmospheric glow */}
      <div
        aria-hidden="true"
        className="
          absolute
          bottom-0
          left-1/2
          -translate-x-1/2
          w-[350px]
          h-[250px]
          bg-neon-pink/5
          rounded-full
          blur-[120px]
          pointer-events-none
          -z-10
        "
      />

      {/* =========================================
          FLOATING DECORATIVE MICRO-UI
      ========================================== */}
      {!reduceMotion && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-32 right-10 hidden xl:flex flex-col gap-2 font-mono text-[10px] text-white/40 select-none z-0"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-md border border-white/10 bg-white/5 backdrop-blur-md shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-neon-cyan font-semibold">SYS_STATE //</span>
              <span className="text-emerald-400 font-bold">ONLINE</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-md border border-white/10 bg-white/5 backdrop-blur-md shadow-sm">
              <span className="text-neon-purple font-semibold">EDUCATION //</span>
              <span className="text-slate-300">MCA ({PROFILE_DATA.cgpa} CGPA)</span>
            </div>
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-44 left-8 hidden 2xl:flex items-center gap-2 font-mono text-[9px] text-neon-blue/50 uppercase tracking-widest z-0"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="w-2 h-2 border-t border-l border-neon-blue/60" />
            <span>AI ENGINE // Dr. D. Y. Patil SST · Pune</span>
          </motion.div>
        </>
      )}

      {/* =========================================
          MAIN HERO CONTAINER
      ========================================== */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="
            grid
            grid-cols-1
            lg:grid-cols-12
            gap-12
            lg:gap-8
            items-center
          "
        >
          {/* =========================================
              LEFT SIDE — TYPOGRAPHY & IDENTITY
          ========================================== */}

          <motion.div
            style={{
              x: reduceMotion || isTouchDevice ? 0 : textParallaxX,
              y: reduceMotion || isTouchDevice ? 0 : textParallaxY,
            }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* =====================================
                EYEBROW (0.1s entrance)
            ====================================== */}

            <motion.div
              variants={leftItemVariants}
              className="mb-5"
            >
              <motion.span
                whileHover={{
                  boxShadow: '0 0 28px rgba(14,165,233,0.28)',
                  borderColor: 'rgba(14,165,233,0.45)',
                }}
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-1.5
                  text-xs
                  font-mono
                  font-bold
                  tracking-[0.18em]
                  text-neon-blue
                  uppercase
                  bg-neon-blue/10
                  border
                  border-neon-blue/20
                  rounded-full
                  shadow-[0_0_20px_rgba(14,165,233,0.15)]
                  backdrop-blur-sm
                "
              >
                <motion.span
                  whileHover={{ rotate: 18, scale: 1.12 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 16 }}
                  className="inline-flex"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                </motion.span>

                {PROFILE_DATA.eyebrow}
              </motion.span>
            </motion.div>

            {/* Title: Srajal Puri with Cursor Spotlight & Two-Layer System */}
            <CursorReactiveText text={PROFILE_DATA.name} />

            {/* Rotating Professional Role Switcher */}
            <motion.div variants={leftItemVariants}>
              <RoleSwitcher />
            </motion.div>

            {/* Kinetic Technology Statement */}
            <KineticHeroStatement />

            {/* =====================================
                DESCRIPTION / TAGLINE (With Local Readability Glow)
            ====================================== */}

            <motion.div
              variants={leftItemVariants}
              className="relative max-w-2xl mb-8"
            >
              {/* Local Readability Dark Radial Glow */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  -inset-4
                  rounded-2xl
                  bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.50),transparent_70%)]
                  blur-2xl
                  pointer-events-none
                  -z-10
                "
              />

              <p
                className="
                  text-base
                  sm:text-lg
                  text-foreground/75
                  leading-relaxed
                  font-normal
                  transition-colors
                  duration-300
                "
              >
                MCA student specializing in{' '}
                <motion.span
                  whileHover={{ y: -1, scale: 1.015 }}
                  className="inline-block text-neon-purple font-medium cursor-default transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(155,135,245,0.8)]"
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                >
                  Artificial Intelligence
                </motion.span>
                ,{' '}
                <motion.span
                  whileHover={{ y: -1, scale: 1.015 }}
                  className="inline-block text-neon-purple font-medium cursor-default transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(155,135,245,0.8)]"
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                >
                  Generative AI
                </motion.span>
                , and{' '}
                <motion.span
                  whileHover={{ y: -1, scale: 1.015 }}
                  className="inline-block text-white/95 font-medium cursor-default transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                >
                  Full Stack AI Engineering
                </motion.span>{' '}
                — building AI-powered applications and workflows with{' '}
                <motion.span
                  whileHover={{ y: -1, scale: 1.015 }}
                  className="inline-block text-neon-blue font-medium cursor-default transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(14,165,233,0.8)]"
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                >
                  Python
                </motion.span>
                ,{' '}
                <motion.span
                  whileHover={{ y: -1, scale: 1.015 }}
                  className="inline-block text-emerald-400 font-medium cursor-default transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                >
                  FastAPI
                </motion.span>
                ,{' '}
                <motion.span
                  whileHover={{ y: -1, scale: 1.015 }}
                  className="inline-block text-cyan-400 font-medium cursor-default transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                >
                  React.js
                </motion.span>
                ,{' '}
                <motion.span
                  whileHover={{ y: -1, scale: 1.015 }}
                  className="inline-block text-purple-300 font-medium cursor-default transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(216,180,254,0.8)]"
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                >
                  MongoDB
                </motion.span>
                , and{' '}
                <motion.span
                  whileHover={{ y: -1, scale: 1.015 }}
                  className="inline-block text-neon-pink font-medium cursor-default transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]"
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                >
                  LLM APIs
                </motion.span>
                .
              </p>
            </motion.div>

            {/* =====================================
                CTA BUTTONS
            ====================================== */}

            <motion.div
              variants={leftItemVariants}
              className="
                flex
                flex-wrap
                gap-4
                items-center
                mb-10
              "
            >
              {/* Primary CTA */}
              <MagneticButton magneticStrength={0.25}>
                <Button
                  size="lg"
                  className="
                    relative
                    overflow-hidden
                    bg-gradient-to-r
                    from-neon-purple
                    via-neon-blue
                    to-neon-cyan
                    text-white
                    border-0
                    font-bold
                    px-8
                    py-6
                    rounded-xl
                    shadow-[0_0_25px_rgba(155,135,245,0.35)]
                    hover:shadow-[0_0_40px_rgba(14,165,233,0.6)]
                    transition-all
                    duration-300
                    group
                  "
                  asChild
                  onMouseEnter={() =>
                    setCursorState('hover', 'EXPLORE')
                  }
                  onMouseLeave={() =>
                    setCursorState('default')
                  }
                >
                  <a
                    href="#projects"
                    className="flex items-center gap-2 text-base"
                  >
                    Explore My Work

                    <ArrowRight
                      className="
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        group-hover:translate-x-1.5
                      "
                    />
                  </a>
                </Button>
              </MagneticButton>

              {/* Secondary CTA */}
              <MagneticButton magneticStrength={0.25}>
                <Button
                  variant="outline"
                  size="lg"
                  className="
                    border-white/15
                    bg-white/5
                    backdrop-blur-md
                    text-foreground
                    hover:bg-white/15
                    px-8
                    py-6
                    rounded-xl
                    transition-all
                    duration-300
                    hover:border-neon-purple
                    hover:shadow-[0_0_25px_rgba(155,135,245,0.25)]
                  "
                  asChild
                  onMouseEnter={() =>
                    setCursorState('hover', 'CONNECT')
                  }
                  onMouseLeave={() =>
                    setCursorState('default')
                  }
                >
                  <a
                    href="#contact"
                    className="
                      flex
                      items-center
                      gap-2
                      text-base
                      font-semibold
                    "
                  >
                    Let's Connect

                    <Mail
                      className="
                        h-4
                        w-4
                        text-neon-purple
                      "
                    />
                  </a>
                </Button>
              </MagneticButton>
            </motion.div>

            {/* =====================================
                SOCIALS
            ====================================== */}

            <motion.div
              variants={leftItemVariants}
              className="flex items-center gap-4"
            >
              <span
                className="
                  text-xs
                  font-mono
                  text-muted-foreground
                  uppercase
                  tracking-widest
                  mr-2
                  hidden
                  sm:inline-block
                "
              >
                Socials //
              </span>

              {[
                {
                  icon: <Github className="w-5 h-5" />,
                  href: PROFILE_DATA.socials.github,
                  label: 'GitHub',
                },
                {
                  icon: <Linkedin className="w-5 h-5" />,
                  href: PROFILE_DATA.socials.linkedin,
                  label: 'LinkedIn',
                },
                {
                  icon: <Twitter className="w-5 h-5" />,
                  href: PROFILE_DATA.socials.twitter,
                  label: 'Twitter',
                },
                {
                  icon: <Mail className="w-5 h-5" />,
                  href: PROFILE_DATA.socials.email,
                  label: 'Email',
                },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{
                    scale: 1.15,
                    y: -3,
                    backgroundColor:
                      'rgba(155, 135, 245, 0.2)',
                    borderColor:
                      'rgba(155, 135, 245, 0.4)',
                    boxShadow:
                      '0 0 20px rgba(155, 135, 245, 0.25)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 15,
                  }}
                  className="
                    w-11
                    h-11
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-md
                    flex
                    items-center
                    justify-center
                    text-muted-foreground
                    hover:text-foreground
                    transition-colors
                    duration-300
                    shadow-sm
                  "
                  onMouseEnter={() =>
                    setCursorState('hover')
                  }
                  onMouseLeave={() =>
                    setCursorState('default')
                  }
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* =========================================
              RIGHT SIDE — 3D PROFILE CARD WITH PARALLAX
          ========================================== */}

          <motion.div
            variants={cardVariants}
            style={{
              x: reduceMotion || isTouchDevice ? 0 : cardParallaxX,
              y: reduceMotion || isTouchDevice ? 0 : cardParallaxY,
            }}
            className="
              lg:col-span-5
              flex
              justify-center
              items-center
              w-full
            "
          >
            <Profile3DCard />
          </motion.div>
        </motion.div>

        {/* =========================================
            SCROLL INDICATOR (Interactive Pulse & Bounce)
        ========================================== */}

        <motion.a
          href="#projects"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            y: [0, 8, 0],
          }}
          transition={{
            delay: 1.6,
            repeat: Infinity,
            duration: 2.2,
          }}
          whileHover={{
            scale: 1.08,
          }}
          className="
            mt-12
            lg:mt-16
            text-muted-foreground
            hover:text-neon-cyan
            transition-all
            duration-300
            flex
            flex-col
            items-center
            gap-1.5
            mx-auto
            w-fit
            group
          "
          aria-label="Scroll down to projects"
          onMouseEnter={() =>
            setCursorState('hover', 'SCROLL')
          }
          onMouseLeave={() =>
            setCursorState('default')
          }
        >
          <span
            className="
              text-[10px]
              font-mono
              uppercase
              tracking-widest
              text-muted-foreground/70
              group-hover:text-neon-cyan
              group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]
              transition-colors
            "
          >
            SCROLL TO EXPLORE
          </span>

          <div className="relative flex items-center justify-center">
            <span className="absolute w-6 h-6 rounded-full bg-neon-cyan/20 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
            <ArrowDown
              size={18}
              className="text-neon-blue group-hover:text-neon-cyan group-hover:translate-y-1 transition-transform duration-300"
            />
          </div>
        </motion.a>
      </div>
    </section>
  );
}
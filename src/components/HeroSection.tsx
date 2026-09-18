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
import RecruiterProofStrip from '@/components/hero/RecruiterProofStrip';
import {
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Sparkles,
  ArrowDown,
  FileText,
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
        pt-24
        sm:pt-28
        lg:pt-[104px]
        pb-14
        min-h-[calc(100vh-4rem)]
        lg:min-h-[calc(100vh-72px)]
        flex
        flex-col
        justify-start
        lg:justify-center
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
          MAIN HERO CONTAINER
      ========================================== */}
      <div className="w-full max-w-[1440px] xl:max-w-[1480px] mx-auto px-6 lg:px-8 xl:px-10 z-10 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="
            grid
            grid-cols-1
            lg:grid-cols-12
            gap-10
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
            {/* Title: Srajal Puri with Cursor Spotlight & Two-Layer System */}
            <CursorReactiveText text={PROFILE_DATA.name} />

            {/* Rotating Professional Role Switcher */}
            <motion.div variants={leftItemVariants} className="mb-1">
              <RoleSwitcher />
            </motion.div>

            {/* Kinetic Technology Statement */}
            <KineticHeroStatement />

            {/* =====================================
                SUPPORTING PROFESSIONAL NARRATIVE
            ====================================== */}
            <motion.div
              variants={leftItemVariants}
              className="relative max-w-[720px] mb-7 sm:mb-8"
            >
              <p
                className="
                  text-base
                  sm:text-lg
                  text-foreground/80
                  leading-relaxed
                  font-sans
                  font-normal
                  transition-colors
                  duration-300
                "
              >
                Currently pursuing my MCA with a focus on{' '}
                <span className="text-white font-medium">Artificial Intelligence</span>,{' '}
                <span className="text-neon-purple font-medium">Generative AI</span>, and{' '}
                <span className="text-neon-cyan font-medium">production-oriented software engineering</span>.
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
                mb-6
                sm:mb-7
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
                    px-7
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

              {/* Resume Download CTA */}
              <MagneticButton magneticStrength={0.25}>
                <Button
                  variant="outline"
                  size="lg"
                  className="
                    border-neon-cyan/40
                    bg-neon-cyan/10
                    backdrop-blur-md
                    text-foreground
                    hover:bg-neon-cyan/20
                    hover:border-neon-cyan
                    px-7
                    py-6
                    rounded-xl
                    transition-all
                    duration-300
                    shadow-[0_0_20px_rgba(34,211,238,0.15)]
                    hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]
                  "
                  asChild
                  onMouseEnter={() =>
                    setCursorState('hover', 'RESUME')
                  }
                  onMouseLeave={() =>
                    setCursorState('default')
                  }
                >
                  <a
                    href={PROFILE_DATA.resumeUrl}
                    download="Srajal_Puri_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      items-center
                      gap-2
                      text-base
                      font-semibold
                    "
                  >
                    Download Resume

                    <FileText
                      className="
                        h-4
                        w-4
                        text-neon-cyan
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
                    px-7
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
                  whileHover={
                    !reduceMotion
                      ? {
                        scale: 1.15,
                        y: -3,
                        backgroundColor: 'rgba(155, 135, 245, 0.2)',
                        borderColor: 'rgba(155, 135, 245, 0.4)',
                        boxShadow: '0 0 20px rgba(155, 135, 245, 0.25)',
                      }
                      : {
                        backgroundColor: 'rgba(155, 135, 245, 0.25)',
                        borderColor: 'rgba(155, 135, 245, 0.5)',
                        boxShadow: '0 0 20px rgba(155, 135, 245, 0.35)',
                      }
                  }
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
              self-center
              w-full
              mt-4
              lg:mt-0
            "
          >
            <Profile3DCard />
          </motion.div>
        </motion.div>

        {/* =========================================
            RECRUITER PROOF STRIP (VERIFIED METRICS)
        ========================================== */}
        <RecruiterProofStrip />

        {/* =========================================
            SCROLL INDICATOR
        ========================================== */}

        <motion.a
          href="#projects"
          initial={{
            opacity: 0,
          }}
          animate={
            !reduceMotion
              ? {
                opacity: 1,
                y: [0, 8, 0],
              }
              : {
                opacity: 1,
              }
          }
          transition={
            !reduceMotion
              ? {
                delay: 1.6,
                repeat: Infinity,
                duration: 2.2,
              }
              : {
                delay: 0.8,
                duration: 0.6,
              }
          }
          whileHover={!reduceMotion ? { scale: 1.08 } : undefined}
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
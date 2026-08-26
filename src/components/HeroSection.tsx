import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/animation/MagneticButton';
import { TextReveal } from '@/components/animation/TextReveal';
import Profile3DCard from '@/components/profile/Profile3DCard';
import { PROFILE_DATA } from '@/data/profile';
import { ArrowRight, Github, Linkedin, Twitter, Mail, Sparkles, ArrowDown } from 'lucide-react';
import { setCursorState } from '@/lib/cursor';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const leftItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 90, damping: 14 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 85, damping: 15, delay: 0.3 },
    },
  };

  return (
    <section id="home" className="section relative pt-28 pb-16 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Radial Glow Filters for Text & Card Readability */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-neon-purple/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-neon-cyan/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* LEFT SIDE: Professional Introduction & Actions (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Small Eyebrow Category Label */}
            <motion.div variants={leftItemVariants} className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-mono font-bold tracking-widest text-neon-blue uppercase bg-neon-blue/10 border border-neon-blue/20 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.15)]">
                <Sparkles className="w-3.5 h-3.5 text-neon-blue animate-pulse" />
                CREATIVE DEVELOPER / 3D ENGINEER
              </span>
            </motion.div>

            {/* Main Name Title Reveal */}
            <div className="mb-4">
              <TextReveal
                text={PROFILE_DATA.name}
                as="h1"
                className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-gradient leading-none drop-shadow-[0_0_35px_rgba(155,135,245,0.3)]"
              />
            </div>

            {/* Professional Role & Positioning Statement */}
            <motion.h2
              variants={leftItemVariants}
              className="text-xl sm:text-2xl lg:text-3xl font-light mb-5 text-foreground/90 leading-snug"
            >
              Building intelligent and immersive digital experiences with{' '}
              <span className="font-semibold text-neon-purple underline decoration-neon-purple/30 underline-offset-4">
                React
              </span>{' '}
              +{' '}
              <span className="font-semibold text-neon-cyan underline decoration-neon-cyan/30 underline-offset-4">
                AI
              </span>{' '}
              +{' '}
              <span className="font-semibold text-neon-blue underline decoration-neon-blue/30 underline-offset-4">
                3D/WebGL
              </span>{' '}
              +{' '}
              <span className="font-semibold text-neon-pink underline decoration-neon-pink/30 underline-offset-4">
                Full-Stack
              </span>
            </motion.h2>

            {/* Concise Tagline */}
            <motion.p
              variants={leftItemVariants}
              className="text-base sm:text-lg text-muted-foreground/80 max-w-2xl mb-8 leading-relaxed font-light"
            >
              {PROFILE_DATA.tagline}
            </motion.p>

            {/* Interactive Primary & Secondary CTA Buttons */}
            <motion.div variants={leftItemVariants} className="flex flex-wrap gap-4 items-center mb-10">
              <MagneticButton magneticStrength={0.25}>
                <Button
                  size="lg"
                  className="relative overflow-hidden bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan text-white border-0 font-bold px-8 py-6 rounded-xl shadow-[0_0_25px_rgba(155,135,245,0.35)] hover:shadow-[0_0_35px_rgba(14,165,233,0.6)] transition-all duration-300 group"
                  asChild
                  onMouseEnter={() => setCursorState('hover', 'EXPLORE')}
                  onMouseLeave={() => setCursorState('default')}
                >
                  <a href="#projects" className="flex items-center gap-2 text-base">
                    Explore My Work
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </a>
                </Button>
              </MagneticButton>

              <MagneticButton magneticStrength={0.25}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/15 bg-white/5 backdrop-blur-md text-foreground hover:bg-white/15 px-8 py-6 rounded-xl transition-all duration-300 hover:border-neon-purple hover:shadow-[0_0_20px_rgba(155,135,245,0.25)]"
                  asChild
                  onMouseEnter={() => setCursorState('hover', 'CONNECT')}
                  onMouseLeave={() => setCursorState('default')}
                >
                  <a href="#contact" className="flex items-center gap-2 text-base font-semibold">
                    Let's Connect
                    <Mail className="h-4 w-4 text-neon-purple" />
                  </a>
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Social Media Links */}
            <motion.div variants={leftItemVariants} className="flex items-center gap-4">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mr-2 hidden sm:inline-block">
                Socials //
              </span>
              {[
                { icon: <Github className="w-5 h-5" />, href: PROFILE_DATA.socials.github, label: 'GitHub' },
                { icon: <Linkedin className="w-5 h-5" />, href: PROFILE_DATA.socials.linkedin, label: 'LinkedIn' },
                { icon: <Twitter className="w-5 h-5" />, href: PROFILE_DATA.socials.twitter, label: 'Twitter' },
                { icon: <Mail className="w-5 h-5" />, href: PROFILE_DATA.socials.email, label: 'Email' },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{
                    scale: 1.15,
                    backgroundColor: 'rgba(155, 135, 245, 0.2)',
                    borderColor: 'rgba(155, 135, 245, 0.4)',
                  }}
                  className="w-11 h-11 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300 shadow-sm"
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT SIDE: Interactive 3D Profile Card (col-span-5) */}
          <motion.div variants={cardVariants} className="lg:col-span-5 flex justify-center items-center w-full">
            <Profile3DCard />
          </motion.div>
        </motion.div>

        {/* Bottom Scroll Indicator */}
        <motion.a
          href="#projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.6, repeat: Infinity, duration: 2.2 }}
          className="mt-12 lg:mt-16 text-muted-foreground hover:text-neon-purple transition-colors duration-300 flex flex-col items-center gap-1.5 mx-auto w-fit"
          aria-label="Scroll down to projects"
          onMouseEnter={() => setCursorState('hover', 'SCROLL')}
          onMouseLeave={() => setCursorState('default')}
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70">
            SCROLL TO EXPLORE
          </span>
          <ArrowDown size={18} className="text-neon-blue" />
        </motion.a>
      </div>
    </section>
  );
}

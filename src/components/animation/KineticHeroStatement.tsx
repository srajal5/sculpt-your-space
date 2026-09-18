import { Fragment, type CSSProperties } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';
import { setCursorState } from '@/lib/cursor';

interface TechItem {
  label: string;
  className: string;
  glow: string;
}

const LEAD_WORDS: { text: string; emphasis: boolean }[] = [
  { text: 'Building', emphasis: false },
  { text: 'AI-powered', emphasis: true },
  { text: 'applications', emphasis: false },
  { text: 'and', emphasis: false },
  { text: 'scalable', emphasis: true },
  { text: 'full-stack', emphasis: true },
  { text: 'systems', emphasis: false },
  { text: 'across', emphasis: false },
  { text: 'Generative', emphasis: true },
  { text: 'AI,', emphasis: true },
  { text: 'computer', emphasis: false },
  { text: 'vision,', emphasis: false },
  { text: 'and', emphasis: false },
  { text: 'backend', emphasis: true },
  { text: 'engineering.', emphasis: false },
];

const TECH_ITEMS: TechItem[] = [
  {
    label: 'Python',
    className: 'text-cyan-400 decoration-cyan-400/30',
    glow: 'rgba(34,211,238,0.3)',
  },
  {
    label: 'Generative AI',
    className: 'text-neon-purple decoration-neon-purple/30',
    glow: 'rgba(155,135,245,0.35)',
  },
  {
    label: 'React',
    className: 'text-cyan-400 decoration-cyan-400/30',
    glow: 'rgba(34,211,238,0.3)',
  },
  {
    label: 'FastAPI',
    className: 'text-emerald-400 decoration-emerald-400/30',
    glow: 'rgba(52,211,153,0.3)',
  },
  {
    label: 'Computer Vision',
    className: 'text-neon-pink decoration-neon-pink/30',
    glow: 'rgba(217,70,239,0.3)',
  },
];

const wordVariantsNormal: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.32,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const wordVariantsReduced: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

const sentenceVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.038,
      delayChildren: 0.35,
    },
  },
};

const techVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.72,
    },
  },
};

export default function KineticHeroStatement() {
  const reduceMotion = useReducedMotionPreference();
  const wordVariants = reduceMotion ? wordVariantsReduced : wordVariantsNormal;

  return (
    <div className="mb-4 sm:mb-5 max-w-[720px]">
      <motion.h2
        className="text-lg sm:text-xl lg:text-[1.45rem] font-sans font-normal text-foreground/90 leading-snug"
        variants={sentenceVariants}
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
      >
        {LEAD_WORDS.map((word) => (
          <motion.span
            key={word.text}
            variants={wordVariants}
            className={`inline-block mr-[0.28em] ${
              word.emphasis
                ? 'font-medium text-foreground tracking-tight'
                : 'text-foreground/80 font-normal'
            }`}
          >
            {word.text}
          </motion.span>
        ))}
      </motion.h2>

      <motion.p
        className="hero-tech-stack mt-2.5 sm:mt-3 text-base sm:text-lg lg:text-[1.35rem] font-sans font-semibold leading-normal flex flex-wrap items-center"
        variants={techVariants}
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
      >
        {TECH_ITEMS.map((tech, index) => (
          <span key={tech.label} className="inline-flex items-center">
            <TechWord tech={tech} reduceMotion={reduceMotion} wordVariants={wordVariants} />
            {index < TECH_ITEMS.length - 1 && (
              <span className="hero-tech-plus mx-2 text-white/35 font-normal select-none">
                +
              </span>
            )}
          </span>
        ))}
      </motion.p>
    </div>
  );
}

function TechWord({
  tech,
  reduceMotion,
  wordVariants,
}: {
  tech: TechItem;
  reduceMotion: boolean;
  wordVariants: Variants;
}) {
  return (
    <motion.span
      variants={wordVariants}
      whileHover={
        !reduceMotion
          ? {
              y: -2,
              scale: 1.02,
            }
          : undefined
      }
      transition={{ type: 'spring', stiffness: 340, damping: 18 }}
      className={`hero-tech-word relative inline-block cursor-default font-sans font-semibold underline decoration-1 underline-offset-[5px] hover:decoration-2 transition-all ${tech.className}`}
      style={{ '--tech-glow': tech.glow } as CSSProperties}
      onMouseEnter={() => setCursorState('hover')}
      onMouseLeave={() => setCursorState('default')}
    >
      <span
        aria-hidden="true"
        className="hero-tech-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-10 w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-xl transition-opacity duration-300"
      />
      {tech.label}
    </motion.span>
  );
}


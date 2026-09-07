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
  { text: 'intelligent', emphasis: false },
  { text: 'AI-powered', emphasis: true },
  { text: 'applications', emphasis: false },
  { text: 'and', emphasis: false },
  { text: 'scalable', emphasis: true },
  { text: 'full-stack', emphasis: true },
  { text: 'systems', emphasis: false },
  { text: 'with', emphasis: false },
];

const TECH_ITEMS: TechItem[] = [
  {
    label: 'Python',
    className: 'text-neon-blue decoration-neon-blue/35',
    glow: 'rgba(14,165,233,0.28)',
  },
  {
    label: 'Generative AI',
    className: 'text-neon-purple decoration-neon-purple/35',
    glow: 'rgba(155,135,245,0.32)',
  },
  {
    label: 'React',
    className: 'text-cyan-400 decoration-cyan-400/35',
    glow: 'rgba(34,211,238,0.28)',
  },
  {
    label: 'FastAPI',
    className: 'text-emerald-400 decoration-emerald-400/35',
    glow: 'rgba(52,211,153,0.28)',
  },
  {
    label: 'Computer Vision',
    className: 'text-neon-pink decoration-neon-pink/35',
    glow: 'rgba(217,70,239,0.28)',
  },
];

const wordVariants: Variants = {
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

  return (
    <div className="mb-5 max-w-4xl">
      <motion.h2
        className="text-xl sm:text-2xl lg:text-[1.7rem] font-light text-foreground/88 leading-snug"
        variants={sentenceVariants}
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
      >
        {LEAD_WORDS.map((word) => (
          <motion.span
            key={word.text}
            variants={wordVariants}
            className={`inline-block mr-[0.32em] ${
              word.emphasis
                ? 'font-medium text-foreground tracking-tight'
                : ''
            }`}
          >
            {word.text}
          </motion.span>
        ))}
      </motion.h2>

      <motion.p
        className="hero-tech-stack mt-3 text-xl sm:text-2xl lg:text-[1.7rem] font-light leading-relaxed"
        variants={techVariants}
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
      >
        {TECH_ITEMS.map((tech, index) => (
          <span key={tech.label} className="inline-block">
            <TechWord tech={tech} />
            {index < TECH_ITEMS.length - 1 && (
              <span className="hero-tech-plus mx-1.5 sm:mx-2 text-white/25 font-light">
                +
              </span>
            )}
          </span>
        ))}
      </motion.p>
    </div>
  );
}

function TechWord({ tech }: { tech: TechItem }) {
  return (
    <motion.span
      variants={wordVariants}
      whileHover={{
        y: -2,
        scale: 1.02,
      }}
      transition={{ type: 'spring', stiffness: 340, damping: 18 }}
      className={`hero-tech-word relative inline-block cursor-default font-semibold underline decoration-2 underline-offset-[6px] ${tech.className}`}
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

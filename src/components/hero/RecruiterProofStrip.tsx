import { motion } from 'framer-motion';
import { PROFILE_DATA } from '@/data/profile';
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference';
import { ShieldCheck, Activity, Users, Zap } from 'lucide-react';
import { setCursorState } from '@/lib/cursor';

const metricIcons = [
  <Activity className="w-4 h-4 text-neon-cyan" key="activity" />,
  <ShieldCheck className="w-4 h-4 text-neon-purple" key="shield" />,
  <Users className="w-4 h-4 text-neon-blue" key="users" />,
  <Zap className="w-4 h-4 text-neon-pink" key="zap" />,
];

export default function RecruiterProofStrip() {
  const reduceMotion = useReducedMotionPreference();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="w-full max-w-5xl mx-auto mt-14 pt-8 border-t border-white/10"
    >
      <div className="flex items-center justify-between mb-4 px-2">
        <span className="text-[11px] font-mono tracking-widest uppercase text-muted-foreground/70 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          VERIFIED PRODUCTION METRICS // REPUTABLE EVIDENCE
        </span>
        <span className="text-[10px] font-mono text-neon-blue/80 hidden sm:inline-block">
          SOURCE: PRODUCTION DEPLOYMENTS & LAB AUDITS
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {PROFILE_DATA.proofMetrics.map((item, idx) => (
          <motion.div
            key={item.label}
            whileHover={
              !reduceMotion
                ? {
                    y: -4,
                    borderColor: 'rgba(155, 135, 245, 0.4)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  }
                : undefined
            }
            transition={{ duration: 0.2 }}
            className="group relative p-4 sm:p-5 rounded-2xl glassmorphism border border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-300"
            onMouseEnter={() => setCursorState('hover', 'PROOF')}
            onMouseLeave={() => setCursorState('default')}
          >
            {/* Top accent glow line on hover */}
            <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-center justify-between mb-2">
              <span className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-muted-foreground group-hover:border-neon-purple/30 group-hover:text-foreground transition-colors">
                {metricIcons[idx % metricIcons.length]}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground/60 uppercase">
                #0{idx + 1}
              </span>
            </div>

            <div className="text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-blue to-neon-purple mb-1">
              {item.stat}
            </div>

            <div className="text-xs sm:text-sm font-semibold text-foreground tracking-tight mb-1">
              {item.label}
            </div>

            <p className="text-[11px] font-light text-muted-foreground leading-relaxed line-clamp-2">
              {item.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

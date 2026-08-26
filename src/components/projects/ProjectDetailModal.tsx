import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/projects';
import { X, ExternalLink, Github, CheckCircle2, Cpu, ShieldCheck, Trophy, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 backdrop-blur-xl p-3 sm:p-6 md:p-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Backdrop click dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 -z-10"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 30 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl glassmorphism border border-white/15 bg-background/95 text-foreground shadow-2xl p-6 md:p-10 scrollbar-thin scrollbar-thumb-white/20"
        >
          {/* Top Sticky Header Bar */}
          <div className="sticky top-0 z-30 flex items-center justify-between pb-4 mb-6 border-b border-white/10 bg-background/90 backdrop-blur-md -mx-6 -mt-6 px-6 pt-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-neon-blue uppercase px-2.5 py-1 bg-neon-blue/10 border border-neon-blue/20 rounded-md">
                {project.number}
              </span>
              <span className="text-xs uppercase font-mono text-muted-foreground tracking-widest">
                {project.category} • {project.year}
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
              className="rounded-full border-white/10 bg-white/5 hover:bg-white/15 text-foreground transition-all duration-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Project Title & Subtitle */}
          <div className="mb-8">
            <h2 id="modal-project-title" className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground mb-2">
              {project.title}
            </h2>
            <p className="text-lg md:text-xl font-light text-neon-purple tracking-wide">
              {project.subtitle}
            </p>
          </div>

          {/* Hero Media Preview */}
          <div className="relative w-full h-[260px] sm:h-[380px] md:h-[460px] rounded-xl overflow-hidden mb-10 border border-white/10 shadow-2xl group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            {project.demoUrl && project.demoUrl !== '#' && (
              <Button
                size="lg"
                className="bg-gradient-to-r from-neon-purple to-neon-blue text-white border-0 font-semibold shadow-[0_0_20px_rgba(155,135,245,0.3)] hover:shadow-[0_0_30px_rgba(155,135,245,0.6)] hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  Launch Live Demo <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            )}
            {project.codeUrl && project.codeUrl !== '#' && (
              <Button
                variant="outline"
                size="lg"
                className="border-white/15 bg-white/5 hover:bg-white/15 text-foreground hover:border-neon-purple transition-all duration-300"
                asChild
              >
                <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                  View Source Code <Github className="ml-2 w-4 h-4" />
                </a>
              </Button>
            )}
          </div>

          {/* Case Study Detailed Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Overview & Solution Column */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-3 text-foreground/90 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-neon-blue" /> Executive Overview
                </h3>
                <p className="text-muted-foreground leading-relaxed font-light text-base md:text-lg">
                  {project.fullDescription}
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
                <h4 className="font-semibold text-destructive/90 text-sm uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-neon-pink" /> The Challenge
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
                <h4 className="font-semibold text-neon-blue text-sm uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-neon-blue" /> The Engineering Solution
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Side Metadata Column */}
            <div className="space-y-6">
              <div className="p-6 rounded-xl glassmorphism border-white/10 space-y-4">
                <h4 className="font-bold text-foreground text-sm uppercase tracking-wider">
                  Tech Stack & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono font-medium bg-white/5 border border-white/10 rounded-full text-foreground/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl glassmorphism border-white/10 space-y-3">
                <h4 className="font-bold text-foreground text-sm uppercase tracking-wider flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-neon-purple" /> Impact & Results
                </h4>
                <p className="text-muted-foreground text-xs leading-relaxed font-mono">
                  {project.results}
                </p>
              </div>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-6 text-foreground/90">Key Architectural Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.keyFeatures.map((feature, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-neon-purple shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/90 font-light">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Close CTA */}
          <div className="pt-6 border-t border-white/10 flex justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-white/15 bg-white/5 hover:bg-white/10"
            >
              Close Case Study
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

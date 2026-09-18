import { motion } from 'framer-motion';
import { Project } from '@/data/projects';
import TiltCard from '@/components/interaction/TiltCard';
import Project3DViewport from '@/components/projects/Project3DViewport';
import { setCursorState } from '@/lib/cursor';
import { ExternalLink, Github, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

export default function ProjectCard({ project, onSelectProject }: ProjectCardProps) {
  return (
    <TiltCard maxTiltDegrees={4} className="h-full group">
      <div
        className="relative h-full rounded-2xl glassmorphism border border-white/10 hover:border-neon-purple/50 transition-all duration-500 overflow-hidden flex flex-col justify-between p-6 bg-slate-950/70 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] group-hover:shadow-[0_16px_40px_rgba(139,92,246,0.2)]"
        onMouseEnter={() => setCursorState('view', 'VIEW')}
        onMouseLeave={() => setCursorState('default')}
      >
        {/* Top Header Information */}
        <div className="flex justify-between items-center mb-4 z-20">
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan opacity-90 group-hover:opacity-100 transition-opacity">
              {project.number}
            </span>
            <span className="text-[11px] uppercase font-mono px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-neon-blue font-semibold">
              {project.category}
            </span>
          </div>

          <span className="text-xs font-mono text-muted-foreground/60">{project.year}</span>
        </div>

        {/* 3D Perspective Screen Viewport */}
        <div className="mb-5 z-20">
          <Project3DViewport
            image={project.image}
            title={project.title}
            category={project.category}
            number={project.number}
            onOpenCaseStudy={() => onSelectProject(project)}
          />
        </div>

        {/* Content & Engineering Architecture Summary */}
        <div className="space-y-3 mb-5 z-20 flex-grow">
          <div>
            <h3
              className="text-2xl font-bold tracking-tight text-foreground group-hover:text-neon-purple transition-colors duration-300 cursor-pointer"
              onClick={() => onSelectProject(project)}
            >
              {project.title}
            </h3>
            <p className="text-xs font-mono text-neon-cyan/90 mt-0.5">{project.subtitle}</p>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground/90 font-light leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Results Badge / Proof Point */}
          {project.results && (
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] font-mono text-foreground/80 flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-neon-cyan shrink-0 mt-0.5" />
              <span className="line-clamp-2">{project.results}</span>
            </div>
          )}
        </div>

        {/* Technologies Badges */}
        <div className="flex flex-wrap gap-1.5 mb-5 z-20">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-muted-foreground font-mono transition-colors duration-300 group-hover:border-neon-purple/30 group-hover:text-foreground"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-muted-foreground/70 font-mono">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* Card Footer Links */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between z-20">
          <Button
            variant="link"
            size="sm"
            onClick={() => onSelectProject(project)}
            className="p-0 h-auto text-xs font-semibold text-neon-blue hover:text-neon-purple flex items-center gap-1 group/btn"
          >
            Engineering Deep-Dive{' '}
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </Button>

          <div className="flex items-center gap-2">
            {project.codeUrl && project.codeUrl !== '#' && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-muted-foreground hover:text-foreground border border-white/5 transition-colors"
                title="View Source Code on GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.demoUrl && project.demoUrl !== '#' && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-muted-foreground hover:text-foreground border border-white/5 transition-colors"
                title="Live Deployment"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

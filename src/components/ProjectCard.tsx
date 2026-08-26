import { motion } from 'framer-motion';
import { Project } from '@/data/projects';
import TiltCard from '@/components/interaction/TiltCard';
import { setCursorState } from '@/lib/cursor';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

export default function ProjectCard({ project, onSelectProject }: ProjectCardProps) {
  return (
    <TiltCard maxTiltDegrees={6} className="h-full group">
      <div
        className="relative h-full rounded-2xl glassmorphism border border-white/10 hover:border-neon-purple/40 transition-all duration-500 overflow-hidden flex flex-col justify-between p-6 bg-gradient-to-b from-white/5 to-black/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        onMouseEnter={() => setCursorState('view', 'VIEW')}
        onMouseLeave={() => setCursorState('default')}
      >
        {/* Layer 1: Top Header Info */}
        <div className="flex justify-between items-start mb-4 z-20">
          <span className="font-mono text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue opacity-80 group-hover:opacity-100 transition-opacity">
            {project.number}
          </span>
          <span className="text-xs uppercase font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground font-semibold">
            {project.category}
          </span>
        </div>

        {/* Layer 2: Project Image Frame with Hover Parallax Zoom */}
        <div
          className="relative w-full h-[210px] rounded-xl overflow-hidden mb-6 border border-white/10 cursor-pointer group-hover:shadow-[0_0_25px_rgba(155,135,245,0.25)] transition-all duration-500"
          onClick={() => onSelectProject(project)}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          
          {/* Overlay CTA Button on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
            <span className="px-4 py-2 rounded-full bg-neon-purple/90 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              View Case Study <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Layer 3: Title & Description */}
        <div className="space-y-3 mb-6 z-20 flex-grow">
          <h3
            className="text-2xl font-bold tracking-tight text-foreground group-hover:text-neon-purple transition-colors duration-300 cursor-pointer"
            onClick={() => onSelectProject(project)}
          >
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground/90 font-light leading-relaxed line-clamp-3">
            {project.shortDescription}
          </p>
        </div>

        {/* Layer 4: Technologies Badges */}
        <div className="flex flex-wrap gap-2 mb-6 z-20">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-muted-foreground/90 font-mono"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-muted-foreground font-mono">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Layer 5: Card Action Links */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between z-20">
          <Button
            variant="link"
            size="sm"
            onClick={() => onSelectProject(project)}
            className="p-0 h-auto text-xs font-semibold text-neon-blue hover:text-neon-purple flex items-center gap-1 group/btn"
          >
            Case Study <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </Button>

          <div className="flex items-center gap-2">
            {project.codeUrl && project.codeUrl !== '#' && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-muted-foreground hover:text-foreground border border-white/5 transition-colors"
                title="View Source Code"
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
                title="Live Demo"
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

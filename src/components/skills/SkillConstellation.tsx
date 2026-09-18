import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_NODES, SkillItem } from '@/data/skills';
import { PROJECTS_DATA, Project } from '@/data/projects';
import { Brain, Terminal, Server, Database, Sparkles, Eye, ArrowRight, Layers } from 'lucide-react';
import { setCursorState } from '@/lib/cursor';

interface ProjectNode {
  id: string;
  name: string;
  category: string;
  technologies: string[];
}

const PROJECT_NODES: ProjectNode[] = [
  {
    id: 'intelliforge',
    name: 'IntelliForge',
    category: 'AI Engineering',
    technologies: ['Python', 'FastAPI', 'MongoDB', 'Generative AI & LLMs', 'Machine Learning', 'Git & GitHub', 'Postman'],
  },
  {
    id: 'sentinel-ai',
    name: 'Sentinel AI',
    category: 'Computer Vision',
    technologies: ['Python', 'FastAPI', 'MongoDB', 'Computer Vision & YOLOv8', 'OpenCV', 'React.js', 'Tailwind CSS', 'Git & GitHub', 'Postman'],
  },
  {
    id: 'nutritrack-ai',
    name: 'NutriTrackAI',
    category: 'Full-Stack AI',
    technologies: ['React.js', 'Node.js & Express', 'MongoDB', 'Generative AI & LLMs', 'Tailwind CSS', 'Git & GitHub'],
  },
  {
    id: 'orinson',
    name: 'Orinson Internship',
    category: 'Production Systems',
    technologies: ['React.js', 'JavaScript / TypeScript', 'Tailwind CSS', 'Node.js & Express', 'Git & GitHub'],
  },
];

export default function SkillConstellation() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<{ type: 'tech' | 'project'; id: string } | null>(null);

  const activeTechName = hoveredNode?.type === 'tech' ? hoveredNode.id : selectedTech;
  const activeProjectId = hoveredNode?.type === 'project' ? hoveredNode.id : selectedProject;

  // Find associated projects when tech is active
  const relatedProjects = activeTechName
    ? PROJECT_NODES.filter((p) =>
        p.technologies.some((t) => t.toLowerCase() === activeTechName.toLowerCase())
      ).map((p) => p.id)
    : [];

  // Find associated tech when project is active
  const activeProjectObj = PROJECT_NODES.find((p) => p.id === activeProjectId);
  const relatedTechNames = activeProjectObj ? activeProjectObj.technologies : [];

  const handleTechClick = (techName: string) => {
    if (selectedTech === techName) {
      setSelectedTech(null);
    } else {
      setSelectedTech(techName);
      setSelectedProject(null);
    }
  };

  const handleProjectClick = (projectId: string) => {
    if (selectedProject === projectId) {
      setSelectedProject(null);
    } else {
      setSelectedProject(projectId);
      setSelectedTech(null);
    }
  };

  const clearSelection = () => {
    setSelectedTech(null);
    setSelectedProject(null);
  };

  return (
    <div className="w-full rounded-2xl glassmorphism border border-white/10 bg-slate-950/70 backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header instructions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-neon-cyan" />
            Interactive Tech-to-Project Constellation
          </h3>
          <p className="text-xs text-muted-foreground/80 font-light mt-1">
            Click or hover any technology or system to visualize real production architectures.
          </p>
        </div>

        {(selectedTech || selectedProject) && (
          <button
            onClick={clearSelection}
            className="px-3 py-1 rounded-full text-xs font-mono text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan/10 transition-colors"
          >
            Reset Graph Selection ✕
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Technology Nodes */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-mono tracking-wider uppercase text-muted-foreground/70 flex items-center justify-between">
            <span>ENGINEERING SKILLS & APIS</span>
            <span className="text-[10px] text-neon-blue font-semibold">18 NODES</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {SKILL_NODES.map((skill) => {
              const isSelected = selectedTech === skill.name;
              const isRelated =
                activeProjectId &&
                relatedTechNames.some((t) => t.toLowerCase() === skill.name.toLowerCase());
              const isFaded =
                (activeProjectId && !isRelated) ||
                (activeTechName && activeTechName !== skill.name);

              return (
                <button
                  key={skill.id}
                  onClick={() => handleTechClick(skill.name)}
                  onMouseEnter={() => {
                    setHoveredNode({ type: 'tech', id: skill.name });
                    setCursorState('hover', 'TECH');
                  }}
                  onMouseLeave={() => {
                    setHoveredNode(null);
                    setCursorState('default');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white border-transparent shadow-[0_0_20px_rgba(155,135,245,0.5)] scale-105'
                      : isRelated
                      ? 'bg-neon-cyan/20 text-white border-neon-cyan shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-105'
                      : isFaded
                      ? 'bg-white/[0.02] text-muted-foreground/40 border-white/5 opacity-50'
                      : 'bg-white/5 text-foreground/90 border-white/10 hover:border-neon-purple/50 hover:bg-white/10'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan/80" />
                  <span>{skill.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Production Systems & Detail Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono tracking-wider uppercase text-muted-foreground/70 flex items-center justify-between">
            <span>PRODUCTION SYSTEMS</span>
            <span className="text-[10px] text-neon-cyan font-semibold">TARGET WORKFLOWS</span>
          </div>

          <div className="space-y-3">
            {PROJECT_NODES.map((proj) => {
              const isSelected = selectedProject === proj.id;
              const isRelated =
                activeTechName &&
                relatedProjects.includes(proj.id);
              const isFaded =
                (activeTechName && !isRelated) ||
                (activeProjectId && activeProjectId !== proj.id);

              return (
                <div
                  key={proj.id}
                  onClick={() => handleProjectClick(proj.id)}
                  onMouseEnter={() => {
                    setHoveredNode({ type: 'project', id: proj.id });
                    setCursorState('hover', 'SYSTEM');
                  }}
                  onMouseLeave={() => {
                    setHoveredNode(null);
                    setCursorState('default');
                  }}
                  className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-neon-purple/20 border-neon-purple shadow-[0_0_25px_rgba(155,135,245,0.3)]'
                      : isRelated
                      ? 'bg-neon-cyan/15 border-neon-cyan shadow-[0_0_20px_rgba(34,211,238,0.3)] translate-x-1'
                      : isFaded
                      ? 'bg-white/[0.02] border-white/5 opacity-40'
                      : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">{proj.name}</span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground">
                        {proj.category}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-muted-foreground/70 mt-1">
                      {proj.technologies.length} connected technologies
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isSelected || isRelated
                        ? 'text-neon-cyan translate-x-1'
                        : 'text-muted-foreground/40'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Active Detail Callout */}
          <AnimatePresence mode="wait">
            {(activeTechName || activeProjectObj) && (
              <motion.div
                key={activeTechName || activeProjectObj?.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-xl border border-neon-purple/30 bg-neon-purple/10 backdrop-blur-md space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-neon-blue font-bold">
                    ACTIVE ARCHITECTURAL LINK
                  </span>
                  <span className="text-[10px] font-mono text-neon-cyan">
                    {activeTechName ? `SKILL: ${activeTechName}` : `PROJECT: ${activeProjectObj?.name}`}
                  </span>
                </div>

                <p className="text-xs text-foreground/90 font-light leading-relaxed">
                  {activeTechName ? (
                    <>
                      <strong className="text-white">{activeTechName}</strong> is actively utilized in{' '}
                      <span className="text-neon-cyan font-mono font-semibold">
                        {relatedProjects
                          .map((pid) => PROJECT_NODES.find((p) => p.id === pid)?.name)
                          .filter(Boolean)
                          .join(', ') || 'production experiments'}
                      </span>
                      .
                    </>
                  ) : (
                    <>
                      <strong className="text-white">{activeProjectObj?.name}</strong> integrates{' '}
                      <span className="text-neon-cyan font-mono font-semibold">
                        {activeProjectObj?.technologies.slice(0, 4).join(', ')}
                      </span>{' '}
                      into a cohesive production system.
                    </>
                  )}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

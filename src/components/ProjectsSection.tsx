import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { PROJECTS_DATA, Project } from '@/data/projects';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './projects/ProjectDetailModal';
import { TextReveal, Reveal } from '@/components/animation/TextReveal';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'AI Engineering', 'Computer Vision', 'Full-Stack Engineering'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 14 },
    },
  };

  return (
    <section id="projects" className="section py-28 relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-neon-blue/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <Reveal direction="down">
            <span className="px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-neon-blue uppercase bg-neon-blue/10 border border-neon-blue/20 rounded-full">
              Portfolio & Engineering Works
            </span>
          </Reveal>

          <div className="flex justify-center">
            <TextReveal
              text="Featured Projects"
              as="h2"
              className="text-4xl md:text-6xl font-black tracking-tight text-foreground"
            />
          </div>

          <Reveal direction="up" delay={0.2}>
            <p className="text-muted-foreground/80 font-light max-w-xl mx-auto text-base md:text-lg">
              AI engineering pipelines and computer vision platforms — IntelliForge and Sentinel AI.
            </p>
          </Reveal>

          {/* Category Filter Pills */}
          <Reveal direction="up" delay={0.3} className="pt-6">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-300 ${activeCategory === cat
                    ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-[0_0_15px_rgba(155,135,245,0.4)] scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground border border-white/10'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Project Cards Grid */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <ProjectCard project={project} onSelectProject={setSelectedProject} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Case Study Fullscreen Modal */}
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}

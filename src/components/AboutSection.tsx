import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Code, Monitor, Palette, Brain, Sparkles, CheckCircle2 } from 'lucide-react';
import { TIMELINE_MILESTONES } from '@/data/skills';
import { TextReveal, Reveal } from '@/components/animation/TextReveal';

export default function AboutSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const expertiseList = [
    {
      id: 'frontend',
      icon: <Code className="w-6 h-6 text-neon-purple" />,
      title: 'Frontend Architecture',
      description: 'Engineering responsive, performant, and reactive single-page applications with React 18 & TypeScript.',
      items: ['React 18', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    },
    {
      id: 'webgl',
      icon: <Monitor className="w-6 h-6 text-neon-blue" />,
      title: '3D WebGL & Shaders',
      description: 'Creating hardware-accelerated 3D scenes, particle physics, and procedural GLSL graphics.',
      items: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'WebGL'],
    },
    {
      id: 'design',
      icon: <Palette className="w-6 h-6 text-neon-pink" />,
      title: 'Motion & UX Design',
      description: 'Crafting fluid glassmorphism user interfaces with spring physics and micro-interactions.',
      items: ['Framer Motion', 'GSAP', 'Figma', 'System Design'],
    },
    {
      id: 'fullstack',
      icon: <Brain className="w-6 h-6 text-primary" />,
      title: 'Full-Stack & Cloud',
      description: 'Architecting RESTful backend services, database schemas, file hubs, and automated test pipelines.',
      items: ['Node.js', 'MongoDB', 'PostgreSQL', 'Playwright'],
    },
  ];

  return (
    <section id="about" className="section py-28 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-neon-blue/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <Reveal direction="down">
            <span className="px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-neon-purple uppercase bg-neon-purple/10 border border-neon-purple/20 rounded-full">
              Developer Journey & Capabilities
            </span>
          </Reveal>

          <div className="flex justify-center">
            <TextReveal
              text="About My Practice"
              as="h2"
              className="text-4xl md:text-6xl font-black tracking-tight text-foreground"
            />
          </div>

          <Reveal direction="up" delay={0.2}>
            <p className="text-muted-foreground/80 font-light max-w-xl mx-auto text-base md:text-lg">
              Bridging engineering rigor and artistic creative coding to build unforgettable digital products.
            </p>
          </Reveal>
        </div>

        {/* Storytelling Timeline & Expertise Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Timeline Journey */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-neon-blue" />
              Engineering Journey Timeline
            </h3>

            <div className="relative pl-6 border-l-2 border-white/10 space-y-8">
              {TIMELINE_MILESTONES.map((milestone, idx) => (
                <Reveal key={milestone.stepNumber} direction="left" delay={idx * 0.1}>
                  <div className="relative group">
                    {/* Visual Marker Dot */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-neon-purple group-hover:bg-neon-purple group-hover:scale-125 transition-all duration-300" />
                    
                    <div className="p-6 rounded-xl glassmorphism border-white/5 group-hover:border-neon-purple/30 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-neon-blue uppercase px-2.5 py-0.5 rounded-full bg-neon-blue/10 border border-neon-blue/20">
                          {milestone.stepNumber} • {milestone.year}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">{milestone.title}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">{milestone.subtitle}</h4>
                      <p className="text-sm text-muted-foreground/90 font-light mb-4 leading-relaxed">
                        {milestone.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {milestone.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-muted-foreground border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column: Expertise Cards with Focus Hover Effect */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="text-2xl font-bold text-foreground">
              Core Technical Expertise
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {expertiseList.map((item) => {
                const isDimmed = hoveredCard !== null && hoveredCard !== item.id;
                return (
                  <motion.div
                    key={item.id}
                    onMouseEnter={() => setHoveredCard(item.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    animate={{
                      opacity: isDimmed ? 0.45 : 1,
                      scale: hoveredCard === item.id ? 1.03 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="p-6 glassmorphism border-white/10 h-full flex flex-col justify-between hover:border-neon-purple/40 transition-colors duration-300">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                            {item.icon}
                          </div>
                          <h4 className="font-bold text-foreground text-base">{item.title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground/90 font-light leading-relaxed mb-6">
                          {item.description}
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-4 border-t border-white/5">
                        {item.items.map((tech) => (
                          <div key={tech} className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                            <CheckCircle2 className="w-3.5 h-3.5 text-neon-purple" />
                            {tech}
                          </div>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

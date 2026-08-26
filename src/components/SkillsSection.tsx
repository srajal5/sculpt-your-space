import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { SKILL_NODES, SkillItem } from '@/data/skills';
import { TextReveal, Reveal } from '@/components/animation/TextReveal';
import { Layers, Server, Palette, Terminal, Box, Sparkles, Check, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = [
    { id: 'frontend', name: 'Frontend', icon: <Layers className="w-4 h-4 text-neon-purple" /> },
    { id: '3d', name: '3D & WebGL', icon: <Box className="w-4 h-4 text-neon-blue" /> },
    { id: 'backend', name: 'Backend', icon: <Server className="w-4 h-4 text-neon-pink" /> },
    { id: 'tools', name: 'Tools & QA', icon: <Terminal className="w-4 h-4 text-primary" /> },
  ];

  const filteredSkills = hoveredCategory
    ? SKILL_NODES.filter((s) => s.category === hoveredCategory)
    : SKILL_NODES;

  return (
    <section id="skills" className="section py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-neon-purple/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <Reveal direction="down">
            <span className="px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-neon-blue uppercase bg-neon-blue/10 border border-neon-blue/20 rounded-full">
              Technology Matrix & Constellation
            </span>
          </Reveal>

          <div className="flex justify-center">
            <TextReveal
              text="Skills & Capabilities"
              as="h2"
              className="text-4xl md:text-6xl font-black tracking-tight text-foreground"
            />
          </div>

          <Reveal direction="up" delay={0.2}>
            <p className="text-muted-foreground/80 font-light max-w-xl mx-auto text-base md:text-lg">
              Interactive visualization of core engineering competencies, frameworks, WebGL libraries, and QA toolsets.
            </p>
          </Reveal>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            <button
              onClick={() => setHoveredCategory(null)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                hoveredCategory === null
                  ? 'bg-neon-purple text-white shadow-[0_0_15px_rgba(155,135,245,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 text-muted-foreground border border-white/10'
              }`}
            >
              All Tech Stack ({SKILL_NODES.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setHoveredCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold flex items-center gap-2 transition-all ${
                  hoveredCategory === cat.id
                    ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-[0_0_15px_rgba(155,135,245,0.4)]'
                    : 'bg-white/5 hover:bg-white/10 text-muted-foreground border border-white/10'
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkill?.id === skill.id;

            return (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setSelectedSkill(skill)}
                className="cursor-pointer"
              >
                <Card
                  className={`p-6 glassmorphism border-white/10 h-full flex flex-col justify-between transition-all duration-300 ${
                    isSelected
                      ? 'border-neon-purple shadow-[0_0_25px_rgba(155,135,245,0.3)] bg-neon-purple/10'
                      : 'hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neon-blue">
                        {skill.proficiency}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground/80">{skill.level}%</span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-muted-foreground/90 font-light leading-relaxed mb-4 line-clamp-2">
                      {skill.description}
                    </p>
                  </div>

                  {/* Level Progress Bar */}
                  <div className="space-y-2 pt-3 border-t border-white/5">
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-neon-purple via-neon-blue to-neon-pink rounded-full"
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground/70">
                      <span>Click for projects</span>
                      <Info className="w-3 h-3 text-neon-purple" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Skill Detail Interactive Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl glassmorphism border border-white/15 bg-background text-foreground shadow-2xl space-y-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono uppercase font-bold text-neon-blue px-2.5 py-0.5 rounded-full bg-neon-blue/10 border border-neon-blue/20">
                      {selectedSkill.category.toUpperCase()} • {selectedSkill.proficiency}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground mt-2">{selectedSkill.name}</h3>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSelectedSkill(null)}
                    className="rounded-full border-white/10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {selectedSkill.description}
                </p>

                <div>
                  <h4 className="text-xs font-mono uppercase font-bold text-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-neon-purple" /> Applied In Projects:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.usedInProjects.map((proj) => (
                      <span
                        key={proj}
                        className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-foreground/90 flex items-center gap-1.5"
                      >
                        <Check className="w-3 h-3 text-neon-blue" />
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedSkill(null)}
                    className="border-white/15 bg-white/5"
                  >
                    Close Skill Detail
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { SKILL_NODES, SKILL_CATEGORIES, SkillItem } from '@/data/skills';
import { TextReveal, Reveal } from '@/components/animation/TextReveal';
import SkillConstellation from '@/components/skills/SkillConstellation';
import { Layers, Server, Terminal, Sparkles, Check, Info, X, Brain, Database, Network, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { setCursorState } from '@/lib/cursor';

const categoryIcons: Record<SkillItem['category'], ReactNode> = {
  'ai-ml': <Brain className="w-4 h-4 text-neon-purple" />,
  development: <Layers className="w-4 h-4 text-neon-cyan" />,
  languages: <Terminal className="w-4 h-4 text-neon-blue" />,
  'cloud-database': <Database className="w-4 h-4 text-neon-pink" />,
  tools: <Server className="w-4 h-4 text-primary" />,
};

export default function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<SkillItem['category'] | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'constellation'>('grid');

  const filteredSkills = activeCategory
    ? SKILL_NODES.filter((s) => s.category === activeCategory)
    : SKILL_NODES;

  return (
    <section id="skills" className="section py-28 relative overflow-hidden">
      {/* Background atmospheric glow */}
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-neon-purple/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-neon-blue/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <Reveal direction="down">
            <span className="px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-neon-blue uppercase bg-neon-blue/10 border border-neon-blue/20 rounded-full">
              Engineered Capabilities & Domains
            </span>
          </Reveal>

          <div className="flex justify-center">
            <TextReveal
              text="Skills & Architecture"
              as="h2"
              className="text-4xl md:text-6xl font-black tracking-tight text-foreground"
            />
          </div>

          <Reveal direction="up" delay={0.2}>
            <p className="text-muted-foreground/80 font-light max-w-xl mx-auto text-base md:text-lg">
              Full-stack AI workflows, async backend pipelines, computer vision models, and production databases.
            </p>
          </Reveal>

          {/* View Mode Switcher (Grid vs Constellation) */}
          <div className="flex justify-center pt-4">
            <div className="inline-flex items-center p-1 rounded-full glassmorphism border border-white/10 bg-black/40">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold flex items-center gap-2 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-[0_0_15px_rgba(155,135,245,0.4)]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Domain Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode('constellation')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold flex items-center gap-2 transition-all ${
                  viewMode === 'constellation'
                    ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-[0_0_15px_rgba(155,135,245,0.4)]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                Tech Constellation Graph
              </button>
            </div>
          </div>

          {/* Category Filter Pills (when in grid view) */}
          {viewMode === 'grid' && (
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                  activeCategory === null
                    ? 'bg-neon-purple text-white shadow-[0_0_15px_rgba(155,135,245,0.4)]'
                    : 'bg-white/5 hover:bg-white/10 text-muted-foreground border border-white/10'
                }`}
              >
                All Tech Stack ({SKILL_NODES.length})
              </button>
              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono font-semibold flex items-center gap-2 transition-all ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-[0_0_15px_rgba(155,135,245,0.4)]'
                      : 'bg-white/5 hover:bg-white/10 text-muted-foreground border border-white/10'
                  }`}
                >
                  {categoryIcons[cat.id]}
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View Content: Constellation vs Grid */}
        {viewMode === 'constellation' ? (
          <SkillConstellation />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill?.id === skill.id;

              return (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedSkill(skill)}
                  className="cursor-pointer"
                  onMouseEnter={() => setCursorState('hover', 'SKILL')}
                  onMouseLeave={() => setCursorState('default')}
                >
                  <Card
                    className={`p-5 glassmorphism border-white/10 bg-slate-950/70 backdrop-blur-xl h-full flex flex-col justify-between transition-all duration-300 ${
                      isSelected
                        ? 'border-neon-purple shadow-[0_0_25px_rgba(155,135,245,0.3)] bg-neon-purple/10'
                        : 'hover:border-neon-purple/40 hover:bg-slate-900/80 hover:shadow-[0_0_22px_rgba(155,135,245,0.18)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neon-blue">
                          {skill.proficiency}
                        </span>
                        <span className="text-[11px] font-mono text-muted-foreground/60 flex items-center gap-1">
                          {categoryIcons[skill.category]}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                        {skill.name}
                      </h3>
                      <p className="text-xs text-muted-foreground/90 font-light leading-relaxed mb-4 line-clamp-3">
                        {skill.description}
                      </p>
                    </div>

                    {/* Applied Projects Tags */}
                    <div className="pt-3 border-t border-white/5 space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {skill.usedInProjects.slice(0, 2).map((proj) => (
                          <span
                            key={proj}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-neon-cyan/90 truncate max-w-[140px]"
                          >
                            {proj}
                          </span>
                        ))}
                        {skill.usedInProjects.length > 2 && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.03] text-muted-foreground/70">
                            +{skill.usedInProjects.length - 2}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground/70 pt-1">
                        <span>Click for details</span>
                        <Info className="w-3 h-3 text-neon-purple" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Skill Detail Interactive Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl glassmorphism border border-white/15 bg-slate-950 text-foreground shadow-2xl space-y-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono uppercase font-bold text-neon-blue px-2.5 py-0.5 rounded-full bg-neon-blue/10 border border-neon-blue/20">
                      {selectedSkill.category.replace('-', ' / ').toUpperCase()} • {selectedSkill.proficiency}
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
                    <Sparkles className="w-4 h-4 text-neon-purple" /> Applied In Production / Projects:
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

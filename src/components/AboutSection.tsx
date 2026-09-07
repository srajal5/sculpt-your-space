import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  Code,
  Brain,
  Server,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Trophy,
  MapPin,
} from 'lucide-react';
import { PROFILE_DATA } from '@/data/profile';
import { EXPERIENCE_DATA } from '@/data/experience';
import { ACHIEVEMENTS_DATA } from '@/data/achievements';
import { TextReveal, Reveal } from '@/components/animation/TextReveal';

export default function AboutSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const expertiseList = [
    {
      id: 'ai',
      icon: <Brain className="w-6 h-6 text-neon-purple" />,
      title: 'AI & Generative AI',
      description:
        'LLM APIs, prompt engineering, Google Cloud AI services, and LLM-powered automation workflows.',
      items: ['Generative AI', 'LLM APIs', 'Machine Learning', 'Prompt Engineering'],
    },
    {
      id: 'fullstack',
      icon: <Code className="w-6 h-6 text-cyan-400" />,
      title: 'Full-Stack AI Engineering',
      description:
        'End-to-end AI applications with Python, FastAPI, React.js, MongoDB, and REST APIs.',
      items: ['Python', 'FastAPI', 'React.js', 'MongoDB'],
    },
    {
      id: 'vision',
      icon: <Sparkles className="w-6 h-6 text-neon-pink" />,
      title: 'Computer Vision',
      description:
        'Real-time object detection and video processing for intelligent surveillance systems.',
      items: ['YOLOv8', 'OpenCV', 'PyTorch', 'Real-Time Detection'],
    },
    {
      id: 'cloud',
      icon: <Server className="w-6 h-6 text-neon-blue" />,
      title: 'Cloud & Scalable Systems',
      description:
        'Scalable AI systems, cloud services, database design, and real-time application backends.',
      items: ['Google Cloud', 'REST APIs', 'MySQL', 'Supabase'],
    },
  ];

  const prominentAchievements = ACHIEVEMENTS_DATA.filter((a) => a.prominent);
  const otherAchievements = ACHIEVEMENTS_DATA.filter((a) => !a.prominent);

  return (
    <section id="about" className="section py-28 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-neon-blue/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <Reveal direction="down">
            <span className="px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-neon-purple uppercase bg-neon-purple/10 border border-neon-purple/20 rounded-full">
              Professional Profile
            </span>
          </Reveal>

          <div className="flex justify-center">
            <TextReveal
              text="About Me"
              as="h2"
              className="text-4xl md:text-6xl font-black tracking-tight text-foreground"
            />
          </div>

          <Reveal direction="up" delay={0.2}>
            <p className="text-muted-foreground/80 font-light max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
              {PROFILE_DATA.bio}
            </p>
          </Reveal>
        </div>

        {/* Education Card */}
        <Reveal direction="up" delay={0.1} className="mb-16">
          <Card className="p-6 sm:p-8 glassmorphism border-white/10 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-neon-purple/10 border border-neon-purple/20">
                <GraduationCap className="w-6 h-6 text-neon-purple" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Education</h3>
                <p className="text-foreground font-semibold">
                  {PROFILE_DATA.course} — {PROFILE_DATA.college}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground font-mono">
                  <span>CGPA: {PROFILE_DATA.cgpa}</span>
                  <span className="text-white/20">|</span>
                  <span>{PROFILE_DATA.educationPeriod}</span>
                  <span className="text-white/20">|</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-neon-cyan" />
                    {PROFILE_DATA.location}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* Experience & Expertise Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Experience */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-neon-blue" />
              Experience
            </h3>

            <div className="relative pl-6 space-y-8">
              <motion.div
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 w-0.5 origin-top bg-gradient-to-b from-neon-purple via-neon-blue/80 to-transparent"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.15, ease: 'easeOut' }}
              />
              {EXPERIENCE_DATA.map((entry, idx) => (
                <Reveal key={entry.id} direction="left" delay={idx * 0.1}>
                  <div className="relative group">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-neon-purple group-hover:bg-neon-purple group-hover:scale-125 transition-all duration-300" />

                    <div className="p-6 rounded-xl glassmorphism border-white/5 group-hover:border-neon-purple/30 transition-all duration-300">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-bold text-neon-blue uppercase px-2.5 py-0.5 rounded-full bg-neon-blue/10 border border-neon-blue/20">
                          {entry.type}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">{entry.date}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-1">{entry.title}</h4>
                      <p className="text-sm text-neon-purple font-medium mb-4">{entry.organization}</p>
                      <ul className="space-y-2">
                        {entry.details.map((detail) => (
                          <li
                            key={detail}
                            className="text-sm text-muted-foreground/90 font-light leading-relaxed flex items-start gap-2"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-neon-cyan shrink-0 mt-0.5" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column: Expertise Cards */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="text-2xl font-bold text-foreground">Core Technical Expertise</h3>

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
                          <div
                            key={tech}
                            className="flex items-center gap-2 text-xs font-mono text-muted-foreground"
                          >
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

        {/* Achievements */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-foreground flex items-center gap-3 justify-center">
            <Trophy className="w-5 h-5 text-neon-pink" />
            Achievements
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {prominentAchievements.map((achievement, idx) => (
              <Reveal key={achievement.id} direction="up" delay={idx * 0.08}>
                <Card className="p-5 glassmorphism border-neon-purple/20 h-full bg-gradient-to-br from-neon-purple/10 to-transparent hover:border-neon-purple/50 transition-all duration-300 hover:shadow-[0_0_28px_rgba(155,135,245,0.22)] hover:-translate-y-1">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-neon-purple/15 border border-neon-purple/25 shrink-0">
                      <Trophy className="w-4 h-4 text-neon-purple" />
                    </div>
                    <div>
                      {achievement.stat && (
                        <p className="text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-300 to-cyan-400 mb-1">
                          {achievement.stat}
                        </p>
                      )}
                      <p className="text-sm text-foreground/90 font-light leading-relaxed">
                        {achievement.title}
                      </p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>

          {otherAchievements.length > 0 && (
            <div className="max-w-2xl mx-auto">
              {otherAchievements.map((achievement) => (
                <Reveal key={achievement.id} direction="up">
                  <Card className="p-4 glassmorphism border-white/10 text-center">
                    <p className="text-sm text-muted-foreground font-light">{achievement.title}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

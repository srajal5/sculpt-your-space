import { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Palette, Terminal, Server, Layout } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: string;
}

export default function SkillsSection() {
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    { name: 'React', level: 90, category: 'frontend' },
    { name: 'JavaScript', level: 85, category: 'frontend' },
    { name: 'TypeScript', level: 80, category: 'frontend' },
    { name: 'Three.js', level: 75, category: 'frontend' },
    { name: 'GSAP', level: 70, category: 'frontend' },
    { name: 'HTML/CSS', level: 95, category: 'frontend' },
    { name: 'Tailwind CSS', level: 85, category: 'frontend' },
    { name: 'Node.js', level: 75, category: 'backend' },
    { name: 'Express', level: 70, category: 'backend' },
    { name: 'MongoDB', level: 65, category: 'backend' },
    { name: 'PostgreSQL', level: 60, category: 'backend' },
    { name: 'UI Design', level: 80, category: 'design' },
    { name: 'Figma', level: 75, category: 'design' },
    { name: 'Responsive Design', level: 90, category: 'design' },
    { name: 'Git', level: 85, category: 'tools' },
    { name: 'Docker', level: 65, category: 'tools' },
  ];

  const categories = [
    { id: 'frontend', name: 'Frontend', icon: <Layout className="w-6 h-6 text-neon-purple" /> },
    { id: 'backend', name: 'Backend', icon: <Server className="w-6 h-6 text-neon-blue" /> },
    { id: 'design', name: 'Design', icon: <Palette className="w-6 h-6 text-neon-pink" /> },
    { id: 'tools', name: 'Tools', icon: <Terminal className="w-6 h-6 text-primary" /> },
  ];

  // Track bar fill state for animation per-skill
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  useEffect(() => {
    let timeoutIds: NodeJS.Timeout[] = [];
    let observer: IntersectionObserver | null = null;

    function animateBars() {
      // Only run once if already animated
      if (Object.keys(animatedValues).length > 0) return;

      skills.forEach((skill, i) => {
        // Stagger each progress bar
        const tid = setTimeout(() => {
          setAnimatedValues((prev) => ({
            ...prev,
            [skill.name]: skill.level,
          }));
        }, i * 120);
        timeoutIds.push(tid);
      });
    }

    observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateBars();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    return () => {
      timeoutIds.forEach(clearTimeout);
      if (skillsRef.current && observer) {
        observer.unobserve(skillsRef.current);
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <section id="skills" className="section py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center mb-12">Skills</h2>

        <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Card key={category.id} className="p-6 glassmorphism border-white/5">
              <div className="flex items-center gap-3 mb-5">
                {category.icon}
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </div>

              <div className="space-y-4">
                {skills
                  .filter(skill => skill.category === category.id)
                  .map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress
                        value={animatedValues[skill.name] || 0}
                        max={100}
                        className={`
                          h-2 
                          transition-all 
                          duration-1000
                          rounded-full 
                          shadow-inner
                          bg-secondary/40 
                          overflow-hidden 
                          border border-white/10
                        `}
                        style={{
                          background:
                            'linear-gradient(90deg, #9b87f5 0%, #8B5CF6 60%, #6E59A5 100%)',
                        }}
                      />
                    </div>
                  ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

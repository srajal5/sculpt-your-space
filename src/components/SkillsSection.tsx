
import { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Code, Monitor, Palette, Brain, Terminal, Server, Globe, Layout } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: string;
}

export default function SkillsSection() {
  const skillsRef = useRef<HTMLDivElement>(null);
  
  // Define skills with their proficiency level (0-100)
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
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation class to each skill bar when visible
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
              setTimeout(() => {
                bar.classList.add('animate-skill');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    
    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);
  
  return (
    <section id="skills" className="section py-20">
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
                        value={0} // Start at 0 for animation
                        max={100}
                        className="h-2 skill-progress before:bg-gradient-to-r before:from-neon-purple before:to-neon-blue relative overflow-hidden"
                        style={{
                          '--value': skill.level,
                          '--animation-duration': '1.5s',
                        } as any}
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

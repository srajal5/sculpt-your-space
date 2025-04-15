
import { Card } from '@/components/ui/card';
import { Code, Monitor, Palette, Brain } from 'lucide-react';

export default function AboutSection() {
  const skills = [
    {
      icon: <Code className="w-6 h-6 text-neon-purple" />,
      title: 'Frontend Development',
      description: 'Building responsive and interactive user interfaces with modern web technologies',
      items: ['React', 'Three.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
      icon: <Monitor className="w-6 h-6 text-neon-blue" />,
      title: '3D Web Development',
      description: 'Creating immersive 3D experiences for the web using cutting-edge technologies',
      items: ['WebGL', 'GLSL Shaders', 'Animation', 'Performance Optimization'],
    },
    {
      icon: <Palette className="w-6 h-6 text-neon-pink" />,
      title: 'UI/UX Design',
      description: 'Designing intuitive and visually appealing user experiences',
      items: ['Figma', 'Interaction Design', 'Wireframing', 'Prototyping'],
    },
    {
      icon: <Brain className="w-6 h-6 text-primary" />,
      title: 'Creative Coding',
      description: 'Exploring the intersection of code, art, and interactive experiences',
      items: ['Generative Art', 'Particle Systems', 'Creative Algorithms', 'Physics Simulation'],
    }
  ];
  
  return (
    <section id="about" className="section py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <h2 className="section-heading">About Me</h2>
            <p className="text-muted-foreground mb-6">
              I'm a creative developer specializing in building immersive 3D web experiences. I combine technical expertise with artistic vision to create unique digital interactions.
            </p>
            <p className="text-muted-foreground mb-6">
              With a background in both web development and 3D graphics, I bridge the gap between traditional web design and cutting-edge interactive experiences. I'm passionate about pushing the boundaries of what's possible on the web.
            </p>
            <p className="text-muted-foreground">
              When I'm not coding, you can find me experimenting with new technologies, contributing to open-source projects, or exploring the great outdoors for creative inspiration.
            </p>
          </div>
          
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold mb-6">My Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <Card key={skill.title} className="p-5 glassmorphism border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    {skill.icon}
                    <h4 className="text-lg font-medium">{skill.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{skill.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span key={item} className="text-xs px-2 py-1 bg-secondary/50 rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

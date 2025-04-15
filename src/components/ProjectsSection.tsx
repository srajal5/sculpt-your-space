
import ProjectCard from './ProjectCard';

// Sample project data - in a real application, you might fetch this from an API
const projects = [
  {
    id: 1,
    title: '3D Product Configurator',
    description: 'Interactive 3D product customization tool built with Three.js and React',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=200',
    technologies: ['Three.js', 'React', 'WebGL'],
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    id: 2,
    title: 'Interactive Data Visualization',
    description: 'Dynamic 3D data visualization dashboard using WebGL and GLSL shaders',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=200',
    technologies: ['WebGL', 'D3.js', 'GLSL'],
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    id: 3,
    title: 'Immersive Web Experience',
    description: 'Award-winning immersive scrolling experience with 3D parallax effects',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=200',
    technologies: ['Three.js', 'GSAP', 'React'],
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    id: 4,
    title: 'Virtual Reality Tour',
    description: 'Web-based VR experience built using WebXR and Three.js',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=200',
    technologies: ['WebXR', 'Three.js', 'React'],
    demoUrl: '#',
    codeUrl: '#',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center mb-12">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              demoUrl={project.demoUrl}
              codeUrl={project.codeUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'design' | 'tools' | '3d';
  proficiency: 'Primary' | 'Advanced' | 'Working Knowledge';
  level: number;
  description: string;
  usedInProjects: string[];
  iconName: string;
}

export interface TimelineMilestone {
  year: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  highlight: string;
}

export const SKILL_NODES: SkillItem[] = [
  // Frontend
  {
    id: 'react',
    name: 'React 18',
    category: 'frontend',
    proficiency: 'Primary',
    level: 95,
    description: 'Component architecture, custom hooks, state management, and performance optimization.',
    usedInProjects: ['Sculpt Your Space', 'QuickCart E-Commerce', 'Shareable FileHub'],
    iconName: 'Code'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    proficiency: 'Primary',
    level: 90,
    description: 'Strict type safety, generics, utility types, and enterprise data models.',
    usedInProjects: ['Sculpt Your Space', 'QuickCart E-Commerce'],
    iconName: 'FileCode'
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    proficiency: 'Primary',
    level: 92,
    description: 'Async/await, DOM APIs, Closures, Modules, and Modern ES Features.',
    usedInProjects: ['All Projects'],
    iconName: 'Terminal'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    proficiency: 'Primary',
    level: 88,
    description: 'Server Side Rendering (SSR), App Router, API routes, and static generation.',
    usedInProjects: ['QuickCart E-Commerce', 'Shareable FileHub'],
    iconName: 'Layers'
  },

  // 3D & WebGL
  {
    id: 'threejs',
    name: 'Three.js',
    category: '3d',
    proficiency: 'Primary',
    level: 85,
    description: '3D scene graph, camera matrices, lighting, geometry, and material pipelines.',
    usedInProjects: ['Sculpt Your Space', 'Immersive 3D Canvas'],
    iconName: 'Box'
  },
  {
    id: 'r3f',
    name: 'React Three Fiber / Drei',
    category: '3d',
    proficiency: 'Primary',
    level: 85,
    description: 'Declarative 3D components, hook-based frame loops, and Orbit/Camera controllers.',
    usedInProjects: ['Sculpt Your Space', 'Immersive 3D Canvas'],
    iconName: 'Sparkles'
  },
  {
    id: 'webgl-glsl',
    name: 'WebGL & GLSL',
    category: '3d',
    proficiency: 'Advanced',
    level: 78,
    description: 'Custom vertex & fragment shaders, noise functions, and particle instancing.',
    usedInProjects: ['Sculpt Your Space'],
    iconName: 'Cpu'
  },

  // Styling & Motion
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    proficiency: 'Primary',
    level: 95,
    description: 'Utility-first responsive design, custom theme tokens, and glassmorphism styling.',
    usedInProjects: ['All Projects'],
    iconName: 'Palette'
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion & GSAP',
    category: 'frontend',
    proficiency: 'Primary',
    level: 88,
    description: 'Scroll-triggered choreography, spring physics, layout animations, and timeline controls.',
    usedInProjects: ['Sculpt Your Space', 'Immersive 3D Canvas'],
    iconName: 'Activity'
  },

  // Backend & Cloud
  {
    id: 'nodejs',
    name: 'Node.js & Express',
    category: 'backend',
    proficiency: 'Advanced',
    level: 80,
    description: 'RESTful API construction, middleware pipelines, and server runtime.',
    usedInProjects: ['QuickCart E-Commerce', 'Shareable FileHub'],
    iconName: 'Server'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'backend',
    proficiency: 'Working Knowledge',
    level: 72,
    description: 'NoSQL document schemas, aggregation frameworks, and database persistence.',
    usedInProjects: ['QuickCart E-Commerce'],
    iconName: 'Database'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'backend',
    proficiency: 'Working Knowledge',
    level: 70,
    description: 'Relational data models, SQL queries, indexing, and joins.',
    usedInProjects: ['Backend Microservices'],
    iconName: 'Database'
  },

  // Tools & QA
  {
    id: 'playwright',
    name: 'Playwright E2E',
    category: 'tools',
    proficiency: 'Advanced',
    level: 82,
    description: 'Automated end-to-end integration testing, UI verification, and regression prevention.',
    usedInProjects: ['Sculpt Your Space'],
    iconName: 'CheckCircle'
  },
  {
    id: 'git-docker',
    name: 'Git & Docker',
    category: 'tools',
    proficiency: 'Advanced',
    level: 85,
    description: 'Version control, branch workflows, containerization, and deployment pipelines.',
    usedInProjects: ['All Projects'],
    iconName: 'GitBranch'
  }
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: '2023',
    stepNumber: '01',
    title: 'Core Foundations & Web Engineering',
    subtitle: 'Mastering Full-Stack Web Development',
    description: 'Deep-dived into modern JavaScript ES6+, React architecture, state management, and component-driven UI systems.',
    technologies: ['HTML5/CSS3', 'JavaScript', 'React', 'Tailwind CSS'],
    highlight: 'Built robust responsive web platforms and user interface systems.'
  },
  {
    year: '2024',
    stepNumber: '02',
    title: 'Full-Stack & Cloud Applications',
    subtitle: 'Scalable Products & Backends',
    description: 'Expanded expertise into Next.js, Node.js API development, MongoDB/PostgreSQL database design, and cloud file management.',
    technologies: ['Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
    highlight: 'Engineered QuickCart E-Commerce and Shareable FileHub cloud platform.'
  },
  {
    year: '2025',
    stepNumber: '03',
    title: '3D WebGL & Creative Engineering',
    subtitle: 'Bridging Design & Immersive 3D',
    description: 'Specialized in Three.js, React Three Fiber, WebGL shaders, volumetric particle systems, and hardware-accelerated visual graphics.',
    technologies: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'Framer Motion', 'GSAP'],
    highlight: 'Architected the interactive Sculpt Your Space portfolio environment.'
  },
  {
    year: '2026+',
    stepNumber: '04',
    title: 'AI & Next-Gen Spatial Web',
    subtitle: 'Pioneering Intelligent Digital Experiences',
    description: 'Combining WebGL spatial computing, WebXR immersive tours, and AI intelligence pipelines to sculpt next-generation web platforms.',
    technologies: ['WebXR', 'Spatial Computing', 'AI Integration', 'Performance Engineering'],
    highlight: 'Building interactive high-impact digital experiences.'
  }
];

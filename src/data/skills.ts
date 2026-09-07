export interface SkillItem {
  id: string;
  name: string;
  category: 'languages' | 'ai-ml' | 'development' | 'cloud-database' | 'tools';
  proficiency: 'Primary' | 'Advanced' | 'Working Knowledge';
  level: number;
  description: string;
  usedInProjects: string[];
  iconName: string;
}

export const SKILL_NODES: SkillItem[] = [
  // Languages
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    proficiency: 'Primary',
    level: 80,
    description:
      'Async pipelines, FastAPI backends, AI workflows, and data processing for production AI systems.',
    usedInProjects: ['IntelliForge', 'Sentinel AI'],
    iconName: 'Terminal',
  },
  {
    id: 'java',
    name: 'Java',
    category: 'languages',
    proficiency: 'Advanced',
    level: 75,
    description: 'Object-oriented programming, backend development, and enterprise application patterns.',
    usedInProjects: ['Academic Projects'],
    iconName: 'FileCode',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'languages',
    proficiency: 'Primary',
    level: 80,
    description: 'Modern ES6+, React.js applications, and interactive frontend development.',
    usedInProjects: ['Sentinel AI', 'Orinson Technologies Internship'],
    iconName: 'Code',
  },

  // AI / ML
  {
    id: 'generative-ai',
    name: 'Generative AI',
    category: 'ai-ml',
    proficiency: 'Primary',
    level: 82,
    description: 'LLM APIs, prompt engineering, Google Cloud AI services, and LLM-powered automation.',
    usedInProjects: ['IntelliForge', 'Google Cloud GenAI Internship'],
    iconName: 'Sparkles',
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    category: 'ai-ml',
    proficiency: 'Advanced',
    level: 80,
    description: 'ML model integration, training workflows, and intelligent system design.',
    usedInProjects: ['Sentinel AI', 'IntelliForge'],
    iconName: 'Brain',
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision',
    category: 'ai-ml',
    proficiency: 'Primary',
    level: 80,
    description: 'Real-time visual processing, object detection pipelines, and incident recognition systems.',
    usedInProjects: ['Sentinel AI'],
    iconName: 'Eye',
  },
  {
    id: 'yolov8',
    name: 'YOLOv8',
    category: 'ai-ml',
    proficiency: 'Primary',
    level: 75,
    description: 'Object detection for real-time accident and violence detection from CCTV feeds.',
    usedInProjects: ['Sentinel AI'],
    iconName: 'Box',
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'ai-ml',
    proficiency: 'Advanced',
    level: 75,
    description: 'Video processing pipelines, frame analysis, and low-latency visual preprocessing.',
    usedInProjects: ['Sentinel AI'],
    iconName: 'Cpu',
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'ai-ml',
    proficiency: 'Working Knowledge',
    level: 70,
    description: 'Deep learning model development and neural network experimentation.',
    usedInProjects: ['Academic AI Projects'],
    iconName: 'Layers',
  },

  // Development
  {
    id: 'react',
    name: 'React.js',
    category: 'development',
    proficiency: 'Primary',
    level: 80,
    description: 'Component architecture, state management, and responsive dashboard interfaces.',
    usedInProjects: ['Sentinel AI', 'Orinson Technologies Internship'],
    iconName: 'Code',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'development',
    proficiency: 'Advanced',
    level: 80,
    description: 'Server-side JavaScript runtime for API services and backend integrations.',
    usedInProjects: ['Full-Stack Projects'],
    iconName: 'Server',
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'development',
    proficiency: 'Advanced',
    level: 78,
    description: 'RESTful API construction, middleware pipelines, and backend routing.',
    usedInProjects: ['Full-Stack Projects'],
    iconName: 'Server',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'development',
    proficiency: 'Primary',
    level: 80,
    description: 'Utility-first responsive design and modern UI development.',
    usedInProjects: ['Sentinel AI', 'Orinson Technologies Internship'],
    iconName: 'Palette',
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'development',
    proficiency: 'Primary',
    level: 75,
    description: 'High-performance Python REST APIs for AI backends and real-time applications.',
    usedInProjects: ['Sentinel AI', 'IntelliForge'],
    iconName: 'Server',
  },

  // Cloud & Database
  {
    id: 'google-cloud',
    name: 'Google Cloud',
    category: 'cloud-database',
    proficiency: 'Advanced',
    level: 65,
    description: 'Google Cloud AI services, Generative AI tools, and cloud-based AI workflows.',
    usedInProjects: ['Google Cloud GenAI Internship'],
    iconName: 'Cloud',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'cloud-database',
    proficiency: 'Primary',
    level: 75,
    description: 'NoSQL document schemas, incident management, and AI pipeline data persistence.',
    usedInProjects: ['IntelliForge', 'Sentinel AI'],
    iconName: 'Database',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'cloud-database',
    proficiency: 'Working Knowledge',
    level: 65,
    description: 'Relational data models, SQL queries, and structured database management.',
    usedInProjects: ['Academic Projects'],
    iconName: 'Database',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'cloud-database',
    proficiency: 'Working Knowledge',
    level: 70,
    description: 'Backend-as-a-service with PostgreSQL, authentication, and real-time subscriptions.',
    usedInProjects: ['Full-Stack Projects'],
    iconName: 'Database',
  },

  // Tools
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    proficiency: 'Primary',
    level: 88,
    description: 'Version control, branch workflows, and collaborative development practices.',
    usedInProjects: ['All Projects'],
    iconName: 'GitBranch',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'tools',
    proficiency: 'Primary',
    level: 90,
    description: 'Repository management, code reviews, and open-source collaboration.',
    usedInProjects: ['All Projects'],
    iconName: 'GitBranch',
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'tools',
    proficiency: 'Advanced',
    level: 82,
    description: 'API testing, REST endpoint validation, and integration debugging.',
    usedInProjects: ['Sentinel AI', 'IntelliForge'],
    iconName: 'Terminal',
  },
];

export interface SkillCategory {
  id: SkillItem['category'];
  name: string;
  label: string;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  { id: 'languages', name: 'Languages', label: 'LANGUAGES' },
  { id: 'ai-ml', name: 'AI / ML', label: 'AI / ML' },
  { id: 'development', name: 'Development', label: 'DEVELOPMENT' },
  { id: 'cloud-database', name: 'Cloud & Database', label: 'CLOUD & DATABASE' },
  { id: 'tools', name: 'Tools', label: 'TOOLS' },
];

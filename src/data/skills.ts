export interface SkillItem {
  id: string;
  name: string;
  category: 'languages' | 'ai-ml' | 'development' | 'cloud-database' | 'tools';
  proficiency: 'Primary' | 'Advanced' | 'Working Knowledge';
  level?: number; // Optional backwards compatibility
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
    description:
      'Async architectures, FastAPI backends, AI workflows, and data processing for production AI systems.',
    usedInProjects: ['IntelliForge', 'Sentinel AI'],
    iconName: 'Terminal',
  },
  {
    id: 'javascript',
    name: 'JavaScript / TypeScript',
    category: 'languages',
    proficiency: 'Primary',
    description: 'Modern ES6+, React.js applications, responsive dashboards, and interactive interfaces.',
    usedInProjects: ['Sentinel AI', 'Orinson Technologies Internship'],
    iconName: 'Code',
  },
  {
    id: 'java',
    name: 'Java',
    category: 'languages',
    proficiency: 'Advanced',
    description: 'Object-oriented programming, data structures, backend logic, and enterprise application patterns.',
    usedInProjects: ['Academic Projects'],
    iconName: 'FileCode',
  },

  // AI & Generative AI
  {
    id: 'generative-ai',
    name: 'Generative AI & LLMs',
    category: 'ai-ml',
    proficiency: 'Primary',
    description: 'LLM orchestration, prompt engineering, Google Cloud AI services, and automated workflow agents.',
    usedInProjects: ['IntelliForge', 'Google Cloud GenAI Internship'],
    iconName: 'Sparkles',
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision & YOLOv8',
    category: 'ai-ml',
    proficiency: 'Primary',
    description: 'Real-time visual processing, object detection pipelines, and incident recognition systems.',
    usedInProjects: ['Sentinel AI'],
    iconName: 'Eye',
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'ai-ml',
    proficiency: 'Advanced',
    description: 'Video frame analysis, RTSP stream ingestion, and low-latency visual preprocessing.',
    usedInProjects: ['Sentinel AI'],
    iconName: 'Cpu',
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    category: 'ai-ml',
    proficiency: 'Advanced',
    description: 'Model evaluation, classification workflows, and intelligent system design.',
    usedInProjects: ['Sentinel AI', 'IntelliForge'],
    iconName: 'Brain',
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'ai-ml',
    proficiency: 'Working Knowledge',
    description: 'Deep learning model experimentation, tensor computation, and neural network foundations.',
    usedInProjects: ['Academic AI Projects'],
    iconName: 'Layers',
  },

  // Backend & Full-Stack Development
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'development',
    proficiency: 'Primary',
    description: 'High-throughput async Python REST endpoints, OpenAPI docs, and AI service backends.',
    usedInProjects: ['Sentinel AI', 'IntelliForge'],
    iconName: 'Server',
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'development',
    proficiency: 'Primary',
    description: 'Production component design, state architecture, and telemetry-rich dashboards.',
    usedInProjects: ['Sentinel AI', 'Orinson Technologies Internship'],
    iconName: 'Code',
  },
  {
    id: 'nodejs',
    name: 'Node.js & Express',
    category: 'development',
    proficiency: 'Advanced',
    description: 'Backend services, RESTful routing, middleware authentication, and event handling.',
    usedInProjects: ['Full-Stack Projects', 'Orinson Technologies Internship'],
    iconName: 'Server',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'development',
    proficiency: 'Primary',
    description: 'Custom UI design systems, responsive mobile layouts, and high-performance styling.',
    usedInProjects: ['Sentinel AI', 'Orinson Technologies Internship'],
    iconName: 'Palette',
  },

  // Cloud & Databases
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'cloud-database',
    proficiency: 'Primary',
    description: 'Document schema design, aggregation pipelines, incident records, and data persistence.',
    usedInProjects: ['IntelliForge', 'Sentinel AI'],
    iconName: 'Database',
  },
  {
    id: 'google-cloud',
    name: 'Google Cloud Platform',
    category: 'cloud-database',
    proficiency: 'Advanced',
    description: 'Vertex AI, GenAI APIs, Cloud Storage, and cloud-native AI pipeline deployment.',
    usedInProjects: ['Google Cloud GenAI Internship'],
    iconName: 'Cloud',
  },
  {
    id: 'mysql',
    name: 'MySQL & PostgreSQL',
    category: 'cloud-database',
    proficiency: 'Working Knowledge',
    description: 'Relational data modeling, ACID transactions, complex queries, and schema migrations.',
    usedInProjects: ['Academic Projects', 'Full-Stack Projects'],
    iconName: 'Database',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'cloud-database',
    proficiency: 'Working Knowledge',
    description: 'PostgreSQL-backed BaaS, auth policies, real-time channels, and storage buckets.',
    usedInProjects: ['Full-Stack Projects'],
    iconName: 'Database',
  },

  // Tools & Workflow
  {
    id: 'git-github',
    name: 'Git & GitHub',
    category: 'tools',
    proficiency: 'Primary',
    description: 'Trunk-based workflow, branch protection, CI/CD code reviews, and semantic versioning.',
    usedInProjects: ['All Projects'],
    iconName: 'GitBranch',
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'tools',
    proficiency: 'Advanced',
    description: 'API contract testing, automated test collections, and REST endpoint verification.',
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
  { id: 'ai-ml', name: 'AI & Generative AI', label: 'AI & GENERATIVE AI' },
  { id: 'development', name: 'Backend & Interfaces', label: 'BACKEND & INTERFACES' },
  { id: 'languages', name: 'Core Languages', label: 'CORE LANGUAGES' },
  { id: 'cloud-database', name: 'Cloud & Databases', label: 'CLOUD & DATABASES' },
  { id: 'tools', name: 'DevOps & Tools', label: 'DEVOPS & TOOLS' },
];

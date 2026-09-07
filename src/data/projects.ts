export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'AI Engineering' | 'Computer Vision' | 'Full-Stack Engineering';
  year: string;
  shortDescription: string;
  fullDescription: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  technologies: string[];
  architecture: string;
  challenges: string;
  results: string;
  image: string;
  demoUrl: string;
  codeUrl: string;
  featured?: boolean;
}

export const PROJECTS_DATA: Project[] = [


  {
    id: 'nutritrack-ai',
    number: '01',
    title: 'NutriTrackAI',
    subtitle: 'AI-Powered Nutrition & Fitness Coach',
    category: 'AI Engineering',
    year: '2026',
    shortDescription:
      'AI-powered food and fitness tracking platform that converts natural-language meal logs into nutritional insights and provides personalized fitness coaching.',
    fullDescription:
      'Built a modern AI-powered nutrition and fitness tracking application that combines intelligent food logging, personalized AI coaching, and statistical analysis. Users can describe meals using natural language, while the AI extracts nutritional information and estimates calories and macronutrients. The platform also provides a conversational fitness coach, real-time progress dashboards, responsive nutritional charts, and personalized guidance powered through OpenRouter.',
    problem:
      'Traditional calorie and fitness tracking applications require users to manually search for foods, enter nutritional values, and interpret their progress. This creates friction in everyday tracking and makes personalized fitness guidance difficult to maintain.',
    solution:
      'Engineered a full-stack AI nutrition platform where users can log meals naturally through conversational input. The backend processes the input through OpenRouter LLMs, extracts structured nutritional information, stores tracking data in MongoDB, and provides personalized fitness recommendations through an AI coaching experience.',
    keyFeatures: [
      'Natural-language AI food logging and nutritional analysis',
      'Automatic calorie and macronutrient extraction',
      'Personalized conversational AI fitness coach',
      'Real-time nutrition and fitness progress dashboard',
      'Interactive charts and statistical analysis using Recharts',
      'Responsive UI with dynamic light/dark theming',
      'MongoDB Atlas persistence with Mongoose',
      'OpenRouter integration with cost-effective free-tier AI models',
    ],
    technologies: [
      'React',
      'Vite',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'OpenRouter',
      'Tailwind CSS',
      'Framer Motion',
      'Recharts',
      'React Query',
      'shadcn/ui',
    ],
    architecture:
      'React/Vite single-page application using Wouter for routing and React Query for client-side data management. An Express.js backend runs alongside Vite through a unified server architecture, while MongoDB Atlas provides persistent storage. OpenRouter handles AI-powered food analysis and conversational fitness coaching, with structured nutritional data returned to the application for dashboard visualization.',
    challenges:
      'Designing reliable natural-language food analysis while maintaining structured nutritional data, integrating AI responses into a production-style full-stack workflow, and creating a unified development architecture that avoids unnecessary CORS and proxy complexity.',
    results:
      'Delivered a production-oriented AI nutrition platform with natural-language food tracking, personalized AI coaching, persistent nutrition data, interactive progress analytics, and a unified React + Express architecture.',
    image: "./src/Imagecomponents/Screenshot 2026-09-05 203535.png",

    demoUrl: 'https://nutritrack-eight.vercel.app/',
    codeUrl: 'https://github.com/srajal5/Nutritrack',
    featured: true,
  }, {
    id: 'sentinel-ai',
    number: '02',
    title: 'Sentinel AI',
    subtitle: 'AI-Powered Surveillance Platform',
    category: 'Computer Vision',
    year: '2025',
    shortDescription:
      'AI-powered surveillance platform for real-time road accident and violence detection from CCTV feeds using YOLOv8, OpenCV, FastAPI, and MongoDB.',
    fullDescription:
      'AI-powered surveillance platform for real-time road accident and violence detection from CCTV feeds. Built with YOLOv8 object detection, OpenCV processing pipeline, FastAPI backend, MongoDB incident management, analytics, automated emergency alerts, live monitoring dashboard, real-time incident visualization, and response coordination.',
    problem:
      'CCTV surveillance systems generate continuous feeds but lack real-time intelligent detection for critical incidents like road accidents and violence, delaying emergency response.',
    solution:
      'Built a full-stack AI platform combining YOLOv8 object detection with an OpenCV processing pipeline for low-latency incident recognition, backed by a FastAPI server and MongoDB for incident management and analytics.',
    keyFeatures: [
      'YOLOv8 object detection with OpenCV processing pipeline',
      'Low-latency incident recognition for accidents and violence',
      'FastAPI backend with MongoDB incident management',
      'Analytics and automated emergency alerts',
      'Live monitoring dashboard with real-time incident visualization',
      'Response coordination workflows',
    ],
    technologies: [
      'React.js',
      'FastAPI',
      'MongoDB',
      'YOLOv8',
      'OpenCV',
      'Tailwind CSS',
    ],
    architecture:
      'React.js frontend dashboard connected to a FastAPI backend processing CCTV streams through YOLOv8 and OpenCV, with MongoDB for incident storage, analytics, and alert coordination.',
    challenges:
      'Achieving low-latency real-time detection and visualization across live CCTV feeds while maintaining reliable incident logging and emergency alert delivery.',
    results:
      'Delivered a real-time surveillance platform with automated incident detection, live dashboard visualization, and emergency alert coordination.',
    image:
      './src/Imagecomponents/Screenshot 2026-08-27 153000.png',
    demoUrl: '#',
    codeUrl: 'https://github.com/srajal5',
    featured: true,
  },
  {
    id: 'filehub',
    number: '03',
    title: 'FileHub',
    subtitle: 'Secure File Sharing Platform',
    category: 'Full-Stack Engineering',
    year: '2026',
    shortDescription:
      'Modern secure file-sharing platform for uploading, managing, and sharing files through authenticated accounts and unique shareable links.',
    fullDescription:
      'Built a modern full-stack file-sharing platform that enables users to securely upload, organize, manage, and share files through unique links. The application combines React and TypeScript with Supabase authentication, PostgreSQL database services, and Supabase Storage. It supports file categorization, search and filtering, multiple viewing modes, subscription-based storage limits, secure sharing workflows, responsive layouts, dark mode, and real-time notifications.',
    problem:
      'Sharing files through traditional methods can be inconvenient, difficult to organize, and limited by storage and access controls. Users need a centralized platform where files can be uploaded, managed, and securely shared without unnecessary complexity.',
    solution:
      'Engineered a responsive file-sharing platform with Supabase-powered authentication, database persistence, and cloud storage. Users can upload and organize files, generate unique sharing links, search their file library, and manage files through an intuitive dashboard with subscription-aware storage limits.',
    keyFeatures: [
      'Secure email/password authentication with Supabase Auth',
      'File uploads with support for files up to 2GB based on plan',
      'File categorization for images, documents, and other files',
      'Search and filtering across uploaded files',
      'Grid and list view modes for file management',
      'Unique shareable links for individual files',
      'Password-protected sharing for supported plans',
      'Free, Pro, and Business storage plans',
      'Responsive dashboard with light/dark mode',
      'Real-time toast notifications and user feedback',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'React Router',
      'Tailwind CSS',
      'Supabase',
      'PostgreSQL',
      'Supabase Storage',
      'TanStack React Query',
      'shadcn/ui',
      'Radix UI',
      'Zod',
      'React Hook Form',
      'Recharts',
    ],
    architecture:
      'React and TypeScript frontend built with Vite and React Router, using Tailwind CSS and shadcn/ui for the interface. Supabase provides authentication, PostgreSQL database services, real-time capabilities, and cloud file storage. TanStack React Query manages server state while Zod and React Hook Form provide structured form validation and handling.',
    challenges:
      'Designing a secure and intuitive file-management workflow while handling large uploads, authentication state, storage limits, sharing permissions, responsive layouts, and cloud storage integration within a client-focused architecture.',
    results:
      'Delivered a production-oriented file-sharing platform with secure authentication, cloud file storage, file organization, searchable dashboards, subscription-aware storage limits, and unique file-sharing workflows.',
    image:
      './src/Imagecomponents/image.png',
    demoUrl: 'https://filesharing-pi.vercel.app/',
    codeUrl: 'https://github.com/srajal5/Sharehub',
    featured: false,
  },
  {
    id: 'intelliforge',
    number: '04',
    title: 'IntelliForge',
    subtitle: 'AI Intelligence Pipeline',
    category: 'AI Engineering',
    year: '2026',
    shortDescription:
      'Async AI intelligence pipeline ingesting research, startups, products, news, and jobs from multiple sources with entity resolution, deduplication, and OpenRouter LLM orchestration.',
    fullDescription:
      'Built an async AI intelligence pipeline ingesting research, startups, products, news, and jobs from multiple sources. Features entity resolution, deduplication, checkpointing, retries, rate limiting, 24-hour freshness validation, and OpenRouter LLM orchestration with structured validation, chunking, fallback handling, secure credential redaction, and Google Sheets export.',
    problem:
      'Aggregating and validating intelligence from fragmented sources at scale requires robust deduplication, freshness checks, and reliable LLM orchestration without data loss or security exposure.',
    solution:
      'Engineered an async Python pipeline with AsyncIO, MongoDB persistence, checkpointing, retries, and rate limiting — orchestrating OpenRouter LLMs with structured validation, chunking, fallback handling, and secure credential redaction.',
    keyFeatures: [
      'Entity resolution and deduplication across 5,400+ records',
      'Checkpointing, retries, and rate limiting for resilient ingestion',
      '24-hour freshness validation pipeline',
      'OpenRouter LLM orchestration with structured validation and chunking',
      'Fallback handling and secure credential redaction',
      'Google Sheets export integration',
    ],
    technologies: ['Python', 'AsyncIO', 'MongoDB', 'OpenRouter'],
    architecture:
      'Async Python ingestion pipeline with MongoDB storage, checkpoint-based recovery, rate-limited API calls, OpenRouter LLM orchestration layer, and structured validation before export.',
    challenges:
      'Ensuring zero duplicates and zero invalid records across high-volume multi-source ingestion while maintaining 24-hour freshness and secure credential handling.',
    results:
      '363/363 tests passed with 0 duplicates, 0 invalid records, and 0 SAST vulnerabilities across 5,400+ records.',
    image:
      'https://images.unsplash.com/photo-1677440866019-21743ec58850?auto=format&fit=crop&q=80&w=1000',
    demoUrl: '#',
    codeUrl: 'https://github.com/srajal5/IntelliForge',
    featured: true,
  },
];

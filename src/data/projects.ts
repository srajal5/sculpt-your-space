import ecomImage from '@/Imagecomponents/Screenshot 2025-04-17 090906.png';
import shareableImage from '@/Imagecomponents/image.png';

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack Web' | 'Web3 & Cloud' | '3D & WebGL' | 'VR & Interactive';
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
    id: 'quickcart-ecommerce',
    number: '01',
    title: 'QuickCart E-Commerce',
    subtitle: 'High-Performance Modern E-Commerce Platform',
    category: 'Full-Stack Web',
    year: '2025',
    shortDescription: 'Interactive, full-featured e-commerce platform built with React, Next.js, and Tailwind CSS. Features dynamic product catalogs, seamless shopping cart management, and instant checkout flows.',
    fullDescription: 'QuickCart is a full-featured e-commerce web application engineered for speed, usability, and modern visual design. It provides shoppers with real-time product filtering, interactive cart state updates, dynamic search capabilities, and a streamlined responsive checkout workflow.',
    problem: 'Traditional e-commerce templates often suffer from sluggish page transitions, cluttered UI layouts, and unoptimized shopping cart state synchronization across devices.',
    solution: 'Designed and engineered a lightweight client-driven architecture using React and Tailwind CSS that delivers instantaneous product catalog rendering, optimistic UI updates for cart modifications, and fluid checkout feedback.',
    keyFeatures: [
      'Interactive product filtering & real-time search',
      'Optimistic state management for shopping cart operations',
      'Fully responsive dynamic grid layout across mobile & desktop',
      'Streamlined multi-step checkout workflow'
    ],
    technologies: ['JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Node.js'],
    architecture: 'Component-driven frontend SPA using React state hooks with modular Tailwind utility styling and serverless backend API integrations.',
    challenges: 'Ensuring ultra-fast load times and state persistence across session updates without compromising high-resolution product image presentation.',
    results: 'Achieved sub-second page transition times, 100% responsive viewport alignment, and seamless shopping cart usability.',
    image: ecomImage,
    demoUrl: 'https://e-commerce1-silk-one.vercel.app/',
    codeUrl: 'https://github.com/srajal5/QuickCart',
    featured: true
  },
  {
    id: 'shareable-filehub',
    number: '02',
    title: 'Shareable FileHub',
    subtitle: 'Secure Cloud-Based File Sharing Platform',
    category: 'Web3 & Cloud',
    year: '2025',
    shortDescription: 'A secure, cloud-enabled file-sharing platform offering drag-and-drop uploads, instant link generation, access controls, and fast cloud delivery.',
    fullDescription: 'Shareable FileHub enables users to securely upload, store, and manage files in the cloud with instant link generation for collaborative sharing. Built with a focus on simplicity, data privacy, and rapid file transfers.',
    problem: 'Existing file sharing tools are frequently bloated with ad clutter, restrictive file size throttles, or unintuitive download interfaces.',
    solution: 'Engineered a clean, focused file-sharing platform featuring drag-and-drop file ingestion, visual upload progress monitoring, generated shareable links, and direct access controls.',
    keyFeatures: [
      'Drag-and-drop file upload interface with real-time progress indicators',
      'Instant shareable URL generation and clipboard copying',
      'Secure file storage with structured download endpoints',
      'Clean, ad-free glassmorphic user interface'
    ],
    technologies: ['JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Node.js'],
    architecture: 'Next.js API route handlers integrated with cloud storage buckets and client-side reactive upload tracking.',
    challenges: 'Handling concurrent large-file streams efficiently while preserving UI responsiveness and accurate progress feedback.',
    results: 'Delivered a streamlined file hub supporting multi-format files with instantaneous sharing link generation.',
    image: shareableImage,
    demoUrl: 'https://filesharing-a6llxgsqu-srajal5s-projects.vercel.app/',
    codeUrl: 'https://github.com/srajal5/shareable-filehub',
    featured: true
  },
  {
    id: 'immersive-3d-experience',
    number: '03',
    title: 'Immersive 3D Canvas',
    subtitle: 'Interactive WebGL Visual & Parallax Experience',
    category: '3D & WebGL',
    year: '2025',
    shortDescription: 'Award-worthy interactive scrolling digital experience featuring custom WebGL shaders, 3D parallax cameras, volumetric aurora waves, and procedural particle physics.',
    fullDescription: 'An interactive 3D WebGL web application engineered using Three.js and React Three Fiber. Incorporates custom vertex and fragment shaders to render floating crystals, procedural nebula clouds, and real-time mouse-tracked camera parallax.',
    problem: 'Static web pages struggle to captivate modern users seeking memorable visual storytelling and interactive digital environments.',
    solution: 'Developed a high-performance 3D scene engine using custom GLSL shaders and GPU-instanced particle systems that execute smoothly at 60 FPS without blocking main thread interactions.',
    keyFeatures: [
      'Custom WebGL vertex & fragment GLSL shader effects',
      'Mouse-tracked smooth camera parallax with spring damping',
      'Procedural nebula cloud particle systems with instanced rendering',
      'Volumetric aurora wave terrains and metallic crystal geometries'
    ],
    technologies: ['Three.js', 'React Three Fiber', 'React Three Drei', 'WebGL', 'GLSL', 'Framer Motion'],
    architecture: 'Declarative R3F component tree utilizing WebGL instanced geometry, custom shader materials, and frame-loop tick animations.',
    challenges: 'Maintaining 60 FPS performance across lower-power mobile devices by optimizing shader passes, draw calls, and particle counts.',
    results: 'Delivered an immersive WebGL environment running smoothly on desktop and mobile viewports.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1000',
    demoUrl: 'https://github.com/srajal5/sculpt-your-space',
    codeUrl: 'https://github.com/srajal5/sculpt-your-space',
    featured: true
  },
  {
    id: 'virtual-reality-tour',
    number: '04',
    title: 'WebXR Virtual Reality Tour',
    subtitle: 'Cross-Platform Web-Based VR Environment',
    category: 'VR & Interactive',
    year: '2025',
    shortDescription: 'Cross-platform WebXR virtual reality environment allowing users to explore 3D spatial environments directly in the browser or via VR head-mounted displays.',
    fullDescription: 'A WebXR-powered virtual reality application allowing users to navigate through interactive 3D virtual spaces with real-time collision boundaries, spatial audio, and interactive 3D artifacts.',
    problem: 'Consuming 3D virtual environments typically requires bulky native app downloads or heavy gaming hardware.',
    solution: 'Built an in-browser WebXR platform leveraging Three.js and WebGL standards to deliver zero-install VR tours accessible on standard browsers and head-mounted displays.',
    keyFeatures: [
      'WebXR browser compatibility for VR head-mounted displays',
      'Interactive 3D spatial node navigation and teleportation',
      'Real-time physical lighting and texture mapping',
      'Cross-device fallback for 2D desktop & touch controls'
    ],
    technologies: ['WebXR', 'Three.js', 'React', 'TypeScript', 'Tailwind CSS'],
    architecture: 'WebXR session API manager integrated with Three.js rendering pipeline and fallback desktop camera orbit controls.',
    challenges: 'Optimizing high-polygon 3D asset meshes and lighting calculations for low latency stereo rendering.',
    results: 'Achieved fluid 90Hz stereo frame rates in browser WebXR environments.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1000',
    demoUrl: 'https://github.com/srajal5',
    codeUrl: 'https://github.com/srajal5',
    featured: true
  }
];

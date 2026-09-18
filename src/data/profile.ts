export interface ProfileData {
  name: string;
  role: string;
  secondaryRole: string;
  eyebrow: string;
  course: string;
  college: string;
  location: string;
  status: string;
  graduationYear: string;
  educationPeriod: string;
  cgpa: string;
  tagline: string;
  heroLead: string;
  bio: string;
  resumeUrl: string;
  proofMetrics: Array<{
    stat: string;
    label: string;
    detail: string;
  }>;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
}

export const PROFILE_DATA: ProfileData = {
  name: 'Srajal Puri',
  role: 'AI / Full-Stack Engineer',
  secondaryRole: 'Generative AI & Computer Vision',
  eyebrow: 'AI / GENERATIVE AI / FULL-STACK ENGINEER',
  course: 'MCA',
  college: 'Dr. D. Y. Patil School of Science and Technology',
  location: 'Pune, India',
  status: 'AVAILABLE FOR OPPORTUNITIES',
  graduationYear: '2027',
  educationPeriod: 'Aug 2025 – Present',
  cgpa: '8.95',
  tagline:
    'MCA student specializing in Artificial Intelligence, Generative AI, and Full Stack AI Engineering — building AI-powered applications and workflows with Python, FastAPI, React.js, MongoDB, and LLM APIs.',
  heroLead:
    'Building intelligent AI-powered applications and scalable full-stack systems with',
  bio: 'MCA student specializing in Artificial Intelligence, Generative AI, and Full Stack AI Engineering, with hands-on experience building AI-powered applications and workflows using Python, FastAPI, React.js, MongoDB, and LLM APIs. Experienced in scalable AI systems, REST APIs, real-time applications, and LLM-powered automation.',
  resumeUrl: '/resume.pdf',
  proofMetrics: [
    {
      stat: '5,400+',
      label: 'Records Ingested',
      detail: 'Multi-source async pipeline with entity resolution & deduplication',
    },
    {
      stat: '363/363',
      label: 'Tests Passing',
      detail: '100% test coverage with zero duplicates & zero SAST vulnerabilities',
    },
    {
      stat: '800+',
      label: 'Users Supported',
      detail: 'Production applications engineered with React.js & optimized REST APIs',
    },
    {
      stat: '30%',
      label: 'Mobile UI Gain',
      detail: 'Measurable responsiveness and usability improvement delivered in production',
    },
  ],
  socials: {
    github: 'https://github.com/srajal5',
    linkedin: 'https://www.linkedin.com/in/srajalpuri',
    twitter: 'https://twitter.com',
    email: 'mailto:Srajalpuri55@gmail.com',
  },
};


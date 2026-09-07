export interface ExperienceEntry {
  id: string;
  title: string;
  organization: string;
  date: string;
  type: string;
  details: string[];
}

export const EXPERIENCE_DATA: ExperienceEntry[] = [
  {
    id: 'google-cloud-genai',
    title: 'Google Cloud Generative AI Virtual Internship',
    organization: 'SmartBridge & SmartInternz (AICTE)',
    date: 'Sep 2025 – Oct 2025',
    type: 'Remote',
    details: [
      'Completed an AICTE-supported virtual internship on Google Cloud Generative AI.',
      'Worked with LLMs, prompt engineering, and Google Cloud AI services.',
      'Applied Generative AI concepts through hands-on projects and practical learning.',
    ],
  },
  {
    id: 'orinson-frontend',
    title: 'Frontend Developer Intern',
    organization: 'Orinson Technologies',
    date: 'Aug 2024 – Nov 2024',
    type: 'Remote',
    details: [
      'Developed 2 web applications using React.js, Next.js, Tailwind CSS, and REST APIs, supporting 800+ users.',
      'Improved application responsiveness and mobile usability by 30% through optimized UI development.',
      'Collaborated with developers in an Agile environment using Git, sprint planning, and code reviews.',
    ],
  },
];

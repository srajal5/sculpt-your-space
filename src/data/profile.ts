export interface ProfileData {
  name: string;
  role: string;
  secondaryRole: string;
  course: string;
  college: string;
  location: string;
  status: string;
  graduationYear: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
}

export const PROFILE_DATA: ProfileData = {
  name: 'Srajal Puri',
  role: 'Creative Full-Stack Developer',
  secondaryRole: '3D Web Developer & AI Engineer',
  course: 'MCA',
  college: 'Dr. D. Y. Patil School of Science and Technology',
  location: 'Pune, India',
  status: 'AVAILABLE FOR OPPORTUNITIES',
  graduationYear: '2027',
  tagline: 'Building intelligent and immersive digital experiences with modern full-stack technologies, AI, and 3D/WebGL.',
  bio: 'Transforming complex digital ideas into fluid, interactive, hardware-accelerated web applications and spatial visual computing environments.',
  avatarUrl: '/profile-avatar.svg',
  socials: {
    github: 'https://github.com/srajal5',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    email: 'mailto:Srajalpuri55@gmail.com',
  },
};

import { ChevronUp, FileText, Sparkles } from 'lucide-react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { PROFILE_DATA } from '@/data/profile';
import { setCursorState } from '@/lib/cursor';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 border-t border-white/10 bg-black/60 backdrop-blur-xl relative z-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-neon-purple/15 border border-neon-purple/30 text-neon-purple">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <p className="font-mono text-lg font-bold text-foreground tracking-tight">
                {PROFILE_DATA.name}
              </p>
              <p className="text-xs font-mono text-neon-cyan">
                {PROFILE_DATA.role}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs font-mono">
            <a
              href="#home"
              className="text-muted-foreground hover:text-neon-cyan transition-colors"
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
            >
              HOME
            </a>
            <a
              href="#projects"
              className="text-muted-foreground hover:text-neon-cyan transition-colors"
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
            >
              PROJECTS
            </a>
            <a
              href="#about"
              className="text-muted-foreground hover:text-neon-cyan transition-colors"
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
            >
              ABOUT
            </a>
            <a
              href="#skills"
              className="text-muted-foreground hover:text-neon-cyan transition-colors"
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
            >
              SKILLS
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-neon-cyan transition-colors"
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
            >
              CONTACT
            </a>
            <a
              href={PROFILE_DATA.resumeUrl}
              download="Srajal_Puri_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-blue hover:text-neon-cyan font-bold flex items-center gap-1 transition-colors"
              onMouseEnter={() => setCursorState('hover', 'RESUME')}
              onMouseLeave={() => setCursorState('default')}
            >
              <FileText className="w-3 h-3" />
              RESUME (.PDF)
            </a>
          </div>

          <button
            type="button"
            className="w-10 h-10 rounded-xl glassmorphism border border-white/15 bg-white/5 flex items-center justify-center cursor-pointer hover:border-neon-purple/50 hover:bg-neon-purple/10 text-muted-foreground hover:text-foreground transition-all shadow-sm"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            onMouseEnter={() => setCursorState('hover', 'TOP')}
            onMouseLeave={() => setCursorState('default')}
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground">
          <p>
            © {currentYear} {PROFILE_DATA.name}. Built with React, Three.js & Framer Motion.
          </p>

          <div className="flex items-center gap-3">
            <a
              href={PROFILE_DATA.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-neon-cyan border border-white/5 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={16} />
            </a>
            <a
              href={PROFILE_DATA.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-neon-cyan border border-white/5 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={PROFILE_DATA.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-neon-cyan border border-white/5 transition-colors"
              aria-label="Twitter Profile"
            >
              <Twitter size={16} />
            </a>
            <a
              href={PROFILE_DATA.socials.email}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:text-neon-cyan border border-white/5 transition-colors"
              aria-label="Send Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

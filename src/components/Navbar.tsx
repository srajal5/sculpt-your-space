import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, FileText, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/animation/MagneticButton';
import { setCursorState } from '@/lib/cursor';
import { PROFILE_DATA } from '@/data/profile';
import { usePerformance } from '@/context/PerformanceContext';

export default function Navbar() {
  const { mode, cycleMode, isHigh, isLow } = usePerformance();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { name: 'HOME', href: '#home', id: 'home' },
    { name: 'PROJECTS', href: '#projects', id: 'projects' },
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'SKILLS', href: '#skills', id: 'skills' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Scrolled backdrop state
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll progress percentage calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Active section detection
      const sections = ['home', 'projects', 'about', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Scroll Progress Bar Top Line */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-white/5 pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-neon-purple via-neon-blue to-neon-pink shadow-[0_0_10px_#9b87f5]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Navigation Bar Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3.5 bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left Zone: Logo Branding */}
          <div className="flex items-center">
            <a
              href="#home"
              className="flex items-center gap-2 font-mono text-base sm:text-lg font-black tracking-tight text-foreground hover:text-neon-purple transition-colors shrink-0"
              onMouseEnter={() => setCursorState('hover', 'HOME')}
              onMouseLeave={() => setCursorState('default')}
            >
              <Sparkles className="w-5 h-5 text-neon-purple animate-pulse" />
              <span>SCULPT<span className="text-neon-blue">.SPACE</span></span>
            </a>
          </div>

          {/* Center Zone: Desktop Nav Items (visible on lg+) */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full p-1.5 glassmorphism border-white/10 bg-slate-950/60 backdrop-blur-xl shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <MagneticButton key={link.id} magneticStrength={0.2}>
                  <a
                    href={link.href}
                    onClick={() => setActiveSection(link.id)}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-colors duration-300 ${
                      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onMouseEnter={() => setCursorState('hover')}
                    onMouseLeave={() => setCursorState('default')}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-purple/80 to-neon-blue/80 -z-10 shadow-[0_0_15px_rgba(155,135,245,0.5)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </a>
                </MagneticButton>
              );
            })}
          </nav>

          {/* Right Zone: Action Buttons (visible on lg+) */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* 3D FX Toggle */}
            <button
              type="button"
              onClick={cycleMode}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold border transition-all flex items-center gap-1.5 shadow-sm ${
                isHigh
                  ? 'bg-neon-purple/15 text-neon-cyan border-neon-cyan/40 hover:bg-neon-purple/25 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                  : isLow
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 hover:bg-amber-500/25'
                  : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10'
              }`}
              title={`3D FX Mode: ${mode.toUpperCase()} (Click to cycle High/Low/Off)`}
              onMouseEnter={() => setCursorState('hover', `FX:${mode.toUpperCase()}`)}
              onMouseLeave={() => setCursorState('default')}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>FX: {mode.toUpperCase()}</span>
            </button>

            {/* Resume Button — Proper dark glass UI control */}
            <MagneticButton magneticStrength={0.25}>
              <a
                href={PROFILE_DATA.resumeUrl}
                download="Srajal_Puri_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group/res
                  relative
                  px-3.5
                  py-1.5
                  rounded-xl
                  text-xs
                  font-mono
                  font-semibold
                  tracking-wider
                  text-foreground/90
                  bg-slate-950/60
                  border
                  border-white/10
                  hover:border-neon-cyan/50
                  hover:bg-slate-900/80
                  hover:text-white
                  transition-all
                  duration-300
                  flex
                  items-center
                  gap-2
                  shadow-[0_2px_10px_rgba(0,0,0,0.3)]
                  hover:shadow-[0_0_18px_rgba(34,211,238,0.25)]
                "
                onMouseEnter={() => setCursorState('hover', 'RESUME')}
                onMouseLeave={() => setCursorState('default')}
              >
                <span className="p-1 rounded-md bg-white/5 border border-white/10 group-hover/res:border-neon-cyan/30 group-hover/res:bg-neon-cyan/10 transition-colors">
                  <FileText className="w-3 h-3 text-neon-cyan" />
                </span>
                <span>RESUME</span>
              </a>
            </MagneticButton>

            {/* Hire Me Primary Action CTA */}
            <MagneticButton magneticStrength={0.3}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-neon-purple to-neon-blue text-white border-0 font-semibold px-5 text-xs rounded-xl shadow-[0_0_15px_rgba(155,135,245,0.3)] hover:shadow-[0_0_25px_rgba(155,135,245,0.6)]"
                asChild
              >
                <a href="#contact">HIRE ME</a>
              </Button>
            </MagneticButton>
          </div>

          {/* Mobile & Tablet Menu Toggle Button (visible below lg) */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={cycleMode}
              className="px-2.5 py-1 rounded-xl text-[10px] font-mono border border-white/10 bg-white/5 text-neon-cyan"
            >
              FX: {mode.toUpperCase()}
            </button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl border-white/10 bg-white/5 text-foreground"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-0 top-[60px] z-30 md:hidden glassmorphism bg-background/95 border-b border-white/10 p-6 space-y-4 shadow-2xl backdrop-blur-2xl"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl text-sm font-mono font-bold tracking-wider flex items-center justify-between ${
                    activeSection === link.id
                      ? 'bg-neon-purple/20 border border-neon-purple/40 text-foreground'
                      : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && <Sparkles className="w-4 h-4 text-neon-purple" />}
                </a>
              ))}

              <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
                <a
                  href={PROFILE_DATA.resumeUrl}
                  download="Srajal_Puri_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold border border-neon-cyan/40 bg-neon-cyan/10 text-foreground flex items-center justify-center gap-2 shadow-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileText className="w-4 h-4 text-neon-cyan" />
                  DOWNLOAD RESUME (.PDF)
                </a>

                <Button
                  className="w-full bg-gradient-to-r from-neon-purple to-neon-blue text-white border-0 font-bold"
                  asChild
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <a href="#contact">LET'S BUILD SOMETHING</a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/animation/MagneticButton';
import { setCursorState } from '@/lib/cursor';

export default function Navbar() {
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
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo Branding */}
          <a
            href="#home"
            className="flex items-center gap-2 font-mono text-lg font-black tracking-tight text-foreground hover:text-neon-purple transition-colors"
            onMouseEnter={() => setCursorState('hover', 'HOME')}
            onMouseLeave={() => setCursorState('default')}
          >
            <Sparkles className="w-5 h-5 text-neon-purple animate-pulse" />
            <span>SCULPT<span className="text-neon-blue">.SPACE</span></span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 rounded-full p-1.5 glassmorphism border-white/10 bg-black/40">
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

          {/* Right Action Button */}
          <div className="hidden md:flex items-center">
            <MagneticButton magneticStrength={0.3}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-neon-purple to-neon-blue text-white border-0 font-semibold px-5 text-xs rounded-full shadow-[0_0_15px_rgba(155,135,245,0.3)] hover:shadow-[0_0_25px_rgba(155,135,245,0.6)]"
                asChild
              >
                <a href="#contact">HIRE ME</a>
              </Button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
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
              <div className="pt-4">
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

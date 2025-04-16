
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { title: 'Home', url: '#home' },
  { title: 'Projects', url: '#projects' },
  { title: 'About', url: '#about' },
  { title: 'Skills', url: '#skills' },
  { title: 'Contact', url: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.title.toLowerCase());
      
      for (const section of sections.reverse()) { // Check from bottom to top
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 300) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-40 transition-all duration-300',
        scrolled ? 'glassmorphism backdrop-blur-lg py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-gradient">
          Portfolio
        </a>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.title.toLowerCase();
            return (
              <a
                key={link.title}
                href={link.url}
                className={cn(
                  "text-foreground hover:text-primary transition-colors relative group",
                  isActive && "text-primary"
                )}
              >
                {link.title}
                <span 
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )} 
                />
              </a>
            );
          })}
        </nav>
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className={cn('block w-6 transition-all duration-300', mobileMenuOpen ? 'opacity-0' : 'opacity-100')}>
            <span className="block h-0.5 w-6 bg-foreground mb-1.5" />
            <span className="block h-0.5 w-6 bg-foreground mb-1.5" />
            <span className="block h-0.5 w-6 bg-foreground" />
          </span>
          <span className={cn('absolute h-0.5 w-6 bg-foreground transform transition-all duration-300', mobileMenuOpen ? 'rotate-45' : '-rotate-45 opacity-0')} />
          <span className={cn('absolute h-0.5 w-6 bg-foreground transform transition-all duration-300', mobileMenuOpen ? '-rotate-45' : 'rotate-45 opacity-0')} />
        </Button>
      </div>
      
      {/* Mobile Menu */}
      <nav
        className={cn(
          'fixed inset-0 z-30 glassmorphism flex flex-col items-center justify-center transition-transform duration-300 md:hidden',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {navLinks.map((link) => (
          <a
            key={link.title}
            href={link.url}
            className="text-2xl font-semibold py-4 text-foreground hover:text-gradient transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.title}
          </a>
        ))}
      </nav>
    </header>
  );
}

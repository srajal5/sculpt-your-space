
import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';

export default function HeroSection() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          textRef.current?.classList.add('animate-float');
        }
      },
      { threshold: 0.5 }
    );
    
    observer.observe(textRef.current);
    
    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);
  
  return (
    <section id="home" className="section relative pt-20">
      <div ref={containerRef} className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
       
        <h1 
          ref={textRef} 
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 opacity-0 fade-in delay-100"
        >
          <span className="text-gradient">Portfolio</span>
        </h1>

        <p className="text-xl md:text-2xl mb-4 text-muted-foreground opacity-0 fade-in">Hey, I'm Srajal</p>

        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-muted-foreground opacity-0 fade-in delay-200">
          Full stack developer || Web designer 
           
          
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 opacity-0 fade-in delay-300">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-neon-purple to-neon-blue text-white border-0 ripple-effect group transition-transform hover:scale-105"
          >
            View Projects <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border border-primary text-primary hover:text-primary-foreground transition-transform hover:scale-105"
          >
            Contact Me <Mail className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-4 mt-12 opacity-0 fade-in delay-400">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
        </div>
        
        <a 
          href="#projects"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors duration-300 animate-bounce opacity-0 fade-in delay-500"
        >
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
}


import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const textRef = useRef<HTMLHeadingElement>(null);
  
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
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <p className="text-xl md:text-2xl mb-4 text-muted-foreground">Welcome to my</p>
        <h1 
          ref={textRef} 
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="text-gradient">3D Portfolio</span>
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-muted-foreground">
          Creative developer specializing in interactive experiences and 3D web applications
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-neon-purple to-neon-blue text-white border-0"
          >
            View Projects
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border border-primary text-primary hover:text-primary-foreground"
          >
            Contact Me
          </Button>
        </div>
        
        <a 
          href="#projects"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors duration-300 animate-bounce"
        >
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
}

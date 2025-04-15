
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  codeUrl?: string;
}

export default function ProjectCard({ 
  title, 
  description, 
  image, 
  technologies,
  demoUrl,
  codeUrl
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className={cn(
        "overflow-hidden glassmorphism transition-all duration-500 transform lg:hover:scale-105 cursor-pointer group border-white/5",
        isHovered ? "shadow-lg shadow-primary/20" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-48 overflow-hidden relative">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-secondary/50">
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-3 mt-2">
          {demoUrl && (
            <Button 
              size="sm"
              variant="ghost"
              className="flex items-center gap-1 hover:text-primary" 
              asChild
            >
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} />
                Demo
              </a>
            </Button>
          )}
          
          {codeUrl && (
            <Button 
              size="sm"
              variant="ghost"
              className="flex items-center gap-1 hover:text-primary" 
              asChild
            >
              <a href={codeUrl} target="_blank" rel="noopener noreferrer">
                <Github size={14} />
                Code
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

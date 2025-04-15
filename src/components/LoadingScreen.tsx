
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500",
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
      <h2 className="text-gradient text-4xl font-bold mb-8">3D Portfolio</h2>
      <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-neon-purple to-neon-blue transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-4 text-muted-foreground">{progress}%</p>
    </div>
  );
}


import { useEffect, useState } from 'react';
import Scene from '@/components/Scene';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

const Index = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate assets loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      {loading && <LoadingScreen />}
      
      <Scene />
      
      <div className="content-container">
        <Navbar />
        
        <main>
          <HeroSection />
          <ProjectsSection />
          <AboutSection />
          <SkillsSection />
          <ContactSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;

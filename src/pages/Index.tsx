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
import CustomCursor from '@/components/interaction/CustomCursor';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset & WebGL context initialization
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Custom Hardware-Accelerated Interactive Pointer Cursor */}
      <CustomCursor />

      {/* Loading Screen Overlay */}
      {loading && <LoadingScreen />}

      {/* Background 3D WebGL Canvas Scene */}
      <Scene />

      {/* Main Content Layers */}
      <div className="content-container relative z-10">
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

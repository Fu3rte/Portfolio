import { Hero } from '../features/Hero/Hero';
import { About } from '../features/About/About';
import { TechStack } from '../features/TechStack/TechStack';
import { Project } from '../features/Project/Project';
import { Footer } from '../features/Footer/Footer';
import { HomePageContact } from '@/features/HomePageContact/HomePageContact';
import { useState, useEffect } from 'react';

export function HomePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const handleTableChange = (e: any) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleTableChange);

    return () => {
      mediaQuery.removeEventListener('change', handleTableChange);
    };
  }, []);

  return (
    <main className="relative z-10 flex flex-col px-8 md:max-w-[80vw]">
      {isMobile && (
        <p className="absolute top-30 z-99 text-2xl font-semibold text-primary">
          View on PC for better experience
        </p>
      )}

      <Hero />
      <About />
      <TechStack />
      <Project />
      <div className="md:h-[10vh]" />
      <HomePageContact />
      <Footer />
    </main>
  );
}

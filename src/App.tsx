import { Navbar } from './components/Navbar/Navbar';
import { ScrollProgress } from './components/WholePage/ScrollProgress';
import { Pointer } from './components/customComponent/Pointer';

import { DotPattern } from './components/ui/dot-pattern';
import { cn } from '@/lib/utils';

import { ThemeProvider } from './components/theme-provider';

import { Hero } from './features/Hero/Hero';
import { About } from './features/About/About';
import { TechStack } from './features/TechStack/TechStack';
import { Project } from './features/Project/Project';
import { useEffect, useState } from 'react';
import { Contact } from './features/Contact/Contact';
import { Footer } from './features/Footer/Footer';

function App() {
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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Pointer>
        <Navbar />
        <ScrollProgress />

        <div className="relative flex-center min-h-screen w-full flex-col overflow-hidden bg-background">
          <DotPattern
            className={cn(
              'fixed inset-0 z-0 opacity-[0.2]',
              'mask-[radial-gradient(ellipse_at_center,white,transparent_90%)]'
            )}
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
          />

          {isMobile && (
            <p className="absolute top-30 z-99 text-2xl font-semibold text-primary">
              View on PC for better experience
            </p>
          )}

          <main className="relative z-10 flex flex-col px-4 md:max-w-[80vw] lg:px-8">
            <Hero />
            <About />
            <TechStack />
            <Project />
            <Footer />
          </main>
        </div>
      </Pointer>
    </ThemeProvider>
  );
}

export default App;

import { Navbar } from './components/Navbar/Navbar';
import { ScrollProgress } from './components/WholePage/ScrollProgress';
import { Pointer } from './components/WholePage/Pointer';
import Loading from './components/WholePage/Loading';

import { DotPattern } from './components/ui/dot-pattern';
import { cn } from '@/lib/utils';

import { ThemeProvider } from './components/theme-provider';

import { useEffect, useState } from 'react';
import { HomePage } from './pages/HomePage';
import { PhotosPage } from './pages/PhotosPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [isLoading, setIsLoading] = useState(true);
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
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Pointer>
        <Navbar />
        <ScrollProgress />

        <div className="relative flex-center min-h-screen w-full flex-col bg-background">
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

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/photos" element={<PhotosPage />} />
          </Routes>
        </div>

        {isLoading && <Loading onComplete={() => setIsLoading(false)} />}
      </Pointer>
    </ThemeProvider>
  );
}

export default App;

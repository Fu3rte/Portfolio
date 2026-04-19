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
import { ContactPage } from './pages/ContactPage';
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
        <Navbar setIsLoading={setIsLoading} />
        <ScrollProgress />

        <div className="relative flex-center min-h-svh w-full flex-col overflow-x-clip bg-background">
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

          <Routes>
            <Route path="/" element={<HomePage isMobile={isMobile} />} />
            <Route path="/photos" element={<PhotosPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>

        {isLoading && (
          <Loading isMobile={isMobile} onComplete={() => setIsLoading(false)} />
        )}
      </Pointer>
    </ThemeProvider>
  );
}

export default App;

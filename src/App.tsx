import { Navbar } from './components/Navbar/Navbar';
import { ScrollProgress } from './components/WholePage/ScrollProgress';

import { Hero } from './features/Hero/Hero';
import { About } from './features/About/About';

import { DotPattern } from './components/ui/dot-pattern';
import { cn } from '@/lib/utils';

import { Pointer } from './components/customComponent/pointer';
import { ThemeProvider } from './components/theme-provider';
import { TechStack } from './features/TechStack/TechStack';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Pointer>
        <Navbar />
        <ScrollProgress />

        <div className="relative flex-center min-h-screen w-full flex-col overflow-hidden bg-background">
          <DotPattern
            className={cn(
              'fixed inset-0 z-0 opacity-[0.2]',
              // 中心亮，四周淡出
              'mask-[radial-gradient(ellipse_at_center,white,transparent_90%)]'
            )}
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
          />

          <main className="relative z-10 flex md:max-w-[80vw] flex-col px-4 lg:px-8">
            <Hero />
            <About />
            <TechStack />
          </main>
        </div>
      </Pointer>
    </ThemeProvider>
  );
}

export default App;

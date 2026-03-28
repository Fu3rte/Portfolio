import { Navbar } from './components/Navbar/Navbar';
import { ScrollProgress } from './components/WholePage/ScrollProgress';

import { Hero } from './features/Hero/Hero';
import { About } from './features/About/About';

import { DotPattern } from './components/ui/dot-pattern';
import { cn } from '@/lib/utils';

import { Pointer } from './components/ui/pointer';

export function App() {
  return (
    <Pointer>
      <Navbar />
      <ScrollProgress />

      <div className="relative min-h-screen bg-black">
        <DotPattern
          className={cn(
            'fixed inset-0 z-0 opacity-[0.3]',
            // 中心亮，四周淡出
            'mask-[radial-gradient(ellipse_at_center,white,transparent_80%)]'
          )}
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
        />

        <main className="relative z-10 flex flex-col items-center px-4 lg:px-8">
          <Hero />
          <About />
        </main>
      </div>
    </Pointer>
  );
}

export default App;

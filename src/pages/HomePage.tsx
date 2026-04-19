import { Hero } from '../features/Hero/Hero';
import { About } from '../features/About/About';
import { TechStack } from '../features/TechStack/TechStack';
import { Project } from '../features/Project/Project';
import { Footer } from '../features/Footer/Footer';

export function HomePage() {
  return (
    <main className="relative z-10 flex flex-col px-8 md:max-w-[80vw]">
      <Hero />
      <About />
      <TechStack />
      <Project />
      <div className="md:h-[10vh]" />
      <div>
        <h1 className="flex-center h-[60dvh] flex-col text-6xl font-extrabold text-primary uppercase md:text-8xl">
          contact
        </h1>
      </div>
      <Footer />
    </main>
  );
}

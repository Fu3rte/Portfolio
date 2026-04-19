import { Hero } from '../features/Hero/Hero';
import { About } from '../features/About/About';
import { TechStack } from '../features/TechStack/TechStack';
import { Project } from '../features/Project/Project';
import { Footer } from '../features/Footer/Footer';
import { HomePageContact } from '@/features/HomePageContact/HomePageContact';

interface HomePageProps {
  isMobile: boolean;
}

export function HomePage({ isMobile }: HomePageProps) {
  return (
    <main className="relative z-10 flex w-full flex-col overflow-x-clip md:max-w-[80vw]">
      {isMobile && (
        <p className="absolute top-30 z-99 w-full text-center text-2xl font-semibold text-primary">
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

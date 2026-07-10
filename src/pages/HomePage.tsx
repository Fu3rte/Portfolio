import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { Hero } from '../features/Hero/Hero';

const About = lazy(() =>
  import('../features/About/About').then((module) => ({
    default: module.About,
  }))
);
const TechStack = lazy(() =>
  import('../features/TechStack/TechStack').then((module) => ({
    default: module.TechStack,
  }))
);
const Project = lazy(() =>
  import('../features/Project/Project').then((module) => ({
    default: module.Project,
  }))
);
const HomePageContact = lazy(() =>
  import('@/features/HomePageContact/HomePageContact').then((module) => ({
    default: module.HomePageContact,
  }))
);
const Footer = lazy(() =>
  import('../features/Footer/Footer').then((module) => ({
    default: module.Footer,
  }))
);

interface HomePageProps {
  isMobile: boolean;
}

function SectionFallback({ className }: { className: string }) {
  return <div aria-hidden="true" className={`w-full shrink-0 ${className}`} />;
}

function LazySection({
  children,
  fallbackClassName,
}: {
  children: ReactNode;
  fallbackClassName: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || shouldRender) return;

    if (!('IntersectionObserver' in window)) {
      const fallbackTimer = globalThis.setTimeout(
        () => setShouldRender(true),
        0
      );
      return () => globalThis.clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '480px 0px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={containerRef} className="w-full shrink-0">
      {shouldRender ? (
        <Suspense fallback={<SectionFallback className={fallbackClassName} />}>
          {children}
        </Suspense>
      ) : (
        <SectionFallback className={fallbackClassName} />
      )}
    </div>
  );
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
      <LazySection fallbackClassName="min-h-[760px] lg:min-h-[680px]">
        <About />
      </LazySection>
      <LazySection fallbackClassName="min-h-[560px] lg:min-h-[500px]">
        <TechStack />
      </LazySection>
      <LazySection fallbackClassName="min-h-[1120px] lg:min-h-[640px]">
        <Project />
      </LazySection>
      <div className="md:h-[10vh]" />
      <LazySection fallbackClassName="h-[60svh]">
        <HomePageContact />
      </LazySection>
      <LazySection fallbackClassName="min-h-[180px]">
        <Footer />
      </LazySection>
    </main>
  );
}

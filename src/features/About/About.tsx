import { lazy, Suspense, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { BlurFade } from '@/components/ui/blur-fade';

import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const HEADING = 'ABOUT ME';

const INTERESTS = [
  { emoji: '🍔', label: 'EATING' },
  { emoji: '💪', label: 'CALISTHENICS' },
  { emoji: '🎧', label: 'MUSIC' },
];

const LocationCard = lazy(() =>
  import('@/components/customComponent/LocationCard').then((module) => ({
    default: module.LocationCard,
  }))
);

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.about-char', {
        y: '110%',
        rotateZ: 6,
        opacity: 0,
        stagger: 0.04,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.about-heading',
          start: 'top 80%',
        },
      });

      gsap.fromTo(
        '.about-map-card',
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: '.about-map-card',
            start: 'top 75%',
          },
        }
      );

      gsap.to('.about-map-card', {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.from('.about-divider', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.about-divider',
          start: 'top 85%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      className="relative z-10 px-6 py-10 md:px-14 lg:py-12"
      id="about"
      ref={containerRef}
    >
      <div className="about-heading mb-16 flex w-full flex-wrap overflow-hidden lg:mb-20">
        {HEADING.split('').map((char, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span
              className="about-char inline-block text-[clamp(3rem,6vw,6rem)] leading-[0.9] font-black tracking-tighter text-black dark:text-white"
              style={{ marginRight: char === ' ' ? '0.3em' : '0.02em' }}
            >
              {char}
            </span>
          </span>
        ))}
      </div>

      <div className="mt-20 grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="about-map-card lg:col-span-5">
          <Suspense
            fallback={
              <div className="w-full overflow-hidden rounded-[32px] border border-zinc-800 p-6">
                <div className="mb-6 h-5 w-48 rounded bg-primary/10" />
                <div className="h-80 w-full rounded-[24px] bg-primary/5" />
              </div>
            }
          >
            <LocationCard />
          </Suspense>
        </div>

        <div className="relative space-y-8 lg:col-span-6 lg:col-start-7">
          <BlurFade direction="up" inView>
            <div className="about-name">
              <h3 className="bg-linear-to-r from-blue-600 via-cyan-500 to-sky-400 bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl">
                Finnian
              </h3>

              <p className="mt-2 font-mono text-xs text-muted-foreground italic">
                /ˈfɪn.i.ən/ — derived from Old Irish; symbolizing light, spirit,
                and clarity.
              </p>
            </div>
          </BlurFade>

          <BlurFade inView direction="up">
            <div className="space-y-4 tracking-wide">
              <p className="text-lg leading-[1.85] text-muted-foreground md:text-xl">
                I focus on{' '}
                <span className="font-semibold text-primary">
                  Frontend Development
                </span>
                . Away from the screen, I train in{' '}
                <span className="font-semibold text-primary">calisthenics</span>
                , dive into the world of{' '}
                <span className="font-semibold text-primary">music</span> and
                enjoy capturing life's fleeting moments through{' '}
                <span className="font-semibold text-primary">photography</span>.
              </p>
            </div>
          </BlurFade>

          <div className="about-divider h-px bg-linear-to-r from-black/15 via-black/15 to-transparent dark:from-white/15 dark:via-white/5" />

          <div>
            <BlurFade inView direction="up">
              <span className="mb-4 block text-[clamp(1rem,1.5vw,2rem)] tracking-[10px] text-primary/70">
                INTERESTS
              </span>
            </BlurFade>

            <div className="flex flex-wrap gap-3">
              {INTERESTS.map((item, i) => (
                <BlurFade
                  key={item.label}
                  delay={i * 0.05}
                  inView
                  direction="up"
                >
                  <Badge
                    variant="outline"
                    className="glass-card rounded-full px-5 py-3 text-sm text-muted-foreground transition-all duration-300 hover:scale-105 hover:border-primary/70 hover:text-primary dark:bg-linear-[#fff2,transparent] dark:shadow-["
                  >
                    <span className="mr-2">{item.emoji}</span>
                    {item.label}
                  </Badge>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

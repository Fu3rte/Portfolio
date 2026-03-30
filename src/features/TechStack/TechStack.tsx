import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Atom } from 'lucide-react';
import { useRef } from 'react';
import { StackSection, LANGUAGES, FRONTEND, TOOLS } from './StackSection';

gsap.registerPlugin(ScrollTrigger);

export function TechStack() {
  const atomRef = useRef(null);

  useGSAP(() => {
    gsap.to(atomRef.current, {
      rotate: 360,
      duration: 2,
      repeat: -1,
      ease: 'linear',
    });

    gsap.from('.stack-label', {
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.stack-label',
        start: 'top 85%',
      },
    });

    document.querySelectorAll('.stack-section').forEach((section) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      });

      tl.from(section.querySelector('.stack-title'), {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
        duration: 0.9,
        ease: 'power4.out',
      }).from(
        section.querySelectorAll('.glass-card'),
        {
          y: -20,
          opacity: 0,
          duration: 0.6,
          stagger: {
            each: 0.04,
            from: 'start',
          },
          ease: 'power3.out',
        },
        '<'
      );
    });
  }, []);

  return (
    <div
      className="stack-container flex w-full flex-col items-center space-y-6 px-6 py-10 md:px-10 lg:py-12"
      id="tech-stack"
    >
      <h2 className="stack-label flex gap-2 self-start text-primary/80">
        <Atom ref={atomRef} />
        My Stack
      </h2>

      <div className="flex w-full flex-col space-y-12">
        <StackSection title="Languages" items={LANGUAGES} />

        <StackSection title="Frontend" items={FRONTEND} />

        <StackSection title="Tools" items={TOOLS} />
      </div>
    </div>
  );
}

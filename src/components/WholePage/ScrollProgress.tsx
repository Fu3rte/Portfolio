import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    gsap.to(bar, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === document.documentElement) t.kill();
      });
    };
  }, []);

  return (
    <div className="fixed top-0 right-0 z-100 h-full w-0.5 bg-transparent">
      <div
        ref={barRef}
        className="h-full w-full origin-top bg-white"
        style={{ transform: 'scaleY(0)' }}
      />
    </div>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingProps {
  onComplete?: () => void;
}

const TOTAL_BARS = 8;
const NAME = 'Fu3rte';

export default function Loading({ onComplete }: LoadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nameRef.current || !containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => onComplete?.(),
    });

    const chars = nameRef.current.querySelectorAll('.char');
    const bars = containerRef.current.querySelectorAll('.bg-bar');

    tl.fromTo(
      chars,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.6,
      }
    )
      .to(nameRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        delay: 0.2,
      })
      .to(
        bars,
        {
          yPercent: 100,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power4.inOut',
        },
        '-=0.4'
      );
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-9999"
    >
      <div className="absolute inset-0 flex h-full w-full">
        {Array.from({ length: TOTAL_BARS }).map((_, i) => (
          <div key={i} className="bg-bar h-full flex-1 bg-[#151515]" />
        ))}
      </div>

      <div className="absolute inset-0 flex-center">
        <div
          ref={nameRef}
          className="flex gap-1 text-white"
          style={{ fontSize: 'clamp(4rem, 18vw, 8rem)' }}
        >
          {NAME.split('').map((char, i) => (
            <span key={i} className="char inline-block">
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

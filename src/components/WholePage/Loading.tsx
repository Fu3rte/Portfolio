import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

interface LoadingProps {
  onComplete: () => void;
}

const TOTAL_BARS = 10;
const NAME = "Fu3rte";

export default function Loading({ onComplete }: LoadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);
  const nameRef = useRef<HTMLDivElement>(null);

  const setBarsRef = useCallback((el: HTMLDivElement | null, i: number) => {
    if (el) barsRef.current[i] = el;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const bars = barsRef.current.filter(Boolean);
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(container, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });

    gsap.set(bars, { scaleY: 0, transformOrigin: "bottom" });
    gsap.set(nameRef.current, { opacity: 0, y: 10 });

    const shuffledIndicesIn = [...Array(bars.length).keys()].sort(
      () => Math.random() - 0.5
    );
    tl.to(
      shuffledIndicesIn.map((i) => bars[i]),
      {
        scaleY: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.008,
      }
    );

    tl.to(
      nameRef.current,
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      "-=0.2"
    );

    tl.to({}, { duration: 0.5 });

    tl.to(nameRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: "power2.in",
    });

    const shuffledIndicesOut = [...Array(bars.length).keys()].sort(
      () => Math.random() - 0.5
    );
    tl.to(
      shuffledIndicesOut.map((i) => bars[i]),
      {
        scaleY: 0,
        duration: 0.5,
        ease: "power2.in",
        stagger: 0.006,
      },
      "-=0.1"
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex items-end justify-center bg-[#0a0a0a]"
    >
      {/* Bars */}
      <div className="absolute inset-0 flex items-end justify-center px-0">
        {Array.from({ length: TOTAL_BARS }).map((_, i) => (
          <div
            key={i}
            ref={(el) => setBarsRef(el, i)}
            className="h-dvh bg-[#f1f1f1]"
            style={{
              width: `${100 / TOTAL_BARS}%`,
              opacity: 0.6 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      {/* Centered Name */}
      <div
        ref={nameRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span
          className="text-5xl font-bold tracking-wider text-[#0a0a0a] md:text-7xl"
          style={{
            mixBlendMode: "difference",
          }}
        >
          {NAME}
        </span>
      </div>
    </div>
  );
}

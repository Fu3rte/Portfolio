import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const CONTACT_TEXT = 'contact me';

// Chain physics constants
const LINK_LENGTH = 20;
const GRAVITY = 0.55;
const FRICTION = 0.92;
const BOUNCE = 0.45;
const ITERATIONS = 6;
const PICK_RADIUS = 40;
const ENTRY_SWAY = 0.18;
const RETURN_CHAIN_MULTIPLIER = 1.9;
const RETURN_SCROLL_DURATION = 0.65;

type NodePoint = {
  x: number;
  y: number;
  oldx: number;
  oldy: number;
  pinned: boolean;
  el: HTMLDivElement | null;
  ch: string;
};

function distanceSq(ax: number, ay: number, bx: number, by: number) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}

const PRETEXT = 'DRAG ME!';
const CHARS = PRETEXT.split('');
const PRETEXT_FONT_SIZE = '0.9rem';

export function HomePageContact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<NodePoint[]>([]);
  const draggingRef = useRef(false);
  const draggedPointRef = useRef<NodePoint | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const entrySwayRef = useRef(0);
  const hasEnteredViewRef = useRef(false);
  const isVisibleRef = useRef(false);
  const returnArmedRef = useRef(false);
  const returnTriggeredThisDragRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const init = () => {
      const contactRect = contactRef.current?.getBoundingClientRect();
      const contactCenterX = contactRect
        ? contactRect.left + contactRect.width / 2
        : window.innerWidth / 2;
      const contactBottomY = contactRect
        ? contactRect.bottom
        : window.innerHeight / 2;
      const startY = contactBottomY + 12;

      pointsRef.current = PRETEXT.split('').map((ch, index) => {
        const x = contactCenterX;
        const y = startY + index * 4;
        const existingEl = pointsRef.current[index]?.el || null;
        return {
          x,
          y,
          oldx: x,
          oldy: y,
          pinned: index === 0,
          el: existingEl,
          ch,
        };
      });
    };

    init();
    window.addEventListener('resize', init);
    return () => window.removeEventListener('resize', init);
  }, []);

  useEffect(() => {
    const node = contactRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        isVisibleRef.current = visible;
        setIsVisible(visible);
        if (visible && !hasEnteredViewRef.current) {
          hasEnteredViewRef.current = true;
          entrySwayRef.current = 1;
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => {
      const points = pointsRef.current;
      if (points.length === 0) return;

      const pinned = points[0];
      const contactRect = contactRef.current?.getBoundingClientRect();
      if (!isVisibleRef.current || !contactRect) return;

      pinned.x = contactRect.left + contactRect.width / 2;
      pinned.y = contactRect.bottom + 10;
      pinned.oldx = pinned.x;
      pinned.oldy = pinned.y;

      if (entrySwayRef.current > 0) {
        entrySwayRef.current = Math.max(0, entrySwayRef.current - 0.016);
      }

      const chainLength = points.reduce((sum, point, index) => {
        if (index === 0) return 0;
        const prev = points[index - 1];
        return sum + Math.hypot(point.x - prev.x, point.y - prev.y);
      }, 0);

      if (draggingRef.current) {
        returnArmedRef.current =
          returnArmedRef.current ||
          chainLength > LINK_LENGTH * (points.length - 1) * RETURN_CHAIN_MULTIPLIER;
      }

      const entrySway = entrySwayRef.current * ENTRY_SWAY;

      for (let i = 1; i < points.length; i += 1) {
        const p = points[i];

        if (draggingRef.current && draggedPointRef.current === p) {
          p.x = mouseRef.current.x;
          p.y = mouseRef.current.y;
          p.oldx = p.x;
          p.oldy = p.y;
          continue;
        }

        const vx = (p.x - p.oldx) * FRICTION;
        const vy = (p.y - p.oldy) * FRICTION;

        p.oldx = p.x;
        p.oldy = p.y;
        p.x += vx + entrySway * (i * 0.15);
        p.y += vy + GRAVITY;

        const floor = window.innerHeight - 24;
        const leftWall = 24;
        const rightWall = window.innerWidth - 24;

        if (p.y > floor) {
          p.y = floor;
          p.oldy = p.y + vy * BOUNCE;
        }
        if (p.x < leftWall) {
          p.x = leftWall;
          p.oldx = p.x + vx * BOUNCE;
        } else if (p.x > rightWall) {
          p.x = rightWall;
          p.oldx = p.x + vx * BOUNCE;
        }
      }

      for (let i = 0; i < ITERATIONS; i += 1) {
        for (let j = 0; j < points.length - 1; j += 1) {
          const p1 = points[j];
          const p2 = points[j + 1];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
          const diff = LINK_LENGTH - dist;
          const percent = diff / dist / 2;
          const offsetX = dx * percent;
          const offsetY = dy * percent;

          const p1Fixed =
            p1.pinned ||
            (draggingRef.current && draggedPointRef.current === p1);
          const p2Fixed =
            p2.pinned ||
            (draggingRef.current && draggedPointRef.current === p2);

          if (!p1Fixed && !p2Fixed) {
            p1.x -= offsetX;
            p1.y -= offsetY;
            p2.x += offsetX;
            p2.y += offsetY;
          } else if (!p1Fixed) {
            p1.x -= offsetX * 2;
            p1.y -= offsetY * 2;
          } else if (!p2Fixed) {
            p2.x += offsetX * 2;
            p2.y += offsetY * 2;
          }
        }
      }

      for (let i = 0; i < points.length; i += 1) {
        const p = points[i];
        const el = p.el;
        if (!el) continue;

        if (!p.pinned && p.y < pinned.y) {
          const dy = pinned.y - p.y;
          p.y += dy * 0.08;
          p.oldy = Math.min(p.oldy, p.y);
        }

        let angle = 0;
        if (i < points.length - 1) {
          const pNext = points[i + 1];
          angle = Math.atan2(pNext.y - p.y, pNext.x - p.x);
        } else if (i > 0) {
          const pPrev = points[i - 1];
          angle = Math.atan2(p.y - pPrev.y, p.x - pPrev.x);
        }

        angle -= Math.PI / 2;
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) rotate(${angle}rad)`;
      }
    };

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      let closest: NodePoint | null = null;
      let minDist = PICK_RADIUS * PICK_RADIUS;

      for (const p of pointsRef.current) {
        const dist = distanceSq(e.clientX, e.clientY, p.x, p.y);
        if (dist < minDist) {
          minDist = dist;
          closest = p;
        }
      }

      if (closest) {
        returnArmedRef.current = false;
        returnTriggeredThisDragRef.current = false;
        draggingRef.current = true;
        draggedPointRef.current = closest;
        mouseRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      mouseRef.current = { x: e.clientX, y: e.clientY };
      e.preventDefault();
    };

    const handlePointerUp = () => {
      if (returnArmedRef.current && !returnTriggeredThisDragRef.current) {
        returnTriggeredThisDragRef.current = true;
        gsap.to(window, {
          scrollTo: 0,
          duration: RETURN_SCROLL_DURATION,
          ease: 'power2.inOut',
          overwrite: true,
        });
      }

      returnArmedRef.current = false;
      draggingRef.current = false;
      draggedPointRef.current = null;
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove, {
      passive: false,
    });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[60svh] w-full items-start justify-center overflow-x-hidden px-6 pt-32"
    >
      <div className="relative flex w-full max-w-5xl flex-col items-center justify-center">
        <div
          ref={contactRef}
          className="text-center text-6xl leading-none font-extrabold text-foreground uppercase select-none md:text-8xl"
        >
          {CONTACT_TEXT}
        </div>
      </div>

      {isVisible ? (
        <div
          className="pointer-events-none fixed inset-0 z-50"
          style={{ width: '100vw', height: '100vh' }}
        >
          {CHARS.map((ch, index) => (
            <div
              key={`${ch}-${index}`}
              ref={(el) => {
                if (pointsRef.current[index]) {
                  pointsRef.current[index].el = el;
                }
              }}
              className="absolute top-0 left-0 text-[#007bff] select-none"
              style={{
                transformOrigin: 'center center',
                userSelect: 'none',
                willChange: 'transform',
                pointerEvents: 'auto',
                cursor: 'grab',
              }}
              aria-hidden="true"
            >
              <span
                style={{
                  fontSize: PRETEXT_FONT_SIZE,
                  letterSpacing: '1rem',
                  lineHeight: 1,
                }}
              >
                {PRETEXT[index]}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const INTERACTIVE =
  'a, button, [data-pointer], input, textarea, [role="button"]';

export function Pointer({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const isHovering = useRef(false);
  const isVisible = useRef(false);

  useEffect(() => {
    // 1. 移动端直接退出，不执行逻辑
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(hover: none)').matches
    )
      return;

    const wrapper = wrapperRef.current;
    const path = pathRef.current;
    const label = labelRef.current;
    if (!wrapper || !path || !label) return;

    // 2. 初始状态：透明度为0，且缩放到极小
    gsap.set(wrapper, { opacity: 0, scale: 0.5, xPercent: -5, yPercent: -5 });
    gsap.set(label, { opacity: 0, scale: 0.5 });
    gsap.set(path, { fill: '#ffffff', stroke: '#000000', strokeWidth: 1.5 });

    // 3. 使用 quickTo 实现高性能跟随
    const xTo = gsap.quickTo(wrapper, 'x', {
      duration: 0.15,
      ease: 'power3.out',
    });
    const yTo = gsap.quickTo(wrapper, 'y', {
      duration: 0.15,
      ease: 'power3.out',
    });
    const labelXTo = gsap.quickTo(label, 'x', {
      duration: 0.3,
      ease: 'power3.out',
    });
    const labelYTo = gsap.quickTo(label, 'y', {
      duration: 0.3,
      ease: 'power3.out',
    });

    const handleMouseMove = (e: MouseEvent) => {
      // 第一次移动时显示光标
      if (!isVisible.current) {
        isVisible.current = true;
        gsap.to(wrapper, { opacity: 1, scale: 1, duration: 0.3 });
      }

      xTo(e.clientX);
      yTo(e.clientY);
      labelXTo(e.clientX + 20);
      labelYTo(e.clientY + 30);

      // 交互检测
      const target = (e.target as HTMLElement)?.closest(INTERACTIVE);

      if (target && !isHovering.current) {
        isHovering.current = true;
        const text = target.getAttribute('data-pointer');

        gsap.to(wrapper, { scale: 0.8, rotate: -10, duration: 0.3 });
        gsap.to(path, { fill: '#007bff', stroke: '#007bff', duration: 0.2 });

        if (text) {
          label.textContent = text;
          gsap.to(label, { opacity: 1, scale: 1, duration: 0.2 });
        }
      } else if (!target && isHovering.current) {
        isHovering.current = false;
        gsap.to(wrapper, { scale: 1, rotate: 0, duration: 0.3 });
        gsap.to(path, { fill: '#ffffff', stroke: '#000000', duration: 0.2 });
        gsap.to(label, { opacity: 0, scale: 0.5, duration: 0.2 });
      }
    };

    const handleMouseDown = () =>
      gsap.to(wrapper, { scale: 0.7, duration: 0.1 });
    const handleMouseUp = () =>
      gsap.to(wrapper, { scale: isHovering.current ? 0.8 : 1, duration: 0.3 });

    // 4. 监听进入/离开窗口，防止光标卡在边缘
    const handleMouseLeave = () => {
      isVisible.current = false;
      gsap.to(wrapper, { opacity: 0, scale: 0.5, duration: 0.2 });
    };

    const handleMouseEnter = () => {
      // 进入时不立即设置 visible，等待 mousemove 触发
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // 隐藏系统光标
    document.documentElement.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <div className="relative">{children}</div>

      {/* 光标主体 */}
      <div
        ref={wrapperRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] opacity-0"
        style={{ willChange: 'transform' }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
        >
          <path
            ref={pathRef}
            d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.83-4.83c.2-.2.46-.31.73-.31h6.27c.31 0 .47-.38.25-.6L6.35 2.86a.5.5 0 0 0-.85.35Z"
          />
        </svg>
      </div>

      {/* 文字标签 */}
      <div
        ref={labelRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] rounded-full bg-[#007bff] px-3 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase opacity-0 shadow-lg"
        style={{ transformOrigin: '0 0' }}
      />
    </>
  );
}

'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const TiltCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // 用于存储 quickTo 函数的引用
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // 初始化 quickTo，设置缓动效果，让跟随更丝滑
    xTo.current = gsap.quickTo(cardRef.current, 'rotationY', {
      duration: 0.5,
      ease: 'power3.out',
    });
    yTo.current = gsap.quickTo(cardRef.current, 'rotationX', {
      duration: 0.5,
      ease: 'power3.out',
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    // 计算鼠标相对位置
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPercent = mouseX / rect.width - 0.5;
    const yPercent = mouseY / rect.height - 0.5;

    const intensity = 15;

    const rotateX = -yPercent * intensity;
    const rotateY = xPercent * intensity;

    // 执行动画
    xTo.current?.(rotateY);
    yTo.current?.(rotateX);
  };

  const handleMouseLeave = () => {
    xTo.current?.(0);
    yTo.current?.(0);
  };

  return (
    <div className="relative p-10 perspective-normal transform-3d">
      <div
        className="absolute inset-2 -inset-x-4 z-20 perspective-normal"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />

      <div ref={cardRef} className={className}>
        {children}
      </div>
    </div>
  );
};

import { prepareWithSegments, layoutNextLine, type LayoutCursor } from '@chenglou/pretext';
import { useMemo, useRef, useEffect, useCallback } from 'react';

type Orb = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
};

function circleIntervalForBand(
  cx: number, cy: number, r: number,
  bandTop: number, bandBottom: number, hPad: number = 0,
): { left: number; right: number } | null {
  if (bandBottom <= cy - r || bandTop >= cy + r) return null;
  const minDy = cy >= bandTop && cy <= bandBottom ? 0 : cy < bandTop ? bandTop - cy : cy - bandBottom;
  if (minDy >= r) return null;
  const maxDx = Math.sqrt(r * r - minDy * minDy);
  return { left: cx - maxDx - hPad, right: cx + maxDx + hPad };
}

function carveTextLineSlots(
  baseLeft: number, baseRight: number,
  blocked: { left: number; right: number }[],
): { left: number; right: number }[] {
  let slots: { left: number; right: number }[] =[{ left: baseLeft, right: baseRight }];
  for (const interval of blocked) {
    const next: { left: number; right: number }[] =[];
    for (const slot of slots) {
      if (interval.right <= slot.left || interval.left >= slot.right) {
        next.push(slot); continue;
      }
      if (interval.left > slot.left) next.push({ left: slot.left, right: interval.left });
      if (interval.right < slot.right) next.push({ left: interval.right, right: slot.right });
    }
    slots = next;
  }
  return slots.filter(slot => slot.right - slot.left >= 24);
}

export function TextMeasure({
  text,
  maxWidth,
  font,
  lineHeight,
  className,
  bounceAreaId, // 新增参数
}: {
  text: string;
  maxWidth: number;
  font: string;
  lineHeight: number;
  className?: string;
  bounceAreaId?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const orbState = useRef<Orb>({ x: 180, y: 80, r: 45, vx: 0.8, vy: 0.6 });
  const targetOrb = useRef({ x: 180, y: 80 }); 

  // 记录外部区域相对当前文字容器的位置，作为物理墙壁
  const boundsCache = useRef({ minX: 0, maxX: maxWidth, minY: 0, maxY: 300 });
  const lineElementsRef = useRef<HTMLDivElement[]>([]);

  const prepared = useMemo(() => prepareWithSegments(text, font),[text, font]);

  // 计算反弹墙壁边界 (ResizeObserver)
  useEffect(() => {
    if (!bounceAreaId || !containerRef.current) return;
    const bounceArea = document.getElementById(bounceAreaId);
    const container = containerRef.current;
    if (!bounceArea) return;

    const updateBounds = () => {
      const bounceRect = bounceArea.getBoundingClientRect();
      const localRect = container.getBoundingClientRect();
      boundsCache.current = {
        minX: bounceRect.left - localRect.left,
        maxX: bounceRect.right - localRect.left,
        minY: bounceRect.top - localRect.top,
        maxY: bounceRect.bottom - localRect.top,
      };
    };

    updateBounds(); // 初始计算
    const observer = new ResizeObserver(updateBounds);
    observer.observe(bounceArea);
    observer.observe(container);
    return () => observer.disconnect();
  }, [bounceAreaId, maxWidth]);

  // Pointer 事件完全绑定在球体身上
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    isDragging.current = true;
    dragOffset.current = { x: x - orbState.current.x, y: y - orbState.current.y };
    targetOrb.current = { x: x - dragOffset.current.x, y: y - dragOffset.current.y };
    
    // 锁定指针，拖拽移出球体外也能死死抓住
    e.currentTarget.setPointerCapture(e.pointerId);
    e.stopPropagation(); // 阻止冒泡，确保只有球体响应
  },[]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    targetOrb.current = {
      x: x - dragOffset.current.x,
      y: y - dragOffset.current.y,
    };
  },[]);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      isDragging.current = false;
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  },[]);

  // 核心渲染循环
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const render = () => {
      const { r } = orbState.current;
      const { minX, maxX, minY, maxY } = boundsCache.current;

      // 1. 物理计算
      if (!isDragging.current) {
        orbState.current.x += orbState.current.vx;
        orbState.current.y += orbState.current.vy;

        // X轴撞墙反弹
        if (orbState.current.x <= minX + r) {
          orbState.current.x = minX + r;
          orbState.current.vx *= -1;
        } else if (orbState.current.x >= maxX - r) {
          orbState.current.x = maxX - r;
          orbState.current.vx *= -1;
        }

        // Y轴撞墙反弹
        if (orbState.current.y <= minY + r) {
          orbState.current.y = minY + r;
          orbState.current.vy *= -1;
        } else if (orbState.current.y >= maxY - r) {
          orbState.current.y = maxY - r;
          orbState.current.vy *= -1;
        }
      } else {
        // 拖拽平滑跟随
        orbState.current.x += (targetOrb.current.x - orbState.current.x) * 0.3;
        orbState.current.y += (targetOrb.current.y - orbState.current.y) * 0.3;
      }

      const { x, y } = orbState.current;

      // 渲染光球
      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${x - r}px, ${y - r}px)`;
        orbRef.current.style.cursor = isDragging.current ? 'grabbing' : 'grab';
      }

      // 2. 实时重计算文字排版布局
      let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
      let lineTop = 0;
      const hPad = 8;
      let domIndex = 0;
      let textExhausted = false;
      const maxLines = 50; 

      for (let i = 0; i < maxLines && !textExhausted; i++) {
        const bandTop = lineTop;
        const bandBottom = lineTop + lineHeight;

        const blocked = circleIntervalForBand(x, y, r, bandTop, bandBottom, hPad);
        const slots = blocked
          ? carveTextLineSlots(0, maxWidth, [blocked])
          :[{ left: 0, right: maxWidth }];

        let lineHasText = false;

        for (const slot of slots) {
          if (slot.right - slot.left < 15) continue;

          const line = layoutNextLine(prepared, cursor, slot.right - slot.left);
          if (line === null) {
            textExhausted = true;
            break;
          }

          if (!lineElementsRef.current[domIndex]) {
            const el = document.createElement('div');
            el.className = 'absolute whitespace-pre text-inherit pointer-events-none';
            el.style.font = font;
            container.appendChild(el);
            lineElementsRef.current.push(el);
          }

          const el = lineElementsRef.current[domIndex];
          el.style.display = 'block';
          el.style.transform = `translate(${slot.left}px, ${lineTop}px)`;
          el.style.lineHeight = `${lineHeight}px`;
          el.textContent = line.text;

          domIndex++;
          lineHasText = true;
          cursor = line.end;
        }

        if (textExhausted && !lineHasText) break;
        lineTop += lineHeight;
      }

      for (let i = domIndex; i < lineElementsRef.current.length; i++) {
        lineElementsRef.current[i].style.display = 'none';
      }

      container.style.height = `${Math.max(lineTop, lineHeight * 3)}px`;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [prepared, maxWidth, lineHeight, font]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className || ''}`}
      style={{ maxWidth, overflow: 'visible', touchAction: 'none' }}
    >
      {/* 发光球体 - 此时所有的事件绑定都在球体身上 */}
      <div
        ref={orbRef}
        className="absolute rounded-full"
        style={{
          width: orbState.current.r * 2,
          height: orbState.current.r * 2,
          top: 0,
          left: 0,
          background: 'radial-gradient(circle, rgba(255,200,150,0.6) 0%, rgba(255,180,130,0.3) 40%, rgba(255,150,100,0.1) 70%, transparent 100%)',
          boxShadow: '0 0 40px 20px rgba(255,180,130,0.3), inset 0 0 20px 5px rgba(255,200,150,0.2)',
          zIndex: 10,
          willChange: 'transform',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />
    </div>
  );
}

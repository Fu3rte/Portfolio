import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';
import { useMemo, useRef, useState, useCallback } from 'react';

// 子组件：负责渲染单个字符并计算与鼠标的物理排斥
const RepellingPart = ({
  text,
  mousePos,
  isHovering,
  charIndex,
  lineIndex,
  lineHeight,
}: {
  text: string;
  mousePos: { x: number; y: number };
  isHovering: boolean;
  charIndex: number;
  lineIndex: number;
  lineHeight: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  let x = 0;
  let y = 0;

  // 当鼠标悬浮且 DOM 渲染完毕时，计算排斥偏移量
  if (isHovering && ref.current) {
    // 计算字符在容器内的中心点
    const charWidth = ref.current.offsetWidth;
    const charCenterX = ref.current.offsetLeft + charWidth / 2;
    const lineStartY = lineIndex * lineHeight;
    const charCenterY = lineStartY + lineHeight / 2;

    const dx = charCenterX - mousePos.x;
    const dy = charCenterY - mousePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // 排斥半径：与圆形占位符的宽度匹配
    const repelRadius = 25;

    // 如果字符处于鼠标半径内，则施加向外的推力
    if (distance < repelRadius && distance > 0) {
      const force = (repelRadius - distance) / repelRadius;
      const pushStrength = 20;

      x = (dx / distance) * force * pushStrength;
      y = (dy / distance) * force * pushStrength;
    }
  }

  return (
    <span
      ref={ref}
      className="inline-block pointer-events-none"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        transition: isHovering ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0.9, 0.2, 1)',
        whiteSpace: 'pre',
      }}
    >
      {text}
    </span>
  );
};

export function TextMeasure({
  text,
  maxWidth,
  font,
  lineHeight,
  className,
}: {
  text: string;
  maxWidth: number;
  font: string;
  lineHeight: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const prepared = useMemo(
    () => prepareWithSegments(text, font),
    [text, font]
  );

  const { height, lines } = useMemo(
    () => layoutWithLines(prepared, maxWidth, lineHeight),
    [prepared, maxWidth, lineHeight]
  );

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height, maxWidth, width: '100%' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* 鼠标跟随的圆形占位符 */}
      <div
        className="pointer-events-none absolute rounded-full bg-primary/20"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: 25,
          height: 25,
          transform: 'translate(-50%, -50%)',
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
          zIndex: 0,
        }}
      />

      {lines.map((line, lineIndex) => (
        <div
          key={lineIndex}
          className="relative z-10 whitespace-nowrap"
          style={{ lineHeight: `${lineHeight}px` }}
        >
          {line.text.split('').map((char, charIndex) => (
            <RepellingPart
              key={charIndex}
              text={char}
              mousePos={mousePos}
              isHovering={isHovering}
              charIndex={charIndex}
              lineIndex={lineIndex}
              lineHeight={lineHeight}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

import React, { useRef, useEffect, useCallback } from 'react';
import type { PhotoItem, LayoutConfig } from './types';

interface CanvasLayerProps {
  photoItems: PhotoItem[];
  layoutConfig: LayoutConfig | null;
  getOffset: () => { x: number; y: number };
  onImageClick: (photo: PhotoItem) => void;
}

export const CanvasLayer: React.FC<CanvasLayerProps> = ({
  photoItems,
  layoutConfig,
  getOffset,
  onImageClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !layoutConfig) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const offset = getOffset();

    photoItems.forEach((photo) => {
      const drawX = photo.originalX + offset.x + photo.x;
      const drawY = photo.originalY + offset.y + photo.y;
      ctx.drawImage(
        photo.img,
        drawX,
        drawY,
        layoutConfig.imageWidth,
        layoutConfig.imageHeight
      );
    });

    rafRef.current = requestAnimationFrame(render);
  }, [photoItems, layoutConfig, getOffset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [render]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const photo = photoItems.find((p) => {
      const offset = getOffset();
      const drawX = p.originalX + offset.x + p.x;
      const drawY = p.originalY + offset.y + p.y;
      return (
        e.clientX >= rect.left + drawX &&
        e.clientX < rect.left + drawX + layoutConfig!.imageWidth &&
        e.clientY >= rect.top + drawY &&
        e.clientY < rect.top + drawY + layoutConfig!.imageHeight
      );
    });
    if (photo) onImageClick(photo);
  }, [photoItems, layoutConfig, getOffset, onImageClick]);

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        cursor: 'pointer',
      }}
    />
  );
};

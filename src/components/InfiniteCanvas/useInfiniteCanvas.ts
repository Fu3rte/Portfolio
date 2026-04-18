import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import type { PhotoItem, PhotoData, LayoutConfig } from './types';

const DEFAULT_IMAGE_WIDTH = 234;
const DEFAULT_IMAGE_HEIGHT = 342;
const DEFAULT_GAP_X = 36;
const DEFAULT_GAP_Y = 48;

export function useInfiniteCanvas(
  photos: PhotoData[],
  imageWidth: number = DEFAULT_IMAGE_WIDTH,
  imageHeight: number = DEFAULT_IMAGE_HEIGHT,
  gapX: number = DEFAULT_GAP_X,
  gapY: number = DEFAULT_GAP_Y
) {
  const [photoItems, setPhotoItems] = useState<PhotoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig | null>(null);

  const offsetRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Calculate layout based on viewport
  const calculateLayout = useCallback((
    containerWidth: number,
    containerHeight: number
  ): LayoutConfig => {
    const columnsPerRow = Math.floor(
      (containerWidth - gapX * 2) / (imageWidth + gapX)
    );
    const totalRows = Math.ceil(photos.length / columnsPerRow);
    const totalWidth = columnsPerRow * (imageWidth + gapX) - gapX;
    const totalHeight = totalRows * (imageHeight + gapY) - gapY;

    return {
      columnsPerRow,
      totalRows,
      imageWidth,
      imageHeight,
      gapX,
      gapY,
      totalWidth,
      totalHeight,
    };
  }, [photos.length, imageWidth, imageHeight, gapX, gapY]);

  // Initialize photos with layout
  useEffect(() => {
    const loadPhotos = async () => {
      setIsLoading(true);
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      const layout = calculateLayout(containerWidth, containerHeight);
      setLayoutConfig(layout);

      const items: PhotoItem[] = await Promise.all(
        photos.map(async (photo, index) => {
          const img = new Image();
          img.src = photo.src;
          await new Promise((resolve) => {
            img.onload = resolve;
          });

          const col = index % layout.columnsPerRow;
          const row = Math.floor(index / layout.columnsPerRow);
          const offsetX = row % 2 === 1 ? (imageWidth + gapX) / 2 : 0;

          return {
            id: photo.id,
            img,
            originalX: col * (imageWidth + gapX) + offsetX,
            originalY: row * (imageHeight + gapY),
            x: 0,
            y: 0,
            col,
            row,
            metadata: photo.metadata,
          };
        })
      );

      setPhotoItems(items);
      setIsLoading(false);
    };

    loadPhotos();
  }, [photos, calculateLayout, imageWidth, imageHeight, gapX, gapY]);

  // Drag handling
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;

    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    offsetRef.current.x += dx;
    offsetRef.current.y += dy;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // Click detection - returns photo index or null
  const checkImage = useCallback((
    clientX: number,
    clientY: number,
    canvasRect: DOMRect
  ): PhotoItem | null => {
    const x = clientX - canvasRect.left - offsetRef.current.x;
    const y = clientY - canvasRect.top - offsetRef.current.y;

    return photoItems.find(photo => {
      const drawX = photo.originalX + photo.x;
      const drawY = photo.originalY + photo.y;
      return (
        x >= drawX && x < drawX + imageWidth &&
        y >= drawY && y < drawY + imageHeight
      );
    }) || null;
  }, [photoItems, imageWidth, imageHeight]);

  // Get current offset for rendering
  const getOffset = useCallback(() => offsetRef.current, []);

  return {
    photoItems,
    isLoading,
    layoutConfig,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
    },
    checkImage,
    getOffset,
  };
}
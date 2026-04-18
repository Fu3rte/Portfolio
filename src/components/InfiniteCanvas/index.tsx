import React, { useState, useCallback } from 'react';
import { CanvasLayer } from './CanvasLayer';
import { EdgeMask } from './EdgeMask';
import { Lightbox } from './Lightbox';
import { useInfiniteCanvas } from './useInfiniteCanvas';
import type { InfiniteCanvasProps, PhotoItem } from './types';

export const InfiniteCanvas: React.FC<InfiniteCanvasProps> = ({
  photos,
  imageWidth,
  imageHeight,
  gapX,
  gapY,
}) => {
  const [focusedPhoto, setFocusedPhoto] = useState<PhotoItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const {
    photoItems,
    isLoading,
    layoutConfig,
    handlers,
    checkImage,
    getOffset,
  } = useInfiniteCanvas(photos, imageWidth, imageHeight, gapX, gapY);

  const handleImageClick = useCallback((photo: PhotoItem) => {
    setFocusedPhoto(photo);
    setIsLightboxOpen(true);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setFocusedPhoto(null);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-xl text-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-background"
      {...handlers}
    >
      <CanvasLayer
        photoItems={photoItems}
        layoutConfig={layoutConfig}
        getOffset={getOffset}
        onImageClick={handleImageClick}
      />

      <EdgeMask direction="left" />
      <EdgeMask direction="right" />

      <Lightbox
        photo={focusedPhoto}
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
      />
    </div>
  );
};

export * from './types';
export { useInfiniteCanvas } from './useInfiniteCanvas';

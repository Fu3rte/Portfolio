import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { PhotoItem } from './types';

interface LightboxProps {
  photo: PhotoItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photo,
  isOpen,
  onClose,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const image = imageRef.current;
    const info = infoRef.current;

    if (!overlay || !image || !info) return;

    if (isOpen && photo) {
      // Open animation
      const tl = gsap.timeline();
      tl.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      tl.fromTo(image,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.1'
      );
      tl.fromTo(info,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        '-=0.2'
      );
    }
  }, [isOpen, photo]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!photo) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        backgroundColor: 'rgba(23, 23, 23, 0.9)',
        backdropFilter: 'blur(10px)',
        opacity: 0,
        cursor: 'pointer',
      }}
    >
      <img
        ref={imageRef}
        src={photo.img.src}
        alt={photo.metadata?.title}
        className="max-w-[80vw] max-h-[70vh] object-contain rounded-lg"
        style={{ opacity: 0 }}
      />
      <div
        ref={infoRef}
        className="mt-6 text-center text-white"
        style={{ opacity: 0 }}
      >
        <h2 className="text-2xl font-semibold">
          {photo.metadata?.title || 'Untitled'}
        </h2>
        {photo.metadata?.description && (
          <p className="mt-2 text-gray-300">
            {photo.metadata.description}
          </p>
        )}
        {photo.metadata?.date && (
          <p className="mt-1 text-sm text-gray-400">
            {photo.metadata.date}
          </p>
        )}
        {photo.metadata?.location && (
          <p className="mt-1 text-sm text-gray-400">
            {photo.metadata.location}
          </p>
        )}
      </div>
    </div>
  );
};

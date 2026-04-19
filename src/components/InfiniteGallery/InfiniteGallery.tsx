import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';

import './InfiniteGallery.css';
import type { InfiniteGalleryProps, CanvasPhoto, PhotoItem } from './type';

export const InfiniteGallery: React.FC<InfiniteGalleryProps> = ({
  photos,
  photoWidth = 234,
  photoHeight = 342,
  gap = 36,
  lineGap = 48,
  standardWidth = 1440,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photosRef = useRef<CanvasPhoto[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayImageRef = useRef<HTMLImageElement>(null);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const photosPerLine = 7;

  const photoGrid = useMemo(() => {
    return photos.map((photo, index) => {
      const col = index % photosPerLine;
      const row = Math.floor(index / photosPerLine);
      return {
        ...photo,
        id: photo.id ?? index,
        x: col * (photoWidth + gap),
        y: row * (photoHeight + lineGap),
        movX: 0,
        movY: 0,
      };
    });
  }, [gap, lineGap, photoHeight, photoWidth, photos]);

  useEffect(() => {
    const handleResize = () => {
      setScale(Math.min(1, window.innerWidth / standardWidth));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [standardWidth]);

  useEffect(() => {
    photosRef.current = photoGrid.map((item) => ({
      ...item,
      x: item.x * scale,
      y: item.y * scale,
      width: photoWidth * scale,
      height: photoHeight * scale,
    }));
  }, [photoGrid, photoHeight, photoWidth, scale]);

  useEffect(() => {
    if (!selectedPhoto) return;
    const img = new Image();
    img.src = selectedPhoto.src;
    overlayImageRef.current = img;
  }, [selectedPhoto]);

  const bounds = useMemo(() => {
    const containerWidth = photosPerLine * (photoWidth * scale + gap * scale) - gap * scale;
    const rows = Math.ceil(photos.length / photosPerLine);
    const containerHeight = rows * (photoHeight * scale + lineGap * scale) - lineGap * scale;
    return {
      containerWidth,
      containerHeight,
      wrapX: containerWidth + gap * scale,
      wrapY: containerHeight + lineGap * scale,
    };
  }, [gap, lineGap, photoHeight, photoWidth, photos.length, scale]);

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const radius = 18 * scale;
    const offsets = [-1, 0, 1];

    const drawRoundedImage = (
      image: HTMLImageElement,
      x: number,
      y: number,
      width: number,
      height: number,
      cornerRadius: number
    ) => {
      if (image.naturalWidth === 0 || image.naturalHeight === 0) return;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + cornerRadius, y);
      ctx.arcTo(x + width, y, x + width, y + height, cornerRadius);
      ctx.arcTo(x + width, y + height, x, y + height, cornerRadius);
      ctx.arcTo(x, y + height, x, y, cornerRadius);
      ctx.arcTo(x, y, x + width, y, cornerRadius);
      ctx.closePath();
      ctx.clip();

      try {
        ctx.drawImage(image, x, y, width, height);
      } catch {
        // skip broken images
      }

      ctx.restore();
    };

    photosRef.current.forEach((photo) => {
      const img = photo.image;
      if (!img || !img.complete) return;

      offsets.forEach((offsetX) => {
        offsets.forEach((offsetY) => {
          drawRoundedImage(
            img,
            photo.x + photo.movX + offsetX * bounds.wrapX,
            photo.y + photo.movY + offsetY * bounds.wrapY,
            photo.width,
            photo.height,
            radius
          );
        });
      });
    });
  }, [bounds.wrapX, bounds.wrapY, scale]);

  useEffect(() => {
    const images = photoGrid.map((item) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = item.src;
      return img;
    });

    photosRef.current = photoGrid.map((item, index) => ({
      ...item,
      image: images[index],
      width: photoWidth * scale,
      height: photoHeight * scale,
      x: item.x * scale,
      y: item.y * scale,
    }));

    let alive = true;
    const handleLoad = () => {
      if (alive) renderCanvas();
    };

    images.forEach((img) => {
      if (img.complete) {
        handleLoad();
      } else {
        img.addEventListener('load', handleLoad, { once: true });
      }
    });

    renderCanvas();
    return () => {
      alive = false;
      images.forEach((img) => img.removeEventListener('load', handleLoad));
    };
  }, [photoGrid, photoHeight, photoWidth, renderCanvas, scale]);

  const movePhotos = useCallback(
    (dx: number, dy: number) => {
      photosRef.current.forEach((photo) => {
        photo.movX += dx;
        photo.movY += dy;

        if (photo.movX > bounds.wrapX || photo.movX < -bounds.wrapX) {
          photo.movX %= bounds.wrapX;
        }
        if (photo.movY > bounds.wrapY || photo.movY < -bounds.wrapY) {
          photo.movY %= bounds.wrapY;
        }
      });
      renderCanvas();
    },
    [bounds.wrapX, bounds.wrapY, renderCanvas]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      movePhotos(e.deltaX, e.deltaY);
    };

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [movePhotos]);

  const findPhotoAtPoint = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    for (let i = photosRef.current.length - 1; i >= 0; i -= 1) {
      const photo = photosRef.current[i];
      const left = photo.x + photo.movX;
      const top = photo.y + photo.movY;
      const right = left + photo.width;
      const bottom = top + photo.height;

      if (x >= left && x <= right && y >= top && y <= bottom) {
        return photo;
      }
    }

    return null;
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      movePhotos(dx, dy);
      lastMouse.current = { x: e.clientX, y: e.clientY };
    },
    [movePhotos]
  );
  
  const openPhoto = useCallback((photo: PhotoItem) => {
    setSelectedPhoto(photo);
    gsap.fromTo(
      overlayRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.25, ease: 'power2.out' }
    );
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (isDragging.current) return;
      const photo = findPhotoAtPoint(e.clientX, e.clientY);
      if (photo) {
        openPhoto({
          id: photo.id,
          src: photo.src,
          title: photo.title,
          location: photo.location,
          description: photo.description,
        });
      }
    },
    [findPhotoAtPoint, openPhoto]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    isDragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    isDragging.current = false;
  }, []);


  const closePhoto = useCallback(() => {
    gsap.to(overlayRef.current, {
      autoAlpha: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => setSelectedPhoto(null),
    });
  }, []);

  return (
    <div className="relative h-svh w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full cursor-grab touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      />

      {selectedPhoto ? (
        <div
          ref={overlayRef}
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 px-6 backdrop-blur-md"
          onClick={closePhoto}
        >
          <div
            className="grid w-full max-w-5xl gap-6 rounded-[32px] border border-white/10 bg-white/8 p-4 text-white shadow-2xl md:grid-cols-[1.2fr_0.8fr] md:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden rounded-[24px] bg-black/20">
              <img
                ref={overlayImageRef}
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between gap-6 p-2 md:p-4">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">{selectedPhoto.location}</p>
                <h2 className="text-3xl font-semibold md:text-5xl">{selectedPhoto.title}</h2>
                <p className="max-w-md text-sm leading-7 text-white/75 md:text-base">{selectedPhoto.description}</p>
              </div>
              <button
                type="button"
                className="self-start rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10"
                onClick={closePhoto}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

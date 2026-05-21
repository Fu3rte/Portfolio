import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';

import type { InfiniteGalleryProps, CanvasPhoto, PhotoItem } from './type';

const imageCache = new Map<string, HTMLImageElement>();

function getCachedImage(src: string) {
  const cachedImage = imageCache.get(src);
  if (cachedImage) return cachedImage;

  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.src = src;
  imageCache.set(src, image);
  return image;
}

function getTileOffsets(wrapSize: number, viewportSize: number) {
  if (wrapSize <= 0 || viewportSize <= 0) return [0];

  const radius = Math.ceil(viewportSize / wrapSize) + 1;
  return Array.from({ length: radius * 2 + 1 }, (_, index) => index - radius);
}

export const InfiniteGallery: React.FC<InfiniteGalleryProps> = ({
  photos,
  photoWidth = 234,
  photoHeight = 342,
  gap = 96,
  lineGap = 120,
  standardWidth = 1440,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photosRef = useRef<CanvasPhoto[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayCardRef = useRef<HTMLDivElement>(null);
  const overlayImageRef = useRef<HTMLImageElement>(null);
  const overlayTlRef = useRef<gsap.core.Timeline | null>(null);
  const isDragging = useRef(false);
  const didDrag = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const photosPerLine = 7;

  const photoGrid = useMemo(() => {
    if (photos.length === 0) return [];

    const columnStep = photoWidth + gap;
    const rowOffset = columnStep / 2;
    const rows = Math.ceil(photos.length / photosPerLine);
    const cellCount = rows * photosPerLine;

    return Array.from({ length: cellCount }, (_, index) => {
      const photo = photos[index % photos.length];
      const col = index % photosPerLine;
      const row = Math.floor(index / photosPerLine);
      const staggerX = row % 2 === 1 ? rowOffset : 0;

      return {
        ...photo,
        id: index + 1,
        x: col * columnStep + staggerX,
        y: row * (photoHeight + lineGap),
        movX: 0,
        movY: 0,
      };
    });
  }, [gap, lineGap, photoHeight, photoWidth, photos]);

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
      setScale(Math.max(1, standardWidth / viewportWidth));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.visualViewport?.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
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

    overlayTlRef.current?.kill();
    gsap.set(overlayRef.current, { autoAlpha: 0 });
    gsap.set(overlayCardRef.current, { autoAlpha: 0, y: 24, scale: 0.96 });

    overlayTlRef.current = gsap.timeline();
    overlayTlRef.current
      .to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.18,
        ease: 'power1.out',
      })
      .to(
        overlayCardRef.current,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power4.out',
        },
        0.02
      );
  }, [selectedPhoto]);

  useEffect(() => {
    return () => {
      overlayTlRef.current?.kill();
    };
  }, []);

  const bounds = useMemo(() => {
    const containerWidth =
      photosPerLine * (photoWidth * scale + gap * scale) - gap * scale;
    const rows = Math.ceil(photoGrid.length / photosPerLine);
    const containerHeight =
      rows * (photoHeight * scale + lineGap * scale) - lineGap * scale;
    return {
      containerWidth,
      containerHeight,
      wrapX: containerWidth + gap * scale,
      wrapY: containerHeight + lineGap * scale,
    };
  }, [gap, lineGap, photoGrid.length, photoHeight, photoWidth, scale]);

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
    const offsetXRange = getTileOffsets(bounds.wrapX, rect.width);
    const offsetYRange = getTileOffsets(bounds.wrapY, rect.height);

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

      offsetXRange.forEach((offsetX) => {
        offsetYRange.forEach((offsetY) => {
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
    const images = photoGrid.map((item) => getCachedImage(item.src));

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
      movePhotos(e.deltaX, -e.deltaY);
    };

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [movePhotos]);

  const findPhotoAtPoint = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const offsetXRange = getTileOffsets(bounds.wrapX, rect.width);
      const offsetYRange = getTileOffsets(bounds.wrapY, rect.height);

      for (let i = photosRef.current.length - 1; i >= 0; i -= 1) {
        const photo = photosRef.current[i];

        for (const offsetX of offsetXRange) {
          for (const offsetY of offsetYRange) {
            const left = photo.x + photo.movX + offsetX * bounds.wrapX;
            const top = photo.y + photo.movY + offsetY * bounds.wrapY;
            const right = left + photo.width;
            const bottom = top + photo.height;

            if (x >= left && x <= right && y >= top && y <= bottom) {
              return photo;
            }
          }
        }
      }

      return null;
    },
    [bounds.wrapX, bounds.wrapY]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      isDragging.current = true;
      didDrag.current = false;
      lastMouse.current = { x: e.clientX, y: e.clientY };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;

      if (Math.abs(dx) > 0 || Math.abs(dy) > 0) {
        didDrag.current = true;
      }

      movePhotos(dx, dy);
      lastMouse.current = { x: e.clientX, y: e.clientY };
    },
    [movePhotos]
  );

  const openPhoto = useCallback((photo: PhotoItem) => {
    setSelectedPhoto(photo);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (didDrag.current) {
        didDrag.current = false;
        return;
      }

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

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      isDragging.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    },
    []
  );

  const handlePointerLeave = useCallback(() => {
    isDragging.current = false;
  }, []);

  const closePhoto = useCallback(() => {
    if (overlayTlRef.current) {
      overlayTlRef.current.kill();
    }

    overlayTlRef.current = gsap.timeline({
      onComplete: () => setSelectedPhoto(null),
    });

    overlayTlRef.current
      .to(overlayCardRef.current, {
        y: 18,
        scale: 0.96,
        autoAlpha: 0,
        duration: 0.22,
        ease: 'power2.in',
      })
      .to(
        overlayRef.current,
        {
          autoAlpha: 0,
          duration: 0.18,
          ease: 'power2.inOut',
        },
        0.04
      );
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
          className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden bg-black/70 px-6 backdrop-blur-xl"
          onClick={closePhoto}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),rgba(0,0,0,0.65)_60%,rgba(0,0,0,0.85)_100%)]" />
          <div
            ref={overlayCardRef}
            className="relative z-10 flex max-h-[86vh] w-full max-w-4xl flex-col items-center gap-6"
            onClick={closePhoto}
          >
            <div className="overflow-hidden rounded-[30px] border border-white/10 bg-black/20 shadow-2xl">
              <img
                ref={overlayImageRef}
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                decoding="async"
                className="max-h-[68vh] w-auto max-w-full object-contain"
              />
            </div>
            <div className="space-y-3 text-center text-white">
              <p className="text-xs tracking-[0.35em] text-white/60 uppercase">
                {selectedPhoto.location}
              </p>
              <h2 className="text-2xl font-semibold md:text-4xl">
                {selectedPhoto.title}
              </h2>
              <p className="mx-auto max-w-md text-sm leading-7 text-white/75 md:text-base">
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

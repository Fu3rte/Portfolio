import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import './InfiniteGallery.css';
import type { InfiniteGalleryProps, PhotoData, PhotoLine } from './type';

export const InfiniteGallery: React.FC<InfiniteGalleryProps> = ({
  photos,
  photoWidth = 234,
  photoHeight = 342,
  gap = 48,
  lineGap = 48,
  standardWidth = 1440,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<PhotoData[]>([]);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const scaleNums = useRef(1);

  const photosPerLine = 7;
  const photoLines: PhotoLine[] = [];
  for (let i = 0; i < photos.length; i += photosPerLine) {
    photoLines.push({
      id: Math.floor(i / photosPerLine),
      photos: photos.slice(i, i + photosPerLine).map((src, idx) => ({
        id: i + idx,
        src,
      })),
    });
  }

  const containerWidth = photoWidth * photosPerLine + gap * photosPerLine;
  const containerHeight =
    photoLines.length * photoHeight + lineGap * photoLines.length;

  const handleResize = useCallback(() => {
    if (!containerRef.current) return;

    const imgs = photoRefs.current;
    if (imgs.length === 0) return;

    scaleNums.current = window.innerWidth / standardWidth;
    containerRef.current.style.transform = `scale(${scaleNums.current})`;
    containerRef.current.style.transformOrigin = 'center center';
    gsap.to(
      imgs.map((img) => img.node),
      {
        x: 0,
        y: 0,
        duration: 0,
        ease: 'power4.out',
      }
    );

    imgs.forEach((img) => {
      img.mov_x = 0;
      img.mov_y = 0;
    });
  }, [standardWidth]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;

      const distance_x = (e.clientX - lastMouse.current.x) / scaleNums.current;
      const distance_y = (e.clientY - lastMouse.current.y) / scaleNums.current;

      const scaledWidth = containerWidth * scaleNums.current;
      const scaledHeight = containerHeight * scaleNums.current;

      photoRefs.current.forEach((img) => {
        img.mov_x += distance_x;

        // Wrap right: maintain gap after the last photo to the first photo
        if (img.x + img.mov_x > scaledWidth) {
          img.mov_x -= scaledWidth + gap;
        }

        // Wrap left: maintain same gap as right side
        if (img.x + img.mov_x < -(photoWidth + gap) * scaleNums.current) {
          img.mov_x += scaledWidth + gap;
        }

        img.mov_y += distance_y;
        // Wrap down: maintain gap below
        if (img.y + img.mov_y > scaledHeight) {
          img.mov_y -= scaledHeight + lineGap;
        }

        // Wrap up: maintain same gap as top
        if (img.y + img.mov_y < -(photoHeight + lineGap) * scaleNums.current) {
          img.mov_y += scaledHeight + lineGap;
        }

        if (img.ani) img.ani.kill();
        img.ani = gsap.to(img.node, {
          x: img.mov_x,
          y: img.mov_y,
          duration: 0,
          ease: 'power4.out',
        });
      });

      lastMouse.current = { x: e.clientX, y: e.clientY };
    },
    [containerWidth, containerHeight, photoWidth, photoHeight]
  );

  // Handle touch events
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (
        !isDragging.current ||
        !containerRef.current ||
        e.touches.length !== 1
      )
        return;

      const touch = e.touches[0];
      const distance_x =
        (touch.clientX - lastMouse.current.x) / scaleNums.current;
      const distance_y =
        (touch.clientY - lastMouse.current.y) / scaleNums.current;

      const scaledWidth = containerWidth * scaleNums.current;
      const scaledHeight = containerHeight * scaleNums.current;

      photoRefs.current.forEach((img) => {
        img.mov_x += distance_x;

        // Wrap right: maintain gap after the last photo to the first photo
        if (img.x + img.mov_x > scaledWidth) {
          img.mov_x -= scaledWidth + gap;
        }

        // Wrap left: maintain same gap as right side
        if (img.x + img.mov_x < -(photoWidth + gap) * scaleNums.current) {
          img.mov_x += scaledWidth + gap;
        }

        img.mov_y += distance_y;
        // Wrap down: maintain gap below
        if (img.y + img.mov_y > scaledHeight) {
          img.mov_y -= scaledHeight + lineGap;
        }

        // Wrap up: maintain same gap as top
        if (img.y + img.mov_y < -(photoHeight + lineGap) * scaleNums.current) {
          img.mov_y += scaledHeight + lineGap;
        }

        if (img.ani) img.ani.kill();
        img.ani = gsap.to(img.node, {
          x: img.mov_x,
          y: img.mov_y,
          duration: 0,
          ease: 'power4.out',
        });
      });

      lastMouse.current = { x: touch.clientX, y: touch.clientY };
    },
    [containerWidth, containerHeight, photoWidth, photoHeight]
  );

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const setPhotoRef = useCallback(
    (el: HTMLDivElement | null, x: number, y: number) => {
      if (!el) return;

      const existing = photoRefs.current.find((p) => p.node === el);
      if (!existing) {
        photoRefs.current.push({
          node: el,
          x,
          y,
          mov_x: 0,
          mov_y: 0,
          ani: null,
        });
      }
    },
    []
  );

  return (
    <div className="relative flex-center h-svh w-full overflow-hidden">
      <div
        ref={containerRef}
        className="absolute flex cursor-grab flex-col select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        {photoLines.map((line, lineIndex) => (
          <div
            key={line.id}
            className="flex shrink-0"
            style={{
              height: photoHeight,
              marginBottom: lineIndex < photoLines.length - 1 ? lineGap : 0,
            }}
          >
            {line.photos.map((photo, photoIndex) => {
              const x = photoIndex * (photoWidth + gap);
              const y = lineIndex * (photoHeight + lineGap);
              return (
                <div
                  key={photo.id}
                  ref={(el) => setPhotoRef(el, x, y)}
                  className="pointer-events-none h-full shrink-0 overflow-hidden rounded-2xl"
                  style={{
                    width: photoWidth,
                    marginRight: photoIndex < photosPerLine - 1 ? gap : 0,
                  }}
                >
                  <img
                    src={photo.src}
                    alt={`Photo ${photo.id}`}
                    className="pointer-events-none h-full w-full object-cover transition-transform duration-300 ease-in-out select-none hover:scale-[1.2]"
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

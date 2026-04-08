import {
  DraggableCardBody,
  DraggableCardContainer,
} from '@/components/ui/draggable-card';

import img1Url from '@/assets/HDC/IMG_20250622_145319.jpg';
import img2Url from '@/assets/HDC/IMG_20250623_004316.jpg';

const images = [
  {
    title: 'West Lake',
    description: 'Hangzhou, China',
    image: img1Url,
    className: 'absolute top-10 left-[18%] rotate-[-6deg]',
  },
  {
    title: 'Campus Life',
    description: 'HDC Campus',
    image: img1Url,
    className: 'absolute top-36 left-[28%] rotate-[5deg]',
  },
  {
    title: 'Evening Glow',
    description: 'Sunset vibes',
    image: img1Url,
    className: 'absolute top-12 left-[42%] rotate-[-3deg]',
  },
  {
    title: 'Night Lights',
    description: 'City nights',
    image: img2Url,
    className: 'absolute top-32 right-[24%] rotate-[7deg]',
  },
  {
    title: 'Urban Flow',
    description: 'Street scenes',
    image: img2Url,
    className: 'absolute top-16 right-[12%] rotate-[-5deg]',
  },
];

export function PhotosPreview() {
  return (
    <DraggableCardContainer className="relative flex-center h-dvh w-screen -ml-[10vw] overflow-hidden">
      {/* Left gradient */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
      {/* Right gradient */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />
      <div className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2">
        <a
          href="photos"
          className="text-center text-base font-bold text-primary/90 hover:text-primary/60 sm:text-lg"
        >
          Click to see more of my shots :{')'}
        </a>
      </div>

      {images.map((item, index) => (
        <DraggableCardBody key={index} className={item.className}>
          <div className="flex flex-col items-center">
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-48 rounded-xl object-cover sm:h-56 sm:w-56 md:h-64 md:w-64"
            />
            <div className="mt-2 w-48 overflow-hidden text-center text-xs sm:w-56 md:w-64">
              <p className="truncate font-medium text-primary/80">{item.title}</p>
              <p className="truncate text-primary/60">{item.description}</p>
            </div>
          </div>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}

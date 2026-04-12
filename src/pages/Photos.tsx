import { useState } from 'react';
import Loading from '@/components/WholePage/Loading';
import img1Url from '@/assets/HDC/IMG_20250622_145319.jpg';
import img2Url from '@/assets/HDC/IMG_20250623_004316.jpg';

const images = [img1Url, img2Url, img1Url, img2Url, img1Url, img2Url];

export function Photos() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <Loading onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-bold text-primary">Photos</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`photo-${i}`}
              className="h-64 w-full rounded-xl object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

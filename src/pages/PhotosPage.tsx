import { InfiniteCanvas } from '@/components/InfiniteCanvas';
import img1 from '@/assets/HDC/IMG_20250622_145319.jpg';
import img2 from '@/assets/HDC/IMG_20250623_004316.jpg';
import img3 from '@/assets/HDC/IMG_20250623_004829.jpg';
import img4 from '@/assets/HDC/IMG_20250623_225854.jpg';
import img5 from '@/assets/HDC/MVIMG_20260112_115940.jpg';
import img6 from '@/assets/HDC/MVIMG_20260112_150811.jpg';
import img7 from '@/assets/HDC/MVIMG_20260112_151048.jpg';

const photos = [
  { id: '1', src: img1 },
  { id: '2', src: img2 },
  { id: '3', src: img3 },
  { id: '4', src: img4 },
  { id: '5', src: img5 },
  { id: '6', src: img6 },
  { id: '7', src: img7 },
  { id: '8', src: img1 }, // duplicate for demo
];

export function PhotosPage() {
  return <InfiniteCanvas photos={photos} />;
}

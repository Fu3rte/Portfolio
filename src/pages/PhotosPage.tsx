import img1 from '@/assets/HDC/IMG_20250622_145319.jpg';
import img2 from '@/assets/HDC/IMG_20250623_004316.jpg';
import img3 from '@/assets/HDC/IMG_20250623_004829.jpg';
import img4 from '@/assets/HDC/IMG_20250623_225854.jpg';
import img5 from '@/assets/HDC/MVIMG_20260112_115940.jpg';
import img6 from '@/assets/HDC/MVIMG_20260112_150811.jpg';
import img7 from '@/assets/HDC/MVIMG_20260112_151048.jpg';
import { InfiniteGallery } from '@/components/InfiniteGallery/InfiniteGallery';

const photos = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
];

export function PhotosPage() {
  return <InfiniteGallery photos={photos} />;
}

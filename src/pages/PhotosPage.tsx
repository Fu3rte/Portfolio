import img1 from '@/assets/HDC/IMG_20250622_145319.jpg';
import img2 from '@/assets/HDC/IMG_20250623_004316.jpg';
import img3 from '@/assets/HDC/IMG_20250623_004829.jpg';
import img4 from '@/assets/HDC/IMG_20250623_225854.jpg';
import img5 from '@/assets/HDC/MVIMG_20260112_115940.jpg';
import img6 from '@/assets/HDC/MVIMG_20260112_150811.jpg';
import img7 from '@/assets/HDC/MVIMG_20260112_151048.jpg';
import { InfiniteGallery } from '@/components/InfiniteGallery/InfiniteGallery';

const photos = [
  {
    id: 1,
    src: img1,
    title: 'Placeholder Title 01',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 01.',
  },
  {
    id: 2,
    src: img2,
    title: 'Placeholder Title 02',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 02.',
  },
  {
    id: 3,
    src: img3,
    title: 'Placeholder Title 03',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 03.',
  },
  {
    id: 4,
    src: img4,
    title: 'Placeholder Title 04',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 04.',
  },
  {
    id: 5,
    src: img5,
    title: 'Placeholder Title 05',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 05.',
  },
  {
    id: 6,
    src: img6,
    title: 'Placeholder Title 06',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 06.',
  },
  {
    id: 7,
    src: img7,
    title: 'Placeholder Title 07',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 07.',
  },
  {
    id: 8,
    src: img1,
    title: 'Placeholder Title 08',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 08.',
  },
  {
    id: 9,
    src: img2,
    title: 'Placeholder Title 09',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 09.',
  },
  {
    id: 10,
    src: img3,
    title: 'Placeholder Title 10',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 10.',
  },
  {
    id: 11,
    src: img4,
    title: 'Placeholder Title 11',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 11.',
  },
  {
    id: 12,
    src: img5,
    title: 'Placeholder Title 12',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 12.',
  },
  {
    id: 13,
    src: img6,
    title: 'Placeholder Title 13',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 13.',
  },
  {
    id: 14,
    src: img7,
    title: 'Placeholder Title 14',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 14.',
  },
];

export function PhotosPage() {
  return <InfiniteGallery photos={photos} />;
}

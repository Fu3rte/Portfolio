import photo01 from '@/assets/Photos/optimized/photo-01.webp';
import photo02 from '@/assets/Photos/optimized/photo-02.webp';
import photo03 from '@/assets/Photos/optimized/photo-03.webp';
import photo04 from '@/assets/Photos/optimized/photo-04.webp';
import photo05 from '@/assets/Photos/optimized/photo-05.webp';
import photo06 from '@/assets/Photos/optimized/photo-06.webp';
import photo07 from '@/assets/Photos/optimized/photo-07.webp';
import photo08 from '@/assets/Photos/optimized/photo-08.webp';
import photo09 from '@/assets/Photos/optimized/photo-09.webp';
import photo10 from '@/assets/Photos/optimized/photo-10.webp';
import { InfiniteGallery } from '@/components/InfiniteGallery/InfiniteGallery';

const photos = [
  {
    id: 1,
    src: photo01,
    title: 'Placeholder Title 01',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 01.',
  },
  {
    id: 2,
    src: photo02,
    title: 'Placeholder Title 02',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 02.',
  },
  {
    id: 3,
    src: photo03,
    title: 'Placeholder Title 03',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 03.',
  },
  {
    id: 4,
    src: photo04,
    title: 'Placeholder Title 04',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 04.',
  },
  {
    id: 5,
    src: photo05,
    title: 'Placeholder Title 05',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 05.',
  },
  {
    id: 6,
    src: photo06,
    title: 'Placeholder Title 06',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 06.',
  },
  {
    id: 7,
    src: photo07,
    title: 'Placeholder Title 07',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 07.',
  },
  {
    id: 8,
    src: photo08,
    title: 'Placeholder Title 08',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 08.',
  },
  {
    id: 9,
    src: photo09,
    title: 'Placeholder Title 09',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 09.',
  },
  {
    id: 10,
    src: photo10,
    title: 'Placeholder Title 10',
    location: 'Placeholder Location',
    description: 'Placeholder description for photo 10.',
  },
];

export function PhotosPage() {
  return <InfiniteGallery photos={photos} />;
}

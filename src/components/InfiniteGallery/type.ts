export interface PhotoItem {
  id: number;
  src: string;
  title?: string;
  description?: string;
}

export interface PhotoLine {
  id: number;
  photos: PhotoItem[];
}

export interface PhotoData {
  node: HTMLDivElement;
  x: number;
  y: number;
  mov_x: number;
  mov_y: number;
  ani: gsap.core.Tween | null;
}

export interface InfiniteGalleryProps {
  photos: string[];
  photoWidth?: number;
  photoHeight?: number;
  gap?: number;
  lineGap?: number;
  standardWidth?: number;
}
export interface PhotoItem {
  id: number;
  src: string;
  title: string;
  location: string;
  description: string;
}

export interface CanvasPhoto {
  id: number;
  src: string;
  title: string;
  location: string;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
  movX: number;
  movY: number;
  image?: HTMLImageElement;
}

export interface InfiniteGalleryProps {
  photos: PhotoItem[];
  photoWidth?: number;
  photoHeight?: number;
  gap?: number;
  lineGap?: number;
  standardWidth?: number;
}

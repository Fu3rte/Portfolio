export interface PhotoMetadata {
  title: string;
  description?: string;
  date?: string;
  location?: string;
}

export interface PhotoItem {
  id: string;
  img: HTMLImageElement;
  originalX: number;
  originalY: number;
  x: number;
  y: number;
  col: number;
  row: number;
  metadata?: PhotoMetadata;
}

export interface PhotoData {
  id: string;
  src: string;
  metadata?: PhotoMetadata;
}

export interface InfiniteCanvasProps {
  photos: PhotoData[];
  imageWidth?: number;
  imageHeight?: number;
  gapX?: number;
  gapY?: number;
}

export interface LayoutConfig {
  columnsPerRow: number;
  totalRows: number;
  imageWidth: number;
  imageHeight: number;
  gapX: number;
  gapY: number;
  totalWidth: number;
  totalHeight: number;
}

import { TranslatedString } from '../translated';

export interface GalleryImageItem {
  id: string;
  url: string;
  alt?: TranslatedString;
}

export interface GalleryGridBlockData {
  images: GalleryImageItem[];
}


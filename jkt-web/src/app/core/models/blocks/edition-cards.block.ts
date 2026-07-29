import { TranslatedString } from '../translated';

export interface EditionCardItem {
  id: string;
  slug: string;
  name: TranslatedString;
  subtitle?: TranslatedString;
  cta_url: string;
  theme_accent: string; // edition accent hex
}

export interface EditionCardsBlockData {
  items: EditionCardItem[];
}


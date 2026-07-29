import { TranslatedString } from '../translated';

export interface HeroBlockData {
  badge?: TranslatedString;
  title: TranslatedString;
  tagline?: TranslatedString;
  /** Optional photo backdrop. Omit to use global atmosphere only (no seam). */
  bg_image?: string;
  cta_label: TranslatedString;
  cta_url: string;
}


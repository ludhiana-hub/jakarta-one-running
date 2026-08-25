import { TranslatedString } from './translated';

export interface SeoData {
  meta_title: TranslatedString;
  meta_description: TranslatedString;
  og_image: string;
  noindex: boolean;
  /**
   * Optional extra meta for future blocks/pages.
   * Keep optional so fixture-first prototype stays lightweight.
   */
  canonical_url?: string;
  /** Comma-separated keywords, used for the `keywords` meta tag. */
  keywords?: string;
}


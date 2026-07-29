import { SeoData } from './seo';
import { TranslatedString } from './translated';
import { PageBlock } from './blocks/page-block';

export interface PageResponse {
  page: {
    slug: string;
    title: TranslatedString;
    seo: SeoData;
    noindex?: boolean;
  };
  blocks: PageBlock[];
}


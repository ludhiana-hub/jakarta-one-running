import { TranslatedString } from './translated';
import { Edition } from './edition';

export interface SiteResponse {
  id: string;
  title: TranslatedString;
  editions: Edition[];
}


import { TranslatedString } from './translated';
import { Edition } from './edition';
import { SiteTracking } from './site-tracking';

export interface SiteResponse {
  id: string;
  title: TranslatedString;
  editions: Edition[];
  /** Present when CMS is connected; used for sitewide Ads / analytics tags. */
  tracking?: SiteTracking;
}


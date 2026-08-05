import { TranslatedString } from '../translated';

export interface SeriesTimelineItem {
  id: string;
  date_label: TranslatedString;
  title: TranslatedString;
  description?: TranslatedString;
  edition_slug?: string;
}

export interface SeriesTimelineBlockData {
  heading?: TranslatedString;
  items: SeriesTimelineItem[];
}

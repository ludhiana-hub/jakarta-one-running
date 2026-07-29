import { TranslatedString } from '../translated';

export interface SeriesTimelineItem {
  id: string;
  title: TranslatedString;
  subtitle?: TranslatedString;
}

export interface SeriesTimelineBlockData {
  items: SeriesTimelineItem[];
}


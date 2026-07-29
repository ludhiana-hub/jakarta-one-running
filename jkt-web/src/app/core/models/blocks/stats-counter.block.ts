import { TranslatedString } from '../translated';

export interface StatsCounterItem {
  id: string;
  label: TranslatedString;
  value: string; // keep as string to avoid formatting drift
}

export interface StatsCounterBlockData {
  items: StatsCounterItem[];
}


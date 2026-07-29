import { TranslatedString } from '../translated';

export interface MilestoneItem {
  id: string;
  year: string;
  title: TranslatedString;
  description: TranslatedString;
}

export interface MilestoneBlockData {
  items: MilestoneItem[];
}


import { TranslatedString } from '../translated';

export interface FaqItem {
  id: string;
  question: TranslatedString;
  answer: TranslatedString;
}

export interface FaqAccordionBlockData {
  items: FaqItem[];
}


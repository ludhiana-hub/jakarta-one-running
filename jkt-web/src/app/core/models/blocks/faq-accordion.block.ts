import { TranslatedString } from '../translated';

export interface FaqItem {
  id: string;
  /** Optional section heading; consecutive items sharing a group are rendered together. */
  group?: TranslatedString;
  question: TranslatedString;
  answer: TranslatedString;
}

export interface FaqAccordionBlockData {
  items: FaqItem[];
}


import { Edition } from '../edition';
import { TranslatedString } from '../translated';

export type EditionCardItem = Edition;

export interface EditionCardsBlockData {
  heading?: TranslatedString;
  items: EditionCardItem[];
}

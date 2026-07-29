import { TranslatedString } from '../translated';

export interface RichTextMediaBlockData {
  title: TranslatedString;
  body: TranslatedString;
  media_image: string;
  media_alt?: TranslatedString;
}


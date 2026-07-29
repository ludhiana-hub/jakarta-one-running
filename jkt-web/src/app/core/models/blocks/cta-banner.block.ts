import { TranslatedString } from '../translated';

export interface CtaBannerBlockData {
  title: TranslatedString;
  subtitle?: TranslatedString;
  cta_label: TranslatedString;
  cta_url: string;
}


import { TranslatedString } from '../translated';

export interface EmbedBlockData {
  title?: TranslatedString;
  url: string;
  /**
   * Optional iframe title / kind marker for later.
   */
  kind?: string;
}


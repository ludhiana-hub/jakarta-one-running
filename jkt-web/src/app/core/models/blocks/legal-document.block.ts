import { TranslatedString } from '../translated';

export interface LegalDocumentBlockData {
  title: TranslatedString;
  /**
   * HTML string for rich text.
   * Sanitization must be handled at rendering time (later block component).
   */
  content_html: string;
}


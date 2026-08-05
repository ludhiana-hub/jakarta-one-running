import { TranslatedString } from './translated';

export interface MenuItem {
  label: TranslatedString;
  type: 'page' | 'anchor' | 'external';
  url: string | null;
  linkable_type: string | null;
  linkable_id: number | null;
  children: MenuItem[];
}

export interface MenuResponse {
  menu: MenuItem[];
}

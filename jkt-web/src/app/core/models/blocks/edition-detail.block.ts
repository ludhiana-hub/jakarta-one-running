import { TranslatedString } from '../translated';

export interface EditionDetailBlockData {
  edition_slug: string;
  heading?: TranslatedString;
  route_description?: TranslatedString;
  rpc_venue?: string;
  village_open?: string;
  village_close?: string;
  medal_image?: string;
  map_image?: string;
}

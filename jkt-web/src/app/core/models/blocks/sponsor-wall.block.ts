import { TranslatedString } from '../translated';

export interface SponsorLogoItem {
  id: string;
  url: string;
  image_url: string;
  name?: TranslatedString;
}

export interface SponsorTierItem {
  id: string;
  name: TranslatedString;
  tier_url?: string;
  logos: SponsorLogoItem[];
}

export interface SponsorWallBlockData {
  tiers: SponsorTierItem[];
}


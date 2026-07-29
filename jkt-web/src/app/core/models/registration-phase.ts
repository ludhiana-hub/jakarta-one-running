import { TranslatedString } from './translated';

export interface RegistrationPhase {
  id: string;
  name: TranslatedString;
  opens_at: string; // ISO date-time string
  closes_at: string; // ISO date-time string
  price: number; // in IDR
  registration_url: string; // external redirect URL
}


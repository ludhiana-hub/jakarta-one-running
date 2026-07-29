import { TranslatedString } from '../translated';
import { RegistrationPhase } from '../registration-phase';

export interface EditionDetailBlockData {
  edition: {
    id: string;
    slug: string;
    name: TranslatedString;
    race_date: string; // ISO date
    venue?: TranslatedString;
    theme_accent: string; // edition accent
    registration_phases: RegistrationPhase[];
  };
  medal_image?: string;
  jersey_image?: string;
}


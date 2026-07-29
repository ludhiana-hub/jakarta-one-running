import { TranslatedString } from './translated';

import { RegistrationPhase } from './registration-phase';

export interface Edition {
  id: string; // stable key, e.g. "east"
  slug: string; // URL slug, e.g. "east"
  name: TranslatedString;
  race_date: string; // ISO date
  venue?: TranslatedString;
  theme: {
    /**
     * Edition accent hex color (DESIGN.md §2).
     * Used for glow/border/badge styling only.
     */
    accent: string;
  };
  registration_phases: RegistrationPhase[];
}


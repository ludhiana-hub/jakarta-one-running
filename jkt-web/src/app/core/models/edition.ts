import { TranslatedString } from './translated';

import { RegistrationPhase } from './registration-phase';

export interface Edition {
  id: string; // stable key, e.g. "east"
  slug: string; // URL slug, e.g. "east"
  name: TranslatedString;
  race_date: string; // ISO date
  race_date_end?: string | null; // ISO date, present only for multi-day editions
  venue?: TranslatedString;
  venue_address?: string | null;
  rpc_address?: string | null;
  description?: string | null;
  theme: {
    /**
     * Edition accent hex color (DESIGN.md §2).
     * Used for glow/border/badge styling only.
     */
    accent: string;
  };
  registration_phases: RegistrationPhase[];

  // Detail-only / schedule-card fields (GET /api/v1/editions includes them
  // now by passing withDetail=true in the backend).
  rpc_venue?: string | null;
  village_open?: string | null;
  village_close?: string | null;
  race_start?: string | null;
  race_finish?: string | null;
  cot_minutes?: number | null;
  distance_km?: string | null;
  quota?: number | null;
  route_description?: TranslatedString | null;
  gpx_path?: string | null;
}


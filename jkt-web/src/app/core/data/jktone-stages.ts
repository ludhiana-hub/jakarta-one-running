import { Edition } from '../models/edition';

/** Brief-aligned stage catalog for Jakarta One Running Series (General Schedule). */
export interface JktoneStage {
  id: string;
  slug: string;
  name: string;
  title: string;
  monthLabel: string;
  /** ISO race start (local morning, 06.30 WIB). */
  raceDate: string;
  /** Marketing sentence about the stage experience. Never an address. */
  description: string;
  /** Start line venue name. */
  venue: string;
  /** Street address of the start line venue. */
  venueAddress: string;
  /** Race pack collection venue name. */
  rpcVenue: string;
  /** Street address of the race pack collection venue. */
  rpcAddress: string;
  /** Course direction summary. */
  routeSummary: string;
  accent: string;
  registrationUrl: string;
  priceIdr: number;
  runners: number;
  raceVillage: string;
  raceStart: string;
  raceFinish: string;
  cot: string;
  isFinale: boolean;
}

/**
 * Source of truth: client partnership deck, General Schedule slide.
 * East 1 Nov 2026 through Central 6 Jun 2027.
 */
export const JKTONE_STAGES: readonly JktoneStage[] = [
  {
    id: 'east',
    slug: 'east',
    name: 'East',
    title: 'East Jakarta',
    monthLabel: 'Sunday, 1 November 2026',
    raceDate: '2026-11-01T06:30:00+07:00',
    description:
      'The series opens on Jakarta’s fastest flat course, with the Velodrome grandstand waiting at your finish line.',
    venue: 'Jakarta International Velodrome',
    venueAddress: 'Jl. Pemuda, Rawamangun, Jakarta Timur',
    rpcVenue: 'Jakarta International Velodrome',
    rpcAddress: 'Jl. Pemuda, Rawamangun, Jakarta Timur',
    routeSummary:
      'Start at the Velodrome, run east along Jl. Pemuda toward Kayu Putih, U-turn, then return through the Pemuda and Pramuka corridor to finish at the Velodrome.',
    accent: '#8C8C8C',
    registrationUrl: 'https://example.com/jakarta-one/east/register',
    priceIdr: 195000,
    runners: 5000,
    raceVillage: '04.30 to 11.00',
    raceStart: '06.30',
    raceFinish: '07.30',
    cot: '60 minutes',
    isFinale: false,
  },
  {
    id: 'west',
    slug: 'west',
    name: 'West',
    title: 'West Jakarta',
    monthLabel: 'Sunday, 17 January 2027',
    raceDate: '2027-01-17T06:30:00+07:00',
    description:
      'A wide, modern boulevard loop through Kembangan. Smooth asphalt and long straights make this the stage for a personal best.',
    venue: 'Kantor Wali Kota Jakarta Barat',
    venueAddress: 'Jl. Raya Kembangan, Kembangan, Jakarta Barat',
    rpcVenue: 'Puri Indah Mall',
    rpcAddress: 'Jl. Puri Agung, Puri Indah, Jakarta Barat',
    routeSummary:
      'Start from Zero Point at the West Jakarta Mayor’s Office, head west on Jl. Kembangan Barat, loop via Jl. Kembangan Raya and Puri Lingkar Luar, then finish back at the Mayor’s Office.',
    accent: '#CC0000',
    registrationUrl: 'https://example.com/jakarta-one/west/register',
    priceIdr: 195000,
    runners: 5000,
    raceVillage: '04.30 to 11.00',
    raceStart: '06.30',
    raceFinish: '07.30',
    cot: '60 minutes',
    isFinale: false,
  },
  {
    id: 'south',
    slug: 'south',
    name: 'South',
    title: 'South Jakarta',
    monthLabel: 'Sunday, 21 March 2027',
    raceDate: '2027-03-21T06:30:00+07:00',
    description:
      'Tree-lined avenues and quiet Sunday streets. Prapanca is the most scenic 5.00 km of the whole series.',
    venue: 'Kantor Wali Kota Jakarta Selatan',
    venueAddress: 'Jl. Prapanca Raya, Kebayoran Baru, Jakarta Selatan',
    rpcVenue: 'Grand Dhika Hotel',
    rpcAddress: 'Kawasan Kebayoran Baru, Jakarta Selatan',
    routeSummary:
      'Start at the South Jakarta Mayor’s Office on Jl. Prapanca Raya, U-turn at Taman Prapanca, continue through Falatehan, Trunojoyo and Melawai, then finish at the Mayor’s Office.',
    accent: '#C4D600',
    registrationUrl: 'https://example.com/jakarta-one/south/register',
    priceIdr: 195000,
    runners: 5000,
    raceVillage: '04.30 to 11.00',
    raceStart: '06.30',
    raceFinish: '07.30',
    cot: '60 minutes',
    isFinale: false,
  },
  {
    id: 'north',
    slug: 'north',
    name: 'North',
    title: 'North Jakarta',
    monthLabel: 'Sunday, 25 April 2027',
    raceDate: '2027-04-25T06:30:00+07:00',
    description:
      'Sea breeze, waterfront skyline and a flat coastal course. The easiest stage to fall in love with running.',
    venue: 'Ancol',
    venueAddress: 'Jl. Lodan Raya, Ancol, Pademangan, Jakarta Utara',
    rpcVenue: 'Jakarta International Stadium',
    rpcAddress: 'Jl. R.E. Martadinata, Papanggo, Jakarta Utara',
    routeSummary:
      'Start at Ancol, head east on Jl. Lodan Raya toward Jl. R.E. Martadinata, loop through Ancol Selatan, Griya Utama and Benyamin Sueb, then finish at Ancol.',
    accent: '#4DD0E1',
    registrationUrl: 'https://example.com/jakarta-one/north/register',
    priceIdr: 195000,
    runners: 5000,
    raceVillage: '04.30 to 11.00',
    raceStart: '06.30',
    raceFinish: '07.30',
    cot: '60 minutes',
    isFinale: false,
  },
  {
    id: 'central',
    slug: 'central',
    name: 'Central',
    title: 'Central Jakarta',
    monthLabel: 'Sunday, 6 June 2027',
    raceDate: '2027-06-06T06:30:00+07:00',
    description:
      'The grand finale in the heart of the capital, finishing where 500 years of Jakarta history still stands.',
    venue: 'Lapangan Banteng',
    venueAddress: 'Jl. Lapangan Banteng Utara, Sawah Besar, Jakarta Pusat',
    rpcVenue: 'Hotel Borobudur Jakarta',
    rpcAddress: 'Jl. Lapangan Banteng Selatan, Sawah Besar, Jakarta Pusat',
    routeSummary:
      'Start at Lapangan Banteng toward Jl. Gambir Raya and Jl. Ir. H. Juanda, U-turn at Harmoni, return past Pasar Baru and the Central Post Office, then finish at Lapangan Banteng.',
    accent: '#0072B5',
    registrationUrl: 'https://example.com/jakarta-one/central/register',
    priceIdr: 195000,
    runners: 5000,
    raceVillage: '04.30 to 11.00',
    raceStart: '06.30',
    raceFinish: '07.30',
    cot: '60 minutes',
    isFinale: true,
  },
] as const;

/** 5-year legacy roadmap from the brief. */
export const JKTONE_MILESTONES = [
  {
    id: 'ms-2026',
    year: '2026',
    title: 'Let’s Move Jakarta',
    description: 'Kick-start the movement with awareness, accessibility and first-time runners.',
  },
  {
    id: 'ms-2027',
    year: '2027',
    title: 'Fit Up Jakarta',
    description: 'Upgrade the lifestyle through consistency, health and living fit.',
  },
  {
    id: 'ms-2028',
    year: '2028',
    title: 'Sync Jakarta',
    description: 'Community and rhythm, bringing people, city and culture into one beat.',
  },
  {
    id: 'ms-2029',
    year: '2029',
    title: 'Power Jakarta',
    description: 'Performance and confidence, built on strength, resilience and self-belief.',
  },
  {
    id: 'ms-2030',
    year: '2030',
    title: 'Beyond Jakarta',
    description: 'Impact and sustainability, running for Jakarta’s future generations.',
  },
] as const;

/** Calendar date as UTC midnight so edition-cards (UTC formatter) keep the brief day. */
function raceDateUtc(isoLocal: string): string {
  return `${isoLocal.slice(0, 10)}T00:00:00.000Z`;
}

export function stagesToEditions(stages: readonly JktoneStage[] = JKTONE_STAGES): Edition[] {
  return stages.map((s) => {
    const race = raceDateUtc(s.raceDate);
    const raceMs = Date.parse(race);
    return {
      id: s.id,
      slug: s.slug,
      name: { id: s.name },
      race_date: race,
      venue: { id: s.venue },
      theme: { accent: s.accent },
      registration_phases: [
        {
          id: `phase-${s.slug}`,
          name: { id: 'Pendaftaran' },
          opens_at: new Date(raceMs - 60 * 24 * 60 * 60 * 1000).toISOString(),
          closes_at: new Date(raceMs - 5 * 24 * 60 * 60 * 1000).toISOString(),
          price: s.priceIdr,
          registration_url: s.registrationUrl,
        },
      ],
    };
  });
}

export function formatPriceIdr(amount: number): string {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

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
 * Source of truth: client partnership deck, General Schedule.
 * Chronological: South → North → West → East → Central.
 */
export const JKTONE_STAGES: readonly JktoneStage[] = [
  {
    id: 'south',
    slug: 'south',
    name: 'South',
    title: 'South Jakarta',
    monthLabel: 'Sunday, 1 November 2026',
    raceDate: '2026-11-01T06:30:00+07:00',
    description:
      'Begin your 5.00 km journey at SCBD’s city pulse, then run your way through lively streets with a finish that keeps you ready for the next stage.',
    venue: 'SCBD',
    venueAddress: 'SCBD, Jakarta Selatan',
    rpcVenue: 'Hotel Borobudur',
    rpcAddress: 'Jl. Lapangan Banteng Selatan, Sawah Besar, Jakarta Pusat',
    routeSummary:
      'Start at SCBD, follow a smooth city loop across South Jakarta, and return to SCBD for your finish.',
    accent: '#C4D600',
    registrationUrl: 'https://jkt499k.bigtix.io/en',
    priceIdr: 195000,
    runners: 10000,
    raceVillage: '04.30–11.00',
    raceStart: '06.30',
    raceFinish: '08.00',
    cot: '90 min',
    isFinale: false,
  },
  {
    id: 'north',
    slug: 'north',
    name: 'North',
    title: 'North Jakarta',
    monthLabel: 'Sunday, 17 January 2027',
    raceDate: '2027-01-17T06:30:00+07:00',
    description:
      'Sea breeze, waterfront skyline and a flat coastal course. The easiest stage to fall in love with running.',
    venue: 'Ancol',
    venueAddress: 'Jl. Lodan Raya, Ancol, Pademangan, Jakarta Utara',
    rpcVenue: 'Hotel Borobudur',
    rpcAddress: 'Jl. Lapangan Banteng Selatan, Sawah Besar, Jakarta Pusat',
    routeSummary:
      'Start at Ancol, head east on Jl. Lodan Raya toward Jl. R.E. Martadinata, loop through Ancol Selatan, Griya Utama and Benyamin Sueb, then finish at Ancol.',
    accent: '#4DD0E1',
    registrationUrl: 'https://jkt499k.bigtix.io/en',
    priceIdr: 195000,
    runners: 10000,
    raceVillage: '04.30–11.00',
    raceStart: '06.30',
    raceFinish: '08.00',
    cot: '90 min',
    isFinale: false,
  },
  {
    id: 'west',
    slug: 'west',
    name: 'West',
    title: 'West Jakarta',
    monthLabel: 'Sunday, 21 March 2027',
    raceDate: '2027-03-21T06:30:00+07:00',
    description:
      'A bright 5.00 km journey through Puri, built for smooth strides and steady pace, with a strong finish at the Puri start area.',
    venue: 'Puri',
    venueAddress: 'Jl. Puri Agung, Puri Indah, Jakarta Barat',
    rpcVenue: 'Hotel Borobudur',
    rpcAddress: 'Jl. Lapangan Banteng Selatan, Sawah Besar, Jakarta Pusat',
    routeSummary:
      'Start in Puri, follow a 5.00 km loop through West Jakarta corridors, then finish back at the Puri start area.',
    accent: '#CC0000',
    registrationUrl: 'https://jkt499k.bigtix.io/en',
    priceIdr: 195000,
    runners: 10000,
    raceVillage: '04.30–11.00',
    raceStart: '06.30',
    raceFinish: '08.00',
    cot: '90 min',
    isFinale: false,
  },
  {
    id: 'east',
    slug: 'east',
    name: 'East',
    title: 'East Jakarta',
    monthLabel: 'Sunday, 25 April 2027',
    raceDate: '2027-04-25T06:30:00+07:00',
    description:
      'A fast, iconic 5.00 km loop designed to kick your run into high gear, with the Velodrome grandstand waiting at the finish.',
    venue: 'Velodrome',
    venueAddress: 'Jl. Pemuda, Rawamangun, Jakarta Timur',
    rpcVenue: 'Hotel Borobudur',
    rpcAddress: 'Jl. Lapangan Banteng Selatan, Sawah Besar, Jakarta Pusat',
    routeSummary:
      'Start at the Velodrome, run through Jakarta’s eastern corridors, and return for a fast finish at the Velodrome.',
    accent: '#8C8C8C',
    registrationUrl: 'https://jkt499k.bigtix.io/en',
    priceIdr: 195000,
    runners: 10000,
    raceVillage: '04.30–11.00',
    raceStart: '06.30',
    raceFinish: '08.00',
    cot: '90 min',
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
    rpcVenue: 'Hotel Borobudur',
    rpcAddress: 'Jl. Lapangan Banteng Selatan, Sawah Besar, Jakarta Pusat',
    routeSummary:
      'Start at Lapangan Banteng toward Jl. Gambir Raya and Jl. Ir. H. Juanda, U-turn at Harmoni, return past Pasar Baru and the Central Post Office, then finish at Lapangan Banteng.',
    accent: '#0072B5',
    registrationUrl: 'https://jkt499k.bigtix.io/en',
    priceIdr: 195000,
    runners: 10000,
    raceVillage: '04.30–11.00',
    raceStart: '06.30',
    raceFinish: '08.00',
    cot: '90 min',
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
      venue_address: s.venueAddress,
      description: s.description,
      theme: { accent: s.accent },
      rpc_venue: s.rpcVenue,
      rpc_address: s.rpcAddress,
      race_start: s.raceStart.includes('.')
        ? `${s.raceStart.replace('.', ':')}:00`
        : s.raceStart,
      cot_minutes: Number.parseInt(s.cot, 10) || 90,
      distance_km: '5.00',
      quota: s.runners,
      route_description: { id: s.routeSummary },
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

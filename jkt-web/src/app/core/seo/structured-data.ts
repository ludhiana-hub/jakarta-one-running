import { JKTONE_STAGES, type JktoneStage } from '../data/jktone-stages';
import {
  absoluteUrl,
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  SITE_ALTERNATE_NAME,
  SITE_DESCRIPTION,
  SITE_IMAGE_PATH,
  SITE_LOGO_PATH,
  SITE_NAME,
  SITE_URL,
} from './site-info';

export type JsonLdNode = Record<string, unknown>;

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SERIES_ID = `${SITE_URL}/#series`;

const ORGANIZATION_REF = { '@id': ORGANIZATION_ID };

export function organizationNode(): JsonLdNode {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAME,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: absoluteUrl(SITE_LOGO_PATH) },
    email: CONTACT_EMAIL,
    sameAs: [INSTAGRAM_URL],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT_EMAIL,
    },
  };
}

export function websiteNode(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAME,
    description: SITE_DESCRIPTION,
    publisher: ORGANIZATION_REF,
  };
}

/** `2027-06-06T06:30:00+07:00` + finish `08.00` → `2027-06-06T08:00:00+07:00`. */
function raceEndDate(stage: JktoneStage): string {
  const [hh, mm = '00'] = stage.raceFinish.split('.');
  const offset = stage.raceDate.slice(-6);
  return `${stage.raceDate.slice(0, 10)}T${hh.padStart(2, '0')}:${mm}:00${offset}`;
}

export function stageEventNode(stage: JktoneStage): JsonLdNode {
  return {
    '@type': 'SportsEvent',
    '@id': `${SITE_URL}/schedule#${stage.slug}`,
    name: `${SITE_NAME} – ${stage.title}`,
    description: `${stage.description} Distance: 5.00 km. Start line: ${stage.venue}. Race pack collection: ${stage.rpcVenue}, ${stage.rpcAddress}. Route: ${stage.routeSummary}`,
    sport: 'Running',
    url: `${SITE_URL}/schedule`,
    image: absoluteUrl(SITE_IMAGE_PATH),
    startDate: stage.raceDate,
    endDate: raceEndDate(stage),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    maximumAttendeeCapacity: stage.runners,
    location: {
      '@type': 'Place',
      name: stage.venue,
      address: {
        '@type': 'PostalAddress',
        streetAddress: stage.venueAddress,
        addressRegion: 'DKI Jakarta',
        addressCountry: 'ID',
      },
    },
    organizer: ORGANIZATION_REF,
    offers: {
      '@type': 'Offer',
      url: stage.registrationUrl,
      price: stage.priceIdr,
      priceCurrency: 'IDR',
    },
    superEvent: { '@id': SERIES_ID },
  };
}

export function eventSeriesNode(stages: readonly JktoneStage[] = JKTONE_STAGES): JsonLdNode {
  const first = stages[0];
  const last = stages[stages.length - 1];
  return {
    '@type': 'EventSeries',
    '@id': SERIES_ID,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: absoluteUrl(SITE_IMAGE_PATH),
    startDate: first.raceDate,
    endDate: raceEndDate(last),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    organizer: ORGANIZATION_REF,
    subEvent: stages.map(stageEventNode),
  };
}

export function scheduleListNode(stages: readonly JktoneStage[] = JKTONE_STAGES): JsonLdNode {
  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/schedule#stages`,
    name: `${SITE_NAME} race calendar`,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: stages.length,
    itemListElement: stages.map((stage, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: stageEventNode(stage),
    })),
  };
}

export function partnersListNode(names: readonly string[]): JsonLdNode {
  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/partners#partners`,
    name: `${SITE_NAME} partners`,
    numberOfItems: names.length,
    itemListElement: names.map((name, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: { '@type': 'Organization', name },
    })),
  };
}

export function breadcrumbNode(crumbs: readonly { name: string; path: string }[]): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export interface WebPageInput {
  type?: 'WebPage' | 'CollectionPage' | 'ContactPage' | 'FAQPage';
  path: string;
  name: string;
  description: string;
  mainEntity?: unknown;
}

export function webPageNode(input: WebPageInput): JsonLdNode {
  const url = absoluteUrl(input.path);
  return {
    '@type': input.type ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: input.name,
    description: input.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': SERIES_ID },
    ...(input.mainEntity ? { mainEntity: input.mainEntity } : {}),
  };
}

export interface FaqInput {
  question: string;
  answer: string;
}

/** Question nodes for a FAQPage's `mainEntity`; empty when the page has no real Q&A. */
export function faqQuestions(items: readonly FaqInput[]): JsonLdNode[] {
  return items
    .filter((i) => i.question.trim() && i.answer.trim())
    .map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    }));
}

export function homeGraph(): JsonLdNode[] {
  return [
    webPageNode({
      path: '/',
      name: `${SITE_NAME} 2026 | One City, One Celebration`,
      description: SITE_DESCRIPTION,
    }),
    eventSeriesNode(),
    breadcrumbNode([{ name: 'Home', path: '/' }]),
  ];
}

export function scheduleGraph(): JsonLdNode[] {
  return [
    webPageNode({
      type: 'CollectionPage',
      path: '/schedule',
      name: `Schedule | ${SITE_NAME} 2026`,
      description:
        'Race calendar for five Jakarta One stages, from South on 1 November 2026 to the Central championship on 6 June 2027.',
    }),
    scheduleListNode(),
    breadcrumbNode([
      { name: 'Home', path: '/' },
      { name: 'Schedule', path: '/schedule' },
    ]),
  ];
}

export function partnersGraph(partnerNames: readonly string[]): JsonLdNode[] {
  return [
    webPageNode({
      type: 'CollectionPage',
      path: '/partners',
      name: `Partners | ${SITE_NAME} 2026`,
      description: 'Government and corporate partners powering Jakarta One Running Series 2026.',
    }),
    partnersListNode(partnerNames),
    breadcrumbNode([
      { name: 'Home', path: '/' },
      { name: 'Partners', path: '/partners' },
    ]),
  ];
}

export function contactGraph(): JsonLdNode[] {
  return [
    webPageNode({
      type: 'ContactPage',
      path: '/contact',
      name: `${SITE_NAME} | Contact`,
      description: 'Reach the Jakarta One Running Series team by email or Instagram.',
      mainEntity: ORGANIZATION_REF,
    }),
    breadcrumbNode([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]),
  ];
}

export interface CmsPageGraphInput {
  path: string;
  title: string;
  description: string;
  faqItems: readonly FaqInput[];
}

export function cmsPageGraph(input: CmsPageGraphInput): JsonLdNode[] {
  const questions = faqQuestions(input.faqItems);
  return [
    webPageNode({
      type: questions.length ? 'FAQPage' : 'WebPage',
      path: input.path,
      name: input.title,
      description: input.description,
      mainEntity: questions.length ? questions : undefined,
    }),
    breadcrumbNode([
      { name: 'Home', path: '/' },
      { name: input.title, path: input.path },
    ]),
  ];
}

export function siteGraph(): JsonLdNode[] {
  return [organizationNode(), websiteNode()];
}

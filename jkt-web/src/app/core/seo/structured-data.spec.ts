import { describe, expect, it } from 'vitest';

import { JKTONE_STAGES } from '../data/jktone-stages';
import {
  cmsPageGraph,
  contactGraph,
  eventSeriesNode,
  homeGraph,
  partnersGraph,
  scheduleGraph,
  siteGraph,
  stageEventNode,
} from './structured-data';

type Node = Record<string, any>;

describe('structured data', () => {
  it('builds every stage event from the stage catalog', () => {
    JKTONE_STAGES.forEach((stage) => {
      const node = stageEventNode(stage) as Node;
      expect(node['@type']).toBe('SportsEvent');
      expect(node['startDate']).toBe(stage.raceDate);
      expect(node['startDate']).toMatch(/T06:30:00\+07:00$/);
      expect(node['endDate']).toBe(`${stage.raceDate.slice(0, 10)}T08:00:00+07:00`);
      expect(node['location'].name).toBe(stage.venue);
      expect(node['location'].address.streetAddress).toBe(stage.venueAddress);
      expect(node['offers']).toMatchObject({
        price: 195000,
        priceCurrency: 'IDR',
        url: stage.registrationUrl,
      });
      expect(node['maximumAttendeeCapacity']).toBe(10000);
    });
  });

  it('describes the series from first to last stage', () => {
    const series = eventSeriesNode() as Node;
    expect(series['@type']).toBe('EventSeries');
    expect(series['startDate']).toBe('2026-11-01T06:30:00+07:00');
    expect(series['endDate']).toBe('2027-06-06T08:00:00+07:00');
    expect(series['subEvent']).toHaveLength(5);
  });

  it('exposes Organization and WebSite sitewide', () => {
    const types = siteGraph().map((n) => n['@type']);
    expect(types).toEqual(['Organization', 'WebSite']);
  });

  it('gives each static page a graph that serializes to valid JSON', () => {
    const graphs = [homeGraph(), scheduleGraph(), partnersGraph(['A', 'B']), contactGraph()];
    graphs.forEach((graph) => {
      expect(graph.length).toBeGreaterThan(0);
      expect(() => JSON.parse(JSON.stringify(graph))).not.toThrow();
    });
  });

  it('lists schedule stages in chronological order', () => {
    const list = scheduleGraph().find((n) => n['@type'] === 'ItemList') as Node;
    const dates = list['itemListElement'].map((e: Node) => e['item'].startDate);
    expect([...dates].sort()).toEqual(dates);
    expect(list['numberOfItems']).toBe(5);
  });

  it('only emits FAQPage when the CMS page has real questions', () => {
    const plain = cmsPageGraph({ path: '/x', title: 'X', description: '', faqItems: [] });
    expect(plain[0]['@type']).toBe('WebPage');

    const faq = cmsPageGraph({
      path: '/faq',
      title: 'FAQ',
      description: '',
      faqItems: [
        { question: 'Q1?', answer: 'A1' },
        { question: '  ', answer: 'ignored' },
      ],
    });
    expect(faq[0]['@type']).toBe('FAQPage');
    expect(faq[0]['mainEntity']).toHaveLength(1);
  });
});

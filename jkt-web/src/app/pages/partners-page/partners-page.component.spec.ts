import '@angular/compiler';

import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { Injector, runInInjectionContext } from '@angular/core';
import { describe, expect, it, vi } from 'vitest';

import { ExternalLinkService } from '../../core/external-link.service';
import { JsonLdService } from '../../core/json-ld.service';
import { SeoService } from '../../core/seo.service';
import { PartnerTier, PartnersPageComponent } from './partners-page.component';

describe('PartnersPageComponent', () => {
  const tiers = (): PartnerTier[] => {
    const injector = Injector.create({
      providers: [
        { provide: SeoService, useValue: { apply: vi.fn() } },
        { provide: JsonLdService, useValue: { setPage: vi.fn() } },
        { provide: ExternalLinkService, useValue: { open: vi.fn() } },
      ],
    });
    const component = runInInjectionContext(injector, () => new PartnersPageComponent());
    return (component as unknown as { tiers: PartnerTier[] }).tiers;
  };

  it('keeps stakeholders on top, followed by venue, main, supporting and media', () => {
    expect(tiers().map((tier) => tier.id)).toEqual(['stakeholder', 'venue', 'main', 'supporting', 'media']);
  });

  it('lists the main tier as Mazda, IHC, ConnectX, Kliktron, Jabra, BookMyShow', () => {
    const main = tiers().find((tier) => tier.id === 'main')!.groups.flatMap((group) => group.partners);

    expect(main.map((partner) => partner.id)).toEqual(['mazda', 'ihc', 'connectx', 'kliktron', 'jabra', 'bookmyshow']);
  });

  it('groups all stakeholders and both media logos into one card each', () => {
    const all = tiers();
    const stakeholder = all.find((tier) => tier.id === 'stakeholder')!.groups;
    const media = all.find((tier) => tier.id === 'media')!.groups.find((group) => group.id === 'mp-media')!;

    expect(stakeholder).toHaveLength(1);
    expect(stakeholder[0].partners).toHaveLength(6);
    expect(stakeholder[0].caption).toBe('Stakeholder Partner');
    expect(media.partners.map((partner) => partner.id)).toEqual(['metrotv', 'metronews']);
  });

  it('uses unique ids and only references logo files that exist', () => {
    const partners = tiers().flatMap((tier) => tier.groups.flatMap((group) => group.partners));
    const ids = partners.map((partner) => partner.id);

    expect(new Set(ids).size).toBe(ids.length);
    for (const partner of partners.filter((p) => p.imageUrl)) {
      const file = partner.imageUrl!.split('?')[0].replace(/^\//, '');
      expect(existsSync(resolve(process.cwd(), 'public', file)), file).toBe(true);
    }
  });
});

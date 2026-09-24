import '@angular/compiler';

import { Injector, runInInjectionContext } from '@angular/core';
import { describe, expect, it, vi } from 'vitest';

import { ExternalLinkService } from '../../core/external-link.service';
import { SeoService } from '../../core/seo.service';
import { PartnerLogo, PartnersPageComponent } from './partners-page.component';

describe('PartnersPageComponent', () => {
  it('lists ConnectX immediately after Wikinara', () => {
    const injector = Injector.create({
      providers: [
        { provide: SeoService, useValue: { apply: vi.fn() } },
        { provide: ExternalLinkService, useValue: { open: vi.fn() } },
      ],
    });
    const component = runInInjectionContext(injector, () => new PartnersPageComponent());
    const partners = (component as unknown as { partners: PartnerLogo[] }).partners;
    const wikinaraIndex = partners.findIndex((partner) => partner.id === 'cp-wikinara');

    expect(wikinaraIndex).toBeGreaterThanOrEqual(0);
    expect(partners[wikinaraIndex + 1]).toEqual({
      id: 'cp-connectx',
      name: 'ConnectX',
      imageUrl: '/assets/sponsors/connectx.svg?v=e52c4de',
      url: '#',
    });
  });
});

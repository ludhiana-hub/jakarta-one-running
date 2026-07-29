import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../core/seo.service';
import { ExternalLinkDialogComponent } from '../../layout/external-link-dialog/external-link-dialog.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

export interface PartnerLogo {
  id: string;
  name: string;
  imageUrl: string;
  url: string;
  role?: string;
  roleColor?: string;
  tagline?: string;
}

export type PartnerTabId = 'platinum' | 'gold' | 'official' | 'community';

interface PartnerTab {
  id: PartnerTabId;
  label: string;
}

/** Lightweight wordmark logo so we can demo many sponsors without real assets. */
function dummyLogo(name: string, accent = '#F5F5F2'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="96" viewBox="0 0 280 96" fill="none">
  <rect x="12" y="28" width="40" height="40" rx="10" stroke="${accent}" stroke-width="2" opacity="0.85"/>
  <text x="68" y="54" font-family="system-ui,sans-serif" font-size="22" font-weight="650" fill="${accent}" letter-spacing="1.5">${name}</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

@Component({
  selector: 'app-partners-page',
  standalone: true,
  imports: [RouterLink, ExternalLinkDialogComponent, RevealDirective],
  templateUrl: './partners-page.component.html',
  styleUrl: './partners-page.component.scss',
})
export class PartnersPageComponent {
  private readonly seo = inject(SeoService);
  private readonly track = viewChild<ElementRef<HTMLElement>>('logoTrack');

  protected dialogVisible = false;
  protected pendingUrl: string | null = null;
  protected readonly activeTab = signal<PartnerTabId>('platinum');

  protected readonly tabs: PartnerTab[] = [
    { id: 'platinum', label: 'Platinum' },
    { id: 'gold', label: 'Gold' },
    { id: 'official', label: 'Official' },
    { id: 'community', label: 'Community' },
  ];

  protected readonly titleSponsor: PartnerLogo = {
    id: 'title',
    name: 'OmniAthletic Global',
    imageUrl: '/assets/sponsors/title-omni.svg',
    url: 'https://example.com/partners/omniathletic',
    tagline: 'The Official Performance & Technology Partner of Jakarta One 2026',
  };

  protected readonly platinum: PartnerLogo[] = [
    {
      id: 'pl-aqua',
      name: 'AquaForm',
      imageUrl: '/assets/sponsors/platinum-aqua.svg',
      url: 'https://example.com/partners/aquaform',
      role: 'Hydration Partner',
      roleColor: '#4DD0E1',
    },
    {
      id: 'pl-bank',
      name: 'Nusantara Bank',
      imageUrl: '/assets/sponsors/platinum-bank.svg',
      url: 'https://example.com/partners/nusantara-bank',
      role: 'Financial Service',
      roleColor: '#C4D600',
    },
    {
      id: 'pl-chrono',
      name: 'ChronoTech',
      imageUrl: '/assets/sponsors/platinum-chrono.svg',
      url: 'https://example.com/partners/chronotech',
      role: 'Tech & Timing',
      roleColor: '#0072B5',
    },
    {
      id: 'pl-pulse',
      name: 'Pulse Gear',
      imageUrl: dummyLogo('PULSE GEAR', '#ffb3b2'),
      url: 'https://example.com/partners/pulse-gear',
      role: 'Apparel Partner',
      roleColor: '#ffb3b2',
    },
    {
      id: 'pl-beacon',
      name: 'Beacon Optics',
      imageUrl: dummyLogo('BEACON', '#4DD0E1'),
      url: 'https://example.com/partners/beacon',
      role: 'Eyewear Partner',
      roleColor: '#4DD0E1',
    },
  ];

  protected readonly gold: PartnerLogo[] = [
    { id: 'gd-aria', name: 'Grand Aria', imageUrl: '/assets/sponsors/gold-aria.svg', url: '#' },
    { id: 'gd-sky', name: 'SkyLink Air', imageUrl: '/assets/sponsors/gold-skylink.svg', url: '#' },
    { id: 'gd-med', name: 'MedCare+', imageUrl: '/assets/sponsors/gold-medcare.svg', url: '#' },
    { id: 'gd-volt', name: 'Volt Ride', imageUrl: '/assets/sponsors/gold-volt.svg', url: '#' },
    { id: 'gd-metro', name: 'Metro Fuel', imageUrl: dummyLogo('METRO FUEL', '#C4D600'), url: '#' },
    { id: 'gd-urban', name: 'UrbanStride', imageUrl: dummyLogo('URBANSTRIDE', '#F5F5F2'), url: '#' },
    { id: 'gd-coral', name: 'Coral Hydrate', imageUrl: dummyLogo('CORAL', '#4DD0E1'), url: '#' },
    { id: 'gd-apex', name: 'Apex Insoles', imageUrl: dummyLogo('APEX', '#ffb3b2'), url: '#' },
    { id: 'gd-harbor', name: 'Harbor Tel', imageUrl: dummyLogo('HARBOR', '#0072B5'), url: '#' },
    { id: 'gd-leaf', name: 'LeafFit', imageUrl: dummyLogo('LEAFFIT', '#C4D600'), url: '#' },
    { id: 'gd-quanta', name: 'Quanta Wear', imageUrl: dummyLogo('QUANTA', '#F5F5F2'), url: '#' },
    { id: 'gd-zenith', name: 'Zenith Foam', imageUrl: dummyLogo('ZENITH', '#ffb3b2'), url: '#' },
  ];

  protected readonly official: PartnerLogo[] = [
    { id: 'of-night', name: 'NightOwl Media', imageUrl: dummyLogo('NIGHTOWL', '#F5F5F2'), url: '#' },
    { id: 'of-runway', name: 'Runway Labs', imageUrl: dummyLogo('RUNWAY', '#4DD0E1'), url: '#' },
    { id: 'of-monas', name: 'Monas Photo', imageUrl: dummyLogo('MONAS PIC', '#ffb3b2'), url: '#' },
    { id: 'of-swift', name: 'Swift Print', imageUrl: dummyLogo('SWIFT PRINT', '#C4D600'), url: '#' },
    { id: 'of-bay', name: 'Bay Security', imageUrl: dummyLogo('BAY SEC', '#0072B5'), url: '#' },
    { id: 'of-orbit', name: 'Orbit Maps', imageUrl: dummyLogo('ORBIT MAPS', '#4DD0E1'), url: '#' },
    { id: 'of-kite', name: 'Kite Events', imageUrl: dummyLogo('KITE', '#F5F5F2'), url: '#' },
    { id: 'of-ridge', name: 'Ridge Medical', imageUrl: dummyLogo('RIDGE MED', '#ffb3b2'), url: '#' },
    { id: 'of-lotus', name: 'Lotus Catering', imageUrl: dummyLogo('LOTUS', '#C4D600'), url: '#' },
    { id: 'of-nova', name: 'Nova Timing', imageUrl: dummyLogo('NOVA TIME', '#0072B5'), url: '#' },
  ];

  protected readonly community: PartnerLogo[] = [
    'IndoRunners',
    'Jakarta Post',
    'Detik Health',
    'Swift Foot Club',
    'Tempo Interactive',
    'Java Endurance',
    'Monas Runners',
    'Kompas Sport',
    'City Trail ID',
    'Pakai Sepatu',
    'RunnersID',
    'SportOne TV',
    'Jakarta Marathon Club',
    'Weekend Warriors',
    'North Coast Crew',
  ].map((name, i) => ({
    id: `cm-${i}`,
    name,
    imageUrl: dummyLogo(name.toUpperCase().slice(0, 14), i % 2 ? '#ffb3b2' : '#F5F5F2'),
    url: '#',
  }));

  constructor() {
    this.seo.apply({
      meta_title: { id: 'Partners | Jakarta One Running 2026' },
      meta_description: {
        id: 'Title, platinum, gold, and community partners powering Jakarta One Running Series 2026.',
      },
      og_image: '/assets/prototype/hero-medal.png',
      noindex: false,
      canonical_url: '/partners',
    });
  }

  logosForTab(tab: PartnerTabId): PartnerLogo[] {
    switch (tab) {
      case 'platinum':
        return this.platinum;
      case 'gold':
        return this.gold;
      case 'official':
        return this.official;
      case 'community':
        return this.community;
    }
  }

  selectTab(tab: PartnerTabId): void {
    this.activeTab.set(tab);
    // Reset scroll when switching classification
    queueMicrotask(() => {
      const el = this.track()?.nativeElement;
      if (el) el.scrollTo({ left: 0, behavior: 'smooth' });
    });
  }

  scrollTrack(direction: -1 | 1): void {
    const el = this.track()?.nativeElement;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.75, 420);
    el.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }

  openExternal(url: string): void {
    if (!url || url === '#') return;
    this.pendingUrl = url;
    this.dialogVisible = true;
  }
}

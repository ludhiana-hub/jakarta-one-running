import { Component, inject } from '@angular/core';
import { take } from 'rxjs';

import { HeroBlockComponent } from '../../blocks/hero/hero-block.component';
import { StatsCounterBlockComponent } from '../../blocks/stats-counter/stats-counter-block.component';
import { RichTextMediaBlockComponent } from '../../blocks/rich-text-media/rich-text-media-block.component';
import { EditionCardsBlockComponent } from '../../blocks/edition-cards/edition-cards-block.component';
import { MilestoneBlockComponent } from '../../blocks/milestone/milestone-block.component';
import { CtaBannerBlockComponent } from '../../blocks/cta-banner/cta-banner-block.component';
import { JKTONE_MILESTONES, stagesToEditions } from '../../core/data/jktone-stages';
import { HeroBlockData } from '../../core/models/blocks/hero.block';
import { StatsCounterBlockData } from '../../core/models/blocks/stats-counter.block';
import { RichTextMediaBlockData } from '../../core/models/blocks/rich-text-media.block';
import { EditionCardsBlockData } from '../../core/models/blocks/edition-cards.block';
import { MilestoneBlockData } from '../../core/models/blocks/milestone.block';
import { CtaBannerBlockData } from '../../core/models/blocks/cta-banner.block';
import { SeoService } from '../../core/seo.service';
import { JsonLdService } from '../../core/json-ld.service';
import { TenantService } from '../../core/tenant.service';
import { ThemeService } from '../../core/theme.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroBlockComponent,
    StatsCounterBlockComponent,
    RichTextMediaBlockComponent,
    EditionCardsBlockComponent,
    MilestoneBlockComponent,
    CtaBannerBlockComponent,
    RevealDirective,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly seo = inject(SeoService);
  private readonly jsonLd = inject(JsonLdService);
  private readonly tenant = inject(TenantService);
  private readonly theme = inject(ThemeService);

  /** Home section data. Edit copy here, or markup in the HTML template. */
  protected readonly hero: HeroBlockData = {
    badge: { id: 'Jakarta 500th Anniversary' },
    title: { id: 'ONE CITY, ONE CELEBRATION' },
    tagline: {
      id: '<strong>500 years of Jakarta, 5 regions, 5.00 km</strong> each. One running series across the capital, with five medals to collect and one celebration to finish.',
    },
    bg_image: '/assets/prototype/hero-home-bg.jpg',
    cta_label: { id: 'Join the Series' },
    cta_url: '/schedule',
  };

  protected readonly stats: StatsCounterBlockData = {
    items: [
      { id: 'stat_routes', label: { id: 'The Challenge' }, value: '5 Routes' },
      { id: 'stat_runners', label: { id: 'Community' }, value: '25.000 Runners' },
      { id: 'stat_medals', label: { id: 'Achievement' }, value: '5 Medals' },
      { id: 'stat_price', label: { id: 'Registration' }, value: 'Rp 195.000' },
    ],
  };

  protected readonly jaro: RichTextMediaBlockData = {
    title: { id: 'Bang Sob' },
    body: {
      id: 'Bang Sob is the official mascot of Jakarta One Running Series, a crocodile rooted in the city’s rivers and its resilience. Loyal, resilient, strong, patient and adaptive. Meet Bang Sob at every starting line as you run through all five regions.',
    },
    media_image: '/assets/prototype/bangsob.png',
    media_alt: { id: 'Bang Sob' },
  };

  /** Brief-aligned catalog, always filled even when CMS editions are empty. */
  protected readonly stages: EditionCardsBlockData = {
    heading: { id: 'THE 5 STAGES' },
    items: stagesToEditions(),
  };

  protected readonly milestones: MilestoneBlockData = {
    items: JKTONE_MILESTONES.map((m) => ({
      id: m.id,
      year: m.year,
      title: { id: m.title },
      description: { id: m.description },
    })),
  };

  protected readonly rpcExpo = [
    { id: 'hydration', label: 'Hydration' },
    { id: 'gear', label: 'Gear' },
    { id: 'photo', label: 'Photo' },
    { id: 'apparel', label: 'Apparel' },
    { id: 'wall', label: 'Wall of Spirit' },
  ] as const;

  protected readonly cta: CtaBannerBlockData = {
    title: { id: 'Ready for Jakarta One?' },
    subtitle: {
      id: 'South Jakarta opens the series on 1 November 2026. See the full path to the Central championship on 6 June 2027.',
    },
    cta_label: { id: 'View Schedule' },
    cta_url: '/schedule',
  };

  constructor() {
    this.seo.apply({
      meta_title: { id: 'Jakarta One Running Series 2026 | One City, One Celebration' },
      meta_description: {
        id: '500 years of Jakarta, 5 regions, 5.00 km each. One running series from South in November 2026 to the Central championship in June 2027.',
      },
      og_image: '/assets/prototype/hero-home-bg.jpg',
      noindex: false,
      canonical_url: '/',
      keywords:
        'lari jakarta, running series jakarta, event lari 2026, lomba lari 5k, marathon jakarta, tiket lari jakarta, jakarta one running series, race jakarta 2026, lari akhir tahun jakarta',
    });

    this.jsonLd.setSportsEvent({
      name: 'Jakarta One Running Series',
      startDate: '2026-11-01T00:00:00.000Z',
      locationName: 'Jakarta',
    });

    this.tenant.edition$().pipe(take(1)).subscribe((edition) => this.theme.applyEdition(edition));
  }
}

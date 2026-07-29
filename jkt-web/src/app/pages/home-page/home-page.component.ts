import { Component, inject } from '@angular/core';
import { take } from 'rxjs';

import { HeroBlockComponent } from '../../blocks/hero/hero-block.component';
import { StatsCounterBlockComponent } from '../../blocks/stats-counter/stats-counter-block.component';
import { RichTextMediaBlockComponent } from '../../blocks/rich-text-media/rich-text-media-block.component';
import { EditionCardsBlockComponent } from '../../blocks/edition-cards/edition-cards-block.component';
import { CtaBannerBlockComponent } from '../../blocks/cta-banner/cta-banner-block.component';
import { HeroBlockData } from '../../core/models/blocks/hero.block';
import { StatsCounterBlockData } from '../../core/models/blocks/stats-counter.block';
import { RichTextMediaBlockData } from '../../core/models/blocks/rich-text-media.block';
import { EditionCardsBlockData } from '../../core/models/blocks/edition-cards.block';
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

  /** Home section data — edit here or in the HTML bindings below. */
  protected readonly hero: HeroBlockData = {
    badge: { id: 'Jakarta 500th Anniversary' },
    title: { id: 'ONE CITY, ONE CELEBRATION' },
    tagline: {
      id: '500 Years, 5 Regions, 5.00 Kilometers Each. Run through history and culture in the ultimate urban series.',
    },
    bg_image: '/assets/prototype/gambar.jpg',
    cta_label: { id: 'Join the Series' },
    cta_url: '/schedule',
  };

  protected readonly stats: StatsCounterBlockData = {
    items: [
      { id: 'stat_routes', label: { id: 'The Challenge' }, value: '5 Routes' },
      { id: 'stat_runners', label: { id: 'Community' }, value: '25k+ Runners' },
      { id: 'stat_medals', label: { id: 'Achievement' }, value: '5 Medals' },
      { id: 'stat_price', label: { id: 'Registration' }, value: 'Rp 195k' },
    ],
  };

  protected readonly jaro: RichTextMediaBlockData = {
    title: { id: 'JARO THE CROC' },
    body: {
      id: 'Jaro is the official mascot of the Jakarta One Running Series. Representing resilience, agility, and the spirit of the city\'s rivers, Jaro will be with you at every starting line, cheering you on through the 5 regions of Jakarta.',
    },
    media_image: '/assets/prototype/jaro-mascot.png',
    media_alt: { id: 'Jaro the Croc mascot' },
  };

  protected readonly stages: EditionCardsBlockData = {
    items: [
      {
        id: 'ed_east',
        slug: 'east',
        name: { id: 'East Jakarta' },
        subtitle: { id: 'The Cultural Gateway' },
        cta_url: '/schedule',
        theme_accent: '#8C8C8C',
      },
      {
        id: 'ed_west',
        slug: 'west',
        name: { id: 'West Jakarta' },
        subtitle: { id: 'The Heritage Trail' },
        cta_url: '/schedule',
        theme_accent: '#CC0000',
      },
      {
        id: 'ed_south',
        slug: 'south',
        name: { id: 'South Jakarta' },
        subtitle: { id: 'The Green Corridor' },
        cta_url: '/schedule',
        theme_accent: '#C4D600',
      },
      {
        id: 'ed_north',
        slug: 'north',
        name: { id: 'North Jakarta' },
        subtitle: { id: 'The Coastal Run' },
        cta_url: '/schedule',
        theme_accent: '#4DD0E1',
      },
      {
        id: 'ed_central',
        slug: 'central',
        name: { id: 'Central Jakarta' },
        subtitle: { id: 'The Heart of City' },
        cta_url: '/schedule',
        theme_accent: '#0072B5',
      },
    ],
  };

  protected readonly cta: CtaBannerBlockData = {
    title: { id: 'Ready for Jakarta One 2026?' },
    subtitle: { id: 'Lihat jadwal stage dan daftar sekarang.' },
    cta_label: { id: 'View Schedule' },
    cta_url: '/schedule',
  };

  constructor() {
    this.seo.apply({
      meta_title: { id: 'Jakarta One Running 2026 | One City, One Celebration' },
      meta_description: {
        id: '500 Years, 5 Regions, 5.00 Kilometers Each. Run through history and culture in the ultimate urban series.',
      },
      og_image: '/assets/prototype/hero-backdrop.png',
      noindex: false,
      canonical_url: '/',
    });

    this.jsonLd.setSportsEvent({
      name: 'Jakarta One Running Series',
      startDate: '2026-05-10T06:00:00.000Z',
      locationName: 'Jakarta',
    });

    this.tenant.edition$().pipe(take(1)).subscribe((edition) => this.theme.applyEdition(edition));
  }
}

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../core/seo.service';
import { JsonLdService } from '../../core/json-ld.service';
import { partnersGraph } from '../../core/seo/structured-data';
import { ExternalLinkService } from '../../core/external-link.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';

export interface PartnerLogo {
  id: string;
  name: string;
  /** Omit while the logo file is not available yet; a placeholder box is shown instead. */
  imageUrl?: string;
  url: string;
  /** Tailwind height classes that override the tier default, to balance logos of different shapes. */
  imageClass?: string;
  /** Category label shown above the logo, e.g. "Official Car Partner". */
  caption?: string;
}

export type PartnerTierSize = 'stakeholder' | 'venue' | 'main' | 'supporting' | 'media';

/** One white card. Holds one or more logos that share a caption. */
export interface PartnerGroup {
  id: string;
  caption?: string;
  /** Wider card, for groups that hold several logos. */
  wide?: boolean;
  partners: PartnerLogo[];
}

export interface PartnerTier {
  id: string;
  size: PartnerTierSize;
  /** Force a line break after this many cards, to keep rows balanced (e.g. 3 + 2). */
  perRow?: number;
  groups: PartnerGroup[];
}

@Component({
  selector: 'app-partners-page',
  standalone: true,
  imports: [RouterLink, RevealDirective],
  templateUrl: './partners-page.component.html',
  styleUrl: './partners-page.component.scss',
})
export class PartnersPageComponent {
  private readonly seo = inject(SeoService);
  private readonly jsonLd = inject(JsonLdService);
  private readonly externalLinks = inject(ExternalLinkService);

  /** Top to bottom, in display order. Stakeholders (government) always stay first. */
  protected readonly tiers: PartnerTier[] = [
    {
      id: 'stakeholder',
      size: 'stakeholder',
      groups: [
        {
          id: 'stakeholder',
          caption: 'Stakeholder Partner',
          wide: true,
          partners: [
            { id: 'gov-jakarta', name: 'DKI Jakarta', imageUrl: '/assets/sponsors/logo-jakarta.svg', url: '#' },
            { id: 'gov-ekraf', name: 'Kementerian Ekonomi Kreatif', imageUrl: '/assets/sponsors/ekraf-seeklogo.webp', url: '#' },
            { id: 'gov-kemenpar', name: 'Kementerian Pariwisata', imageUrl: '/assets/sponsors/kemenpar.webp', url: '#' },
            { id: 'gov-dispora', name: 'Dispora DKI Jakarta', imageUrl: '/assets/sponsors/dispora.webp', url: '#' },
            { id: 'gov-abad', name: '5 Abad Jakarta', imageUrl: '/assets/sponsors/5-abad-jakarta-seeklogo.webp', url: '#' },
            { id: 'gov-wonderful', name: 'Wonderful Indonesia', imageUrl: '/assets/sponsors/wonderful-indonesia.webp', url: '#' },
          ],
        },
      ],
    },
    {
      id: 'venue',
      size: 'venue',
      groups: [
        { id: 'vp-scbd', caption: 'Official Venue Partner', partners: [{ id: 'vp-scbd', name: 'SCBD', imageUrl: '/assets/sponsors/scbd.webp', url: '#' }] },
        { id: 'vp-borobudur', caption: 'Official Venue Partner', partners: [{ id: 'vp-borobudur', name: 'Hotel Borobudur Jakarta', imageUrl: '/assets/sponsors/hotel-borobudur.webp', url: '#' }] },
      ],
    },
    {
      id: 'main',
      size: 'main',
      perRow: 3,
      groups: [
        { id: 'cp-mazda', caption: 'Official Car Partner', partners: [{ id: 'mazda', name: 'Mazda', imageUrl: '/assets/sponsors/mazda.webp', url: '#' }] },
        { id: 'cp-ihc', caption: 'Official Medical Partner', partners: [{ id: 'ihc', name: 'Indonesia Healthcare Corporation (IHC)', imageUrl: '/assets/sponsors/ihc.webp', url: '#' }] },
        { id: 'cp-connectx', caption: 'Official Networking Partner', partners: [{ id: 'connectx', name: 'ConnectX', imageUrl: '/assets/sponsors/connectx.svg?v=e52c4de', url: '#' }] },
        { id: 'cp-kliktron', caption: 'Official Partner', partners: [{ id: 'kliktron', name: 'Kliktron', imageUrl: '/assets/sponsors/kliktron.webp?v=2', url: '#' }] },
        { id: 'cp-jabra', caption: 'Official Soundwear Partner', partners: [{ id: 'jabra', name: 'Jabra', imageUrl: '/assets/sponsors/jabra.svg', url: '#' }] },
      ],
    },
    {
      id: 'supporting',
      size: 'supporting',
      // 5 + 5 cards (Body Care counts as one wide card), so no row ends with a lone card.
      perRow: 5,
      groups: [
        { id: 'sp-miels', caption: 'Official Body Care Partner', wide: true, partners: [
            { id: 'miels', name: 'Miels', imageUrl: '/assets/sponsors/miels.webp', url: '#', imageClass: 'h-8 sm:h-11' },
            { id: 'louis-merry', name: 'Louis Merry', imageUrl: '/assets/sponsors/louis-merry.webp?v=2', url: '#', imageClass: 'h-10 sm:h-14' },
          ],
        },
        { id: 'sp-torabika', caption: 'Official Coffee Partner', partners: [{ id: 'torabika', name: 'Tora Bika', imageUrl: '/assets/sponsors/torabika.webp', url: '#' }] },
        { id: 'sp-fithub', caption: 'Official Fitness Partner', partners: [{ id: 'fithub', name: 'FitHub', imageUrl: '/assets/sponsors/fithub.webp', url: '#' }] },
        { id: 'sp-strava', caption: 'Official Sports Apps Partner', partners: [{ id: 'strava', name: 'Strava', imageUrl: '/assets/sponsors/strava.webp', url: '#' }] },
        { id: 'sp-scoreid', caption: 'Official Partner', partners: [{ id: 'scoreid', name: 'scoreID', imageUrl: '/assets/sponsors/scoreid.webp', url: '#' }] },
        { id: 'sp-mobuah', caption: 'Official Juice Partner', partners: [{ id: 'mobuah', name: '100% Mobuah', imageUrl: '/assets/sponsors/mobuah.webp', url: '#', imageClass: 'h-16 sm:h-20' }] },
        { id: 'sp-merlynn', caption: 'Official Wellness Partner', partners: [{ id: 'merlynn', name: 'Merlynn Park Hotel Jakarta', imageUrl: '/assets/sponsors/merlynn-park-hotel.webp', url: '#' }] },
        { id: 'sp-hbb', caption: 'Official Snack Partner', partners: [{ id: 'hbb', name: 'Hungry But Busy', imageUrl: '/assets/sponsors/hungry-but-busy.webp', url: '#', imageClass: 'h-16 sm:h-20' }] },
        { id: 'sp-tujuhkurma', caption: 'Official Partner', partners: [{ id: 'tujuhkurma', name: 'Tujuh Kurma', imageUrl: '/assets/sponsors/tujuh-kurma.webp', url: '#', imageClass: 'h-14 sm:h-[4.5rem]' }] },
        { id: 'sp-ibunda', caption: 'Official Psychology Partner', partners: [{ id: 'ibunda', name: 'Ibunda', imageUrl: '/assets/sponsors/ibunda.webp', url: '#' }] },
      ],
    },
    {
      id: 'media',
      size: 'media',
      groups: [
        {
          id: 'mp-media',
          caption: 'Media Partner',
          wide: true,
          partners: [
            { id: 'metrotv', name: 'Metro TV', imageUrl: '/assets/sponsors/metro-tv.webp', url: '#' },
            { id: 'metronews', name: 'Metrotvnews.com', imageUrl: '/assets/sponsors/metro-news.webp', url: '#' },
          ],
        },
        { id: 'cm-gercep', caption: 'Community Partner', partners: [{ id: 'gercep', name: 'Gercep Runners', imageUrl: '/assets/sponsors/gercep-runners.webp', url: '#', imageClass: 'h-20 sm:h-24' }] },
      ],
    },
  ];

  constructor() {
    this.seo.apply({
      meta_title: { id: 'Partners | Jakarta One Running Series 2026' },
      meta_description: {
        id: 'Government and corporate partners powering Jakarta One Running Series 2026.',
      },
      og_image: '/assets/prototype/hero-home-bg.jpg',
      noindex: false,
      canonical_url: '/partners',
      keywords: 'sponsor lari jakarta, partner event lari, mitra jakarta one running series, sponsorship event olahraga jakarta',
    });

    this.jsonLd.setPage(
      partnersGraph(this.tiers.flatMap((tier) => tier.groups.flatMap((group) => group.partners)).map((partner) => partner.name)),
    );
  }

  protected cardClass(size: PartnerTierSize, wide = false): string {
    const half = 'basis-[calc(50%-0.375rem)]';
    if (wide) {
      return size === 'stakeholder'
        ? 'basis-full'
        : size === 'media'
          ? 'basis-full sm:basis-[36rem]'
          : size === 'supporting'
            ? 'basis-full sm:basis-[23.25rem]' // two supporting cards (11rem) plus the gap between them
            : 'basis-full sm:basis-[24rem]';
    }
    switch (size) {
      case 'venue':
        return `${half} sm:basis-64 md:basis-80`;
      case 'main':
        return `${half} sm:basis-52 md:basis-60`;
      case 'supporting':
        return `${half} sm:basis-44`;
      default:
        return `${half} sm:basis-56 md:basis-64`;
    }
  }

  protected imageClass(size: PartnerTierSize): string {
    // Stakeholder and venue share one height so the top two tiers read as equal weight.
    switch (size) {
      case 'stakeholder':
      case 'venue':
        return 'h-14 sm:h-24';
      default:
        return 'h-12 sm:h-16';
    }
  }

  openExternal(url: string): void {
    if (!url || url === '#') return;
    this.externalLinks.open(url);
  }
}

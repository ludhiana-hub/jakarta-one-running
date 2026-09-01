import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../core/seo.service';
import { ExternalLinkService } from '../../core/external-link.service';
import { RevealDirective } from '../../shared/directives/reveal.directive';

export interface PartnerLogo {
  id: string;
  name: string;
  imageUrl: string;
  url: string;
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
  private readonly externalLinks = inject(ExternalLinkService);

  /** Featured: government partners — larger cards, top section. */
  protected readonly featuredPartners: PartnerLogo[] = [
    { id: 'gov-jakarta', name: 'DKI Jakarta', imageUrl: '/assets/sponsors/logo-jakarta.svg', url: '#' },
    { id: 'gov-abad', name: '5 Abad Jakarta', imageUrl: '/assets/sponsors/5-abad-jakarta-seeklogo.webp', url: '#' },
    { id: 'gov-kemenpar', name: 'Kementerian Pariwisata', imageUrl: '/assets/sponsors/kemenpar.webp', url: '#' },
    { id: 'gov-ekraf', name: 'Kementerian Ekonomi Kreatif', imageUrl: '/assets/sponsors/ekraf-seeklogo.webp', url: '#' },
    { id: 'gov-dispora', name: 'Dispora DKI Jakarta', imageUrl: '/assets/sponsors/dispora.webp', url: '#' },
    { id: 'gov-wonderful', name: 'Wonderful Indonesia', imageUrl: '/assets/sponsors/wonderful-indonesia.webp', url: '#' },
  ];

  /** Everyone else — standard card size. */
  protected readonly partners: PartnerLogo[] = [
    { id: 'cp-borobudur', name: 'Hotel Borobudur', imageUrl: '/assets/sponsors/hotel-borobudur.webp', url: '#' },
    { id: 'cp-jabra', name: 'Jabra', imageUrl: '/assets/sponsors/jabra.webp', url: '#' },
    { id: 'cp-kliktron', name: 'Kliktron', imageUrl: '/assets/sponsors/kliktron.webp', url: '#' },
    { id: 'cp-ibunda', name: 'Ibunda', imageUrl: '/assets/sponsors/ibunda.webp', url: '#' },
    { id: 'cp-wikinara', name: 'Wikinara', imageUrl: '/assets/sponsors/wikinara-logo.webp', url: '#' },
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
  }

  openExternal(url: string): void {
    if (!url || url === '#') return;
    this.externalLinks.open(url);
  }
}

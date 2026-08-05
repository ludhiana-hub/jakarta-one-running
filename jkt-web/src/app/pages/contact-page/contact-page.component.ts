import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { SeoService } from '../../core/seo.service';
import { ContactFormComponent } from '../../blocks/contact-form/contact-form.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ContactFormComponent, RevealDirective],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent {
  private readonly seo = inject(SeoService);
  private readonly sanitizer = inject(DomSanitizer);

  /** Championship venue used as the series reference location. */
  protected readonly venueName = 'Lapangan Banteng';
  protected readonly venueAddress =
    'Jl. Lapangan Banteng Utara, Sawah Besar, Jakarta Pusat';

  protected readonly mapsQuery = encodeURIComponent(
    `${this.venueName}, ${this.venueAddress}`,
  );

  protected readonly mapsOpenUrl = `https://www.google.com/maps/search/?api=1&query=${this.mapsQuery}`;

  protected readonly directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${this.mapsQuery}`;

  protected readonly mapsEmbedUrl: SafeResourceUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps?q=${this.mapsQuery}&z=16&output=embed`,
    );

  protected readonly contacts = [
    {
      id: 'email',
      label: 'Email',
      value: 'hello@jakartaonerunning.id',
      href: 'mailto:hello@jakartaonerunning.id',
      hint: 'Partnership, media, and general inquiries',
    },
    {
      id: 'wa',
      label: 'WhatsApp',
      value: '+62 812-0000-2026',
      href: 'https://wa.me/6281200002026',
      hint: 'Weekdays 09.00 – 17.00 WIB',
    },
    {
      id: 'ig',
      label: 'Instagram',
      value: '@jakartaonerunning',
      href: 'https://www.instagram.com/jakartaonerunning',
      hint: 'Race updates and stage announcements',
    },
  ] as const;

  constructor() {
    this.seo.apply({
      meta_title: { id: 'Jakarta One Running Series | Contact' },
      meta_description: {
        id: 'Reach the Jakarta One Running Series team. Find the championship venue, open Google Maps, or send a message.',
      },
      og_image: '',
      noindex: false,
    });
  }
}

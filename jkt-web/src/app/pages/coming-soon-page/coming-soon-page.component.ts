import { Component, Input, inject } from '@angular/core';

import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-coming-soon-page',
  standalone: true,
  imports: [],
  templateUrl: './coming-soon-page.component.html',
})
export class ComingSoonPageComponent {
  private readonly seo = inject(SeoService);

  @Input() eyebrow = 'Gallery';
  @Input() title = 'Coming Soon';
  @Input() message = "We're putting this page together check back soon.";

  constructor() {
    this.seo.apply({
      meta_title: { id: 'Coming Soon | Jakarta One Running Series 2026' },
      meta_description: { id: 'This page is coming soon.' },
      og_image: '/assets/prototype/hero-home-bg.jpg',
      noindex: true,
    });
  }
}

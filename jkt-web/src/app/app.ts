import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { JsonLdService } from './core/json-ld.service';
import { siteGraph } from './core/seo/structured-data';
import { TrackingService } from './core/tracking.service';
import { ExternalLinkDialogComponent } from './layout/external-link-dialog/external-link-dialog.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ImageLightboxComponent } from './layout/image-lightbox/image-lightbox.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    ExternalLinkDialogComponent,
    ImageLightboxComponent,
  ],
  templateUrl: './app.html',
})
export class App {
  private readonly tracking = inject(TrackingService);
  private readonly jsonLd = inject(JsonLdService);

  constructor() {
    // Sitewide Ads / analytics from CMS Manage Site Settings.
    this.tracking.bootstrap();
    // Organization + WebSite on every page (SSR), so crawlers/AI always get the brand entity.
    this.jsonLd.setSite(siteGraph());
  }
}

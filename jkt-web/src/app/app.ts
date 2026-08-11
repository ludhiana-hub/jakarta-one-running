import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TrackingService } from './core/tracking.service';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
})
export class App {
  private readonly tracking = inject(TrackingService);

  constructor() {
    // Sitewide Ads / analytics from CMS Manage Site Settings.
    this.tracking.bootstrap();
  }
}

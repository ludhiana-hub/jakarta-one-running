import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { isRegistrationUrl } from '../../core/data/registration-waiver';
import { ExternalLinkService } from '../../core/external-link.service';
import { CtaBannerBlockData } from '../../core/models/blocks/cta-banner.block';
import { TrPipe } from '../../shared/pipes/tr.pipe';

@Component({
  selector: 'app-block-cta-banner',
  standalone: true,
  imports: [RouterLink, TrPipe],
  templateUrl: './cta-banner-block.component.html',
})
export class CtaBannerBlockComponent {
  private readonly externalLinks = inject(ExternalLinkService);

  data = input.required<CtaBannerBlockData>();

  isInternalUrl(url: string): boolean {
    return url.startsWith('/');
  }

  openExternal(url: string, event: Event): void {
    event.preventDefault();
    if (isRegistrationUrl(url)) {
      this.externalLinks.openRegistration(url);
      return;
    }
    this.externalLinks.open(url);
  }
}

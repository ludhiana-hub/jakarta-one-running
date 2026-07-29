import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CtaBannerBlockData } from '../../core/models/blocks/cta-banner.block';
import { TrPipe } from '../../shared/pipes/tr.pipe';

@Component({
  selector: 'app-block-cta-banner',
  standalone: true,
  imports: [RouterLink, TrPipe],
  templateUrl: './cta-banner-block.component.html',
})
export class CtaBannerBlockComponent {
  data = input.required<CtaBannerBlockData>();

  isInternalUrl(url: string): boolean {
    return url.startsWith('/');
  }
}

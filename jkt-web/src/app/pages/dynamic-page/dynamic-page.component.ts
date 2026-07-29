import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';

import { BlockRepository } from '../../core/api/block.repository';
import { SeoService } from '../../core/seo.service';
import { TenantService } from '../../core/tenant.service';
import { ThemeService } from '../../core/theme.service';
import { PageResponse } from '../../core/models/page-response';
import { BlockRendererComponent } from '../../blocks/block-renderer/block-renderer.component';
import { ContactFormComponent } from '../../blocks/contact-form/contact-form.component';
import { JsonLdService } from '../../core/json-ld.service';

@Component({
  standalone: true,
  selector: 'app-dynamic-page',
  imports: [AsyncPipe, BlockRendererComponent, ContactFormComponent],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly repo = inject(BlockRepository);
  private readonly seo = inject(SeoService);
  private readonly tenant = inject(TenantService);
  private readonly theme = inject(ThemeService);
  private readonly jsonLd = inject(JsonLdService);

  protected readonly pageSlug: string = this.route.snapshot.data['pageSlug'] ?? 'home';

  protected readonly page$: Observable<PageResponse> = this.repo.page(this.pageSlug).pipe(
    take(1),
  );

  constructor() {
    this.tenant.edition$().pipe(take(1)).subscribe((edition) => this.theme.applyEdition(edition));

    this.page$.pipe(take(1)).subscribe((page) => {
      if (page?.page?.seo) this.seo.apply(page.page.seo);

      if (this.pageSlug === 'home') {
        this.jsonLd.setSportsEvent({
          name: 'Jakarta One Running Series',
          startDate: '2026-05-10T06:00:00.000Z',
          locationName: 'Jakarta',
        });
      }
    });
  }
}


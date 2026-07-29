import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { map, Observable } from 'rxjs';

import { BlockRepository } from '../../core/api/block.repository';
import { TenantService } from '../../core/tenant.service';
import { ThemeService } from '../../core/theme.service';
import { EditionCardsBlockComponent } from '../../blocks/edition-cards/edition-cards-block.component';
import { SeriesTimelineBlockComponent } from '../../blocks/series-timeline/series-timeline-block.component';
import { EditionDetailBlockComponent } from '../../blocks/edition-detail/edition-detail-block.component';
import { EditionCardsBlockData } from '../../core/models/blocks/edition-cards.block';
import { SeriesTimelineBlockData } from '../../core/models/blocks/series-timeline.block';
import { EditionDetailBlockData } from '../../core/models/blocks/edition-detail.block';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  standalone: true,
  imports: [
    AsyncPipe,
    EditionCardsBlockComponent,
    SeriesTimelineBlockComponent,
    EditionDetailBlockComponent,
    RevealDirective,
  ],
  selector: 'app-edition-page',
  templateUrl: './edition-page.component.html',
})
export class EditionPageComponent {
  private readonly repo = inject(BlockRepository);
  private readonly tenant = inject(TenantService);
  private readonly theme = inject(ThemeService);

  private readonly edition$ = this.tenant.edition$();

  protected readonly editionCardsData$: Observable<EditionCardsBlockData> = this.repo.editions().pipe(
    map((editions) => ({
      items: editions.map((e) => ({
        id: `ed_card_${e.id}`,
        slug: e.slug,
        name: e.name,
        subtitle: e.venue,
        cta_url: `/etape/${e.slug}`,
        theme_accent: e.theme.accent,
      })),
    })),
  );

  protected readonly seriesTimelineData$: Observable<SeriesTimelineBlockData> = this.repo.editions().pipe(
    map((editions) => ({
      items: editions.map((e) => ({
        id: `tl_${e.id}`,
        title: e.name,
        subtitle: e.venue,
      })),
    })),
  );

  protected readonly editionDetailData$: Observable<EditionDetailBlockData> = this.edition$.pipe(
    map((e) => ({
      edition: {
        id: e.id,
        slug: e.slug,
        name: e.name,
        race_date: e.race_date,
        venue: e.venue,
        theme_accent: e.theme.accent,
        registration_phases: e.registration_phases,
      },
      medal_image: '/assets/prototype/hero-medal.png',
      jersey_image: '/assets/prototype/hero-backdrop.png',
    })),
  );

  constructor() {
    this.edition$.subscribe((edition) => this.theme.applyEdition(edition));
  }
}


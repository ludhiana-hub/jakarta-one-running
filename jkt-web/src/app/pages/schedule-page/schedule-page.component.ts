import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';

import { BlockRepository } from '../../core/api/block.repository';
import { SeoService } from '../../core/seo.service';
import { ExternalLinkDialogComponent } from '../../layout/external-link-dialog/external-link-dialog.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

export interface ScheduleStageView {
  slug: string;
  index: number;
  pad: string;
  title: string;
  monthLabel: string;
  venue: string;
  accent: string;
  registrationUrl: string;
  isFinale: boolean;
  reverse: boolean;
}

@Component({
  selector: 'app-schedule-page',
  standalone: true,
  imports: [AsyncPipe, RouterLink, NgOptimizedImage, ExternalLinkDialogComponent, RevealDirective],
  templateUrl: './schedule-page.component.html',
  styleUrl: './schedule-page.component.scss',
})
export class SchedulePageComponent {
  private readonly repo = inject(BlockRepository);
  private readonly seo = inject(SeoService);

  protected dialogVisible = false;
  protected pendingUrl: string | null = null;

  /** Marketing calendar aligned with Stitch Schedule screen. */
  private readonly marketing: Record<
    string,
    { title: string; month: string; venue: string }
  > = {
    east: {
      title: 'East Jakarta',
      month: 'February 2026',
      venue: 'Velodrome International Circuit',
    },
    west: {
      title: 'West Jakarta',
      month: 'April 2026',
      venue: 'Puri Kembangan Urban Route',
    },
    south: {
      title: 'South Jakarta',
      month: 'June 2026',
      venue: 'Prapanca Nature Trails',
    },
    north: {
      title: 'North Jakarta',
      month: 'August 2026',
      venue: 'Ancol Coastal Bayfront',
    },
    central: {
      title: 'Central Jakarta',
      month: 'October 2026',
      venue: 'Lapangan Banteng',
    },
  };

  protected readonly stages$: Observable<ScheduleStageView[]> = this.repo.editions().pipe(
    map((editions) =>
      editions.map((e, i) => {
        const m = this.marketing[e.slug];
        return {
          slug: e.slug,
          index: i,
          pad: String(i + 1).padStart(2, '0'),
          title: m?.title ?? `${e.name.id} Jakarta`,
          monthLabel: m?.month ?? this.formatMonth(e.race_date),
          venue: m?.venue ?? e.venue?.id ?? '',
          accent: e.theme.accent,
          registrationUrl: e.registration_phases[0]?.registration_url ?? '#',
          isFinale: e.slug === 'central',
          reverse: i % 2 === 1,
        };
      }),
    ),
  );

  constructor() {
    this.seo.apply({
      meta_title: { id: 'Schedule | Jakarta One Running 2026' },
      meta_description: {
        id: 'Race calendar for five Jakarta One stages — path to the Central Jakarta championship.',
      },
      og_image: '/assets/prototype/hero-medal.png',
      noindex: false,
      canonical_url: '/schedule',
    });
  }

  openExternal(url: string): void {
    this.pendingUrl = url;
    this.dialogVisible = true;
  }

  private formatMonth(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '2026';
    return d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }
}

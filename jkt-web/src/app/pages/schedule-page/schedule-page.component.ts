import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  formatPriceIdr,
  JKTONE_STAGES,
  type JktoneStage,
} from '../../core/data/jktone-stages';
import { SeoService } from '../../core/seo.service';
import { ExternalLinkDialogComponent } from '../../layout/external-link-dialog/external-link-dialog.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';

export interface ScheduleStageView {
  slug: string;
  index: number;
  pad: string;
  title: string;
  monthLabel: string;
  description: string;
  venue: string;
  venueAddress: string;
  rpcVenue: string;
  rpcAddress: string;
  routeSummary: string;
  accent: string;
  registrationUrl: string;
  isFinale: boolean;
  reverse: boolean;
  raceVillage: string;
  raceStart: string;
  raceFinish: string;
  cot: string;
  priceLabel: string;
}

function toScheduleView(stage: JktoneStage, index: number): ScheduleStageView {
  return {
    slug: stage.slug,
    index,
    pad: String(index + 1).padStart(2, '0'),
    title: stage.title,
    monthLabel: stage.monthLabel,
    description: stage.description,
    venue: stage.venue,
    venueAddress: stage.venueAddress,
    rpcVenue: stage.rpcVenue,
    rpcAddress: stage.rpcAddress,
    routeSummary: stage.routeSummary,
    accent: stage.accent,
    registrationUrl: stage.registrationUrl,
    isFinale: stage.isFinale,
    reverse: index % 2 === 1,
    raceVillage: stage.raceVillage,
    raceStart: stage.raceStart,
    raceFinish: stage.raceFinish,
    cot: stage.cot,
    priceLabel: formatPriceIdr(stage.priceIdr),
  };
}

@Component({
  selector: 'app-schedule-page',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, ExternalLinkDialogComponent, RevealDirective],
  templateUrl: './schedule-page.component.html',
  styleUrl: './schedule-page.component.scss',
})
export class SchedulePageComponent {
  private readonly seo = inject(SeoService);

  protected dialogVisible = false;
  protected pendingUrl: string | null = null;

  /** Always from brief catalog so the timeline never goes blank if CMS is empty. */
  protected readonly stages: ScheduleStageView[] = JKTONE_STAGES.map(toScheduleView);

  constructor() {
    this.seo.apply({
      meta_title: { id: 'Schedule | Jakarta One Running 2026' },
      meta_description: {
        id: 'Race calendar for five Jakarta One stages, from East in November 2026 to the Central championship in June 2027.',
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
}

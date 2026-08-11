import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  formatPriceIdr,
  JKTONE_STAGES,
  type JktoneStage,
} from '../../core/data/jktone-stages';
import { BlockRepository } from '../../core/api/block.repository';
import { Edition } from '../../core/models/edition';
import { SeoService } from '../../core/seo.service';
import { ExternalLinkDialogComponent } from '../../layout/external-link-dialog/external-link-dialog.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { catchError, map, of, take } from 'rxjs';

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

function formatWibDateLabel(isoDate: string): string {
  // API returns `YYYY-MM-DD`. Use WIB to keep "Sunday" match stable.
  const dt = new Date(`${isoDate}T00:00:00+07:00`);
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Bangkok',
  }).format(dt);
}

function formatTimeShort(hhmmss: string | null | undefined): string {
  if (!hhmmss) return '';
  // Expect HH:mm:ss
  const [hh, mm] = hhmmss.split(':');
  if (!hh || !mm) return hhmmss;
  return `${hh.padStart(2, '0')}.${mm.padStart(2, '0')}`;
}

function toScheduleViewFromEdition(edition: Edition, index: number): ScheduleStageView {
  const price = edition.registration_phases?.[0]?.price ?? 0;
  const registrationUrl = edition.registration_phases?.[0]?.registration_url ?? '';

  const venueAddress = edition.venue_address ?? '';
  const rpcAddress = edition.rpc_address ?? '';
  const routeSummary = edition.route_description?.id ?? '';

  const villageOpen = formatTimeShort(edition.village_open);
  const villageClose = formatTimeShort(edition.village_close);

  const name = edition.name?.en ?? edition.name?.id ?? '';
  const title = /jakarta/i.test(name) ? name : `${name} Jakarta`.trim();

  return {
    slug: edition.slug,
    index,
    pad: String(index + 1).padStart(2, '0'),
    title,
    monthLabel: formatWibDateLabel(edition.race_date),
    description: edition.description ?? '',
    venue: edition.venue?.id ?? '',
    venueAddress,
    rpcVenue: edition.rpc_venue ?? '',
    rpcAddress,
    routeSummary,
    accent: edition.theme.accent,
    registrationUrl,
    isFinale: edition.slug === 'central',
    reverse: index % 2 === 1,
    raceVillage: villageOpen && villageClose ? `${villageOpen}–${villageClose}` : '',
    raceStart: formatTimeShort(edition.race_start),
    raceFinish: formatTimeShort(edition.race_finish),
    cot: edition.cot_minutes ? `${edition.cot_minutes} min` : '',
    priceLabel: price ? formatPriceIdr(price) : formatPriceIdr(0),
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
  private readonly repo = inject(BlockRepository);

  protected dialogVisible = false;
  protected pendingUrl: string | null = null;

  /** Seeded from brief catalog so the timeline never goes blank if CMS is empty. */
  protected stages: ScheduleStageView[] = JKTONE_STAGES.map(toScheduleView);

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

    // Prefer CMS/fixture editions so schedule + registration URLs are editable
    // in Filament. Keep the local catalog as a safety net.
    this.repo
      .editions()
      .pipe(
        take(1),
        map((editions) =>
          (editions ?? []).map((e, idx) => toScheduleViewFromEdition(e, idx)),
        ),
        catchError(() => of([])),
      )
      .subscribe((stages) => {
        if (stages.length) this.stages = stages;
      });
  }

  openExternal(url: string): void {
    this.pendingUrl = url;
    this.dialogVisible = true;
  }
}

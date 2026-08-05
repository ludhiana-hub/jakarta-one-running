import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Edition } from '../../core/models/edition';
import { EditionCardsBlockData, EditionCardItem } from '../../core/models/blocks/edition-cards.block';
import { TrPipe } from '../../shared/pipes/tr.pipe';

const SHORT_MONTHS_ID = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

// Accepts both date-only ("2026-05-10") and full ISO datetime strings; reads
// UTC components so the date shown never shifts a day due to local timezone.
function formatDate(iso: string): { day: number; month: string; year: number } {
  const date = new Date(iso);
  return {
    day: date.getUTCDate(),
    month: SHORT_MONTHS_ID[date.getUTCMonth()],
    year: date.getUTCFullYear(),
  };
}

@Component({
  selector: 'app-block-edition-cards',
  standalone: true,
  imports: [RouterLink, TrPipe],
  templateUrl: './edition-cards-block.component.html',
})
export class EditionCardsBlockComponent {
  data = input.required<EditionCardsBlockData>();

  topItems(): EditionCardItem[] {
    return this.data().items.slice(0, 2);
  }

  bottomItems(): EditionCardItem[] {
    return this.data().items.slice(2, 5);
  }

  // Single day: "15 Mar 2026". Multi-day within the same month: "15 - 20 Mar
  // 2026". Multi-day spanning months: "28 Feb - 3 Mar 2026".
  dateRangeLabel(item: Edition): string {
    const start = formatDate(item.race_date);

    if (!item.race_date_end) {
      return `${start.day} ${start.month} ${start.year}`;
    }

    const end = formatDate(item.race_date_end);

    if (start.month === end.month && start.year === end.year) {
      return `${start.day} - ${end.day} ${end.month} ${end.year}`;
    }

    return `${start.day} ${start.month} - ${end.day} ${end.month} ${end.year}`;
  }
}

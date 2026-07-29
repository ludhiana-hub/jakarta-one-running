import { Component, input } from '@angular/core';

import { StatsCounterBlockData } from '../../core/models/blocks/stats-counter.block';
import { TrPipe } from '../../shared/pipes/tr.pipe';

@Component({
  selector: 'app-block-stats-counter',
  standalone: true,
  imports: [TrPipe],
  templateUrl: './stats-counter-block.component.html',
  styleUrl: './stats-counter-block.component.scss',
})
export class StatsCounterBlockComponent {
  data = input.required<StatsCounterBlockData>();

  accentClass(i: number): string {
    return ['text-primary', 'text-north-cyan', 'text-south-lime', 'text-central-blue'][i % 4]!;
  }

  itemHint(i: number): string | null {
    return [
      'Across all administrative regions of Jakarta',
      'Expected participants for the series',
      'Collect and combine to form a complete seal',
      'Standard individual race entry fee',
    ][i] ?? null;
  }
}

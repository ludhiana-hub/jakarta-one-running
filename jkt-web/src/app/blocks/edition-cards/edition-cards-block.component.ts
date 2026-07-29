import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EditionCardsBlockData, EditionCardItem } from '../../core/models/blocks/edition-cards.block';
import { TrPipe } from '../../shared/pipes/tr.pipe';

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

  pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  monthLabel(i: number): string {
    return ['Feb 2026', 'Apr 2026', 'June 2026', 'Aug 2026', 'Oct 2026'][i] ?? '2026';
  }
}

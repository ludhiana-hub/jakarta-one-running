import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

import { EditionDetailBlockData } from '../../core/models/blocks/edition-detail.block';
import { TrPipe } from '../../shared/pipes/tr.pipe';

@Component({
  selector: 'app-block-edition-detail',
  standalone: true,
  imports: [NgOptimizedImage, TrPipe],
  templateUrl: './edition-detail-block.component.html',
})
export class EditionDetailBlockComponent {
  data = input.required<EditionDetailBlockData>();
}

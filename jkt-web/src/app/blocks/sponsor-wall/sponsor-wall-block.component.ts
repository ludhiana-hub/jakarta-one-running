import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { TrPipe } from '../../shared/pipes/tr.pipe';
import { SponsorWallBlockData } from '../../core/models/blocks/sponsor-wall.block';

@Component({
  selector: 'app-block-sponsor-wall',
  standalone: true,
  imports: [NgOptimizedImage, TrPipe],
  templateUrl: './sponsor-wall-block.component.html',
})
export class SponsorWallBlockComponent {
  data = input.required<SponsorWallBlockData>();
}


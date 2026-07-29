import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

import { RichTextMediaBlockData } from '../../core/models/blocks/rich-text-media.block';
import { TrPipe } from '../../shared/pipes/tr.pipe';

@Component({
  selector: 'app-block-rich-text-media',
  standalone: true,
  imports: [NgOptimizedImage, TrPipe],
  templateUrl: './rich-text-media-block.component.html',
})
export class RichTextMediaBlockComponent {
  data = input.required<RichTextMediaBlockData>();
}

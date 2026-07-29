import { Component, input } from '@angular/core';

import { TrPipe } from '../../shared/pipes/tr.pipe';
import { EmbedBlockData } from '../../core/models/blocks/embed.block';

@Component({
  selector: 'app-block-embed',
  standalone: true,
  imports: [TrPipe],
  templateUrl: './embed-block.component.html',
  styleUrl: './embed-block.component.scss',
})
export class EmbedBlockComponent {
  data = input.required<EmbedBlockData>();
}


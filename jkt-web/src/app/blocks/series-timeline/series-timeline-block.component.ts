import { Component, input } from '@angular/core';

import { TrPipe } from '../../shared/pipes/tr.pipe';
import { SeriesTimelineBlockData } from '../../core/models/blocks/series-timeline.block';

@Component({
  selector: 'app-block-series-timeline',
  standalone: true,
  imports: [TrPipe],
  templateUrl: './series-timeline-block.component.html',
})
export class SeriesTimelineBlockComponent {
  data = input.required<SeriesTimelineBlockData>();
}


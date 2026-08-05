import { Component, input } from '@angular/core';

import { SeriesTimelineBlockData } from '../../core/models/blocks/series-timeline.block';
import { TrPipe } from '../../shared/pipes/tr.pipe';

@Component({
  selector: 'app-block-series-timeline',
  standalone: true,
  imports: [TrPipe],
  templateUrl: './series-timeline-block.component.html',
})
export class SeriesTimelineBlockComponent {
  data = input.required<SeriesTimelineBlockData>();
}

import { Component, input } from '@angular/core';

import { TrPipe } from '../../shared/pipes/tr.pipe';
import { MilestoneBlockData } from '../../core/models/blocks/milestone.block';

@Component({
  selector: 'app-block-milestone',
  standalone: true,
  imports: [TrPipe],
  templateUrl: './milestone-block.component.html',
})
export class MilestoneBlockComponent {
  data = input.required<MilestoneBlockData>();
}


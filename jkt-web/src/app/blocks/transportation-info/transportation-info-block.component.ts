import { Component, input } from '@angular/core';

import { TrPipe } from '../../shared/pipes/tr.pipe';
import { TransportationInfoBlockData } from '../../core/models/blocks/transportation-info.block';

@Component({
  selector: 'app-block-transportation-info',
  standalone: true,
  imports: [TrPipe],
  templateUrl: './transportation-info-block.component.html',
})
export class TransportationInfoBlockComponent {
  data = input.required<TransportationInfoBlockData>();
}


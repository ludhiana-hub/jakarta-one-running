import { Component, input } from '@angular/core';

import { AccordionModule } from 'primeng/accordion';

import { TrPipe } from '../../shared/pipes/tr.pipe';
import { FaqAccordionBlockData } from '../../core/models/blocks/faq-accordion.block';

@Component({
  selector: 'app-block-faq-accordion',
  standalone: true,
  imports: [AccordionModule, TrPipe],
  templateUrl: './faq-accordion-block.component.html',
})
export class FaqAccordionBlockComponent {
  data = input.required<FaqAccordionBlockData>();
}


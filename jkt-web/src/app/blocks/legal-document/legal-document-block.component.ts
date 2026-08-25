import { Component, input } from '@angular/core';

import { TrPipe } from '../../shared/pipes/tr.pipe';
import { LegalDocumentBlockData } from '../../core/models/blocks/legal-document.block';

@Component({
  selector: 'app-block-legal-document',
  standalone: true,
  imports: [TrPipe],
  templateUrl: './legal-document-block.component.html',
  styleUrl: './legal-document-block.component.scss',
})
export class LegalDocumentBlockComponent {
  data = input.required<LegalDocumentBlockData>();
}


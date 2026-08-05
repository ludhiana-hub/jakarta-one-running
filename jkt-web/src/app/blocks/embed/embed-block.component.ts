import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  private readonly sanitizer = inject(DomSanitizer);

  data = input.required<EmbedBlockData>();

  /** Angular blocks iframe [src] unless the URL is explicitly trusted. */
  readonly safeUrl = computed<SafeResourceUrl>(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(this.data().url),
  );
}

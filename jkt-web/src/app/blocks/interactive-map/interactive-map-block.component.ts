import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { TrPipe } from '../../shared/pipes/tr.pipe';
import { InteractiveMapBlockData } from '../../core/models/blocks/interactive-map.block';

@Component({
  selector: 'app-block-interactive-map',
  standalone: true,
  imports: [TrPipe],
  templateUrl: './interactive-map-block.component.html',
  styleUrl: './interactive-map-block.component.scss',
})
export class InteractiveMapBlockComponent {
  private readonly sanitizer = inject(DomSanitizer);

  data = input.required<InteractiveMapBlockData>();

  readonly mapsOpenUrl = computed(() => {
    const d = this.data();
    const marker = d.markers[0];
    const query = marker?.label?.id
      ? encodeURIComponent(marker.label.id)
      : `${d.center.lat},${d.center.lng}`;
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  });

  readonly mapsEmbedUrl = computed<SafeResourceUrl>(() => {
    const d = this.data();
    const marker = d.markers[0];
    const query = marker?.label?.id
      ? encodeURIComponent(marker.label.id)
      : `${d.center.lat},${d.center.lng}`;
    const zoom = d.zoom || 15;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps?q=${query}&z=${zoom}&output=embed`,
    );
  });
}

import { Component, ElementRef, afterNextRender, input, PLATFORM_ID, ViewChild, inject, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { TrPipe } from '../../shared/pipes/tr.pipe';
import { InteractiveMapBlockData } from '../../core/models/blocks/interactive-map.block';

@Component({
  selector: 'app-block-interactive-map',
  standalone: true,
  imports: [TrPipe],
  templateUrl: './interactive-map-block.component.html',
})
export class InteractiveMapBlockComponent implements OnDestroy {
  data = input.required<InteractiveMapBlockData>();

  @ViewChild('mapHost', { static: true }) private readonly mapHostRef!: ElementRef<HTMLDivElement>;

  private mapInstance: any | null = null;

  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      // Leaflet must only be initialized in the browser.
      if (!isPlatformBrowser(this.platformId)) return;
      void this.initLeaflet();
    });
  }

  private async initLeaflet(): Promise<void> {
    if (this.mapInstance) return;

    const leafletMod = await import('leaflet');
    const L = (leafletMod as any).default ?? leafletMod;

    const el = this.mapHostRef.nativeElement;
    // Ensure the container has height for Leaflet.
    el.style.height = '520px';
    el.innerHTML = '';

    this.mapInstance = L.map(el).setView(
      [this.data().center.lat, this.data().center.lng],
      this.data().zoom,
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(this.mapInstance);

    for (const m of this.data().markers) {
      const marker = L.marker([m.lat, m.lng]).addTo(this.mapInstance);
      if (m.label?.id) marker.bindPopup(m.label.id);
    }
  }

  ngOnDestroy(): void {
    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = null;
    }
  }
}


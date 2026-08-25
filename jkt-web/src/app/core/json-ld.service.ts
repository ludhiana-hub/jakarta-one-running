import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

export interface SportsEventJsonLd {
  name: string;
  startDate: string;
  locationName: string;
  url?: string;
}

@Injectable({ providedIn: 'root' })
export class JsonLdService {
  private readonly renderer: Renderer2;
  private scriptEl: HTMLScriptElement | null = null;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /** Runs on server + browser render — Googlebot reads structured data from the SSR HTML, not post-hydration. */
  setSportsEvent(data: SportsEventJsonLd): void {
    const payload = {
      '@context': 'https://schema.org',
      '@type': 'SportsEvent',
      name: data.name,
      startDate: data.startDate,
      location: {
        '@type': 'Place',
        name: data.locationName,
      },
      ...(data.url ? { url: data.url } : {}),
    };

    if (this.scriptEl) {
      this.renderer.removeChild(this.document.head, this.scriptEl);
      this.scriptEl = null;
    }

    this.scriptEl = this.renderer.createElement('script');
    this.renderer.setAttribute(this.scriptEl, 'type', 'application/ld+json');
    this.renderer.appendChild(this.scriptEl, this.renderer.createText(JSON.stringify(payload)));
    this.renderer.appendChild(this.document.head, this.scriptEl);
  }
}

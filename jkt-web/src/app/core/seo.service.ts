import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { SeoData } from './models/seo';

function upsertMeta(document: Document, key: { name?: string; property?: string }, content: string) {
  const selector = key.name
    ? `meta[name="${key.name}"]`
    : `meta[property="${key.property}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    if (key.name) el.setAttribute('name', key.name);
    if (key.property) el.setAttribute('property', key.property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
  ) {}

  apply(seo: SeoData): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.document.title = seo.meta_title.id;

    upsertMeta(this.document, { name: 'description' }, seo.meta_description.id);
    upsertMeta(this.document, { property: 'og:image' }, seo.og_image);

    const robots = this.document.querySelector('meta[name="robots"]');
    if (seo.noindex) {
      if (robots) robots.setAttribute('content', 'noindex,nofollow');
      else {
        const el = this.document.createElement('meta');
        el.setAttribute('name', 'robots');
        el.setAttribute('content', 'noindex,nofollow');
        this.document.head.appendChild(el);
      }
    } else if (robots) {
      robots.remove();
    }

    if (seo.canonical_url) {
      const canonical = this.document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', seo.canonical_url);
      else {
        const el = this.document.createElement('link');
        el.setAttribute('rel', 'canonical');
        el.setAttribute('href', seo.canonical_url);
        this.document.head.appendChild(el);
      }
    }
  }
}


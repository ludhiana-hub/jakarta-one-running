import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { SeoData } from './models/seo';

/** Canonical production origin, used to build absolute URLs for og:*, twitter:*, and canonical. */
const SITE_URL = 'https://jakartaonerunningseries.com';
const SITE_NAME = 'Jakarta One Running Series';

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

function toAbsoluteUrl(path: string): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  /**
   * Runs on both server and browser render. SSR is what crawlers (Google,
   * WhatsApp/Facebook link previews) actually fetch, so meta must be applied
   * there — never gate this behind isPlatformBrowser.
   */
  apply(seo: SeoData): void {
    const title = seo.meta_title.id;
    const description = seo.meta_description.id;
    const absoluteImage = toAbsoluteUrl(seo.og_image);
    const absoluteUrl = seo.canonical_url ? toAbsoluteUrl(seo.canonical_url) : '';

    this.document.title = title;

    upsertMeta(this.document, { name: 'description' }, description);
    if (seo.keywords) {
      upsertMeta(this.document, { name: 'keywords' }, seo.keywords);
    }

    upsertMeta(this.document, { property: 'og:site_name' }, SITE_NAME);
    upsertMeta(this.document, { property: 'og:type' }, 'website');
    upsertMeta(this.document, { property: 'og:title' }, title);
    upsertMeta(this.document, { property: 'og:description' }, description);
    if (absoluteImage) upsertMeta(this.document, { property: 'og:image' }, absoluteImage);
    if (absoluteUrl) upsertMeta(this.document, { property: 'og:url' }, absoluteUrl);

    upsertMeta(this.document, { name: 'twitter:card' }, 'summary_large_image');
    upsertMeta(this.document, { name: 'twitter:title' }, title);
    upsertMeta(this.document, { name: 'twitter:description' }, description);
    if (absoluteImage) upsertMeta(this.document, { name: 'twitter:image' }, absoluteImage);

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
      if (canonical) canonical.setAttribute('href', absoluteUrl);
      else {
        const el = this.document.createElement('link');
        el.setAttribute('rel', 'canonical');
        el.setAttribute('href', absoluteUrl);
        this.document.head.appendChild(el);
      }
    }
  }
}

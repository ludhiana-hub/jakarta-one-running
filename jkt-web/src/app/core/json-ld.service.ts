import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

import { JsonLdNode } from './seo/structured-data';

type Slot = 'site' | 'page';

/**
 * Writes `application/ld+json` into <head>. Runs on server + browser render —
 * crawlers (Google and AI search/assistants) read structured data from the SSR
 * HTML, not post-hydration.
 *
 * Two slots: `site` (Organization/WebSite, sitewide, set once) and `page`
 * (replaced by each page, cleared on every navigation so a page without
 * structured data never inherits the previous page's).
 */
@Injectable({ providedIn: 'root' })
export class JsonLdService {
  private readonly renderer: Renderer2;
  private readonly scripts = new Map<Slot, HTMLScriptElement>();

  constructor(
    rendererFactory: RendererFactory2,
    router: Router,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    router.events.pipe(filter((e) => e instanceof NavigationStart)).subscribe(() => this.clear('page'));
  }

  setSite(nodes: readonly JsonLdNode[]): void {
    this.write('site', nodes);
  }

  setPage(nodes: readonly JsonLdNode[]): void {
    this.write('page', nodes);
  }

  private clear(slot: Slot): void {
    const el = this.scripts.get(slot);
    if (!el) return;
    this.renderer.removeChild(this.document.head, el);
    this.scripts.delete(slot);
  }

  private write(slot: Slot, nodes: readonly JsonLdNode[]): void {
    this.clear(slot);
    if (!nodes.length) return;

    // `<` escaped so CMS-authored text can never close the script tag.
    const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(
      /</g,
      '\\u003c',
    );

    const el: HTMLScriptElement = this.renderer.createElement('script');
    this.renderer.setAttribute(el, 'type', 'application/ld+json');
    this.renderer.setAttribute(el, 'data-jsonld', slot);
    this.renderer.appendChild(el, this.renderer.createText(json));
    this.renderer.appendChild(this.document.head, el);
    this.scripts.set(slot, el);
  }
}

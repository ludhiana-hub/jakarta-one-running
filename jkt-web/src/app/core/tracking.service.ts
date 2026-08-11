import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { take } from 'rxjs';

import { BlockRepository } from './api/block.repository';
import { SiteTracking } from './models/site-tracking';

/**
 * Loads CMS Site Settings once and injects GTM / Meta Pixel / GA4 / custom
 * head markup into every page (app-root bootstrap). Browser-only so SSR
 * does not double-fire analytics beacons.
 */
@Injectable({ providedIn: 'root' })
export class TrackingService {
  private readonly repo = inject(BlockRepository);
  private applied = false;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
  ) {}

  /** Call once from the root app component. */
  bootstrap(): void {
    if (!isPlatformBrowser(this.platformId) || this.applied) return;

    this.repo
      .site()
      .pipe(take(1))
      .subscribe({
        next: (site) => this.apply(site.tracking ?? {}),
        error: () => {
          // No tracking if site endpoint fails — never block the app.
        },
      });
  }

  apply(tracking: SiteTracking): void {
    if (!isPlatformBrowser(this.platformId) || this.applied) return;
    this.applied = true;

    const gtm = tracking.gtm_id?.trim();
    const ga4 = tracking.ga4_id?.trim();
    const pixel = tracking.meta_pixel_id?.trim();
    const custom = tracking.custom_head_script?.trim();

    if (gtm) this.injectGtm(gtm);
    if (ga4) this.injectGa4(ga4);
    if (pixel) this.injectMetaPixel(pixel);
    if (custom) this.injectCustomHead(custom);
  }

  private injectGtm(id: string): void {
    const w = window as Window & { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

    const script = this.document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
    script.setAttribute('data-tracking', 'gtm');
    this.document.head.appendChild(script);

    // noscript fallback for users without JS (rare on this SPA, but GTM-standard).
    if (!this.document.getElementById('gtm-noscript')) {
      const noscript = this.document.createElement('noscript');
      noscript.id = 'gtm-noscript';
      noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(id)}" height="0" width="0" style="display:none;visibility:hidden" title="Google Tag Manager"></iframe>`;
      this.document.body.insertBefore(noscript, this.document.body.firstChild);
    }
  }

  private injectGa4(id: string): void {
    const w = window as Window & {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };
    w.dataLayer = w.dataLayer ?? [];
    w.gtag = function gtag(...args: unknown[]) {
      w.dataLayer!.push(args);
    };
    w.gtag('js', new Date());
    w.gtag('config', id);

    const script = this.document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    script.setAttribute('data-tracking', 'ga4');
    this.document.head.appendChild(script);
  }

  private injectMetaPixel(id: string): void {
    type Fbq = ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[];
      loaded: boolean;
      version: string;
    };
    const w = window as Window & { fbq?: Fbq; _fbq?: Fbq };

    if (!w.fbq) {
      const n = ((...args: unknown[]) => {
        if (n.callMethod) n.callMethod(...args);
        else n.queue.push(args);
      }) as Fbq;
      n.queue = [];
      n.loaded = true;
      n.version = '2.0';
      w.fbq = n;
      w._fbq = n;
    }

    w.fbq('init', id);
    w.fbq('track', 'PageView');

    const script = this.document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    script.setAttribute('data-tracking', 'meta-pixel');
    this.document.head.appendChild(script);

    if (!this.document.getElementById('meta-pixel-noscript')) {
      const noscript = this.document.createElement('noscript');
      noscript.id = 'meta-pixel-noscript';
      noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${encodeURIComponent(id)}&ev=PageView&noscript=1" alt="" />`;
      this.document.body.appendChild(noscript);
    }
  }

  /**
   * Admin-authored HTML/JS for `<head>`. Scripts in the markup are
   * re-created so the browser actually executes them (innerHTML alone
   * does not run <script> tags).
   */
  private injectCustomHead(html: string): void {
    const host = this.document.createElement('div');
    host.setAttribute('data-tracking', 'custom-head');
    host.innerHTML = html;

    const nodes = Array.from(host.childNodes);
    for (const node of nodes) {
      if (node.nodeName.toLowerCase() === 'script') {
        const srcScript = node as HTMLScriptElement;
        const script = this.document.createElement('script');
        for (const attr of Array.from(srcScript.attributes)) {
          script.setAttribute(attr.name, attr.value);
        }
        if (srcScript.textContent) script.text = srcScript.textContent;
        script.setAttribute('data-tracking', 'custom-head-script');
        this.document.head.appendChild(script);
      } else {
        this.document.head.appendChild(node);
      }
    }
  }
}

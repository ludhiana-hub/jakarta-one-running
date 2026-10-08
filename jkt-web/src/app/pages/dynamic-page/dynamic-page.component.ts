import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

import { BlockRepository } from '../../core/api/block.repository';
import { SeoService } from '../../core/seo.service';
import { TenantService } from '../../core/tenant.service';
import { ThemeService } from '../../core/theme.service';
import { PageResponse } from '../../core/models/page-response';
import { BlockRendererComponent } from '../../blocks/block-renderer/block-renderer.component';
import { JsonLdService } from '../../core/json-ld.service';
import { cmsPageGraph } from '../../core/seo/structured-data';
import { environment } from '../../../environments/environment';

/** Origins allowed to post live-preview messages into this window. */
const TRUSTED_PREVIEW_ORIGINS = [environment.apiUrl.replace(/\/api\/v1\/?$/, '')];

@Component({
  standalone: true,
  selector: 'app-dynamic-page',
  imports: [BlockRendererComponent],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly repo = inject(BlockRepository);
  private readonly seo = inject(SeoService);
  private readonly tenant = inject(TenantService);
  private readonly theme = inject(ThemeService);
  private readonly jsonLd = inject(JsonLdService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  // Signal, not a readonly field set once in the constructor: the router
  // reuses this component instance across navigations between two slugs
  // that both match the wildcard `:slug` route (e.g. /a -> /b), so the
  // slug must be read reactively from paramMap, not captured once at
  // construction — a fixed pageSlug field would go stale after the first
  // in-place navigation.
  protected readonly pageSlug = signal<string>(this.route.snapshot.data['pageSlug'] ?? this.route.snapshot.paramMap.get('slug') ?? 'home');

  private readonly loadedPage = signal<PageResponse | null>(null);

  protected readonly overridePage = signal<PageResponse | null>(null);

  protected readonly page = computed(() => this.overridePage() ?? this.loadedPage());

  constructor() {
    this.tenant.edition$().pipe(take(1)).subscribe((edition) => this.theme.applyEdition(edition));

    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const slug = this.route.snapshot.data['pageSlug'] ?? params.get('slug') ?? 'home';
      this.pageSlug.set(slug);
      this.overridePage.set(null);
      this.loadPage(slug);
    });

    if (isPlatformBrowser(this.platformId)) {
      const onMessage = (event: MessageEvent) => {
        // Only accept preview messages from the CMS origin — without this
        // check, any page embedding this app in an iframe could inject
        // arbitrary page content via postMessage.
        if (!TRUSTED_PREVIEW_ORIGINS.includes(event.origin)) return;

        if (event.data?.type === 'cms-page-preview' && event.data?.page) {
          this.overridePage.set(event.data.page as PageResponse);
        }

        if (event.data?.type === 'cms-page-preview-reload') {
          this.loadPage(this.pageSlug(), { asOverride: true });
        }
      };
      window.addEventListener('message', onMessage);
      this.destroyRef.onDestroy(() => window.removeEventListener('message', onMessage));
    }
  }

  /** Public URL path (not the CMS slug: /event-waiver is served from slug `syarat-ketentuan`). */
  private currentPath(): string {
    const segments = this.route.snapshot.pathFromRoot.flatMap((r) => r.url.map((s) => s.path));
    return `/${segments.join('/')}`;
  }

  private loadPage(slug: string, options: { asOverride?: boolean } = {}): void {
    this.repo
      .page(slug)
      .pipe(take(1))
      .subscribe((page) => {
        if (options.asOverride) {
          this.overridePage.set(page);
        } else {
          this.loadedPage.set(page);
        }

        if (page?.page?.seo) {
          this.seo.apply(page.page.seo);
        }

        if (page && !page.page.seo?.noindex && !page.page.noindex) {
          this.jsonLd.setPage(
            cmsPageGraph({
              path: this.currentPath(),
              title: page.page.seo?.meta_title?.id || page.page.title.id,
              description: page.page.seo?.meta_description?.id ?? '',
              faqItems: page.blocks.flatMap((block) =>
                block.type === 'faq_accordion'
                  ? block.data.items.map((item) => ({
                      question: item.question.id,
                      answer: item.answer.id,
                    }))
                  : [],
              ),
            }),
          );
        }
      });
  }
}

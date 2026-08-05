import {
  Component,
  DestroyRef,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, fromEvent, take } from 'rxjs';

import { BlockRepository } from '../../core/api/block.repository';
import { MenuItem } from '../../core/models/menu-response';
import { ExternalLinkDialogComponent } from '../external-link-dialog/external-link-dialog.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage, ExternalLinkDialogComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly repo = inject(BlockRepository);

  protected readonly menuOpen = signal(false);
  protected dialogVisible = false;
  protected pendingUrl: string | null = null;

  private readonly menuItems = signal<MenuItem[]>([]);

  // The CMS-managed header menu always ends with the CTA (e.g. "Register") —
  // everything before it renders as a plain nav link, the last item as the
  // pill button, so admins can reorder/add links without touching Angular.
  protected readonly navLinks = computed(() => this.menuItems().slice(0, -1));
  protected readonly ctaItem = computed(() => this.menuItems().at(-1) ?? null);

  constructor() {
    this.repo
      .menu()
      .pipe(take(1))
      .subscribe({
        next: (response) => this.menuItems.set(response.menu),
        error: () => this.menuItems.set([]),
      });

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.closeMenu());

    if (isPlatformBrowser(this.platformId)) {
      fromEvent<KeyboardEvent>(this.document, 'keydown')
        .pipe(
          filter((e) => e.key === 'Escape'),
          takeUntilDestroyed(),
        )
        .subscribe(() => this.closeMenu());
    }

    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      this.document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
    });

    this.destroyRef.onDestroy(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.document.body.style.overflow = '';
      }
    });
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  // A menu item's `url` is either a relative Angular route (e.g. "/schedule",
  // resolved server-side from a CMS page or authored directly) or an
  // absolute outbound URL — only the latter should show the "leaving this
  // site" confirmation dialog.
  isInternal(item: MenuItem): boolean {
    return !!item.url && item.url.startsWith('/');
  }

  openExternal(url: string): void {
    this.closeMenu();
    this.pendingUrl = url;
    this.dialogVisible = true;
  }
}

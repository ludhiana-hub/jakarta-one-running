import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  DestroyRef,
  Inject,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';

import {
  REGISTRATION_WAIVER_EN,
  REGISTRATION_WAIVER_ID,
  REGISTRATION_WAIVER_VERSION,
} from '../../core/data/registration-waiver';
import { ExternalLinkService } from '../../core/external-link.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-external-link-dialog',
  standalone: true,
  imports: [],
  templateUrl: './external-link-dialog.component.html',
  styleUrl: './external-link-dialog.component.scss',
})
export class ExternalLinkDialogComponent {
  private readonly links = inject(ExternalLinkService);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly http = inject(HttpClient);

  protected readonly visible = this.links.visible;
  protected readonly pendingUrl = this.links.pendingUrl;
  /** Waiver UI whenever Register CTA forced it, or URL looks like registration. */
  protected readonly isRegistration = computed(() => this.links.requireWaiver());
  protected readonly agreed = signal(false);

  protected readonly waiverEn = REGISTRATION_WAIVER_EN;
  protected readonly waiverId = REGISTRATION_WAIVER_ID;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {
    effect(() => {
      const open = this.visible();
      if (open) {
        this.agreed.set(false);
      }
      if (!isPlatformBrowser(this.platformId)) return;
      this.document.body.style.overflow = open ? 'hidden' : '';
    });

    this.destroyRef.onDestroy(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.document.body.style.overflow = '';
      }
    });
  }

  onAgreeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.agreed.set(!!input.checked);
  }

  cancel(): void {
    this.links.close();
  }

  confirm(): void {
    const url = this.pendingUrl();
    if (!url) {
      this.links.close();
      return;
    }

    if (this.isRegistration() && !this.agreed()) {
      return;
    }

    // Quiet background save — never block redirect or surface UI errors.
    if (this.isRegistration() && isPlatformBrowser(this.platformId)) {
      this.http
        .post(`${environment.apiUrl}/waiver-consents`, {
          registration_url: url,
          page_url: window.location.href,
          waiver_version: REGISTRATION_WAIVER_VERSION,
          locale: 'en',
        })
        .subscribe({ error: () => undefined });
    }

    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank', 'noopener');
    }

    this.links.close();
  }
}

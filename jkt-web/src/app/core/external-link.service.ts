import { Injectable, signal } from '@angular/core';

import { isRegistrationUrl } from './data/registration-waiver';

/**
 * App-wide outbound-link dialog.
 * - `openRegistration(url)` → always Event Waiver + silent consent log
 * - `open(url)` → waiver if URL looks like registration, else “leaving site”
 */
@Injectable({ providedIn: 'root' })
export class ExternalLinkService {
  readonly visible = signal(false);
  readonly pendingUrl = signal<string | null>(null);
  /** When true, dialog shows waiver + records consent (even if URL host changes). */
  readonly requireWaiver = signal(false);

  open(url: string): void {
    this.requireWaiver.set(isRegistrationUrl(url));
    this.pendingUrl.set(url);
    this.visible.set(true);
  }

  /** Use for every Register / ticket CTA — waiver is mandatory. */
  openRegistration(url: string): void {
    if (!url) return;
    this.requireWaiver.set(true);
    this.pendingUrl.set(url);
    this.visible.set(true);
  }

  close(): void {
    this.visible.set(false);
    this.pendingUrl.set(null);
    this.requireWaiver.set(false);
  }

  setVisible(value: boolean): void {
    if (!value) {
      this.close();
      return;
    }
    this.visible.set(true);
  }
}

import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Edition } from './models/edition';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
  ) {}

  applyAccent(accentHex: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = this.document.documentElement;

    el.style.setProperty('--brand-primary', accentHex);
    el.style.setProperty('--brand-primary-glow', `color-mix(in srgb, ${accentHex} 40%, transparent)`);
  }

  applyEdition(edition: Edition): void {
    this.applyAccent(edition.theme.accent);
  }
}


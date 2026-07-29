import { Injectable, signal } from '@angular/core';

export type AppLocale = 'id' | 'en';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  /**
   * Prototype scope: structure bilingual is ready, but fixtures are ID-only,
   * so default locale stays `id` for now.
   */
  private readonly locale = signal<AppLocale>('id');

  current(): AppLocale {
    return this.locale();
  }
}


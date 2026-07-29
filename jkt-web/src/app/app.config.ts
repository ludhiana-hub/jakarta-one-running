import { ApplicationConfig, provideAppInitializer, provideZonelessChangeDetection, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay, withIncrementalHydration } from '@angular/platform-browser';

import { routes } from './app.routes';

import { PrimeNG, providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { BlockRepository } from './core/api/block.repository';
import { FixtureBlockRepository } from './core/api/fixture.repository';

function passthroughImageLoader(config: ImageLoaderConfig): string {
  return config.src;
}

/**
 * One-shot license quieting — no MutationObserver / intervals (those caused
 * DOM thrash + UI glitches on every Angular render).
 */
function suppressPrimeLicenseBanner(): void {
  const platformId = inject(PLATFORM_ID);
  const prime = inject(PrimeNG);
  if (!isPlatformBrowser(platformId)) return;

  const quiet = () => {
    (prime as { _setVerified: (v: boolean) => void })._setVerified(true);
    document.getElementById('p-license-host')?.remove();
  };

  quiet();
  // Cover async verifyLicense once — avoid multi-timeout DOM thrash
  window.setTimeout(quiet, 100);
}

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: BlockRepository, useClass: FixtureBlockRepository },
    { provide: IMAGE_LOADER, useValue: passthroughImageLoader },
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'top' }),
      withViewTransitions(),
    ),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { cssLayer: { name: 'primeng', order: 'tailwind, primeng' } },
      },
    }),
    provideAppInitializer(suppressPrimeLicenseBanner),
  ],
};

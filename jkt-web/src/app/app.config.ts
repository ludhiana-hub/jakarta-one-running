import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration,
} from '@angular/platform-browser';

import { routes } from './app.routes';

import { BlockRepository } from './core/api/block.repository';
import { cmsHostInterceptor } from './core/api/cms-host.interceptor';
import { FixtureBlockRepository } from './core/api/fixture.repository';
import { HttpBlockRepository } from './core/api/http-block.repository';
import { environment } from '../environments/environment';

function passthroughImageLoader(config: ImageLoaderConfig): string {
  return config.src;
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: BlockRepository,
      useClass: environment.useCmsApi ? HttpBlockRepository : FixtureBlockRepository,
    },
    { provide: IMAGE_LOADER, useValue: passthroughImageLoader },
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'top' }),
      // Lazy children read `pageSlug` declared on their parent route.
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
      // Warms lazy route chunks in the background so navigation feels instant.
      withPreloading(PreloadAllModules),
      withViewTransitions({ skipInitialTransition: true }),
    ),
    provideHttpClient(withFetch(), withInterceptors([cmsHostInterceptor])),
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
  ],
};

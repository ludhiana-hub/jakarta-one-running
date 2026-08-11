import { DOCUMENT, REQUEST, inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

import { environment } from '../../../environments/environment';

/**
 * Resolves the public hostname for CMS tenant lookup.
 * Staging (`staging.…`) and production apex share one deploy — use the
 * actual request/browser host so Filament `event_domains` can match either.
 */
function resolveTenantHost(): string {
  const request = inject(REQUEST, { optional: true });
  if (request) {
    const forwarded = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
    if (forwarded) {
      return forwarded.split(':')[0]!;
    }
    const hostHeader = request.headers.get('host')?.split(':')[0]?.trim();
    if (hostHeader) {
      return hostHeader;
    }
    try {
      const hostname = new URL(request.url).hostname;
      if (hostname) return hostname;
    } catch {
      // ignore invalid URL
    }
  }

  const doc = inject(DOCUMENT, { optional: true });
  const browserHost = doc?.defaultView?.location?.hostname?.trim();
  if (browserHost) {
    return browserHost;
  }

  return environment.cmsHost;
}

/**
 * Appends `?host=<tenant-hostname>` to every CMS API request.
 *
 * Laravel ResolveTenant uses `?host=` (or Host header). Without this, SSR/browser
 * calls hit the API origin (`127.0.0.1` / internal) and fail tenant resolution.
 */
export const cmsHostInterceptor: HttpInterceptorFn = (req, next) => {
  const isCmsRequest = req.url.startsWith(environment.apiUrl) || req.url.startsWith(environment.apiUrlServer);

  if (!isCmsRequest || req.params.has('host')) {
    return next(req);
  }

  return next(req.clone({ params: req.params.set('host', resolveTenantHost()) }));
};

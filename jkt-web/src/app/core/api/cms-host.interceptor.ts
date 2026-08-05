import { HttpInterceptorFn } from '@angular/common/http';

import { environment } from '../../../environments/environment';

/**
 * Appends `?host=<environment.cmsHost>` to every request aimed at the CMS
 * API (both the browser-facing apiUrl and the SSR-facing apiUrlServer).
 *
 * Laravel's ResolveTenant middleware resolves the tenant from `?host=` (or
 * the `Host` header, which is meaningless here since the browser/SSR always
 * talks to `apiUrl`/`apiUrlServer`, not the tenant's real domain) — without
 * this, every CMS request resolves host `127.0.0.1` (or whatever the CMS
 * origin is), which has no matching `event_domains` row and 404s.
 */
export const cmsHostInterceptor: HttpInterceptorFn = (req, next) => {
  const isCmsRequest = req.url.startsWith(environment.apiUrl) || req.url.startsWith(environment.apiUrlServer);

  if (!isCmsRequest || req.params.has('host')) {
    return next(req);
  }

  return next(req.clone({ params: req.params.set('host', environment.cmsHost) }));
};

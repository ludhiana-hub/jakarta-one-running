/**
 * Production / staging build (same bundle).
 *
 * Hostnames:
 * - Production: jakartaonerunningseries.com (+ www)
 * - Staging:    staging.jakartaonerunningseries.com
 *
 * `cmsHost` is the fallback when the request host cannot be read; runtime
 * prefers the actual Host / browser hostname (see cmsHostInterceptor).
 */
export const environment = {
  production: true,
  /** Browser-facing CMS API base (no trailing slash). Same-origin by default. */
  apiUrl: '/api/v1',
  /** SSR-facing CMS API base (internal hostname when deployed with the CMS). */
  apiUrlServer: '/api/v1',
  /** When true, use HttpBlockRepository instead of bundled fixtures. */
  useCmsApi: false,
  /** Fallback tenant hostname if request host is unavailable. */
  cmsHost: 'jakartaonerunningseries.com',
};

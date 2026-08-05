/**
 * Production environment.
 *
 * The landing deploy runs without a publicly reachable CMS, so it serves
 * bundled fixtures instead of calling the Laravel API. Flip `useCmsApi` to
 * true and point the URLs at the CMS once it is deployed behind the same
 * domain.
 */
export const environment = {
  production: true,
  /** Browser-facing CMS API base (no trailing slash). Same-origin by default. */
  apiUrl: '/api/v1',
  /** SSR-facing CMS API base (internal hostname when deployed with the CMS). */
  apiUrlServer: '/api/v1',
  /** When true, use HttpBlockRepository instead of bundled fixtures. */
  useCmsApi: false,
  /** Tenant hostname sent as `?host=` on every CMS API call. */
  cmsHost: 'jakartaonerunning.id',
};

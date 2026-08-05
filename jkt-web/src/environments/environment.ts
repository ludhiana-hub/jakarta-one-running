export const environment = {
  production: false,
  /** Browser-facing CMS API base (no trailing slash). */
  apiUrl: 'http://127.0.0.1:8000/api/v1',
  /** SSR-facing CMS API base (internal Docker hostname when deployed). */
  apiUrlServer: 'http://127.0.0.1:8000/api/v1',
  /** When true, use HttpBlockRepository instead of fixtures. */
  useCmsApi: true,
  /**
   * Tenant hostname sent as `?host=` on every CMS API call (cmsHostInterceptor).
   * Must match an `event_domains.hostname` row in the CMS — see
   * DevEventSeeder, which registers `localhost` for this dev event.
   */
  cmsHost: 'localhost',
};

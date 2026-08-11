/** Tracking IDs / scripts from CMS Site Settings (`GET /api/v1/site` → `tracking`). */
export interface SiteTracking {
  gtm_id?: string | null;
  meta_pixel_id?: string | null;
  ga4_id?: string | null;
  custom_head_script?: string | null;
}

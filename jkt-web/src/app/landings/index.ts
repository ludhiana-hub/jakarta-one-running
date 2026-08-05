/**
 * Auto-generated registry of hybrid event landings.
 * Runtime content still comes from the CMS API; these folders hold
 * per-event overrides (theme CSS, local fixtures, notes).
 */
export const landingRegistry = {
  'jakarta-one': () => import('./jakarta-one/landing.config'),
} as const;

export type LandingSlug = keyof typeof landingRegistry;
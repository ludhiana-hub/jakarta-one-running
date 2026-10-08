/** Canonical production origin, used to build absolute URLs for meta tags and structured data. */
export const SITE_URL = 'https://jakartaonerunningseries.com';
export const SITE_NAME = 'Jakarta One Running Series';
export const SITE_ALTERNATE_NAME = 'Jakarta One';
export const SITE_DESCRIPTION =
  'A five-stage 5.00 km running series across Jakarta, from South Jakarta on 1 November 2026 to the Central Jakarta championship on 6 June 2027.';
export const CONTACT_EMAIL = 'info@jakartaonerunningseries.com';
export const INSTAGRAM_URL = 'https://www.instagram.com/jakartaonerunningseries';
export const SITE_LOGO_PATH = '/assets/logo-nav.webp';
export const SITE_IMAGE_PATH = '/assets/prototype/hero-home-bg.jpg';

export function absoluteUrl(path: string): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

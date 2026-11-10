import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Static (Vercel) build: known pages are prerendered at build time from bundled
 * fixtures, so no Node server or backend is needed at runtime. Parameterised
 * catch-all routes fall back to client rendering (index.csr.html).
 * Swapped in for app.routes.server.ts via the "vercel" build configuration.
 */
export const serverRoutes: ServerRoute[] = [
  ...['', 'schedule', 'partners', 'gallery', 'faq', 'event-waiver', 'contact'].map(
    (path): ServerRoute => ({ path, renderMode: RenderMode.Prerender }),
  ),
  { path: 'etape/:slug', renderMode: RenderMode.Client },
  { path: ':slug', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Client },
];

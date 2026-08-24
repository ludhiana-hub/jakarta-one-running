import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();

/** Hosts allowed for SSR (Angular host-header SSRF guard). Override via NG_ALLOWED_HOSTS. */
function resolveAllowedHosts(): string[] {
  const fromEnv = process.env['NG_ALLOWED_HOSTS'];
  if (fromEnv?.trim()) {
    return fromEnv
      .split(',')
      .map((h) => h.trim())
      .filter(Boolean);
  }
  return [
    'localhost',
    '127.0.0.1',
    '*.sslip.io',
    '103.55.37.253',
    'jakartaonerunningseries.com',
    '*.jakartaonerunningseries.com',
  ];
}

const angularApp = new AngularNodeAppEngine({
  allowedHosts: resolveAllowedHosts(),
  // Traefik / Dokploy forwards these; required for correct absolute URLs in SSR
  trustProxyHeaders: ['x-forwarded-host', 'x-forwarded-proto', 'x-forwarded-port'],
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Halaman-halaman ini boleh di-cache publik (kontennya sama untuk semua
 * visitor di detik yang sama) — dipakai untuk meredam burst traffic saat
 * window pembukaan tiket, supaya Cloudflare bisa serve dari edge tanpa
 * hit origin (Node SSR + CMS API) di setiap request.
 */
function isCacheableSsrRequest(req: express.Request): boolean {
  if (req.method !== 'GET') return false;
  if (req.path === '/dev/blocks' || req.path.startsWith('/dev/blocks/')) return false;
  if ('preview_token' in req.query) return false;
  return true;
}

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  if (isCacheableSsrRequest(req)) {
    // Browser tidak nyimpen lama (max-age=0); Cloudflare edge (s-maxage) boleh
    // nyimpen render HTML 60s dan serve versi stale sampai 300s sambil
    // revalidate di background. Butuh Cache Rule di dashboard Cloudflare agar
    // HTML benar-benar dianggap cache-eligible (default Cloudflare tidak
    // cache text/html).
    res.set('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=300');
  }

  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * PORT / HOST from env (Docker/Dokploy: HOST=0.0.0.0, PORT=4000).
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = Number(process.env['PORT'] || 4000);
  const host = process.env['HOST'] || '0.0.0.0';
  app.listen(port, host, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://${host}:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);

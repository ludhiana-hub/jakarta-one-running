# Deploy on Dokploy (Compose)

Repo: https://github.com/ludhiana-hub/jakarta-one-running

## Domains

| Env | Hostname | Cloudflare DNS |
|-----|----------|----------------|
| **Staging** | `staging.jakartaonerunningseries.com` | A → VPS IP (Proxied) |
| **Production** | `jakartaonerunningseries.com` | A `@` → VPS IP (Proxied) |
| **Production www** | `www.jakartaonerunningseries.com` | CNAME → apex (Proxied) |

Attach **all three** to Dokploy service **`landing`**, port **`4000`**, HTTPS ON, then **Redeploy**.

In Filament → Event → Domains, register the same hostnames (staging = Preview, apex/www = Production).

## Recommended settings

1. Service type: **Docker Compose**
2. Branch: `main`
3. **Compose Path:** `./docker-compose.yml` (file at **repo root**)
4. Domain → attach to service **`landing`**, port **`4000`**
5. Env (optional):
   - `PORT=4000`
   - `HOST=0.0.0.0`
   - `NODE_ENV=production`
   - `NG_ALLOWED_HOSTS=localhost,127.0.0.1,*.sslip.io,103.55.37.253,jakartaonerunningseries.com,*.jakartaonerunningseries.com`

   `NG_ALLOWED_HOSTS` is required for custom domains.
   Without it, Angular SSR returns: `Header "host" ... is not allowed.`

Dokploy injects Traefik via `dokploy-network` (declared `external: true` in compose).

## If build fails (OOM)

Raise server RAM or add build arg / swap. Dockerfile already sets
`NODE_OPTIONS=--max-old-space-size=4096` during `ng build`.

## Alternative: Dockerfile-only app

- Build type: Dockerfile
- Dockerfile: `jkt-web/Dockerfile`
- Docker context / base: `jkt-web`
- Port: `4000`

# Deploy on Dokploy (Compose)

Repo: https://github.com/ludhiana-hub/jakarta-one-running

## Recommended settings

1. Service type: **Docker Compose**
2. Branch: `main`
3. **Compose Path:** `./docker-compose.yml` (file at **repo root**)
4. Domain → attach to service **`landing`**, port **`4000`**
5. Env (optional):
   - `PORT=4000`
   - `HOST=0.0.0.0`
   - `NODE_ENV=production`

Dokploy injects Traefik via `dokploy-network` (declared `external: true` in compose).

## If build fails (OOM)

Raise server RAM or add build arg / swap. Dockerfile already sets
`NODE_OPTIONS=--max-old-space-size=4096` during `ng build`.

## Alternative: Dockerfile-only app

- Build type: Dockerfile
- Dockerfile: `jkt-web/Dockerfile`
- Docker context / base: `jkt-web`
- Port: `4000`

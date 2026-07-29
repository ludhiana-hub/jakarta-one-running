# Deploy jkt-web on Dokploy

## Option A — Dockerfile (recommended)

1. Create application → **Docker**
2. Connect this Git repo
3. Set **Base Directory** / build path to: `jkt-web`
4. Dockerfile path: `Dockerfile` (inside base dir)
5. Published port: **4000**
6. Env (optional):
   - `PORT=4000`
   - `HOST=0.0.0.0`
   - `NODE_ENV=production`

## Option B — Docker Compose

1. Application type → **Docker Compose**
2. Base directory: `jkt-web`
3. Compose file: `docker-compose.yml`
4. Domain → attach to service `jkt-web` port `4000`

## Local test

```bash
cd jkt-web
docker compose build
docker compose up
# open http://localhost:4000
```

# Outline RU Deployment

Minimal Docker Compose deployment for running the ready Outline RU image on a
server.

This stack runs:

- Outline with Russian locale available
- PostgreSQL
- Redis
- Dex OIDC login
- Caddy HTTPS reverse proxy

## 1. Prepare DNS

Create two DNS records pointing to your server:

```text
docs.example.com
auth.docs.example.com
```

Use real internal or public domains instead of these examples.

## 2. Prepare Config

```bash
cp .env.example .env
cp dex-config.yaml.example dex-config.yaml
```

Edit `.env`.

Important values:

```text
OUTLINE_IMAGE
APP_NAME
OUTLINE_HOST
DEX_HOST
URL
SECRET_KEY
UTILS_SECRET
POSTGRES_PASSWORD
DATABASE_URL
OIDC_CLIENT_SECRET
OIDC_AUTH_URI
```

`OUTLINE_IMAGE` must point to the image published in GitHub Container Registry.

Example:

```text
OUTLINE_IMAGE=ghcr.io/arturstm/outline-ru:latest
```

Generate secrets:

```bash
openssl rand -hex 32
```

Edit `dex-config.yaml`.

Important values:

```text
issuer
staticClients[0].secret
staticClients[0].redirectURIs[0]
staticPasswords[0].email
staticPasswords[0].hash
```

Generate Dex password hash:

```bash
htpasswd -bnBC 10 '' 'your_password' | tr -d ':\n'
```

The same OIDC client secret must be used in:

```text
.env: OIDC_CLIENT_SECRET
dex-config.yaml: staticClients[0].secret
```

## 3. Login To Registry

If the GitHub Container Registry package is private, login on the deployment
server:

```bash
docker login ghcr.io
```

Use a GitHub token with permission to read packages.

## 4. Start

```bash
docker compose pull
docker compose up -d
docker compose logs -f
```

Open:

```text
https://your-docs-domain
```

## 5. Stop

```bash
docker compose down
```

## 6. Delete Data

```bash
docker compose down -v
```

Use `down -v` only when you intentionally want to delete all Outline data.

## Updating The Fork

On your development machine:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

Resolve conflicts, especially in:

```text
shared/i18n/locales/ru_RU/translation.json
shared/i18n/index.ts
shared/utils/date.ts
```

Then push:

```bash
git push origin main
```

Build and publish the Docker image locally, then deploy the new tag. The
deployment server only needs to run:

```bash
docker compose pull
docker compose up -d
```

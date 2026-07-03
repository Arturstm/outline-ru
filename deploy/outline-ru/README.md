# Outline RU Deployment

This deployment runs:

- Outline RU
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

Use your real domains instead of these examples.

## 2. Prepare Config

```bash
cp .env.example .env
cp dex-config.yaml.example dex-config.yaml
```

Edit `.env`:

```text
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

Generate secrets:

```bash
openssl rand -hex 32
```

Edit `dex-config.yaml`:

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

## 3. Start

```bash
docker compose up -d
docker compose logs -f
```

Open:

```text
https://your-docs-domain
```

## 4. Stop

```bash
docker compose down
```

## 5. Delete Data

```bash
docker compose down -v
```

Use `down -v` only when you intentionally want to delete all Outline data.

## Updating The Fork

On your development machine:

```bash
git remote add upstream https://github.com/outline/outline.git
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

GitHub Actions will build and publish:

```text
ghcr.io/arturstm/outline-ru:latest
```

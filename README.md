# Outline RU

Russian-focused fork of [Outline](https://github.com/outline/outline), a fast
collaborative knowledge base for teams.

This repository contains the application source code, Docker build files, and a
minimal deployment example. The ready-to-run image is published separately to
GitHub Container Registry:

```text
ghcr.io/arturstm/outline-ru:latest
```

## What Changed

- Added and improved `ru_RU` locale files.
- Registered Russian in the language selector.
- Added Russian date locale support.
- Added `scripts/check-ru-locale.mjs` to compare Russian and English locale
  keys.
- Added a Docker Compose deployment example in `deploy/outline-ru`.
- Disabled upstream update checks by default for this fork.
- Removed upstream GitHub workflow files that do not apply to this fork.

## Quick Start

Use the deployment example if you only need to run the ready image on a server:

```bash
cd deploy/outline-ru
cp .env.example .env
cp dex-config.yaml.example dex-config.yaml
```

Edit `.env` and `dex-config.yaml`, then start the stack:

```bash
docker compose pull
docker compose up -d
```

See `deploy/outline-ru/README.md` for the full list of required values.

## Check Russian Locale

```bash
node scripts/check-ru-locale.mjs
```

The script compares:

```text
shared/i18n/locales/en_US/translation.json
shared/i18n/locales/ru_RU/translation.json
```

It reports missing keys, extra keys, and English fallback values.

## Build Docker Image Locally

You do not need to build the image to use the deployment example. Build locally
only when you need to publish a new image version.

Build the base image locally:

```bash
docker build -f Dockerfile.base -t outline-ru-base:local .
```

Build the runtime image:

```bash
docker build \
  --build-arg BASE_IMAGE=outline-ru-base:local \
  -t ghcr.io/arturstm/outline-ru:latest .
```

## Push To GitHub Container Registry

Login once:

```bash
export CR_PAT=your_github_token
echo "$CR_PAT" | docker login ghcr.io -u Arturstm --password-stdin
```

Push the runtime image:

```bash
docker push ghcr.io/arturstm/outline-ru:latest
```

The image used by servers or Kubernetes is:

```text
ghcr.io/arturstm/outline-ru:latest
```

## Deployment

Deployment files are in:

```text
deploy/outline-ru
```

See `deploy/outline-ru/README.md`.

## Updating From Upstream

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

Then re-run:

```bash
node scripts/check-ru-locale.mjs
```

Push this fork to GitHub:

```bash
git push origin main
```

## License

This fork is based on Outline and remains subject to the original license in
`LICENSE`.

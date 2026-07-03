# Outline RU Fork

This fork adds Russian UI support back into Outline.

Changed files:

```text
shared/i18n/locales/ru_RU/translation.json
shared/i18n/index.ts
shared/utils/date.ts
scripts/check-ru-locale.mjs
.github/workflows/ghcr.yml
deploy/outline-ru/
```

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

## Build Image Locally

```bash
docker build -f Dockerfile.base -t outline-ru-base:local .
docker build --build-arg BASE_IMAGE=outline-ru-base:local -t outline-ru:local .
```

## Publish Image

Push to `main`. GitHub Actions publishes:

```text
ghcr.io/arturstm/outline-ru:latest
```

## Update From Upstream

```bash
git remote add upstream https://github.com/outline/outline.git
git fetch upstream
git checkout main
git merge upstream/main
```

After resolving conflicts:

```bash
node scripts/check-ru-locale.mjs
git push origin main
```

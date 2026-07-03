# Outline RU

Русифицированный fork [Outline](https://github.com/outline/outline), быстрой
корпоративной базы знаний для совместной работы команд.

В этом репозитории находятся исходный код приложения, Dockerfile для сборки
образа и минимальный пример запуска. Готовый образ публикуется отдельно в
GitHub Container Registry:

```text
ghcr.io/arturstm/outline-ru:latest
```

## Что Изменено

- Добавлена и доработана локализация `ru_RU`.
- Русский язык добавлен в список языков интерфейса.
- Добавлена поддержка русской локали для дат.
- Добавлен `scripts/check-ru-locale.mjs` для сравнения ключей русской и
  английской локализации.
- Добавлен пример запуска через Docker Compose в `deploy/outline-ru`.
- По умолчанию отключена проверка обновлений оригинального Outline.
- Удалены GitHub workflow-файлы оригинального проекта, которые не нужны в этом
  fork.

## Быстрый Запуск

Если нужно просто запустить готовый образ на сервере, используйте пример из
`deploy/outline-ru`:

```bash
cd deploy/outline-ru
cp .env.example .env
cp dex-config.yaml.example dex-config.yaml
```

Заполните `.env` и `dex-config.yaml`, затем запустите сервисы:

```bash
docker compose pull
docker compose up -d
```

Полный список обязательных параметров описан в `deploy/outline-ru/README.md`.

## Проверка Русской Локализации

```bash
node scripts/check-ru-locale.mjs
```

Скрипт сравнивает файлы:

```text
shared/i18n/locales/en_US/translation.json
shared/i18n/locales/ru_RU/translation.json
```

Он показывает отсутствующие ключи, лишние ключи и значения, которые остались на
английском.

## Локальная Сборка Docker-Образа

Для запуска примера сборка не нужна: compose использует готовый образ из GHCR.
Собирайте образ локально только тогда, когда нужно опубликовать новую версию.

Сборка базового образа:

```bash
docker build -f Dockerfile.base -t outline-ru-base:local .
```

Сборка runtime-образа:

```bash
docker build \
  --build-arg BASE_IMAGE=outline-ru-base:local \
  -t ghcr.io/arturstm/outline-ru:latest .
```

## Готовый Образ

Для запуска на сервере используется образ:

```text
ghcr.io/arturstm/outline-ru:latest
```

## Запуск На Сервере

Файлы для запуска находятся в:

```text
deploy/outline-ru
```

Подробная инструкция: `deploy/outline-ru/README.md`.

## Обновление Из Upstream

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

При конфликтах в первую очередь проверьте:

```text
shared/i18n/locales/ru_RU/translation.json
shared/i18n/index.ts
shared/utils/date.ts
```

После merge повторно запустите проверку локализации:

```bash
node scripts/check-ru-locale.mjs
```

Отправка fork в GitHub:

```bash
git push origin main
```

## Лицензия

Этот fork основан на Outline и распространяется на условиях оригинальной
лицензии из `LICENSE`.

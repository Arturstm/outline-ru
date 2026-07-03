# Local Outline RU Test

Build local image from repository root:

```bash
docker build -f Dockerfile.base -t outline-ru-base:local .
docker build --build-arg BASE_IMAGE=outline-ru-base:local -t outline-ru:local .
```

Start:

```bash
cd deploy/local
docker compose up -d
docker compose logs -f
```

Open:

```text
https://localhost:3443
```

Accept the browser certificate warning for the local Caddy certificate.

Login through Dex:

```text
admin@example.com
password
```

Stop:

```bash
docker compose down
```

Delete local data:

```bash
docker compose down -v
```

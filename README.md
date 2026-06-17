# Wildmint Calendar

Календарь и карта фестиваля **Дикая Мята 2026** — приложение для отслеживания исполнителей, расписания выступлений и сцен.

Основное приложение — `apps/wildmint-front`: расписание по дням и сценам, карта площадки, избранные выступления, PWA для офлайн-доступа.

## Разработка

Требуется [Bun](https://bun.sh/) 1.3+.

```sh
bun install
bun --filter wildmint-front dev
```

Сборка:

```sh
bun --filter wildmint-front build
bun --filter wildmint-front start
```

## Docker

Образ публикуется в [brofrong/wildmint-front](https://hub.docker.com/r/brofrong/wildmint-front) (CI: `.github/workflows/docker-wildmint-front.yml`).

### Запуск из Docker Hub

```yaml
# docker-compose.yml
services:
  wildmint-front:
    image: brofrong/wildmint-front:latest
    ports:
      - "3000:3000"
    environment:
      PORT: 3000
    restart: unless-stopped
```

```sh
docker compose up -d
```

Приложение будет доступно на http://localhost:3000

### Сборка образа локально

```yaml
# docker-compose.yml
services:
  wildmint-front:
    build:
      context: apps/wildmint-front
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      PORT: 3000
    restart: unless-stopped
```

```sh
docker compose up -d --build
```

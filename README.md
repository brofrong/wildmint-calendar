# Дикая Мята — календарь фестиваля

**[Открыть приложение → wildmint.brofrong.ru](https://wildmint.brofrong.ru/)**

Неофициальный календарь фестиваля **Дикая Мята 2026**. Удобно смотреть расписание по сценам, отмечать любимых артистов и ориентироваться на карте площадки — прямо в браузере, без установки и регистрации.

> Сайт не связан с организаторами фестиваля. Это фановый проект: исходный код открыт, данные о вас никуда не отправляются.

## Что умеет

- **Любимые** — сохраняйте концерты сердечком и смотрите их списком по дням
- **Календарь** — расписание выступлений по сценам с переключением дней
- **Карта** — схема площадки фестиваля
- **Офлайн** — можно добавить на главный экран телефона и пользоваться без интернета

## Как выглядит

### Календарь

![Расписание выступлений по сценам](img/calendar.png)

### Карта

![Карта площадки фестиваля](img/map.png)

### Избранное

![Список любимых концертов](img/favorites.png)

---

## Для разработчиков

Основное приложение — `apps/wildmint-front`, production-сервер — `apps/wildmint-back`.

### Разработка

Требуется [Bun](https://bun.sh/) 1.3+.

```sh
bun install
bun --filter wildmint-front dev
```

Сборка и запуск production-сервера:

```sh
bun --filter wildmint-front build
bun --filter wildmint-back start
```

### Docker

Образ публикуется в [brofrong/wildmint-front](https://hub.docker.com/r/brofrong/wildmint-front) (CI: `.github/workflows/docker-wildmint-front.yml`).

В репозитории есть готовый [`docker-compose.yml`](docker-compose.yml) с volume для SQLite.

#### Запуск

```sh
docker compose up -d --build
```

Приложение: http://localhost:3000

#### Volume для базы данных

SQLite хранится в файле `wildmint.sqlite`. При старте контейнера миграции применяются автоматически.

**Рекомендуется монтировать директорию, а не сам файл** — так SQLite корректно работает с WAL и при пересоздании контейнера:

```yaml
services:
  wildmint:
    image: brofrong/wildmint-front:latest
    ports:
      - "3000:3000"
    environment:
      PORT: "3000"
      DB_FILE_NAME: /app/db/wildmint.sqlite
    volumes:
      - wildmint-db:/app/db
    restart: unless-stopped

volumes:
  wildmint-db:
```

Для локальной разработки можно использовать bind mount вместо named volume:

```yaml
    volumes:
      - ./data/db:/app/db
```

Папку `data/db` нужно создать заранее (`mkdir -p data/db`). Файл базы появится после первого запуска.

#### Полезные команды

```sh
# логи
docker compose logs -f wildmint

# остановить, данные в volume сохранятся
docker compose down

# удалить контейнер и volume (данные БД будут потеряны)
docker compose down -v
```

Лицензия: [MIT](LICENSE)

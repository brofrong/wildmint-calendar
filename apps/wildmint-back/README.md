# wildmint-back

Production-сервер: раздаёт собранный фронтенд и SSR-обработчик TanStack Start.

## Запуск

Сначала соберите фронтенд:

```sh
bun --filter wildmint-front build
```

Затем запустите сервер:

```sh
bun --filter wildmint-back start
```

Сервер слушает порт `3000` (или `PORT` из окружения).

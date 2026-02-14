# Docker для Django-приложений

Этот документ описывает использование **Docker** для контейнеризации Django-приложений, включая настройку контейнеров, работу с образами, томами, сетями, переменными окружения и оптимизацию сборки. Также рассматривается интеграция с CI/CD для автоматизации деплоя.

---

## Что такое Docker?

**Docker** — платформа для виртуализации на уровне операционной системы, которая позволяет создавать, управлять и запускать контейнеры — изолированные среды с приложениями и их зависимостями. Контейнеры обеспечивают единообразную работу приложения в разных окружениях (локально, на сервере, в облаке).

### Зачем использовать Docker?
1. **Лёгкий старт**: Конфигурация окружения в одном файле (`Dockerfile`).
2. **Управление пакетами**: Все зависимости изолированы внутри контейнера.
3. **Разные версии интерпретаторов**: Поддержка различных версий Python, Node.js и т.д.
4. **Локальная настройка**: Разные конфигурации для разработки, тестирования и продакшена.
5. **Стандартизация**: Единый формат для всех разработчиков и серверов.
6. **Безопасность**: Переменные окружения и ключи изолированы в контейнерах.

---

## Основные компоненты Docker

1. **Container**: Изолированный процесс, выполняющийся на хосте.
2. **Image**: Статический шаблон для создания контейнеров (например, `python:3.9`).
3. **Volumes**: Тома для хранения данных, независимых от контейнера.
4. **Networks**: Сети для общения или изоляции контейнеров.
5. **Docker CLI**: Командная строка для управления контейнерами.
6. **Docker Daemon**: Фоновая служба, управляющая контейнерами.
7. **REST API**: Интерфейс для взаимодействия с Docker.

---

## Контейнеры и образы

- **Container**: Запущенный экземпляр образа, содержащий приложение и его зависимости.
- **Image**: Статический "снимок" файловой системы и конфигурации для контейнера.

**Пример создания контейнера:**
```bash
docker run -it ubuntu bash
```

---

## Тома (Volumes)

**Тома** — выделенные области памяти для хранения данных, используемых контейнером. Они сохраняют данные даже после удаления контейнера.

**Bind Mount**: Монтирование локальной папки в контейнер.
```bash
docker run --name=nginx -d -v ~/nginxlogs:/var/log/nginx -p 5000:80 nginx
```
- `--name=nginx`: Имя контейнера.
- `-d`: Запуск в фоновом режиме.
- `-v ~/nginxlogs:/var/log/nginx`: Монтирование локальной папки `~/nginxlogs` в `/var/log/nginx` контейнера.
- `-p 5000:80`: Проксирование порта 5000 хоста на порт 80 контейнера.

---

## Сети (Networks)

Docker поддерживает различные сетевые драйверы для управления взаимодействием контейнеров:
- **bridge**: Изолированная сеть (по умолчанию).
- **host**: Контейнер использует сеть хоста.
- **overlay**: Для связи контейнеров на разных хостах (в Docker Swarm).
- **macvlan**: Назначение контейнеру собственного MAC-адреса.
- **none**: Без сети.
- **user-plugins**: Пользовательские плагины.

**Пример создания сети:**
```bash
docker network create my-network
docker run --network=my-network -d nginx
```

---

## Основы работы с Docker

### Процесс сборки
1. Базовый образ загружается из реестра (например, Docker Hub).
2. Образ собирается с помощью `Dockerfile` (настройки, зависимости, скрипты).
3. Контейнер запускается из собранного образа.

### Основные команды
1. **Запуск контейнера:**
   ```bash
   docker run -it busybox ash
   ```
   - Вывод показывает файловую систему контейнера и позволяет выполнять команды.

2. **Список запущенных контейнеров:**
   ```bash
   docker ps
   ```

3. **Список всех контейнеров (включая остановленные):**
   ```bash
   docker ps --all
   ```

4. **Запуск в фоновом режиме:**
   ```bash
   docker run -d nginx
   ```

5. **Просмотр логов:**
   ```bash
   docker logs <container_id>
   ```

6. **Проксирование портов:**
   ```bash
   docker run -d -p 8888:80 nginx
   curl localhost:8888
   ```

7. **Интерактивный доступ:**
   ```bash
   docker exec -it <container_id> bash
   ```

8. **Монтирование томов:**
   ```bash
   docker run -d -p 7777:80 -v /path/to/local:/usr/share/nginx/html nginx
   ```

9. **Инспектирование контейнера:**
   ```bash
   docker inspect <container_id>
   ```

10. **Остановка контейнера:**
    ```bash
    docker stop <container_id>
    ```

---

## Dockerfile для Django-приложения

Создайте файл `Dockerfile` в корне проекта:

```dockerfile
FROM python:3.9
WORKDIR /code
COPY . .
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000
CMD ["gunicorn", "stocks_products.wsgi:application", "--bind", "0.0.0.0:8000"]
```

**Пояснение:**
- `FROM python:3.9`: Базовый образ Python.
- `WORKDIR /code`: Рабочая директория.
- `COPY . .`: Копирование всех файлов проекта.
- `RUN pip install`: Установка зависимостей.
- `ENV`: Переменные окружения.
- `EXPOSE 8000`: Открытие порта.
- `CMD`: Запуск Gunicorn для Django.

Создайте файл `.dockerignore` для исключения ненужных файлов:
```
*.json
tests/
__pycache__/
*.pyc
.env
```

---

## Сборка и запуск образа

1. **Сборка образа:**
   ```bash
   docker build . --tag=api_n:v1
   ```

2. **Проверка образов:**
   ```bash
   docker image ls
   ```

3. **Запуск контейнера:**
   ```bash
   docker run -d -p 8778:8000 api_n:v1
   ```

4. **Проверка работы:**
   ```bash
   curl localhost:8778
   ```

---

## Оптимизация сборки

Для уменьшения размера образа используйте `python:3.9-alpine`:

```dockerfile
FROM python:3.9-alpine
RUN apk add --no-cache gcc musl-dev linux-headers postgresql-dev
WORKDIR /code
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["gunicorn", "stocks_products.wsgi:application", "--bind", "0.0.0.0:8000"]
```

**Пояснение:**
- `python:3.9-alpine`: Лёгкий образ (меньше размер).
- `apk add`: Установка компиляторов и библиотек для PostgreSQL.
- Копирование `requirements.txt` отдельно позволяет кэшировать зависимости.

**Сборка:**
```bash
docker build . --tag=api_n:v2
```

**Результат:** Размер образа уменьшается (например, с 1.63GB до ~378MB).

---

## Переменные окружения

Передавайте переменные окружения через флаг `-e` или файл `.env`:

```bash
docker run -d -p 7676:8000 -e MY_ENV=new_env api_n:v2
curl -X POST localhost:7676/ed -H "Content-Type: application/json" -d '{"name": "Petr"}'
```

**Использование `.env`:**
```bash
docker run --env-file .env -d -p 7676:8000 api_n:v2
```

---

## Docker Compose для Django + PostgreSQL

Для запуска Django и PostgreSQL в связке используйте `docker-compose.yml`:

```yaml
version: '3.8'
services:
  web:
    build: .
    image: api_n:v3
    ports:
      - "8000:8000"
    environment:
      - SECRET_KEY=${SECRET_KEY}
      - DEBUG=${DEBUG}
      - ALLOWED_HOSTS=${ALLOWED_HOSTS}
      - DB_ENGINE=${DB_ENGINE}
      - DB_NAME=${DB_NAME}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - DB_HOST=postgres
      - DB_PORT=5432
    depends_on:
      - postgres
    volumes:
      - .:/code
  postgres:
    image: postgres:12
    environment:
      - POSTGRES_DB=${DB_NAME}
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
volumes:
  postgres_data:
```

**Запуск:**
```bash
docker-compose up -d
```

**Пояснение:**
- `web`: Сервис с Django-приложением.
- `postgres`: Сервис с PostgreSQL.
- `volumes`: Сохранение данных PostgreSQL.
- `depends_on`: Указывает, что `web` зависит от `postgres`.

---

## Интеграция с CI/CD

Добавьте Docker в GitHub Actions для автоматизации сборки и деплоя.

### Обновление `ci-cd.yml`
```yaml
name: CI/CD
on:
  push:
    branches:
      - main
jobs:
  build-and-deploy:
    runs-on: ubuntu-22.04
    services:
      postgres:
        image: postgres:12
        env:
          POSTGRES_DB: ${{ secrets.DB_NAME }}
          POSTGRES_USER: ${{ secrets.DB_USER }}
          POSTGRES_PASSWORD: ${{ secrets.DB_PASSWORD }}
        ports:
          - 5432:5432
        options: --health-cmd pg_isready --health-interval 5s --health-timeout 5s --health-retries 5
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Python
        uses: actions/setup-python@v3
        with:
          python-version: 3.9

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Run tests
        run: python manage.py test
        env:
          SECRET_KEY: ${{ secrets.SECRET_KEY }}
          DEBUG: ${{ secrets.DEBUG_MODE }}
          ALLOWED_HOSTS: ${{ secrets.ALLOWED }}
          DB_ENGINE: ${{ secrets.DB_ENGINE }}
          DB_NAME: ${{ secrets.DB_NAME }}
          DB_USER: ${{ secrets.DB_USER }}
          DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
          DB_HOST: localhost
          DB_PORT: 5432

      - name: Build Docker image
        run: docker build . --tag=api_n:v${{ github.run_number }}

      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Push Docker image
        run: docker push api_n:v${{ github.run_number }}

      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            docker pull api_n:v${{ github.run_number }}
            docker stop django_app || true
            docker rm django_app || true
            docker run -d --name django_app -p 8000:8000 --env-file .env api_n:v${{ github.run_number }}
```

**Пояснение:**
- Сборка образа с тегом, основанным на номере сборки (`github.run_number`).
- Пуш образа в Docker Hub.
- Деплой на сервер через SSH с запуском нового контейнера.

**Настройка секретов:**
- В GitHub: **Settings > Secrets and variables > Actions**.
- Добавьте: `DOCKER_USERNAME`, `DOCKER_PASSWORD`, `SSH_KEY`, и переменные `.env`.

---

## Рекомендации

1. **Оптимизация:**
   - Используйте многоэтапную сборку для уменьшения размера образа:
     ```dockerfile
     FROM python:3.9-alpine AS builder
     RUN apk add --no-cache gcc musl-dev linux-headers postgresql-dev
     WORKDIR /code
     COPY requirements.txt .
     RUN pip install --no-cache-dir -r requirements.txt
     FROM python:3.9-alpine
     WORKDIR /code
     COPY --from=builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
     COPY . .
     EXPOSE 8000
     CMD ["gunicorn", "stocks_products.wsgi:application", "--bind", "0.0.0.0:8000"]
     ```

2. **Безопасность:**
   - Храните `.env` в GitHub Secrets, а не в репозитории.
   - Используйте SSH-ключи вместо паролей для деплоя.

3. **Мониторинг:**
   - Проверяйте логи контейнеров:
     ```bash
     docker logs <container_id>
     ```
   - Используйте `docker-compose logs` для нескольких сервисов.

4. **CI/CD:**
   - Настройте уведомления о сбоях pipeline в Slack/Telegram.
   - Добавьте линтинг (`flake8`, `black`) в CI.

5. **Облачные решения:**
   - Рассмотрите Kubernetes или AWS ECS для масштабирования.
   - Используйте Docker Hub или GitHub Container Registry для хранения образов.

---

## Полезные ресурсы
- [Docker Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
# Docker Compose для Django-приложений

Этот документ описывает использование **Docker Compose** для оркестрации контейнеров Django-приложения, PostgreSQL, pgAdmin и FastAPI-приложения. Рассматриваются настройка `docker-compose.yml`, управление сервисами, интеграция с CI/CD и рекомендации по оптимизации.

---

## Что такое Docker Compose?

**Docker Compose** — инструмент для управления несколькими контейнерами как единым приложением. Он позволяет описать сервисы, сети и тома в файле `docker-compose.yml` и автоматизировать их запуск, остановку и перезапуск.

### Оркестрация
Оркестрация — автоматизация управления жизненным циклом контейнеров: создание, запуск, масштабирование, обновление и удаление.

### Оркестраторы
- **Docker Compose**: Для локальной разработки и небольших проектов.
- **Docker Swarm**: Для кластеров (простая альтернатива Kubernetes).
- **Kubernetes**: Для сложных, масштабируемых приложений.

---

## Конфигурация `Dockerfile`

```dockerfile
FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["flask", "run"]
```

**Описание строк:**
- `FROM python:3.7-alpine`: Использует лёгкий базовый образ Python 3.7 на основе Alpine Linux.
- `WORKDIR /code`: Устанавливает рабочую директорию `/code` внутри контейнера.
- `ENV FLASK_APP=app.py`: Задаёт имя основного файла Flask-приложения.
- `ENV FLASK_RUN_HOST=0.0.0.0`: Указывает Flask слушать все сетевые интерфейсы.
- `RUN apk add --no-cache gcc musl-dev linux-headers`: Устанавливает компиляторы и библиотеки для сборки зависимостей.
- `COPY requirements.txt .`: Копирует файл зависимостей в рабочую директорию.
- `RUN pip install --no-cache-dir -r requirements.txt`: Устанавливает зависимости без кэширования pip.
- `COPY . .`: Копирует все файлы проекта в рабочую директорию.
- `EXPOSE 5000`: Открывает порт 5000 для Flask.
- `CMD ["flask", "run"]`: Запускает Flask-приложение.

---

## Конфигурация `docker-compose.yml`

```yaml
services:
  my_p_app:
    build: .
    image: my_p_app:latest
    ports:
      - "80:5000"
    volumes:
      - .:/code
    environment:
      - FLASK_ENV=development
    networks:
      - backend
  my_fastapi_app:
    build:
      context: ~/pythonProject/
    image: my_fastapi_app:latest
    ports:
      - "8888:5050"
    networks:
      - backend
  postgres:
    image: postgres:12-alpine
    env_file:
      - .env
    volumes:
      - pg_data:/var/lib/postgresql/data
      - ./logs:/var/log
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d test_db"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 10s
    networks:
      - backend
    ports:
      - "5432:5432"
  pgadmin:
    image: dpage/pgadmin4:latest
    ports:
      - "9999:80"
    env_file:
      - .pgadmin-env
    deploy:
      resources:
        limits:
          cpus: "0.1"
          memory: 1G
    networks:
      - backend
    depends_on:
      - postgres
volumes:
  pg_data:
networks:
  backend:
    driver: bridge
```

**Описание строк:**
- `services:`: Определяет сервисы (контейнеры).
  - `my_p_app:`: Сервис Flask-приложения.
    - `build: .`: Сборка образа из текущей директории (использует `Dockerfile`).
    - `image: my_p_app:latest`: Имя и тег для собранного образа.
    - `ports: - "80:5000"`: Проксирует порт 80 хоста на порт 5000 контейнера.
    - `volumes: - .:/code`: Монтирует текущую директорию в `/code` контейнера.
    - `environment: - FLASK_ENV=development`: Устанавливает режим разработки для Flask.
    - `networks: - backend`: Подключает сервис к сети `backend`.
  - `my_fastapi_app:`: Сервис FastAPI-приложения.
    - `build: context: ~/pythonProject/`: Сборка из указанной директории.
    - `image: my_fastapi_app:latest`: Имя и тег образа.
    - `ports: - "8888:5050"`: Проксирует порт 8888 хоста на порт 5050 контейнера.
    - `networks: - backend`: Подключает к сети `backend`.
  - `postgres:`: Сервис PostgreSQL.
    - `image: postgres:12-alpine`: Использует образ PostgreSQL 12 на Alpine.
    - `env_file: - .env`: Загружает переменные из файла `.env`.
    - `volumes:`: Монтирует том для данных и логов.
      - `pg_data:/var/lib/postgresql/data`: Сохраняет данные PostgreSQL.
      - `./logs:/var/log`: Монтирует локальную папку `logs` для логов.
    - `healthcheck:`: Проверяет готовность PostgreSQL.
      - `test: ["CMD-SHELL", "pg_isready -U postgres -d test_db"]`: Команда проверки.
      - `interval: 30s`: Интервал проверки.
      - `timeout: 10s`: Тайм-аут.
      - `retries: 5`: Количество попыток.
      - `start_period: 10s`: Время ожидания перед первой проверкой.
    - `networks: - backend`: Подключает к сети `backend`.
    - `ports: - "5432:5432"`: Проксирует порт PostgreSQL.
  - `pgadmin:`: Сервис pgAdmin.
    - `image: dpage/pgadmin4:latest`: Образ pgAdmin.
    - `ports: - "9999:80"`: Проксирует порт 9999 хоста на порт 80 контейнера.
    - `env_file: - .pgadmin-env`: Загружает переменные из файла `.pgadmin-env`.
    - `deploy: resources: limits:`: Ограничивает ресурсы.
      - `cpus: "0.1"`: Ограничение до 10% CPU.
      - `memory: 1G`: Ограничение памяти до 1 ГБ.
    - `networks: - backend`: Подключает к сети `backend`.
    - `depends_on: - postgres`: Ждёт запуска PostgreSQL.
- `volumes: pg_data:`: Определяет том для хранения данных PostgreSQL.
- `networks: backend: driver: bridge`: Создаёт изолированную сеть `bridge` для общения сервисов.

**Файл `.env`:**
```env
POSTGRES_DB=test_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres12
SECRET_KEY=123456789
DEBUG=True
ALLOWED_HOSTS=192.168.0.100
DB_ENGINE=django.db.backends.postgresql
DB_NAME=test_db
DB_USER=postgres
DB_PASSWORD=postgres12
DB_HOST=postgres
DB_PORT=5432
```

**Файл `.pgadmin-env`:**
```env
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
```

---

## Управляющие команды Docker Compose

1. **Запуск сервисов в фоновом режиме:**
   ```bash
   docker-compose up -d
   ```
   Запускает все сервисы, определённые в `docker-compose.yml`.

2. **Пересборка и запуск:**
   ```bash
   docker-compose up -d --build
   ```
   Перестраивает образы и запускает сервисы.

3. **Остановка сервисов:**
   ```bash
   docker-compose stop
   ```
   Останавливает все контейнеры, сохраняя их состояние.

4. **Остановка и удаление:**
   ```bash
   docker-compose down
   ```
   Останавливает и удаляет контейнеры, сети (тома сохраняются).

5. **Перезапуск сервисов:**
   ```bash
   docker-compose restart
   ```
   Перезапускает все сервисы.

6. **Список запущенных сервисов:**
   ```bash
   docker-compose ps
   ```
   Показывает статус контейнеров.

7. **Просмотр логов:**
   ```bash
   docker-compose logs
   docker-compose logs pgadmin
   ```
   Выводит логи всех сервисов или конкретного сервиса.

---

## Кэширование в Docker Compose

Кэширование ускоряет сборку за счёт сохранения неизменённых слоёв образа. Изменения в `requirements.txt` или коде приводят к инвалидации кэша.

**Оптимизация:**
- Копируйте `requirements.txt` отдельно от кода:
  ```dockerfile
  COPY requirements.txt .
  RUN pip install --no-cache-dir -r requirements.txt
  COPY . .
  ```
- Используйте `.dockerignore`:
  ```
  *.pyc
  __pycache__/
  .env
  .pgadmin-env
  logs/
  ```

---

## Запуск и тестирование

1. **Запуск сервисов:**
   ```bash
   docker-compose up -d --build
   ```

2. **Проверка логов:**
   ```bash
   docker-compose logs
   docker-compose logs pgadmin
   ```

3. **Проверка работоспособности:**
   ```bash
   curl localhost:80/        # Flask-приложение
   curl localhost:8888/      # FastAPI-приложение
   curl localhost:9999/      # pgAdmin (веб-интерфейс)
   ```

**Устранение проблем:**
- Если `curl localhost:80/` не работает, проверьте:
  - Логи: `docker-compose logs my_p_app`.
  - Существование файла `app.py` и правильность `FLASK_APP`.
  - Свободность порта 80 на хосте.
- Если pgAdmin недоступен, проверьте переменные в `.pgadmin-env`.

---

## Интеграция с CI/CD

Обновлённый `ci-cd.yml` для Docker Compose:

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
        image: postgres:12-alpine
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
          python-version: 3.7

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

      - name: Build and push Docker images
        run: |
          docker-compose build
          docker tag my_p_app:latest ${DOCKER_USERNAME}/my_p_app:v${{ github.run_number }}
          docker tag my_fastapi_app:latest ${DOCKER_USERNAME}/my_fastapi_app:v${{ github.run_number }}
          docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }}
          docker push ${DOCKER_USERNAME}/my_p_app:v${{ github.run_number }}
          docker push ${DOCKER_USERNAME}/my_fastapi_app:v${{ github.run_number }}
        env:
          DOCKER_USERNAME: ${{ secrets.DOCKER_USERNAME }}

      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /home/user/django_cicd
            docker-compose pull
            docker-compose up -d
```

**Описание строк:**
- `on: push: branches: - main`: Запускает pipeline при пуше в ветку `main`.
- `services: postgres:`: Запускает PostgreSQL для тестов.
- `steps:`:
  - `Checkout`: Клонирует репозиторий.
  - `Setup Python`: Устанавливает Python 3.7.
  - `Install dependencies`: Устанавливает зависимости проекта.
  - `Run tests`: Запускает тесты Django.
  - `Build and push Docker images`: Собирает образы, тегирует их с номером сборки и пушит в Docker Hub.
  - `Deploy to server`: Выполняет `docker-compose pull` и `up` на сервере через SSH.

**Настройка секретов в GitHub:**
- `DOCKER_USERNAME`, `DOCKER_PASSWORD`: Для Docker Hub.
- `SSH_HOST`, `SSH_USER`, `SSH_KEY`: Для SSH-доступа.
- Переменные `.env`: `SECRET_KEY`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, и т.д.

---

## Рекомендации

1. **Оптимизация:**
   - Используйте `alpine`-образы для уменьшения размера.
   - Примените многоэтапную сборку:
     ```dockerfile
     FROM python:3.7-alpine AS builder
     RUN apk add --no-cache gcc musl-dev linux-headers
     WORKDIR /code
     COPY requirements.txt .
     RUN pip install --no-cache-dir -r requirements.txt
     FROM python:3.7-alpine
     WORKDIR /code
     COPY --from=builder /usr/local/lib/python3.7/site-packages /usr/local/lib/python3.7/site-packages
     COPY . .
     CMD ["flask", "run"]
     ```
   - Кэшируйте зависимости в CI:
     ```yaml
     - name: Cache dependencies
       uses: actions/cache@v3
       with:
         path: ~/.cache/pip
         key: ${{ runner.os }}-pip-${{ hashFiles('**/requirements.txt') }}
     ```

2. **Безопасность:**
   - Храните `.env` и `.pgadmin-env` в GitHub Secrets.
   - Настройте HTTPS для pgAdmin с Let’s Encrypt.

3. **Мониторинг:**
   - Проверяйте состояние:
     ```bash
     docker-compose ps
     docker-compose logs
     ```
   - Логируйте в `/var/log` для анализа.

4. **CI/CD:**
   - Добавьте линтинг (`flake8`, `black`).
   - Настройте уведомления о сбоях в Slack/Telegram.

5. **Масштабирование:**
   - Используйте **Docker Swarm** или **Kubernetes** для продакшена.
   - Рассмотрите AWS ECS или Google Cloud Run.

---

## Полезные ресурсы
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)
- [pgAdmin Docker Hub](https://hub.docker.com/r/dpage/pgadmin4)
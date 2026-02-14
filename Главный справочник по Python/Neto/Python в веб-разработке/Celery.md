# Celery для распределённых задач

Этот документ описывает использование **Celery** для выполнения фоновых задач в Python-приложениях. Рассматривается настройка Celery с Redis в качестве брокера и backend, интеграция с Flask и Django, а также контейнеризация с помощью Docker Compose.

---

## Что такое Celery?

**Celery** — это распределённая очередь задач для выполнения длительных операций в фоновом режиме. Она позволяет асинхронно обрабатывать задачи, такие как отправка писем, обработка данных или распознавание лиц, не блокируя основной поток приложения.

### Плюсы Celery
1. **Фоновая обработка**: Выполнение долгих задач без блокировки приложения.
2. **Параллелизм**: Поддержка выполнения задач на нескольких воркерах.
3. **Масштабируемость**: Интеграция с брокерами сообщений (Redis, RabbitMQ).

### Когда использовать Celery
1. **Долгие задачи**: Например, обработка видео, распознавание лиц.
2. **Масштабируемые приложения**: Для распределённой обработки задач.
3. **Микросервисы**: Для асинхронного выполнения задач.

### Схема работы Celery
```
Клиент → Веб-сервер → Очередь задач (Redis/RabbitMQ) → Воркер (Celery) → Result Backend
```
**Пример**: В сервисе распознавания лиц клиент отправляет запрос на сервер, сервер ставит задачу в очередь Redis, воркер Celery выполняет задачу (например, анализ изображения), а результат сохраняется в Redis.

---

## Пример Celery

### Установка
```bash
pip install celery redis
```

### tasks.py
```python
import time
import celery
from models import Session, User

app = celery.Celery(
    broker="redis://redis:6379/0",  # Redis как брокер
    backend="redis://redis:6379/1",  # Redis как backend
    broker_connection_retry_on_startup=True
)

app.conf.update(
    task_serializer='json',  # Сериализация задач в JSON
    accept_content=['json'],  # Принимает JSON
    result_serializer='json',  # Сериализация результатов в JSON
    timezone='UTC',  # Часовой пояс
    enable_utc=True,  # Включает UTC
    worker_pool_restarts=True,  # Перезапуск пула воркеров
    worker_prefetch_multiplier=1,  # Ограничивает количество задач на воркер
)

@app.task
async def process_user_task(user_id: int):
    async with Session() as session:  # Асинхронная сессия SQLAlchemy
        user = await session.get(User, user_id)  # Получает пользователя
        if user is None:
            return {"status": "error", "message": "User not found"}
        time.sleep(0.5)  # Симулирует долгую задачу
        return {"status": "success", "user_id": user_id, "name": user.name}
```

**Описание:**
- `celery.Celery(...)`: Создаёт экземпляр Celery с Redis как брокером и backend.
  - `broker`: URL Redis для очереди задач.
  - `backend`: URL Redis для хранения результатов.
  - `broker_connection_retry_on_startup=True`: Повторяет попытки подключения.
- `app.conf.update(...)`: Конфигурирует Celery для работы с JSON и UTC.
- `process_user_task(user_id)`: Асинхронная задача, которая получает пользователя из базы и возвращает результат после "долгой" операции (симулируется `time.sleep`).

### main.py
```python
import datetime
from tasks import process_user_task

def main():
    async_result_1 = process_user_task.delay(1)  # Запускает задачу для user_id=1
    async_result_2 = process_user_task.delay(2)  # Запускает задачу для user_id=2
    async_result_3 = process_user_task.delay(3)  # Запускает задачу для user_id=3
    async_result_4 = process_user_task.delay(4)  # Запускает задачу для user_id=4
    print(async_result_1.get(), async_result_2.get(), async_result_3.get(), async_result_4.get())  # Получает результаты

start = datetime.datetime.now()
main()
end = datetime.datetime.now()
print(f"Time spent: {end - start}")
```

**Описание:**
- `process_user_task.delay(...)`: Отправляет задачу в очередь Celery.
- `async_result_*.get()`: Ожидает завершения задачи и возвращает результат.
- Измеряет время выполнения всех задач.

### models.py
```python
import datetime
import os
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncAttrs
from sqlalchemy.orm import DeclarativeBase, mapped_column, Mapped
from sqlalchemy import DateTime, Integer, String, func
from dotenv import load_dotenv

load_dotenv()  # Загружает переменные окружения

POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "secret")  # Пароль
POSTGRES_USER = os.getenv("POSTGRES_USER", "swapi")  # Пользователь
POSTGRES_DB = os.getenv("POSTGRES_DB", "swapi")  # База данных
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "localhost")  # Хост
POSTGRES_PORT = int(os.getenv("POSTGRES_PORT", 5432))  # Порт

PG_DNS = f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"  # Строка подключения

engine = create_async_engine(PG_DNS)  # Асинхронный движок
Session = async_sessionmaker(engine, expire_on_commit=False)  # Фабрика сессий

class Base(DeclarativeBase, AsyncAttrs):
    pass  # Базовый класс для моделей

class User(Base):
    __tablename__ = "app_users"  # Имя таблицы
    id: Mapped[int] = mapped_column(Integer, primary_key=True)  # Первичный ключ
    name: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)  # Уникальное имя
    password: Mapped[str] = mapped_column(String(100), nullable=False)  # Хэшированный пароль
    registration_time: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=func.now())  # Время регистрации

    def dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "registration_time": int(self.registration_time.timestamp()),
        }  # Возвращает данные в формате JSON
```

**Описание:**
- `load_dotenv()`: Загружает переменные окружения из `.env`.
- `POSTGRES_*`: Переменные для подключения к PostgreSQL.
- `PG_DNS`: Строка подключения для асинхронного SQLAlchemy.
- `engine`: Асинхронный движок SQLAlchemy.
- `Session`: Фабрика асинхронных сессий.
- `Base`: Базовый класс для ORM-моделей.
- `User`: Модель для хранения данных пользователей.
  - `id`: Первичный ключ.
  - `name`: Уникальное имя (индексированное).
  - `password`: Хэшированный пароль.
  - `registration_time`: Время регистрации.
  - `dict()`: Возвращает данные в формате JSON.

### docker-compose.yml
```yaml
services:
  db:
    image: postgres:14.3-alpine
    ports:
      - "5431:5432"
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 10s
    networks:
      - backend
  redis:
    image: redis:7.0-alpine
    ports:
      - "6379:6379"
    networks:
      - backend
  worker:
    build: .
    image: celery_app:latest
    command: celery -A tasks.app worker --pool=solo --loglevel=info
    depends_on:
      - redis
      - db
    environment:
      - POSTGRES_HOST=db
      - POSTGRES_PORT=5432
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    volumes:
      - .:/code
    networks:
      - backend
volumes:
  postgres_data:
networks:
  backend:
    driver: bridge
```

**Описание:**
- `db`: Сервис PostgreSQL.
  - `image`: PostgreSQL 14.3 на Alpine.
  - `ports`: Проксирует порт 5431 хоста на 5432 контейнера.
  - `environment`: Переменные из `.env`.
  - `volumes`: Сохраняет данные базы.
  - `healthcheck`: Проверяет готовность базы.
  - `networks`: Подключает к сети `backend`.
- `redis`: Сервис Redis для Celery.
  - `image`: Redis 7.0 на Alpine.
  - `ports`: Проксирует порт 6379.
  - `networks`: Подключает к сети `backend`.
- `worker`: Сервис воркера Celery.
  - `build`: Сборка из текущей директории.
  - `image`: Имя образа.
  - `command`: Запускает воркер Celery.
  - `depends_on`: Ждёт запуска `redis` и `db`.
  - `environment`: Переменные для подключения к базе и Redis.
  - `volumes`: Монтирует код.
  - `networks`: Подключает к сети `backend`.
- `volumes`: Том для данных PostgreSQL.
- `networks`: Изолированная сеть `bridge`.

### .env
```env
POSTGRES_USER=user
POSTGRES_PASSWORD=1234
POSTGRES_DB=netology
POSTGRES_HOST=db
POSTGRES_PORT=5432
REDIS_HOST=redis
REDIS_PORT=6379
```

### Dockerfile
```dockerfile
FROM python:3.7-alpine
WORKDIR /code
RUN apk add --no-cache gcc musl-dev linux-headers postgresql-dev
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "main.py"]
```

**Описание:**
- `FROM python:3.7-alpine`: Лёгкий образ Python.
- `WORKDIR /code`: Рабочая директория.
- `RUN apk add ...`: Устанавливает зависимости для PostgreSQL.
- `COPY requirements.txt .`: Копирует зависимости.
- `RUN pip install ...`: Устанавливает пакеты.
- `COPY . .`: Копирует код.
- `CMD ["python", "main.py"]`: Запускает `main.py` (для воркера переопределяется в `docker-compose.yml`).

**requirements.txt:**
```
celery==5.2.7
redis==4.3.4
sqlalchemy==1.4.40
asyncpg==0.27.0
python-dotenv==0.20.0
```

---

## Интеграция Celery с Flask

### Flask-приложение (app.py)
```python
from flask import Flask, jsonify
from celery import Celery
from models import Session, User
from sqlalchemy.ext.asyncio import AsyncSession

app = Flask(__name__)

# Настройка Celery
celery = Celery(
    app.name,
    broker='redis://redis:6379/0',
    backend='redis://redis:6379/1',
    broker_connection_retry_on_startup=True
)

celery.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='UTC',
    enable_utc=True,
)

# Пример задачи
@celery.task
async def process_user_task(user_id: int):
    async with Session() as session:  # Асинхронная сессия
        user = await session.get(User, user_id)  # Получает пользователя
        if user is None:
            return {"status": "error", "message": "User not found"}
        time.sleep(0.5)  # Симулирует долгую задачу
        return {"status": "success", "user_id": user_id, "name": user.name}

@app.route('/process/<int:user_id>', methods=['POST'])
async def process_user(user_id):
    task = process_user_task.delay(user_id)  # Запускает задачу
    return jsonify({"task_id": task.id}), 202

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9999)
```

**Запуск воркера:**
```bash
celery -A app.celery worker --pool=solo --loglevel=info
```

**Описание:**
- `Celery(app.name, ...)`: Создаёт экземпляр Celery.
- `process_user_task`: Асинхронная задача, которая получает данные пользователя.
- `/process/<user_id>`: Запускает задачу и возвращает её ID.

### Обновлённый docker-compose.yml для Flask
```yaml
services:
  db:
    image: postgres:14.3-alpine
    ports:
      - "5431:5432"
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 10s
    networks:
      - backend
  redis:
    image: redis:7.0-alpine
    ports:
      - "6379:6379"
    networks:
      - backend
  app:
    build: .
    image: flask_app:latest
    ports:
      - "9999:9999"
    depends_on:
      - db
      - redis
    environment:
      - POSTGRES_HOST=db
      - POSTGRES_PORT=5432
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    volumes:
      - .:/code
    networks:
      - backend
  worker:
    build: .
    image: flask_app:latest
    command: celery -A app.celery worker --pool=solo --loglevel=info
    depends_on:
      - redis
      - db
    environment:
      - POSTGRES_HOST=db
      - POSTGRES_PORT=5432
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    volumes:
      - .:/code
    networks:
      - backend
volumes:
  postgres_data:
networks:
  backend:
    driver: bridge
```

---

## Интеграция Celery с Django

### settings.py
```python
CELERY_BROKER_URL = 'redis://redis:6379/0'
CELERY_RESULT_BACKEND = 'redis://redis:6379/1'
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'
```

### myapp/tasks.py
```python
from celery import shared_task
import time
from myapp.models import User

@shared_task
def process_user_task(user_id):
    user = User.objects.get(id=user_id)  # Получает пользователя
    if user is None:
        return {"status": "error", "message": "User not found"}
    time.sleep(0.5)  # Симулирует долгую задачу
    return {"status": "success", "user_id": user_id, "name": user.name}
```

### myapp/views.py
```python
from django.http import JsonResponse
from myapp.tasks import process_user_task

def process_user(request, user_id):
    task = process_user_task.delay(user_id)  # Запускает задачу
    return JsonResponse({"task_id": task.id}, status=202)
```

**Запуск воркера:**
```bash
celery -A myproject worker --pool=solo --loglevel=info
```

**Описание:**
- `CELERY_BROKER_URL`, `CELERY_RESULT_BACKEND`: Настройки Celery в Django.
- `process_user_task`: Задача для обработки данных пользователя.
- `process_user`: View для запуска задачи.

### Обновлённый docker-compose.yml для Django
```yaml
services:
  db:
    image: postgres:14.3-alpine
    ports:
      - "5431:5432"
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 10s
    networks:
      - backend
  redis:
    image: redis:7.0-alpine
    ports:
      - "6379:6379"
    networks:
      - backend
  app:
    build: .
    image: django_app:latest
    ports:
      - "8000:8000"
    command: python manage.py runserver 0.0.0.0:8000
    depends_on:
      - db
      - redis
    environment:
      - POSTGRES_HOST=db
      - POSTGRES_PORT=5432
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    volumes:
      - .:/code
    networks:
      - backend
  worker:
    build: .
    image: django_app:latest
    command: celery -A myproject worker --pool=solo --loglevel=info
    depends_on:
      - redis
      - db
    environment:
      - POSTGRES_HOST=db
      - POSTGRES_PORT=5432
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    volumes:
      - .:/code
    networks:
      - backend
volumes:
  postgres_data:
networks:
  backend:
    driver: bridge
```

---

## Запуск и тестирование

1. **Установка зависимостей:**
   ```bash
   pip install celery redis sqlalchemy asyncpg python-dotenv
   ```

2. **Запуск Docker Compose:**
   ```bash
   docker-compose up -d --build
   ```

3. **Запуск воркера Celery:**
   ```bash
   docker-compose exec worker celery -A tasks.app worker --pool=solo --loglevel=info
   ```

4. **Запуск main.py для тестирования:**
   ```bash
   python main.py
   ```

5. **Проверка логов:**
   ```bash
   docker-compose logs
   ```

---

## CI/CD

### .github/workflows/ci-cd.yml
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
        image: postgres:14.3-alpine
        env:
          POSTGRES_DB: ${{ secrets.DB_NAME }}
          POSTGRES_USER: ${{ secrets.DB_USER }}
          POSTGRES_PASSWORD: ${{ secrets.DB_PASSWORD }}
        ports:
          - 5432:5432
        options: --health-cmd pg_isready --health-interval 5s --health-timeout 5s --health-retries 5
      redis:
        image: redis:7.0-alpine
        ports:
          - 6379:6379
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
        run: python -m unittest discover
        env:
          POSTGRES_DB: ${{ secrets.DB_NAME }}
          POSTGRES_USER: ${{ secrets.DB_USER }}
          POSTGRES_PASSWORD: ${{ secrets.DB_PASSWORD }}
          POSTGRES_HOST: localhost
          POSTGRES_PORT: 5432
          REDIS_HOST: localhost
          REDIS_PORT: 6379
      - name: Build and push Docker image
        run: |
          docker-compose build
          docker tag celery_app:latest ${DOCKER_USERNAME}/celery_app:v${{ github.run_number }}
          docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }}
          docker push ${DOCKER_USERNAME}/celery_app:v${{ github.run_number }}
        env:
          DOCKER_USERNAME: ${{ secrets.DOCKER_USERNAME }}
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /home/user/celery_app
            docker-compose pull
            docker-compose up -d
```

**Описание:**
- Запускает тесты, сборку и деплой при пуше в `main`.
- Использует сервисы PostgreSQL и Redis для тестов.
- Пушит образ в Docker Hub.
- Деплоит через SSH.

**Секреты:**
- `DOCKER_USERNAME`, `DOCKER_PASSWORD`
- `SSH_HOST`, `SSH_USER`, `SSH_KEY`
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`

---

## Рекомендации

1. **Оптимизация:**
   - Используйте многоэтапную сборку:
     ```dockerfile
     FROM python:3.7-alpine AS builder
     RUN apk add --no-cache gcc musl-dev linux-headers postgresql-dev
     WORKDIR /code
     COPY requirements.txt .
     RUN pip install --no-cache-dir -r requirements.txt
     FROM python:3.7-alpine
     WORKDIR /code
     COPY --from=builder /usr/local/lib/python3.7/site-packages /usr/local/lib/python3.7/site-packages
     COPY . .
     CMD ["python", "main.py"]
     ```

2. **Безопасность:**
   - Храните `.env` в GitHub Secrets.
   - Используйте безопасные пароли для Redis.
   - Настройте аутентификацию для Redis.

3. **Мониторинг:**
   - Используйте `docker-compose logs`.
   - Настройте Flower для мониторинга Celery: `celery -A tasks.app flower`.
   - Добавьте Prometheus для метрик.

4. **CI/CD:**
   - Добавьте линтинг (`flake8`, `black`).
   - Настройте уведомления в Slack.

5. **Масштабирование:**
   - Используйте Kubernetes или AWS ECS.
   - Настройте несколько воркеров Celery: `celery -A tasks.app worker --pool=gevent --concurrency=10`.

---

## Полезные ресурсы
- [Celery Documentation](https://docs.celeryproject.org/)
- [Redis Documentation](https://redis.io/documentation)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Asyncpg Documentation](https://magicstack.github.io/asyncpg/)
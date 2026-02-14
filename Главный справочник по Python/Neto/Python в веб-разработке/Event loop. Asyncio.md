# # Асинхронное приложение Flask с SWAPI и PostgreSQL

Этот документ описывает асинхронное Flask-приложение, которое взаимодействует с API SWAPI (Star Wars API) для получения данных о персонажах и сохранения их в базу данных PostgreSQL с использованием SQLAlchemy. Код включает асинхронные запросы с библиотекой `aiohttp`, обработку данных с помощью `more_itertools` и интеграцию с Docker Compose.

---

## Обзор кода

Код представляет собой асинхронный скрипт, который загружает данные о персонажах из SWAPI, обрабатывает их и сохраняет в PostgreSQL. Используются библиотеки `aiohttp` для HTTP-запросов, `asyncio` для асинхронного выполнения, `more_itertools` для разделения данных на части и SQLAlchemy для работы с базой данных.

---

## Код и его описание

```python
import aiohttp
import asyncio
import datetime
from models import init_orm, Session, Swapi_people
from more_itertools import chunked

MAX_CHUNKS = 10  # Максимальное количество ID в одном запросе

async def get_people(people_id, session):
    async with session.get(f"https://swapi.dev/api/people/{people_id}/", ssl=False) as response:
        json_data = await response.json()  # Получает JSON-ответ от API
        return json_data  # Возвращает данные персонажа

async def save_to_db(person_data):
    async with Session() as session:  # Создаёт асинхронную сессию SQLAlchemy
        orm_objects = [Swapi_people(json=people_json) for people_json in person_data]  # Создаёт ORM-объекты
        session.add_all(orm_objects)  # Добавляет объекты в сессию
        await session.commit()  # Фиксирует изменения в базе данных

async def main():
    await init_orm()  # Инициализирует ORM (создаёт таблицы в базе данных)
    async with aiohttp.ClientSession() as session:  # Создаёт HTTP-сессию
        people_ids = chunked(range(1, 10), MAX_CHUNKS)  # Разбивает ID на части
        for chunk in people_ids:  # Обрабатывает каждую часть
            coros = [get_people(people_id, session) for people_id in chunk]  # Создаёт корутины для запросов
            results = await asyncio.gather(*coros)  # Выполняет запросы параллельно
            asyncio.create_task(save_to_db(results))  # Запускает задачу сохранения

        main_task = asyncio.current_task()  # Получает текущую задачу
        current_tasks = asyncio.all_tasks()  # Получает все задачи
        current_tasks.remove(main_task)  # Удаляет текущую задачу
        await asyncio.gather(*current_tasks)  # Ожидает завершения всех задач

start = datetime.datetime.now()  # Записывает время начала
asyncio.run(main())  # Запускает асинхронную функцию
end = datetime.datetime.now()  # Записывает время окончания
print(f"Time spent: {end - start}")  # Выводит время выполнения
```

### Описание функций и классов

1. **Переменная `MAX_CHUNKS`**:
   - Определяет максимальное количество ID персонажей в одном запросе (10).
   - Используется для разбиения запросов с помощью `chunked`.

2. **Функция `get_people(people_id, session)`**:
   - **Параметры**:
     - `people_id`: ID персонажа для запроса к SWAPI.
     - `session`: Объект `aiohttp.ClientSession` для HTTP-запросов.
   - **Действие**: Выполняет асинхронный GET-запрос к `https://swapi.dev/api/people/{people_id}/`.
   - **Возвращает**: JSON-данные персонажа.
   - **Примечание**: `ssl=False` отключает проверку SSL (не рекомендуется для продакшена).

3. **Функция `save_to_db(person_data)`**:
   - **Параметры**:
     - `person_data`: Список JSON-данных персонажей.
   - **Действие**: Создаёт ORM-объекты `Swapi_people` и сохраняет их в базу данных через асинхронную сессию SQLAlchemy.
   - **Примечание**: Использует асинхронный контекст для управления сессией.

4. **Функция `main()`**:
   - **Действие**:
     - Инициализирует ORM с помощью `init_orm()`.
     - Создаёт HTTP-сессию с `aiohttp.ClientSession`.
     - Разбивает диапазон ID (1–9) на части с помощью `chunked`.
     - Выполняет параллельные запросы к SWAPI с помощью `asyncio.gather`.
     - Запускает задачи сохранения данных в базу с помощью `asyncio.create_task`.
     - Ожидает завершения всех задач.
   - **Примечание**: Использует `asyncio.all_tasks()` для ожидания завершения всех задач сохранения.

5. **Класс `Swapi_people` (в `models.py`)**:
   - **Описание**: ORM-модель SQLAlchemy для хранения данных персонажей.
   - **Поля**:
     - `id`: Первичный ключ (автоинкремент).
     - `json`: JSON-данные персонажа (хранятся как JSONB в PostgreSQL).
   - **Назначение**: Сохраняет данные из SWAPI в базе данных.

6. **Функция `init_orm` (в `models.py`)**:
   - **Описание**: Инициализирует таблицы в базе данных.
   - **Действие**: Вызывает `Base.metadata.create_all(bind=engine)` для создания таблиц.

7. **Класс `Session` (в `models.py`)**:
   - **Описание**: Асинхронная сессия SQLAlchemy для взаимодействия с базой данных.
   - **Действие**: Используется для выполнения операций с базой данных (добавление, коммит).

---

## Модели (models.py)

```python
from sqlalchemy import create_engine, JSON
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from sqlalchemy import Column, Integer
import os
from dotenv import load_dotenv

load_dotenv()

POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")
POSTGRES_HOST = os.getenv("POSTGRES_HOST")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")

PG_DSN = f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"

engine = create_async_engine(PG_DSN)
Session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

class Base(DeclarativeBase):
    pass

class Swapi_people(Base):
    __tablename__ = "swapi_people"

    id = Column(Integer, primary_key=True)
    json = Column(JSON, nullable=False)

async def init_orm():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
```

**Описание:**
- `load_dotenv()`: Загружает переменные окружения из `.env`.
- `POSTGRES_*`: Переменные для подключения к PostgreSQL.
- `PG_DSN`: Строка подключения для асинхронного SQLAlchemy (`asyncpg`).
- `engine`: Асинхронный движок SQLAlchemy.
- `Session`: Фабрика асинхронных сессий.
- `Base`: Базовый класс для ORM-моделей.
- `Swapi_people`: Модель для хранения JSON-данных персонажей.
- `init_orm()`: Создаёт таблицы в базе данных.

**Файл `.env`:**
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres12
POSTGRES_DB=test_db
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

---

## Flask-приложение (server.py)

```python
from flask import Flask, jsonify
from models import Session, Swapi_people
from sqlalchemy.ext.asyncio import AsyncSession

app = Flask(__name__)

@app.route("/people/<int:people_id>", methods=["GET"])
async def get_person(people_id):
    async with Session() as session:  # Асинхронная сессия
        person = await session.get(Swapi_people, people_id)  # Получает запись по ID
        if person is None:
            return jsonify({"status": "error", "message": "Person not found"}), 404
        return jsonify(person.json)  # Возвращает JSON-данные

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9999, debug=True)
```

**Описание:**
- `Flask(__name__)`: Создаёт экземпляр Flask.
- `get_person(people_id)`: Асинхронная функция, возвращающая данные персонажа по ID из базы данных.
  - Использует `AsyncSession` для асинхронного доступа к базе.
  - Возвращает JSON или ошибку 404.
- `app.run()`: Запускает сервер на порту 9999.

---

## Docker Compose (docker-compose.yml)

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
      - pg_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d test_db"]
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 10s
    networks:
      - backend
  app:
    build: .
    image: swapi_app:latest
    ports:
      - "9999:9999"
    depends_on:
      - db
    environment:
      - POSTGRES_HOST=db
      - POSTGRES_PORT=5432
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - .:/code
    networks:
      - backend
volumes:
  pg_data:
networks:
  backend:
    driver: bridge
```

**Описание:**
- `db`: Сервис PostgreSQL.
  - `image`: PostgreSQL 14.3 на Alpine.
  - `ports`: Проксирует порт 5431.
  - `environment`: Переменные окружения из `.env`.
  - `volumes`: Сохраняет данные базы.
  - `healthcheck`: Проверяет готовность базы.
- `app`: Сервис Flask-приложения.
  - `build`: Сборка из текущей директории.
  - `image`: Имя образа.
  - `ports`: Проксирует порт 9999.
  - `depends_on`: Ждёт запуска базы данных.
  - `environment`: Переменные для подключения к базе.
  - `volumes`: Монтирует код.
- `volumes`: Том для данных PostgreSQL.
- `networks`: Изолированная сеть `bridge`.

---

## Dockerfile

```dockerfile
FROM python:3.7-alpine
WORKDIR /code
RUN apk add --no-cache gcc musl-dev linux-headers postgresql-dev
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 9999
CMD ["python", "server.py"]
```

**Описание:**
- `FROM python:3.7-alpine`: Лёгкий образ Python.
- `WORKDIR /code`: Рабочая директория.
- `RUN apk add ...`: Устанавливает зависимости для PostgreSQL.
- `COPY requirements.txt .`: Копирует зависимости.
- `RUN pip install ...`: Устанавливает Python-пакеты.
- `COPY . .`: Копирует код.
- `EXPOSE 9999`: Открывает порт.
- `CMD ["python", "server.py"]`: Запускает сервер.

**Файл `requirements.txt`:**
```
aiohttp==3.8.3
sqlalchemy==1.4.40
psycopg2-binary==2.9.3
python-dotenv==0.20.0
more-itertools==8.13.0
asyncpg==0.27.0
flask==2.0.1
```

---

## Запуск и тестирование

1. **Установка зависимостей:**
   ```bash
   pip install aiohttp sqlalchemy psycopg2-binary python-dotenv more-itertools asyncpg flask
   ```

2. **Запуск Docker Compose:**
   ```bash
   docker-compose up -d --build
   ```

3. **Запуск скрипта для загрузки данных:**
   ```bash
   python main.py
   ```

4. **Проверка API:**
   ```bash
   curl http://localhost:9999/people/1/
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
      - name: Build and push Docker image
        run: |
          docker-compose build
          docker tag swapi_app:latest ${DOCKER_USERNAME}/swapi_app:v${{ github.run_number }}
          docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }}
          docker push ${DOCKER_USERNAME}/swapi_app:v${{ github.run_number }}
        env:
          DOCKER_USERNAME: ${{ secrets.DOCKER_USERNAME }}
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /home/user/swapi_app
            docker-compose pull
            docker-compose up -d
```

**Описание:**
- Запускает тесты, сборку и деплой при пуше в `main`.
- Тестирует с PostgreSQL.
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
     CMD ["python", "server.py"]
     ```

2. **Безопасность:**
   - Удалите `ssl=False` в продакшене.
   - Храните `.env` в GitHub Secrets.
   - Настройте HTTPS с Nginx.

3. **Мониторинг:**
   - Используйте `docker-compose logs` для отладки.
   - Добавьте Prometheus для мониторинга.

4. **CI/CD:**
   - Добавьте линтинг (`flake8`, `black`).
   - Настройте уведомления в Slack.

5. **Масштабирование:**
   - Используйте Kubernetes или AWS ECS.
   - Настройте балансировщик нагрузки.

---

## Полезные ресурсы
- [Flask Documentation](https://flask.palletsprojects.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [aiohttp Documentation](https://docs.aiohttp.org/)
- [SWAPI Documentation](https://swapi.dev/documentation)
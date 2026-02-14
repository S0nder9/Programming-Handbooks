# Aiohttp для асинхронных веб-приложений

Этот документ описывает создание асинхронного REST API с использованием **Aiohttp**, интегрированного с PostgreSQL через SQLAlchemy с асинхронным драйвером `asyncpg`. Приложение поддерживает CRUD-операции для пользователей, хэширование паролей с помощью `bcrypt`, а также интеграцию с Docker Compose для контейнеризации.

---

## Что такое Aiohttp?

**Aiohttp** — библиотека для создания асинхронных веб-приложений на Python. Она использует `asyncio` для обработки запросов и подходит для высокопроизводительных приложений.

### Плюсы Aiohttp
1. **Асинхронность**: Высокая производительность при обработке множества запросов.
2. **Гибкость**: Поддержка маршрутов, middleware и WebSocket.
3. **Лёгкость**: Простота настройки для REST API.

### Когда использовать Aiohttp
1. **Высоконагруженные сервисы**: Для обработки большого числа одновременных запросов.
2. **Микросервисы**: Для создания API с асинхронной логикой.
3. **WebSocket-приложения**: Для real-time взаимодействия.

---

## HTTP-методы и статусы

### Методы
1. **GET**: Получение данных.
2. **POST**: Создание данных.
3. **PATCH**: Частичное обновление данных.
4. **DELETE**: Удаление данных.

### Статусы
1. **200 OK**: Запрос успешен.
2. **400 Bad Request**: Неверный формат запроса.
3. **404 Not Found**: Ресурс не найден.
4. **409 Conflict**: Конфликт данных (например, дубликат).
5. **500 Internal Server Error**: Ошибка сервера.

---

## Простое приложение Aiohttp

### server.py (простой пример)
```python
from aiohttp import web

app = web.Application()

async def hello_world(response: web.Request) -> web.Response:
    http_response = web.json_response({"hello": "world"})  # Формирует JSON-ответ
    return http_response

app.add_routes([
    web.get('/', hello_world),  # Регистрирует маршрут для GET /
])

web.run_app(app, host='127.0.0.1', port=9999)  # Запускает сервер
```

**Описание:**
- `web.Application()`: Создаёт экземпляр приложения Aiohttp.
- `hello_world(response: web.Request)`: Асинхронная функция, возвращающая JSON `{ "hello": "world" }`.
- `app.add_routes(...)`: Регистрирует маршрут для GET-запроса на `/`.
- `web.run_app(...)`: Запускает сервер на порту 9999.

### client.py (простой пример)
```python
import aiohttp
import asyncio

async def main():
    async with aiohttp.ClientSession() as session:  # Создаёт HTTP-сессию
        async with session.get('http://127.0.0.1:9999/') as response:  # Выполняет GET-запрос
            print(response.status)  # Выводит статус ответа (200)
            print(await response.text())  # Выводит тело ответа

asyncio.run(main())  # Запускает асинхронную функцию
```

**Описание:**
- `aiohttp.ClientSession()`: Создаёт асинхронную HTTP-сессию.
- `session.get(...)`: Выполняет GET-запрос к серверу.
- `response.status`: Показывает HTTP-статус.
- `response.text()`: Возвращает тело ответа в виде текста.

**Тестирование:**
- Запустите `server.py`: `python server.py`.
- Запустите `client.py`: `python client.py`.
- Перейдите в браузере: `http://127.0.0.1:9999`.

---

## Сложное приложение Aiohttp

### server.py
```python
from aiohttp import web
from models import Base, User, Session, engine
import json
from sqlalchemy.ext.asyncio import AsyncSession
import bcrypt
from sqlalchemy.exc import IntegrityError

app = web.Application()

async def orm_context(app):
    print("START")  # Логирует начало работы
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)  # Создаёт таблицы
    yield  # Уступает управление
    await engine.dispose()  # Закрывает соединение
    print("FINISH")  # Логирует завершение

app.cleanup_ctx.append(orm_context)  # Добавляет контекст для ORM

async def hello_world(request: web.Request) -> web.Response:
    json_data = await request.json()  # Получает JSON из тела запроса
    qs = request.query  # Получает параметры запроса
    headers = request.headers  # Получает заголовки
    some_variable = int(request.match_info["some_variable"])  # Извлекает параметр из URL
    print(json_data, qs, headers, some_variable)  # Логирует данные
    return web.json_response({"hello": "world"})  # Возвращает JSON-ответ

async def add_user(session: AsyncSession, user: User) -> None:
    try:
        session.add(user)  # Добавляет пользователя в сессию
        await session.commit()  # Фиксирует изменения
    except IntegrityError:
        await session.rollback()  # Откат при ошибке уникальности
        raise get_http_error(web.HTTPConflict, f"User with name {user.name} already exists")

def hash_password(password: str) -> str:
    password = password.encode()  # Преобразует пароль в байты
    return bcrypt.hashpw(password, bcrypt.gensalt()).decode('utf-8')  # Хэширует пароль

def check_password(password: str, hashed_password: str) -> bool:
    password = password.encode()  # Преобразует пароль в байты
    hashed_password = hashed_password.encode()  # Преобразует хэш в байты
    return bcrypt.checkpw(password, hashed_password)  # Проверяет совпадение

async def get_user_by_id(session: AsyncSession, user_id: int) -> User:
    user = await session.get(User, user_id)  # Получает пользователя по ID
    if user is None:
        raise get_http_error(web.HTTPNotFound, "User not found")  # Ошибка, если не найден
    return user

def get_http_error(error_class, message: str):
    response = json.dumps({"error": message})  # Формирует JSON с ошибкой
    return error_class(text=response, content_type='application/json')  # Возвращает HTTP-ошибку

class UserView(web.View):
    @property
    def user_id(self) -> int:
        return int(self.request.match_info["user_id"])  # Извлекает ID из URL

    @property
    def session(self) -> AsyncSession:
        return self.request.session  # Возвращает сессию из запроса

    async def get_user(self) -> User:
        return await get_user_by_id(self.session, self.user_id)  # Получает пользователя

    async def get(self) -> web.Response:
        user = await self.get_user()  # Получает пользователя
        return web.json_response({
            "id": user.id,
            "name": user.name,
            "registration_time": int(user.registration_time.timestamp()),
        })  # Возвращает данные пользователя

    async def post(self) -> web.Response:
        json_data = await self.request.json()  # Получает JSON из тела
        json_data["password"] = hash_password(json_data["password"])  # Хэширует пароль
        user = User(**json_data)  # Создаёт объект пользователя
        await add_user(self.session, user)  # Добавляет пользователя
        return web.json_response({"id": user.id})  # Возвращает ID

    async def patch(self) -> web.Response:
        json_data = await self.request.json()  # Получает JSON
        user = await self.get_user()  # Получает пользователя
        if "password" in json_data:
            json_data["password"] = hash_password(json_data["password"])  # Хэширует новый пароль
        for field, value in json_data.items():
            setattr(user, field, value)  # Обновляет поля
        try:
            await self.session.commit()  # Фиксирует изменения
        except IntegrityError:
            await self.session.rollback()  # Откат при конфликте
            raise get_http_error(web.HTTPConflict, f"User update conflict")
        return web.json_response({"status": "updated", "id": user.id})  # Возвращает статус

    async def delete(self) -> web.Response:
        user = await self.get_user()  # Получает пользователя
        await self.session.delete(user)  # Удаляет пользователя
        await self.session.commit()  # Фиксирует изменения
        return web.json_response({"status": "deleted"})  # Возвращает статус

@web.middleware
async def session_middleware(request: web.Request, handler):
    async with Session() as session:  # Создаёт асинхронную сессию
        request.session = session  # Привязывает сессию к запросу
        try:
            response = await handler(request)  # Выполняет обработчик
            return response
        except Exception:
            await session.rollback()  # Откат при ошибке
            raise

app.middlewares.append(session_middleware)  # Добавляет middleware

app.add_routes([
    web.get("/user/{user_id:\\d+}", UserView),  # GET /user/{id}
    web.patch("/user/{user_id:\\d+}", UserView),  # PATCH /user/{id}
    web.post("/user/", UserView),  # POST /user/
    web.delete("/user/{user_id:\\d+}", UserView),  # DELETE /user/{id}
    web.post('/hello/world/{some_variable:\\d+}', hello_world),  # POST /hello/world/{id}
])

if __name__ == '__main__':
    web.run_app(app, host='127.0.0.1', port=9999)  # Запускает сервер
```

### client.py
```python
import aiohttp
import asyncio

async def main():
    async with aiohttp.ClientSession() as session:
        async with session.get('http://127.0.0.1:9999/user/1', json={"name": "user_2", "password": "1234"}) as response:
            print(response.status)  # Выводит статус ответа
            print(await response.text())  # Выводит тело ответа

asyncio.run(main())  # Запускает асинхронную функцию
```

**Замечание:** В предоставленном `client.py` есть ошибка: GET-запрос не должен содержать тело (`json`). Исправленный пример:
```python
import aiohttp
import asyncio

async def main():
    async with aiohttp.ClientSession() as session:
        # GET-запрос
        async with session.get('http://127.0.0.1:9999/user/1') as response:
            print(response.status)
            print(await response.text())
        # POST-запрос
        async with session.post('http://127.0.0.1:9999/user/', json={"name": "user_2", "password": "1234"}) as response:
            print(response.status)
            print(await response.text())

asyncio.run(main())
```

### models.py
```python
import datetime
import os
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncAttrs
from sqlalchemy.orm import DeclarativeBase, mapped_column, Mapped
from sqlalchemy import JSON, DateTime, Integer, String, func
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
  app:
    build: .
    image: aiohttp_app:latest
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
- `app`: Сервис Aiohttp-приложения.
  - `build`: Сборка из текущей директории.
  - `image`: Имя образа.
  - `ports`: Проксирует порт 9999.
  - `depends_on`: Ждёт запуска базы.
  - `environment`: Переменные для подключения к базе.
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
```

### Dockerfile
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
- `RUN pip install ...`: Устанавливает пакеты.
- `COPY . .`: Копирует код.
- `EXPOSE 9999`: Открывает порт.
- `CMD ["python", "server.py"]`: Запускает сервер.

**requirements.txt:**
```
aiohttp==3.8.3
sqlalchemy==1.4.40
asyncpg==0.27.0
bcrypt==4.0.1
python-dotenv==0.20.0
```

---

## Запуск и тестирование

1. **Установка зависимостей:**
   ```bash
   pip install aiohttp sqlalchemy asyncpg bcrypt python-dotenv
   ```

2. **Запуск Docker Compose:**
   ```bash
   docker-compose up -d --build
   ```

3. **Тестирование API:**
   ```bash
   curl -X POST http://localhost:9999/user/ -H "Content-Type: application/json" -d '{"name": "user_2", "password": "1234"}'
   curl http://localhost:9999/user/1/
   curl -X PATCH http://localhost:9999/user/1/ -H "Content-Type: application/json" -d '{"name": "user_3"}'
   curl -X DELETE http://localhost:9999/user/1/
   ```

4. **Проверка логов:**
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
          docker tag aiohttp_app:latest ${DOCKER_USERNAME}/aiohttp_app:v${{ github.run_number }}
          docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }}
          docker push ${DOCKER_USERNAME}/aiohttp_app:v${{ github.run_number }}
        env:
          DOCKER_USERNAME: ${{ secrets.DOCKER_USERNAME }}
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /home/user/aiohttp_app
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
   - Храните `.env` в GitHub Secrets.
   - Настройте HTTPS с Nginx и Let’s Encrypt.

3. **Мониторинг:**
   - Используйте `docker-compose logs`.
   - Добавьте Prometheus для мониторинга.

4. **CI/CD:**
   - Добавьте линтинг (`flake8`, `black`).
   - Настройте уведомления в Slack.

5. **Масштабирование:**
   - Используйте Kubernetes или AWS ECS.
   - Настройте балансировщик нагрузки.

---

## Полезные ресурсы
- [Aiohttp Documentation](https://docs.aiohttp.org/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Asyncpg Documentation](https://magicstack.github.io/asyncpg/)



---
Полный готовый проект:
https://github.com/alvassin/backendschool2019
# Flask для веб-приложений

Этот документ описывает создание REST API на **Flask** с использованием PostgreSQL, SQLAlchemy, Flask-Bcrypt и Pydantic для валидации данных. Рассматриваются структура приложения, функции, классы, интеграция с Docker Compose и рекомендации по оптимизации.

---

## Что такое Flask?

**Flask** — микрофреймворк для создания веб-приложений на Python. Он предоставляет минималистичный API для быстрого создания веб-сервисов.

### Плюсы Flask
1. **Гибкость**: Лёгкая настройка под любые задачи.
2. **Скорость**: Быстрая разработка и выполнение благодаря минималистичному подходу.

### Когда использовать Flask
1. **Микросервисы**: Для небольших, независимых сервисов.
2. **Небольшие API**: Быстрое создание RESTful API.
3. **MOCK API**: Для прототипирования и тестирования.

---

## HTTP-методы

1. **GET**: Получение данных.
2. **POST**: Создание новых данных.
3. **PUT**: Полное обновление данных.
4. **PATCH**: Частичное обновление данных.
5. **DELETE**: Удаление данных.

---

## HTTP-статусы

1. **200 OK**: Запрос успешен.
2. **400 Bad Request**: Неверный формат запроса.
3. **401 Unauthorized**: Ошибка авторизации (неверный логин/пароль).
4. **404 Not Found**: Ресурс не найден.
5. **500 Internal Server Error**: Ошибка на сервере.

---

## Структура HTTP-запроса

1. **URI (Query String)**: Параметры запроса в URL, например:  
   `http://example.com/users?name=John&age=30`
2. **Body**: Тело запроса (обычно JSON):  
   ```json
   {
       "name": "John",
       "age": 30
   }
   ```
3. **Headers**: Метаданные запроса:  
   ```json
   {
       "Content-Type": "application/json",
       "Authorization": "Bearer token",
       "User-Agent": "Mozilla/5.0"
   }
   ```
4. **Cookies**: Данные для сессий.

---

## Минимальное Flask-приложение

```python
from flask import Flask

app = Flask("app")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
```

**Описание:**
- `Flask("app")`: Создаёт экземпляр Flask-приложения с именем `app`.
- `app.run(host="127.0.0.1", port=5000)`: Запускает сервер на локальном хосте, порт 5000.

---

## Простое Flask-приложение

### server.py
```python
import flask
from flask import request
from flask.views import MethodView
from models import User, Session
from sqlalchemy.exc import IntegrityError
import traceback
from schema import UpdateUser, CreateUser
from flask_bcrypt import Bcrypt

app = flask.Flask("app")

bcrypt = Bcrypt(app)

def hash_password(password: str) -> str:
    password = password.encode()  # Преобразует строку пароля в байты
    password = bcrypt.generate_password_hash(password)  # Генерирует хэш пароля
    password = password.decode()  # Преобразует хэш обратно в строку
    return password

def check_password(password: str, hashed_password: str) -> bool:
    password = password.encode()  # Преобразует пароль в байты
    hashed_password = hashed_password.encode()  # Преобразует хэш в байты
    return bcrypt.check_password_hash(hashed_password, password)  # Проверяет совпадение

class HttpError(Exception):
    def __init__(self, status_code: int, message: str):
        self.status_code = status_code  # Код статуса HTTP
        self.message = message  # Сообщение об ошибке

@app.before_request
def before_request():
    session = Session()  # Создаёт новую сессию SQLAlchemy для запроса
    request.session = session  # Привязывает сессию к запросу

@app.after_request
def after_request(response: flask.Response) -> flask.Response:
    request.session.close()  # Закрывает сессию после завершения запроса
    return response  # Возвращает ответ

@app.errorhandler(HttpError)
def error_handler(err: HttpError) -> flask.Response:
    json_response = flask.jsonify({"status": "error", "message": err.message})  # Формирует JSON с ошибкой
    json_response.status_code = err.status_code  # Устанавливает код статуса
    return json_response

def get_user(user_id: int) -> User:
    user = request.session.get(User, user_id)  # Получает пользователя по ID
    if user is None:
        raise HttpError(status_code=404, message="User not found")  # Ошибка, если пользователь не найден
    return user

def add_user(user_data: dict) -> User:
    try:
        user = User(**user_data)  # Создаёт объект пользователя
        request.session.add(user)  # Добавляет в сессию
        request.session.commit()  # Фиксирует изменения
        return user
    except IntegrityError:
        request.session.rollback()  # Откат при ошибке уникальности
        raise HttpError(status_code=409, message="User already exists")

def validate(schema, json_data: dict) -> dict:
    try:
        return schema(**json_data).dict(exclude_unset=True)  # Валидирует данные с помощью Pydantic
    except ValueError as e:
        error = e.errors()[0]  # Получает первую ошибку
        error.pop("ctx", None)  # Удаляет контекст ошибки
        raise HttpError(status_code=400, message=error)  # Ошибка валидации

class UserView(MethodView):
    def get(self, user_id: int) -> flask.Response:
        user = get_user(user_id)  # Получает пользователя
        return flask.jsonify(user.dict)  # Возвращает JSON с данными пользователя

    def post(self) -> flask.Response:
        try:
            user_data = request.json  # Получает JSON из тела запроса
            user_data = validate(CreateUser, user_data)  # Валидирует данные
            user_data["password"] = hash_password(user_data["password"])  # Хэширует пароль
            user = add_user(user_data)  # Добавляет пользователя
            return flask.jsonify(user.dict), 201  # Возвращает данные пользователя и статус 201
        except HttpError as e:
            raise
        except Exception as e:
            print(f"Unexpected error: {str(e)}")
            traceback.print_exc()
            raise HttpError(status_code=500, message=f"Server error: {str(e)}")

    def patch(self, user_id: int) -> flask.Response:
        user_data = request.json  # Получает JSON из тела запроса
        user_data = validate(UpdateUser, user_data)  # Валидирует данные
        if "password" in user_data:
            user_data["password"] = hash_password(user_data["password"])  # Хэширует новый пароль
        user = get_user(user_id)  # Получает пользователя
        for field, value in user_data.items():
            setattr(user, field, value)  # Обновляет поля
        request.session.commit()  # Фиксирует изменения
        return flask.jsonify(user.dict)  # Возвращает обновлённые данные

    def delete(self, user_id: int) -> flask.Response:
        user = get_user(user_id)  # Получает пользователя
        request.session.delete(user)  # Удаляет пользователя
        request.session.commit()  # Фиксирует изменения
        return flask.jsonify({"status": "deleted"})  # Возвращает статус удаления

user_view = UserView.as_view("user")  # Преобразует класс в представление
app.add_url_rule("/user/", methods=["POST"], view_func=user_view)  # Регистрирует маршрут для создания
app.add_url_rule("/user/<int:user_id>/", methods=["GET", "PATCH", "DELETE"], view_func=user_view)  # Регистрирует маршруты для получения, обновления, удаления

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=9999, debug=True)  # Запускает сервер в режиме отладки
```

### models.py
```python
import atexit
import datetime
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, String, DateTime, Integer, func
from sqlalchemy.orm import sessionmaker, DeclarativeBase, mapped_column, Mapped

load_dotenv()  # Загружает переменные окружения из .env

POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")  # Пароль PostgreSQL
POSTGRES_USER = os.getenv("POSTGRES_USER")  # Имя пользователя PostgreSQL
POSTGRES_DB = os.getenv("POSTGRES_DB")  # Имя базы данных
POSTGRES_HOST = os.getenv("POSTGRES_HOST")  # Хост базы данных
POSTGRES_PORT = int(os.getenv("POSTGRES_PORT", 5432))  # Порт базы данных (по умолчанию 5432)

required_vars = ["POSTGRES_USER", "POSTGRES_PASSWORD", "POSTGRES_DB", "POSTGRES_HOST"]
for var in required_vars:
    if not os.getenv(var):
        raise ValueError(f"Environment variable {var} is not set")  # Проверяет наличие переменных

PG_DSN = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"  # Формирует строку подключения

engine = create_engine(PG_DSN)  # Создаёт движок SQLAlchemy
atexit.register(lambda: engine.dispose())  # Закрывает соединение при выходе

Session = sessionmaker(bind=engine)  # Создаёт фабрику сессий

class Base(DeclarativeBase):
    pass  # Базовый класс для моделей SQLAlchemy

class User(Base):
    __tablename__ = "app_users"  # Имя таблицы в базе данных

    id: Mapped[int] = mapped_column(Integer, primary_key=True)  # Первичный ключ
    name: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)  # Уникальное имя
    password: Mapped[str] = mapped_column(String(100), nullable=False)  # Хэшированный пароль
    registered_time: Mapped[datetime.datetime] = mapped_column(DateTime, server_default=func.now())  # Время регистрации

    @property
    def dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "registered_time": self.registered_time.isoformat(),
        }  # Возвращает данные пользователя в формате JSON

Base.metadata.create_all(bind=engine)  # Создаёт таблицы в базе данных
```

### schema.py
```python
from pydantic import BaseModel, constr

class CreateUser(BaseModel):
    name: constr(min_length=1, max_length=100)  # Имя пользователя (1-100 символов)
    password: constr(min_length=8)  # Пароль (мин. 8 символов)

class UpdateUser(BaseModel):
    name: constr(min_length=1, max_length=100) | None = None  # Имя (опционально)
    password: constr(min_length=8) | None = None  # Пароль (опционально)
```

**Описание:**
- `CreateUser`: Схема для валидации данных при создании пользователя.
- `UpdateUser`: Схема для валидации данных при частичном обновлении (поля опциональны).
- `constr`: Ограничивает длину строк.

---

## Docker Compose

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
    image: flask_app:latest
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
- `services:`:
  - `db`: Сервис PostgreSQL.
    - `image: postgres:14.3-alpine`: Образ PostgreSQL.
    - `ports: - "5431:5432"`: Проксирует порт 5431 хоста на 5432 контейнера.
    - `environment`: Загружает переменные окружения.
    - `volumes: - pg_data:/var/lib/postgresql/data`: Сохраняет данные базы.
    - `healthcheck`: Проверяет готовность PostgreSQL.
    - `networks: - backend`: Подключает к сети `backend`.
  - `app`: Сервис Flask-приложения.
    - `build: .`: Сборка из текущей директории.
    - `image: flask_app:latest`: Имя образа.
    - `ports: - "9999:9999"`: Проксирует порт 9999.
    - `depends_on: - db`: Ждёт запуска PostgreSQL.
    - `environment`: Передаёт переменные для подключения к базе.
    - `volumes: - .:/code`: Монтирует код в контейнер.
    - `networks: - backend`: Подключает к сети `backend`.
- `volumes: pg_data:`: Том для данных PostgreSQL.
- `networks: backend: driver: bridge`: Изолированная сеть.

**Файл `.env`:**
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres12
POSTGRES_DB=test_db
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

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
- `RUN apk add --no-cache ...`: Устанавливает зависимости для PostgreSQL.
- `COPY requirements.txt .`: Копирует зависимости.
- `RUN pip install ...`: Устанавливает Python-пакеты.
- `COPY . .`: Копирует код.
- `EXPOSE 9999`: Открывает порт.
- `CMD ["python", "server.py"]`: Запускает сервер.

**Файл `requirements.txt`:**
```
flask==2.0.1
flask-bcrypt==1.0.1
sqlalchemy==1.4.40
psycopg2-binary==2.9.3
pydantic==1.10.2
python-dotenv==0.20.0
```

---

## Запуск и тестирование

1. **Установка зависимостей:**
   ```bash
   pip install flask flask-bcrypt sqlalchemy psycopg2-binary pydantic python-dotenv
   ```

2. **Запуск Docker Compose:**
   ```bash
   docker-compose up -d --build
   ```

3. **Проверка логов:**
   ```bash
   docker-compose logs
   ```

4. **Тестирование API:**
   ```bash
   curl -X POST http://localhost:9999/user/ -H "Content-Type: application/json" -d '{"name": "John", "password": "secure123"}'
   curl http://localhost:9999/user/1/
   curl -X PATCH http://localhost:9999/user/1/ -H "Content-Type: application/json" -d '{"name": "Jane"}'
   curl -X DELETE http://localhost:9999/user/1/
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
          docker tag flask_app:latest ${DOCKER_USERNAME}/flask_app:v${{ github.run_number }}
          docker login -u ${{ secrets.DOCKER_USERNAME }} -p ${{ secrets.DOCKER_PASSWORD }}
          docker push ${DOCKER_USERNAME}/flask_app:v${{ github.run_number }}
        env:
          DOCKER_USERNAME: ${{ secrets.DOCKER_USERNAME }}
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /home/user/flask_app
            docker-compose pull
            docker-compose up -d
```

**Описание:**
- Запускает тесты, сборку и деплой при пуше в `main`.
- Тестирует приложение с PostgreSQL.
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
   - Проверяйте логи: `docker-compose logs`.
   - Добавьте Prometheus для мониторинга.

4. **CI/CD:**
   - Добавьте линтинг: `flake8`, `black`.
   - Настройте уведомления в Slack.

5. **Масштабирование:**
   - Используйте Kubernetes или AWS ECS.
   - Настройте балансировщик нагрузки.

---

## Полезные ресурсы
- [Flask Documentation](https://flask.palletsprojects.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [Pydantic Documentation](https://pydantic-docs.helpmanual.io/)
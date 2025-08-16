# Тестирование Django-приложений с использованием Pytest

Этот документ описывает настройку и использование **Pytest** для тестирования Django-приложений, включая установку, написание тестов, параметризацию с фикстурами, создание тестовых данных с помощью `model_bakery`, анализ покрытия кода и рекомендации по тестированию.

---

## Установка и настройка Pytest

### 1. Установка
Установите `pytest-django`:
```powershell
pip install pytest-django
```

### 2. Настройка pytest
Создайте файл `pytest.ini` в корне проекта:
```ini
[pytest]
DJANGO_SETTINGS_MODULE = demo.settings
```

**Пояснение:**
- `DJANGO_SETTINGS_MODULE` указывает, где находится файл настроек Django.
- Это необходимо для корректной работы Django в тестах.

### 3. Создание тестов
Создайте директорию `tests` в приложении (например, `demo/tests/`) и файл `test_api.py`.

**Пример простого теста:**
```python
def test_api():
    assert 400 == 400
```

**Запуск тестов:**
```powershell
python -m pytest
```

**Решение ошибок с окружением:**
Если возникает ошибка с `DJANGO_SETTINGS_MODULE`, установите переменную окружения в терминале:
```powershell
$env:DJANGO_SETTINGS_MODULE="demo.settings"  # Для Windows
export DJANGO_SETTINGS_MODULE="demo.settings"  # Для Linux/macOS
```

---

## Тестирование модели и API

### 1. Создание модели
**Пример (в `models.py`):**
```python
from django.db import models
from django.contrib.auth.models import User

class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Message by {self.user.username}: {self.text[:20]}'
```

**Миграции:**
```powershell
python manage.py makemigrations
python manage.py migrate
```

### 2. Сериализатор
**Пример (в `serializers.py`):**
```python
from rest_framework import serializers
from .models import Message

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'user', 'text', 'created_at']
```

### 3. ViewSet
**Пример (в `views.py`):**
```python
from rest_framework.viewsets import ModelViewSet
from .models import Message
from .serializers import MessageSerializer

class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
```

### 4. Маршруты
**Пример (в `urls.py`):**
```python
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import MessageViewSet

router = DefaultRouter()
router.register('messages', MessageViewSet, basename='message')

urlpatterns = [
    path('admin/', admin.site.urls),
] + router.urls
```

---

## Написание тестов

### Простой тест API
**Пример (в `tests/demo/test_api.py`):**
```python
import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from demo.models import Message

@pytest.mark.django_db
def test_api():
    # Arrange
    client = APIClient()
    user = User.objects.create(username='test')
    Message.objects.create(user=user, text='Test')

    # Act
    response = client.get('/messages/')

    # Assert
    assert response.status_code == 200
    data = response.json()
    assert len(data['results']) == 1
    assert data['results'][0]['text'] == 'Test'
```

**Пояснение:**
- `@pytest.mark.django_db` включает доступ к базе данных в тесте.
- `APIClient` эмулирует HTTP-запросы.
- Тест проверяет, что GET-запрос возвращает корректные данные.

---

## Параметризация и фикстуры

Фикстуры в Pytest — это функции, которые подготавливают данные или окружение для тестов.

**Пример с фикстурами:**
```python
import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from demo.models import Message

@pytest.fixture
def client():
    return APIClient()

@pytest.fixture
def user():
    return User.objects.create(username='test')

@pytest.mark.django_db
def test_get_messages(client, user):
    # Arrange
    Message.objects.create(user=user, text='Test')

    # Act
    response = client.get('/messages/')

    # Assert
    assert response.status_code == 200
    data = response.json()
    assert len(data['results']) == 1
    assert data['results'][0]['text'] == 'Test'

@pytest.mark.django_db
def test_create_message(client, user):
    # Arrange
    count = Message.objects.count()
    data = {'user': user.id, 'text': 'Test'}

    # Act
    response = client.post('/messages/', data=data, format='json')

    # Assert
    assert response.status_code == 201
    assert Message.objects.count() == count + 1
```

**Пояснение:**
- `client` и `user` — фикстуры, которые создают объекты для повторного использования.
- `test_create_message` проверяет создание сообщения через POST-запрос.

---

## Создание случайных данных с `model_bakery`

**Установка:**
```powershell
pip install model_bakery
```

**Пример теста с `model_bakery`:**
```python
import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from model_bakery import baker
from demo.models import Message

@pytest.fixture
def client():
    return APIClient()

@pytest.fixture
def user():
    return User.objects.create(username='test')

@pytest.fixture
def message_factory():
    def factory(*args, **kwargs):
        return baker.make(Message, *args, **kwargs)
    return factory

@pytest.mark.django_db
def test_get_messages(client, user, message_factory):
    # Arrange
    messages = message_factory(_quantity=10, user=user)

    # Act
    response = client.get('/messages/')

    # Assert
    assert response.status_code == 200
    data = response.json()
    assert len(data['results']) == len(messages)
    for i, m in enumerate(data['results']):
        assert m['text'] == messages[i].text

@pytest.mark.django_db
def test_create_message(client, user):
    # Arrange
    count = Message.objects.count()
    data = {'user': user.id, 'text': 'Test'}

    # Act
    response = client.post('/messages/', data=data, format='json')

    # Assert
    assert response.status_code == 201
    assert Message.objects.count() == count + 1
```

**Пояснение:**
- `model_bakery` создаёт случайные данные для модели `Message`.
- `_quantity=10` генерирует 10 объектов.
- Фикстура `message_factory` позволяет настраивать параметры создаваемых объектов.

---

## Покрытие кода тестами

### Установка
```powershell
pip install pytest-cov
```

### Настройка
Создайте файл `.coveragerc` в корне проекта:
```ini
[run]
omit =
    tests/*
    .venv/*
    manage.py
    demo/*__init__.py
    demo/*tests.py
```

### Запуск тестов с анализом покрытия
1. Получение статистики:
   ```powershell
   python -m pytest --cov=.
   ```
2. Генерация HTML-отчёта:
   ```powershell
   python -m pytest --cov=. --cov-report=html
   ```
   Отчёт будет в папке `htmlcov/`.

**Пояснение:**
- `omit` исключает указанные файлы/папки из анализа покрытия.
- Покрытие <80% часто считается недостаточным в профессиональных проектах.

---

## Почему Pytest?

- **Pytest vs Django unittest**:
  - Django предоставляет встроенный модуль тестирования на основе `unittest`, но он менее гибкий.
  - Pytest проще в использовании, поддерживает фикстуры, параметризацию и плагины (например, `pytest-django`, `pytest-cov`).
  - Pytest заменяет только test runner, сохраняя доступ ко всем Django-утилитам (например, `APIClient`).

- **Документация**:
  - [Django Testing](https://docs.djangoproject.com/en/stable/topics/testing/overview/)
  - [Pytest-Django](https://pytest-django.readthedocs.io/en/latest/)

---

## Рекомендации по тестированию

1. **Структура тестов:**
   - Следуйте шаблону **Arrange-Act-Assert**:
     - **Arrange**: Подготовка данных (фикстуры, `model_bakery`).
     - **Act**: Выполнение действия (запрос, вызов метода).
     - **Assert**: Проверка результата.
   - Размещайте тесты в `tests/` или `<app>/tests/`.

2. **Фикстуры:**
   - Используйте фикстуры для повторяющихся объектов:
     ```python
     @pytest.fixture
     def auth_client(client, user):
         client.force_authenticate(user=user)
         return client
     ```

3. **Тестирование прав доступа:**
   ```python
   @pytest.mark.django_db
   def test_unauthenticated_access(client):
       response = client.get('/messages/')
       assert response.status_code == 401  # Unauthorized
   ```

4. **Оптимизация:**
   - Используйте `@pytest.mark.django_db` только для тестов, требующих базу данных.
   - Минимизируйте количество операций с базой данных в тестах:
     ```python
     queryset = Message.objects.select_related('user')
     ```

5. **Покрытие:**
   - Стремитесь к покрытию >80%.
   - Анализируйте отчёт `htmlcov/index.html` для выявления непротестированных участков кода.

6. **Решение ошибок:**
   - Если возникает ошибка с `DJANGO_SETTINGS_MODULE`, проверьте `pytest.ini` или установите переменную окружения.
   - Для Windows: `$env:DJANGO_SETTINGS_MODULE="demo.settings"`.
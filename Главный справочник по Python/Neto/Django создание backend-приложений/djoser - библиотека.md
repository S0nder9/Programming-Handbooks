# Использование библиотеки Djoser в Django REST Framework

**Djoser** — это библиотека для Django REST Framework (DRF), которая предоставляет готовые эндпоинты и представления для управления аутентификацией и пользователями. Она упрощает реализацию таких операций, как регистрация, вход, выход, сброс пароля, активация аккаунта и управление профилем пользователя. Djoser поддерживает кастомные модели пользователей и интегрируется с токенами, JWT и другими механизмами аутентификации. В этом документе описаны установка, настройка и использование Djoser в Django-проекте.

---

## Установка Djoser

### 1. Установка пакета
Установите Djoser через pip:

```powershell
pip install djoser
```

Для использования JWT (опционально, но часто применяется в продакшене):

```powershell
pip install djangorestframework-simplejwt
```

### 2. Добавление в проект
Добавьте Djoser и зависимости в `INSTALLED_APPS` в файле `settings.py`:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',  # Для токенов
    'djoser',
    'demo',  # Ваше приложение
]
```

### 3. Настройка аутентификации
Настройте Djoser и DRF в `settings.py`. Пример минимальной конфигурации:

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',  # Для JWT (опционально)
    ],
}

DJOSER = {
    'USER_ID_FIELD': 'id',  # Поле для идентификации пользователя
    'LOGIN_FIELD': 'username',  # Поле для логина (можно заменить на email)
    'USER_CREATE_PASSWORD_RETYPE': True,  # Требовать подтверждение пароля при регистрации
    'SEND_ACTIVATION_EMAIL': False,  # Отключить отправку email (включите для продакшена)
    'SERIALIZERS': {},  # Настройка сериализаторов (см. ниже)
}
```

**Пояснение:**
- `USER_ID_FIELD` указывает поле для идентификации пользователя (по умолчанию `id`).
- `LOGIN_FIELD` определяет поле для входа (например, `username` или `email`).
- `USER_CREATE_PASSWORD_RETYPE` требует повторный ввод пароля при регистрации.
- `SEND_ACTIVATION_EMAIL` включает активацию через email (требует настройки SMTP).

---

## Настройка URL

Добавьте маршруты Djoser в `urls.py`:

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# Пример: маршруты для вашего приложения
# router.register('messages', MessageViewSet, basename='message')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),  # Основные эндпоинты Djoser
    path('auth/', include('djoser.urls.authtoken')),  # Для токенов
    # path('auth/', include('djoser.urls.jwt')),  # Для JWT (если используется)
] + router.urls
```

**Пояснение:**
- `djoser.urls` добавляет эндпоинты, такие как `/auth/users/` (регистрация, список пользователей), `/auth/users/me/` (профиль текущего пользователя).
- `djoser.urls.authtoken` добавляет эндпоинты для работы с токенами (например, `/auth/token/login/`).
- `djoser.urls.jwt` используется для JWT-аутентификации (если установлен `djangorestframework-simplejwt`).

---

## Основные эндпоинты Djoser

Djoser предоставляет следующие готовые эндпоинты:

| Эндпоинт                        | Метод | Описание                                   |
|---------------------------------|-------|--------------------------------------------|
| `/auth/users/`                  | POST  | Регистрация нового пользователя            |
| `/auth/users/me/`               | GET   | Получение профиля текущего пользователя    |
| `/auth/users/me/`               | PUT   | Обновление профиля текущего пользователя   |
| `/auth/token/login/`            | POST  | Получение токена аутентификации           |
| `/auth/token/logout/`           | POST  | Выход (удаление токена)                   |
| `/auth/users/activate/`         | POST  | Активация аккаунта (если включено)        |
| `/auth/users/reset_password/`   | POST  | Запрос сброса пароля                      |

**Пример запроса для регистрации (в `requests.http`):**

```
POST http://localhost:8000/auth/users/
Content-Type: application/json

{
    "username": "testuser",
    "password": "testpass123",
    "re_password": "testpass123"
}
```

**Пример запроса для получения токена:**

```
POST http://localhost:8000/auth/token/login/
Content-Type: application/json

{
    "username": "testuser",
    "password": "testpass123"
}
```

**Ответ:**

```json
{
    "auth_token": "e19e7efff328a4500739f1276e1b4ac64e085aad"
}
```

---

## Интеграция с моделью

Предположим, у вас есть модель `Message` из предыдущего контекста:

```python
# demo/models.py
from django.db import models
from django.contrib.auth.models import User

class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Message by {self.user.username}: {self.text[:20]}'
```

### 1. Сериализатор

**Пример (в `serializers.py`):**

```python
from rest_framework import serializers
from demo.models import Message

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'user', 'text', 'created_at']
        read_only_fields = ['user', 'created_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
```

**Пояснение:**
- `read_only_fields` предотвращает изменение `user` и `created_at` через API.
- `create` автоматически устанавливает текущего пользователя.

### 2. ViewSet с Djoser

**Пример (в `views.py`):**

```python
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from demo.models import Message
from demo.serializers import MessageSerializer

class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
```

**Пояснение:**
- `IsAuthenticated` требует токен для всех операций.
- `perform_create` устанавливает текущего пользователя для новых сообщений.

### 3. Маршруты

**Пример (в `urls.py`):**

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from demo.views import MessageViewSet

router = DefaultRouter()
router.register('messages', MessageViewSet, basename='message')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
] + router.urls
```

---

## Кастомизация Djoser

### 1. Кастомные сериализаторы
Для изменения поведения Djoser можно переопределить сериализаторы в `settings.py`:

```python
DJOSER = {
    'SERIALIZERS': {
        'user_create': 'demo.serializers.CustomUserCreateSerializer',
        'user': 'demo.serializers.CustomUserSerializer',
        'current_user': 'demo.serializers.CustomUserSerializer',
    },
}
```

**Пример кастомного сериализатора (в `serializers.py`):**

```python
from rest_framework import serializers
from django.contrib.auth.models import User

class CustomUserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
```

**Пояснение:**
- `CustomUserCreateSerializer` позволяет добавить дополнительные поля (например, `email`) при регистрации.
- `write_only` скрывает пароль в ответах.

### 2. Кастомные права доступа
Ограничьте доступ к эндпоинтам Djoser, добавив `PERMISSION_CLASSES`:

```python
DJOSER = {
    'PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}
```

---

## Тестирование с Pytest

### Установка

```powershell
pip install pytest-django
```

### Настройка

Создайте `pytest.ini`:

```ini
[pytest]
DJANGO_SETTINGS_MODULE = demo.settings
```

### Пример тестов

**Пример (в `tests/demo/test_api.py`):**

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
    return User.objects.create_user(username='testuser', password='testpass123')

@pytest.mark.django_db
def test_create_message(client, user):
    # Arrange
    client.login(username='testuser', password='testpass123')
    data = {'text': 'Test message'}

    # Act
    response = client.post('/messages/', data=data, format='json')

    # Assert
    assert response.status_code == 201
    assert Message.objects.count() == 1
    assert Message.objects.first().user == user

@pytest.mark.django_db
def test_djoser_register(client):
    # Arrange
    data = {
        'username': 'newuser',
        'password': 'newpass123',
        're_password': 'newpass123'
    }

    # Act
    response = client.post('/auth/users/', data=data, format='json')

    # Assert
    assert response.status_code == 201
    assert User.objects.filter(username='newuser').exists()
```

**Пояснение:**
- `client.login` эмулирует вход пользователя.
- Тест проверяет создание сообщения и регистрацию через Djoser.

---

## Рекомендации по использованию Djoser

1. **Аутентификация:**
   - Используйте `TokenAuthentication` для простых приложений, но переходите на `djangorestframework-simplejwt` для продакшена:
     ```python
     REST_FRAMEWORK = {
         'DEFAULT_AUTHENTICATION_CLASSES': [
             'rest_framework_simplejwt.authentication.JWTAuthentication',
         ],
     }
     ```

2. **Настройка email:**
   - Для активации или сброса пароля настройте SMTP в `settings.py`:
     ```python
     EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
     EMAIL_HOST = 'smtp.gmail.com'
     EMAIL_PORT = 587
     EMAIL_USE_TLS = True
     EMAIL_HOST_USER = 'your-email@gmail.com'
     EMAIL_HOST_PASSWORD = 'your-password'
     ```

3. **Оптимизация:**
   - Используйте `select_related` для уменьшения запросов:
     ```python
     queryset = Message.objects.select_related('user')
     ```
   - Проверяйте запросы с помощью Django Debug Toolbar.

4. **Тестирование:**
   - Тестируйте все эндпоинты Djoser:
     ```python
     @pytest.mark.django_db
     def test_djoser_token_login(client, user):
         response = client.post('/auth/token/login/', {'username': 'testuser', 'password': 'testpass123'})
         assert response.status_code == 200
         assert 'auth_token' in response.json()
     ```

5. **Безопасность:**
   - Ограничьте доступ к `/auth/users/` только для администраторов:
     ```python
     DJOSER = {
         'PERMISSION_CLASSES': ['rest_framework.permissions.IsAdminUser'],
     }
     ```
   - Используйте HTTPS в продакшене.

6. **Кастомизация:**
   - Переопределяйте сериализаторы для добавления полей или валидации:
     ```python
     class CustomUserSerializer(serializers.ModelSerializer):
         class Meta:
             model = User
             fields = ['id', 'username', 'email']
     ```

---

## Полезные ресурсы
- [Официальная документация Djoser](https://djoser.readthedocs.io/en/latest/)
- [Документация Django REST Framework](https://www.django-rest-framework.org/)
- [Документация Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/)
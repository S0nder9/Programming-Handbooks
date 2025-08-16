# Разделение доступа в Django REST Framework

Этот документ описывает настройку авторизации, разделения прав доступа и ограничения количества запросов (throttling) в Django REST Framework (DRF). Рассматриваются создание модели, настройка токенов, пользовательские разрешения и контроль запросов.

---

## Авторизация в DRF

Авторизация в DRF позволяет ограничить доступ к API только для аутентифицированных пользователей и защитить данные от подмены (например, указания чужого ID пользователя в запросе).

### 1. Создание модели
**Пример (в `models.py`):**
```python
from django.db import models
from django.contrib.auth.models import User

class Adv(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=False)

    def __str__(self):
        return f'Adv by {self.user.username}: {self.text[:20]}'
```

**Миграции:**
```powershell
python manage.py makemigrations
python manage.py migrate
```

### 2. Настройка сериализатора
**Пример (в `serializers.py`):**
```python
from rest_framework import serializers
from .models import Adv

class AdvSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adv
        fields = ['id', 'text', 'created_at', 'user', 'status']
        read_only_fields = ['user', 'created_at']
```

**Пояснение:**
- `read_only_fields` запрещает изменение полей `user` и `created_at` через API, чтобы пользователь не мог подставить чужой ID.

### 3. Настройка ViewSet
**Пример (в `views.py`):**
```python
from rest_framework.viewsets import ModelViewSet
from .models import Adv
from .serializers import AdvSerializer

class AdvViewSet(ModelViewSet):
    queryset = Adv.objects.all()
    serializer_class = AdvSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
```

**Пояснение:**
- `perform_create` автоматически устанавливает текущего аутентифицированного пользователя (`request.user`) как владельца объявления, предотвращая подмену `user` в POST-запросе.

### 4. Настройка маршрутов
**Пример (в `urls.py`):**
```python
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import AdvViewSet

router = DefaultRouter()
router.register('adv', AdvViewSet, basename='adv')

urlpatterns = [
    path('admin/', admin.site.urls),
] + router.urls
```

### 5. Настройка токенов
1. В `settings.py` добавьте приложение для токенов:
   ```python
   INSTALLED_APPS = [
       ...
       'rest_framework.authtoken',
   ]
   ```

2. Примените миграции для создания таблицы токенов:
   ```powershell
   python manage.py migrate
   ```

3. Настройте аутентификацию в `settings.py`:
   ```python
   REST_FRAMEWORK = {
       'DEFAULT_AUTHENTICATION_CLASSES': [
           'rest_framework.authentication.TokenAuthentication',
       ],
   }
   ```

4. Создайте токены в админке или через команду:
   ```powershell
   python manage.py drf_create_token <username>
   ```

**Пример POST-запроса с токеном (в `requests.http`):**
```
POST http://localhost:8000/adv/
Content-Type: application/json
Authorization: Token e19e7efff328a4500739f1276e1b4ac64e085aad

{
    "text": "Объявление",
    "status": true
}
```

**Пояснение:**
- Токен передаётся в заголовке `Authorization: Token <token>`.
- Поле `user` не указывается в запросе, так как оно устанавливается в `perform_create`.

---

## Разделение прав доступа

Для ограничения доступа к операциям (например, чтобы только владелец мог редактировать или удалять объявление) используются `permission_classes`.

### 1. Ограничение доступа для аутентифицированных пользователей
**Пример (в `views.py`):**
```python
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Adv
from .serializers import AdvSerializer

class AdvViewSet(ModelViewSet):
    queryset = Adv.objects.all()
    serializer_class = AdvSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
```

**Пример запроса на удаление:**
```
DELETE http://localhost:8000/adv/1/
Authorization: Token e19e7efff328a4500739f1276e1b4ac64e085aad
```

**Пояснение:**
- `IsAuthenticated` требует, чтобы пользователь был аутентифицирован (передал токен).
- Без токена запросы будут отклонены с ошибкой 401 Unauthorized.

### 2. Пользовательское разрешение (IsOwner)
Создайте файл `permissions.py`:
```python
from rest_framework.permissions import BasePermission

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method == 'GET':
            return True  # Разрешить чтение всем
        return request.user == obj.user  # Только владелец может редактировать/удалять
```

**Применение в `views.py`:**
```python
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Adv
from .serializers import AdvSerializer
from .permissions import IsOwner

class AdvViewSet(ModelViewSet):
    queryset = Adv.objects.all()
    serializer_class = AdvSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
```

**Пояснение:**
- `IsOwner` разрешает GET-запросы всем аутентифицированным пользователям, но ограничивает POST, PUT, PATCH и DELETE только для владельца объекта (`obj.user`).
- Комбинация `[IsAuthenticated, IsOwner]` требует, чтобы пользователь был аутентифицирован и являлся владельцем.

---

## Throttling (ограничение количества запросов)

Throttling позволяет контролировать количество запросов от клиента, чтобы предотвратить перегрузку сервера.

### Настройка в `settings.py`
```python
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'user': '10/minute',  # 10 запросов в минуту для аутентифицированных
        'anon': '2/minute',   # 2 запроса в минуту для неаутентифицированных
    },
}
```

### Ограничение только для неаутентифицированных пользователей
**Пример (в `views.py`):**
```python
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import AnonRateThrottle
from .models import Adv
from .serializers import AdvSerializer
from .permissions import IsOwner

class AdvViewSet(ModelViewSet):
    queryset = Adv.objects.all()
    serializer_class = AdvSerializer
    permission_classes = [IsAuthenticated, IsOwner]
    throttle_classes = [AnonRateThrottle]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
```

**Пояснение:**
- `AnonRateThrottle` ограничивает запросы только для неаутентифицированных пользователей.
- Если `throttle_classes` указан в представлении, он переопределяет глобальные настройки `DEFAULT_THROTTLE_CLASSES`.

---

## Рекомендации по работе

1. **Авторизация:**
   - Используйте `TokenAuthentication` для простых приложений, но для продакшена рассмотрите JWT или OAuth (например, через `djangorestframework-simplejwt`).
   - Создавайте токены программно:
     ```python
     from rest_framework.authtoken.models import Token
     user = User.objects.get(username='admin')
     token = Token.objects.create(user=user)
     print(token.key)
     ```

2. **Разделение прав:**
   - Для сложных правил доступа создавайте кастомные классы разрешений:
     ```python
     class IsOwnerOrAdmin(BasePermission):
         def has_object_permission(self, request, view, obj):
             return request.user == obj.user or request.user.is_staff
     ```
   - Комбинируйте разрешения с помощью `|` или `&`:
     ```python
     permission_classes = [IsAuthenticated | IsOwner]
     ```

3. **Throttling:**
   - Настройте разные лимиты для разных эндпоинтов:
     ```python
     class SensitiveViewSet(ModelViewSet):
         throttle_classes = [UserRateThrottle]
         throttle_rates = {'user': '5/minute'}
     ```
   - Используйте кастомные throttle-классы для специфичных сценариев.

4. **Оптимизация:**
   - Используйте `select_related` для `ForeignKey`:
     ```python
     queryset = Adv.objects.select_related('user')
     ```
   - Проверяйте запросы с помощью Django Debug Toolbar.

5. **Тестирование:**
   - Тестируйте права доступа:
     ```python
     from rest_framework.test import APIClient
     client = APIClient()
     client.credentials(HTTP_AUTHORIZATION='Token e19e7efff328a4500739f1276e1b4ac64e085aad')
     response = client.delete('/adv/1/')
     assert response.status_code == 403  # Если не владелец
     ```

6. **Безопасность:**
   - Убедитесь, что `read_only_fields` в сериализаторе защищает чувствительные данные.
   - Включите HTTPS в продакшене для защиты токенов.
# CRUD в Django REST Framework

Этот документ описывает реализацию операций CRUD (Create, Read, Update, Delete) с использованием Django REST Framework (DRF), включая настройку сериализаторов, фильтрацию, пагинацию, сортировку и работу с моделями.

---

## Модель и создание данных

### Модель
**Пример (в `models.py`):**
```python
from django.db import models
from django.contrib.auth.models import User

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.user.username}: {self.text[:20]}'
```

**Пояснение:**
- `ForeignKey` связывает комментарий с пользователем.
- `auto_now_add=True` автоматически задаёт дату создания.

**Создание тестовых данных (в shell):**
```powershell
python manage.py shell
```
```python
from django.contrib.auth.models import User
from demo.models import Comment

u = User.objects.first()  # Получаем первого пользователя
c = Comment(user=u, text="Demo text")
c.save()
print(c.created_at)  # Выводит дату создания, например: 2025-07-15 16:19:16
```

---

## Реализация CRUD с ViewSet

### Использование `ViewSet`
**Пример (в `views.py`):**
```python
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response

class CommentViewSet(ViewSet):
    def list(self, request):
        return Response({"status": "OK"})

    def retrieve(self, request, pk=None):
        return Response({"status": "OK"})

    def destroy(self, request, pk=None):
        return Response({"status": "OK"})

    def update(self, request, pk=None):
        return Response({"status": "OK"})

    def create(self, request):
        return Response({"status": "OK"})
```

**Пояснение:**
- `ViewSet` позволяет вручную определить логику для каждой CRUD-операции.
- Методы соответствуют HTTP-запросам: `list` (GET), `retrieve` (GET по ID), `create` (POST), `update` (PUT/PATCH), `destroy` (DELETE).

### Упрощённый вариант с `ModelViewSet`
**Пример (в `views.py`):**
```python
from rest_framework.viewsets import ModelViewSet
from .models import Comment
from .serializers import CommentSerializer

class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
```

**Пояснение:**
- `ModelViewSet` автоматически реализует все CRUD-операции.
- `queryset` указывает источник данных.
- `serializer_class` определяет сериализатор для преобразования данных.

### Настройка маршрутов
**Пример (в `urls.py`):**
```python
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CommentViewSet

router = DefaultRouter()
router.register('comments', CommentViewSet, basename='comment')

urlpatterns = [
    path('admin/', admin.site.urls),
] + router.urls
```

**Пояснение:**
- `DefaultRouter` автоматически создаёт маршруты для всех CRUD-операций: `/comments/` (список и создание), `/comments/<pk>/` (получение, обновление, удаление).
- `basename` нужен, если `queryset` не определён явно в `ViewSet`.

---

## Тестирование CRUD-запросов

Используйте **REST Client** в VSCode или Postman для тестирования API. Примеры запросов в `requests.http`:

```
# Получение списка комментариев
GET http://localhost:8000/comments/

###

# Создание комментария
POST http://localhost:8000/comments/
Content-Type: application/json

{
    "user": 1,
    "text": "Hello, ma boy!"
}

###

# Получение одного комментария
GET http://localhost:8000/comments/1/

###

# Частичное обновление (PATCH)
PATCH http://localhost:8000/comments/2/
Content-Type: application/json

{
    "text": "Hello, ma boy!!"
}

###

# Удаление комментария
DELETE http://localhost:8000/comments/2/

###

# Полное обновление (PUT)
PUT http://localhost:8000/comments/2/
Content-Type: application/json

{
    "user": 1,
    "text": "Completely updated comment"
}
```

**Пояснение:**
- **GET**: Получение списка (`/comments/`) или одного объекта (`/comments/<pk>/`).
- **POST**: Создание нового объекта.
- **PATCH**: Частичное обновление (меняет только указанные поля).
- **PUT**: Полное обновление (требует все обязательные поля).
- **DELETE**: Удаление объекта по ID.

---

## Сериализаторы, валидация и обновление данных

**Пример (в `serializers.py`):**
```python
from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    text = serializers.CharField(min_length=10)

    class Meta:
        model = Comment
        fields = ['id', 'text', 'created_at', 'user']

    def validate_text(self, value):
        if 'text' in value.lower():
            raise ValidationError("Вы использовали запрещённое слово")
        return value

    def validate(self, attrs):
        if 'hello' in attrs['text'].lower() or attrs['user'].id == 1:
            raise ValidationError("Что-то пошло не так")
        return attrs

    def create(self, validated_data):
        print(validated_data)
        return super().create(validated_data)
```

**Пояснение:**
- `min_length=10` задаёт минимальную длину поля `text`.
- `validate_text` проверяет конкретное поле (например, запрещает слово "text").
- `validate` проверяет все данные (`attrs`) и может отклонить запрос, если, например, пользователь имеет `id=1` или в тексте есть "hello".
- `create` позволяет настроить логику создания объекта (в данном случае выводит данные в консоль).

---

## Фильтрация данных

### Установка
1. Установите `django-filter`:
   ```powershell
   pip install django-filter
   ```

2. Добавьте в `settings.py`:
   ```python
   INSTALLED_APPS = [
       'django_filters',
   ]

   REST_FRAMEWORK = {
       'DEFAULT_FILTER_BACKENDS': [
           'django_filters.rest_framework.DjangoFilterBackend',
       ],
   }
   ```

### Настройка фильтрации
**Пример (в `views.py`):**
```python
from rest_framework.viewsets import ModelViewSet
from .models import Comment
from .serializers import CommentSerializer

class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    filterset_fields = ['user']
```

**Пример запроса:**
```
GET http://localhost:8000/comments/?user=2
```

**Пояснение:** Фильтрует комментарии по пользователю с `id=2`.

### Изменение параметра поиска
По умолчанию DRF использует параметр `search`. Чтобы заменить его на `q`:
```python
# settings.py
REST_FRAMEWORK = {
    'SEARCH_PARAM': 'q',
}
```

**Пример запроса с `q`:**
```
GET http://localhost:8000/comments/?q=example
```

---

## Сортировка данных

### Настройка сортировки
**Пример (в `views.py`):**
```python
from rest_framework.filters import OrderingFilter

class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    filter_backends = [OrderingFilter]
    ordering_fields = ['id', 'user', 'text', 'created_at']
```

**В `settings.py`:**
```python
REST_FRAMEWORK = {
    'ORDERING_PARAM': 'o',
}
```

**Пример запроса:**
```
GET http://localhost:8000/comments/?o=created_at,id
```

**Пояснение:**
- `ordering_fields` указывает поля, доступные для сортировки.
- `o=created_at,id` сортирует по `created_at` (по возрастанию), затем по `id`.

---

## Пагинация

### Настройка пагинации
**В `settings.py`:**
```python
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 3,
}
```

**Пример с `LimitOffsetPagination` (в `views.py`):**
```python
from rest_framework.pagination import LimitOffsetPagination

class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    pagination_class = LimitOffsetPagination
```

**Пример запроса:**
```
GET http://localhost:8000/comments/?page=2&offset=5&limit=10
```

**Пояснение:**
- `PageNumberPagination` разбивает данные на страницы с фиксированным количеством записей (`PAGE_SIZE`).
- `LimitOffsetPagination` позволяет указать `limit` (количество записей) и `offset` (смещение).

---

## CRUD в REST API

CRUD-операции в REST API реализуются через следующие HTTP-запросы:
1. **GET (список)**: Получение всех объектов (`/comments/`).
2. **POST**: Создание нового объекта (`/comments/`).
3. **GET (один)**: Получение объекта по ID (`/comments/<pk>/`).
4. **PATCH**: Частичное обновление объекта (`/comments/<pk>/`).
5. **DELETE**: Удаление объекта (`/comments/<pk>/`).
6. **PUT**: Полное обновление объекта (`/comments/<pk>/`).

**Пример полной реализации `CommentViewSet`:**
```python
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.filters import OrderingFilter
from .models import Comment
from .serializers import CommentSerializer

class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    filterset_fields = ['user']
    filter_backends = [OrderingFilter]
    ordering_fields = ['id', 'user', 'text', 'created_at']
    pagination_class = LimitOffsetPagination
```

---

## Рекомендации по работе

1. **Сериализаторы:**
   - Используйте `ModelSerializer` для автоматического соответствия модели.
   - Добавляйте валидацию для защиты от некорректных данных:
     ```python
     def validate_user(self, value):
         if not value.is_active:
             raise serializers.ValidationError("User must be active")
         return value
     ```

2. **Оптимизация:**
   - Используйте `select_related` для `ForeignKey`:
     ```python
     queryset = Comment.objects.select_related('user')
     ```
   - Проверяйте SQL-запросы с помощью Django Debug Toolbar.

3. **Тестирование:**
   - Используйте `APIClient` для тестов:
     ```python
     from rest_framework.test import APIClient
     client = APIClient()
     response = client.post('/comments/', {'user': 1, 'text': 'Valid comment'})
     assert response.status_code == 201
     ```

4. **Безопасность:**
   - Настройте права доступа:
     ```python
     from rest_framework.permissions import IsAuthenticated

     class CommentViewSet(ModelViewSet):
         permission_classes = [IsAuthenticated]
         queryset = Comment.objects.all()
         serializer_class = CommentSerializer
     ```
   - Включите CSRF для POST/PUT/PATCH-запросов.

5. **Фильтрация и сортировка:**
   - Используйте `django-filter` для сложных фильтров:
     ```python
     from django_filters.rest_framework import FilterSet

     class CommentFilter(FilterSet):
         class Meta:
             model = Comment
             fields = {'text': ['contains'], 'created_at': ['gte', 'lte']}
     ```
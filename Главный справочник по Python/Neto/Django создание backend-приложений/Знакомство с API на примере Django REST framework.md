# REST API и Django REST Framework (DRF)

Этот документ описывает основы REST API, установку и настройку Django REST Framework (DRF), создание сериализаторов, обработку запросов с использованием различных подходов (функции, классы, generic views) и тестирование API.

---

## Что такое REST API?

**REST** (Representational State Transfer) — архитектурный стиль проектирования API, основанный на следующих принципах:
- **Взаимодействие клиент-сервер**: Клиент отправляет запросы, сервер обрабатывает их и возвращает ответы.
- **Состояние в запросах**: Каждый запрос содержит всё необходимое для его обработки (stateless).
- **Строгое именование ресурсов**: Ресурсы идентифицируются уникальными URL (например, `/weapons/` для списка оружия).
- **Семантика HTTP-методов**: Используются методы (`GET`, `POST`, `PUT`, `DELETE`) и коды состояния (200, 404, 201 и т.д.) для описания операций.

---

## Установка и настройка Django REST Framework

**Django REST Framework (DRF)** — мощный инструмент для создания REST API на основе Django.

### Установка
1. Установите DRF:
   ```powershell
   pip install djangorestframework
   ```

2. Добавьте DRF в `settings.py`:
   ```python
   INSTALLED_APPS = [
       'django.contrib.admin',
       'django.contrib.auth',
       'django.contrib.contenttypes',
       'django.contrib.sessions',
       'django.contrib.messages',
       'django.contrib.staticfiles',
       'demo',
       'debug_toolbar',
       'rest_framework',
   ]
   ```

**Пояснение:** Добавление `rest_framework` в `INSTALLED_APPS` активирует функциональность DRF.

---

## Компоненты DRF

1. **ViewSet**: Логика обработки запросов и бизнес-логика API.
2. **Router**: Автоматическая маршрутизация URL для API.
3. **Serializer**: Преобразование данных (например, моделей Django) в JSON и обратно.
4. **ModelSerializer**: Упрощённый сериализатор для моделей Django, учитывающий их поля и ограничения.
5. **FilterSet**: Фильтрация данных для запросов.

---

## Создание простого API

### 1. Создание модели
**Пример (в `models.py`):**
```python
from django.db import models

class Weapon(models.Model):
    power = models.IntegerField()
    rarity = models.CharField(max_length=50)
    value = models.IntegerField()

    def __str__(self):
        return f'{self.rarity} Weapon (Power: {self.power})'
```

**Миграции:**
```powershell
python manage.py makemigrations
python manage.py migrate
```

**Создание тестовых данных (в shell):**
```powershell
python manage.py shell
```
```python
from demo.models import Weapon
Weapon(power=100, rarity='legendary', value=1000).save()
```

### 2. Создание сериализатора
Создайте файл `serializers.py` в приложении `demo`:
```python
from rest_framework import serializers
from .models import Weapon

# Простой сериализатор
class WeaponSerializer(serializers.Serializer):
    power = serializers.IntegerField()
    rarity = serializers.CharField()
    value = serializers.IntegerField()

# Или используйте ModelSerializer
class WeaponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weapon
        fields = ['power', 'rarity', 'value']
```

**Пояснение:**
- `Serializer` требует явного определения всех полей.
- `ModelSerializer` автоматически использует поля модели, указанные в `Meta.fields`.
- Параметр `many=True` позволяет сериализовать список объектов.

### 3. Создание представления (функция)
**Пример (в `views.py`):**
```python
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Weapon
from .serializers import WeaponSerializer

@api_view(['GET'])
def demo(request):
    weapons = Weapon.objects.all()
    serializer = WeaponSerializer(weapons, many=True)
    return Response(serializer.data)
```

**Маршрут (в `urls.py`):**
```python
from django.urls import path
from .views import demo

urlpatterns = [
    path('demo/', demo, name='demo'),
]
```

**Пояснение:**
- `@api_view(['GET'])` указывает, что функция обрабатывает только GET-запросы.
- `Response` возвращает данные в формате JSON.
- Нельзя передавать объекты QuerySet напрямую, поэтому используется `WeaponSerializer`.

---

## Обработка разных HTTP-запросов

### Функциональный подход
**Пример (в `views.py`):**
```python
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET', 'POST'])
def demo(request):
    if request.method == 'GET':
        weapons = Weapon.objects.all()
        serializer = WeaponSerializer(weapons, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        return Response({'message': 'POST request received'})
```

**Пояснение:** Функция обрабатывает разные методы, но это неудобно для сложной логики.

### Классовый подход с `APIView`
**Пример (в `views.py`):**
```python
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Weapon
from .serializers import WeaponSerializer

class DemoView(APIView):
    def get(self, request):
        weapons = Weapon.objects.all()
        serializer = WeaponSerializer(weapons, many=True)
        return Response(serializer.data)

    def post(self, request):
        return Response({'message': 'POST request received'})
```

**Маршрут (в `urls.py`):**
```python
from django.urls import path
from .views import DemoView

urlpatterns = [
    path('demo/', DemoView.as_view(), name='demo'),
]
```

**Пояснение:** `as_view()` позволяет использовать класс как функцию в маршрутах.

### Generic Views
**Пример (в `views.py`):**
```python
from rest_framework.generics import ListAPIView
from .models import Weapon
from .serializers import WeaponSerializer

class DemoView(ListAPIView):
    queryset = Weapon.objects.all()
    serializer_class = WeaponSerializer

    def post(self, request):
        return Response({'message': 'POST request received'})
```

**Пояснение:**
- `ListAPIView` автоматически обрабатывает GET-запросы для списка объектов.
- `queryset` указывает источник данных.
- `serializer_class` определяет класс сериализатора.

### Получение конкретного объекта
**Пример (в `views.py`):**
```python
from rest_framework.generics import RetrieveAPIView

class WeaponView(RetrieveAPIView):
    queryset = Weapon.objects.all()
    serializer_class = WeaponSerializer
```

**Маршрут (в `urls.py`):**
```python
from django.urls import path
from .views import WeaponView

urlpatterns = [
    path('weapon/<int:pk>/', WeaponView.as_view(), name='weapon'),
]
```

**Пояснение:**
- `RetrieveAPIView` обрабатывает GET-запросы для получения одного объекта по первичному ключу (`pk`).
- Пример запроса: `GET http://localhost:8000/weapon/3/`.

---

## Тестирование API

Для тестирования API удобно использовать расширение **REST Client** в VSCode:
1. Установите расширение REST Client.
2. Создайте файл `requests.http`:
   ```
   GET http://localhost:8000/demo/
   ```
3. Нажмите "Send Request" в VSCode для выполнения запроса.

**Альтернатива:** Используйте `curl` или Postman для отправки запросов.

---

## Рекомендации по работе с DRF

1. **Сериализаторы:**
   - Используйте `ModelSerializer` для моделей, чтобы избежать дублирования кода.
   - Добавляйте валидацию в сериализаторы:
     ```python
     class WeaponSerializer(serializers.ModelSerializer):
         class Meta:
             model = Weapon
             fields = ['power', 'rarity', 'value']

         def validate_power(self, value):
             if value < 0:
                 raise serializers.ValidationError("Power must be non-negative")
             return value
     ```

2. **Оптимизация запросов:**
   - Используйте `select_related` или `prefetch_related` для минимизации SQL-запросов:
     ```python
     queryset = Weapon.objects.prefetch_related('orders')
     ```
   - Проверяйте запросы с помощью Django Debug Toolbar.

3. **Маршрутизация:**
   - Для сложных API используйте `DefaultRouter`:
     ```python
     from rest_framework.routers import DefaultRouter
     from .views import WeaponViewSet

     router = DefaultRouter()
     router.register(r'weapons', WeaponViewSet)
     urlpatterns = router.urls
     ```

4. **Тестирование:**
   - Пишите тесты для API с использованием `APIClient`:
     ```python
     from rest_framework.test import APIClient
     client = APIClient()
     response = client.get('/demo/')
     assert response.status_code == 200
     ```

5. **Безопасность:**
   - Настройте права доступа в DRF:
     ```python
     class DemoView(ListAPIView):
         permission_classes = [IsAuthenticated]
         queryset = Weapon.objects.all()
         serializer_class = WeaponSerializer
     ```
   - Используйте CSRF-токены для POST-запросов.
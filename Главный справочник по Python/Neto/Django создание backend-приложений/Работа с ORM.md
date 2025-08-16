# Работа с ORM и админкой в Django

Этот документ описывает использование **ORM** (Object-Relational Mapping) в Django для взаимодействия с базой данных, настройку PostgreSQL, создание моделей, выполнение запросов, а также настройку административной панели для управления данными.

---

## Типы связей в реляционных базах данных

В реляционных базах данных (СУБД) выделяют несколько типов связей между сущностями:

1. **Один к одному**: Каждому экземпляру сущности А соответствует ровно один экземпляр сущности В, и наоборот. Используется редко, например, для разделения данных одной сущности на две таблицы.
2. **Один ко многим**: Одному экземпляру сущности А соответствует 0, 1 или несколько экземпляров сущности В, но каждому экземпляру В соответствует только один А. Пример: один учитель — много учеников.
3. **Многие к одному**: Обратная связь к "один ко многим". Многим экземплярам А соответствует один экземпляр В. Пример: много учителей — один ученик.
4. **Многие ко многим**: Каждому экземпляру А соответствует 0, 1 или несколько экземпляров В, и наоборот. Пример: множество учеников — множество учителей.

---

## ORM в Django

**ORM** (Object-Relational Mapping) — это прослойка между кодом Python и базой данных, которая позволяет работать с данными как с объектами Python, а не с SQL-запросами.

### Создание моделей
Модели в Django — это классы, наследующиеся от `django.db.models.Model`, которые соответствуют таблицам в базе данных.

**Пример (в `models.py`):**
```python
from django.db import models

class Car(models.Model):
    brand = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    color = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.brand}, {self.model}: {self.color}'

class Person(models.Model):
    name = models.CharField(max_length=50)
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='owners')
```

**Пояснение:**
- `Car` и `Person` — модели, представляющие таблицы в базе данных.
- `CharField(max_length=50)` — текстовое поле с максимальной длиной 50 символов.
- `ForeignKey` задаёт связь "один ко многим" (одна машина — много владельцев).
- `on_delete=models.CASCADE` удаляет связанные записи в `Person`, если удаляется `Car`.
- `related_name='owners'` позволяет обращаться к владельцам машины через `car.owners`.
- Метод `__str__` определяет строковое представление объекта.

### Миграции
После создания моделей необходимо создать и применить миграции для создания таблиц в базе данных:
1. Создание миграций:
   ```powershell
   python manage.py makemigrations
   ```
2. Применение миграций:
   ```powershell
   python manage.py migrate
   ```

**Пояснение:** Миграции переводят Python-модель в SQL-структуру таблицы.

---

## Настройка базы данных PostgreSQL

По умолчанию Django использует SQLite. Для использования PostgreSQL выполните следующие шаги:

1. **Создайте базу данных:**
   ```powershell
   createdb -U postgres demoorm
   ```
   Введите пароль пользователя `postgres`.

2. **Установите драйвер PostgreSQL:**
   ```powershell
   pip install psycopg2-binary
   ```

3. **Настройте `settings.py`:**
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'demoorm',
           'USER': 'postgres',
           'PASSWORD': 'your_password_here',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```

**Пояснение:**
- `'ENGINE'` указывает на использование PostgreSQL.
- Укажите имя базы данных (`NAME`), пользователя (`USER`), пароль (`PASSWORD`), хост и порт.
- Для продакшена храните пароль в переменных окружения:
  ```python
  import os
  'PASSWORD': os.getenv('DB_PASSWORD', 'your_default_password')
  ```

---

## Запросы к базе данных

Django ORM позволяет выполнять запросы к базе данных через методы модели.

### Пример (в `views.py`):
```python
from django.http import HttpResponse
import random

def create_car(request):
    car = Car(
        brand=random.choice(['B1', 'B2', 'B3']),
        model=random.choice(['M1', 'M2', 'M3']),
        color=random.choice(['C1', 'C2', 'C3'])
    )
    car.save()
    return HttpResponse(f'Car created: {car.brand} {car.model} {car.color}')

def list_car(request):
    car_objects = Car.objects.all()
    cars = [f'{c.id} {c.brand} {c.model} {c.color} | Owners: {c.owners.count()}' for c in car_objects]
    return HttpResponse('<br>'.join(cars))
```

**Пояснение:**
- `Car.objects.all()` возвращает все записи из таблицы `Car`.
- `car.save()` сохраняет объект в базу данных.
- `c.owners.count()` использует `related_name='owners'` для подсчёта владельцев машины.
- Результаты объединяются в HTML-строку с разделителем `<br>`.

### Настройка маршрутов (в `urls.py`):
```python
from django.urls import path
from .views import create_car, list_car

urlpatterns = [
    path('cars/create/', create_car, name='create_car'),
    path('cars/', list_car, name='list_car'),
]
```

**Пояснение:** Маршруты связывают URL (`/cars/create/` и `/cars/`) с соответствующими представлениями.

---

## Фильтрация данных

Django ORM поддерживает мощные методы для фильтрации данных.

**Примеры фильтрации:**
```python
# Все машины
car_objects = Car.objects.all()

# Машины с брендом 'B1'
car_objects = Car.objects.filter(brand='B1')

# Машины, у которых в бренде есть '2'
car_objects = Car.objects.filter(brand__contains='2')
```

**Пояснение:**
- `filter()` возвращает Queryset с объектами, соответствующими условиям.
- `__contains` — фильтр для частичного совпадения строки.
- Другие фильтры: `__startswith`, `__endswith`, `__gte` (≥), `__lte` (≤), `__in`, и т.д.

**Пример с фильтрацией и связями:**
```python
def list_car(request):
    car_objects = Car.objects.filter(brand__contains='2')
    cars = [f'{c.id} {c.brand} {c.model} {c.color} | Owners: {c.owners.count()}' for c in car_objects]
    return HttpResponse('<br>'.join(cars))
```

---

## Создание административной панели

Django предоставляет встроенную админку для управления данными.

### Настройка админки (в `admin.py`):
```python
from django.contrib import admin
from .models import Car, Person

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ['id', 'brand', 'model', 'color']
    list_filter = ['brand', 'model']

@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'car']
```

**Пояснение:**
- `@admin.register` регистрирует модель в админке.
- `list_display` задаёт отображаемые столбцы в списке записей.
- `list_filter` добавляет фильтры для удобной сортировки.

### Создание суперпользователя
Для доступа к админке создайте суперпользователя:
```powershell
python manage.py createsuperuser
```
Следуйте инструкциям, чтобы задать имя, email и пароль. Затем откройте `http://127.0.0.1:8000/admin/` и войдите.

---

## Рекомендации по работе с ORM

1. **Оптимизация запросов:**
   - Используйте `select_related` для связей "один к одному" или "один ко многим" для уменьшения количества SQL-запросов:
     ```python
     cars = Car.objects.select_related('owners').all()
     ```
   - Для "многие ко многим" используйте `prefetch_related`.

2. **Читаемость моделей:**
   - Всегда определяйте `__str__` для удобного отображения объектов.
   - Используйте `related_name` для понятных обратных связей.

3. **Безопасность:**
   - Храните пароли базы данных в переменных окружения.
   - Проверяйте миграции перед применением:
     ```powershell
     python manage.py makemigrations --dry-run
     ```

4. **Админка:**
   - Настройте `search_fields` для поиска в админке:
     ```python
     class CarAdmin(admin.ModelAdmin):
         list_display = ['id', 'brand', 'model', 'color']
         list_filter = ['brand', 'model']
         search_fields = ['brand', 'model']
     ```
   - Добавьте `list_per_page` для ограничения записей на странице:
     ```python
     list_per_page = 20
     ```

5. **Тестирование:**
   - Проверяйте данные в shell:
     ```powershell
     python manage.py shell
     ```
     ```python
     from myapp.models import Car
     Car.objects.all()
     ```
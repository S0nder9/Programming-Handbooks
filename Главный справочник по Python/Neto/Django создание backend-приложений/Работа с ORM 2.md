# Связи многие ко многим и Django Debug Toolbar

Этот документ описывает реализацию связей "многие ко многим" в Django, включая использование промежуточной модели (`through`), настройку административной панели с инлайн-моделями, отображение данных в шаблонах, а также установку и настройку **Django Debug Toolbar** для отладки.

---

## Связи многие ко многим

Связь "многие ко многим" позволяет связать несколько экземпляров одной модели с несколькими экземплярами другой. Например, один заказ может включать несколько продуктов, а один продукт может быть в нескольких заказах.

### Реализация
Связь задаётся с помощью `ManyToManyField` в модели.

**Пример моделей (в `models.py`):**
```python
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    category = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Order(models.Model):
    products = models.ManyToManyField(Product, related_name='orders')

class OrderPosition(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='positions')
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='positions')
    quantity = models.IntegerField()

    def __str__(self):
        return f'{self.product.name} (x{self.quantity})'
```

**Пояснение:**
- `ManyToManyField` в `Order` создаёт связь "многие ко многим" с моделью `Product`.
- `related_name='orders'` позволяет обращаться к заказам, связанным с продуктом (например, `product.orders.all()`).
- `OrderPosition` — промежуточная модель, которая хранит дополнительные данные (например, `quantity`) для связи между `Order` и `Product`.

### Настройка админки (в `admin.py`):
```python
from django.contrib import admin
from .models import Product, Order

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'category', 'price']
    list_filter = ['category']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id']
```

**Пояснение:**
- `list_display` задаёт отображаемые столбцы в списке записей.
- `list_filter` добавляет фильтры для сортировки по категориям.

---

## Инлайн-модели

Инлайн-модели позволяют редактировать связанные объекты (например, `OrderPosition`) прямо на странице редактирования заказа в админке.

**Пример (в `admin.py`):**
```python
from django.contrib import admin
from .models import Product, Order, OrderPosition

class OrderPositionInline(admin.TabularInline):
    model = OrderPosition
    extra = 3  # Количество пустых строк для добавления новых позиций

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id']
    inlines = [OrderPositionInline]
```

**Изменение модели `Order`:** Удалите `products = models.ManyToManyField(Product, related_name='orders')`, так как связь теперь реализуется через `OrderPosition`.

**Пояснение:**
- `TabularInline` отображает связанные записи в виде таблицы.
- `extra = 3` добавляет три пустые строки для создания новых позиций.
- Промежуточная модель `OrderPosition` полностью заменяет прямую связь `ManyToManyField`.

---

## Отображение заказов в шаблоне

### Представление (в `views.py`):
```python
from django.shortcuts import render
from .models import Order

def list_orders(request):
    orders = Order.objects.all()
    context = {'orders': orders}
    return render(request, 'orders.html', context)
```

### Шаблон (`templates/orders.html`):
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Orders</title>
</head>
<body>
    {% for order in orders %}
        <h3>Заказ: {{ order.id }}</h3>
        <ul>
            {% for position in order.positions.all %}
                <li>{{ position.product.name }} - {{ position.quantity }}</li>
            {% endfor %}
        </ul>
    {% endfor %}
</body>
</html>
```

### Маршрут (в `urls.py`):
```python
from django.urls import path
from .views import list_orders

urlpatterns = [
    path('orders/', list_orders, name='list_orders'),
]
```

**Пояснение:**
- `order.positions.all()` использует `related_name='positions'` для получения всех позиций заказа.
- Шаблон отображает список заказов с их позициями (продукт и количество).

---

## Фильтрация заказов

Django ORM позволяет фильтровать данные через связи.

**Пример:**
```python
orders = Order.objects.filter(positions__product__price__lte=600)
```

**Пояснение:**
- Фильтрует заказы, содержащие продукты с ценой ≤ 600.
- `positions__product__price__lte` проходит через связь `OrderPosition` к модели `Product` и проверяет поле `price`.

---

## Many-to-many с помощью `through`

Для добавления дополнительных данных в связь "многие ко многим" используется параметр `through`.

**Пример модели (в `models.py`):**
```python
class Order(models.Model):
    products = models.ManyToManyField(Product, related_name='orders', through='OrderPosition')
```

**Пример использования (в `views.py`):**
```python
def order_details(request, order_id):
    some_order = Order.objects.get(id=order_id)
    order_products = some_order.products.all()  # Все продукты заказа
    product = Product.objects.get(id=1)
    product_orders = product.orders.all()      # Все заказы с продуктом
    context = {'order': some_order, 'products': order_products}
    return render(request, 'order_details.html', context)
```

**Пояснение:**
- `through='OrderPosition'` указывает, что связь реализуется через промежуточную модель `OrderPosition`.
- `some_order.products.all()` возвращает продукты, связанные с заказом.
- `product.orders.all()` возвращает заказы, содержащие продукт.

---

## Установка и настройка Django Debug Toolbar

**Django Debug Toolbar** — это инструмент для отладки, который показывает информацию о запросах, SQL, шаблонах и производительности.

### Установка
1. Установите пакет:
   ```powershell
   pip install django-debug-toolbar
   ```

2. Добавьте в `settings.py` в `INSTALLED_APPS`:
   ```python
   INSTALLED_APPS = [
       # ...
       'django.contrib.staticfiles',
       'debug_toolbar',
   ]
   ```

3. Настройте `STATIC_URL` в `settings.py`:
   ```python
   STATIC_URL = '/static/'
   ```

4. Убедитесь, что в `TEMPLATES` параметр `APP_DIRS` равен `True`:
   ```python
   TEMPLATES = [
       {
           'BACKEND': 'django.template.backends.django.DjangoTemplates',
           'DIRS': [],
           'APP_DIRS': True,
           # ...
       },
   ]
   ```

5. Добавьте middleware в `settings.py` (в начало списка `MIDDLEWARE`):
   ```python
   MIDDLEWARE = [
       'debug_toolbar.middleware.DebugToolbarMiddleware',
       # ...
   ]
   ```

6. Укажите `INTERNAL_IPS` в `settings.py`:
   ```python
   INTERNAL_IPS = [
       '127.0.0.1',
   ]
   ```

**Пояснение:**
- `debug_toolbar` отображается только для IP-адресов, указанных в `INTERNAL_IPS`.
- Панель отладки появляется в правой части браузера при `DEBUG = True`.

---

## Рекомендации по работе

1. **Модели:**
   - Всегда задавайте `related_name` для ясности обратных связей.
   - Используйте `__str__` для читаемого отображения объектов.

2. **Админка:**
   - Добавьте `search_fields` для поиска:
     ```python
     class ProductAdmin(admin.ModelAdmin):
         list_display = ['id', 'name', 'category', 'price']
         list_filter = ['category']
         search_fields = ['name', 'category']
     ```
   - Используйте `list_per_page` для ограничения строк на странице:
     ```python
     list_per_page = 20
     ```

3. **Фильтрация:**
   - Используйте `select_related` и `prefetch_related` для оптимизации запросов:
     ```python
     orders = Order.objects.prefetch_related('positions__product').all()
     ```
   - Проверяйте SQL-запросы с помощью Debug Toolbar.

4. **Шаблоны:**
   - Избегайте сложной логики в шаблонах; переносите её в представления.
   - Используйте `{% empty %}` для пустых циклов:
     ```html
     {% for position in order.positions.all %}
         <li>{{ position.product.name }} - {{ position.quantity }}</li>
     {% empty %}
         <li>Нет позиций в заказе</li>
     {% endfor %}
     ```

5. **Debug Toolbar:**
   - Используйте для анализа SQL-запросов и времени выполнения.
   - Отключайте в продакшене, так как `DEBUG = True` небезопасно.
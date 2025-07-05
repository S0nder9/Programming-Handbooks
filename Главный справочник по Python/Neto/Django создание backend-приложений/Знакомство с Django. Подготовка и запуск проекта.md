# Введение в Django

Django — это высокоуровневый Python-фреймворк для быстрого создания безопасных и масштабируемых веб-приложений. Он следует принципу **"не повторяйся" (DRY)** и предоставляет встроенные инструменты для упрощения разработки.

---

## Установка Django

### Установка
1. Убедитесь, что у вас установлен Python (рекомендуется версия 3.8+).
2. Установите Django через `pip`:
   ```powershell
   pip install django
   ```
3. Создайте новый проект:
   ```powershell
   python -m django startproject intro
   ```
   или
   ```powershell
   django-admin startproject intro
   ```
   Здесь `intro` — имя папки проекта.

**Примечание:** Все команды Django выполняются через файл `manage.py`, который находится в корне проекта.

---

## Основные команды Django

1. **Запуск сервера разработки:**
   ```powershell
   python manage.py runserver
   ```
   Запускает локальный сервер по адресу `http://127.0.0.1:8000/`.

2. **Просмотр всех команд:**
   ```powershell
   python manage.py --help
   ```

3. **Создание приложения:**
   ```powershell
   python manage.py startapp name
   ```
   Здесь `name` — имя вашего приложения (например, `demo`).

---

## Клиент и сервер: Основы

### Клиент
- **Программа:** Приложение (например, браузер), которое отправляет запросы к серверу.
- **Устройство:** Компьютер, смартфон или другое устройство, на котором работает клиентская программа.

### Сервер
- **Программа:** Программа, обрабатывающая запросы клиента и возвращающая данные (например, веб-сервер Django).
- **Устройство:** Серверное оборудование или компьютер, на котором запущена серверная программа.

### Взаимодействие
- Клиент и сервер общаются через **протокол HTTP**.
- Клиент отправляет **HTTP-запрос** (GET, POST и т.д.), сервер отвечает **HTTP-ответом**.

---

## Архитектурный шаблон: MTV (Model-Template-View)

Django использует шаблон **MTV** (Model-Template-View), который является вариацией классического **MVC** (Model-View-Controller):
- **Model (Модель):** Отвечает за структуру данных и взаимодействие с базой данных.
- **Template (Шаблон):** Отвечает за отображение данных пользователю (HTML-файлы).
- **View (Представление):** Контроллер, обрабатывающий запросы и возвращающий ответы.

---

## Настройка приложения

### 1. Регистрация приложения
После создания приложения (`python manage.py startapp demo`) добавьте его в настройки проекта. В файле `settings.py` в списке `INSTALLED_APPS` укажите имя приложения:
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'demo',  # Добавляем приложение
]
```

**Пояснение:** `INSTALLED_APPS` определяет активные приложения, включая встроенные (например, `admin`) и пользовательские (например, `demo`).

### 2. Создание представления (View)
В файле `demo/views.py` определите логику обработки запросов:
```python
from django.http import HttpResponse

def hello(request):
    return HttpResponse("Hello, world!")
```

**Пояснение:** Функция `hello` — это **view**, которая принимает HTTP-запрос (`request`) и возвращает ответ (текст "Hello, world!").

### 3. Настройка маршрутов (URLs)
В файле `intro/urls.py` свяжите URL с представлением:
```python
from django.contrib import admin
from django.urls import path
from demo.views import hello

urlpatterns = [
    path('admin/', admin.site.urls),
    path('hello/', hello, name='hello'),  # Маршрут для hello
]
```

**Пояснение:**
- `path('hello/', hello, name='hello')` связывает URL `/hello/` с функцией `hello`.
- Параметр `name='hello'` задаёт имя маршрута для использования в других частях приложения.
- **Слэш (`/`) в конце URL обязателен** для единообразия.

### 4. Использование имени маршрута
Для динамической генерации ссылок используйте функцию `reverse`:
```python
from django.http import HttpResponse
from django.urls import reverse

def index(request):
    return HttpResponse(f"<a href='{reverse('hello')}'>Go to Hello page</a>")
```

**Пояснение:** `reverse('hello')` возвращает URL, связанный с именем маршрута `hello` (например, `/hello/`).

---

## Отладка в Django

Для интерактивной работы с проектом используйте Django shell:
1. **Запуск Django shell:**
   ```powershell
   python manage.py shell
   ```
   **Пояснение:** Открывает интерактивную консоль Python с загруженным контекстом Django.

2. **Улучшенная версия (с IPython):**
   Установите `ipython`:
   ```powershell
   pip install ipython
   ```
   Затем используйте:
   ```powershell
   python manage.py shell
   ```
   **Пояснение:** IPython добавляет автодополнение и улучшенный интерфейс для shell.
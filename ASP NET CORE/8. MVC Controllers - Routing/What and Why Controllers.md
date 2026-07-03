# What and Why Controllers (ASP.NET Core)

Controllers — это один из основных способов построения Web API в ASP.NET Core (MVC-подход).

Они представляют собой класс, который:

- принимает HTTP-запросы
- обрабатывает их
- возвращает HTTP-ответ

---

# Зачем нужны Controllers

До появления Minimal APIs и в крупных приложениях controllers остаются важными, потому что они:

## 1. Структурируют код

Вместо того чтобы писать всё в `Program.cs`:

```csharp
app.MapGet("/departments", ...);
app.MapGet("/departments/{id}", ...);
```

логика выносится в отдельный класс.

---

## 2. Масштабируемость

Когда API становится большим:

- десятки endpoints
- сложная логика
- много зависимостей

Controllers помогают держать проект организованным.

---

## 3. Поддержка MVC-подхода

ASP.NET Core поддерживает:

- MVC (Model-View-Controller)
- Web API
- Razor Pages

Controllers — основа MVC/Web API.

---

# Проблема в твоём коде

Ты написал обычный класс:

```csharp
public class DeparmentsController
{
    public string GetDepartments()
    {
        return "Departments";
    }

    public string GetDepartmentById(int id)
    {
        return $"Department {id}";
    }
}
```

❗ Но это ещё НЕ controller в ASP.NET Core.

---

# Что не хватает

Чтобы класс стал controller’ом, нужно:

```csharp
[ApiController]
[Route("departments")]
public class DepartmentsController : ControllerBase
```

И наследование:

```csharp
ControllerBase
```

---

# Правильный вариант

```csharp
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("departments")]
    public class DepartmentsController : ControllerBase
    {
        [HttpGet]
        public string GetDepartments()
        {
            return "Departments";
        }

        [HttpGet("{id:int}")]
        public string GetDepartmentById(int id)
        {
            return $"Department {id}";
        }
    }
}
```

---

# Как это работает

## Запрос:

```
GET /departments
```

➡ попадёт в:

```csharp
GetDepartments()
```

---

## Запрос:

```
GET /departments/5
```

➡ попадёт в:

```csharp
GetDepartmentById(int id)
```

---

# Роль атрибутов

## `[ApiController]`

Включает автоматические возможности:

- автоматическая валидация моделей
- автоматический 400 Bad Request при ошибках
- привязка параметров

---

## `[Route]`

Определяет базовый путь:

```csharp
[Route("departments")]
```

---

## `[HttpGet] / [HttpPost]`

Определяют HTTP-метод:

```csharp
[HttpGet]
[HttpPost]
[HttpPut]
[HttpDelete]
```

---

## `[HttpGet("{id}")]`

Позволяет принимать параметры из URL:

```
/departments/10
```

---

# Почему controllers всё ещё используются

Minimal APIs:

✔ быстрее писать  
✔ проще для маленьких сервисов  

Controllers:

✔ лучше для больших проектов  
✔ лучше структура  
✔ больше встроенных возможностей  
✔ удобнее тестировать и расширять  

---

# Controller vs Minimal API

| Feature | Controllers | Minimal API |
|--------|------------|-------------|
| Простота | средняя | высокая |
| Масштаб | высокий | средний |
| Структура | строгая | гибкая |
| Подходит для | enterprise | small services |

---

# Итог

Controllers в ASP.NET Core — это способ организовать обработку HTTP-запросов через классы с атрибутами.

Они нужны для:

- структурирования больших проектов
- поддержки MVC архитектуры
- удобного расширения и тестирования

Твой пример — это обычный класс, но чтобы он стал контроллером, ему нужны:

```csharp
[ApiController]
[Route(...)]
ControllerBase
HttpGet/HttpPost атрибуты
```
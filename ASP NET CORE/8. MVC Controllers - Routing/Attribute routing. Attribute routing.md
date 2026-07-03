# Attribute Routing в ASP.NET Core

**Attribute Routing** — это способ настройки маршрутов прямо в коде контроллеров с помощью атрибутов (`[Route]`, `[HttpGet]`, `[HttpPost]` и т.д.), а не через централизованные конфигурации.

---

# 1. Базовая идея

Вместо того чтобы описывать маршруты в `Program.cs`, ты пишешь их прямо в контроллере:

```csharp
[Route("/api")]
public class DepartmentsController
{
}
```

Теперь все маршруты внутри контроллера будут начинаться с:

```
/api
```

---

# 2. Маршруты методов

## Вариант 1 — через `[Route]`

```csharp
[HttpGet]
[Route("departments")]
public string GetDepartments()
{
    return "Departments";
}
```

👉 Итоговый URL:

```
GET /api/departments
```

---

## Вариант 2 — через шаблон в HttpGet

```csharp
[HttpGet("departments/{id}")]
public string GetDepartmentById(int id)
{
    return $"Department {id}";
}
```

👉 Итоговый URL:

```
GET /api/departments/5
```

---

# 3. Как работает комбинирование маршрутов

ASP.NET Core просто **склеивает**:

```
[Route("/api")]
        +
[HttpGet("departments/{id}")]
```

👉 Получается:

```
/api/departments/{id}
```

---

# 4. Почему это удобно

## До attribute routing:

- маршруты в одном месте (Program.cs)
- сложно масштабировать

## После:

- логика + маршрут рядом
- проще читать и поддерживать
- удобно для больших API

---

# 5. Контроллер должен наследоваться от ControllerBase

В реальных приложениях правильно так:

```csharp
[ApiController]
[Route("api/[controller]")]
public class DepartmentsController : ControllerBase
{
}
```

---

# 6. Что делает `[ApiController]`

Этот атрибут включает:

### ✔ Автоматическую валидацию моделей
Если модель невалидна → автоматически `400 BadRequest`

### ✔ Улучшенный binding
- JSON body автоматически парсится
- query и route values привязываются автоматически

### ✔ Упрощённые ответы

Можно писать:

```csharp
return Ok(data);
return NotFound();
```

---

# 7. Регистрация контроллеров

## В `Program.cs`:

```csharp
builder.Services.AddControllers();
```

---

## Подключение маршрутов

### Рекомендуемый способ:

```csharp
app.MapControllers();
```

---

## Старый способ (не рекомендуется):

```csharp
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});
```

---

# 8. Итог маршрутизации

```
HTTP Request
     │
     ▼
Routing Middleware
     │
     ▼
Controller Selector
     │
     ▼
Attribute Routing
     │
     ▼
Controller Action
```

---

# 9. Преимущества Attribute Routing

## ✔ Ясность
Маршрут виден прямо над методом

## ✔ Масштабируемость
Легко добавлять новые endpoints

## ✔ Гибкость
Можно комбинировать:

- route prefix (`/api`)
- HTTP method (`GET`, `POST`)
- параметры (`{id}`)

---

# Итог

**Attribute Routing** — это современный способ настройки маршрутов в ASP.NET Core, где маршруты задаются через атрибуты прямо в контроллерах.

Он заменяет ручную настройку маршрутов в `Program.cs` и является стандартом для MVC и Web API приложений.
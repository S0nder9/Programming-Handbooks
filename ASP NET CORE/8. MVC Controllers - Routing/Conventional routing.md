# Conventional Routing (ASP.NET Core MVC)

**Conventional routing** — это подход, при котором маршруты не прописываются явно для каждого метода, а формируются по шаблону.

---

# Базовая идея

Маршрут строится по правилу:

```
/{controller}/{action}/{id?}
```

---

# Пример контроллера

```csharp
public class DepartmentsController
{
    public string Index()
    {
        return "Departments";
    }

    public string Details(int id)
    {
        return $"Department {id}";
    }
}
```

---

# Как это превращается в URL

| Метод | URL |
|------|-----|
| Index | `/Departments` |
| Details(5) | `/Departments/Details/5` |

ASP.NET Core сам сопоставляет:

- `controller` → `DepartmentsController`
- `action` → метод внутри контроллера
- `id` → параметр метода

---

# HTTP атрибуты

Можно уточнять HTTP метод через атрибуты:

```csharp
[HttpPost]
public string Create()
{
    return "Create Department";
}
```

Теперь:

```
POST /Departments/Create
```

---

```csharp
[HttpDelete]
public string Delete(int? id)
{
    return $"Delete Department {id}";
}
```

```
DELETE /Departments/Delete/5
```

---

# Атрибутный маршрут (override conventional routing)

```csharp
[HttpPost]
[Route("/department/{id}")]
public string Edit(int? id)
{
    return $"Update Department {id}";
}
```

Теперь маршрут игнорирует convention и становится:

```
POST /department/5
```

---

# Конфигурация routing pipeline

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}"
    );
});

app.Run();
```

---

# Что делает MapControllerRoute

```csharp
pattern: "{controller=Home}/{action=Index}/{id?}"
```

означает:

- `controller=Home` → значение по умолчанию
- `action=Index` → метод по умолчанию
- `id?` → необязательный параметр

---

# Примеры работы маршрута

## 1. Без параметров

```
/ 
```

➡ HomeController.Index()

---

## 2. Только controller

```
/Departments
```

➡ DepartmentsController.Index()

---

## 3. Controller + action

```
/Departments/Details/5
```

➡ DepartmentsController.Details(5)

---

# Conventional routing vs Attribute routing

## Conventional routing

- маршруты задаются шаблоном
- меньше кода
- проще для стандартных CRUD

---

## Attribute routing

```csharp
[Route("department/{id}")]
```

- маршрут прописан прямо над методом
- больше контроля
- гибкость
- используется в сложных API

---

# Ошибка в твоём коде

```csharp
public class DeparmentsController
```

Опечатка: должно быть

```csharp
DepartmentsController
```

---

Также обычно контроллер должен наследоваться от:

```csharp
Controller
```

или

```csharp
ControllerBase
```

например:

```csharp
public class DepartmentsController : ControllerBase
```

---

# Итог

**Conventional routing** — это способ маршрутизации, где URL строится по шаблону:

```
/{controller}/{action}/{id?}
```

ASP.NET Core автоматически:

- выбирает контроллер
- выбирает метод (action)
- связывает параметры

Атрибуты `[HttpGet]`, `[HttpPost]` и `[Route]` позволяют:

- уточнять HTTP методы
- переопределять маршрут
- комбинировать с conventional routing

Это делает ASP.NET Core гибким: можно использовать как строгую структуру, так и полностью кастомные маршруты.
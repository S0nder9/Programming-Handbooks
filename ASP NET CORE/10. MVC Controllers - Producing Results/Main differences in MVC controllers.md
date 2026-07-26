# Main Differences in MVC Controllers

После изучения **Minimal API** возникает вопрос: **чем MVC-контроллеры отличаются от Minimal API?**

---

# 1. Структура проекта

## Minimal API

Весь код можно написать в одном файле.

```csharp
var app = builder.Build();

app.MapGet("/employees", () =>
{
    return Results.Ok();
});

app.Run();
```

---

## MVC

Код разделяется по слоям.

```
Controllers/
    EmployeesController.cs

Models/
    Employee.cs

Views/
    Employees/
```

Каждый контроллер отвечает только за свою область приложения.

---

# 2. Используются контроллеры

Minimal API

```csharp
app.MapGet("/employees", ...);
```

MVC

```csharp
public class EmployeesController : Controller
{
    public IActionResult Index()
    {
        ...
    }
}
```

Все HTTP-запросы обрабатываются методами контроллера (**Actions**).

---

# 3. Routing

Minimal API

```csharp
app.MapGet("/employees/{id}", ...);
```

MVC

Маршруты могут задаваться:

### Атрибутами

```csharp
[Route("employees")]
public class EmployeesController : Controller
{
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        ...
    }
}
```

или

### Convention Routing

```csharp
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
```

---

# 4. Возвращаемые значения

Minimal API

Обычно возвращают

```csharp
IResult
```

или

```csharp
TypedResults.Ok(...)
```

Например

```csharp
return Results.Ok(employee);
```

---

MVC

Чаще используются

```csharp
IActionResult
```

или

```csharp
ActionResult<T>
```

Например

```csharp
return Ok(employee);

return NotFound();

return BadRequest();
```

---

# 5. Работа с представлениями (Views)

Minimal API

Не поддерживает Razor Views.

Обычно используется только как Web API.

---

MVC

Может возвращать HTML-страницы.

```csharp
public IActionResult Index()
{
    return View();
}
```

Файл:

```
Views/Home/Index.cshtml
```

генерирует HTML.

---

# 6. Model Binding

Возможности практически одинаковые.

Поддерживаются:

- Route;
- Query;
- Header;
- Body;
- Form.

Например

```csharp
public IActionResult Create(
    [FromBody] Employee employee)
{
    ...
}
```

---

# 7. Model Validation

В MVC есть встроенная поддержка валидации.

```csharp
public IActionResult Create(Employee employee)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    ...
}
```

При использовании

```csharp
[ApiController]
```

эта проверка выполняется автоматически.

---

# 8. Filters

MVC поддерживает фильтры.

Например:

```csharp
[Authorize]

[ValidateAntiForgeryToken]

[ServiceFilter]
```

Также можно создавать собственные:

- Action Filter;
- Exception Filter;
- Authorization Filter;
- Resource Filter;
- Result Filter.

В Minimal API аналогичную роль выполняют **Endpoint Filters** (начиная с .NET 7).

---

# 9. Dependency Injection

В обоих подходах используется встроенный контейнер зависимостей.

Minimal API

```csharp
app.MapGet("/employees",
    (IEmployeeRepository repository) =>
{
    ...
});
```

MVC

```csharp
public class EmployeesController : Controller
{
    private readonly IEmployeeRepository _repository;

    public EmployeesController(
        IEmployeeRepository repository)
    {
        _repository = repository;
    }
}
```

---

# 10. Назначение

### Minimal API

Лучше подходит для:

- REST API;
- микросервисов;
- небольших проектов;
- быстрых прототипов.

---

### MVC

Лучше подходит для:

- крупных проектов;
- сложной бизнес-логики;
- приложений с Razor Views;
- проектов, где важна чёткая архитектура.

---

# Сравнение

| Возможность | Minimal API | MVC Controllers |
|--------------|-------------|-----------------|
| Простота | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Структура проекта | Простая | Более строгая |
| Контроллеры | ❌ Нет | ✅ Да |
| Razor Views | ❌ | ✅ |
| API | ✅ | ✅ |
| Routing | `MapGet()`, `MapPost()` | Атрибуты и Convention Routing |
| Model Binding | ✅ | ✅ |
| Validation | ✅ | ✅ |
| Filters | Endpoint Filters | MVC Filters |
| Dependency Injection | Через параметры | Обычно через конструктор |
| Лучше подходит | Маленькие API, микросервисы | Крупные приложения и веб-сайты |

---

# Итог

**Minimal API** и **MVC Controllers** используют одну и ту же инфраструктуру ASP.NET Core (маршрутизацию, Model Binding, Validation, Dependency Injection), но отличаются способом организации кода.

- **Minimal API** делает акцент на простоте и минимальном количестве кода, поэтому отлично подходит для REST API и небольших сервисов.
- **MVC Controllers** предлагают более структурированный подход с контроллерами, поддержкой представлений (Razor Views), фильтрами и другими возможностями, что делает их предпочтительным выбором для крупных веб-приложений.

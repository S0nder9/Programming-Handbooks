# Filter Scopes

В MVC и Razor Pages фильтры могут применяться на разных уровнях (**Scopes**).

Область применения определяет, **для каких запросов будет выполняться фильтр**.

---

# MVC Scopes

В MVC существует три уровня применения фильтров.

## 1. Action Scope

Фильтр применяется только к одному Action.

```csharp
[WriteToConsoleResourceFilter]
public IActionResult Index()
{
    return View();
}
```

Будет работать только для метода

```
Index()
```

Другие методы контроллера этот фильтр не получат.

---

## 2. Controller Scope

Фильтр применяется ко всему контроллеру.

```csharp
[WriteToConsoleResourceFilter]
public class DepartmentsController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Details(int id)
    {
        return View();
    }
}
```

Теперь фильтр будет вызван для:

```
Index()

Details()

Create()

Delete()

...
```

то есть для всех Action данного контроллера.

---

## 3. Global Scope

Фильтр применяется ко всем контроллерам приложения.

```csharp
builder.Services.AddControllersWithViews(options =>
{
    options.Filters.Add<WriteToConsoleResourceFilter>();
});
```

После регистрации фильтр будет работать для любого Action любого контроллера.

---

# Razor Pages Scopes

В Razor Pages уровней меньше.

---

## 1. Page Scope

Фильтр применяется только к одной Razor Page.

Например:

```csharp
[WriteToConsoleResourceFilter]
public class IndexModel : PageModel
{
}
```

Фильтр будет работать только для данной страницы.

---

## 2. Global Scope

Фильтр применяется ко всем Razor Pages.

```csharp
builder.Services
    .AddRazorPages()
    .AddMvcOptions(options =>
    {
        options.Filters.Add<WriteToConsoleResourceFilter>();
    });
```

Теперь фильтр будет выполняться для каждой Razor Page приложения.

---

# Глобальная регистрация

Для MVC:

```csharp
builder.Services.AddControllersWithViews(options =>
{
    options.Filters.Add<WriteToConsoleResourceFilter>();
});
```

Для Razor Pages:

```csharp
builder.Services
    .AddRazorPages()
    .AddMvcOptions(options =>
    {
        options.Filters.Add<WriteToConsoleResourceFilter>();
    });
```

Если используется только API-контроллеры без представлений, обычно достаточно:

```csharp
builder.Services.AddControllers(options =>
{
    options.Filters.Add<WriteToConsoleResourceFilter>();
});
```

---

# Порядок выполнения Scope

Если один и тот же тип фильтра зарегистрирован на нескольких уровнях, он выполняется от **наиболее общего** к **наиболее конкретному**, а после выполнения Action — в обратном порядке.

Например:

```
Global Filter

Controller Filter

Action Filter

Controller Action

Action Filter

Controller Filter

Global Filter
```

---

# Схема

```
HTTP Request
      │
      ▼
Global Filter
      │
      ▼
Controller Filter
      │
      ▼
Action Filter
      │
      ▼
Controller Action
      │
      ▼
Action Filter
      │
      ▼
Controller Filter
      │
      ▼
Global Filter
      │
      ▼
HTTP Response
```

---

# Как выбрать область применения?

| Scope | Когда использовать |
|--------|--------------------|
| **Action** | Логика нужна только для одного метода |
| **Controller** | Логика должна применяться ко всем Action конкретного контроллера |
| **Global** | Логика должна выполняться для всего приложения |

---

# Итог

## MVC

Фильтры можно применять на трёх уровнях:

1. **Action** — только для одного метода.
2. **Controller** — для всех Action контроллера.
3. **Global** — для всех контроллеров приложения.

## Razor Pages

Доступны два уровня:

1. **Page** — только для одной Razor Page.
2. **Global** — для всех Razor Pages.

При наличии нескольких уровней фильтры выполняются от глобального к локальному до выполнения Action (или Page Handler), а после его завершения — в обратном порядке.
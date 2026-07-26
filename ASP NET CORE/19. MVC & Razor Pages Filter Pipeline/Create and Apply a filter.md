# Create and Apply a Filter

В MVC и Razor Pages фильтры можно создавать двумя основными способами:

1. Реализовать один из интерфейсов (`IActionFilter`, `IResourceFilter`, `IResultFilter` и др.).
2. Унаследоваться от готового базового класса (`ActionFilterAttribute`, `ResultFilterAttribute` и т.д.).

Оба способа дают одинаковый результат, но второй используется значительно чаще.

---

# Способ 1. Реализовать интерфейс

Например, создадим **Resource Filter**.

```csharp
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebApp.Filters
{
    public class WriteToConsoleResourceFilter
        : Attribute, IResourceFilter
    {
        public void OnResourceExecuting(
            ResourceExecutingContext context)
        {
            Console.WriteLine(
                "Executing: " +
                context.ActionDescriptor.DisplayName);
        }

        public void OnResourceExecuted(
            ResourceExecutedContext context)
        {
            Console.WriteLine(
                "Executed: " +
                context.ActionDescriptor.DisplayName);
        }
    }
}
```

Методы:

```csharp
OnResourceExecuting(...)
```

вызывается **до выполнения Action**.

---

```csharp
OnResourceExecuted(...)
```

вызывается **после выполнения Action**.

---

# Способ 2. Наследоваться от ActionFilterAttribute

Чаще используют именно этот вариант.

```csharp
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebApp.Filters
{
    public class WriteToConsoleResourceFilter
        : ActionFilterAttribute
    {
        public override void OnActionExecuting(
            ActionExecutingContext context)
        {
            Console.WriteLine(
                "Executing: " +
                context.ActionDescriptor.DisplayName);
        }

        public override void OnActionExecuted(
            ActionExecutedContext context)
        {
            Console.WriteLine(
                "Executed: " +
                context.ActionDescriptor.DisplayName);
        }
    }
}
```

`ActionFilterAttribute` уже реализует интерфейсы фильтра, поэтому достаточно переопределить (`override`) только нужные методы.

---

# Подключение фильтра

## Через атрибут

```csharp
[WriteToConsoleResourceFilter]
public IActionResult Index()
{
    return Content("Hi!", "text/html");
}
```

Теперь перед каждым вызовом метода

```csharp
Index()
```

будет запускаться фильтр.

---

## Через TypeFilter

Если фильтр использует зависимости (Dependency Injection), применяется атрибут `TypeFilter`.

Сначала регистрируем фильтр:

```csharp
builder.Services.AddScoped<WriteToConsoleResourceFilter>();
```

Затем:

```csharp
[TypeFilter(typeof(WriteToConsoleResourceFilter))]
public IActionResult Index()
{
    return Content("Hi!");
}
```

ASP.NET Core создаст экземпляр фильтра через контейнер зависимостей и внедрит все необходимые сервисы.

---

# TypeFilter vs обычный атрибут

Обычный атрибут:

```csharp
[WriteToConsoleResourceFilter]
```

- создаётся как обычный атрибут;
- не поддерживает внедрение зависимостей через конструктор.

---

`TypeFilter`:

```csharp
[TypeFilter(typeof(WriteToConsoleResourceFilter))]
```

- создаёт фильтр через DI-контейнер;
- позволяет использовать любые зарегистрированные сервисы.

Например:

```csharp
public class WriteToConsoleResourceFilter
    : ActionFilterAttribute
{
    private readonly ILogger<WriteToConsoleResourceFilter> logger;

    public WriteToConsoleResourceFilter(
        ILogger<WriteToConsoleResourceFilter> logger)
    {
        this.logger = logger;
    }

    public override void OnActionExecuting(
        ActionExecutingContext context)
    {
        logger.LogInformation("Before Action");
    }
}
```

Такой фильтр можно подключить только через `TypeFilter` (или `ServiceFilter`).

---

# Когда выполняется фильтр?

Для метода

```csharp
[WriteToConsoleResourceFilter]
public IActionResult Index()
{
    Console.WriteLine("Action");

    return Content("Hi");
}
```

последовательность будет следующей:

```
Executing

Action

Executed
```

---

# Схема выполнения

```
HTTP Request
      │
      ▼
Routing
      │
      ▼
Action Filter
Before
      │
      ▼
Controller Action
      │
      ▼
Action Filter
After
      │
      ▼
HTTP Response
```

---

# Можно ли применить фильтр ко всему контроллеру?

Да.

```csharp
[WriteToConsoleResourceFilter]
public class DepartmentsController : Controller
{
    ...
}
```

Теперь фильтр будет работать для всех Action этого контроллера.

---

# Можно ли зарегистрировать фильтр глобально?

Да.

```csharp
builder.Services.AddControllers(options =>
{
    options.Filters.Add<WriteToConsoleResourceFilter>();
});
```

После этого фильтр будет применяться ко всем контроллерам приложения.

---

# Итог

Создать фильтр можно двумя способами:

### Через интерфейс

```csharp
public class MyFilter
    : IResourceFilter
```

или

### Через наследование

```csharp
public class MyFilter
    : ActionFilterAttribute
```

Применить фильтр можно:

- к одному Action:

```csharp
[WriteToConsoleResourceFilter]
```

- к целому контроллеру:

```csharp
[WriteToConsoleResourceFilter]
public class DepartmentsController : Controller
```

- через DI:

```csharp
[TypeFilter(typeof(WriteToConsoleResourceFilter))]
```

- или глобально:

```csharp
options.Filters.Add<WriteToConsoleResourceFilter>();
```

На практике для фильтров без зависимостей обычно используют обычный атрибут, а если фильтру нужны сервисы из контейнера зависимостей, применяют `TypeFilter` или `ServiceFilter`.
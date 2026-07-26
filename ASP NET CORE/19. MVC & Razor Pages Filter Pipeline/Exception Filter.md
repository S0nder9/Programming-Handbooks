# Exception Filter

**Exception Filter** — это фильтр, который перехватывает необработанные исключения, возникшие во время выполнения MVC Action или других MVC-фильтров.

Он позволяет:

- обработать исключение;
- записать информацию об ошибке в журнал;
- вернуть собственный HTTP-ответ вместо стандартной страницы ошибки.

---

# Когда выполняется?

Exception Filter срабатывает только тогда, когда внутри MVC возникает необработанное исключение.

Например:

```csharp
[HttpGet]
[HandleExceptionFilter]
public IActionResult GetDepartments()
{
    throw new ApplicationException("Test");

    return Ok();
}
```

Во время выполнения Action возникает исключение

```
ApplicationException
```

После этого управление передаётся Exception Filter.

---

# Создание фильтра

Самый простой способ — наследоваться от

```csharp
ExceptionFilterAttribute
```

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebApp.Filters
{
    public class HandleExceptionFilter
        : ExceptionFilterAttribute
    {
        public override void OnException(
            ExceptionContext context)
        {
            var error = new ProblemDetails
            {
                Title = "Error",
                Detail = context.Exception.Message,
                Status = 500
            };

            context.Result = new ObjectResult(error)
            {
                StatusCode = 500
            };

            context.ExceptionHandled = true;
        }
    }
}
```

---

# Что делает этот код?

Получает возникшее исключение:

```csharp
context.Exception
```

Создаёт объект

```csharp
ProblemDetails
```

```csharp
var error = new ProblemDetails
{
    Title = "Error",
    Detail = context.Exception.Message,
    Status = 500
};
```

Возвращает клиенту ответ

```csharp
context.Result =
    new ObjectResult(error)
{
    StatusCode = 500
};
```

И сообщает MVC, что исключение обработано:

```csharp
context.ExceptionHandled = true;
```

---

# Почему используется ProblemDetails?

`ProblemDetails` — стандартный формат описания ошибок в HTTP API (RFC 7807).

Ответ будет выглядеть примерно так:

```json
{
  "title": "Error",
  "detail": "Test",
  "status": 500
}
```

Такой формат понимают многие HTTP-клиенты и инструменты.

---

# Что делает `ExceptionHandled`?

```csharp
context.ExceptionHandled = true;
```

означает:

```
Исключение обработано.
```

После этого ASP.NET Core **не будет** передавать исключение дальше.

Если этого не сделать,

```csharp
context.ExceptionHandled = false;
```

(или вообще не устанавливать свойство),

исключение продолжит распространяться дальше и может быть обработано глобальным middleware `UseExceptionHandler()` или привести к стандартной ошибке 500.

---

# Подключение фильтра

К одному Action:

```csharp
[HandleExceptionFilter]
public IActionResult GetDepartments()
{
    ...
}
```

---

К контроллеру:

```csharp
[HandleExceptionFilter]
public class DepartmentsController : Controller
{
}
```

---

Глобально:

```csharp
builder.Services.AddControllers(options =>
{
    options.Filters.Add<HandleExceptionFilter>();
});
```

Тогда фильтр будет обрабатывать исключения всех MVC-контроллеров.

---

# Порядок выполнения

Если во время выполнения Action возникает исключение:

```
HTTP Request
        │
        ▼
Authorization Filter
        │
        ▼
Resource Filter
        │
        ▼
Action Filter
        │
        ▼
Controller Action
        │
        ▼
Exception
        │
        ▼
Exception Filter
        │
        ▼
HTTP Response
```

---

# Exception Filter и Middleware

Exception Filter работает **только внутри MVC**.

Middleware

```csharp
app.UseExceptionHandler();
```

работает для **всего приложения**, включая:

- Minimal API;
- MVC;
- Razor Pages;
- статические файлы;
- другие middleware.

Поэтому в большинстве приложений для общей обработки ошибок используют именно `UseExceptionHandler()`, а Exception Filter применяют, когда нужно обработать ошибки только в MVC или для отдельных контроллеров/действий.

---

# Итог

**Exception Filter** предназначен для обработки необработанных исключений, возникающих во время выполнения MVC.

Он позволяет:

- перехватить исключение через `context.Exception`;
- сформировать собственный ответ (например, `ProblemDetails`);
- установить HTTP-статус;
- остановить дальнейшее распространение исключения с помощью

```csharp
context.ExceptionHandled = true;
```

Exception Filter работает только внутри MVC-конвейера и не заменяет глобальный middleware `UseExceptionHandler()`, который рекомендуется использовать для обработки ошибок во всём приложении.
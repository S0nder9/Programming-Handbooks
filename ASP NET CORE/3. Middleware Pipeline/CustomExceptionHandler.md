# Custom Exception Handler Middleware

Глобальный обработчик исключений позволяет перехватывать все необработанные ошибки приложения и возвращать клиенту понятный ответ вместо падения приложения.

---

## Регистрация middleware

```csharp
builder.Services.AddTransient<MyCustomExceptionHandler>();

var app = builder.Build();

app.UseMiddleware<MyCustomExceptionHandler>();
```

⚠️ Middleware обработки исключений должен стоять первым в pipeline, иначе он не сможет перехватить ошибки предыдущих middleware.

---

## Реализация

```csharp
namespace WebApp.MiddleComponents
{
    public class MyCustomExceptionHandler : IMiddleware
    {
        public async Task InvokeAsync(
            HttpContext context,
            RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                if (!context.Response.HasStarted)
                {
                    context.Response.Clear();

                    context.Response.StatusCode =
                        StatusCodes.Status500InternalServerError;

                    context.Response.ContentType =
                        "text/html; charset=utf-8";
                }

                var errorHtml = $@"
                <html>
                <head>
                    <title>Server Error</title>
                </head>
                <body>
                    <h1 style='color:red'>
                        An error occurred
                    </h1>

                    <p>
                        {System.Net.WebUtility.HtmlEncode(ex.Message)}
                    </p>
                </body>
                </html>";

                await context.Response.WriteAsync(errorHtml);
            }
        }
    }
}
```

---

## Что происходит

Предположим, pipeline выглядит так:

```csharp
app.UseMiddleware<MyCustomExceptionHandler>();

app.Use(async (context, next) =>
{
    await context.Response.WriteAsync("Middleware 1: Before\n");

    await next(context);

    await context.Response.WriteAsync("Middleware 1: After\n");
});

app.Use(async (context, next) =>
{
    await context.Response.WriteAsync("Middleware 2: Before\n");

    await next(context);

    await context.Response.WriteAsync("Middleware 2: After\n");
});

app.Use(async (context, next) =>
{
    throw new ApplicationException("TEST EXCEPTION");
});

app.Run();
```

---

## Порядок выполнения

Запрос идет сверху вниз:

```text
Request
    ↓
ExceptionHandler
    ↓
Middleware 1
    ↓
Middleware 2
    ↓
Middleware 3
```

---

### Middleware 1

```csharp
await context.Response.WriteAsync("Middleware 1: Before\n");
await next(context);
```

Вывод:

```text
Middleware 1: Before
```

---

### Middleware 2

```csharp
await context.Response.WriteAsync("Middleware 2: Before\n");
await next(context);
```

Вывод:

```text
Middleware 2: Before
```

---

### Middleware 3

```csharp
throw new ApplicationException("TEST EXCEPTION");
```

Происходит исключение:

```text
ApplicationException
```

---

## Как работает стек вызовов

Ошибка начинает подниматься вверх:

```text
Middleware 3
    ↑
Middleware 2
    ↑
Middleware 1
    ↑
ExceptionHandler
```

Ни Middleware 2, ни Middleware 1 не успевают выполнить код после `await next()`.

То есть:

```csharp
await context.Response.WriteAsync("Middleware 2: After");
```

и

```csharp
await context.Response.WriteAsync("Middleware 1: After");
```

никогда не выполнятся.

---

## ExceptionHandler ловит ошибку

Управление попадает сюда:

```csharp
catch (Exception ex)
{
    ...
}
```

В переменной:

```csharp
ex.Message
```

будет:

```text
TEST EXCEPTION
```

---

## Формирование ответа

```csharp
context.Response.StatusCode = 500;
```

Статус ответа:

```http
500 Internal Server Error
```

---

```csharp
context.Response.ContentType =
    "text/html; charset=utf-8";
```

Браузер понимает, что пришел HTML.

---

```csharp
await context.Response.WriteAsync(errorHtml);
```

Клиент получает страницу:

```html
<html>
<body>
    <h1>An error occurred</h1>
    <p>TEST EXCEPTION</p>
</body>
</html>
```

---

## Почему нужен HasStarted

Проверка:

```csharp
if (!context.Response.HasStarted)
```

нужна потому что после начала отправки ответа нельзя менять:

```csharp
context.Response.StatusCode
```

или

```csharp
context.Response.Headers
```

Иначе будет ошибка:

```text
Headers are read-only, response has already started.
```

---

## Итоговая схема

```text
Request
    ↓
ExceptionHandler
    ↓
Middleware 1
    ↓
Middleware 2
    ↓
Middleware 3
    ↓
throw Exception
    ↑
ExceptionHandler
    ↓
500 Internal Server Error
    ↓
HTML с описанием ошибки
    ↓
Client
```

---

## Для чего используется

Глобальный обработчик исключений обычно используется для:

- возврата красивой страницы ошибки;
- возврата JSON ошибок в API;
- логирования исключений;
- сокрытия внутренних ошибок приложения от пользователя;
- предотвращения падения приложения при необработанных исключениях.

По сути `MyCustomExceptionHandler` — упрощенная версия встроенного middleware:

```csharp
app.UseExceptionHandler("/error");
```

которое предоставляет ASP.NET Core.
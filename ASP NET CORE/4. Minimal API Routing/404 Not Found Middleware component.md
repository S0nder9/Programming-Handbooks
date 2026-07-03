# 404 Not Found Middleware Component

Если запрос не был обработан ни одним endpoint'ом, ASP.NET Core автоматически возвращает:

```http
404 Not Found
```

Например:

```http
GET /employees
```

Если такого маршрута нет:

```csharp
app.MapGet("/users", () => "Users");
```

то клиент получит:

```http
HTTP/1.1 404 Not Found
```

---

## Почему появляется 404

Предположим приложение содержит:

```csharp
app.MapGet("/users", () => "Users");
```

Поступает запрос:

```http
GET /employees
```

ASP.NET Core выполняет:

```text
Request
    ↓
Routing
    ↓
Поиск endpoint
    ↓
Endpoint не найден
    ↓
404 Not Found
```

---

## Что происходит внутри

Во время маршрутизации:

```csharp
var endpoint = context.GetEndpoint();
```

Если маршрут не найден:

```csharp
endpoint == null
```

После завершения pipeline ASP.NET Core понимает:

```text
Никто не обработал запрос
```

и автоматически устанавливает:

```csharp
context.Response.StatusCode = 404;
```

---

## Пример

```csharp
var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/employees", () =>
{
    return "Employees";
});

app.Run();
```

---

Запрос:

```http
GET /
```

Ответ:

```http
404 Not Found
```

Потому что существует только:

```text
/employees
```

---

## Своя обработка 404

Можно добавить middleware:

```csharp
app.Use(async (context, next) =>
{
    await next();

    if (context.Response.StatusCode == 404)
    {
        await context.Response.WriteAsync(
            "Page not found"
        );
    }
});
```

---

## Красивая HTML-страница

```csharp
app.Use(async (context, next) =>
{
    await next();

    if (context.Response.StatusCode == 404)
    {
        context.Response.ContentType =
            "text/html";

        await context.Response.WriteAsync("""
            <h1>404 Not Found</h1>
            <p>Requested page does not exist.</p>
            """);
    }
});
```

---

## Re-Execute Middleware

ASP.NET Core предоставляет встроенный middleware:

```csharp
app.UseStatusCodePagesWithReExecute("/error/{0}");
```

Если возникнет:

```http
404 Not Found
```

то произойдет перенаправление внутри приложения на:

```text
/error/404
```

---

Пример:

```csharp
app.UseStatusCodePagesWithReExecute("/error/{0}");

app.MapGet("/error/{code}", (int code) =>
{
    return $"Error {code}";
});
```

Запрос:

```http
GET /unknown
```

Ответ:

```text
Error 404
```

---

## Отличие от Exception Handler

### 404

```text
Маршрут не найден
```

Пример:

```http
GET /abc
```

если `/abc` не существует.

---

### 500

```text
Маршрут найден,
но произошла ошибка
```

Пример:

```csharp
app.MapGet("/", () =>
{
    throw new Exception();
});
```

Результат:

```http
500 Internal Server Error
```

---

## Итог

ASP.NET Core по умолчанию умеет обрабатывать отсутствующие маршруты.

Схема:

```text
Request
    ↓
Routing
    ↓
Endpoint найден?
    │
    ├── Да
    │     ↓
    │  Выполнение endpoint
    │
    └── Нет
          ↓
      404 Not Found
```

Поэтому если ни один `MapGet()`, `MapPost()`, `MapPut()` или другой endpoint не соответствует запросу, клиент автоматически получит статус:

```http
404 Not Found
```
без необходимости писать дополнительный код.
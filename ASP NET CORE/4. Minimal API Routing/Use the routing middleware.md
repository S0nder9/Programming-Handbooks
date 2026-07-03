# Use the Routing Middleware

## Что делает UseRouting()?

`UseRouting()` — встроенный middleware ASP.NET Core, который анализирует входящий запрос и ищет подходящий endpoint.

Он сравнивает:

- HTTP-метод (`GET`, `POST`, `PUT`, `DELETE` и т.д.);
- URL-путь (`/employees`, `/users`, `/products` и т.д.).

---

## Схема работы

```text
Request
    ↓
UseRouting()
    ↓
Поиск подходящего Endpoint
    ↓
Endpoint найден
    ↓
Следующие middleware
    ↓
Endpoint выполняется
    ↓
Response
```

---

## Пример

```csharp
app.UseRouting();

app.MapGet("/employees", async context =>
{
    await context.Response.WriteAsync("Employees");
});
```

Запрос:

```http
GET /employees
```

После выполнения `UseRouting()` ASP.NET понимает:

```text
Endpoint = GET /employees
```

и сохраняет найденный endpoint в `HttpContext`.

---

## Получение найденного Endpoint

После `UseRouting()` можно узнать, какой endpoint был выбран:

```csharp
app.Use(async (context, next) =>
{
    var endpoint = context.GetEndpoint();

    Console.WriteLine(endpoint?.DisplayName);

    await next(context);
});
```

---

## Почему порядок важен

Правильно:

```csharp
app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();
```

---

Неправильно:

```csharp
app.UseAuthentication();

app.UseRouting();
```

Потому что middleware авторизации и аутентификации часто используют информацию о найденном endpoint.

Если маршрутизация ещё не выполнилась:

```csharp
context.GetEndpoint()
```

вернёт:

```csharp
null
```

---

## Что происходит в твоём примере

```csharp
app.Use(async (context, next) =>
{
    await next(context);
});

app.UseRouting();

app.Use(async (context, next) =>
{
    await next(context);
});
```

Pipeline:

```text
Request
    ↓
Middleware 1
    ↓
UseRouting
    ↓
Middleware 2
    ↓
Endpoint
    ↓
Response
```

---

## Более наглядный пример

```csharp
app.Use(async (context, next) =>
{
    Console.WriteLine("Before Routing");

    await next(context);
});

app.UseRouting();

app.Use(async (context, next) =>
{
    var endpoint = context.GetEndpoint();

    Console.WriteLine(
        $"Endpoint: {endpoint?.DisplayName}"
    );

    await next(context);
});

app.MapGet("/employees", () => "Employees");
```

Запрос:

```http
GET /employees
```

Вывод:

```text
Before Routing
Endpoint: HTTP: GET /employees
```

---

## Что сохраняет UseRouting()

После поиска маршрута в `HttpContext` сохраняется информация:

```csharp
context.GetEndpoint()
```

Например:

```text
HTTP: GET /employees
```

или

```text
HTTP: POST /employees
```

---

## Связка UseRouting + UseEndpoints

В старых версиях ASP.NET Core:

```csharp
app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapGet("/employees", ...);
});
```

---

Что происходит:

```text
UseRouting
    ↓
Находит endpoint
    ↓
UseEndpoints
    ↓
Выполняет endpoint
```

---

## Современный подход (.NET 6+)

Сегодня обычно пишут:

```csharp
app.UseRouting();

app.MapGet("/employees", () => "Employees");
```

или вообще:

```csharp
app.MapGet("/employees", () => "Employees");
```

ASP.NET Core сам добавляет необходимую маршрутизацию.

---

## Итог

`UseRouting()`:

1. Анализирует HTTP-метод и URL.
2. Находит подходящий endpoint.
3. Сохраняет его в `HttpContext`.
4. Позволяет следующим middleware использовать информацию о маршруте.
5. Сам не выполняет endpoint — только выбирает его.

Схема:

```text
Request
    ↓
UseRouting()
    ↓
Выбор Endpoint
    ↓
Authentication
    ↓
Authorization
    ↓
Endpoint
    ↓
Response
```
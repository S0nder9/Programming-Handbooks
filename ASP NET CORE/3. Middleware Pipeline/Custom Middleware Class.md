## Custom Middleware Class

Для больших проектов middleware обычно выносят в отдельный класс.

Преимущества:

- код не засоряет `Program.cs`;
- middleware можно переиспользовать;
- можно внедрять зависимости через DI;
- проще тестировать.

---

## Шаг 1. Создать middleware-класс

```csharp
namespace WebApp.MiddleComponents
{
    public class MyCustomMiddleware : IMiddleware
    {
        public async Task InvokeAsync(
            HttpContext context,
            RequestDelegate next)
        {
            await context.Response.WriteAsync(
                "Middleware custom 2: Before"
            );

            await next(context);

            await context.Response.WriteAsync(
                "Middleware custom 2: After"
            );
        }
    }
}
```

### Что такое IMiddleware?

Интерфейс требует реализовать метод:

```csharp
Task InvokeAsync(
    HttpContext context,
    RequestDelegate next
)
```

Он работает аналогично:

```csharp
app.Use(async (context, next) =>
{
});
```

---

## Шаг 2. Зарегистрировать в DI

Так как middleware является сервисом, его нужно зарегистрировать:

```csharp
builder.Services.AddTransient<MyCustomMiddleware>();
```

---

### Время жизни

```csharp
AddTransient<T>()
```

Создается новый объект при каждом запросе.

Также можно использовать:

```csharp
AddScoped<T>()
```

или

```csharp
AddSingleton<T>()
```

но для middleware чаще используют `Transient`.

---

## Шаг 3. Подключить в pipeline

```csharp
app.UseMiddleware<MyCustomMiddleware>();
```

---

## Порядок выполнения

```csharp
app.Use(... Middleware1 ...);

app.UseMiddleware<MyCustomMiddleware>();

app.Use(... Middleware2 ...);

app.Use(... Middleware3 ...);
```

---

При запросе:

```text
Middleware 1: Before

Middleware custom 2: Before

Middleware 2: Before

Middleware 3: Before

Middleware 3: After

Middleware 2: After

Middleware custom 2: After

Middleware 1: After
```

---

## Внедрение зависимостей

Большое преимущество класса middleware:

```csharp
public class MyCustomMiddleware : IMiddleware
{
    private readonly ILogger<MyCustomMiddleware> _logger;

    public MyCustomMiddleware(
        ILogger<MyCustomMiddleware> logger)
    {
        _logger = logger;
    }

    public async Task InvokeAsync(
        HttpContext context,
        RequestDelegate next)
    {
        _logger.LogInformation("Request");

        await next(context);
    }
}
```

ASP.NET автоматически передаст `ILogger`.

---

## Другой способ создания middleware

Без `IMiddleware`.

```csharp
public class MyMiddleware
{
    private readonly RequestDelegate _next;

    public MyMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        await context.Response.WriteAsync("Before");

        await _next(context);

        await context.Response.WriteAsync("After");
    }
}
```

Подключение:

```csharp
app.UseMiddleware<MyMiddleware>();
```

---

## Разница подходов

### Через IMiddleware

```csharp
class MyMiddleware : IMiddleware
```

✔ регистрируется в DI  
✔ удобно внедрять зависимости  
✔ рекомендуется для сложных middleware

---

### Через RequestDelegate

```csharp
class MyMiddleware
{
    public Task InvokeAsync(...)
}
```

✔ проще  
✔ чаще встречается в документации  
✔ не требует регистрации сервиса

---

## Кратко

1. Создаем класс:

```csharp
class MyCustomMiddleware : IMiddleware
```

2. Регистрируем:

```csharp
builder.Services.AddTransient<MyCustomMiddleware>();
```

3. Подключаем:

```csharp
app.UseMiddleware<MyCustomMiddleware>();
```

После этого middleware работает так же, как и middleware, созданные через:

```csharp
app.Use(...)
```

но код становится чище и лучше подходит для реальных проектов.
## Use app.Use to create middleware

`app.Use()` добавляет middleware в конвейер обработки запросов.

Важно понимать:

```csharp
var app = builder.Build();
```

только создает приложение.

```csharp
app.Run();
```

запускает веб-сервер и начинает ожидать HTTP-запросы.

Пока запросов нет — middleware не выполняются.

---

## Порядок выполнения

Код:

```csharp
app.Use(async (context, next) =>
{
    await context.Response.WriteAsync("Middleware 1: Before");

    await next(context);

    await context.Response.WriteAsync("Middleware 1: After");
});

app.Use(async (context, next) =>
{
    await context.Response.WriteAsync("Middleware 2: Before");

    await next(context);

    await context.Response.WriteAsync("Middleware 2: After");
});

app.Use(async (context, next) =>
{
    await context.Response.WriteAsync("Middleware 3: Before");

    await next(context);

    await context.Response.WriteAsync("Middleware 3: After");
});
```

При запросе произойдет:

```text
Middleware 1: Before
Middleware 2: Before
Middleware 3: Before
Middleware 3: After
Middleware 2: After
Middleware 1: After
```

Потому что каждый `await next(context)` передает управление следующему middleware.

---

## Визуально

```text
Middleware 1
 ├─ Before
 │
 └─ Middleware 2
     ├─ Before
     │
     └─ Middleware 3
         ├─ Before
         └─ After

     └─ After

 └─ After
```

Это называется **конвейер (pipeline)**.

---

## Короткое замыкание (Short Circuit)

Если не вызвать:

```csharp
await next(context);
```

то выполнение остановится.

Например:

```csharp
app.Use(async (context, next) =>
{
    await context.Response.WriteAsync(
        "Middleware 1: Before"
    );

    await context.Response.WriteAsync(
        "Middleware 1: After"
    );
});
```

Результат:

```text
Middleware 1: Before
Middleware 1: After
```

До второго middleware запрос никогда не дойдет.

---

## Почему иногда компилятор требует вызвать next?

Есть две перегрузки `Use`.

### Полная форма

```csharp
app.Use(async (
    HttpContext context,
    RequestDelegate next) =>
{
    ...
});
```

Здесь ты работаешь напрямую с `RequestDelegate`.

Можно вызвать:

```csharp
await next(context);
```

или не вызвать вообще.

Компилятор не ругается.

---

### Сокращенная форма

```csharp
app.Use(async (context, next) =>
{
    ...
});
```

Здесь используется другая перегрузка:

```csharp
Func<HttpContext, Func<Task>, Task>
```

Внутри ASP.NET ожидает, что ты либо:

```csharp
await next();
```

либо явно завершишь запрос.

Если просто удалить `next()`, иногда появляются предупреждения анализа кода о том, что middleware не передает управление дальше.

---

## Правильное отключение middleware

Если хочешь намеренно остановить конвейер:

```csharp
app.Use(async (context, next) =>
{
    context.Response.StatusCode = 401;

    await context.Response.WriteAsync(
        "Unauthorized"
    );

    return;
});
```

Это явное короткое замыкание.

---

## Отличие Use и Run

### Use

Может передать управление дальше:

```csharp
app.Use(async (context, next) =>
{
    await next();
});
```

---

### Run

Всегда последний обработчик.

```csharp
app.Run(async context =>
{
    await context.Response.WriteAsync(
        "Hello World"
    );
});
```

После `Run()` следующего middleware быть не может.

---

## Кратко

```csharp
await next();
```

передает запрос следующему middleware.

---

```csharp
не вызвать next()
```

останавливает конвейер (**Short Circuit**).

---

Порядок выполнения:

```text
Before 1
Before 2
Before 3
After 3
After 2
After 1
```

---

`app.Use()` — промежуточный обработчик.

`app.Run()` — конечный обработчик.
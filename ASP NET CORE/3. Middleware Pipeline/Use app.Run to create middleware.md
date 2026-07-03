## Use app.Run to create middleware

`app.Run()` создает **конечный middleware** (terminal middleware).

После него конвейер завершается и запрос дальше не передается.

---

Код:

```csharp
app.Use(async (context, next) =>
{
    await context.Response.WriteAsync(
        "Middleware 1: Before"
    );

    await next(context);

    await context.Response.WriteAsync(
        "Middleware 1: After"
    );
});

app.Run(async context =>
{
    await context.Response.WriteAsync(
        "Middleware 2: Processed"
    );
});

app.Use(async (context, next) =>
{
    await context.Response.WriteAsync(
        "Middleware 3: Before"
    );

    await next(context);

    await context.Response.WriteAsync(
        "Middleware 3: After"
    );
});
```

---

## Что произойдет?

При запросе:

```text
Middleware 1: Before
Middleware 2: Processed
Middleware 1: After
```

---

## Почему Middleware 3 не выполняется?

Потому что:

```csharp
app.Run(...)
```

не имеет `next`.

Он является конечной точкой конвейера.

Схема:

```text
Middleware 1
    ↓
app.Run
    ↓
STOP
```

До Middleware 3 выполнение никогда не дойдет.

---

## Визуально

```text
Request
   ↓
Middleware 1 Before
   ↓
app.Run
   ↓
Middleware 2 Processed
   ↑
Middleware 1 After
   ↑
Response
```

---

## Отличие Use и Run

### Use

Имеет доступ к следующему middleware.

```csharp
app.Use(async (context, next) =>
{
    await next();
});
```

Может передать управление дальше.

---

### Run

Конечный обработчик.

```csharp
app.Run(async context =>
{
    await context.Response.WriteAsync(
        "Hello"
    );
});
```

Следующего middleware нет.

---

## Почему код после Run бесполезен?

Например:

```csharp
app.Run(async context =>
{
    await context.Response.WriteAsync(
        "Hello"
    );
});

app.Use(async (context, next) =>
{
    await context.Response.WriteAsync(
        "Never executed"
    );
});
```

Строка:

```text
Never executed
```

никогда не появится.

Потому что конвейер заканчивается на `Run()`.

---

## Когда использовать Run?

Обычно один раз в конце приложения:

```csharp
app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.Run(async context =>
{
    await context.Response.WriteAsync(
        "Endpoint"
    );
});
```

или в минимальных API:

```csharp
app.MapGet("/", () => "Hello");
```

где ASP.NET сам создает конечный обработчик.

---

## Кратко

```csharp
app.Use(...)
```

- промежуточный middleware;
- имеет `next`;
- может передать запрос дальше.

---

```csharp
app.Run(...)
```

- конечный middleware;
- не имеет `next`;
- завершает конвейер.

---

В вашем примере выполняются только:

```text
Middleware 1: Before
Middleware 2: Processed
Middleware 1: After
```

А `Middleware 3` никогда не будет вызван.
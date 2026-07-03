## Middleware Pipeline Theory

В ASP.NET Core каждый HTTP-запрос проходит через цепочку middleware-компонентов.

Схема:

```text
Client
   ↓
Kestrel Server
   ↓
HttpContext
   ↓
Middleware 1
   ↓
Middleware 2
   ↓
Middleware 3
   ↓
...
   ↓
Middleware N
   ↓
Endpoint
   ↓
Response
   ↑
Middleware N
   ↑
...
   ↑
Middleware 1
   ↑
Kestrel Server
   ↑
Client
```

---

## Что такое Middleware?

Middleware — это компонент, который:

- получает `HttpContext`;
- может выполнить какую-то логику;
- может передать запрос дальше;
- может изменить ответ перед отправкой клиенту.

Сигнатура middleware:

```csharp
async (HttpContext context, RequestDelegate next)
```

---

## Как работает конвейер

Пример:

```csharp
app.Use(async (context, next) =>
{
    Console.WriteLine("Middleware 1 Start");

    await next();

    Console.WriteLine("Middleware 1 End");
});

app.Use(async (context, next) =>
{
    Console.WriteLine("Middleware 2 Start");

    await next();

    Console.WriteLine("Middleware 2 End");
});

app.Run(async context =>
{
    Console.WriteLine("Endpoint");
});
```

Результат:

```text
Middleware 1 Start
Middleware 2 Start
Endpoint
Middleware 2 End
Middleware 1 End
```

---

## Почему так происходит?

Когда вызывается:

```csharp
await next();
```

управление передается следующему middleware.

После завершения следующего middleware выполнение возвращается обратно.

Получается эффект "матрёшки":

```text
Middleware 1
 └─ Middleware 2
     └─ Endpoint
```

---

## HttpContext

Один и тот же объект `HttpContext` проходит через весь конвейер.

```csharp
context.Request
context.Response
```

Любой middleware может:

- читать запрос;
- изменять запрос;
- изменять ответ.

---

## Пример изменения ответа

```csharp
app.Use(async (context, next) =>
{
    await next();

    await context.Response.WriteAsync(
        "\nFooter"
    );
});
```

После выполнения endpoint в ответ будет добавлен текст:

```text
Footer
```

---

## Короткое замыкание (Short Circuit)

Middleware может не передавать запрос дальше.

Для этого достаточно не вызвать:

```csharp
await next();
```

---

### Пример

```csharp
app.Use(async (context, next) =>
{
    await context.Response.WriteAsync(
        "Blocked"
    );
});
```

Запрос остановится здесь.

Следующие middleware никогда не выполнятся.

---

Схема:

```text
Middleware 1
   ↓
Middleware 2
   ↓
STOP
```

---

## Пример авторизации

```csharp
app.Use(async (context, next) =>
{
    if (context.Request.Headers["Authorization"] != "frank")
    {
        context.Response.StatusCode = 401;

        await context.Response.WriteAsync(
            "Unauthorized"
        );

        return;
    }

    await next();
});
```

Если заголовок отсутствует:

```text
401 Unauthorized
```

и запрос дальше не пойдет.

Это и есть короткое замыкание.

---

## Use и Run

### Use

Передает запрос дальше:

```csharp
app.Use(async (context, next) =>
{
    await next();
});
```

---

### Run

Последний middleware в конвейере.

```csharp
app.Run(async context =>
{
    await context.Response.WriteAsync(
        "Hello"
    );
});
```

После него запрос дальше идти уже не может.

---

## Реальный Pipeline ASP.NET Core

Обычно выглядит примерно так:

```text
Kestrel
   ↓
Exception Handling
   ↓
HTTPS Redirection
   ↓
Static Files
   ↓
Routing
   ↓
Authentication
   ↓
Authorization
   ↓
Endpoint
```

Каждый компонент — отдельный middleware.

---

## Кратко

Middleware Pipeline — это цепочка обработчиков запроса.

```text
Kestrel
 ↓
Middleware
 ↓
Middleware
 ↓
Middleware
 ↓
Endpoint
```

Каждый middleware получает:

```csharp
HttpContext
```

и может:

```csharp
await next();
```

передать запрос дальше,

или

```csharp
return;
```

остановить выполнение.

Остановка конвейера до достижения endpoint называется **коротким замыканием (Short Circuit)**.
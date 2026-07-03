## Avoid problems when writing response

HTTP-ответ состоит из:

```text
Status Line
Headers
Body
```

Сначала сервер отправляет клиенту заголовки, а затем тело ответа.

---

### Проблема

После первого вызова:

```csharp
await context.Response.WriteAsync(...);
```

ASP.NET начинает отправлять ответ клиенту.

После этого заголовки уже нельзя изменить.

---

### Неправильно

```csharp
await context.Response.WriteAsync("Hello");

context.Response.Headers["MyHeader"] = "Test";
```

Получим исключение:

```text
Headers are read-only, response has already started.
```

или заголовок просто не будет добавлен.

---

### Правильно

Сначала задаем заголовки:

```csharp
context.Response.Headers["MyHeader"] = "My header";

await context.Response.WriteAsync("Hello");
```

---

## Ваш пример

```csharp
app.Use(async (context, next) =>
{
    context.Response.Headers["MyHeader"] = "My header";
    context.Response.Headers["Content-Length"] = "250";

    await context.Response.WriteAsync(
        "Middleware 1: Before"
    );

    await next(context);

    await context.Response.WriteAsync(
        "Middleware 1: After"
    );
});
```

Порядок:

```text
1. Добавляем заголовки
2. Начинаем отправлять тело ответа
3. Заголовки фиксируются
4. Отправляется остальной ответ
```

---

## Проверка Response.HasStarted

Можно проверить, начал ли сервер отправлять ответ:

```csharp
if (!context.Response.HasStarted)
{
    context.Response.Headers["MyHeader"] = "Test";
}
```

---

## Изменение ответа перед отправкой

Для этого существует:

```csharp
context.Response.OnStarting(...)
```

Код внутри выполнится непосредственно перед отправкой заголовков:

```csharp
context.Response.OnStarting(() =>
{
    context.Response.Headers["MyHeader"] = "Test";

    return Task.CompletedTask;
});
```

---

## Кратко

```csharp
context.Response.Headers[...]
```

нужно устанавливать **до первого `WriteAsync()`**.

---

После:

```csharp
await context.Response.WriteAsync(...)
```

ответ считается начавшимся (`Response.HasStarted == true`).

---

Поэтому:

```csharp
context.Response.Headers["MyHeader"] = "My header";
await context.Response.WriteAsync("Hello");
```

✔️ работает

---

```csharp
await context.Response.WriteAsync("Hello");
context.Response.Headers["MyHeader"] = "My header";
```

❌ слишком поздно, заголовки уже отправлены клиенту.
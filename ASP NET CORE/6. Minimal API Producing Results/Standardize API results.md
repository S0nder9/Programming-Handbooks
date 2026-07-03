# Standardize API Results

В реальном приложении желательно, чтобы **все ошибки API возвращались в одном формате**.

Например, независимо от причины ошибки клиент всегда будет получать **Problem Details**.

Для этого ASP.NET Core предоставляет встроенные middleware:

- `AddProblemDetails()`;
- `UseExceptionHandler()`;
- `UseStatusCodePages()`.

---

# Регистрация

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProblemDetails();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler();
}

app.UseStatusCodePages();
```

---

# `AddProblemDetails()`

```csharp
builder.Services.AddProblemDetails();
```

Регистрирует сервис **Problem Details**.

После этого ASP.NET Core сможет автоматически создавать ответы в формате Problem Details.

Сам по себе этот метод ничего не отправляет клиенту — он лишь добавляет необходимые сервисы в контейнер зависимостей.

---

# `UseExceptionHandler()`

```csharp
app.UseExceptionHandler();
```

Это middleware перехватывает необработанные исключения.

Например:

```csharp
app.MapGet("/", () =>
{
    throw new Exception("Database error");
});
```

Без `UseExceptionHandler()`:

```text
500 Internal Server Error
```

(ответ зависит от режима работы приложения).

С `UseExceptionHandler()` и `AddProblemDetails()` клиент получит стандартизированный ответ:

```json
{
    "type": "https://tools.ietf.org/html/rfc9110#section-15.6.1",
    "title": "An error occurred while processing your request.",
    "status": 500
}
```

Таким образом внутренние детали приложения (например, текст исключения и стек вызовов) не отправляются клиенту.

---

# Почему используется проверка окружения

```csharp
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler();
}
```

Во время разработки удобнее видеть подробную страницу ошибки (Developer Exception Page).

В production наоборот — пользователю не должны показываться внутренние детали приложения.

Поэтому обработчик исключений обычно включают только вне режима разработки.

---

# `UseStatusCodePages()`

Не все ошибки возникают из-за исключений.

Например:

- ресурс не найден;
- доступ запрещён;
- неверный HTTP-метод.

В этих случаях исключение не выбрасывается, но сервер всё равно возвращает код ошибки.

```http
404 Not Found
```

или

```http
401 Unauthorized
```

или

```http
403 Forbidden
```

`UseStatusCodePages()` позволяет сформировать тело ответа даже тогда, когда произошло только изменение статус-кода.

Например:

```csharp
app.MapGet("/employees/{id:int}", (int id) =>
{
    return Results.NotFound();
});
```

Без `UseStatusCodePages()` клиент может получить только:

```http
404 Not Found
```

без содержимого ответа.

После подключения middleware ASP.NET Core сможет сформировать стандартный ответ (в зависимости от конфигурации приложения и зарегистрированных сервисов).

---

# Что происходит при запросе

```text
HTTP Request
        ↓
Endpoint
        ↓
Есть исключение?
   │
┌──┴─────────┐
│            │
Да           Нет
│            │
▼            ▼
UseExceptionHandler
             │
             ▼
      Проверка StatusCode
             │
             ▼
     UseStatusCodePages
             │
             ▼
      Problem Details
```

---

# Итог

Для стандартизации ответов API обычно используют три компонента:

| Компонент | Назначение |
|-----------|------------|
| `builder.Services.AddProblemDetails()` | Регистрирует сервис для формирования ответов в формате Problem Details |
| `app.UseExceptionHandler()` | Перехватывает необработанные исключения и возвращает стандартизированный ответ (обычно 500 Internal Server Error) |
| `app.UseStatusCodePages()` | Позволяет формировать тело ответа для HTTP-ошибок, которые возникли без исключения (например, 404 или 403) |

Вместе эти компоненты позволяют сделать все ответы об ошибках единообразными и соответствующими стандарту **Problem Details**.
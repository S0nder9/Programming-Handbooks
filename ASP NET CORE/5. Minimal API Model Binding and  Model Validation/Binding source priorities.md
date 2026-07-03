# Binding Source Priorities

Когда ASP.NET Core пытается получить значение для параметра endpoint, он использует определённый порядок поиска источников данных. Это называется **приоритетом источников привязки (Binding Source Priorities)**.

Если значение уже найдено на одном этапе, следующие этапы не проверяются.

---

# Приоритет источников

1. Явно указанный источник (`[FromRoute]`, `[FromQuery]`, `[FromHeader]`, `[FromBody]`, ...)
2. `BindAsync()`
3. Route parameters (для простых типов)
4. Query String (для простых типов)
5. Headers (для простых типов — если маршрут и query не дали значение)
6. HTTP Body (для сложных типов)

---

# 1. Explicit Binding (самый высокий приоритет)

Если источник указан явно, ASP.NET Core использует **только его**.

```csharp
app.MapGet("/employees/{id}",
([FromQuery] int id) =>
{
    return id;
});
```

Запрос:

```http
GET /employees/10?id=25
```

Результат:

```text
25
```

Хотя в маршруте есть `10`, используется значение из Query String, потому что указан `[FromQuery]`.

---

# 2. `BindAsync()`

Если у типа есть собственный метод

```csharp
public static ValueTask<T?> BindAsync(HttpContext context)
```

ASP.NET Core вызывает именно его.

```csharp
app.MapGet("/people", (Person person) => ...);
```

↓

```text
BindAsync()
```

↓

```text
Person
```

Стандартный Model Binding для этого параметра больше не используется.

---

# 3. Route Parameters

Для простых типов (`int`, `string`, `Guid`, `DateTime` и др.) сначала проверяются параметры маршрута.

```csharp
app.MapGet("/employees/{id}",
(int id) =>
{
    return id;
});
```

Запрос:

```http
GET /employees/15?id=50
```

Получим:

```text
15
```

Route имеет более высокий приоритет, чем Query String.

---

# 4. Query String

Если в маршруте значение не найдено, ASP.NET Core проверяет строку запроса.

```csharp
app.MapGet("/employees",
(int id) =>
{
    return id;
});
```

Запрос:

```http
GET /employees?id=10
```

Получим:

```text
10
```

---

# 5. Headers

Если значение не найдено в Route и Query, ASP.NET Core может использовать заголовки, если источник указан явно.

```csharp
app.MapGet("/employees",
([FromHeader] string token) =>
{
    return token;
});
```

Запрос:

```http
Authorization: abc123
```

или

```http
token: abc123
```

↓

```text
abc123
```

> **Важно:** заголовки **не используются автоматически** для простых типов. Обычно требуется атрибут `[FromHeader]`.

---

# 6. HTTP Body

Для сложных типов (`class`) по умолчанию используется тело запроса.

```csharp
app.MapPost("/employees",
(Employee employee) =>
{
    ...
});
```

Body:

```json
{
    "id": 1,
    "name": "John"
}
```

↓

```csharp
Employee
```

---

# Общая схема

```text
            HTTP Request
                  │
                  ▼
      Explicit Attribute?
                  │
         yes ─────────► Использовать его
                  │
                 no
                  ▼
        Есть BindAsync()?
                  │
         yes ─────────► BindAsync()
                  │
                 no
                  ▼
      Route (простые типы)
                  │
                  ▼
          Query String
                  │
                  ▼
    Headers (если указано)
                  │
                  ▼
   Body (сложные типы)
```

---

# Пример

```csharp
app.MapGet("/employees/{id}",
(int id) =>
{
    return id;
});
```

Запрос:

```http
GET /employees/10?id=50
```

Результат:

```text
10
```

Потому что сначала проверяется Route.

---

Если изменить endpoint:

```csharp
app.MapGet("/employees/{id}",
([FromQuery] int id) =>
{
    return id;
});
```

тот же запрос:

```http
GET /employees/10?id=50
```

вернёт:

```text
50
```

Так как явный атрибут `[FromQuery]` имеет более высокий приоритет.

---

# Итог

Приоритет источников привязки в Minimal API можно представить так:

```text
Explicit ([From...])
        ↓
BindAsync()
        ↓
Route
        ↓
Query String
        ↓
Headers (при явном указании)
        ↓
Body (для сложных типов)
```

Этот порядок определяет, откуда ASP.NET Core возьмёт данные для параметров endpoint, если источник не указан явно.
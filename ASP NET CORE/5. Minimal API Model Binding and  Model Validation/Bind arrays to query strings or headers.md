# Bind Arrays to Query Strings or Headers

ASP.NET Core Model Binding умеет автоматически связывать **массивы значений** из query string или headers с параметрами типа `int[]`, `string[]` и т.д.

---

# Пример: Query String массив

## Запрос

```http
GET /employees?id=1&id=2&id=3
```

---

## Endpoint

```csharp
endpoints.MapGet("/employees", (int[] id) =>
{
    var employees = EmployeesRepository.GetEmployees();

    var emps = employees
        .Where(e => id.Contains(e.Id))
        .ToList();

    return emps;
});
```

---

# Как это работает

Model Binding автоматически собирает повторяющиеся параметры:

```text
?id=1&id=2&id=3
```

↓

```csharp
int[] id = { 1, 2, 3 };
```

---

# Альтернативный формат (CSV — иногда)

Иногда можно встретить:

```http
GET /employees?id=1,2,3
```

⚠️ Но:
- это зависит от конфигурации
- не всегда включено по умолчанию
- менее стандартный вариант

---

# Пример с Headers

Можно передавать массив через HTTP headers:

## Запрос

```http
id: 1
id: 2
id: 3
```

---

## Endpoint (тот же)

```csharp
endpoints.MapGet("/employees", ([FromHeader] int[] id) =>
{
    var employees = EmployeesRepository.GetEmployees();

    return employees
        .Where(e => id.Contains(e.Id))
        .ToList();
});
```

---

# Важный момент

Без явного указания `[FromHeader]` или `[FromQuery]`:

ASP.NET Core по умолчанию:

```text
complex types → body
simple types → route/query
```

---

# Как различаются источники

| Источник | Пример | Как выглядит |
|----------|--------|--------------|
| Query | `?id=1&id=2` | URL |
| Header | `id: 1` | HTTP headers |
| Body | JSON | `{ "id": [1,2] }` |

---

# Реальный сценарий использования

## 1. Фильтрация по множеству ID

```http
GET /employees?id=1&id=5&id=10
```

---

## 2. Выборка из UI (checkbox list)

Frontend отправляет:

```text
selectedIds = [1, 5, 10]
```

---

## 3. Batch operations

```http
DELETE /employees?id=1&id=2&id=3
```

---

# Как работает внутри

```text
HTTP Request
   ↓
Routing
   ↓
Model Binder
   ↓
Detect repeated keys
   ↓
Create array
   ↓
Pass to endpoint
```

---

# Частая ошибка

❌ ожидание:

```csharp
(int id)
```

при запросе:

```http
?id=1&id=2
```

---

✔ правильно:

```csharp
(int[] id)
```

---

# Итог

ASP.NET Core автоматически превращает:

```http
?id=1&id=2&id=3
```

в:

```csharp
int[] id = { 1, 2, 3 };
```

и позволяет сразу использовать LINQ:

```csharp
Where(e => id.Contains(e.Id))
```

---

# Ключевая идея

Model Binding поддерживает коллекции:

- `int[]`
- `string[]`
- `List<T>`

и заполняет их из повторяющихся значений в request.

---
# Bind to Query String

ASP.NET Core Model Binding позволяет автоматически привязывать параметры из **query string** к аргументам метода.

---

## Пример

```csharp
endpoints.MapGet(
    "/employees",
    ([FromQuery(Name = "id")] int? id1) =>
{
    if (!id1.HasValue)
        return null;

    var employee =
        EmployeesRepository.GetEmployeeById(id1.Value);

    return employee; // автоматически сериализуется в JSON
});
```

---

# Как это работает

## Запрос

```http
GET /employees?id=5
```

---

## Model Binding делает:

```text
id (query string) → id1 (parameter)
```

↓

```csharp
int? id1 = 5;
```

---

## Endpoint получает:

```csharp
GetEmployeeById(5)
```

---

# FromQuery

```csharp
[FromQuery(Name = "id")] int? id1
```

означает:

- взять значение из query string
- ключ = `"id"`
- положить в параметр `id1`

---

## Важно: имя может отличаться

```csharp
(id1)
```

и

```http
?id=5
```

связываются через:

```csharp
Name = "id"
```

---

# Пример URL

## 1. Есть id

```http
GET /employees?id=10
```

Результат:

```json
{
  "id": 10,
  "name": "John"
}
```

---

## 2. Нет id

```http
GET /employees
```

Результат:

```csharp
id1 = null
```

↓

```csharp
return null;
```

---

# Как работает pipeline

```text
HTTP Request
   ↓
Routing
   ↓
Model Binding
   ↓
Query String → Parameter
   ↓
Endpoint execution
   ↓
JSON response
```

---

# Разница: Route vs Query

## Route parameter

```http
/employees/5
```

```csharp
/employees/{id:int}
```

✔ часть URL  
✔ используется для идентификации ресурса  
✔ более "REST style"

---

## Query parameter

```http
/employees?id=5
```

```csharp
[FromQuery]
```

✔ фильтры  
✔ поиск  
✔ дополнительные параметры  

---

# Когда использовать

## Route

```text
/employees/5
/products/10
```

---

## Query

```text
/employees?sort=desc
/employees?page=2
/employees?id=5
```

---

# Важный момент в твоём коде

```csharp
if (!id1.HasValue) return null;
```

Это значит:

- если `id` не передан → вернуть `null`
- endpoint завершится без данных

---

# Более безопасный вариант

Обычно лучше:

```csharp
if (!id1.HasValue)
{
    return Results.BadRequest("id is required");
}
```

# Что будет, если одновременно есть `/{id}` и `?id=1`

Рассмотрим ситуацию:

- есть **route parameter**
- есть **query string**
- и оба используют одно и то же имя `id`

---

## Пример

### Route

```csharp
endpoints.MapGet(
    "/employees/{id:int}",
    (int id) =>
{
    return id;
});
```

---

### И запрос

```http
GET /employees/10?id=20
```

---

# Важно: что выберет ASP.NET Core?

👉 **Route values имеют приоритет над Query String**

---

## Итог в этом случае:

```text
id (route) = 10
id (query) = 20 (игнорируется для binding параметра id)
```

---

## Почему так?

Потому что pipeline Model Binding работает по приоритету источников:

```text
1. Route values   (самый высокий приоритет)
2. Query string
3. Headers
4. Body
```

---

# Что произойдёт в твоём случае

Если есть:

```csharp
/{id:int}
```

и:

```http
?id=1
```

то:

```csharp
(int id) → берётся из ROUTE
```

---

# Пример кода (оба одновременно)

```csharp
endpoints.MapGet(
    "/employees/{id:int}",
    ([FromQuery] int id) =>
{
    return id;
});
```

---

## Запрос:

```http
GET /employees/10?id=20
```

---

## Результат:

```text
id = 20
```

---

# Почему тут уже query побеждает?

Потому что ты явно сказал:

```csharp
[FromQuery]
```

👉 значит ты **переопределил источник данных**

---

# Полная таблица поведения

| Сценарий | Источник id |
|----------|------------|
| `/employees/10` | route |
| `/employees?id=10` | query |
| `/employees/10?id=20` (int id) | route |
| `/employees/10?id=20` ([FromQuery]) | query |

---

# Ключевая идея

ASP.NET Core НЕ “угадывает”, а следует правилам:

## Без атрибутов:

```text
Route > Query
```

## С атрибутами:

```text
[FromQuery] → всегда Query
[FromRoute] → всегда Route
```

---

# Почему это важно

Если не понимать это, можно получить баги:

```text
ожидал 20 (query)
получил 10 (route)
```

---

# Итог

Если одновременно есть:

```text
/employees/{id}
?id=1
```

то:

### Без явного указания:
👉 берётся `id` из **route**

### С [FromQuery]:
👉 берётся `id` из **query string**

---

# Схема приоритета

```text
Route parameter  (↑ highest priority)
Query string
Header
Body
```

---

# Итог

Model Binding автоматически связывает:

```text
?id=5
```

с:

```csharp
[FromQuery(Name="id")] int? id1
```

Схема:

```text
Request
  ↓
Query String
  ↓
Model Binding
  ↓
Parameter (id1)
  ↓
Endpoint
  ↓
JSON Response
```


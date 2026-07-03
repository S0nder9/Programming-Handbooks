# Required Route Parameters

В ASP.NET Core данные можно передавать двумя основными способами:

## 1. Query String

```http
GET /employees?id=1
```

Получение значения:

```csharp
int id = Convert.ToInt32(context.Request.Query["id"]);
```

---

## 2. Route Parameters

```http
GET /employees/1
```

Получение значения:

```csharp
int id = Convert.ToInt32(
    context.Request.RouteValues["id"]
);
```

---

# Когда использовать Query String

Query-параметры обычно используются для:

- фильтрации;
- поиска;
- сортировки;
- пагинации;
- необязательных параметров.

Примеры:

```http
GET /employees?position=developer
```

```http
GET /employees?page=2
```

```http
GET /employees?sort=name
```

```http
GET /employees?position=developer&page=2
```

Здесь ресурс остаётся один и тот же:

```text
/employees
```

а параметры лишь уточняют запрос.

---

# Когда использовать Route Parameters

Route-параметры используются для идентификации конкретного ресурса.

Примеры:

```http
GET /employees/15
```

```http
PUT /employees/15
```

```http
DELETE /employees/15
```

Здесь:

```text
15
```

является частью адреса ресурса.

---

# REST-подход

Обычно в REST API используют:

```http
GET    /employees
GET    /employees/15

POST   /employees

PUT    /employees/15

DELETE /employees/15
```

а не:

```http
DELETE /employees?id=15
```

Поэтому второй вариант считается более чистым.

---

# Route Template

Шаблон маршрута:

```csharp
"/employees/{id}"
```

---

Здесь:

```text
employees
```

— Literal Segment (фиксированная часть маршрута).

```text
{id}
```

— Required Route Parameter.

---

Запрос:

```http
DELETE /employees/10
```

приведёт к:

```csharp
context.Request.RouteValues["id"]
```

↓

```text
10
```

---

# Несколько параметров

Маршрут:

```csharp
"/employees/{position}/{id}"
```

Запрос:

```http
GET /employees/developer/15
```

Значения:

```csharp
context.Request.RouteValues["position"]
```

↓

```text
developer
```

---

```csharp
context.Request.RouteValues["id"]
```

↓

```text
15
```

---

# Пример

```csharp
endpoints.MapDelete(
    "/employees/{id}",
    async (HttpContext context) =>
{
    int id = Convert.ToInt32(
        context.Request.RouteValues["id"]
    );

    await context.Response.WriteAsync(
        $"Delete employee {id}"
    );
});
```

Запрос:

```http
DELETE /employees/7
```

Ответ:

```html
Delete employee 7
```

---

# Query String vs Route Parameter

| Route Parameter | Query String |
|----------------|-------------|
| `/employees/15` | `/employees?id=15` |
| Конкретный ресурс | Дополнительные данные |
| Обычно обязательный | Часто необязательный |
| REST-стиль | Фильтрация и поиск |
| Более читаемый URL | Подходит для множества параметров |

---

# Практическое правило

Используй:

```http
/employees/15
```

если нужно обратиться к конкретному сотруднику.

Используй:

```http
/employees?page=2&position=developer
```

если нужно отфильтровать, отсортировать или настроить выборку.

---

## Типичный REST API

```http
GET    /employees
GET    /employees/15

GET    /employees?position=developer
GET    /employees?page=2

POST   /employees

PUT    /employees/15

DELETE /employees/15
```

Это самый распространённый подход в ASP.NET Core, FastAPI, Django REST Framework, Express.js и других современных Web API.
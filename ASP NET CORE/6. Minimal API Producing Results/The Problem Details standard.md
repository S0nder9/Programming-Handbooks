# The Problem Details Standard

При возникновении ошибки API желательно возвращать не просто строку:

```text
Employee is invalid
```

а структурированный JSON с информацией об ошибке.

Для этого существует стандарт **Problem Details** (RFC 9457, ранее RFC 7807), который используется в ASP.NET Core.

---

# Зачем нужен Problem Details

Представьте обычный ответ:

```http
400 Bad Request
```

```text
Employee is invalid
```

Клиенту сложно понять:

- какое поле содержит ошибку;
- почему возникла ошибка;
- можно ли её исправить.

Поэтому используется единый формат.

---

# Пример

```csharp
app.MapPost("/employees", ([FromBody] Employee employee) =>
{
    if (employee is null || employee.Id < 0)
    {
        return Results.ValidationProblem(
            new Dictionary<string, string[]>
            {
                {
                    "id",
                    new[] { "Employee is not provided." }
                }
            });
    }

    EmployeesRepository.AddEmployee(employee);

    return TypedResults.Created(
        $"/employees/{employee.Id}",
        employee);
});
```

---

# Что делает `ValidationProblem()`

Метод

```csharp
Results.ValidationProblem(...)
```

автоматически возвращает

```http
400 Bad Request
```

и объект Problem Details.

---

# Ответ клиенту

```json
{
    "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
    "title": "One or more validation errors occurred.",
    "status": 400,
    "errors": {
        "id": [
            "Employee is not provided."
        ]
    }
}
```

---

# Поля Problem Details

## type

Ссылка на описание типа ошибки.

```json
"type":
"https://tools.ietf.org/html/rfc9110#section-15.5.1"
```

---

## title

Краткое описание ошибки.

```json
"title":
"One or more validation errors occurred."
```

---

## status

HTTP статус.

```json
"status":400
```

---

## errors

Словарь ошибок.

Ключ —

обычно имя свойства.

Значение —

массив сообщений.

```json
"errors":{
    "id":[
        "Employee is not provided."
    ]
}
```

Почему массив?

Потому что одно поле может нарушать несколько правил.

Например,

```json
"errors":{
    "salary":[
        "Salary is required.",
        "Salary must be greater than 50000."
    ]
}
```

---

# Можно вернуть несколько ошибок

```csharp
return Results.ValidationProblem(
    new Dictionary<string, string[]>
    {
        {
            "Name",
            new[]
            {
                "Name is required."
            }
        },
        {
            "Salary",
            new[]
            {
                "Salary must be greater than 50000."
            }
        }
    });
```

Ответ:

```json
{
    "errors": {
        "Name": [
            "Name is required."
        ],
        "Salary": [
            "Salary must be greater than 50000."
        ]
    }
}
```

---

# Когда использовать `ValidationProblem()`

Если ошибка связана именно с неверными данными, отправленными клиентом.

Например:

- обязательное поле отсутствует;
- введено неверное значение;
- нарушено бизнес-правило;
- данные не прошли проверку.

Обычно используется статус

```http
400 Bad Request
```

---

# `Problem()` и `ValidationProblem()`

ASP.NET Core предоставляет два похожих метода.

## `Results.Problem()`

Используется для общих ошибок.

Например:

```csharp
return Results.Problem(
    title: "Database error",
    statusCode: 500);
```

Ответ:

```json
{
    "type":"about:blank",
    "title":"Database error",
    "status":500
}
```

---

## `Results.ValidationProblem()`

Используется специально для ошибок валидации.

Он автоматически формирует поле

```json
"errors": { ... }
```

и возвращает статус

```http
400 Bad Request
```

---

# Что происходит

```text
HTTP Request
        ↓
Model Binding
        ↓
Employee
        ↓
Проверка данных
        ↓
Есть ошибки?
   │
┌──┴─────────┐
│            │
Нет          Да
│            │
▼            ▼
Created    ValidationProblem()
│            │
▼            ▼
201 Created 400 Bad Request
```

---

# Итог

**Problem Details** — это стандартный формат представления ошибок в HTTP API.

В Minimal API чаще всего используются:

- `Results.ValidationProblem()` — для ошибок валидации (400 Bad Request);
- `Results.Problem()` — для остальных ошибок (например, 500 Internal Server Error).

Использование Problem Details делает ответы API единообразными, облегчает обработку ошибок клиентскими приложениями и соответствует общепринятым стандартам REST API.
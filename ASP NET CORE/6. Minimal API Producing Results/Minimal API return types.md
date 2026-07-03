# Minimal API Return Types

В Minimal API endpoint может возвращать разные типы данных.

ASP.NET Core автоматически преобразует возвращаемое значение в HTTP-ответ.

---

# Самый простой вариант

Если вернуть обычный объект:

```csharp
app.MapGet("/employees", () =>
{
    return EmployeesRepository.GetEmployees();
});
```

ASP.NET Core автоматически:

- установит статус **200 OK**;
- сериализует объект в JSON;
- установит заголовок

```text
Content-Type: application/json
```

То есть писать `Response.WriteAsync()` уже не нужно.

---

# Возвращение строк

```csharp
app.MapGet("/", () =>
{
    return "Hello World";
});
```

Ответ:

```text
200 OK

Hello World
```

---

# Возвращение объекта

```csharp
app.MapGet("/employees", () =>
{
    return EmployeesRepository.GetEmployees();
});
```

Ответ:

```http
200 OK
Content-Type: application/json
```

```json
[
    {
        "id": 1,
        "name": "Tom"
    }
]
```

---

# Интерфейс `IResult`

Если нужно самостоятельно управлять HTTP-ответом, endpoint может возвращать `IResult`.

```csharp
app.MapGet("/employees", IResult () =>
{
    var employees = EmployeesRepository.GetEmployees();

    return Results.Ok(employees);
});
```

`IResult` — это общий интерфейс для всех результатов Minimal API.

---

# `Results`

Класс `Results` содержит готовые методы для формирования HTTP-ответов.

Например:

```csharp
return Results.Ok(employee);
```

или

```csharp
return Results.NotFound();
```

или

```csharp
return Results.BadRequest();
```

ASP.NET Core сам сформирует нужный HTTP-ответ.

---

# Наиболее часто используемые результаты

## 200 OK

```csharp
return Results.Ok(employee);
```

↓

```http
200 OK
```

---

## 201 Created

```csharp
return Results.Created(
    $"/employees/{employee.Id}",
    employee);
```

↓

```http
201 Created
Location: /employees/1
```

Используется после успешного создания ресурса.

---

## 400 Bad Request

```csharp
return Results.BadRequest();
```

или

```csharp
return Results.BadRequest("Employee is invalid.");
```

↓

```http
400 Bad Request
```

---

## 401 Unauthorized

```csharp
return Results.Unauthorized();
```

↓

```http
401 Unauthorized
```

---

## 403 Forbidden

```csharp
return Results.Forbid();
```

↓

```http
403 Forbidden
```

---

## 404 Not Found

```csharp
return Results.NotFound();
```

или

```csharp
return Results.NotFound("Employee not found.");
```

↓

```http
404 Not Found
```

---

## 500 Internal Server Error

```csharp
return Results.StatusCode(500);
```

---

# Пример

```csharp
app.MapGet("/employees/{id:int}", (int id) =>
{
    var employee = EmployeesRepository.GetEmployeeById(id);

    if (employee is null)
        return Results.NotFound();

    return Results.Ok(employee);
});
```

Если сотрудник найден:

```http
200 OK
```

Если нет:

```http
404 Not Found
```

---

# `TypedResults`

Начиная с новых версий ASP.NET Core рекомендуется использовать `TypedResults`.

```csharp
return TypedResults.Ok(employee);
```

Вместо

```csharp
return Results.Ok(employee);
```

---

## Почему появился `TypedResults`

`Results.Ok()` возвращает общий интерфейс:

```csharp
IResult
```

А

```csharp
TypedResults.Ok()
```

возвращает конкретный тип результата:

```csharp
Ok<T>
```

Это позволяет:

- точнее описывать возвращаемые значения;
- улучшить работу OpenAPI (Swagger);
- получить более строгую типизацию во время компиляции.

---

# Пример

```csharp
app.MapGet("/employees", IResult () =>
{
    var employees = EmployeesRepository.GetEmployees();

    return TypedResults.Ok(employees);

    // Аналогично:
    // return Results.Ok(employees);
});
```

Оба варианта отправят клиенту одинаковый ответ:

```http
200 OK
Content-Type: application/json
```

Разница заключается в типе возвращаемого объекта внутри ASP.NET Core.

---

# `Results` vs `TypedResults`

| Results | TypedResults |
|----------|--------------|
| Возвращает `IResult` | Возвращает конкретный тип (`Ok<T>`, `NotFound`, `BadRequest` и т.д.) |
| Менее строгая типизация | Строгая типизация |
| Работает во всех версиях Minimal API | Рекомендуется в современных версиях ASP.NET Core |
| Подходит для большинства сценариев | Лучше интегрируется со Swagger и OpenAPI |

---

# Итог

В Minimal API можно возвращать:

- простые значения (`string`, `int`);
- объекты (автоматически сериализуются в JSON);
- `IResult` для полного управления HTTP-ответом.

Для формирования стандартных HTTP-ответов используются:

- `Results` — универсальный класс с методами (`Ok()`, `NotFound()`, `BadRequest()` и др.);
- `TypedResults` — современная типизированная альтернатива, рекомендуемая в новых проектах.
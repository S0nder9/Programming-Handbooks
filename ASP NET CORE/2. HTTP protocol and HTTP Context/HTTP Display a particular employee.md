## HTTP Display a Particular Employee

Часто нужно получать не всех сотрудников, а одного конкретного по `id`.

Например:

```http
GET /employees?id=2
```

В этом случае параметр `id` передается через Query String.

---

## Проверка наличия id

```csharp
if (context.Request.Query.ContainsKey("id"))
{
    ...
}
```

Проверяем, передал ли клиент параметр:

```http
/employees?id=1
```

---

## Получение значения

```csharp
var id = context.Request.Query["id"];
```

После запроса:

```http
/employees?id=2
```

в переменной:

```csharp
id == "2"
```

---

## Преобразование строки в число

```csharp
if (int.TryParse(id, out int employeeId))
{
    ...
}
```

Query String всегда содержит строки.

Поэтому:

```text
"id" → string
```

нужно преобразовать в:

```text
2 → int
```

---

## Поиск сотрудника

```csharp
var employee =
    EmployeesRepository
        .GetEmployeeById(employeeId);
```

Например:

```csharp
GetEmployeeById(2)
```

вернет:

```csharp
Employee
{
    Id = 2,
    Name = "John"
}
```

или:

```csharp
null
```

если сотрудник не найден.

---

## Если сотрудник найден

```csharp
if (employee is not null)
{
    await context.Response.WriteAsync(
        $"Name: {employee.Name} " +
        $"{employee.Position} " +
        $"{employee.Salary}"
    );
}
```

Ответ:

```text
Name: John Developer 5000
```

---

## Если сотрудник не найден

```csharp
context.Response.StatusCode = 404;

await context.Response.WriteAsync(
    "Not found"
);
```

Ответ:

```http
HTTP/1.1 404 Not Found
```

```text
Not found
```

---

## Логика работы

```text
GET /employees
    ↓
Список сотрудников

GET /employees?id=2
    ↓
Сотрудник №2

GET /employees?id=999
    ↓
404 Not Found

GET /employees?id=abc
    ↓
400 Bad Request
```
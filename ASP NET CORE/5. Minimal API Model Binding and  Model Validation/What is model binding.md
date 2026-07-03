# What is Model Binding

**Model Binding** — механизм ASP.NET Core, который автоматически извлекает данные из HTTP-запроса и преобразует их в параметры метода или объекты (модели).

Без Model Binding:

```csharp
endpoints.MapGet("/employees/{id:int}", async context =>
{
    int id = Convert.ToInt32(
        context.Request.RouteValues["id"]
    );

    await context.Response.WriteAsync($"Employee {id}");
});
```

---

С Model Binding:

```csharp
endpoints.MapGet("/employees/{id:int}", (int id) =>
{
    return $"Employee {id}";
});
```

ASP.NET Core сам:

1. найдёт значение `id` в маршруте;
2. преобразует строку в `int`;
3. передаст значение в параметр метода.

---

# Как работает

```text
HTTP Request
      ↓
Routing
      ↓
Model Binding
      ↓
Endpoint
```

Например:

```http
GET /employees/15
```

Маршрут:

```csharp
"/employees/{id:int}"
```

---

Routing получает:

```text
id = "15"
```

---

Model Binding выполняет:

```csharp
int id = 15;
```

---

Endpoint получает:

```csharp
(int id)
```

↓

```csharp
id = 15
```

---

# Источники данных

Model Binding умеет получать данные из разных частей запроса.

## 1. Route Values

URL:

```http
GET /employees/15
```

Код:

```csharp
app.MapGet("/employees/{id:int}",
    (int id) =>
{
    return $"Employee {id}";
});
```

---

## 2. Query String

URL:

```http
GET /employees?id=15
```

Код:

```csharp
app.MapGet("/employees",
    (int id) =>
{
    return $"Employee {id}";
});
```

---

ASP.NET Core найдёт:

```text
?id=15
```

и подставит:

```csharp
id = 15
```

---

## 3. Request Body

JSON:

```json
{
    "id": 1,
    "name": "John",
    "salary": 5000
}
```

Модель:

```csharp
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public double Salary { get; set; }
}
```

---

Endpoint:

```csharp
app.MapPost("/employees",
    (Employee employee) =>
{
    return employee.Name;
});
```

---

ASP.NET Core автоматически:

```text
JSON
   ↓
Employee object
```

---

## 4. Headers

Можно явно указать источник:

```csharp
app.MapGet("/",
    ([FromHeader] string Authorization) =>
{
    return Authorization;
});
```

---

# Binding к сложным объектам

Query String:

```http
GET /employees/search?name=John&salary=5000
```

Модель:

```csharp
class EmployeeFilter
{
    public string Name { get; set; }
    public double Salary { get; set; }
}
```

---

Endpoint:

```csharp
app.MapGet("/employees/search",
    (EmployeeFilter filter) =>
{
    return filter.Name;
});
```

---

ASP.NET Core создаст:

```csharp
new EmployeeFilter
{
    Name = "John",
    Salary = 5000
}
```

---

# Пример из Minimal API

```csharp
app.MapGet(
    "/employees/{id:int}",
    (int id) =>
{
    return $"Employee {id}";
});
```

Запрос:

```http
GET /employees/10
```

---

ASP.NET Core делает примерно следующее:

```csharp
string rawValue = "10";

int id = int.Parse(rawValue);

return $"Employee {id}";
```

---

# Преимущества

Без Model Binding:

```csharp
var id =
    Convert.ToInt32(
        context.Request.RouteValues["id"]);
```

---

С Model Binding:

```csharp
(int id)
```

---

Преимущества:

- меньше кода;
- автоматическая конвертация типов;
- работа с объектами;
- меньше ошибок;
- удобнее читать код.

---

# Итог

**Model Binding** автоматически связывает данные HTTP-запроса с параметрами метода или объектами.

Схема:

```text
Request
   ↓
Routing
   ↓
Model Binding
   ↓
Endpoint Execution
```

Пример:

```csharp
app.MapGet(
    "/employees/{id:int}",
    (int id) =>
{
    return $"Employee {id}";
});
```

Для запроса:

```http
GET /employees/15
```

ASP.NET Core автоматически преобразует:

```text
"id" → int 15
```

и передаст значение в параметр:

```csharp
(int id)
```

без необходимости обращаться к:

```csharp
context.Request.RouteValues
```

вручную.
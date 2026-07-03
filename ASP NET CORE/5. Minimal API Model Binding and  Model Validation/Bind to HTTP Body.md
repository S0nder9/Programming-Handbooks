# Bind to HTTP Body

Для методов `POST`, `PUT` и `PATCH` ASP.NET Core может автоматически считывать данные из **тела HTTP-запроса (Body)** и преобразовывать их в объект.

---

## Пример

```csharp
endpoints.MapPost("/employees", (Employee employee) =>
{
    if (employee is null || employee.Id <= 0)
    {
        return "Employee is not valid";
    }

    EmployeesRepository.AddEmployee(employee);

    return "<h1>Employee created</h1>";
});
```

---

# Как это работает

Клиент отправляет запрос:

```http
POST /employees
Content-Type: application/json
```

Body:

```json
{
    "id": 1,
    "name": "John",
    "position": "Developer",
    "salary": 5000
}
```

---

## Model Binding

ASP.NET Core автоматически:

1. считывает тело запроса (`Body`);
2. определяет формат по заголовку `Content-Type`;
3. десериализует JSON в объект `Employee`;
4. передаёт этот объект в endpoint.

---

## Что получает метод

```csharp
Employee employee
```

↓

```csharp
new Employee
{
    Id = 1,
    Name = "John",
    Position = "Developer",
    Salary = 5000
}
```

---

# Pipeline

```text
HTTP Request
      ↓
Routing
      ↓
Model Binding
      ↓
Read HTTP Body
      ↓
Deserialize JSON
      ↓
Employee object
      ↓
Endpoint
```

---

# Почему не нужен `[FromBody]`?

В **Minimal API** для сложных типов (`class`) источник данных определяется автоматически.

Поэтому эти варианты эквивалентны:

```csharp
(Employee employee)
```

и

```csharp
([FromBody] Employee employee)
```

Обычно `[FromBody]` пишут только для большей явности.

---

# Простые и сложные типы

## Сложный тип

```csharp
(Employee employee)
```

↓

ASP.NET Core ищет данные в **Body**.

---

## Простой тип

```csharp
(int id)
```

↓

ASP.NET Core ищет данные в:

- Route
- Query String

а **не** в Body.

Если нужно читать простой тип из тела запроса, необходимо явно указать:

```csharp
([FromBody] int id)
```

---

# Проверка данных

В примере есть простая валидация:

```csharp
if (employee is null || employee.Id <= 0)
{
    return "Employee is not valid";
}
```

Проверяется:

- объект успешно создан;
- `Id` больше нуля.

После этого сотрудник добавляется в репозиторий:

```csharp
EmployeesRepository.AddEmployee(employee);
```

---

# Что произойдёт при неверном JSON

Например:

```json
{
    "id":
```

ASP.NET Core не сможет десериализовать запрос и автоматически вернёт ошибку клиенту.

---

# POST vs GET

## GET

Данные обычно передаются через:

```http
/employees?id=5
```

или

```http
/employees/5
```

---

## POST

Данные передаются в **Body**:

```json
{
    "id": 5,
    "name": "John"
}
```

Это позволяет отправлять большие и сложные объекты.

---

# Итог

Для сложных объектов Minimal API автоматически использует **HTTP Body**.

Пример:

```csharp
app.MapPost("/employees", (Employee employee) =>
{
    EmployeesRepository.AddEmployee(employee);

    return Results.Ok(employee);
});
```

Схема работы:

```text
HTTP Request
      ↓
Body (JSON)
      ↓
Model Binding
      ↓
Employee
      ↓
Endpoint
      ↓
Response
```
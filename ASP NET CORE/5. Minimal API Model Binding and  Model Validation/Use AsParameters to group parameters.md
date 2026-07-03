# Use `[AsParameters]` to Group Parameters

`[AsParameters]` в ASP.NET Core Minimal API позволяет **собрать параметры из разных источников в один объект** (DTO), а не перечислять их по одному в сигнатуре метода.

---

## Проблема без AsParameters

Обычно было бы так:

```csharp
endpoints.MapGet(
    "/employees/{id:int}",
    (int id, string name, string position) =>
{
    ...
});
```

❌ минусы:
- перегруженная сигнатура
- сложно читать
- неудобно расширять

---

# Решение: DTO + AsParameters

## Endpoint

```csharp
endpoints.MapGet(
    "/employees/{id:int}",
    ([AsParameters] GetEmployeeParameter param) =>
{
    var employee =
        EmployeesRepository.GetEmployeeById(param.Id);

    employee.Name = param.Name;
    employee.Position = param.Position;

    return employee; // автоматически JSON
});
```

---

## Модель параметров

```csharp
class GetEmployeeParameter
{
    [FromRoute]
    public int Id { get; set; }

    [FromQuery]
    public string Name { get; set; }

    [FromHeader]
    public string Position { get; set; }
}
```

---

# Как это работает

Запрос:

```http
GET /employees/10?name=John
```

и заголовки:

```http
Position: Manager
```

---

## Model Binding внутри делает:

```text
Route   → Id = 10
Query   → Name = "John"
Header  → Position = "Manager"
```

↓

```csharp
new GetEmployeeParameter
{
    Id = 10,
    Name = "John",
    Position = "Manager"
}
```

---

# Что делает `[AsParameters]`

👉 говорит ASP.NET Core:

> “не передавай параметры по отдельности, собери их в объект”

---

# Без AsParameters vs с AsParameters

## ❌ Без

```csharp
(int id, string name, string position)
```

---

## ✅ С AsParameters

```csharp
GetEmployeeParameter param
```

---

# Преимущества

## 1. Чистый код

```csharp
param.Id
param.Name
```

вместо 3–10 параметров

---

## 2. Легко расширять

Добавил поле:

```csharp
public string SortBy { get; set; }
```

→ endpoint не меняется

---

## 3. Чёткая структура API

DTO = контракт запроса

---

## 4. Удобно для больших endpoints

Особенно если:

- фильтры
- pagination
- headers
- auth data

---

# Важно: твой код содержит ошибку

```csharp
var employee = EmployeesRepository.GetEmployeeById(id);
```

❌ `id` не существует

---

## Правильно:

```csharp
var employee =
    EmployeesRepository.GetEmployeeById(param.Id);
```

---

# Где используется AsParameters

## Часто в:

- поиск / фильтрация
- paging API

```csharp
class SearchEmployees
{
    [FromQuery] public int Page { get; set; }
    [FromQuery] public int PageSize { get; set; }
    [FromQuery] public string Name { get; set; }
}
```

---

## Endpoint:

```csharp
app.MapGet("/employees", ([AsParameters] SearchEmployees query) => { });
```

---

# Итог

`[AsParameters]` = способ сгруппировать все входные параметры запроса в один объект DTO.

---

## Схема

```text
HTTP Request
   ↓
Route / Query / Header / Body
   ↓
Model Binding
   ↓
AsParameters DTO
   ↓
Endpoint
   ↓
Response JSON
```

---

Если хочешь, дальше могу показать:
- как это используется в реальных Web API (pagination + filtering)
- или как AsParameters сравнивается с MVC [FromBody] DTO
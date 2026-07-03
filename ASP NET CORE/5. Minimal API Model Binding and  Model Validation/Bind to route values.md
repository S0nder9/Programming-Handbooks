# Bind to Route Values (Model Binding + FromRoute)

ASP.NET Core позволяет автоматически связывать параметры маршрута с аргументами метода через **Model Binding**.

---

## Пример

```csharp
endpoints.MapGet(
    "/employees/{id:int?}",
    ([FromRoute(Name = "id")] int? id) =>
{
    var employee = EmployeesRepository.GetEmployeeById(id);

    return employee;
});
```

---

# Как это работает

## 1. Маршрут

```http
GET /employees/5
```

или

```http
GET /employees
```

---

## 2. Route Template

```csharp
"/employees/{id:int?}"
```

Здесь:

- `id` — параметр маршрута
- `int` — constraint (только числа)
- `?` — параметр необязательный

---

## 3. FromRoute

```csharp
[FromRoute(Name = "id")] int? id
```

### Что это значит:

- взять значение **из route**
- имя параметра в маршруте = `"id"`
- положить в переменную `id`

---

## Важно: имя параметра

Есть 2 варианта:

### Вариант 1 (совпадение имени)

```csharp
"/employees/{id:int?}"
(int id)
```

ASP.NET сам сопоставляет `id → id`

---

### Вариант 2 (явное указание)

```csharp
[FromRoute(Name = "id")] int id1
```

Даже если переменная называется `id1`, ASP.NET возьмёт:

```text
route["id"]
```

---

# Что происходит внутри

## Запрос:

```http
GET /employees/10
```

### Routing:

```text
id = "10"
```

---

### Model Binding:

```csharp
int? id = 10;
```

---

### Endpoint:

```csharp
GetEmployeeById(10)
```

---

## Запрос без id:

```http
GET /employees
```

---

### Routing:

```text
id = null
```

---

### Model Binding:

```csharp
int? id = null;
```

---

### Endpoint:

```csharp
GetEmployeeById(null)
```

---

# Почему int?

```csharp
{id:int?}
```

означает:

- только числа допустимы
- иначе 404

---

## Пример

### Работает:

```http
/employees/5
```

---

### Не работает:

```http
/employees/abc
```

→ 404 Not Found

---

# Return Employee

```csharp
return employee;
```

В Minimal API:

ASP.NET Core автоматически:

```text
object → JSON
```

---

## Пример ответа

```json
{
  "id": 5,
  "name": "John",
  "position": "Dev"
}
```

---

# Ключевые моменты

## 1. Model Binding делает:

- извлечение данных из URL
- конвертацию типов
- передачу в метод

---

## 2. Route constraints работают ДО выполнения endpoint

```text
/employees/abc → 404
```

---

## 3. FromRoute полезен когда:

- имя параметра не совпадает
- нужно явно указать источник данных

---

# Итог

```csharp
[FromRoute(Name = "id")] int? id
```

означает:

> взять значение `id` из URL маршрута, преобразовать в `int?` и передать в параметр метода

---

Схема:

```text
URL
 ↓
Routing
 ↓
Model Binding
 ↓
Endpoint
 ↓
JSON Response
```
```
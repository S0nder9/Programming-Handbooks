# Filter Execution, Model Binding and Model Validation

При использовании **Minimal API** важно понимать, **в каком порядке** выполняются:

- Model Binding;
- Model Validation;
- Endpoint Filters;
- Endpoint.

От этого зависит, какие данные получит фильтр и будет ли вообще вызван endpoint.

---

# Полный порядок обработки запроса

```
HTTP Request
      │
      ▼
Routing
      │
      ▼
Model Binding
      │
      ▼
Endpoint Filters
      │
      ▼
Parameter Validation (если используется)
      │
      ▼
Endpoint
      │
      ▼
HTTP Response
```

Однако порядок **Endpoint Filters** и **Parameter Validation** зависит от того, **в каком порядке они зарегистрированы**.

---

# Model Binding

Сначала ASP.NET Core создаёт параметры endpoint.

Например

```csharp
app.MapPatch("/employees/{id}",
    (int id, Employee employee) =>
{
});
```

Из запроса

```
PATCH /employees/5
```

Body

```json
{
    "id":5,
    "name":"John"
}
```

получается

```csharp
id = 5

employee.Id = 5

employee.Name = "John"
```

После этого начинают выполняться фильтры.

---

# Вариант 1

```csharp
app.MapPatch(...)
   .AddEndpointFilter<EmployeeUpdateFilter>()
   .WithParameterValidation();
```

Порядок выполнения:

```
Request
      │
      ▼
Routing
      │
      ▼
Model Binding
      │
      ▼
EmployeeUpdateFilter
      │
      ▼
Parameter Validation
      │
      ▼
Endpoint
```

То есть:

1. создаётся объект `Employee`;
2. выполняется фильтр;
3. затем запускается валидация.

Если фильтр вернёт ошибку, валидация вообще не выполнится.

---

### Пример

Body

```json
{
    "id":8,
    "name":"",
    "salary":-100
}
```

Фильтр обнаружит

```
Route id = 5

Body id = 8
```

и сразу вернёт

```
400 Bad Request
```

До проверки атрибутов

```csharp
[Required]

[Range]
```

код даже не дойдёт.

---

# Вариант 2

```csharp
app.MapPatch(...)
   .WithParameterValidation()
   .AddEndpointFilter<EmployeeUpdateFilter>();
```

Порядок выполнения:

```
Request
      │
      ▼
Routing
      │
      ▼
Model Binding
      │
      ▼
Parameter Validation
      │
      ▼
EmployeeUpdateFilter
      │
      ▼
Endpoint
```

Теперь сначала выполняется валидация модели.

Если она не прошла, фильтр даже не будет вызван.

---

### Пример

Body

```json
{
    "id":5,
    "name":"",
    "salary":-10
}
```

Сначала сработает

```csharp
[Required]

[Range]
```

ASP.NET Core сразу вернёт

```
400 Validation Problem
```

Фильтр

```csharp
EmployeeUpdateFilter
```

не выполнится.

---

# Почему так происходит?

Методы

```csharp
.AddEndpointFilter(...)
```

и

```csharp
.WithParameterValidation()
```

формируют цепочку фильтров.

Каждый следующий вызов "оборачивает" предыдущий, поэтому порядок регистрации определяет порядок выполнения.

---

# Что выбрать?

## Сначала Filter

```csharp
.AddEndpointFilter(...)
.WithParameterValidation()
```

Подходит, если нужно:

- проверить права доступа;
- сравнить route id и body id;
- остановить запрос как можно раньше;
- выполнить собственную предварительную проверку.

---

## Сначала Validation

```csharp
.WithParameterValidation()
.AddEndpointFilter(...)
```

Подходит, если фильтр должен работать только с уже корректными данными.

Например:

- логирование;
- аудит;
- работа с уже валидной моделью;
- изменение результата.

---

# Пример

```csharp
app.MapPatch("/employees/{id}",
    Handler)
.WithParameterValidation()
.AddEndpointFilter<EmployeeUpdateFilter>();
```

Запрос

```json
{
    "id":5,
    "name":"",
    "salary":-100
}
```

Сначала вернётся

```
400 Validation Problem
```

Фильтр даже не начнёт выполняться.

---

Если поменять порядок

```csharp
.AddEndpointFilter<EmployeeUpdateFilter>()
.WithParameterValidation();
```

то первым выполнится фильтр.

---

# Итог

Порядок регистрации влияет на порядок выполнения:

### Вариант 1

```csharp
.AddEndpointFilter(...)
.WithParameterValidation();
```

```
Model Binding
      ↓
Endpoint Filter
      ↓
Model Validation
      ↓
Endpoint
```

---

### Вариант 2

```csharp
.WithParameterValidation()
.AddEndpointFilter(...);
```

```
Model Binding
      ↓
Model Validation
      ↓
Endpoint Filter
      ↓
Endpoint
```

**Model Binding** всегда выполняется первым, так как фильтру и валидации уже нужны готовые объекты. Затем выполняются фильтры и проверка модели в том порядке, в котором они были зарегистрированы. Это позволяет управлять тем, должна ли валидация происходить до пользовательского фильтра или после него.
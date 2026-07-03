# Model Validation

После того как **Model Binding** создал объект из HTTP-запроса, ASP.NET Core может автоматически проверить, соответствует ли он заданным правилам. Этот процесс называется **Model Validation**.

Правила задаются с помощью **атрибутов валидации** (Data Annotations).

---

# Подключение

Для Minimal API можно использовать пакет **MinimalApis.Extensions** (или аналогичную библиотеку), который добавляет автоматическую проверку параметров.

После установки достаточно включить валидацию для endpoint:

```csharp
app.MapPost("/employees", (Employee employee) =>
{
    EmployeesRepository.AddEmployee(employee);

    return "Added employee";
})
.WithParameterValidation();
```

> Теперь перед выполнением endpoint объект `Employee` будет автоматически проверяться.

---

# Пример модели

```csharp
using System.ComponentModel.DataAnnotations;

public class Employee
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    public string Position { get; set; }

    [Required]
    [Range(50_000, 200_000)]
    public double Salary { get; set; }

    public Employee(int id, string name, string position, double salary)
    {
        Id = id;
        Name = name;
        Position = position;
        Salary = salary;
    }
}
```

---

# Атрибуты валидации

## `[Required]`

Поле обязательно должно присутствовать.

```csharp
[Required]
public string Name { get; set; }
```

Если клиент отправит

```json
{
    "salary": 70000
}
```

то проверка не пройдёт, потому что отсутствует `Name`.

---

## `[Range]`

Ограничивает допустимый диапазон значений.

```csharp
[Range(50_000, 200_000)]
public double Salary { get; set; }
```

Допустимые значения:

```text
50000
75000
120000
200000
```

Недопустимые:

```text
10000
250000
```

---

# Пример корректного запроса

```http
POST /employees
Content-Type: application/json
```

```json
{
    "id": 1,
    "name": "John",
    "position": "Developer",
    "salary": 90000
}
```

Все ограничения соблюдены.

↓

Endpoint выполнится:

```csharp
EmployeesRepository.AddEmployee(employee);
```

---

# Пример некорректного запроса

```json
{
    "id": 1,
    "position": "Developer",
    "salary": 10000
}
```

Ошибки:

- отсутствует `Name`;
- `Salary` меньше минимального значения.

Endpoint **не будет вызван**.

---

# Порядок выполнения

```text
HTTP Request
        ↓
Model Binding
        ↓
Employee
        ↓
Model Validation
        ↓
Есть ошибки?
      │
 ┌────┴─────┐
 │          │
Нет        Да
 │          │
 ▼          ▼
Endpoint   Ошибка клиенту
```

Если проверка не пройдена, выполнение endpoint прекращается.

---

# Другие популярные атрибуты

## Минимальная и максимальная длина

```csharp
[StringLength(50)]
public string Name { get; set; }
```

или

```csharp
[MinLength(3)]
[MaxLength(50)]
```

---

## Регулярное выражение

```csharp
[RegularExpression(@"^\d+$")]
public string Phone { get; set; }
```

Проверяет строку по регулярному выражению.

---

## Email

```csharp
[EmailAddress]
public string Email { get; set; }
```

---

## URL

```csharp
[Url]
public string Website { get; set; }
```

---

## Длина строки

```csharp
[StringLength(100)]
public string Description { get; set; }
```

---

## Диапазон дат

```csharp
[Range(typeof(DateTime),
    "01.01.2024",
    "31.12.2026")]
public DateTime Date { get; set; }
```

---

# Преимущества автоматической валидации

Без неё пришлось бы проверять каждое поле вручную:

```csharp
if (employee.Name == null)
    ...

if (employee.Salary < 50000)
    ...
```

С атрибутами достаточно описать правила один раз:

```csharp
[Required]
[Range(50000, 200000)]
public double Salary { get; set; }
```

Проверка будет выполняться автоматически для всех запросов к этому endpoint.

---

# Итог

Model Validation — это этап после **Model Binding**, который проверяет объект по заданным правилам.

Основная последовательность выглядит так:

```text
HTTP Request
      ↓
Model Binding
      ↓
Employee
      ↓
Model Validation
      ↓
Endpoint
```

Если модель не проходит проверку, endpoint не выполняется, а клиент получает сообщение об ошибке с информацией о нарушенных ограничениях.
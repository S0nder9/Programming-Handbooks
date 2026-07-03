# Custom Model Validation with `ValidationAttribute`

Стандартных атрибутов (`[Required]`, `[Range]`, `[EmailAddress]` и др.) хватает не всегда.

Иногда правило зависит **от нескольких свойств объекта**.

Например:

> Если сотрудник — **Manager**, то его зарплата должна быть **не менее 100 000**.

Такую проверку можно реализовать, создав собственный атрибут валидации, унаследовавшись от `ValidationAttribute`.

---

# Задача

Допустимый запрос:

```json
{
    "Id": 4,
    "Name": "Tom",
    "Position": "Developer",
    "Salary": 80000
}
```

Так как сотрудник — **Developer**, зарплаты `80000` достаточно.

---

Недопустимый запрос:

```json
{
    "Id": 4,
    "Name": "Tom",
    "Position": "Manager",
    "Salary": 80000
}
```

Ответ:

```json
{
    "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
    "title": "One or more validation errors occurred.",
    "status": 400,
    "errors": {
        "Salary": [
            "Salary must be at least 100,000 for Managers."
        ]
    }
}
```

Endpoint даже не будет выполнен.

---

# Шаг 1. Создаём собственный атрибут

```csharp
using System.ComponentModel.DataAnnotations;

public class EmployeeEnsureSalaryAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(
        object? value,
        ValidationContext validationContext)
    {
        var employee = validationContext.ObjectInstance as Employee;

        if (employee is not null &&
            !string.IsNullOrWhiteSpace(employee.Position) &&
            employee.Position.Equals("Manager",
                StringComparison.OrdinalIgnoreCase))
        {
            if (employee.Salary < 100_000)
            {
                return new ValidationResult(
                    "Salary must be at least 100,000 for Managers.");
            }
        }

        return ValidationResult.Success;
    }
}
```

> По соглашению пользовательские атрибуты обычно называют с суффиксом **`Attribute`** (`EmployeeEnsureSalaryAttribute`). При использовании его можно писать как с этим суффиксом, так и без него.

---

# Разберём метод `IsValid()`

Метод вызывается автоматически во время Model Validation.

```csharp
protected override ValidationResult? IsValid(...)
```

Если вернуть

```csharp
ValidationResult.Success
```

то проверка считается успешной.

Если вернуть

```csharp
new ValidationResult(...)
```

то модель считается невалидной.

---

## `value`

```csharp
object? value
```

Это значение свойства, на котором висит атрибут.

В нашем случае:

```csharp
Salary
```

то есть здесь будет число:

```text
80000
```

или

```text
150000
```

---

## `validationContext`

Позволяет получить доступ ко всему объекту.

```csharp
validationContext.ObjectInstance
```

↓

```csharp
Employee
```

Благодаря этому можно проверять сразу несколько свойств.

---

# Шаг 2. Используем атрибут

```csharp
public class Employee
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    public string Position { get; set; }

    [Required]
    [Range(50_000, 200_000)]
    [EmployeeEnsureSalary]
    public double Salary { get; set; }

    public Employee(int id,
                    string name,
                    string position,
                    double salary)
    {
        Id = id;
        Name = name;
        Position = position;
        Salary = salary;
    }
}
```

При валидации свойства `Salary` будет вызван и наш пользовательский атрибут.

---

# Шаг 3. Включаем проверку

```csharp
app.MapPost("/employees", (Employee employee) =>
{
    EmployeesRepository.AddEmployee(employee);

    return "Added employee";
})
.WithParameterValidation();
```

Теперь перед выполнением endpoint будут выполнены:

- `[Required]`
- `[Range]`
- `EmployeeEnsureSalaryAttribute`

---

# Что происходит

```text
HTTP Request
        ↓
Model Binding
        ↓
Employee
        ↓
[Required]
        ↓
[Range]
        ↓
EmployeeEnsureSalaryAttribute
        ↓
Ошибки?
   │
┌──┴──┐
│     │
Нет   Да
│     │
▼     ▼
Endpoint   HTTP 400
```

---

# Почему используется `ValidationContext`

Проверка зависит сразу от двух свойств:

- `Position`
- `Salary`

Если бы метод получал только

```csharp
Salary
```

он не смог бы понять, является ли сотрудник менеджером.

Поэтому используется

```csharp
validationContext.ObjectInstance
```

который содержит весь объект.

---

# Когда создавать собственный атрибут

`ValidationAttribute` стоит использовать, если правило:

- зависит от нескольких свойств модели;
- часто повторяется в разных местах проекта;
- должно быть оформлено как переиспользуемый атрибут.

Например:

- менеджер должен получать минимум 100 000;
- несовершеннолетний не может оформить кредит;
- дата окончания должна быть позже даты начала;
- скидка не может превышать стоимость товара.

Такие проверки невозможно выразить только стандартными атрибутами вроде `[Required]` или `[Range]`, поэтому используются собственные атрибуты валидации.
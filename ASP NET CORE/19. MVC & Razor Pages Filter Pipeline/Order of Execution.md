# Order of Execution

В MVC один и тот же запрос может проходить сразу через несколько фильтров:

- Global;
- Controller;
- Action.

ASP.NET Core должен определить, **в каком порядке их выполнять**.

Для этого используются:

- **Scope** (область применения фильтра);
- **Order** (приоритет выполнения).

---

# Порядок по Scope

По умолчанию фильтры выполняются по области применения.

До выполнения Action:

```
Global
    ↓
Controller
    ↓
Action
```

После выполнения Action порядок меняется на обратный:

```
Action
    ↑
Controller
    ↑
Global
```

Например

```csharp
Global Filter

Controller Filter

Action

Controller Filter

Global Filter
```

---

# Пример

```csharp
builder.Services.AddControllers(options =>
{
    options.Filters.Add<WriteToConsoleResourceFilter>();
});
```

```csharp
[WriteToConsoleResourceFilter]
public class DepartmentsController : Controller
{
    [WriteToConsoleResourceFilter]
    public IActionResult Index()
    {
        return Content("Hello");
    }
}
```

Последовательность будет такой:

```
Global Before

Controller Before

Action Before

Controller Action

Action After

Controller After

Global After
```

---

# Интерфейс IOrderedFilter

Иногда необходимо изменить стандартный порядок выполнения.

Для этого фильтр реализует интерфейс

```csharp
IOrderedFilter
```

который содержит свойство

```csharp
int Order
```

```csharp
public class WriteToConsoleResourceFilter :
    Attribute,
    IResourceFilter,
    IOrderedFilter
{
    public int Order { get; set; }
}
```

---

# Что означает Order?

Чем **меньше значение**, тем **раньше** фильтр выполняется **до Action**.

После Action порядок становится обратным.

Например

```
Order = 0

Order = 1

Order = 2
```

До Action:

```
0

1

2
```

После Action:

```
2

1

0
```

---

# Пример

```csharp
[WriteToConsoleResourceFilter(
    Description = "Controller",
    Order = 1)]
public class DepartmentsController : Controller
{
    [WriteToConsoleResourceFilter(
        Description = "Action",
        Order = 0)]
    public IActionResult Index()
    {
        return Content("Hi");
    }
}
```

Фильтр:

```csharp
public class WriteToConsoleResourceFilter :
    Attribute,
    IResourceFilter,
    IOrderedFilter
{
    public string? Description { get; set; }

    public int Order { get; set; }

    public void OnResourceExecuting(
        ResourceExecutingContext context)
    {
        Console.WriteLine(
            $"Executing {Description}");
    }

    public void OnResourceExecuted(
        ResourceExecutedContext context)
    {
        Console.WriteLine(
            $"Executed {Description}");
    }
}
```

---

# Результат

```
Executing Action

Executing Controller

Controller Action

Executed Controller

Executed Action
```

Поскольку `Order = 0` меньше, фильтр уровня Action выполняется раньше фильтра уровня Controller, несмотря на то, что обычно фильтры контроллера имеют более высокий приоритет по области применения.

---

# Scope или Order?

Если фильтр **не реализует** `IOrderedFilter`, используется стандартный порядок по области применения (**Scope**):

```
Global

↓

Controller

↓

Action
```

Если фильтр реализует `IOrderedFilter`, то ASP.NET Core сначала сравнивает значение `Order`. При одинаковом `Order` снова используется правило областей применения.

---

# Значения Order

Можно использовать любые целые числа.

Например

```csharp
Order = -100

Order = 0

Order = 50

Order = 100
```

Фильтр с

```csharp
Order = -100
```

будет выполнен раньше остальных.

---

# Итоговая схема

```
HTTP Request
        │
        ▼
Order = -10
        │
        ▼
Order = 0
        │
        ▼
Order = 10
        │
        ▼
Controller Action
        │
        ▼
Order = 10
        │
        ▼
Order = 0
        │
        ▼
Order = -10
```

---

# Итог

ASP.NET Core определяет порядок выполнения фильтров по двум правилам:

1. **Scope (область применения)**:
   - Global;
   - Controller;
   - Action.

2. **Order (приоритет)**:
   - меньшее значение `Order` выполняется раньше до Action;
   - после Action выполнение происходит в обратном порядке.

Если фильтры реализуют `IOrderedFilter`, приоритет `Order` имеет преимущество. При одинаковых значениях `Order` используется стандартный порядок по области применения.

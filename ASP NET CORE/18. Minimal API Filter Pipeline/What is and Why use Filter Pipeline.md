# What is and Why Use Filter Pipeline

**Filter Pipeline** — это механизм ASP.NET Core MVC, который позволяет выполнять дополнительный код **до** и **после** выполнения действия (Action) контроллера.

Фильтры используются для реализации логики, которая должна применяться сразу к нескольким действиям или контроллерам, например:

- авторизация;
- логирование;
- обработка исключений;
- валидация;
- кэширование;
- изменение результата.

---

# Зачем нужны фильтры?

Представим, что в каждом методе контроллера нужно проверять авторизацию.

Без фильтров:

```csharp
public IActionResult Get()
{
    CheckAuthorization();

    // ...

    return Ok();
}
```

```csharp
public IActionResult Create()
{
    CheckAuthorization();

    // ...

    return Ok();
}
```

```csharp
public IActionResult Delete()
{
    CheckAuthorization();

    // ...

    return Ok();
}
```

Один и тот же код приходится писать во всех действиях.

---

С фильтрами достаточно написать его один раз:

```csharp
public class MyAuthorizationFilter : IAuthorizationFilter
{
    ...
}
```

и применить:

```csharp
[MyAuthorization]
public class EmployeesController : Controller
{
    ...
}
```

Теперь проверка будет выполняться автоматически перед каждым Action.

---

# Где находятся фильтры?

При обработке запроса MVC проходит несколько этапов.

```
HTTP Request
      │
      ▼
Middleware Pipeline
      │
      ▼
Routing
      │
      ▼
Filter Pipeline
      │
      ▼
Controller Action
      │
      ▼
Action Result
      │
      ▼
HTTP Response
```

То есть фильтры работают **только внутри MVC**, после маршрутизации и до/после выполнения Action.

---

# Что можно делать с помощью фильтров?

Фильтр может:

- выполнить код **до** Action;
- выполнить код **после** Action;
- отменить выполнение Action;
- изменить результат;
- обработать исключение.

---

# Пример

```csharp
public class LoggingFilter : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        Console.WriteLine("Before Action");
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        Console.WriteLine("After Action");
    }
}
```

Если выполнить

```
GET /employees
```

порядок будет такой:

```
Before Action

EmployeesController.Index()

After Action
```

---

# Виды фильтров

ASP.NET Core предоставляет несколько типов фильтров.

## 1. Authorization Filter

Выполняется первым.

Используется для проверки доступа.

Например:

```
Пользователь авторизован?
```

или

```
Есть нужная роль?
```

---

## 2. Resource Filter

Выполняется до Model Binding.

Подходит для:

- кэширования;
- работы с ресурсами;
- изменения процесса выполнения.

---

## 3. Action Filter

Самый популярный тип.

Выполняется:

- до Action;
- после Action.

Используется для:

- логирования;
- проверки параметров;
- изменения результата;
- измерения времени выполнения.

---

## 4. Exception Filter

Выполняется только при возникновении исключения.

Позволяет:

- обработать ошибку;
- записать лог;
- вернуть красивую страницу ошибки.

---

## 5. Result Filter

Выполняется:

- после выполнения Action;
- до отправки результата клиенту.

Позволяет изменить результат перед его отправкой.

Например:

```csharp
return View();
```

или

```csharp
return Json(...);
```

---

# Порядок выполнения

```
Request
    │
    ▼
Authorization Filter
    │
    ▼
Resource Filter
    │
    ▼
Model Binding
    │
    ▼
Action Filter (Before)
    │
    ▼
Controller Action
    │
    ▼
Action Filter (After)
    │
    ▼
Result Filter (Before)
    │
    ▼
Result
    │
    ▼
Result Filter (After)
    │
    ▼
Response
```

Если возникает исключение:

```
Exception Filter
```

получает возможность его обработать.

---

# Middleware vs Filters

Многие путают Middleware и Filters.

## Middleware

Работает для **всех** запросов приложения.

```
Request
     │
     ▼
Middleware
```

Он не знает, будет ли вызван MVC, Minimal API, Razor Pages или отдача статического файла.

---

## Filters

Работают **только внутри MVC**.

```
Request
     │
     ▼
Middleware
     │
     ▼
Routing
     │
     ▼
MVC
     │
     ▼
Filters
     │
     ▼
Controller
```

---

# Когда использовать Filters?

Используйте фильтры, если логика относится именно к MVC и должна выполняться для действий контроллеров:

- логирование действий;
- авторизация;
- обработка ошибок;
- валидация;
- кэширование результатов;
- изменение результата.

Если же логика должна применяться ко **всем** HTTP-запросам (например, добавление заголовков, CORS, сжатие, аутентификация, глобальная обработка исключений), лучше использовать **Middleware**.

---

# Итог

**Filter Pipeline** — это механизм ASP.NET Core MVC, который позволяет выполнять дополнительный код до и после выполнения действий контроллера.

Фильтры помогают вынести повторяющуюся логику из контроллеров, делая код чище и проще в сопровождении. Они работают только внутри MVC и бывают пяти основных типов:

- **Authorization Filters** — проверка доступа;
- **Resource Filters** — работа с ресурсами до Model Binding;
- **Action Filters** — код до и после выполнения Action;
- **Exception Filters** — обработка исключений;
- **Result Filters** — изменение результата перед отправкой клиенту.

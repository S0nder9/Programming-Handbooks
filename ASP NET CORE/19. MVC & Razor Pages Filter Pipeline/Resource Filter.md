# Resource Filter

**Resource Filter** — это фильтр, который выполняется **после Authorization Filter**, но **до Model Binding**.

Он позволяет:

- выполнить код до привязки модели (Model Binding);
- выполнить код после завершения Action и Result;
- полностью остановить выполнение запроса.

Обычно Resource Filter используют для:

- кэширования;
- проверки срока действия endpoint;
- открытия/закрытия ресурсов;
- измерения времени выполнения;
- короткого замыкания (Short Circuit).

---

# Когда выполняется Resource Filter?

```
HTTP Request
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
Action Filter
        │
        ▼
Controller Action
        │
        ▼
Result Filter
        │
        ▼
Resource Filter
        │
        ▼
HTTP Response
```

Как видно:

- `OnResourceExecuting()` вызывается **до Model Binding**;
- `OnResourceExecuted()` — **после выполнения всего остального конвейера MVC**.

---

# Пример

Создадим фильтр, который запрещает использовать endpoint после определённой даты.

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebApp.Filters
{
    public class EndpointExpiresFilter
        : Attribute, IResourceFilter
    {
        public string ExpiryDate { get; set; } = "";

        public void OnResourceExecuting(
            ResourceExecutingContext context)
        {
            if (DateTime.TryParse(
                ExpiryDate,
                out var expiryDate))
            {
                if (DateTime.Now > expiryDate)
                {
                    context.Result =
                        new BadRequestObjectResult(
                            "This endpoint has expired.");
                }
            }
        }

        public void OnResourceExecuted(
            ResourceExecutedContext context)
        {
        }
    }
}
```

Подключаем фильтр:

```csharp
[EndpointExpiresFilter(
    ExpiryDate = "2027-01-20")]
public IActionResult Index()
{
    return Content("Hi");
}
```

---

# Что происходит?

Если текущая дата

```
2026-07-21
```

то

```
2026 < 2027
```

Action выполнится нормально.

---

Если текущая дата

```
2028-01-01
```

то фильтр выполнит

```csharp
context.Result =
    new BadRequestObjectResult(
        "This endpoint has expired.");
```

Клиент получит

```
400 Bad Request
```

а Action даже не начнёт выполняться.

---

# Почему лучше проверять в `OnResourceExecuting`?

В исходном примере проверка выполнялась в

```csharp
OnResourceExecuted(...)
```

```csharp
public void OnResourceExecuted(...)
{
    context.Result = new BadRequest();
}
```

Но этот метод вызывается **после выполнения Action**.

То есть:

```
Action уже выполнился

↓

Ответ уже практически сформирован

↓

Фильтр пытается заменить результат
```

Это слишком поздно для большинства проверок доступа или срока действия.

Если цель — **не допустить выполнение Action**, проверку нужно делать в

```csharp
OnResourceExecuting(...)
```

---

# Короткое замыкание (Short Circuit)

Как и другие фильтры, Resource Filter может завершить выполнение конвейера.

Например:

```csharp
context.Result =
    new UnauthorizedResult();
```

или

```csharp
context.Result =
    new BadRequestResult();
```

После этого:

- Model Binding не выполняется;
- Action Filter не вызывается;
- Controller Action не запускается;
- клиент сразу получает ответ.

---

# Пример последовательности

Без ошибки:

```
Authorization

↓

Resource Executing

↓

Model Binding

↓

Action Filter

↓

Controller Action

↓

Result Filter

↓

Resource Executed
```

Если фильтр установил

```csharp
context.Result
```

то получится

```
Authorization

↓

Resource Executing

↓

400 Bad Request

↓

HTTP Response
```

До контроллера выполнение уже не дойдёт.

---

# Когда используют Resource Filter?

Наиболее распространённые сценарии:

- кэширование ответа;
- проверка срока действия endpoint;
- открытие и освобождение ресурсов;
- измерение времени выполнения;
- выполнение логики до Model Binding;
- завершение запроса до выполнения контроллера.

---

# Итог

**Resource Filter** выполняется сразу после `Authorization Filter` и до `Model Binding`.

Он имеет два метода:

```csharp
OnResourceExecuting()
```

— выполняется **до Model Binding** и подходит для предварительных проверок или короткого замыкания конвейера.

```csharp
OnResourceExecuted()
```

— выполняется **после завершения Action и формирования результата**, обычно используется для освобождения ресурсов, логирования или постобработки.

Если фильтр устанавливает

```csharp
context.Result
```

в `OnResourceExecuting()`, выполнение конвейера MVC прекращается, и Action не будет вызван.
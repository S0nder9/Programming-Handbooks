# Action Filter

**Action Filter** — это самый часто используемый тип фильтров в MVC.

Он выполняется **непосредственно вокруг Action** и позволяет:

- выполнить код **до** вызова Action;
- выполнить код **после** выполнения Action;
- изменить параметры Action;
- изменить результат Action;
- полностью отменить выполнение Action.

---

# Когда выполняется?

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
(Before)
        │
        ▼
Controller Action
        │
        ▼
Action Filter
(After)
        │
        ▼
Result Filter
        │
        ▼
HTTP Response
```

---

# ActionFilterAttribute

Обычно Action Filter создают наследованием от

```csharp
ActionFilterAttribute
```

Доступны четыре основных метода.

```csharp
public override void OnActionExecuting(...)
```

до выполнения Action.

---

```csharp
public override void OnActionExecuted(...)
```

после выполнения Action.

---

```csharp
public override Task OnActionExecutionAsync(...)
```

асинхронная версия.

---

```csharp
public override void OnResultExecuting(...)
```

уже относится к Result Filter.

---

# Пример проверки существования отдела

Допустим, endpoint принимает

```
/departments/5
```

Перед выполнением Action нужно убедиться, что отдел существует.

Лучше выполнять такую проверку **до Action**, поэтому используется `OnActionExecuting`.

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebApp.Filters
{
    public class EnsureDepartmentExists
        : ActionFilterAttribute
    {
        public override void OnActionExecuting(
            ActionExecutingContext context)
        {
            var depId =
                (int)context.ActionArguments["id"];

            var repository =
                context.HttpContext.RequestServices
                    .GetRequiredService<IDepartmentRepository>();

            if (!repository.DepartmentExists(depId))
            {
                context.ModelState.AddModelError(
                    "id",
                    "Department not found");

                var result = new ViewResult
                {
                    ViewName = "Error"
                };

                var controller =
                    context.Controller as Controller;

                result.ViewData = controller?.ViewData;
                result.ViewData.Model =
                    ModelStateHelper.GetErrors(
                        context.ModelState);

                context.Result = result;
            }
        }
    }
}
```

Использование:

```csharp
[EnsureDepartmentExists]
public IActionResult Details(int id)
{
    ...
}
```

---

# Что делает фильтр?

Получает параметры Action:

```csharp
context.ActionArguments["id"]
```

Получает сервис через DI:

```csharp
context.HttpContext.RequestServices
```

Проверяет существование отдела.

Если отдела нет:

```csharp
context.Result = result;
```

Action **не будет выполнен**, а пользователь сразу увидит представление `"Error"`.

> **Примечание:** в вашем примере было `context.ActionArgument["id"]` — правильно `context.ActionArguments["id"]`.

---

# Проверка ModelState

Другой распространённый сценарий — проверка корректности модели.

```csharp
public class EnsureValidModelStateFilter
    : ActionFilterAttribute
{
    public override void OnActionExecuting(
        ActionExecutingContext context)
    {
        if (!context.ModelState.IsValid)
        {
            var result = new ViewResult
            {
                ViewName = "Error"
            };

            var controller =
                context.Controller as Controller;

            result.ViewData = controller?.ViewData;
            result.ViewData.Model =
                ModelStateHelper.GetErrors(
                    context.ModelState);

            context.Result = result;
        }
    }
}
```

Использование:

```csharp
[EnsureValidModelStateFilter]
public IActionResult Create(Department model)
{
    ...
}
```

Если `ModelState` содержит ошибки, Action выполняться не будет.

> **Важно:** такую проверку тоже следует выполнять в `OnActionExecuting`, а не в `OnActionExecuted`, иначе Action уже успеет выполниться.

---

# ActionExecuting или ActionExecuted?

### `OnActionExecuting`

Выполняется **до Action**.

Используется для:

- проверки параметров;
- проверки существования объектов;
- проверки `ModelState`;
- логирования;
- изменения параметров;
- отмены выполнения Action через `context.Result`.

---

### `OnActionExecuted`

Выполняется **после Action**.

Используется для:

- логирования;
- изменения результата;
- анализа исключений (`context.Exception`);
- постобработки ответа.

На этом этапе отменить выполнение Action уже нельзя — он уже завершился.

---

# Короткое замыкание (Short Circuit)

Если установить

```csharp
context.Result = ...
```

в `OnActionExecuting`:

```csharp
context.Result =
    new BadRequestResult();
```

то:

- Action не выполнится;
- управление сразу перейдёт к формированию ответа.

---

# Порядок выполнения

Без ошибок:

```
Model Binding

↓

Action Filter Before

↓

Controller Action

↓

Action Filter After

↓

Result Filter
```

При коротком замыкании:

```
Model Binding

↓

Action Filter Before

↓

context.Result

↓

Result Filter

↓

HTTP Response
```

До Action выполнение уже не дойдёт.

---

# Итог

**Action Filter** выполняется непосредственно вокруг Action контроллера.

Основные методы:

- `OnActionExecuting()` — до выполнения Action;
- `OnActionExecuted()` — после выполнения Action.

На практике:

- проверки (`ModelState`, существование сущностей, права доступа к данным) выполняют в **`OnActionExecuting`**;
- логирование, изменение результата и постобработку — в **`OnActionExecuted`**.

Если в `OnActionExecuting` установить

```csharp
context.Result
```

выполнение Action будет отменено, и клиент сразу получит указанный результат.
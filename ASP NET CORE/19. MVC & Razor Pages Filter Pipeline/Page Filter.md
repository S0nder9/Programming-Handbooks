# Page Filter

**Page Filter** — это фильтр, который используется в **Razor Pages**.

Он выполняется во время обработки Razor Page и позволяет выполнять дополнительную логику:

- до выполнения Page Handler;
- после выполнения Page Handler;
- при выборе обработчика страницы.

Page Filter является аналогом **Action Filter** в MVC.

---

# Когда используется Page Filter?

В MVC:

```
Controller
    ↓
Action
```

используются:

```
IActionFilter
```

В Razor Pages:

```
Page
    ↓
Page Handler
```

используются:

```
IPageFilter
```

Например:

```
Index.cshtml
Index.cshtml.cs

OnGet()

OnPost()
```

Page Filter может вмешиваться перед выполнением:

```csharp
OnGet()
```

или

```csharp
OnPost()
```

---

# Создание Page Filter

Для создания фильтра реализуем интерфейс:

```csharp
IPageFilter
```

Он содержит три метода:

```csharp
public interface IPageFilter
{
    void OnPageHandlerSelected(
        PageHandlerSelectedContext context);

    void OnPageHandlerExecuting(
        PageHandlerExecutingContext context);

    void OnPageHandlerExecuted(
        PageHandlerExecutedContext context);
}
```

---

# Пример: проверка ModelState

Создадим фильтр, который проверяет корректность модели перед выполнением обработчика.

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebApp.Filters
{
    public class EnsureValidModelPageFilter
        : Attribute, IPageFilter
    {
        public void OnPageHandlerSelected(
            PageHandlerSelectedContext context)
        {
        }


        public void OnPageHandlerExecuting(
            PageHandlerExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                var errors =
                    ModelStateHelper.GetErrors(
                        context.ModelState);

                context.Result =
                    new RedirectToPageResult(
                        "/Error");
            }
        }


        public void OnPageHandlerExecuted(
            PageHandlerExecutedContext context)
        {
        }
    }
}
```

---

# Метод OnPageHandlerSelected()

```csharp
OnPageHandlerSelected()
```

Вызывается, когда Razor Pages выбрала обработчик.

Например:

Запрос:

```
GET /Departments
```

ASP.NET Core определяет:

```
OnGet()
```

После выбора вызывается:

```
OnPageHandlerSelected()
```

Используется редко.

---

# Метод OnPageHandlerExecuting()

```csharp
OnPageHandlerExecuting()
```

Вызывается **перед выполнением Page Handler**.

Например:

```
HTTP Request

↓

Page Filter

↓

OnGet()

↓

Response
```

Здесь удобно делать:

- проверку ModelState;
- проверку авторизации;
- проверку данных;
- короткое замыкание.

---

# Метод OnPageHandlerExecuted()

```csharp
OnPageHandlerExecuted()
```

Вызывается **после выполнения Page Handler**.

Например:

```
Before

OnGet()

After
```

Используется для:

- логирования;
- измерения времени;
- изменения результата.

---

# Короткое замыкание

Как и в MVC фильтрах, можно остановить выполнение.

Например:

```csharp
if (!context.ModelState.IsValid)
{
    context.Result =
        new RedirectToPageResult("/Error");
}
```

После установки:

```csharp
context.Result
```

метод страницы:

```csharp
OnGet()
```

или

```csharp
OnPost()
```

не будет выполнен.

---

# Применение фильтра

## К одной странице

В `PageModel`:

```csharp
[EnsureValidModelPageFilter]
public class CreateModel : PageModel
{
}
```

Теперь фильтр работает только для:

```
Create.cshtml
```

---

# Глобальная регистрация

Для всех Razor Pages:

```csharp
builder.Services
    .AddRazorPages()
    .AddMvcOptions(options =>
    {
        options.Filters
            .Add<EnsureValidModelPageFilter>();
    });
```

Теперь фильтр применяется ко всем страницам.

---

# Порядок выполнения Page Filter

Полный порядок Razor Pages:

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
Page Filter
        │
        ▼
Page Handler
        │
        ▼
Result Filter
        │
        ▼
HTTP Response
```

---

# Сравнение MVC Action Filter и Razor Page Filter

| MVC | Razor Pages |
|-|-|
| IActionFilter | IPageFilter |
| Action | Page Handler |
| Controller | PageModel |
| ActionExecutingContext | PageHandlerExecutingContext |
| ActionExecutedContext | PageHandlerExecutedContext |

---

# Page Filter vs Middleware

Middleware:

```
работает для всего приложения
```

Например:

- логирование;
- CORS;
- обработка ошибок.

---

Page Filter:

```
работает только внутри Razor Pages
```

Например:

- проверка данных страницы;
- логика перед OnGet/OnPost;
- изменение результата страницы.

---

# Итог

**Page Filter** — это фильтр Razor Pages, который позволяет выполнять код до и после обработки Page Handler.

Основные методы:

### `OnPageHandlerSelected()`
Вызывается после выбора обработчика страницы.

### `OnPageHandlerExecuting()`
Вызывается перед `OnGet()` / `OnPost()`.

### `OnPageHandlerExecuted()`
Вызывается после выполнения обработчика.

Используется для:

- проверки ModelState;
- авторизации;
- логирования;
- изменения результата;
- остановки выполнения страницы через `context.Result`.
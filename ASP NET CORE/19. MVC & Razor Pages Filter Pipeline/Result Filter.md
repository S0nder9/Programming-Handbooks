# Result Filter

**Result Filter** — это фильтр MVC, который выполняется вокруг процесса формирования результата Action.

Он работает **после выполнения Action**, но **до отправки HTTP-ответа клиенту**.

Используется для:

- изменения результата Action;
- добавления HTTP-заголовков;
- изменения ответа;
- логирования результата;
- изменения формата ответа.

---

# Где находится Result Filter в Pipeline?

Полный порядок MVC Filter Pipeline:

```
HTTP Request
        │
        ▼
Authorization Filter
        │
        ▼
Resource Filter (Before)
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
Execute Result
        │
        ▼
Result Filter (After)
        │
        ▼
Resource Filter (After)
        │
        ▼
HTTP Response
```

---

# Пример использования

Создадим фильтр, который добавляет свой HTTP Header.

```csharp
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebApp.Filters
{
    public class AddHeaderFilter :
        Attribute,
        IResultFilter
    {
        public string? Name { get; set; }

        public string? Value { get; set; }


        public void OnResultExecuting(
            ResultExecutingContext context)
        {
            if (Name != null &&
                Value != null &&
                !context.HttpContext.Response.Headers.ContainsKey(Name))
            {
                context.HttpContext.Response.Headers.Add(
                    Name,
                    Value);
            }
        }


        public void OnResultExecuted(
            ResultExecutedContext context)
        {

        }
    }
}
```

---

# Использование фильтра

Добавляем атрибут к Action:

```csharp
[AddHeaderFilter(
    Name = "MyHeader",
    Value = "MyValue")]
public IActionResult ReturnContentFile()
{
    byte[] bytes =
        System.IO.File.ReadAllBytes(
            @"C:\Files\1.pdf");

    return File(
        bytes,
        "application/pdf");
}
```

---

# Что произойдёт?

Запрос:

```
GET /download
```

Выполняется Action:

```csharp
return File(bytes, "application/pdf");
```

Action возвращает:

```
FileContentResult
```

Перед отправкой ответа вызывается:

```csharp
OnResultExecuting()
```

Фильтр добавляет:

```
MyHeader: MyValue
```

После этого клиент получает:

```
HTTP/1.1 200 OK

Content-Type: application/pdf
MyHeader: MyValue
```

---

# Почему именно OnResultExecuting?

Есть два метода:

## OnResultExecuting

```csharp
public void OnResultExecuting(
    ResultExecutingContext context)
```

Вызывается **до выполнения результата**.

Можно:

- изменить результат;
- изменить заголовки;
- отменить выполнение.

Например:

```csharp
context.Cancel = true;
```

---

## OnResultExecuted

```csharp
public void OnResultExecuted(
    ResultExecutedContext context)
```

Вызывается **после выполнения результата**.

Используется для:

- логирования;
- очистки ресурсов;
- анализа результата.

На этом этапе менять HTTP Response уже поздно.

---

# Короткое замыкание Result Filter

Result Filter может остановить выполнение результата.

Например:

```csharp
public void OnResultExecuting(
    ResultExecutingContext context)
{
    context.Cancel = true;
}
```

Тогда:

```
Controller Action
        │
        ▼
Result Filter
        │
        ▼
Cancel
        │
        ▼
Ответ не отправляется
```

---

# Result Filter vs Action Filter

Они похожи, но работают на разных этапах.

## Action Filter

Работает вокруг выполнения Action:

```
Action Filter Before

Controller Action

Action Filter After
```

Используется для:

- проверки параметров;
- изменения входных данных;
- логики перед выполнением метода.

---

## Result Filter

Работает вокруг формирования ответа:

```
Controller Action

Result Filter Before

Result execution

Result Filter After
```

Используется для:

- заголовков;
- изменения ответа;
- обработки результата.

---

# Пример сравнения

Controller:

```csharp
public IActionResult Index()
{
    return Ok(new
    {
        Name = "John"
    });
}
```

Action Filter:

```
До выполнения Index()

Index()

После выполнения Index()
```

Result Filter:

```
Index()

До отправки Ok()

Изменение HTTP Response

Отправка клиенту
```

---

# Result Filter и File Results

Например:

```csharp
return File(
    bytes,
    "application/pdf");
```

возвращает:

```
FileContentResult
```

Result Filter может изменить:

- заголовки;
- Content-Type;
- дополнительные метаданные.

Например:

```
Content-Disposition
Cache-Control
Custom Headers
```

---

# Итог

**Result Filter** выполняется после Action и перед отправкой результата клиенту.

Основные методы:

```csharp
OnResultExecuting()
```

Выполняется до отправки результата. Можно изменить Response.

```csharp
OnResultExecuted()
```

Выполняется после отправки результата. Используется для постобработки.

Используется для:

- добавления заголовков;
- изменения ответа;
- логирования результатов;
- управления выполнением Result.

Пример:

```csharp
[AddHeaderFilter(
    Name = "MyHeader",
    Value = "MyValue")]
public IActionResult Index()
{
    return Ok();
}
```

После выполнения Action клиент получит дополнительный HTTP-заголовок:

```
MyHeader: MyValue
```
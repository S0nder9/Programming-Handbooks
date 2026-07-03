# Customize Results by Implementing `IResult`

В Minimal API можно создавать собственные типы результатов.

Для этого достаточно реализовать интерфейс `IResult`.

Это позволяет:

- возвращать собственные форматы ответов;
- переиспользовать одну и ту же логику во многих endpoint;
- скрыть детали формирования HTTP-ответа внутри отдельного класса.

---

# Когда это полезно

Предположим, мы часто возвращаем HTML.

Без собственного результата пришлось бы каждый раз писать:

```csharp
app.MapGet("/", async context =>
{
    context.Response.ContentType = "text/html";

    await context.Response.WriteAsync("<h2>Welcome</h2>");
});
```

Лучше вынести эту логику в отдельный класс.

---

# Endpoint

```csharp
app.MapGet("/employees", HtmlResult () =>
{
    string html = "<h2>Welcome</h2>";

    return new HtmlResult(html);
});
```

Endpoint стал значительно проще.

Он лишь создаёт объект результата.

Всю остальную работу выполняет `HtmlResult`.

---

# Реализация `HtmlResult`

```csharp
using System.Text;

namespace WebApp.Results
{
    public class HtmlResult : IResult
    {
        private readonly string html;

        public HtmlResult(string html)
        {
            this.html = html;
        }

        public async Task ExecuteAsync(HttpContext httpContext)
        {
            httpContext.Response.ContentType = "text/html";

            httpContext.Response.ContentLength =
                Encoding.UTF8.GetByteCount(html);

            await httpContext.Response.WriteAsync(html);
        }
    }
}
```

---

# Интерфейс `IResult`

Интерфейс содержит всего один метод:

```csharp
Task ExecuteAsync(HttpContext httpContext);
```

ASP.NET Core вызывает его автоматически после того, как endpoint вернул объект результата.

Именно здесь формируется HTTP-ответ.

---

# Конструктор

```csharp
private readonly string html;

public HtmlResult(string html)
{
    this.html = html;
}
```

При создании объекта сохраняем HTML.

Например:

```csharp
return new HtmlResult("<h2>Welcome</h2>");
```

Теперь этот HTML станет содержимым ответа.

---

# Метод `ExecuteAsync()`

```csharp
public async Task ExecuteAsync(HttpContext httpContext)
```

Это главный метод результата.

Внутри него можно полностью управлять ответом.

---

## Content-Type

```csharp
httpContext.Response.ContentType = "text/html";
```

Сообщаем браузеру, что возвращается HTML.

Иначе браузер воспримет ответ как обычный текст.

---

## Content-Length

```csharp
httpContext.Response.ContentLength =
    Encoding.UTF8.GetByteCount(html);
```

Устанавливаем размер ответа в байтах.

Используется

```csharp
Encoding.UTF8.GetByteCount(...)
```

потому что один символ не всегда занимает один байт.

Например:

```text
Welcome
```

занимает 7 байт.

А

```text
Привет
```

занимает значительно больше.

Во многих случаях этот заголовок можно не задавать вручную — ASP.NET Core вычислит его автоматически при записи ответа.

---

## Запись ответа

```csharp
await httpContext.Response.WriteAsync(html);
```

Отправляем HTML клиенту.

Ответ получится примерно таким:

```http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 16
```

```html
<h2>Welcome</h2>
```

---

# Что происходит при запросе

```text
GET /employees
        ↓
Endpoint
        ↓
new HtmlResult(html)
        ↓
ASP.NET Core
        ↓
ExecuteAsync()
        ↓
HttpResponse
        ↓
Клиент
```

---

# Преимущества собственного `IResult`

Без собственного класса:

```csharp
app.MapGet("/", async context =>
{
    context.Response.ContentType = "text/html";

    await context.Response.WriteAsync("<h2>Welcome</h2>");
});
```

С собственным результатом:

```csharp
app.MapGet("/", () =>
{
    return new HtmlResult("<h2>Welcome</h2>");
});
```

Endpoint становится короче, а логика формирования ответа переиспользуется в любом месте приложения.

---

# Когда стоит реализовывать `IResult`

Создание собственного результата имеет смысл, если нужно многократно возвращать одинаковый тип ответа или скрыть сложную логику формирования HTTP-ответа.

Типичные примеры:

- HTML-страницы;
- XML-ответы;
- CSV-файлы;
- PDF-документы;
- изображения;
- архивы;
- собственный формат JSON;
- единый формат успешного ответа для всего API.

---

# Итог

`IResult` — это интерфейс, который представляет результат выполнения endpoint в Minimal API.

Чтобы создать собственный тип результата, необходимо:

1. Реализовать интерфейс `IResult`.
2. Реализовать метод `ExecuteAsync()`.
3. Внутри метода самостоятельно сформировать HTTP-ответ (`StatusCode`, `ContentType`, заголовки и тело ответа).
4. Вернуть экземпляр этого класса из endpoint.

Такой подход позволяет инкапсулировать логику формирования ответа и делает код endpoint более чистым и удобным для повторного использования.
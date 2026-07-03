## HTTP Response in HttpContext

Объект ответа находится в:

```csharp
context.Response
```

Через него можно:

- задавать статус-код;
- изменять заголовки;
- отправлять данные клиенту.

---

## Установка заголовков

```csharp
context.Response.Headers["Content-Type"] =
    "text/html";
```

Сервер сообщает браузеру:

```http
Content-Type: text/html
```

То есть тело ответа содержит HTML.

---

### Более современный вариант

Обычно используют свойство:

```csharp
context.Response.ContentType =
    "text/html";
```

Вместо прямой работы с заголовками.

---

## Установка статус-кода

```csharp
context.Response.StatusCode = 200;
```

Сформирует:

```http
HTTP/1.1 200 OK
```

Другие варианты:

```csharp
context.Response.StatusCode = 404;
```

```http
HTTP/1.1 404 Not Found
```

---

```csharp
context.Response.StatusCode = 401;
```

```http
HTTP/1.1 401 Unauthorized
```

---

## Отправка данных клиенту

```csharp
await context.Response.WriteAsync(
    $"The method is {context.Request.Method}\r\n"
);
```

Добавляет текст в тело ответа.

Если запрос был:

```http
GET /
```

то клиент получит:

```text
The method is GET
```

---

## Отправка HTML

```csharp
await context.Response.WriteAsync(
    $"<h1>The url is {context.Request.Path}</h1>"
);
```

Так как Content-Type указан как:

```http
text/html
```

браузер обработает тег:

```html
<h1>...</h1>
```

как HTML-разметку.

---

Например:

```html
<h1>The url is /employees</h1>
```

отобразится большим заголовком.

---

## Вывод заголовков запроса

```csharp
foreach (var key in context.Request.Headers.Keys)
{
    await context.Response.WriteAsync(
        $"{key}: {context.Request.Headers[key]}\r\n"
    );
}
```

Код перебирает все заголовки запроса клиента.

Например:

```http
Host: localhost:5000
User-Agent: Chrome
Accept: text/html
```

---

## Что увидит клиент?

При запросе:

```http
GET /
```

сервер сформирует примерно такой ответ:

```http
HTTP/1.1 200 OK
Content-Type: text/html

The method is GET

<h1>The url is /</h1>

Headers

Host: localhost:5000
User-Agent: Chrome
Accept: text/html
```

---

## Как формируется ответ?

```csharp
context.Response.ContentType = "text/html";
```

↓

```http
Content-Type: text/html
```

---

```csharp
context.Response.StatusCode = 200;
```

↓

```http
HTTP/1.1 200 OK
```

---

```csharp
await context.Response.WriteAsync(...)
```

↓

Попадает в Body ответа.

---

## Кратко

`HttpContext.Response` представляет HTTP-ответ.

Основные свойства:

```csharp
context.Response.StatusCode
```

Код ответа.

---

```csharp
context.Response.Headers
```

Заголовки ответа.

---

```csharp
context.Response.ContentType
```

Тип данных.

---

```csharp
context.Response.WriteAsync(...)
```

Запись данных в тело ответа.

Таким образом:

```csharp
context.Response.StatusCode = 200;
context.Response.ContentType = "text/html";

await context.Response.WriteAsync("<h1>Hello</h1>");
```

сформирует ответ:

```http
HTTP/1.1 200 OK
Content-Type: text/html

<h1>Hello</h1>
```
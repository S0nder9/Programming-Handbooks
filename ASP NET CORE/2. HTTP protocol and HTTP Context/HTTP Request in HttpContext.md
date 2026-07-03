## HTTP Request в HttpContext

В ASP.NET Core каждый HTTP-запрос представляется объектом `HttpContext`.

Через него можно получить:

- информацию о запросе (`Request`);
- информацию об ответе (`Response`);
- данные пользователя;
- cookies;
- сессию и другое.

---

## Получение HttpContext

```csharp
app.Run(async (HttpContext context) =>
{
    // Работа с запросом и ответом
});
```

При каждом запросе ASP.NET Core создаёт новый объект `HttpContext` и передаёт его обработчику.

---

## Объект Request

Информация о запросе находится в:

```csharp
context.Request
```

---

### HTTP-метод

```csharp
context.Request.Method
```

Пример:

```http
GET
```

или

```http
POST
```

Вывод:

```csharp
await context.Response.WriteAsync(
    $"The method is {context.Request.Method}\r\n"
);
```

Результат:

```text
The method is GET
```

---

### URL (Path)

```csharp
context.Request.Path
```

Если пользователь открыл:

```text
https://localhost:5001/users
```

то:

```text
/users
```

Вывод:

```csharp
await context.Response.WriteAsync(
    $"The url is {context.Request.Path}\r\n"
);
```

---

### Заголовки запроса

Все заголовки доступны через:

```csharp
context.Request.Headers
```

---

Получение конкретного заголовка:

```csharp
var host = context.Request.Headers["Host"];
```

---

Перебор всех заголовков:

```csharp
foreach (var key in context.Request.Headers.Keys)
{
    await context.Response.WriteAsync(
        $"{key}: {context.Request.Headers[key]}\r\n"
    );
}
```

Пример вывода:

```text
Host: localhost:5059
Accept: text/html
User-Agent: Chrome
Accept-Language: ru-RU
```

---

## Объект Response

Ответ клиенту формируется через:

```csharp
context.Response
```

---

### Отправка текста

```csharp
await context.Response.WriteAsync("Hello World");
```

---

### Несколько строк

```csharp
await context.Response.WriteAsync("Line 1\r\n");
await context.Response.WriteAsync("Line 2\r\n");
```

`\r\n` — перенос строки по стандарту HTTP.

---

## Полный пример

```csharp
app.Run(async (HttpContext context) =>
{
    await context.Response.WriteAsync(
        $"The method is {context.Request.Method}\r\n"
    );

    await context.Response.WriteAsync(
        $"The url is {context.Request.Path}\r\n"
    );

    await context.Response.WriteAsync("Headers\r\n");

    foreach (var key in context.Request.Headers.Keys)
    {
        await context.Response.WriteAsync(
            $"{key}: {context.Request.Headers[key]}\r\n"
        );
    }
});
```

Если открыть:

```text
https://localhost:5059/users
```

можно получить примерно такой ответ:

```text
The method is GET
The url is /users

Headers
Host: localhost:5059
Accept: text/html
User-Agent: Mozilla/5.0 ...
```

---

## Основные свойства Request

```csharp
context.Request.Method
```

HTTP-метод.

---

```csharp
context.Request.Path
```

Путь запроса.

---

```csharp
context.Request.Headers
```

Заголовки.

---

```csharp
context.Request.Query
```

Query-параметры.

Пример:

```text
/users?id=10
```

```csharp
context.Request.Query["id"]
```

---

```csharp
context.Request.Body
```

Тело запроса.

---

## Кратко

`HttpContext` содержит всю информацию о текущем HTTP-запросе и ответе.

```csharp
context.Request
```

Данные запроса:

- Method
- Path
- Headers
- Query
- Body

---

```csharp
context.Response
```

Формирование ответа клиенту:

```csharp
await context.Response.WriteAsync("Hello");
```
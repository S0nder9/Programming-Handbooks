## HTTP Request Headers

**HTTP Headers** — это дополнительные данные о запросе или клиенте, которые передаются вместе с HTTP-запросом.

Используются для:

- авторизации;
- передачи токенов;
- указания типа данных;
- информации о браузере;
- настройки кэширования.

---

## Пример запроса

```http
DELETE /employees?id=1 HTTP/1.1
Host: localhost:5000
Authorization: frank
User-Agent: Chrome
```

Здесь:

```http
Authorization: frank
```

является HTTP-заголовком.

---

## Получение заголовков

В ASP.NET Core заголовки доступны через:

```csharp
context.Request.Headers
```

Получение конкретного заголовка:

```csharp
context.Request.Headers["Authorization"]
```

---

## Проверка авторизации

В примере:

```csharp
if (context.Request.Headers["Authorization"] == "frank")
{
    ...
}
```

Если клиент передал:

```http
Authorization: frank
```

то удаление будет разрешено.

---

## Полный алгоритм

Запрос:

```http
DELETE /employees?id=2
Authorization: frank
```

↓

Получаем Id из Query String:

```csharp
context.Request.Query["id"]
```

↓

Получаем заголовок:

```csharp
context.Request.Headers["Authorization"]
```

↓

Проверяем:

```csharp
Authorization == "frank"
```

↓

Если проверка успешна:

```csharp
EmployeesRepository.DeleteEmployee(...)
```

↓

Удаляем сотрудника.

---

## Если пользователь не авторизован

```csharp
else
{
    await context.Response.WriteAsync(
        "You are not auth"
    );
}
```

Ответ:

```text
You are not auth
```

---

## Получение всех заголовков

Можно вывести все заголовки запроса:

```csharp
foreach (var header in context.Request.Headers)
{
    Console.WriteLine(
        $"{header.Key}: {header.Value}"
    );
}
```

---

## Часто используемые заголовки

### Authorization

Передача токена или данных авторизации.

```http
Authorization: Bearer eyJ...
```

---

### Content-Type

Тип отправляемых данных.

```http
Content-Type: application/json
```

---

### Accept

Какие данные ожидает клиент.

```http
Accept: application/json
```

---

### User-Agent

Информация о браузере или приложении.

```http
User-Agent: Chrome
```

---

## Недостаток примера

Так делать можно только для обучения:

```csharp
if (context.Request.Headers["Authorization"] == "frank")
```

В реальных проектах обычно используют:

```http
Authorization: Bearer <JWT_TOKEN>
```

или

```http
Authorization: Basic ...
```

а проверкой занимается система аутентификации ASP.NET Core.

---

## Кратко

**HTTP Headers** — дополнительные данные запроса.

Получение заголовка:

```csharp
context.Request.Headers["Authorization"]
```

Проверка:

```csharp
if (context.Request.Headers["Authorization"] == "frank")
{
    ...
}
```

Чаще всего заголовки используются для:

- авторизации;
- JWT-токенов;
- передачи типа данных;
- информации о клиенте.
## HTTP Status Codes

**HTTP Status Code** — это число, которое сервер отправляет клиенту, чтобы сообщить результат обработки запроса.

Пример:

```http
HTTP/1.1 200 OK
```

Здесь:

```text
200 — код состояния
OK  — описание
```

---

## 1xx — Informational Responses

Информационные ответы.

```text
100-199
```

Сообщают, что запрос получен и обработка продолжается.

Примеры:

```http
100 Continue
101 Switching Protocols
```

На практике используются редко.

---

## 2xx — Successful Responses

Успешное выполнение запроса.

```text
200-299
```

### 200 OK

Запрос успешно обработан.

```http
HTTP/1.1 200 OK
```

```csharp
context.Response.StatusCode = 200;
```

---

### 201 Created

Ресурс успешно создан.

Обычно после:

```http
POST /employees
```

```http
HTTP/1.1 201 Created
```

```csharp
context.Response.StatusCode = 201;
```

---

### 204 No Content

Запрос выполнен успешно, но тело ответа отсутствует.

```http
HTTP/1.1 204 No Content
```

---

## 3xx — Redirection Responses

Перенаправление клиента.

```text
300-399
```

Сервер сообщает:

```text
Запрошенный ресурс находится по другому адресу.
```

---

### Пример редиректа

```csharp
if (context.Request.Path.StartsWithSegments("/redirection"))
{
    context.Response.Redirect("/employees");
}
```

ASP.NET Core сформирует ответ примерно такого вида:

```http
HTTP/1.1 302 Found
Location: /employees
```

После чего браузер автоматически выполнит новый запрос:

```http
GET /employees
```

---

### Часто используемые коды

```http
301 Moved Permanently
```

Ресурс навсегда переехал.

---

```http
302 Found
```

Временное перенаправление.

---

```http
304 Not Modified
```

Используется для кэширования.

---

## 4xx — Client Errors

Ошибка со стороны клиента.

```text
400-499
```

Сервер работает нормально, но запрос неверный.

---

### 400 Bad Request

Некорректный запрос.

```http
HTTP/1.1 400 Bad Request
```

Например:

```csharp
if (employee is null)
{
    context.Response.StatusCode = 400;
}
```

---

### 401 Unauthorized

Пользователь не авторизован.

```http
HTTP/1.1 401 Unauthorized
```

Например:

```csharp
if (context.Request.Headers["Authorization"] != "frank")
{
    context.Response.StatusCode = 401;
}
```

---

### 403 Forbidden

Авторизация есть, но доступ запрещён.

```http
HTTP/1.1 403 Forbidden
```

---

### 404 Not Found

Ресурс не найден.

```http
HTTP/1.1 404 Not Found
```

Например:

```csharp
var employee = EmployeesRepository
    .GetEmployees()
    .FirstOrDefault(x => x.Id == id);

if (employee is null)
{
    context.Response.StatusCode = 404;
}
```

---

## 5xx — Server Errors

Ошибка на стороне сервера.

```text
500-599
```

Клиент отправил корректный запрос, но сервер не смог его обработать.

---

### 500 Internal Server Error

Самая распространённая серверная ошибка.

```http
HTTP/1.1 500 Internal Server Error
```

Например:

```csharp
throw new Exception();
```

---

### 502 Bad Gateway

Ошибка промежуточного сервера.

```http
HTTP/1.1 502 Bad Gateway
```

---

### 503 Service Unavailable

Сервис временно недоступен.

```http
HTTP/1.1 503 Service Unavailable
```

Например, сервер находится на обслуживании.

---

## Таблица основных кодов

| Код | Значение |
|------|-----------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 301 | Moved Permanently |
| 302 | Found (Redirect) |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

---


Статусы делятся на 5 групп:

```text
1xx — информация
2xx — успех
3xx — перенаправление
4xx — ошибка клиента
5xx — ошибка сервера
```

Самые важные на практике:

```text
200 OK
201 Created
302 Found
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error
```
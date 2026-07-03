## HTTP Response Syntax

После обработки запроса сервер отправляет клиенту **HTTP Response** (HTTP-ответ).

Ответ состоит из 3 частей:

```text
1. Status Line
2. Headers
3. Body
```

---

## Общая структура

```http
HTTP/1.1 200 OK

Date: Thu, 10 Jul 2024 12:00:00 GMT
Server: Kestrel
Content-Type: text/html
Content-Length: 12

Hello World!
```

---

## 1. Status Line

Первая строка ответа содержит:

```text
HTTP Version
Status Code
Reason Phrase
```

Пример:

```http
HTTP/1.1 200 OK
```

Где:

```text
HTTP/1.1  → версия протокола
200       → код состояния
OK        → описание состояния
```

---

## Популярные статус-коды

### 200 OK

Запрос выполнен успешно.

```http
HTTP/1.1 200 OK
```

---

### 201 Created

Ресурс успешно создан.

```http
HTTP/1.1 201 Created
```

Часто используется после POST.

---

### 400 Bad Request

Некорректный запрос клиента.

```http
HTTP/1.1 400 Bad Request
```

---

### 401 Unauthorized

Пользователь не авторизован.

```http
HTTP/1.1 401 Unauthorized
```

---

### 404 Not Found

Ресурс не найден.

```http
HTTP/1.1 404 Not Found
```

---

### 500 Internal Server Error

Ошибка на сервере.

```http
HTTP/1.1 500 Internal Server Error
```

---

## 2. Headers

После статусной строки идут заголовки ответа.

Пример:

```http
Date: Thu, 10 Jul 2024 12:00:00 GMT
Server: Kestrel
Content-Type: text/html
Content-Length: 12
```

---

### Date

Дата формирования ответа.

```http
Date: Thu, 10 Jul 2024 12:00:00 GMT
```

---

### Server

Сервер, который обработал запрос.

```http
Server: Kestrel
```

Kestrel — встроенный веб-сервер ASP.NET Core.

---

### Content-Type

Тип возвращаемых данных.

```http
Content-Type: text/html
```

Возможные значения:

```http
text/plain
text/html
application/json
application/xml
image/png
```

---

### Content-Length

Размер тела ответа в байтах.

```http
Content-Length: 12
```

---

## 3. Body

После пустой строки идет тело ответа.

```http
Hello World!
```

Именно эти данные получает клиент.

---

## Пример ответа с HTML

```http
HTTP/1.1 200 OK
Content-Type: text/html

<h1>Hello World</h1>
```

Браузер отобразит:

```html
Hello World
```

---

## Пример ответа с JSON

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "name": "John",
  "age": 25
}
```

Часто используется в Web API.

---

## Формирование ответа в ASP.NET Core

Тело ответа:

```csharp
await context.Response.WriteAsync(
    "Hello World!"
);
```

---

Установка Content-Type:

```csharp
context.Response.ContentType =
    "application/json";
```

---

Установка статус-кода:

```csharp
context.Response.StatusCode = 200;
```

или

```csharp
context.Response.StatusCode = 404;
```

---

## Пример

```csharp
context.Response.StatusCode = 200;
context.Response.ContentType = "text/plain";

await context.Response.WriteAsync(
    "Employee added successfully"
);
```

Сформирует примерно такой ответ:

```http
HTTP/1.1 200 OK
Content-Type: text/plain

Employee added successfully
```

---

## Как это выглядит полностью

Клиент отправляет:

```http
GET /employees HTTP/1.1
```

↓

Сервер обрабатывает запрос

↓

Возвращает:

```http
HTTP/1.1 200 OK
Content-Type: text/plain

John
Mike
Frank
```

↓

Браузер или клиент получает ответ и показывает данные.

---

## Кратко

HTTP Response состоит из:

```text
1. Status Line
2. Headers
3. Body
```

Пример:

```http
HTTP/1.1 200 OK
Content-Type: text/plain

Hello World!
```

Основные свойства ASP.NET Core:

```csharp
context.Response.StatusCode
```

Код ответа.

```csharp
context.Response.ContentType
```

Тип данных.

```csharp
context.Response.WriteAsync(...)
```

Тело ответа.
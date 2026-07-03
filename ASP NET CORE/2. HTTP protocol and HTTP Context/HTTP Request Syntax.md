## HTTP Request Syntax

HTTP-запрос используется клиентом (браузером, мобильным приложением, Postman и т.д.) для передачи данных серверу.

Запрос состоит из трёх основных частей:

1. Стартовая строка (Request Line)
2. Заголовки (Headers)
3. Тело запроса (Body, необязательно)

---

## 1. Стартовая строка (Request Line)

Содержит:

```text
HTTP-Метод URI HTTP-Версия
```

Пример:

```http
GET / HTTP/1.1
```

Расшифровка:

- `GET` — метод запроса;
- `/` — путь к ресурсу;
- `HTTP/1.1` — версия протокола.

---

## 2. Заголовки (Headers)

Передают дополнительную информацию о клиенте и запросе.

Пример:

```http
Accept: text/html
Accept-Language: ru-RU
Host: localhost:5059
```

---

### Часто используемые заголовки

#### Accept

Какие данные клиент готов принять:

```http
Accept: text/html
```

или

```http
Accept: application/json
```

---

#### Accept-Language

Предпочитаемый язык:

```http
Accept-Language: ru-RU
```

---

#### Host

Адрес сервера:

```http
Host: localhost:5059
```

---

#### User-Agent

Информация о браузере:

```http
User-Agent: Mozilla/5.0 ...
```

---

#### Accept-Encoding

Поддерживаемые способы сжатия:

```http
Accept-Encoding: gzip, br, zstd
```

---

#### Connection

Управление соединением:

```http
Connection: keep-alive
```

Оставляет TCP-соединение открытым для следующих запросов.

---

## 3. Body (Тело запроса)

Передаёт данные на сервер.

Обычно используется с:

```text
POST
PUT
PATCH
```

Пример:

```http
POST /users HTTP/1.1
Content-Type: application/json

{
    "name": "Nikita",
    "age": 18
}
```

---

Для `GET` тело обычно отсутствует:

```http
GET / HTTP/1.1
```

---

## Полный пример запроса

```http
GET / HTTP/1.1
Host: localhost:5059
Accept: text/html
Accept-Language: ru-RU
User-Agent: Chrome
```

---

## Что происходит?

Браузер отправляет:

```http
GET / HTTP/1.1
```

Сервер получает запрос и понимает:

```text
Метод: GET
Путь: /
Версия: HTTP/1.1
```

Затем читает заголовки:

```http
Accept: text/html
```

и понимает:

```text
Клиент ожидает HTML-страницу.
```

После чего формирует ответ.

---

## Схема

```text
Клиент
   │
   │ HTTP Request
   ▼
Сервер
   │
   │ HTTP Response
   ▼
Клиент
```

---

## Кратко

```http
GET / HTTP/1.1     ← Request Line

Host: localhost    ← Headers
Accept: text/html

<Body>             ← Необязательно
```

Структура HTTP-запроса:

```text
1. Request Line
2. Headers
3. Body (необязательно)
```
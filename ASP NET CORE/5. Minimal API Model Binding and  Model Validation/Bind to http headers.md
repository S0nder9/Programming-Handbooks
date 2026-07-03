# Bind to HTTP Headers

ASP.NET Core Model Binding позволяет получать данные не только из route и query string, но и из **HTTP headers**.

---

## Пример

```csharp
endpoints.MapGet(
    "/employees",
    ([FromHeader(Name = "id1")] int id1) =>
{
    var employee =
        EmployeesRepository.GetEmployeeById(id1);

    return employee; // автоматически сериализуется в JSON
});
```

---

# Как это работает

## HTTP Request

```http
GET /employees HTTP/1.1
Host: localhost

id1: 3
```

---

## Model Binding делает:

```text
Header "id1" → parameter id1
```

↓

```csharp
int id1 = 3;
```

---

## Endpoint получает:

```csharp
GetEmployeeById(3)
```

---

# FromHeader

```csharp
[FromHeader(Name = "id1")] int id1
```

означает:

- взять значение из HTTP headers
- ключ строго `"id1"`
- преобразовать в `int`

---

# Важно: заголовки — это строки

HTTP headers всегда строки:

```text
id1: "3"
```

ASP.NET Core автоматически:

```text
string → int
```

---

# Что будет при разных запросах

## 1. Header есть

```http
GET /employees
id1: 5
```

Результат:

```csharp
id1 = 5
```

---

## 2. Header отсутствует

```http
GET /employees
```

Результат:

```csharp
id1 = 0 (default int)
```

---

# Особенность

В отличие от route/query:

| Источник | Поведение если нет значения |
|----------|----------------------------|
| Route    | 404 или null (если nullable) |
| Query    | null / default |
| Header   | default(T) (например 0 для int) |

---

# Когда использовать headers

Headers обычно НЕ используют для ID ресурсов.

Они применяются для:

## 1. Авторизации

```http
Authorization: Bearer token
```

---

## 2. Метаданных запроса

```http
User-Agent: Chrome
Accept-Language: ru
```

---

## 3. Кастомных флагов

```http
X-Request-Id: 12345
```

---

# Почему это плохой пример для ID

```csharp
[FromHeader(Name = "id1")]
```

❌ не REST подход  
❌ скрытое значение  
❌ хуже читается, чем route/query  

---

# Правильное использование

## Лучше:

```http
GET /employees/3
```

или

```http
GET /employees?id=3
```

---

# Схема Model Binding

```text
Request
 ├── Route Values
 ├── Query String
 ├── Headers   ← (FromHeader)
 └── Body
        ↓
   Model Binding
        ↓
   Endpoint
        ↓
   JSON Response
```

---

# Итог

```csharp
[FromHeader(Name = "id1")] int id1
```

означает:

> взять значение из HTTP header `id1`, преобразовать в int и передать в параметр метода

---

Если кратко:

- Route → для идентификации
- Query → для фильтров
- Body → для данных
- Headers → для метаданных (аутентификация, контекст, токены)
```
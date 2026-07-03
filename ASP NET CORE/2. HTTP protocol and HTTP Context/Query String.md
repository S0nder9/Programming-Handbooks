## Query String

**Query String** — это способ передачи данных через URL в формате:

```text
key=value&key=value&...
```

Начинается после символа `?`.

Пример:

```text
http://localhost:5276/employees?id=1&name=John
```

Здесь:

```text
id = 1
name = John
```

---

## Структура URL

```text
/employees?id=1&name=John
          ↑
      Query String
```

---

## Несколько параметров

Параметры разделяются символом `&`.

```text
/products?page=2&size=10&sort=name
```

Получаем:

```text
page = 2
size = 10
sort = name
```

---

## Получение Query-параметров в ASP.NET Core

Все параметры доступны через:

```csharp
context.Request.Query
```

---

### Получить конкретный параметр

```csharp
var id = context.Request.Query["id"];
```

Для запроса:

```text
/employees?id=1
```

получим:

```text
1
```

---

### Несколько параметров

```csharp
var id = context.Request.Query["id"];
var name = context.Request.Query["name"];
```

Для URL:

```text
/employees?id=1&name=John
```

получим:

```text
id = 1
name = John
```

---

## Проверка существования параметра

```csharp
if (context.Request.Query.ContainsKey("id"))
{
    var id = context.Request.Query["id"];
}
```

---

## Преобразование типов

Все Query-параметры приходят как строки.

Было:

```text
?id=10
```

Получаем:

```csharp
string id = context.Request.Query["id"];
```

Чтобы получить число:

```csharp
int id = int.Parse(
    context.Request.Query["id"]
);
```

Безопасный вариант:

```csharp
int.TryParse(
    context.Request.Query["id"],
    out int id
);
```

---

## Пример поиска сотрудника

URL:

```text
/employees?id=2
```

Код:

```csharp
if (context.Request.Path == "/employees")
{
    int id = int.Parse(
        context.Request.Query["id"]
    );

    var employee =
        EmployeesRepository
        .GetEmployees()
        .FirstOrDefault(x => x.Id == id);

    if (employee is not null)
    {
        await context.Response.WriteAsync(
            employee.Name
        );
    }
}
```

---

## Способы передачи данных в HTTP

### Query String

Передача через URL:

```text
/employees?id=1
```

Используется чаще всего в GET-запросах.

---

### Body

Передача через тело запроса:

```json
{
    "id": 1,
    "name": "John"
}
```

Используется обычно в POST, PUT, PATCH.

---

### Headers

Передача через заголовки:

```http
Authorization: Bearer token
```

Используется для:

- авторизации;
- языка пользователя;
- типа данных;
- настроек запроса.

---

## Когда использовать Query String?

Подходит для:

- фильтрации;
- поиска;
- пагинации;
- сортировки.

Примеры:

```text
/products?page=2
```

```text
/products?category=phones
```

```text
/products?sort=price
```

```text
/users?name=John
```

---

## Кратко

Query String — параметры в URL после `?`.

Пример:

```text
/employees?id=1&name=John
```

Получение значений:

```csharp
context.Request.Query["id"]
```

```csharp
context.Request.Query["name"]
```

Все значения приходят как строки, поэтому при необходимости их нужно преобразовывать:

```csharp
int.Parse(...)
```

или

```csharp
int.TryParse(...)
```.
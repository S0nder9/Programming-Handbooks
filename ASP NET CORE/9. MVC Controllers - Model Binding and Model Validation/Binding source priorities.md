# Binding Source Priorities (Controllers)

Когда ASP.NET Core вызывает метод контроллера, он должен определить, **откуда брать значения для параметров**. Этот процесс называется **Model Binding**.

Если источник данных не указан явно (`[FromBody]`, `[FromQuery]` и т.д.), применяется определённый порядок поиска.

---

# Приоритеты источников данных

## 1. Explicit Binding (явное указание источника)

Самый высокий приоритет имеют атрибуты:

- `[FromBody]`
- `[FromForm]`
- `[FromQuery]`
- `[FromRoute]`
- `[FromHeader]`
- `[FromServices]`

Например:

```csharp
public IActionResult Get(
    [FromRoute] int id,
    [FromQuery] string name)
{
    ...
}
```

ASP.NET Core больше ничего искать не будет — он сразу возьмёт данные из указанного источника.

---

## 2. `BindAsync`

Если тип содержит собственный метод

```csharp
public static ValueTask<T?> BindAsync(...)
```

или реализует соответствующий механизм пользовательской привязки, то ASP.NET Core использует именно его.

Пример:

```csharp
public class Person
{
    public static ValueTask<Person?> BindAsync(HttpContext context)
    {
        ...
    }
}
```

Это позволяет полностью управлять процессом создания объекта.

> **Примечание:** `BindAsync` в первую очередь используется в **Minimal API**. В классических MVC-контроллерах пользовательская привязка обычно реализуется через собственные Model Binder'ы (`IModelBinder`).

---

## 3. Bind complex types to Form Fields

Если параметр — сложный тип:

```csharp
public IActionResult Create(Department department)
```

и запрос имеет

```
Content-Type:
application/x-www-form-urlencoded
```

или

```
multipart/form-data
```

то Model Binder автоматически заполнит объект из полей формы.

Например:

```
Id=1
Name=IT
Description=Main
```

↓

```csharp
new Department
{
    Id = 1,
    Name = "IT",
    Description = "Main"
}
```

---

## 4. Bind primitive types to Route Parameters

Для простых типов (`int`, `string`, `Guid` и т.д.) сначала проверяются параметры маршрута.

```csharp
[HttpGet("{id}")]
public IActionResult Get(int id)
```

Запрос:

```
GET /employees/15
```

↓

```
id = 15
```

---

## 5. Bind types to Query String

Если значение не найдено в маршруте, ASP.NET Core ищет его в строке запроса.

```csharp
public IActionResult Get(int id)
```

Запрос:

```
GET /employees?id=15
```

↓

```
id = 15
```

Для сложных типов также возможна привязка из Query String:

```
GET /departments?id=1&name=IT
```

↓

```csharp
Department
{
    Id = 1,
    Name = "IT"
}
```

---

## 6. Bind arrays to Query String or Headers

Для массивов ASP.NET Core умеет автоматически собирать несколько значений.

Query String:

```
?id=1&id=2&id=3
```

↓

```csharp
public IActionResult Get(int[] id)
```

↓

```csharp
id = {1, 2, 3}
```

Аналогично возможно получение массива из заголовков.

---

# Схема приоритетов

```
1. [From...]
        │
        ▼
2. BindAsync (в основном Minimal API)
        │
        ▼
3. Form Fields (Complex Types)
        │
        ▼
4. Route Values (Primitive Types)
        │
        ▼
5. Query String
        │
        ▼
6. Arrays (Query/Header)
```

---

# Важно

Этот список отражает общую логику привязки, но **не является универсальным правилом для всех типов приложений ASP.NET Core**.

- **MVC Controllers** используют систему **Model Binding**, где поведение зависит от типа параметра (простой или сложный), атрибутов и зарегистрированных Model Binder'ов.
- **Minimal API** используют собственную систему привязки параметров, поэтому, например, `BindAsync` имеет там гораздо большее значение.

Всегда помните: если используется атрибут (`[FromBody]`, `[FromForm]`, `[FromQuery]` и т.д.), он имеет наивысший приоритет и определяет единственный источник данных для этого параметра.
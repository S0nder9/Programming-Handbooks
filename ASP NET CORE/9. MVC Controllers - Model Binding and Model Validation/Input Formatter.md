# Input Formatters

**Input Formatter** — это компонент ASP.NET Core, который отвечает за чтение тела HTTP-запроса (**Request Body**) и преобразование его в объект C#.

Например, клиент отправляет JSON:

```json
{
    "id": 1,
    "name": "IT",
    "description": "Main department"
}
```

Контроллер:

```csharp
[HttpPost]
public IActionResult Create([FromBody] Department department)
{
    ...
}
```

ASP.NET Core использует **Input Formatter**, чтобы преобразовать JSON в объект:

```csharp
Department department = new Department
{
    Id = 1,
    Name = "IT",
    Description = "Main department"
};
```

---

# Формат определяется по Content-Type

ASP.NET Core смотрит на заголовок:

```
Content-Type
```

Например:

```
Content-Type: application/json
```

↓

используется JSON Input Formatter.

---

# Что будет, если отправить XML?

Например:

```xml
<Department>
    <Id>1</Id>
    <Name>IT</Name>
</Department>
```

с заголовком

```
Content-Type: application/xml
```

По умолчанию ASP.NET Core **не умеет читать XML**.

В результате клиент получит:

```
415 Unsupported Media Type
```

Это означает:

> Сервер понял тип содержимого (`application/xml`), но не поддерживает его обработку.

---

# Как добавить поддержку XML

Необходимо зарегистрировать XML Input Formatter.

```csharp
builder.Services
    .AddControllers()
    .AddXmlSerializerFormatters();
```

или

```csharp
builder.Services
    .AddControllersWithViews()
    .AddXmlSerializerFormatters();
```

После этого ASP.NET Core сможет автоматически десериализовать XML в объекты C#.

---

# Пример

Запрос:

```
POST /departments
Content-Type: application/xml
```

Body:

```xml
<Department>
    <Id>5</Id>
    <Name>IT</Name>
    <Description>Main department</Description>
</Department>
```

Контроллер:

```csharp
[HttpPost]
public IActionResult Create([FromBody] Department department)
{
    return Ok(department);
}
```

После привязки:

```csharp
department.Id == 5
department.Name == "IT"
department.Description == "Main department"
```

---

# Какие Input Formatter'ы есть

Наиболее распространённые:

| Формат | Content-Type | Требуется настройка |
|---------|--------------|---------------------|
| JSON | `application/json` | ❌ Нет (поддерживается по умолчанию) |
| XML | `application/xml`, `text/xml` | ✅ Да (`AddXmlSerializerFormatters()`) |

---

# Output Formatter

Существует аналогичный механизм для **ответов сервера**.

Если метод возвращает объект:

```csharp
return Ok(department);
```

то **Output Formatter** преобразует его в нужный формат (обычно JSON, а при соответствующей настройке и запросе клиента — XML).

---

# Итог

**Input Formatter** — компонент ASP.NET Core, который читает тело HTTP-запроса и преобразует его в объект C#.

- По умолчанию поддерживается **JSON**.
- Если отправить XML без дополнительной настройки, сервер вернёт **415 Unsupported Media Type**.
- Для поддержки XML необходимо зарегистрировать XML Formatter:

```csharp
builder.Services
    .AddControllers()
    .AddXmlSerializerFormatters();
```

После этого ASP.NET Core сможет автоматически принимать как JSON, так и XML в параметрах, помеченных `[FromBody]`.
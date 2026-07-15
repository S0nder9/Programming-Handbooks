# Binding Complex Types (Complex Types)

В ASP.NET Core **комплексным типом (Complex Type)** считается любой класс, содержащий несколько свойств.

Например:

```csharp
public class Department
{
    public int Id { get; set; }

    [Required]
    public string? Name { get; set; }

    [StringLength(500)]
    public string? Description { get; set; }
}
```

---

# Контроллер

```csharp
[HttpPost]
public string Create(Department department)
{
    return "Create Department";
}
```

Обрати внимание — здесь нет никаких атрибутов (`[FromBody]`, `[FromForm]` и т.д.).

Возникает вопрос:

> **Откуда ASP.NET Core знает, где искать данные?**

Ответ зависит от того, используется ли **MVC Controller** или **Minimal API**.

---

# MVC Controller (Controller / ControllerBase)

В обычных контроллерах ASP.NET Core использует несколько источников данных.

Для **простых типов** (`int`, `string`, `bool` и т.д.) по умолчанию поиск выполняется в следующем порядке:

- Route Values;
- Query String;
- Form Fields;
- (при наличии атрибутов — Header и др.).

Для **сложных типов (Complex Types)** без атрибутов Model Binder заполняет свойства, используя данные из доступных источников, таких как:

- Form (`application/x-www-form-urlencoded`);
- Form (`multipart/form-data`);
- Route Values;
- Query String.

Поэтому этот код работает:

```csharp
[HttpPost]
public string Create(Department department)
{
    ...
}
```

если отправить форму:

```
Id=1
Name=IT
Description=Main department
```

ASP.NET Core создаст объект:

```csharp
new Department
{
    Id = 1,
    Name = "IT",
    Description = "Main department"
}
```

> Важно: **ASP.NET Core не преобразует form-data в JSON**. Он просто считывает каждое поле формы и присваивает его соответствующему свойству объекта через Model Binding.

---

# Почему работает form-data?

Например, приходит запрос:

```
Content-Type: multipart/form-data
```

или

```
Content-Type: application/x-www-form-urlencoded
```

Body:

```
Id = 5
Name = IT
Description = Main
```

Model Binder делает примерно следующее:

```
Department department = new Department();

department.Id = Form["Id"];
department.Name = Form["Name"];
department.Description = Form["Description"];
```

Никакого JSON при этом не создаётся.

---

# Использование `[FromBody]`

```csharp
[HttpPost]
public string Create([FromBody] Department department)
{
    ...
}
```

Теперь источник данных меняется.

ASP.NET Core больше **не ищет поля формы**.

Он читает всё тело запроса целиком и пытается десериализовать его как JSON (или другой формат, поддерживаемый Input Formatter).

Например:

```json
{
    "id": 1,
    "name": "IT",
    "description": "Main department"
}
```

После десериализации получится:

```csharp
Department department =
    JsonSerializer.Deserialize<Department>(body);
```

---

# Использование `[FromForm]`

```csharp
[HttpPost]
public string Create([FromForm] Department department)
{
    ...
}
```

Теперь ASP.NET Core **будет искать данные только в форме**.

Работает с:

```
application/x-www-form-urlencoded
```

и

```
multipart/form-data
```

---

# Использование `[FromHeader]`

```csharp
[HttpPost]
public string Create([FromHeader] Department department)
{
    ...
}
```

Этот код обычно не работает так, как ожидают.

Причина проста.

HTTP-заголовки выглядят так:

```
Content-Type: application/json
Authorization: Bearer token
User-Agent: Chrome
```

У заголовков нет структуры, соответствующей объекту `Department`.

ASP.NET Core не сможет собрать объект:

```csharp
Department
{
    Id = ?,
    Name = ?,
    Description = ?
}
```

из обычных HTTP-заголовков.

Поэтому свойства останутся со значениями по умолчанию (или привязка завершится неудачно).

`[FromHeader]` обычно используют для простых типов:

```csharp
public IActionResult Test(
    [FromHeader] string Authorization)
```

или

```csharp
public IActionResult Test(
    [FromHeader(Name = "X-API-Key")] string apiKey)
```

---

# Что использовать?

## Если клиент отправляет JSON

```
Content-Type: application/json
```

используем

```csharp
[FromBody]
```

---

## Если отправляется HTML-форма

```
application/x-www-form-urlencoded
```

или

```
multipart/form-data
```

используем

```csharp
[FromForm]
```

или вообще ничего (для MVC-контроллеров), если устраивает поведение по умолчанию.

---

## Если данные находятся в HTTP-заголовках

используем

```csharp
[FromHeader]
```

---

# Итог

ASP.NET Core **не преобразует form-data или x-www-form-urlencoded в JSON**.

При получении сложного типа (`Department`) Model Binder просто:

- считывает поля формы;
- сопоставляет их с именами свойств;
- создаёт экземпляр объекта;
- заполняет его свойства.

Атрибуты изменяют источник данных:

| Атрибут | Источник данных |
|---------|-----------------|
| *(без атрибута, MVC)* | Route, Query, Form (по правилам Model Binding) |
| `[FromBody]` | Тело запроса (обычно JSON) |
| `[FromForm]` | HTML-форма (`x-www-form-urlencoded`, `multipart/form-data`) |
| `[FromQuery]` | Query String |
| `[FromRoute]` | Параметры маршрута |
| `[FromHeader]` | HTTP-заголовки |


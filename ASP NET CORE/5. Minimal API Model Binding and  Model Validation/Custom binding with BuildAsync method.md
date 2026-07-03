# Custom Binding with `BindAsync()`

По умолчанию **Model Binding** умеет получать данные из:

- Route
- Query String
- Headers
- Body
- Form

Но иногда данные нужно собрать сразу из нескольких источников или выполнить дополнительную обработку. Для этого можно реализовать собственную привязку модели с помощью метода **`BindAsync()`**.

---

# Пример

Запрос:

```http
GET /people/1?name=John
```

Endpoint:

```csharp
endpoints.MapGet("/people/{id:int}", (Person? person) =>
{
    return person is not null
        ? $"<h1>Person {person.Name}</h1>"
        : "<h1>Person is null</h1>";
});
```

Класс модели:

```csharp
class Person
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public static ValueTask<Person?> BindAsync(HttpContext context)
    {
        var id = Convert.ToString(context.Request.RouteValues["id"]);
        var name = context.Request.Query["name"].ToString();

        if (int.TryParse(id, out var personId))
        {
            return ValueTask.FromResult<Person?>(
                new Person
                {
                    Id = personId,
                    Name = name
                });
        }

        return ValueTask.FromResult<Person?>(null);
    }
}
```

> **Важно:** метод должен быть **`public static`**. Именно такой сигнатуры ожидает Minimal API.

---

# Что происходит

Когда ASP.NET Core видит параметр

```csharp
(Person person)
```

он пытается создать объект.

Сначала проверяет:

> Есть ли у класса метод `BindAsync()`?

Если есть — используется именно он.

---

# Pipeline

```text
HTTP Request
        ↓
Routing
        ↓
Endpoint выбран
        ↓
Найден BindAsync()
        ↓
Вызов BindAsync(HttpContext)
        ↓
Создание Person
        ↓
Передача объекта в endpoint
```

---

# Откуда берутся данные

Внутри `BindAsync()` можно использовать весь `HttpContext`.

Например:

Route:

```csharp
context.Request.RouteValues
```

Query:

```csharp
context.Request.Query
```

Headers:

```csharp
context.Request.Headers
```

Cookies:

```csharp
context.Request.Cookies
```

Body:

```csharp
context.Request.Body
```

Claims пользователя:

```csharp
context.User
```

И любые другие данные из запроса.

---

# Почему это полезно

Без собственного биндинга пришлось бы писать:

```csharp
app.MapGet("/people/{id:int}",
(
    [FromRoute] int id,
    [FromQuery] string name
) =>
{
    var person = new Person
    {
        Id = id,
        Name = name
    };

    ...
});
```

С `BindAsync()` endpoint становится намного чище:

```csharp
app.MapGet("/people/{id:int}",
(Person person) =>
{
    ...
});
```

Вся логика создания объекта находится внутри самого класса.

---

# Когда использовать

`BindAsync()` полезен, если нужно:

- объединить данные из нескольких источников;
- выполнить преобразование данных;
- создать объект по собственым правилам;
- инкапсулировать логику получения модели.

Например:

```text
Route → Id

Query → Name

Header → Language

Cookie → Theme

↓

Person
```

---

# Возврат `null`

Если метод возвращает

```csharp
return ValueTask.FromResult<Person?>(null);
```

то параметр endpoint получит значение `null`:

```csharp
(Person? person)
```

Поэтому обычно используют nullable-тип:

```csharp
(Person? person)
```

и проверяют:

```csharp
if (person is null)
{
    ...
}
```

---

# Отличие от обычного Model Binding

Обычный Model Binding:

```text
HTTP Request
        ↓
ASP.NET Core автоматически
        ↓
Employee
```

---

С `BindAsync()`:

```text
HTTP Request
        ↓
Ваш метод BindAsync()
        ↓
Person
```

Теперь именно вы решаете, как создавать объект.

---

# Когда стоит использовать `BindAsync()`

Используйте его, когда стандартного Model Binding недостаточно:

- нужно объединить Route + Query + Headers;
- требуется сложная логика создания модели;
- необходимо скрыть эту логику от endpoint;
- объект должен самостоятельно знать, как его построить из HTTP-запроса.

Для обычных сценариев (`[FromRoute]`, `[FromQuery]`, `[FromBody]`) писать `BindAsync()` не требуется — встроенного Model Binding обычно достаточно.
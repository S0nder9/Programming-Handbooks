# ModelState

**ModelState** — это объект, который хранит информацию о результате **Model Binding** и **валидации модели**.

Он содержит:

- значения, полученные из HTTP-запроса;
- ошибки привязки (Binding Errors);
- ошибки валидации (Validation Errors).

---

# Пример модели

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
[HttpPost("create")]
public object Create(Department? department)
{
    ...
}
```

После выполнения **Model Binding** ASP.NET Core автоматически заполняет `ModelState`.

---

# Просмотр ошибок

```csharp
foreach (var value in ModelState.Values)
{
    foreach (var error in value.Errors)
    {
        Console.WriteLine(error.ErrorMessage);
    }
}
```

Например, если отправить

```json
{
    "id":1
}
```

то в консоли можно увидеть

```
The Name field is required.
```

или другую ошибку валидации.

---

# Добавление собственной ошибки

Можно самостоятельно добавить ошибку:

```csharp
ModelState.AddModelError(
    "Description",
    "Description is required");
```

Теперь в `ModelState` появится ещё одна ошибка.

Ключ

```csharp
"Description"
```

указывает, к какому свойству относится сообщение.

---

# Проверка ModelState

Обычно делают так:

```csharp
if (!ModelState.IsValid)
{
    return BadRequest(ModelState);
}
```

или

```csharp
return ValidationProblem(ModelState);
```

`ModelState.IsValid`

вернёт

```
false
```

если есть хотя бы одна ошибка.

---

# Что делает `[ApiController]`

```csharp
[ApiController]
[Route("/departments")]
public class DepartmentsController : Controller
{
    ...
}
```

Атрибут `[ApiController]` значительно упрощает работу.

Если после Model Binding

```
ModelState.IsValid == false
```

то ASP.NET Core **автоматически**:

1. не вызывает метод контроллера;
2. формирует ответ **400 Bad Request**;
3. возвращает ошибки в формате **Problem Details**.

Например:

```json
{
  "type":"https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title":"One or more validation errors occurred.",
  "status":400,
  "errors":{
      "Name":[
          "The Name field is required."
      ]
  }
}
```

То есть этот код:

```csharp
if (!ModelState.IsValid)
{
    return BadRequest(ModelState);
}
```

обычно писать уже не нужно.

---

# Когда код метода выполняется?

## Без `[ApiController]`

```
Request
    ↓
Model Binding
    ↓
ModelState
    ↓
Метод вызывается всегда
```

Разработчик сам проверяет:

```csharp
ModelState.IsValid
```

---

## С `[ApiController]`

```
Request
    ↓
Model Binding
    ↓
ModelState
    ↓
Есть ошибки?
        │
   Да ─────► 400 Bad Request
        │
        ▼
Нет
        │
        ▼
Вызов метода
```

Если данные не прошли валидацию, метод контроллера вообще не будет выполнен.

---

# Итог

**ModelState** хранит результат:

- привязки данных (Model Binding);
- проверки модели (Validation).

Можно:

- получить список ошибок через `ModelState.Values`;
- добавить собственную ошибку через `ModelState.AddModelError()`;
- проверить корректность модели с помощью `ModelState.IsValid`.

При использовании `[ApiController]` ASP.NET Core автоматически проверяет `ModelState` и при наличии ошибок возвращает **400 Bad Request** с описанием проблем, не вызывая метод контроллера.
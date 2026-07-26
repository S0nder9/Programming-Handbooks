# JsonResult

По умолчанию ASP.NET Core использует **Content Negotiation** — механизм, который выбирает формат ответа в зависимости от заголовка **Accept**, отправленного клиентом.

---

# Content Negotiation

Например, клиент отправляет запрос:

```
GET /departments/details
```

с заголовком

```
Accept: application/xml
```

Контроллер:

```csharp
public object Details(int[] id)
{
    return new Department();
}
```

или

```csharp
public IActionResult Details(int[] id)
{
    return Ok(new Department());
}
```

Если приложение поддерживает XML (например, через `AddXmlSerializerFormatters()`), ASP.NET Core посмотрит на заголовок `Accept` и вернёт ответ в формате XML.

Ответ:

```xml
<Department>
    <Id>1</Id>
    <Name>IT</Name>
    <Description>Main department</Description>
</Department>
```

Если же клиент отправит

```
Accept: application/json
```

то тот же объект будет сериализован в JSON:

```json
{
    "id": 1,
    "name": "IT",
    "description": "Main department"
}
```

То есть формат ответа выбирается автоматически.

---

# JsonResult

Иногда необходимо **всегда возвращать JSON**, независимо от заголовка `Accept`.

Для этого используется `JsonResult`.

```csharp
public IActionResult Details(int[] id)
{
    return Json(new Department());
}
```

или

```csharp
public IActionResult Details(int[] id)
{
    return new JsonResult(new Department());
}
```

Теперь даже если клиент отправит

```
Accept: application/xml
```

ответ всё равно будет JSON.

Например:

```json
{
    "id": 1,
    "name": "IT",
    "description": "Main department"
}
```

---

# Что делает `Json()`

Метод

```csharp
Json(...)
```

является удобной обёрткой над

```csharp
new JsonResult(...)
```

То есть эти варианты полностью эквивалентны:

```csharp
return Json(employee);
```

и

```csharp
return new JsonResult(employee);
```

---

# Когда использовать?

### Используйте обычный возврат объекта или `Ok()`, если:

- хотите поддерживать Content Negotiation;
- API должно уметь возвращать разные форматы (JSON, XML и т.д.);
- формат ответа определяется заголовком `Accept`.

### Используйте `JsonResult`, если:

- ответ всегда должен быть JSON;
- необходимо игнорировать заголовок `Accept`.

---

# Сравнение

| Код | Что произойдёт |
|------|----------------|
| `return new Department();` | Формат зависит от заголовка `Accept` (Content Negotiation) |
| `return Ok(new Department());` | Формат зависит от заголовка `Accept` |
| `return Json(new Department());` | Всегда возвращается JSON |
| `return new JsonResult(new Department());` | Всегда возвращается JSON |

---

# Итог

`JsonResult` принудительно сериализует объект в **JSON** и не участвует в механизме **Content Negotiation**.

Поэтому:

- обычный возврат объекта или `Ok()` позволяет ASP.NET Core выбрать формат ответа на основе заголовка `Accept`;
- `JsonResult` всегда возвращает JSON, даже если клиент запросил XML.
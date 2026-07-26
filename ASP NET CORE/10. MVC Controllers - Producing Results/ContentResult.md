# ContentResult

**ContentResult** — это тип результата (`ActionResult`), который позволяет вернуть клиенту **произвольный текст**.

Обычно используется, когда необходимо отправить:

- обычный текст;
- HTML;
- XML;
- CSS;
- JavaScript;
- любой другой текстовый контент.

---

# Самый простой способ

Контроллер:

```csharp
public IActionResult Index()
{
    return Content("Hi!");
}
```

Ответ:

```
Hi!
```

По умолчанию используется тип содержимого:

```
text/plain
```

---

# Указание Content-Type

Можно явно указать MIME-тип.

```csharp
public IActionResult Index()
{
    return Content("Hi!", "text/plain");
}
```

или

```csharp
public IActionResult Index()
{
    return Content("<h1>Hello</h1>", "text/html");
}
```

Теперь браузер интерпретирует ответ как HTML.

---

# Пример

```csharp
public IActionResult Index()
{
    return Content(
        "<h1>Departments</h1>",
        "text/html");
}
```

Ответ:

```html
<h1>Departments</h1>
```

В браузере отобразится заголовок **Departments**.

---

# Создание ContentResult вручную

Метод `Content()` — это лишь удобная обёртка.

То же самое можно написать так:

```csharp
public IActionResult Index()
{
    return new ContentResult
    {
        Content = "Hi!",
        ContentType = "text/plain"
    };
}
```

или

```csharp
return new ContentResult
{
    Content = "<h1>Hello</h1>",
    ContentType = "text/html"
};
```

---

# Что происходит внутри?

При выполнении

```csharp
return Content("Hi!");
```

ASP.NET Core создаёт объект:

```csharp
new ContentResult
{
    Content = "Hi!",
    ContentType = "text/plain"
}
```

После этого MVC записывает текст в тело HTTP-ответа.

---

# Когда использовать?

`ContentResult` удобно использовать, когда нужно вернуть:

- небольшой HTML;
- простой текст;
- XML;
- JavaScript;
- CSS;
- любой другой текстовый ответ.

Если же необходимо вернуть объект C#, лучше использовать:

```csharp
return Ok(employee);
```

или

```csharp
return Json(employee);
```

Тогда ASP.NET Core автоматически сериализует объект (обычно в JSON).

---

# Итог

`ContentResult` позволяет вернуть клиенту произвольный текст с указанным типом содержимого (`Content-Type`).

Есть два способа его использования:

```csharp
return Content("Hi!", "text/plain");
```

или

```csharp
return new ContentResult
{
    Content = "Hi!",
    ContentType = "text/plain"
};
```

На практике чаще используют метод `Content()`, так как он короче и удобнее.

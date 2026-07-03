# Route Parameters with Default Values

ASP.NET Core позволяет задавать значения по умолчанию для параметров маршрута.

Синтаксис:

```csharp
{parameterName=defaultValue}
```

Пример:

```csharp
"/categories/{size=medium}"
```

Если пользователь не передаст `size`, будет использовано значение:

```text
medium
```

---

## Пример

```csharp
endpoints.MapGet(
    "/categories/{size=medium}/{lang=eng}",
    async (HttpContext context) =>
{
    string size = Convert.ToString(
        context.Request.RouteValues["size"]
    );

    string lang = Convert.ToString(
        context.Request.RouteValues["lang"]
    );

    await context.Response.WriteAsync(
        $"categories {size} and {lang}"
    );
});
```

---

## Как это работает

### Запрос

```http
GET /categories
```

Результат:

```text
categories medium and eng
```

---

### Запрос

```http
GET /categories/large
```

Результат:

```text
categories large and eng
```

---

### Запрос

```http
GET /categories/large/ru
```

Результат:

```text
categories large and ru
```

---

## Важная особенность

ASP.NET Core **не делает перенаправление**.

То есть при запросе:

```http
/categories
```

браузер остаётся на:

```http
/categories
```

а не переходит на:

```http
/categories/medium/eng
```

Просто внутри маршрутизации значения автоматически подставляются:

```csharp
RouteValues["size"] = "medium";
RouteValues["lang"] = "eng";
```

---

## Что фактически видит ASP.NET Core

Запрос:

```http
/categories
```

Эквивалентен:

```text
size = medium
lang = eng
```

---

Запрос:

```http
/categories/large
```

Эквивалентен:

```text
size = large
lang = eng
```

---

## Когда использовать

Значения по умолчанию удобны для:

- языка сайта;
- размера страницы;
- региона;
- сортировки;
- версии API.

Например:

```csharp
"/products/{page=1}"
```

```http
/products
```

↓

```text
page = 1
```

---

```csharp
"/docs/{lang=en}"
```

```http
/docs
```

↓

```text
lang = en
```

---

## Отличие от Query String

С default route parameter:

```http
/categories
```

маршрут всё равно сработает.

---

С Query String:

```http
/categories?size=medium
```

если параметр не передан:

```http
/categories
```

то придётся вручную писать:

```csharp
string size =
    context.Request.Query["size"];

if (string.IsNullOrEmpty(size))
{
    size = "medium";
}
```

Для route parameters ASP.NET Core делает это автоматически.

---

## Итог

Маршрут:

```csharp
"/categories/{size=medium}/{lang=eng}"
```

поддерживает все варианты:

```http
/categories
/categories/large
/categories/large/ru
```

При отсутствии параметров ASP.NET Core автоматически подставляет значения по умолчанию:

```text
size = medium
lang = eng
```

без перенаправления и без дополнительного кода.
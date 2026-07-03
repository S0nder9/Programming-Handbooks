# Optional Route Parameters

В ASP.NET Core параметр маршрута можно сделать необязательным с помощью символа:

```csharp
?
```

Синтаксис:

```csharp
{id?}
```

Если параметр не передан, маршрут всё равно будет найден.

---

## Пример

```csharp
endpoints.MapGet(
    "/categories/{size=medium}/{lang=eng}/{id?}",
    async (HttpContext context) =>
{
    await context.Response.WriteAsync(
        $"categories " +
        $"{context.Request.RouteValues["size"]} " +
        $"and {context.Request.RouteValues["lang"]} " +
        $"and id {context.Request.RouteValues["id"]}"
    );
});
```

---

## Как работает

### Запрос

```http
GET /categories
```

Результат:

```text
categories medium and eng and id
```

Значения:

```text
size = medium
lang = eng
id = null
```

---

### Запрос

```http
GET /categories/large
```

Результат:

```text
categories large and eng and id
```

Значения:

```text
size = large
lang = eng
id = null
```

---

### Запрос

```http
GET /categories/large/ru
```

Результат:

```text
categories large and ru and id
```

Значения:

```text
size = large
lang = ru
id = null
```

---

### Запрос

```http
GET /categories/large/ru/15
```

Результат:

```text
categories large and ru and id 15
```

Значения:

```text
size = large
lang = ru
id = 15
```

---

## Что будет в RouteValues

Если параметр отсутствует:

```csharp
context.Request.RouteValues["id"]
```

↓

```csharp
null
```

Поэтому лучше писать:

```csharp
string? id =
    context.Request.RouteValues["id"]?.ToString();
```

или

```csharp
if (context.Request.RouteValues["id"] != null)
{
    // работа с id
}
```

---

## Ограничение

Необязательные параметры должны находиться в конце маршрута.

Правильно:

```csharp
"/products/{category}/{id?}"
```

---

Неправильно:

```csharp
"/products/{id?}/{category}"
```

ASP.NET Core не сможет однозначно определить маршрут.

---

## Default Value vs Optional Parameter

### Значение по умолчанию

```csharp
{size=medium}
```

Если параметр не передан:

```text
size = medium
```

---

### Необязательный параметр

```csharp
{id?}
```

Если параметр не передан:

```text
id = null
```

---

## Можно комбинировать

Маршрут:

```csharp
"/categories/{size=medium}/{lang=eng}/{id?}"
```

Содержит:

- `size` — параметр со значением по умолчанию;
- `lang` — параметр со значением по умолчанию;
- `id` — необязательный параметр.

---

## Практический пример

Получить список товаров:

```http
/products
```

Получить товары категории:

```http
/products/electronics
```

Получить конкретный товар:

```http
/products/electronics/15
```

Маршрут:

```csharp
"/products/{category=all}/{id?}"
```

---

## Итог

Символ:

```csharp
?
```

делает параметр необязательным:

```csharp
{id?}
```

Если параметр отсутствует:

```csharp
context.Request.RouteValues["id"]
```

вернёт:

```csharp
null
```

В отличие от:

```csharp
{size=medium}
```

где будет использовано значение по умолчанию:

```text
medium
```
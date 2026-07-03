## HTTP Refactor Routing

В предыдущем примере сначала проверялся **HTTP-метод**, а затем путь:

```csharp
if (Method == "GET")
{
    ...
}
else if (Method == "POST")
{
    ...
}
```

Но в ASP.NET Core обычно сначала определяют **маршрут (URL)**, а затем уже обрабатывают разные методы для этого маршрута.

То есть порядок такой:

```text
1. URL (Path)
2. HTTP Method
```

---

## Почему так удобнее?

Представим, что все операции относятся к сотрудникам:

```text
GET    /employees
POST   /employees
PUT    /employees
DELETE /employees
```

Логично сначала определить:

```text
Работаем ли мы с /employees?
```

а уже потом:

```text
Что именно нужно сделать?
Получить?
Создать?
Изменить?
Удалить?
```

---

## Рефакторинг

Было:

```csharp
if (Method == "GET")
{
}
else if (Method == "POST")
{
}
else if (Method == "PUT")
{
}
else if (Method == "DELETE")
{
}
```

Стало:

```csharp
if (Path == "/employees")
{
    if (Method == "GET")
    {
    }
    else if (Method == "POST")
    {
    }
    else if (Method == "PUT")
    {
    }
    else if (Method == "DELETE")
    {
    }
}
```

---

## Структура маршрута

```text
/employees
    ├── GET
    ├── POST
    ├── PUT
    └── DELETE
```

Каждый HTTP-метод отвечает за свою операцию.

---

## Что ещё можно улучшить?

Внутри блока:

```csharp
if (context.Request.Path.StartsWithSegments("/employees"))
{
    ...
}
```

повторная проверка:

```csharp
if (context.Request.Path.StartsWithSegments("/employees"))
```

уже не нужна.

Например:

❌ Было:

```csharp
else if (Method == "POST")
{
    if (Path.StartsWithSegments("/employees"))
    {
        ...
    }
}
```

✔ Стало:

```csharp
else if (Method == "POST")
{
    ...
}
```

Потому что мы уже находимся внутри блока `/employees`.

---

## Недостаток текущего решения

Если маршрутов станет много:

```text
/employees
/products
/orders
/users
/reports
```

код быстро разрастётся:

```csharp
if (...)
{
}
else if (...)
{
}
else if (...)
{
}
```

Поэтому в ASP.NET Core обычно используют маршрутизацию:

```csharp
app.MapGet(...)
app.MapPost(...)
app.MapPut(...)
app.MapDelete(...)
```

---

## Как выглядел бы современный вариант

```csharp
app.MapGet("/employees", ...);

app.MapPost("/employees", ...);

app.MapPut("/employees", ...);

app.MapDelete("/employees", ...);
```

ASP.NET Core сам:

- проверит URL;
- проверит HTTP-метод;
- вызовет нужный обработчик.

---

## Кратко

Рефакторинг заключается в том, чтобы сначала проверять:

```csharp
context.Request.Path
```

а затем:

```csharp
context.Request.Method
```

То есть:

```text
URL → Method → Action
```

Для маршрута `/employees`:

```http
GET     /employees
POST    /employees
PUT     /employees
DELETE  /employees
```

Так код становится более логичным и ближе к тому, как работает маршрутизация в ASP.NET Core.
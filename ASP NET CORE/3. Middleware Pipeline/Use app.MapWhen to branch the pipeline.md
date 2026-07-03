## Use app.MapWhen to branch the pipeline

`app.MapWhen()` создает отдельную ветку конвейера на основе произвольного условия.

В отличие от `app.Map()`, который проверяет только URL, `MapWhen()` позволяет анализировать любые данные запроса:

- URL (`Path`);
- Query String;
- Headers;
- HTTP Method;
- Cookies;
- и т.д.

---

### Пример

```csharp
app.MapWhen(context =>
{
    if (
        context.Request.Query.ContainsKey("id") &&
        context.Request.Path.StartsWithSegments("/employees")
       )
    {
        return true;
    }

    return false;
},
appBuilder =>
{
    ...
});
```

Условие вернет `true`, если:

```text
/employees?id=1
```

или

```text
/employees?id=25
```

---

## Как работает

### Запрос

```http
GET /employees?id=1
```

Проверка:

```csharp
context.Request.Path.StartsWithSegments("/employees")
```

↓

```text
true
```

---

Проверка:

```csharp
context.Request.Query.ContainsKey("id")
```

↓

```text
true
```

---

Следовательно:

```csharp
return true;
```

и запрос попадает в ветку:

```csharp
appBuilder =>
{
    Middleware 5
    Middleware 6
}
```

---

### Результат

```text
Middleware 5: Before
Middleware 6: Before
Middleware 6: After
Middleware 5: After
```

---

## Если условие не выполнится

Запрос:

```http
GET /employees
```

Здесь нет параметра:

```text
?id=
```

Поэтому:

```csharp
context.Request.Query.ContainsKey("id")
```

↓

```text
false
```

---

Условие не выполняется.

Запрос продолжит движение по основному конвейеру приложения.

---

## Схема работы

```text
Request
    │
    ▼
MapWhen
    │
 ┌──┴──┐
 │     │
true false
 │     │
 ▼     ▼
Branch Main Pipeline
```

---

## Разница между Map и MapWhen

### Map

Проверяет только путь.

```csharp
app.Map("/employees", branch =>
{
});
```

Подойдет для:

```text
/employees
/employees/1
/employees/list
```

---

### MapWhen

Проверяет любое условие.

```csharp
app.MapWhen(
    context => context.Request.Method == "POST",
    branch =>
    {
    });
```

или

```csharp
app.MapWhen(
    context => context.Request.Headers.ContainsKey("Authorization"),
    branch =>
    {
    });
```

---

## Кратко

`app.MapWhen()` создает ветку middleware по произвольному условию.

```csharp
app.MapWhen(condition, branch)
```

Если:

```csharp
condition == true
```

запрос переходит в ветку `branch`.

Если:

```csharp
condition == false
```

запрос продолжает выполняться в основном конвейере приложения.
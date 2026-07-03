## Use app.UseWhen to create rejoinable branch

Проблема `MapWhen()` заключается в том, что он создает отдельную ветку конвейера и может не вернуться в основной pipeline.

Для случаев, когда нужно выполнить дополнительные middleware и затем продолжить обработку запроса, используют `UseWhen()`.

---

### Отличие MapWhen от UseWhen

#### MapWhen

```csharp
app.MapWhen(condition, branch =>
{
    ...
});
```

Если условие истинно, запрос уходит в отдельную ветку.

```text
Main Pipeline
      │
      ▼
   MapWhen
      │
  true?
      │
      ▼
   Branch
```

Основной pipeline после этого обычно не выполняется.

---

#### UseWhen

```csharp
app.UseWhen(condition, branch =>
{
    ...
});
```

Если условие истинно:

1. Выполняется ветка.
2. Затем управление возвращается в основной pipeline.

---

## Ваш пример

Условие:

```csharp
context.Request.Query.ContainsKey("id")
&&
context.Request.Path.StartsWithSegments("/employees")
```

Для запроса:

```http
GET /employees?id=1
```

условие истинно.

---

### Порядок выполнения

```text
Middleware 1: Before
Middleware 5: Before
Middleware 6: Before

Middleware 2: Before
Middleware 3: Before

Middleware 3: After
Middleware 2: After

Middleware 6: After
Middleware 5: After

Middleware 1: After
```

---

### Почему так?

Схема:

```text
Middleware 1
    │
    ▼

UseWhen
    │
    ▼

Middleware 5
    │
    ▼

Middleware 6
    │
    ▼

Вернуться в основной pipeline
    │
    ▼

Middleware 2
    │
    ▼

Middleware 3
```

После выполнения основной цепочки происходит обратный проход:

```text
3 After
2 After
6 After
5 After
1 After
```

---

## Визуально

```text
Middleware 1
 ├─ Before
 │
 ├─ Middleware 5
 │   ├─ Before
 │   │
 │   ├─ Middleware 6
 │   │   ├─ Before
 │   │   │
 │   │   └─ Main Pipeline
 │   │       ├─ Middleware 2
 │   │       └─ Middleware 3
 │   │
 │   └─ After
 │
 └─ After
```

---

## Когда использовать UseWhen?

Когда нужно:

- проверить условие;
- выполнить дополнительную логику;
- продолжить обработку запроса.

Например:

```csharp
app.UseWhen(
    ctx => ctx.Request.Headers.ContainsKey("Authorization"),
    branch =>
    {
        // проверка авторизации
    });
```

или

```csharp
app.UseWhen(
    ctx => ctx.Request.Path.StartsWithSegments("/api"),
    branch =>
    {
        // логирование API-запросов
    });
```

---

## Кратко

### MapWhen

```text
Условие → отдельная ветка
```

Может не вернуться в основной pipeline.

---

### UseWhen

```text
Условие → выполнить ветку → вернуться обратно
```

Поэтому для вашего примера результат будет:

```text
1 Before
5 Before
6 Before
2 Before
3 Before
3 After
2 After
6 After
5 After
1 After
```

и основной конвейер продолжит работу после выполнения ветки `UseWhen`.
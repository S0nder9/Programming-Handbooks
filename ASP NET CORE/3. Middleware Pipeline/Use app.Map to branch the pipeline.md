## Use app.Map to branch the pipeline

`app.Map()` позволяет создать отдельную ветку (branch) конвейера для определенного URL.

Например:

```csharp
app.Map("/employees", appBuilder =>
{
    ...
});
```

Все запросы, начинающиеся с:

```text
/employees
```

будут направлены в эту ветку конвейера.

---

## Как работает ваш пример

```csharp
app.Use(Middleware1);

app.Map("/employees", ...);

app.Use(Middleware2);

app.Use(Middleware3);
```

---

### Запрос

```http
GET /employees
```

---

### Шаг 1

Выполняется первый middleware:

```text
Middleware 1: Before
```

---

### Шаг 2

ASP.NET видит:

```csharp
app.Map("/employees")
```

Путь подходит:

```text
/employees
```

Поэтому происходит переход в отдельную ветку.

---

### Шаг 3

Выполняется:

```text
Middleware 5: Before
```

---

### Шаг 4

Затем:

```text
Middleware 6: Before
```

---

### Шаг 5

Следующих middleware внутри ветки нет.

Начинается возврат назад:

```text
Middleware 6: After
```

---

### Шаг 6

Затем:

```text
Middleware 5: After
```

---

### Шаг 7

Возвращаемся в первый middleware:

```text
Middleware 1: After
```

---

## Результат

```text
Middleware 1: Before
Middleware 5: Before
Middleware 6: Before
Middleware 6: After
Middleware 5: After
Middleware 1: After
```

---

## Почему Middleware 2 и 3 не выполняются?

Потому что:

```csharp
app.Map(...)
```

создает отдельную ветку конвейера.

Если путь совпал:

```text
/employees
```

то ASP.NET переключается в эту ветку и основной pipeline больше не выполняется.

---

### Схема

```text
Middleware 1
      ↓

      /employees ?
        /      \
      Да        Нет
      ↓          ↓

Middleware5   Middleware2
      ↓          ↓
Middleware6   Middleware3
```

---

## Если запрос другой

Например:

```http
GET /products
```

Путь:

```text
/products
```

не подходит под:

```text
/employees
```

Поэтому ветка Map пропускается.

---

Тогда выполнится:

```text
Middleware 1: Before
Middleware 2: Before
Middleware 3: Before
Middleware 3: After
Middleware 2: After
Middleware 1: After
```

---

## Map и MapWhen

### Map

Проверяет URL.

```csharp
app.Map("/employees", branch =>
{
});
```

Работает только по пути.

---

### MapWhen

Проверяет любое условие.

```csharp
app.MapWhen(
    context =>
        context.Request.Method == "POST",
    branch =>
    {
        ...
    });
```

Можно создавать ветки по:

- URL;
- HTTP-методу;
- заголовкам;
- query string;
- любым другим данным запроса.

---

## Кратко

```csharp
app.Map("/employees", ...)
```

создает отдельную ветку middleware для URL:

```text
/employees
```

---

Для запроса:

```http
GET /employees
```

получим:

```text
Middleware 1: Before
Middleware 5: Before
Middleware 6: Before
Middleware 6: After
Middleware 5: After
Middleware 1: After
```

---

`Middleware 2` и `Middleware 3` не выполняются, потому что запрос ушел в отдельную ветку конвейера, созданную через `Map()`.
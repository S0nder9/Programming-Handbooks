# Mix and Match `Results` and `TypedResults`

В одном endpoint часто приходится возвращать **разные HTTP-ответы**.

Например:

- `401 Unauthorized`, если пользователь не авторизован;
- `201 Created`, если ресурс успешно создан.

Для этого можно использовать как `Results`, так и `TypedResults`.

---

# Пример

```csharp
app.MapPost("/employees", ([FromBody] Employee employee,
                           HttpContext context) =>
{
    if (!context.Request.Headers.TryGetValue("Authorization",
                                             out var authHeader))
    {
        return Results.Unauthorized();
    }

    EmployeesRepository.AddEmployee(employee);

    return TypedResults.Created(
        $"/employees/{employee.Id}",
        employee);
});
```

---

# Что происходит

### Проверяем авторизацию

```csharp
if (!context.Request.Headers.TryGetValue("Authorization",
                                         out var authHeader))
{
    return Results.Unauthorized();
}
```

Если заголовок отсутствует,

endpoint сразу завершится.

Клиент получит

```http
401 Unauthorized
```

---

### Если авторизация успешна

```csharp
EmployeesRepository.AddEmployee(employee);
```

Добавляем сотрудника.

---

### Возвращаем созданный ресурс

```csharp
return TypedResults.Created(
    $"/employees/{employee.Id}",
    employee);
```

Ответ:

```http
201 Created
Location: /employees/4
```

и JSON объекта.

---

# Почему нельзя вернуть строку?

Например,

```csharp
if (...)
{
    return Results.Unauthorized();
}

return "Success";
```

Компилятор выдаст ошибку.

Причина проста:

в одной ветке возвращается

```csharp
UnauthorizedHttpResult
```

а в другой

```csharp
string
```

Компилятор не может определить единый возвращаемый тип.

---

# Решение №1 — использовать только `Results`

```csharp
if (...)
{
    return Results.Unauthorized();
}

return Results.Ok(employee);
```

Во всех ветках возвращается объект,

реализующий

```csharp
IResult
```

---

# Решение №2 — использовать только `TypedResults`

```csharp
if (...)
{
    return TypedResults.Unauthorized();
}

return TypedResults.Created(
    $"/employees/{employee.Id}",
    employee);
```

Это рекомендуемый вариант для современных проектов.

---

# Можно ли смешивать?

Да.

Например:

```csharp
return Results.BadRequest();
```

и

```csharp
return TypedResults.Ok(employee);
```

можно использовать в одном endpoint.

Оба типа реализуют интерфейс

```csharp
IResult
```

поэтому компилятор способен вывести общий возвращаемый тип.

---

# Ещё более типобезопасный вариант

Если хочется явно указать все возможные результаты endpoint, можно использовать тип `Results<T1, T2, ...>`:

```csharp
app.MapPost("/employees",
    Results<UnauthorizedHttpResult,
            Created<Employee>>
    ([FromBody] Employee employee,
     HttpContext context) =>
{
    if (!context.Request.Headers.ContainsKey("Authorization"))
    {
        return TypedResults.Unauthorized();
    }

    EmployeesRepository.AddEmployee(employee);

    return TypedResults.Created(
        $"/employees/{employee.Id}",
        employee);
});
```

Теперь компилятор знает, что endpoint может вернуть **только**:

- `401 Unauthorized`;
- `201 Created`.

Если попытаться вернуть, например,

```csharp
TypedResults.NotFound();
```

код уже не скомпилируется.

---

# Итог

В одном endpoint можно возвращать разные HTTP-ответы, но все они должны иметь совместимый возвращаемый тип.

Обычно используют один из трёх подходов:

1. Только `Results` (`Results.Ok()`, `Results.NotFound()`, ...).
2. Только `TypedResults` (`TypedResults.Ok()`, `TypedResults.Created()`, ...). Это предпочтительный вариант в новых проектах.
3. Явно указать допустимые результаты через `Results<T1, T2, ...>` для максимальной типобезопасности.

Нельзя смешивать `IResult` с обычными типами (`string`, `int`, `Employee`), поскольку компилятор не сможет определить единый тип возвращаемого значения.
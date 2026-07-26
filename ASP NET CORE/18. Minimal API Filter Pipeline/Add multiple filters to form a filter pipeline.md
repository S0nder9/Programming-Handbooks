# Add Multiple Filters to Form a Filter Pipeline

К одному endpoint можно подключить **несколько Endpoint Filters**.

Они образуют **Filter Pipeline** — цепочку фильтров, через которую проходит запрос.

Каждый фильтр может:

- выполнить код **до** endpoint;
- передать управление следующему фильтру;
- выполнить код **после** endpoint;
- остановить выполнение цепочки.

---

# Пример

```csharp
app.MapPatch("/employees/{id}",
async (int id, Employee employee, IEmployeesRepository repository) =>
{
    var existingEmployee =
        await repository.GetEmployeeByIdAsync(id);

    if (existingEmployee is null)
        return Results.NotFound();

    existingEmployee.Name = employee.Name;
    existingEmployee.Position = employee.Position;
    existingEmployee.DepartmentId = employee.DepartmentId;

    await repository.UpdateEmployeeAsync(existingEmployee);

    return Results.NoContent();
})
.AddEndpointFilter(async (context, next) =>
{
    Console.WriteLine("Before A");

    var result = await next(context);

    Console.WriteLine("After A");

    return result;
})
.AddEndpointFilter(async (context, next) =>
{
    Console.WriteLine("Before B");

    var result = await next(context);

    Console.WriteLine("After B");

    return result;
})
.AddEndpointFilter(async (context, next) =>
{
    Console.WriteLine("Before C");

    var result = await next(context);

    Console.WriteLine("After C");

    return result;
});
```

---

# Порядок выполнения

При запросе произойдёт следующее:

```
Before A

Before B

Before C

Endpoint

After C

After B

After A
```

То есть:

1. выполняется первый фильтр;
2. затем второй;
3. затем третий;
4. затем endpoint;
5. после этого выполнение возвращается обратно в обратном порядке.

---

# Схема выполнения

```
HTTP Request
      │
      ▼
Filter A
  Before
      │
      ▼
Filter B
  Before
      │
      ▼
Filter C
  Before
      │
      ▼
Endpoint
      │
      ▼
Filter C
  After
      │
      ▼
Filter B
  After
      │
      ▼
Filter A
  After
      │
      ▼
HTTP Response
```

---

# Почему порядок именно такой?

Каждый фильтр вызывает

```csharp
await next(context);
```

Например:

```csharp
Console.WriteLine("Before A");

await next(context);

Console.WriteLine("After A");
```

Пока выполняется `next(context)`, управление передаётся следующему фильтру.

После завершения следующего фильтра выполнение возвращается обратно, и продолжается код после `await`.

Это полностью аналогично работе Middleware.

---

# Что будет, если убрать `next(context)`?

Например:

```csharp
.AddEndpointFilter(async (context, next) =>
{
    Console.WriteLine("Before B");

    return Results.BadRequest();
});
```

Тогда получится

```
Before A

Before B
```

и сразу

```
400 Bad Request
```

Не выполнятся:

- Filter C;
- Endpoint;
- `After B`;
- `After A`.

Такое поведение называется **коротким замыканием (Short Circuit)**.

---

# Можно ли изменить результат после endpoint?

Да.

Например:

```csharp
.AddEndpointFilter(async (context, next) =>
{
    var result = await next(context);

    Console.WriteLine("Completed");

    return Results.Ok(new
    {
        Message = "Modified"
    });
});
```

Фильтр может полностью заменить результат endpoint.

---

# Endpoint Filters и Middleware

Поведение очень похоже.

Middleware:

```
Before

await next()

After
```

Endpoint Filter:

```
Before

await next(context)

After
```

Главное отличие:

- **Middleware** работает для всех HTTP-запросов приложения.
- **Endpoint Filter** работает только для конкретного endpoint Minimal API и имеет доступ к его аргументам через `context.GetArgument<T>()`.

---

# Итог

Несколько вызовов

```csharp
.AddEndpointFilter(...)
```

формируют **Filter Pipeline**.

Фильтры выполняются по принципу вложенных вызовов:

```
Before A
    Before B
        Before C
            Endpoint
        After C
    After B
After A
```

Каждый фильтр вызывает следующий с помощью

```csharp
await next(context);
```

Если `next(context)` не вызвать, выполнение цепочки остановится, и endpoint не будет выполнен.
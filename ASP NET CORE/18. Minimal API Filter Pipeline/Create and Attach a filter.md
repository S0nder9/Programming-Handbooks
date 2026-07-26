# Create and Attach an Endpoint Filter

**Endpoint Filters** появились в .NET 7 и позволяют выполнять код **до** и **после** выполнения обработчика Minimal API.

Они являются аналогом **Action Filters** в MVC, но работают только с **Minimal API**.

Типичные задачи:

- проверка входных данных;
- авторизация;
- логирование;
- измерение времени выполнения;
- изменение результата;
- завершение запроса до вызова endpoint.

---

# Зачем нужен Endpoint Filter?

Рассмотрим PATCH-запрос.

```
PATCH /employees/5
```

Body:

```json
{
    "id": 8,
    "name": "John",
    "position": "Developer"
}
```

Получается несоответствие:

```
Route id = 5

Body id = 8
```

Такой запрос лучше отклонить ещё **до выполнения endpoint**.

Именно для подобных задач используются Endpoint Filters.

---

# Способ 1. Inline Filter

Фильтр можно написать прямо при регистрации endpoint.

```csharp
app.MapPatch("/employees/{id}", async (
    int id,
    Employee employee,
    IEmployeesRepository repository) =>
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
    var id = context.GetArgument<int>(0);
    var employee = context.GetArgument<Employee>(1);

    if (id != employee.Id)
    {
        return Results.ValidationProblem(
            new Dictionary<string, string[]>
            {
                {
                    "id",
                    new[]
                    {
                        "Employee id must match route id."
                    }
                }
            });
    }

    return await next(context);
});
```

---

# Что делает фильтр?

Получает параметры endpoint:

```csharp
var id =
    context.GetArgument<int>(0);

var employee =
    context.GetArgument<Employee>(1);
```

Затем сравнивает:

```csharp
id != employee.Id
```

Если значения отличаются,

возвращает

```csharp
Results.ValidationProblem(...)
```

Endpoint вообще не будет вызван.

Если всё хорошо:

```csharp
return await next(context);
```

выполняется следующий фильтр или сам endpoint.

---

# Способ 2. Отдельный класс

Чаще фильтры выносят в отдельный класс.

```csharp
namespace WebApp.Filters;

public class EmployeeUpdateFilter
    : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext context,
        EndpointFilterDelegate next)
    {
        var id = context.GetArgument<int>(0);
        var employee = context.GetArgument<Employee>(1);

        if (id != employee.Id)
        {
            return Results.ValidationProblem(
                new Dictionary<string, string[]>
                {
                    {
                        "id",
                        new[]
                        {
                            "Employee id must match route id."
                        }
                    }
                });
        }

        return await next(context);
    }
}
```

> **Важно:** в вашем коде отсутствовал вызов `next(context)` при успешной проверке. Если его не вызвать, выполнение endpoint остановится. Также метод должен быть `async`, чтобы можно было использовать `await`.

---

# Подключение фильтра

```csharp
app.MapPatch("/employees/{id}", ...)
   .AddEndpointFilter<EmployeeUpdateFilter>();
```

или

```csharp
.AddEndpointFilter(
    new EmployeeUpdateFilter());
```

---

# Что делает `next(context)`?

```csharp
return await next(context);
```

передаёт управление дальше.

Это аналог

```csharp
await next();
```

в Middleware.

Без него endpoint не выполнится.

---

# Порядок выполнения

```
HTTP Request
        │
        ▼
Endpoint Filter
        │
        ▼
Проверка id
        │
 ┌──────┴──────┐
 │             │
 ▼             ▼
Ошибка      next(context)
 │             │
 ▼             ▼
400      Endpoint
               │
               ▼
           HTTP Response
```

---

# Можно ли изменить результат?

Да.

Например

```csharp
var result =
    await next(context);

return Results.Ok(result);
```

или

```csharp
Console.WriteLine("Before");

var result =
    await next(context);

Console.WriteLine("After");

return result;
```

Фильтр может выполнять код как **до**, так и **после** endpoint.

---

# Endpoint Filter vs Middleware

| Endpoint Filter | Middleware |
|-----------------|------------|
| Работает только для Minimal API | Работает для всех HTTP-запросов |
| Имеет доступ к параметрам endpoint (`GetArgument<T>()`) | Не знает о параметрах endpoint |
| Выполняется непосредственно перед/после endpoint | Выполняется до маршрутизации или между middleware |
| Подходит для проверки аргументов, логирования, валидации | Подходит для CORS, аутентификации, глобальной обработки исключений и других общих задач |

---

# Итог

**Endpoint Filter** — это механизм Minimal API, позволяющий выполнить дополнительную логику до и после обработчика endpoint.

Фильтр может:

- проверить параметры endpoint;
- завершить запрос раньше времени;
- изменить результат;
- выполнить код после endpoint.

Для регистрации можно использовать:

```csharp
.AddEndpointFilter(...)
```

или

```csharp
.AddEndpointFilter<MyFilter>()
```

Если проверка прошла успешно, необходимо вызвать:

```csharp
return await next(context);
```

иначе выполнение endpoint не продолжится.
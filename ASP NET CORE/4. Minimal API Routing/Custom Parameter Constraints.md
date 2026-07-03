# Custom Route Constraints

Иногда нужно ограничить допустимые значения параметра маршрута.

Например, разрешить только:

```text
manager
developer
```

и не принимать:

```text
admin
tester
director
```

Для этого используются **Route Constraints**.

---

# Задача

Разрешить только такие URL:

```http
/employees/positions/manager

/employees/positions/developer
```

Запросы:

```http
/employees/positions/admin

/employees/positions/tester
```

должны возвращать:

```http
404 Not Found
```

---

# Регистрация ограничения

Сначала нужно зарегистрировать свой constraint:

```csharp
builder.Services.AddRouting(options =>
{
    options.ConstraintMap.Add(
        "position",
        typeof(PositionsConstraint)
    );
});
```

---

Здесь:

```csharp
"position"
```

— имя ограничения.

После регистрации его можно использовать в маршрутах:

```csharp
{position:position}
```

---

# Использование в маршруте

```csharp
endpoints.MapGet(
    "/employees/positions/{position:position}",
    async context =>
{
    await context.Response.WriteAsync(
        $"Employees List: " +
        $"{context.Request.RouteValues["position"]}"
    );
});
```

---

Синтаксис:

```csharp
{parameterName:constraintName}
```

---

Здесь:

```csharp
position
```

слева — параметр маршрута.

```csharp
position
```

справа — имя зарегистрированного constraint.

---

# Создание своего Constraint

Нужно реализовать интерфейс:

```csharp
IRouteConstraint
```

---

```csharp
public class PositionsConstraint
    : IRouteConstraint
{
    public bool Match(
        HttpContext? httpContext,
        IRouter? route,
        string routeKey,
        RouteValueDictionary values,
        RouteDirection routeDirection)
    {
        if (!values.TryGetValue(routeKey, out var value)
            || value is null)
        {
            return false;
        }

        var position = value.ToString();

        return
            string.Equals(
                position,
                "manager",
                StringComparison.OrdinalIgnoreCase)

            ||

            string.Equals(
                position,
                "developer",
                StringComparison.OrdinalIgnoreCase);
    }
}
```

---

# Что делает Match()

При запросе:

```http
/employees/positions/manager
```

ASP.NET Core вызывает:

```csharp
Match(...)
```

---

Получает:

```csharp
position = "manager"
```

---

Возвращается:

```csharp
true
```

Маршрут найден и endpoint выполняется.

---

Если запрос:

```http
/employees/positions/admin
```

---

Получает:

```csharp
position = "admin"
```

---

Возвращается:

```csharp
false
```

Маршрут считается неподходящим.

Результат:

```http
404 Not Found
```

---

# Как работает внутри

Запрос:

```http
/employees/positions/manager
```

↓

Routing

↓

```csharp
{position:position}
```

↓

```csharp
PositionsConstraint.Match()
```

↓

```csharp
true
```

↓

Endpoint найден

↓

```http
200 OK
```

---

Другой запрос:

```http
/employees/positions/admin
```

↓

Routing

↓

```csharp
PositionsConstraint.Match()
```

↓

```csharp
false
```

↓

Маршрут отклонён

↓

```http
404 Not Found
```

---

# Когда использовать

Custom Constraints полезны когда нужно проверять:

- должности;
- роли пользователей;
- коды стран;
- категории;
- форматы данных;
- бизнес-правила.

Например:

```text
manager
developer
designer
```

или

```text
ru
en
de
fr
```

---

# Встроенные Constraints

Часто писать свои ограничения не нужно.

ASP.NET Core уже содержит:

```csharp
{id:int}
```

Только целые числа.

---

```csharp
{id:guid}
```

Только GUID.

---

```csharp
{price:decimal}
```

Только decimal.

---

```csharp
{age:min(18)}
```

Возраст от 18.

---

```csharp
{age:range(18,65)}
```

Диапазон значений.

---

Пример:

```csharp
"/employees/{id:int}"
```

---

Работает:

```http
/employees/15
```

Не работает:

```http
/employees/abc
```

---

# Итог

Custom Route Constraint позволяет выполнять дополнительную проверку параметров маршрута ещё на этапе маршрутизации.

Схема:

```text
Request
    ↓
Routing
    ↓
Constraint
    ↓
true  → Endpoint
false → 404 Not Found
```

В твоём примере маршрут будет доступен только для:

```http
/employees/positions/manager

/employees/positions/developer
```

Все остальные значения автоматически получат:

```http
404 Not Found
```
без выполнения endpoint'а.
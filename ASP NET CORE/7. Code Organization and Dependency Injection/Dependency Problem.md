# Dependency Problem

Одной из главных проблем при разработке приложений является **жёсткая зависимость (tight coupling)** между классами.

Она возникает, когда один класс самостоятельно создаёт объекты, от которых зависит.

---

# Пример проблемы

Предположим, есть класс репозитория:

```csharp
public class EmployeeRepository
{
    public List<Employee> GetAll()
    {
        // Получение сотрудников
    }
}
```

И endpoint:

```csharp
app.MapGet("/employees", () =>
{
    var repository = new EmployeeRepository();

    return repository.GetAll();
});
```

Здесь endpoint **сам создаёт** объект репозитория.

---

# В чём проблема?

Endpoint теперь жёстко связан с конкретной реализацией:

```csharp
EmployeeRepository
```

Если позже потребуется:

- заменить базу данных;
- использовать другой репозиторий;
- написать тесты;

код придётся изменять.

---

# Пример

Сегодня:

```csharp
var repository = new EmployeeRepository();
```

Завтра:

```csharp
var repository = new SqlEmployeeRepository();
```

Послезавтра:

```csharp
var repository = new MongoEmployeeRepository();
```

Каждый раз приходится менять код endpoint.

---

# Ещё одна проблема — тестирование

Представим, что `EmployeeRepository` обращается к базе данных.

Во время тестов база данных может быть недоступна.

Хотелось бы использовать тестовую реализацию:

```csharp
FakeEmployeeRepository
```

Но endpoint создаёт объект самостоятельно:

```csharp
new EmployeeRepository()
```

Подменить его невозможно.

---

# Решение — инверсия зависимостей

Вместо создания объекта внутри класса, зависимость передаётся извне.

То есть вместо

```csharp
var repository = new EmployeeRepository();
```

используется

```csharp
(IEmployeeRepository repository)
```

ASP.NET Core сам создаёт объект и передаёт его в endpoint.

---

# Использование интерфейса

Создадим интерфейс:

```csharp
public interface IEmployeeRepository
{
    Task<List<Employee>> GetAllEmployeesAsync();
}
```

Реализация:

```csharp
public class EmployeeRepository : IEmployeeRepository
{
    public Task<List<Employee>> GetAllEmployeesAsync()
    {
        ...
    }
}
```

---

# Регистрация зависимости

```csharp
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
```

Теперь контейнер зависимостей знает:

> Если нужен `IEmployeeRepository`, создать `EmployeeRepository`.

---

# Использование в endpoint

```csharp
app.MapGet("/employees",
    async (IEmployeeRepository repository) =>
{
    return await repository.GetAllEmployeesAsync();
});
```

Endpoint больше ничего не создаёт самостоятельно.

---

# Что происходит внутри

```text
HTTP Request
        ↓
Endpoint
        ↓
Нужен IEmployeeRepository?
        ↓
DI Container
        ↓
Создание EmployeeRepository
        ↓
Передача в endpoint
```

---

# Преимущества

## Слабая связанность (Loose Coupling)

Endpoint зависит не от класса:

```csharp
EmployeeRepository
```

а от абстракции:

```csharp
IEmployeeRepository
```

---

## Лёгкая замена реализации

Можно заменить реализацию одной строкой:

```csharp
builder.Services.AddScoped<
    IEmployeeRepository,
    SqlEmployeeRepository>();
```

или

```csharp
builder.Services.AddScoped<
    IEmployeeRepository,
    MongoEmployeeRepository>();
```

Код endpoint при этом не изменится.

---

## Простое тестирование

Во время тестов можно зарегистрировать:

```csharp
builder.Services.AddScoped<
    IEmployeeRepository,
    FakeEmployeeRepository>();
```

Теперь endpoint будет работать с тестовыми данными, не обращаясь к реальной базе данных.

---

# Итог

**Dependency Problem** — это проблема жёсткой связанности классов, когда один класс самостоятельно создаёт свои зависимости через `new`.

Такой код сложно:

- расширять;
- тестировать;
- поддерживать;
- заменять реализации.

ASP.NET Core решает эту проблему с помощью **Dependency Injection (DI)**:

- зависимости описываются через интерфейсы;
- реализации регистрируются в контейнере (`builder.Services`);
- контейнер автоматически создаёт объекты и передаёт их туда, где они нужны.

Это делает приложение более гибким, модульным и удобным для сопровождения.


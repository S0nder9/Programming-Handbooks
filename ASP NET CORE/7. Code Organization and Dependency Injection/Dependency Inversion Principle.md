# Dependency Inversion Principle (DIP)

**Dependency Inversion Principle (DIP)** — это пятый принцип **SOLID**.

Он гласит:

> **Высокоуровневые модули не должны зависеть от низкоуровневых модулей. Оба должны зависеть от абстракций.**

Также:

> **Абстракции не должны зависеть от деталей. Детали должны зависеть от абстракций.**

---

# Что считается высокоуровневым модулем?

Это код, который содержит бизнес-логику приложения.

Например:

- Endpoints
- Controllers
- Services

В нашем случае:

```csharp
EmployeeEndpoints
```

---

# Что считается низкоуровневым модулем?

Это код, который работает с внешними ресурсами.

Например:

- база данных;
- файловая система;
- HTTP-клиенты;
- репозитории.

В нашем случае:

```csharp
EmployeeRepository
```

---

# Неправильный вариант

```csharp
app.MapGet("/employees", async () =>
{
    var repository = new EmployeeRepository();

    return await repository.GetAllEmployeesAsync();
});
```

Получается зависимость:

```
EmployeeEndpoints
        │
        ▼
EmployeeRepository
```

Endpoint знает о конкретной реализации репозитория.

Если репозиторий изменится, придётся изменять и endpoint.

---

# Правильный вариант

Создаём интерфейс:

```csharp
public interface IEmployeesRepository
{
    Task<List<Employee>> GetAllEmployeesAsync();
}
```

Реализация:

```csharp
public class EmployeeRepository : IEmployeesRepository
{
    ...
}
```

Регистрация в DI:

```csharp
builder.Services.AddScoped<IEmployeesRepository, EmployeeRepository>();
```

Использование:

```csharp
app.MapGet("/employees",
    async (IEmployeesRepository repository) =>
{
    return await repository.GetAllEmployeesAsync();
});
```

Теперь зависимость выглядит так:

```
EmployeeEndpoints
        │
        ▼
IEmployeesRepository
        ▲
        │
EmployeeRepository
```

Endpoint больше не знает, какая именно реализация используется.

---

# Что происходит при запуске

Когда приходит HTTP-запрос:

```
GET /employees
```

ASP.NET Core:

1. Видит, что endpoint принимает

```csharp
IEmployeesRepository
```

2. Проверяет контейнер зависимостей.

3. Находит регистрацию

```csharp
builder.Services.AddScoped<
    IEmployeesRepository,
    EmployeeRepository>();
```

4. Создаёт объект

```csharp
EmployeeRepository
```

5. Передаёт его в endpoint.

Endpoint вообще не знает, какой объект был создан.

---

# Преимущества DIP

## 1. Слабая связанность (Loose Coupling)

Endpoint зависит только от интерфейса:

```csharp
IEmployeesRepository
```

а не от конкретного класса.

---

## 2. Лёгкая замена реализации

Сегодня:

```csharp
EmployeeRepository
```

Завтра:

```csharp
SqlEmployeeRepository
```

или

```csharp
MongoEmployeeRepository
```

Достаточно изменить регистрацию:

```csharp
builder.Services.AddScoped<
    IEmployeesRepository,
    MongoEmployeeRepository>();
```

Endpoint останется без изменений.

---

## 3. Простое тестирование

Во время тестов можно зарегистрировать:

```csharp
builder.Services.AddScoped<
    IEmployeesRepository,
    FakeEmployeesRepository>();
```

Теперь endpoint будет работать с тестовыми данными без подключения к реальной базе.

---

## 4. Соответствие SOLID

Использование интерфейсов делает код более:

- расширяемым;
- поддерживаемым;
- независимым от реализации.

---

# Ошибка в приведённом коде

В методе `MapPost` используется статический вызов:

```csharp
var createdEmployee = await EmployeeRepository.AddEmployeeAsync(employee);
```

Это нарушает принцип DIP, потому что endpoint снова зависит от конкретного класса `EmployeeRepository`.

Правильно использовать внедрённую зависимость:

```csharp
app.MapPost("/employees",
    async (Employee employee, IEmployeesRepository employeesRepository) =>
{
    var createdEmployee =
        await employeesRepository.AddEmployeeAsync(employee);

    return Results.Created(
        $"/employees/{createdEmployee.Id}",
        createdEmployee);
});
```

Теперь все методы используют только интерфейс `IEmployeesRepository`.

---

# Итог

**Dependency Inversion Principle (DIP)** требует, чтобы высокоуровневые компоненты (например, endpoints) зависели не от конкретных классов, а от абстракций (интерфейсов).

В ASP.NET Core этот принцип реализуется через **Dependency Injection (DI)**:

- создаётся интерфейс (`IEmployeesRepository`);
- класс (`EmployeeRepository`) реализует этот интерфейс;
- реализация регистрируется в контейнере зависимостей;
- ASP.NET Core автоматически внедряет нужную реализацию в endpoint.

Такой подход делает код гибким, легко тестируемым и позволяет менять реализации без изменения бизнес-логики.
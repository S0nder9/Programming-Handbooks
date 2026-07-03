# Inversion of Control (IoC)

**Inversion of Control (IoC)** — это принцип проектирования, при котором создание объектов и управление их жизненным циклом передаётся внешнему компоненту, а не выполняется самим классом.

В ASP.NET Core этим внешним компонентом является **контейнер Dependency Injection (DI Container)**.

---

# Без IoC

Представим endpoint:

```csharp
app.MapGet("/employees", async () =>
{
    var employeesRepository = new EmployeesRepository();

    var employees = await employeesRepository.GetAllEmployees();

    return Results.Ok(employees);
});
```

Здесь endpoint самостоятельно:

- создаёт объект;
- управляет временем его жизни;
- знает конкретную реализацию.

Получается:

```
Endpoint
    │
 new EmployeesRepository()
```

Контроль над созданием объекта находится внутри endpoint.

---

# С IoC

Сначала регистрируем сервис:

```csharp
builder.Services.AddTransient<
    IEmployeesRepository,
    EmployeesRepository>();
```

Затем просто объявляем зависимость:

```csharp
app.MapGet("/employees",
    async (IEmployeesRepository employeesRepository) =>
{
    var employees =
        await employeesRepository.GetAllEmployees();

    return Results.Ok(employees);
});
```

Теперь endpoint ничего не создаёт.

Контейнер DI сам:

- создаёт объект;
- выбирает реализацию;
- передаёт её в endpoint.

---

# Что происходит внутри

При запуске приложения:

```csharp
builder.Services.AddTransient<
    IEmployeesRepository,
    EmployeesRepository>();
```

контейнер запоминает правило:

```
Если нужен IEmployeesRepository,
создать EmployeesRepository.
```

Когда приходит запрос:

```
GET /employees
```

ASP.NET Core выполняет следующие действия:

1. Находит endpoint.
2. Видит параметр:

```csharp
IEmployeesRepository employeesRepository
```

3. Проверяет контейнер зависимостей.
4. Создаёт объект `EmployeesRepository`.
5. Передаёт его в endpoint.

Схематично это выглядит так:

```
HTTP Request
      │
      ▼
 ASP.NET Core
      │
      ▼
 DI Container
      │
Создаёт EmployeesRepository
      │
      ▼
 Endpoint
```

---

# Почему это называется Inversion of Control?

Без IoC:

```
Endpoint
    │
    └──► new EmployeesRepository()
```

Endpoint сам контролирует создание объектов.

С IoC:

```
Endpoint
      ▲
      │
DI Container
      │
Создаёт объект
```

Контроль создания объектов "инвертируется" (передаётся наружу).

Именно поэтому принцип называется **Inversion of Control** — "инверсия управления".

---

# Связь IoC и Dependency Injection

Эти понятия часто путают.

**IoC** — это общий принцип:

> Не класс управляет своими зависимостями, а внешний компонент.

**Dependency Injection (DI)** — один из способов реализовать IoC.

Другие способы реализации IoC:

- Service Locator;
- Factory Pattern;
- события (Events);
- плагины;
- конфигурационные контейнеры.

В ASP.NET Core используется именно **Dependency Injection**.

---

# Итог

**Inversion of Control (IoC)** — это принцип, при котором управление созданием и жизненным циклом объектов передаётся внешнему компоненту.

В ASP.NET Core этим компонентом является **DI-контейнер**. Вы регистрируете зависимости:

```csharp
builder.Services.AddTransient<IEmployeesRepository, EmployeesRepository>();
```

а затем просто используете их:

```csharp
app.MapGet("/employees",
    async (IEmployeesRepository employeesRepository) =>
{
    ...
});
```

Endpoint больше не создаёт объекты самостоятельно — этим занимается инфраструктура приложения. Это уменьшает связанность кода, упрощает тестирование и позволяет легко менять реализации без изменения бизнес-логики.
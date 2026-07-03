# Organize Minimal API Endpoints

Когда Minimal API начинает расти, все `MapGet / MapPost / MapPut / MapDelete` быстро превращаются в один большой `Program.cs`.

Чтобы избежать этого, используют **разделение эндпоинтов на модули (endpoint extensions)**.

---

# Идея

Вместо:

```csharp
var app = builder.Build();

app.MapGet("/employees", ...);
app.MapPost("/employees", ...);
app.MapPut("/employees/{id}", ...);
app.MapDelete("/employees/{id}", ...);
```

мы выносим всю логику в отдельный класс:

```csharp
app.MapEmployeeEndpoints();
```

---

# Реализация

## 1. Extension-класс

```csharp
using WebApp.DATA;

namespace WebApp.Endpoints
{
    public static class EmployeeEndpoints
    {
        public static void MapEmployeeEndpoints(this WebApplication app)
        {
            app.MapGet("/employees", async (IEmployeeRepository repository) =>
            {
                var employees = await repository.GetAllEmployeesAsync();
                return Results.Ok(employees);
            });

            app.MapGet("/employees/{id:int}", async (int id, IEmployeeRepository repository) =>
            {
                var employee = await repository.GetEmployeeByIdAsync(id);
                return employee is not null
                    ? Results.Ok(employee)
                    : Results.NotFound();
            });

            app.MapPost("/employees", async (Employee employee, IEmployeeRepository repository) =>
            {
                var createdEmployee = await repository.AddEmployeeAsync(employee);
                return Results.Created(
                    $"/employees/{createdEmployee.Id}",
                    createdEmployee);
            });

            app.MapPut("/employees/{id:int}", async (int id, Employee updatedEmployee, IEmployeeRepository repository) =>
            {
                var existingEmployee = await repository.GetEmployeeByIdAsync(id);

                if (existingEmployee is null)
                {
                    return Results.NotFound();
                }

                updatedEmployee.Id = id;
                await repository.UpdateEmployeeAsync(updatedEmployee);

                return Results.NoContent();
            });

            app.MapDelete("/employees/{id:int}", async (int id, IEmployeeRepository repository) =>
            {
                var existingEmployee = await repository.GetEmployeeByIdAsync(id);

                if (existingEmployee is null)
                {
                    return Results.NotFound();
                }

                await repository.DeleteEmployeeAsync(id);

                return Results.NoContent();
            });
        }
    }
}
```

---

## 2. Использование в `Program.cs`

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();

var app = builder.Build();

app.MapEmployeeEndpoints();

app.Run();
```

---

# Что изменилось

## Было

- всё в `Program.cs`
- быстро растущий "монолит"
- сложно поддерживать

---

## Стало

- каждый домен → отдельный файл
- легче читать
- легче тестировать
- проще масштабировать

---

# Почему это работает

Метод:

```csharp
public static void MapEmployeeEndpoints(this WebApplication app)
```

— это **extension method**.

Он позволяет "добавить" новые методы к `WebApplication`, не меняя его код.

---

# Архитектурная идея

Это первый шаг к структуре:

```
/Endpoints
    EmployeeEndpoints.cs
    AuthEndpoints.cs
    ProductEndpoints.cs
```

---

# Плюсы подхода

## 1. Чистый Program.cs

```csharp
app.MapEmployeeEndpoints();
app.MapAuthEndpoints();
```

---

## 2. Разделение ответственности

Каждый модуль отвечает только за свои endpoints.

---

## 3. Масштабируемость

Можно добавлять новые модули без изменения старого кода.

---

## 4. Удобство DI

Репозитории и сервисы автоматически внедряются:

```csharp
(IEmployeeRepository repository)
```

---

# Итог

Организация Minimal API через extension methods:

- убирает "разрастание" Program.cs
- делает код модульным
- упрощает поддержку
- приближает архитектуру к полноценному Web API слою

Самый популярный паттерн для реальных проектов Minimal API.
```
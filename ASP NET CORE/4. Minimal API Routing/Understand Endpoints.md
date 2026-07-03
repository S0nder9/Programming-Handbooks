# Understand Endpoints

## Что такое Routing?

**Routing (маршрутизация)** — механизм ASP.NET Core, который сопоставляет URL и HTTP-метод с обработчиком запроса.

Например:

```http
GET /employees
```

должен вызвать один обработчик, а

```http
POST /employees
```

— другой.

---

## Что такое Endpoint?

**Endpoint** — конечная точка приложения, которая:

1. получает запрос;
2. выполняет нужную логику;
3. формирует и возвращает ответ.

Схема:

```text
Request
    ↓
Routing
    ↓
Endpoint
    ↓
Response
```

---

## Способы создания Endpoint в ASP.NET Core

### 1. MVC

Контроллеры и действия:

```csharp
public class EmployeesController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
```

Используется в больших приложениях.

---

### 2. Razor Pages

Каждая страница имеет свой обработчик:

```csharp
public class EmployeesModel : PageModel
{
    public void OnGet()
    {
    }
}
```

Удобно для сайтов с большим количеством страниц.

---

### 3. Minimal API

Endpoint создается прямо в `Program.cs`.

```csharp
app.MapGet("/", () => "Hello World");
```

Часто используется для небольших API.

---

# Endpoint Routing

В ASP.NET Core маршрутизация работает через middleware.

Обычно используется:

```csharp
app.UseRouting();

app.UseEndpoints(endpoints =>
{
    ...
});
```

---

## Пример

```csharp
app.UseEndpoints(endpoints =>
{
    endpoints.MapGet("/employees",
        async context =>
        {
            await context.Response.WriteAsync(
                "<h1>Employees List</h1>");
        });
});
```

Запрос:

```http
GET /employees
```

Ответ:

```html
<h1>Employees List</h1>
```

---

# Разные методы для одного URL

Один и тот же URL может обрабатываться по-разному в зависимости от HTTP-метода.

---

## GET

Получение данных.

```csharp
endpoints.MapGet("/employees",
    async context =>
    {
        await context.Response.WriteAsync(
            "<h1>Employees List</h1>");
    });
```

Запрос:

```http
GET /employees
```

---

## POST

Создание нового ресурса.

```csharp
endpoints.MapPost("/employees",
    async context =>
    {
        await context.Response.WriteAsync(
            "<h1>Create Employee</h1>");
    });
```

Запрос:

```http
POST /employees
```

---

## PUT

Обновление существующего ресурса.

```csharp
endpoints.MapPut("/employees",
    async context =>
    {
        await context.Response.WriteAsync(
            "<h1>Update Employee</h1>");
    });
```

Запрос:

```http
PUT /employees
```

---

## DELETE

Удаление ресурса.

```csharp
endpoints.MapDelete("/employees",
    async context =>
    {
        await context.Response.WriteAsync(
            "<h1>Delete Employee</h1>");
    });
```

Запрос:

```http
DELETE /employees
```

---

# Как работает запрос

Предположим пришел запрос:

```http
POST /employees
```

Pipeline:

```text
Request
    ↓
UseRouting()
    ↓
Поиск подходящего endpoint
    ↓
MapPost("/employees")
    ↓
Выполнение обработчика
    ↓
Response
```

Ответ:

```html
<h1>Create Employee</h1>
```

---

# Современный подход (.NET 6+)

Вместо:

```csharp
app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapGet(...);
});
```

обычно пишут так:

```csharp
app.MapGet("/employees", async context =>
{
    await context.Response.WriteAsync(
        "<h1>Employees List</h1>");
});

app.MapPost("/employees", async context =>
{
    await context.Response.WriteAsync(
        "<h1>Create Employee</h1>");
});

app.MapPut("/employees", async context =>
{
    await context.Response.WriteAsync(
        "<h1>Update Employee</h1>");
});

app.MapDelete("/employees", async context =>
{
    await context.Response.WriteAsync(
        "<h1>Delete Employee</h1>");
});
```

ASP.NET Core автоматически добавляет необходимые middleware маршрутизации.

---

# Итог

```text
Routing
    ↓
Находит подходящий Endpoint
    ↓
Endpoint выполняет логику
    ↓
Возвращается Response
```

Для URL:

GET /employees      → получение сотрудников  
POST /employees     → создание сотрудника  
PUT /employees      → обновление сотрудника  
DELETE /employees   → удаление сотрудника

Это и есть основа построения REST API в ASP.NET Core.
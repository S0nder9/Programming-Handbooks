## HTTP Method GET

Метод **GET** используется для получения данных с сервера.

Особенности:

- не изменяет данные на сервере;
- параметры обычно передаются через URL;
- может кэшироваться браузером;
- не имеет тела запроса (`Body`) в большинстве случаев.

Пример запроса:

```http
GET /employees HTTP/1.1
Host: localhost:5000
```

---

## Обработка GET-запроса

В ASP.NET Core можно проверить метод запроса через:

```csharp
context.Request.Method
```

Например:

```csharp
if (context.Request.Method == "GET")
{
    // обработка GET-запроса
}
```

---

## Обработка разных URL

В примере используется:

```csharp
context.Request.Path.StartsWithSegments(...)
```

для определения маршрута запроса.

---

### Главная страница

```csharp
if (context.Request.Path.StartsWithSegments("/"))
{
    ...
}
```

При переходе:

```text
https://localhost:5000/
```

выводится информация о запросе:

- метод;
- путь;
- заголовки.

---

### Страница сотрудников

```csharp
else if (context.Request.Path.StartsWithSegments("/employees"))
{
    ...
}
```

При переходе:

```text
https://localhost:5000/employees
```

получаем список сотрудников.

---

## Получение данных из репозитория

```csharp
var employees = EmployeesRepository.GetEmployees();
```

Метод возвращает список:

```csharp
List<Employee>
```

---

### Вывод сотрудников

```csharp
foreach (var employee in employees)
{
    await context.Response.WriteAsync(
        $"{employee.Name}: {employee.Position}\r\n"
    );
}
```

Результат:

```text
SD: qd
SD: qd
SD: qd
```

---

## Репозиторий данных

В примере используется простой статический репозиторий:

```csharp
static class EmployeesRepository
{
    private static List<Employee> employees =
        new List<Employee>();
}
```

Обычно в реальных проектах вместо этого используются:

- базы данных;
- Entity Framework Core;
- внешние API.

---

## Модель Employee

```csharp
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Position { get; set; }
    public double Salary { get; set; }
}
```

Это обычный класс-модель, который хранит данные сотрудника.

---

## Что происходит при запросе?

Запрос:

```http
GET /employees HTTP/1.1
```

↓

ASP.NET Core создаёт:

```csharp
HttpContext
```

↓

Код проверяет:

```csharp
context.Request.Method == "GET"
```

↓

Код проверяет путь:

```csharp
/employees
```

↓

Получает список сотрудников:

```csharp
EmployeesRepository.GetEmployees()
```

↓

Формирует ответ:

```text
SD: qd
SD: qd
SD: qd
```

↓

Отправляет его клиенту.

---


## Кратко

**GET** — HTTP-метод для получения данных.

```csharp
if (context.Request.Method == "GET")
{
    ...
}
```

Путь запроса:

```csharp
context.Request.Path
```

Получение данных:

```csharp
var employees = EmployeesRepository.GetEmployees();
```

Отправка ответа:

```csharp
await context.Response.WriteAsync(...);
```

В современных ASP.NET Core приложениях вместо проверки `Path` вручную обычно используют:

```csharp
app.MapGet(...)
```
для создания маршрутов.
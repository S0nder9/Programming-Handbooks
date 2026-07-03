## HTTP Method PUT

Метод **PUT** используется для обновления существующего ресурса на сервере.

Особенности:

- обновляет уже существующие данные;
- обычно требует идентификатор объекта (`Id`);
- передаёт новую версию объекта в теле запроса (`Body`);
- если ресурс найден — обновляет его;
- если ресурс не найден — возвращает ошибку или сообщение об отсутствии данных.

---

## Пример HTTP-запроса

```http
PUT /employees HTTP/1.1
Content-Type: application/json

{
    "id": 2,
    "name": "John",
    "position": "Senior Developer",
    "salary": 8000
}
```

---

## Обработка PUT-запроса

Проверяем метод:

```csharp
if (context.Request.Method == "PUT")
{
    ...
}
```

---

Проверяем маршрут:

```csharp
if (context.Request.Path.StartsWithSegments("/employees"))
{
    ...
}
```

---

## Чтение тела запроса

Получаем JSON из `Body`:

```csharp
using var reader =
    new StreamReader(context.Request.Body);

var body = await reader.ReadToEndAsync();
```

Например:

```json
{
    "id": 2,
    "name": "John",
    "position": "Senior Developer",
    "salary": 8000
}
```

---

## Десериализация

Преобразуем JSON в объект:

```csharp
var employee =
    JsonSerializer.Deserialize<Employee>(body);
```

Получаем объект:

```csharp
Employee
```

---

## Обновление сотрудника

```csharp
var result =
    EmployeesRepository.UpdateEmployee(employee);
```

---

### Поиск сотрудника

В репозитории:

```csharp
var emp =
    employees.FirstOrDefault(
        x => x.Id == employee.Id
    );
```

Поиск происходит по `Id`.

---

### Если сотрудник найден

```csharp
emp.Name = employee.Name;
emp.Position = employee.Position;
emp.Salary = employee.Salary;
```

Данные обновляются.

---

### Возвращаем успех

```csharp
return true;
```

---

### Если сотрудник не найден

```csharp
return false;
```

---

## Формирование ответа

Успешное обновление:

```csharp
await context.Response.WriteAsync(
    "Update successfully"
);
```

Ответ:

```text
Update successfully
```

---

Если сотрудник отсутствует:

```csharp
await context.Response.WriteAsync(
    "Not found"
);
```

Ответ:

```text
Not found
```

---

## Что происходит пошагово?

Клиент отправляет:

```http
PUT /employees
```

↓

Сервер читает JSON:

```json
{
    "id": 2,
    "name": "John"
}
```

↓

Преобразует его в:

```csharp
Employee
```

↓

Ищет сотрудника:

```csharp
employees.FirstOrDefault(...)
```

↓

Если найден:

```csharp
обновляет данные
```

↓

Возвращает:

```text
Update successfully
```

---

## Репозиторий

```csharp
public static bool UpdateEmployee(Employee? employee)
{
    if (employee is not null)
    {
        var emp =
            employees.FirstOrDefault(
                x => x.Id == employee.Id
            );

        if (emp is not null)
        {
            emp.Name = employee.Name;
            emp.Position = employee.Position;
            emp.Salary = employee.Salary;

            return true;
        }
    }

    return false;
}
```

---

## PUT vs POST

### POST

Создаёт новый объект.

```http
POST /employees
```

```json
{
    "id": 4,
    "name": "John"
}
```

Результат:

```text
Новый сотрудник добавлен
```

---

### PUT

Обновляет существующий объект.

```http
PUT /employees
```

```json
{
    "id": 4,
    "name": "John Updated"
}
```

Результат:

```text
Данные сотрудника обновлены
```

---

## Что можно улучшить?

Вместо текстовых сообщений обычно используют HTTP-коды:

```csharp
context.Response.StatusCode = 200;
```

Успешное обновление.

---

```csharp
context.Response.StatusCode = 404;
```

Сотрудник не найден.

---

```csharp
context.Response.StatusCode = 400;
```

Некорректные данные.

---

## Кратко

**PUT** используется для обновления существующих данных.

Основной алгоритм:

```text
1. Получить JSON из Body
2. Преобразовать в объект
3. Найти запись по Id
4. Обновить поля
5. Вернуть результат
```

Ключевой код:

```csharp
var employee =
    JsonSerializer.Deserialize<Employee>(body);
```

```csharp
var emp =
    employees.FirstOrDefault(
        x => x.Id == employee.Id
    );
```

```csharp
emp.Name = employee.Name;
```

Таким образом PUT позволяет полностью обновить существующий ресурс на сервере.
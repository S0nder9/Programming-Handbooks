## HTTP Method DELETE

Метод **DELETE** используется для удаления существующего ресурса на сервере.

Особенности:

- удаляет данные;
- обычно принимает идентификатор объекта (`Id`);
- после удаления ресурс больше недоступен;
- если объект не найден — возвращается ошибка или сообщение.

---

## Пример HTTP-запроса

Удаление сотрудника с Id = 2:

```http
DELETE /employees?id=2 HTTP/1.1
Host: localhost:5000
```

Здесь идентификатор передается через **Query String**:

```text
?id=2
```

---

## Обработка DELETE-запроса

Проверяем метод:

```csharp
if (context.Request.Method == "DELETE")
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

## Получение Id из Query String

Проверяем наличие параметра:

```csharp
if (context.Request.Query.ContainsKey("id"))
{
    ...
}
```

Получаем значение:

```csharp
var id = context.Request.Query["id"];
```

Для запроса:

```text
/employees?id=2
```

получим:

```text
id = "2"
```

---

## Преобразование строки в число

Все параметры Query String приходят как строки.

Поэтому используем:

```csharp
if (int.TryParse(id, out int employeeId))
{
    ...
}
```

После выполнения:

```csharp
employeeId = 2
```

---

## Удаление сотрудника

Вызываем метод репозитория:

```csharp
var result =
    EmployeesRepository.DeleteEmployee(employeeId);
```

---

### Поиск сотрудника

```csharp
var emp =
    employees.FirstOrDefault(x => x.Id == id);
```

Если сотрудник найден:

```csharp
employees.Remove(emp);
```

Удаляем его из списка.

---

### Возвращаем результат

```csharp
return true;
```

Если удаление прошло успешно.

---

Если сотрудник не найден:

```csharp
return false;
```

---

## Формирование ответа

Если сотрудник удален:

```csharp
await context.Response.WriteAsync(
    "Deleted successfully"
);
```

Ответ:

```text
Deleted successfully
```

---

Если сотрудник не найден:

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

## Полный алгоритм

Запрос:

```http
DELETE /employees?id=2
```

↓

Получаем параметр:

```csharp
context.Request.Query["id"]
```

↓

Преобразуем:

```csharp
int.TryParse(...)
```

↓

Ищем сотрудника:

```csharp
employees.FirstOrDefault(...)
```

↓

Удаляем:

```csharp
employees.Remove(...)
```

↓

Возвращаем результат клиенту.

---

## Метод DeleteEmployee

```csharp
public static bool DeleteEmployee(int id)
{
    var emp =
        employees.FirstOrDefault(
            x => x.Id == id
        );

    if (emp is not null)
    {
        employees.Remove(emp);
        return true;
    }

    return false;
}
```

---

## DELETE vs PUT vs POST

### POST

Создать ресурс.

```http
POST /employees
```

Результат:

```text
Новый сотрудник добавлен
```

---

### PUT

Обновить ресурс.

```http
PUT /employees
```

Результат:

```text
Данные сотрудника обновлены
```

---

### DELETE

Удалить ресурс.

```http
DELETE /employees?id=2
```

Результат:

```text
Сотрудник удален
```

---

## Как обычно делают в REST API

Вместо Query String чаще используют параметр маршрута:

```http
DELETE /employees/2
```

Тогда Id берется из URL:

```text
/employees/{id}
```

В ASP.NET Core:

```csharp
app.MapDelete(
    "/employees/{id}",
    (int id) =>
{
    ...
});
```

---

## Кратко

**DELETE** — HTTP-метод для удаления данных.

Пример:

```http
DELETE /employees?id=2
```

Получение Id:

```csharp
context.Request.Query["id"]
```

Удаление:

```csharp
employees.Remove(emp);
```

Основной алгоритм:

```text
1. Получить Id
2. Найти объект
3. Удалить объект
4. Вернуть результат
```

В REST API обычно используется:

```http
DELETE /employees/2
```

вместо

```http
DELETE /employees?id=2
```
для более чистого и понятного URL.
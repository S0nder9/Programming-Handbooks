## HTTP Method POST

Метод **POST** используется для отправки данных на сервер.

Чаще всего применяется для:

- создания новых записей;
- отправки форм;
- регистрации пользователей;
- загрузки данных в API.

В отличие от `GET`, данные обычно передаются в теле запроса (**Body**).

---

## Пример HTTP-запроса

```http
POST /employees HTTP/1.1
Content-Type: application/json

{
    "id": 4,
    "name": "John",
    "position": "Developer",
    "salary": 5000
}
```

---

## Проверка метода

В ASP.NET Core метод запроса можно проверить через:

```csharp
context.Request.Method
```

```csharp
if (context.Request.Method == "POST")
{
    ...
}
```

---

## Проверка маршрута

```csharp
if (context.Request.Path.StartsWithSegments("/employees"))
{
    ...
}
```

Запрос будет обработан для:

```text
POST /employees
```

---

## Чтение тела запроса

Тело запроса находится в:

```csharp
context.Request.Body
```

Это поток (`Stream`), поэтому его нужно прочитать:

```csharp
using var reader =
    new StreamReader(context.Request.Body);

var body = await reader.ReadToEndAsync();
```

После выполнения:

```csharp
body
```

будет содержать строку:

```json
{
    "id": 4,
    "name": "John",
    "position": "Developer",
    "salary": 5000
}
```

---

## Десериализация JSON

Полученную строку можно преобразовать в объект:

```csharp
var employee =
    JsonSerializer.Deserialize<Employee>(body);
```

---

Было:

```json
{
    "id": 4,
    "name": "John"
}
```

Стало:

```csharp
Employee employee
```

---

## Добавление сотрудника

```csharp
EmployeesRepository.AddEmployee(employee);
```

Метод:

```csharp
public static void AddEmployee(Employee? employee)
{
    if (employee is not null)
        employees.Add(employee);
}
```

Добавляет сотрудника в список.

---

## Полный процесс

Клиент отправляет:

```http
POST /employees
```

с JSON:

```json
{
    "id": 4,
    "name": "John",
    "position": "Developer",
    "salary": 5000
}
```

↓

ASP.NET Core получает запрос

↓

Читает:

```csharp
context.Request.Body
```

↓

Преобразует JSON в объект:

```csharp
Employee
```

↓

Вызывает:

```csharp
EmployeesRepository.AddEmployee(...)
```

↓

Сотрудник сохраняется в коллекции.

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

При десериализации значения из JSON автоматически записываются в свойства объекта.

---

## Более короткий вариант

В ASP.NET Core есть встроенная десериализация:

```csharp
var employee =
    await context.Request.ReadFromJsonAsync<Employee>();
```

Тогда не нужно создавать `StreamReader`.

---

## Кратко

**POST** используется для отправки данных на сервер.

Порядок работы:

```text
1. Получить Body
2. Прочитать JSON
3. Преобразовать в объект
4. Сохранить данные
5. Отправить ответ
```

Основные строки:

```csharp
var body =
    await reader.ReadToEndAsync();
```

Чтение тела запроса.

```csharp
JsonSerializer.Deserialize<Employee>(body);
```

Преобразование JSON в объект.

```csharp
EmployeesRepository.AddEmployee(employee);
```

Сохранение данных.
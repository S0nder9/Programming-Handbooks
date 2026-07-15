# Missing Binding Source

Иногда ASP.NET Core не находит данные для параметра метода. В этом случае результат зависит от **типа параметра**.

---

# 1. Nullable reference type

```csharp
[HttpPost]
public object Create(Department? department)
{
    return department ?? new Department();
}
```

Если клиент не отправил данные или Model Binder не смог создать объект, то

```csharp
department == null
```

Поэтому оператор

```csharp
??
```

вернёт новый объект:

```csharp
new Department()
```

---

# 2. Non-nullable reference type

```csharp
public object Create(Department department)
{
    ...
}
```

Если ASP.NET Core не сможет создать объект, то поведение зависит от:

- версии ASP.NET Core;
- наличия `[ApiController]`;
- источника данных (`[FromBody]`, `[FromForm]` и т.д.).

В API с `[ApiController]` обычно будет автоматически возвращён ответ **400 Bad Request**, если обязательные данные отсутствуют или привязка не удалась.

---

# 3. Value Types

Типы значений никогда не бывают `null`.

Например:

```csharp
int
double
bool
DateTime
Guid
```

Если значение отсутствует, используется значение по умолчанию.

---

## Пример

```csharp
[Route("/departments/{id?}")]
public string Details(int id)
{
    return $"Department {id}";
}
```

Запрос:

```
GET /departments
```

Поскольку параметр маршрута необязательный (`{id?}`), но метод принимает обычный `int`, ASP.NET Core подставит значение по умолчанию:

```csharp
id = 0
```

Результат:

```
Department 0
```

Это происходит потому, что

```
default(int) == 0
```

---

# Значения по умолчанию

| Тип | Значение по умолчанию |
|------|----------------------:|
| int | 0 |
| double | 0 |
| bool | false |
| char | '\0' |
| DateTime | DateTime.MinValue |
| Guid | Guid.Empty |

---

# Как получить `null` вместо `0`

Используйте nullable-тип:

```csharp
public string Details(int? id)
{
    if (id is null)
        return "Id is missing";

    return $"Department {id}";
}
```

Теперь запрос

```
GET /departments
```

даст:

```csharp
id == null
```

а запрос

```
GET /departments/15
```

даст:

```csharp
id == 15
```

---

# Сравнение

## Value Type

```csharp
public IActionResult Get(int id)
```

Нет значения →

```csharp
id == 0
```

---

## Nullable Value Type

```csharp
public IActionResult Get(int? id)
```

Нет значения →

```csharp
id == null
```

---

## Reference Type

```csharp
public IActionResult Post(Department? department)
```

Нет данных →

```csharp
department == null
```

---

# Итог

Если ASP.NET Core не может привязать данные:

- **ссылочный тип (`Department?`)** → получает `null`;
- **тип значения (`int`, `double`, `bool` и т.д.)** → получает значение по умолчанию (`0`, `false`, и т.п.);
- **nullable-тип (`int?`, `double?` и т.д.)** → получает `null`.

Поэтому в примере

```csharp
[Route("/departments/{id?}")]
public string Details(int id)
{
    return $"Department {id}";
}
```

при запросе без `id` выводится:

```
Department 0
```

поскольку `int` не может быть `null`, и ASP.NET Core использует значение `default(int)`, равное `0`.
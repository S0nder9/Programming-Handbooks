# Binding to Form Fields

При отправке HTML-форм браузер помещает данные в **тело HTTP-запроса (Request Body)**. ASP.NET Core может автоматически связать эти данные с параметрами метода или моделью.

---

# Основные форматы отправки форм

## 1. `application/x-www-form-urlencoded`

Это стандартный формат HTML-форм.

Пример формы:

```html
<form method="post">
    <input name="id" value="900" />
    <input name="name" value="Frank" />
</form>
```

После отправки тело запроса будет выглядеть так:

```
id=900&name=Frank
```

HTTP-заголовок:

```
Content-Type: application/x-www-form-urlencoded
```

В Postman:

```
Body
    x-www-form-urlencoded

id      900
name    Frank
```

---

## 2. `multipart/form-data`

Используется, когда необходимо передавать:

- файлы;
- изображения;
- документы;
- большие формы.

Каждое поле отправляется отдельной частью запроса.

Пример:

```
Content-Type: multipart/form-data
```

Body:

```
id = 555
name = frank
age = 108
```

Реальный HTTP-запрос выглядит примерно так:

```http
POST /departments/details HTTP/1.1
Content-Type: multipart/form-data; boundary=----

------boundary
Content-Disposition: form-data; name="id"

555
------boundary
Content-Disposition: form-data; name="name"

Frank
------boundary
Content-Disposition: form-data; name="age"

108
------boundary--
```

Именно такой запрос создаёт Postman при выборе **form-data**.

---

# Что лучше использовать?

Это зависит от задачи.

### `application/x-www-form-urlencoded`

Подходит для небольших форм:

- логин;
- регистрация;
- поиск;
- фильтры.

Плюсы:

- компактный формат;
- меньше размер запроса;
- быстрее обрабатывается.

---

### `multipart/form-data`

Используется, когда есть хотя бы один файл:

- фотографии;
- PDF;
- документы;
- аватары.

Если файлов нет, использовать `multipart/form-data` обычно нет необходимости — запрос становится больше из-за служебных границ (`boundary`).

> Поэтому утверждение, что *"лучше всегда использовать form-data"*, неверно. Для обычных текстовых полей чаще используют `application/x-www-form-urlencoded`, а для API сегодня нередко вообще используют JSON (`application/json`).

---

# Model Binding

Допустим, имеется метод контроллера:

```csharp
[HttpPost]
public string Details(int id)
{
    return $"Department {id}";
}
```

Если отправить:

```
id = 555
```

то ASP.NET Core автоматически выполнит:

```csharp
int id = 555;
```

и вызовет:

```csharp
Details(555);
```

---

# Несколько параметров

```csharp
[HttpPost]
public string Details(int id, string name, int age)
{
    return $"{id} {name} {age}";
}
```

При отправке формы

```
id=555
name=Frank
age=108
```

ASP.NET Core автоматически создаст:

```csharp
id = 555;
name = "Frank";
age = 108;
```

---

# Привязка к модели

Вместо отдельных параметров обычно используют модель.

```csharp
public class Department
{
    public int Id { get; set; }

    public string Name { get; set; }

    public int Age { get; set; }
}
```

Контроллер:

```csharp
[HttpPost]
public string Details(Department department)
{
    return $"{department.Id} {department.Name}";
}
```

Если форма содержит

```
id=555
name=Frank
age=108
```

ASP.NET Core автоматически создаст объект:

```csharp
var department = new Department
{
    Id = 555,
    Name = "Frank",
    Age = 108
};
```

---

# Явное указание источника данных

При необходимости можно явно указать, что данные нужно брать из формы:

```csharp
[HttpPost]
public string Details([FromForm] Department department)
{
    ...
}
```

или

```csharp
public string Details(
    [FromForm] int id,
    [FromForm] string name)
{
    ...
}
```

`[FromForm]` говорит Model Binder, что значения нужно искать именно в полях HTML-формы (`application/x-www-form-urlencoded` или `multipart/form-data`).

---

# Итог

ASP.NET Core поддерживает автоматическую привязку данных из HTML-форм (**Model Binding**).

Основные форматы отправки:

- **`application/x-www-form-urlencoded`** — стандартный формат для обычных текстовых форм.
- **`multipart/form-data`** — используется, когда вместе с данными передаются файлы или большие бинарные данные.

После получения запроса Model Binder автоматически считывает поля формы и заполняет параметры метода или свойства модели, избавляя разработчика от необходимости вручную разбирать тело HTTP-запроса.

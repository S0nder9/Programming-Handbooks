# Route to Static Files

В ASP.NET Core статические файлы (HTML, CSS, JS, изображения, видео и т.д.) обычно хранятся в папке:

```text
wwwroot
```

Для их обработки используется встроенный middleware:

```csharp
app.UseStaticFiles();
```

---

# Что такое Static Files

Это файлы, которые сервер просто отдаёт клиенту без выполнения C# кода.

Примеры:

```text
wwwroot/
│
├── index.html
├── css/
│   └── site.css
├── js/
│   └── app.js
└── images/
    └── logo.png
```

---

# Подключение

```csharp
var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseStaticFiles();

app.Run();
```

---

# Как работает

Файл:

```text
wwwroot/index.html
```

доступен по адресу:

```http
GET /
```

или

```http
GET /index.html
```

---

Файл:

```text
wwwroot/css/site.css
```

доступен по адресу:

```http
GET /css/site.css
```

---

Файл:

```text
wwwroot/images/logo.png
```

доступен по адресу:

```http
GET /images/logo.png
```

---

# Pipeline

```text
Request
    ↓
UseStaticFiles()
    ↓
Файл найден?
    │
    ├── Да
    │      ↓
    │   Отдать файл
    │
    └── Нет
           ↓
      Следующий middleware
```

---

# Короткое замыкание

Если файл найден:

```http
GET /css/site.css
```

то:

```csharp
app.UseStaticFiles();
```

сразу отправит ответ клиенту.

Следующие middleware уже не выполнятся.

---

# Изменение папки Static Files

По умолчанию используется:

```text
wwwroot
```

Но можно указать свою папку.

---

## Через WebApplicationOptions

```csharp
var builder = WebApplication.CreateBuilder(
    new WebApplicationOptions
    {
        WebRootPath = Path.Combine(
            Directory.GetCurrentDirectory(),
            "webroot"
        )
    });
```

---

Структура:

```text
webroot/
│
├── index.html
├── css/
└── images/
```

---

Теперь:

```csharp
app.UseStaticFiles();
```

будет искать файлы в:

```text
webroot
```

вместо:

```text
wwwroot
```

---

# Дополнительная папка

Можно обслуживать несколько каталогов.

Например:

```csharp
app.UseStaticFiles();

app.UseStaticFiles(
    new StaticFileOptions
    {
        FileProvider =
            new PhysicalFileProvider(
                Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "uploads")),

        RequestPath = "/uploads"
    });
```

---

Структура:

```text
uploads/
│
└── photo.jpg
```

---

Запрос:

```http
GET /uploads/photo.jpg
```

↓

Файл:

```text
uploads/photo.jpg
```

---

# Почему UseStaticFiles обычно ставят первым

Обычно pipeline выглядит так:

```csharp
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();
```

---

Причина:

```text
CSS
JS
PNG
JPG
HTML
```

не требуют маршрутизации, авторизации и бизнес-логики.

Поэтому их выгодно отдать сразу.

---

# Пример

```csharp
var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseStaticFiles();

app.MapGet("/", () =>
{
    return "Hello API";
});

app.Run();
```

---

Структура:

```text
wwwroot
│
└── logo.png
```

---

Запрос:

```http
GET /logo.png
```

Ответ:

```text
Содержимое файла logo.png
```

---

Запрос:

```http
GET /employees
```

Файл не найден →

переход к следующим middleware.

---

# Итог

`UseStaticFiles()` — встроенный middleware для обслуживания статических файлов.

По умолчанию:

```text
wwwroot
```

Можно изменить корневую папку:

```csharp
new WebApplicationOptions
{
    WebRootPath = "webroot"
}
```

или подключить дополнительные каталоги через:

```csharp
StaticFileOptions
```

Схема работы:

```text
Request
    ↓
UseStaticFiles
    ↓
Файл найден?
    │
    ├── Да → Отдать файл
    │
    └── Нет → Следующий middleware
```
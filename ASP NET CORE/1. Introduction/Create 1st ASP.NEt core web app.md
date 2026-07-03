## Create First ASP.NET Core Web App

Создадим первое ASP.NET Core приложение на основе пустого шаблона.

В файле `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

### WebApplication.CreateBuilder()

```csharp
var builder = WebApplication.CreateBuilder(args);
```

Создает объект для настройки приложения.

На этом этапе ASP.NET Core:

- настраивает веб-сервер **Kestrel**
- загружает конфигурацию (`appsettings.json`, переменные окружения и т.д.)
- настраивает систему логирования
- регистрирует встроенные сервисы

Через `builder` можно регистрировать собственные сервисы и изменять настройки приложения.

---

### Build()

```csharp
var app = builder.Build();
```

Создает экземпляр приложения на основе настроек, определенных в `builder`.

После вызова `Build()` можно:

- добавлять middleware
- настраивать маршруты
- определять endpoint'ы

---

### MapGet()

```csharp
app.MapGet("/", () => "Hello World!");
```

Создает endpoint для обработки HTTP GET-запросов по маршруту `/`.

При обращении к:

```text
GET /
```

сервер вернет:

```text
Hello World!
```

> `MapGet()` создает endpoint, а не middleware.

---

### Run()

```csharp
app.Run();
```

Запускает приложение и начинает прослушивать входящие HTTP-запросы.

По умолчанию Kestrel запускается на локальном адресе:

```text
http://localhost:5000
https://localhost:5001
```

(или на случайных портах, указанных в `launchSettings.json`).

Метод блокирует выполнение программы и поддерживает работу веб-сервера до его остановки.

---

## Что происходит при запуске

```text
Program.cs
    ↓
CreateBuilder()
    ↓
Build()
    ↓
MapGet("/")
    ↓
Run()
    ↓
Kestrel начинает слушать HTTP-запросы
    ↓
GET /
    ↓
"Hello World!"
```
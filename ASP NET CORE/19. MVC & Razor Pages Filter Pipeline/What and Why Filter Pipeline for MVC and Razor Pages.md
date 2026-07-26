# What and Why Filter Pipeline for MVC and Razor Pages

В **MVC** и **Razor Pages** существует собственный механизм фильтров — **Filter Pipeline**.

Он позволяет выполнять код **до** и **после** выполнения действия (Action) контроллера или обработчика страницы (Page Handler).

Это аналог **Endpoint Filters** в Minimal API, но предназначенный специально для MVC и Razor Pages.

---

# Зачем нужен Filter Pipeline?

Во многих приложениях одна и та же логика повторяется во множестве контроллеров:

- проверка авторизации;
- логирование;
- обработка исключений;
- измерение времени выполнения;
- проверка параметров;
- изменение результата.

Без фильтров пришлось бы писать одинаковый код в каждом Action.

Например:

```csharp
public IActionResult Get()
{
    Log();

    // ...

    return Ok();
}
```

```csharp
public IActionResult Create()
{
    Log();

    // ...

    return Ok();
}
```

Фильтр позволяет написать эту логику один раз и использовать повторно.

---

# Где находятся фильтры?

После того как запрос попадает в приложение, он проходит несколько этапов.

```
HTTP Request
      │
      ▼
Middleware Pipeline
      │
      ▼
Routing
      │
      ▼
MVC / Razor Pages
      │
      ▼
Filter Pipeline
      │
      ▼
Controller Action
или
Page Handler
      │
      ▼
Action Result
      │
      ▼
HTTP Response
```

Таким образом:

- **Middleware** работает для всего приложения.
- **Filter Pipeline** работает только внутри MVC и Razor Pages.

---

# Что можно делать с помощью фильтров?

Фильтр может:

- выполнить код до Action;
- выполнить код после Action;
- отменить выполнение Action;
- вернуть собственный результат;
- обработать исключение;
- изменить результат перед отправкой клиенту.

---

# Основные виды фильтров

ASP.NET Core предоставляет пять основных типов фильтров.

## 1. Authorization Filter

Выполняется первым.

Используется для проверки доступа пользователя.

Например:

- пользователь вошёл в систему;
- есть нужная роль;
- есть нужная политика доступа.

---

## 2. Resource Filter

Выполняется до Model Binding.

Используется для:

- кэширования;
- изменения процесса выполнения запроса;
- работы с ресурсами.

---

## 3. Action Filter

Самый распространённый тип.

Позволяет выполнить код:

- до Action;
- после Action.

Например:

```csharp
Console.WriteLine("Before");

...

Console.WriteLine("After");
```

Используется для:

- логирования;
- проверки параметров;
- изменения модели;
- измерения времени выполнения.

---

## 4. Exception Filter

Срабатывает только при возникновении исключения.

Позволяет:

- записать ошибку в журнал;
- заменить стандартную страницу ошибки;
- вернуть собственный ответ клиенту.

---

## 5. Result Filter

Работает после выполнения Action, но до отправки ответа клиенту.

Можно:

- изменить результат;
- добавить заголовки;
- изменить содержимое ответа.

---

# Порядок выполнения

```
HTTP Request
      │
      ▼
Authorization Filter
      │
      ▼
Resource Filter
      │
      ▼
Model Binding
      │
      ▼
Action Filter (Before)
      │
      ▼
Controller Action
или
Page Handler
      │
      ▼
Action Filter (After)
      │
      ▼
Result Filter (Before)
      │
      ▼
Action Result
      │
      ▼
Result Filter (After)
      │
      ▼
HTTP Response
```

Если во время выполнения возникло исключение, управление получает:

```
Exception Filter
```

---

# Filter Pipeline похож на Middleware

Middleware:

```
Before

await next();

After
```

Filter Pipeline:

```
Before Action

Action

After Action
```

И Middleware, и Filters используют принцип вложенных вызовов ("матрёшки"), когда код после передачи управления выполняется в обратном порядке.

---

# Endpoint Filters vs MVC Filters

| Endpoint Filters | MVC / Razor Pages Filters |
|------------------|---------------------------|
| Работают только в Minimal API | Работают только в MVC и Razor Pages |
| Реализуют `IEndpointFilter` | Реализуют интерфейсы фильтров (`IActionFilter`, `IAuthorizationFilter`, `IResultFilter` и др.) |
| Имеют доступ к параметрам endpoint через `GetArgument<T>()` | Имеют доступ к контексту MVC (`ActionExecutingContext`, `ResultExecutingContext` и т.д.) |
| Подключаются через `.AddEndpointFilter()` | Подключаются с помощью атрибутов или глобальной регистрации |

---

# Когда использовать Middleware, а когда Filters?

**Middleware** подходит для логики, которая должна применяться ко всем HTTP-запросам:

- CORS;
- аутентификация;
- обработка исключений;
- HTTPS Redirect;
- статические файлы;
- добавление заголовков.

**Filter Pipeline** подходит для логики, относящейся только к MVC или Razor Pages:

- проверка параметров Action;
- логирование действий контроллеров;
- проверка прав доступа к Action;
- обработка результатов;
- кэширование результатов;
- обработка исключений MVC.

---

# Итог

**Filter Pipeline** — это цепочка фильтров, выполняющихся внутри MVC и Razor Pages после маршрутизации и до/после выполнения Action или Page Handler.

Основные типы фильтров:

- **Authorization Filter** — проверка доступа;
- **Resource Filter** — работа с ресурсами до Model Binding;
- **Action Filter** — код до и после выполнения Action;
- **Exception Filter** — обработка исключений;
- **Result Filter** — изменение результата перед отправкой ответа.

Фильтры позволяют вынести общую логику из контроллеров, избежать дублирования кода и сделать приложение более модульным и удобным в сопровождении.
# Redirect Results

**Redirect Results** используются, когда сервер не возвращает содержимое страницы, а сообщает клиенту, что нужно перейти по другому адресу.

При этом клиент получает HTTP-ответ с кодом перенаправления (обычно **302 Found**) и заголовком:

```
Location: <новый URL>
```

После этого браузер или HTTP-клиент автоматически выполняет новый запрос по указанному адресу.

---

# Основные виды Redirect Results

## 1. RedirectToActionResult

Используется для перенаправления на **действие (Action)** другого или текущего контроллера.

Пример:

```csharp
return RedirectToAction(
    "GetEmployeesByDepartment",
    "Employees",
    new { id = id });
```

или

```csharp
return new RedirectToActionResult(
    "GetEmployeesByDepartment",
    "Employees",
    new { id = id });
```

Если

```csharp
id = 5
```

и маршрут контроллера имеет вид

```csharp
[Route("employees")]
```

то пользователь будет перенаправлен, например, на

```
/employees/GetEmployeesByDepartment?id=5
```

или на URL, сформированный согласно настроенным маршрутам.

### Когда использовать

Когда нужно перейти на другой **Action**, не прописывая URL вручную.

Это наиболее безопасный вариант, так как маршрут генерируется автоматически.

---

# 2. LocalRedirectResult

Используется для перенаправления **только внутри текущего сайта**.

Например:

```csharp
return LocalRedirect(
    "/Employees/GetEmployeesByDepartment/5");
```

или

```csharp
return new LocalRedirectResult(
    "/Employees/GetEmployeesByDepartment/5");
```

Разрешены только локальные URL.

Например:

```
/employees

/home/index

/account/login
```

Попытка перенаправить на внешний сайт

```csharp
LocalRedirect("https://google.com")
```

приведёт к исключению.

### Когда использовать

Когда URL известен заранее и необходимо гарантировать, что перенаправление останется внутри приложения.

Это помогает защититься от **Open Redirect Attack**.

---

# 3. RedirectResult

Используется для перенаправления на **любой URL**.

Например:

```csharp
return Redirect(
    "https://example.com");
```

или

```csharp
return new RedirectResult(
    "https://example.com");
```

Можно перенаправлять как на внешние сайты:

```
https://example.com
```

так и на внутренние URL:

```
/employees
```

### Когда использовать

Когда требуется перейти по произвольному адресу, в том числе внешнему.

---

# Что происходит при редиректе?

Например:

```csharp
return Redirect("https://example.com");
```

ASP.NET Core отправит ответ примерно такого вида:

```
HTTP/1.1 302 Found

Location: https://example.com
```

После получения такого ответа браузер автоматически выполнит новый запрос по адресу:

```
https://example.com
```

---

# Методы и соответствующие классы

Как и многие другие результаты в MVC, методы контроллера являются удобными обёртками над соответствующими классами.

Например:

```csharp
return Redirect(url);
```

эквивалентно

```csharp
return new RedirectResult(url);
```

---

```csharp
return LocalRedirect(url);
```

эквивалентно

```csharp
return new LocalRedirectResult(url);
```

---

```csharp
return RedirectToAction(
    "Action",
    "Controller");
```

эквивалентно

```csharp
return new RedirectToActionResult(
    "Action",
    "Controller",
    null);
```

---

# Сравнение

| Тип | Куда можно перенаправить |
|------|--------------------------|
| `RedirectToActionResult` | На Action контроллера |
| `LocalRedirectResult` | Только на локальный URL внутри приложения |
| `RedirectResult` | На любой URL (локальный или внешний) |

---

# Когда что использовать?

- **`RedirectToAction()`** — когда нужно перейти к другому действию MVC и не хочется формировать URL вручную.
- **`LocalRedirect()`** — когда известен локальный путь и важно запретить переходы на внешние сайты.
- **`Redirect()`** — когда необходимо выполнить перенаправление на произвольный URL, включая внешние ресурсы.

---

# Итог

ASP.NET Core предоставляет несколько видов результатов для перенаправления:

- **RedirectToActionResult** — перенаправление на действие контроллера с автоматической генерацией маршрута;
- **LocalRedirectResult** — безопасное перенаправление только внутри текущего приложения;
- **RedirectResult** — перенаправление на любой URL, включая внешние сайты.

Во всех случаях клиент получает HTTP-ответ с кодом перенаправления и заголовком `Location`, после чего выполняет новый запрос по указанному адресу.
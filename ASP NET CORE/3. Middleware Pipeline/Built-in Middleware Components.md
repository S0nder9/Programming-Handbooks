## Built-in Middleware Components

ASP.NET Core уже содержит множество готовых middleware, которые решают типовые задачи веб-приложений.

Примеры:

```csharp
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
```

---

### UseHttpsRedirection

Автоматически перенаправляет HTTP-запросы на HTTPS.

```csharp
app.UseHttpsRedirection();
```

Пример:

```text
http://localhost:5000
↓
https://localhost:5001
```

---

### UseRouting

Определяет, какой endpoint должен обработать запрос.

```csharp
app.UseRouting();
```

Пример:

```csharp
app.MapGet("/employees", () => "Employees");
```

При запросе:

```http
GET /employees
```

маршрутизация найдет нужный обработчик.

---

### UseAuthentication

Проверяет личность пользователя.

```csharp
app.UseAuthentication();
```

Например:

- JWT-токены;
- Cookies;
- OAuth;
- Identity.

После выполнения middleware становится доступен:

```csharp
context.User
```

---

### UseAuthorization

Проверяет права доступа пользователя.

```csharp
app.UseAuthorization();
```

Например:

```csharp
[Authorize]
```

или

```csharp
[Authorize(Roles = "Admin")]
```

---

### UseStaticFiles

Позволяет отдавать статические файлы:

```csharp
app.UseStaticFiles();
```

Например:

```text
wwwroot/
├─ css/
├─ js/
├─ images/
```

Запрос:

```http
GET /images/logo.png
```

вернет файл без написания собственного кода.

---

## Важен порядок middleware

Некоторые middleware должны идти строго в определенном порядке.

Обычно:

```csharp
app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();
```

---

## Кратко

ASP.NET Core предоставляет готовые middleware для популярных задач:

| Middleware | Назначение |
|------------|------------|
| `UseHttpsRedirection()` | Перенаправление HTTP → HTTPS |
| `UseRouting()` | Маршрутизация запросов |
| `UseAuthentication()` | Аутентификация пользователя |
| `UseAuthorization()` | Проверка прав доступа |
| `UseStaticFiles()` | Отдача статических файлов |

Их можно комбинировать со своими middleware через `app.Use()`, `app.Map()`, `app.MapWhen()` и `app.Run()`.
# Authorization Filter

**Authorization Filter** — это фильтр, который отвечает за проверку прав доступа пользователя.

Он выполняется **первым** среди всех MVC-фильтров, ещё до Model Binding и вызова Action.

Если авторизация не пройдена, выполнение конвейера останавливается, и Action не будет вызван.

---

# Когда использовать Authorization Filter?

Authorization Filter подходит для:

- проверки, вошёл ли пользователь в систему;
- проверки ролей;
- проверки Claims;
- проверки собственных правил доступа.

> **Важно:** в современных приложениях предпочтительно использовать встроенные механизмы ASP.NET Core (`[Authorize]`, политики авторизации и требования). Создание собственного `AuthorizationFilter` имеет смысл только для нестандартных сценариев.

---

# Создание фильтра

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebApp.Filters
{
    public class SpecialAuthFilter
        : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(
            AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;

            // Пользователь не аутентифицирован
            if (user?.Identity is null ||
                !user.Identity.IsAuthenticated)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            // Проверка Claim
            if (!user.HasClaim(c =>
                    c.Type == "CustomClaim" &&
                    c.Value == "CustomValue"))
            {
                context.Result = new ForbidResult();
            }
        }
    }
}
```

---

# Что делает этот код?

Получает текущего пользователя:

```csharp
var user = context.HttpContext.User;
```

Проверяет, вошёл ли пользователь в систему:

```csharp
user.Identity.IsAuthenticated
```

Если нет:

```csharp
context.Result =
    new UnauthorizedResult();
```

возвращается ответ

```
401 Unauthorized
```

и выполнение конвейера прекращается.

---

Затем проверяется наличие Claim:

```csharp
user.HasClaim(...)
```

Если нужного Claim нет:

```csharp
context.Result =
    new ForbidResult();
```

возвращается

```
403 Forbidden
```

---

# Разница между 401 и 403

## 401 Unauthorized

```
Пользователь НЕ аутентифицирован.
```

Например:

- не вошёл в систему;
- отсутствует JWT-токен;
- токен просрочен.

---

## 403 Forbidden

```
Пользователь аутентифицирован,
но не имеет необходимых прав.
```

Например:

- недостаточная роль;
- отсутствует нужный Claim;
- запрещён доступ к ресурсу.

---

# Как применяется фильтр?

К одному Action:

```csharp
[SpecialAuthFilter]
public IActionResult Index()
{
    return View();
}
```

---

К контроллеру:

```csharp
[SpecialAuthFilter]
public class DepartmentsController : Controller
{
}
```

---

Глобально:

```csharp
builder.Services.AddControllers(options =>
{
    options.Filters.Add<SpecialAuthFilter>();
});
```

---

# Что такое `context.Result`?

Если установить

```csharp
context.Result = ...
```

то выполнение конвейера MVC прекращается.

Например:

```csharp
context.Result =
    new UnauthorizedResult();
```

После этого:

- другие фильтры (кроме тех, которые уже начали выполняться) не будут вызваны;
- Action не выполнится;
- клиент сразу получит ответ.

---

# Порядок выполнения

Authorization Filter выполняется раньше остальных фильтров.

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
Action Filter
        │
        ▼
Controller Action
        │
        ▼
Result Filter
        │
        ▼
HTTP Response
```

Если авторизация не прошла:

```
HTTP Request
        │
        ▼
Authorization Filter
        │
        ▼
401 / 403
        │
        ▼
HTTP Response
```

До Action выполнение уже не дойдёт.

---

# Authorization Filter или `[Authorize]`?

В большинстве случаев рекомендуется использовать встроенную авторизацию:

```csharp
[Authorize]
```

или

```csharp
[Authorize(Roles = "Admin")]
```

или политики:

```csharp
[Authorize(Policy = "CanEdit")]
```

Собственный `AuthorizationFilter` стоит создавать только тогда, когда стандартных возможностей недостаточно.

---

# Итог

**Authorization Filter** — первый фильтр в конвейере MVC. Он используется для проверки доступа пользователя до выполнения Action.

Основные проверки:

- пользователь аутентифицирован (`IsAuthenticated`);
- наличие ролей;
- наличие Claims;
- выполнение собственных правил авторизации.

Если проверка не проходит:

- `UnauthorizedResult()` возвращает **401 Unauthorized** (пользователь не вошёл в систему);
- `ForbidResult()` возвращает **403 Forbidden** (пользователь вошёл в систему, но не имеет необходимых прав).

Установка `context.Result` завершает выполнение конвейера MVC и предотвращает вызов контроллера.
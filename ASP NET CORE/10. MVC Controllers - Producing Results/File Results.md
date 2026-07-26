# File Results

**File Results** — это специальные типы результатов в ASP.NET Core MVC, которые позволяют вернуть клиенту файл.

Они используются, когда необходимо:

- открыть файл в браузере;
- скачать файл;
- вернуть файл из памяти;
- вернуть файл с диска.

---

# Основные виды FileResult

## 1. VirtualFileResult

Используется для файлов, которые находятся внутри **Web Root** (`wwwroot`).

Например:

```
wwwroot/
    files/
        test.txt
```

Контроллер:

```csharp
[Route("/download_vf")]
public IActionResult ReturnVirtualFile()
{
    return File(
        "files/test.txt",
        "text/plain");
}
```

или

```csharp
return new VirtualFileResult(
    "files/test.txt",
    "text/plain");
```

> При использовании `VirtualFileResult` путь указывается **относительно папки `wwwroot`**. Если `WebRootPath` настроен стандартно, не нужно писать `wwwroot/files/...`, достаточно `files/test.txt`.

---

# 2. PhysicalFileResult

Используется, когда файл находится **вне `wwwroot`**.

Например:

```csharp
[Route("/download_pf")]
public IActionResult ReturnPhysicalFile()
{
    return File(
        @"C:\Files\report.pdf",
        "application/pdf");
}
```

или

```csharp
return new PhysicalFileResult(
    @"C:\Files\report.pdf",
    "application/pdf");
```

---

# 3. FileContentResult

Используется, когда файл уже находится в памяти в виде массива байтов.

```csharp
byte[] bytes =
    System.IO.File.ReadAllBytes(
        @"C:\Files\report.pdf");

return File(
    bytes,
    "application/pdf");
```

или

```csharp
return new FileContentResult(
    bytes,
    "application/pdf");
```

Физический путь клиенту при этом неизвестен.

---

# Почему файл открывается в браузере?

Например:

```csharp
return File(
    bytes,
    "application/pdf");
```

Отправляется заголовок:

```
Content-Type: application/pdf
```

Браузер знает, как отображать PDF, поэтому открывает его во вкладке.

То же касается:

```
text/plain
image/png
image/jpeg
text/html
```

Большинство современных браузеров умеют отображать такие типы файлов прямо в окне.

---

# Как принудительно скачать файл?

Для этого нужно указать имя скачиваемого файла (`FileDownloadName` или параметр `fileDownloadName` метода `File`). ASP.NET Core автоматически добавит заголовок:

```
Content-Disposition: attachment; filename="..."
```

Например:

```csharp
return File(
    bytes,
    "application/pdf",
    "report.pdf");
```

или

```csharp
return new FileContentResult(
    bytes,
    "application/pdf")
{
    FileDownloadName = "report.pdf"
};
```

Теперь браузер предложит скачать файл вместо открытия.

---

# Нужно ли использовать `application/octet-stream`?

Не обязательно.

Раньше часто использовали

```
application/octet-stream
```

поскольку это универсальный MIME-тип для произвольных бинарных данных.

Например:

```csharp
return File(
    bytes,
    "application/octet-stream",
    "report.pdf");
```

Это действительно почти всегда приводит к скачиванию.

Однако в ASP.NET Core достаточно указать **имя скачиваемого файла** (`FileDownloadName`), даже если MIME-тип остаётся корректным (`application/pdf`, `image/png` и т.д.). Браузер увидит заголовок `Content-Disposition: attachment` и предложит сохранить файл.

Использовать правильный MIME-тип предпочтительнее, так как он точнее описывает содержимое файла.

---

# Сравнение

| Тип | Откуда берётся файл |
|------|---------------------|
| `VirtualFileResult` | Из папки `wwwroot` |
| `PhysicalFileResult` | По абсолютному пути на диске |
| `FileContentResult` | Из массива `byte[]` в памяти |

---

# Итог

ASP.NET Core предоставляет несколько типов `FileResult` для возврата файлов:

- **VirtualFileResult** — файл из `wwwroot`;
- **PhysicalFileResult** — файл по абсолютному пути;
- **FileContentResult** — файл, находящийся в памяти.

По умолчанию браузер может открыть файл, если знает его MIME-тип (например, PDF или изображение). Чтобы **принудительно скачать файл**, обычно достаточно указать имя скачиваемого файла (`FileDownloadName` или параметр `fileDownloadName` метода `File`), что добавит заголовок `Content-Disposition: attachment`. Использование `application/octet-stream` также возможно, но не является обязательным.
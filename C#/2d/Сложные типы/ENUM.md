## Enum (Перечисления)

**Enum** (`enumeration`) — это специальный тип значения, который позволяет хранить набор именованных констант.

Используется, когда переменная может принимать одно из нескольких заранее известных значений.

---

## Зачем нужен Enum?

Без `enum` пришлось бы писать:

```csharp
int genre = 5;
```

Но непонятно:

```text
5 — это что?
Стратегия?
Шутер?
RPG?
```

С `enum` код становится понятнее:

```csharp
Genre genre = Genre.Strategy;
```

---

## Объявление

```csharp
enum Genre
{
    ActionAdventure = 1,
    Platformer,
    RPG,
    Shooter,
    Strategy
}
```

---

### Значения

Если первое значение задано:

```csharp
ActionAdventure = 1
```

то остальные увеличиваются автоматически:

```text
ActionAdventure = 1
Platformer      = 2
RPG             = 3
Shooter         = 4
Strategy        = 5
```

---

## Использование

```csharp
Genre genre = Genre.Strategy;
```

---

В твоём примере:

```csharp
games.Add(
    new Game(
        "The Legend of Zelda: Breath of the Wild",
        Genre.Strategy
    )
);
```

---

## Enum как тип поля

```csharp
private Genre _genre;
```

Теперь поле может хранить только значения из перечисления:

```csharp
Genre.ActionAdventure
Genre.Platformer
Genre.RPG
Genre.Shooter
Genre.Strategy
```

---

## Вывод Enum

```csharp
Console.WriteLine(_genre);
```

Выведет название элемента:

```text
Strategy
```

а не число `5`.

---

## Получение числового значения

```csharp
Console.WriteLine((int)Genre.Strategy);
```

Результат:

```text
5
```

---

## Преобразование числа в Enum

```csharp
Genre genre = (Genre)3;
```

Результат:

```text
RPG
```

---

## Проверка в switch

Очень часто используется вместе с `switch`:

```csharp
switch (_genre)
{
    case Genre.RPG:
        Console.WriteLine("Role Playing Game");
        break;

    case Genre.Shooter:
        Console.WriteLine("Shooter");
        break;
}
```

---

## Где используются Enum?

### Жанры игр

```csharp
Genre.RPG
Genre.Shooter
```

### Статусы заказа

```csharp
enum OrderStatus
{
    New,
    Processing,
    Delivered,
    Cancelled
}
```

### Дни недели

```csharp
enum WeekDay
{
    Monday,
    Tuesday,
    Wednesday
}
```

### Уровни доступа

```csharp
enum UserRole
{
    User,
    Moderator,
    Admin
}
```

---

## Преимущества Enum

- код становится понятнее;
- меньше "магических чисел";
- защита от неверных значений;
- удобно использовать в `switch`.

---

## Кратко

```text
Enum — набор именованных констант.
```

```csharp
enum Genre
{
    RPG,
    Shooter,
    Strategy
}
```

Использование:

```csharp
Genre genre = Genre.Strategy;
```

Вместо:

```csharp
int genre = 5;
```

что делает код более читаемым и безопасным.
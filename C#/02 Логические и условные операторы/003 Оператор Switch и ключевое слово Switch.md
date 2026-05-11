## Оператор `switch`

`switch` используется, когда нужно сравнить **одно значение** с несколькими вариантами.

```csharp
int month = 1;
string monthName;

switch (month)
{
    case 1:
        monthName = "Jan";
        break;

    case 2:
        monthName = "Feb";
        break;

    default:
        monthName = "Unknown";
        break;
}

Console.WriteLine(monthName);
```

Результат:
```text
Jan
```

---

## Как работает `switch`

1. Берётся значение переменной (`month`).
2. Проверяется каждый `case`.
3. Если найдено совпадение — выполняется код.
4. `break` завершает `switch`.

---

## `default`

`default` выполняется, если ни один `case` не подошёл.

```csharp
default:
    Console.WriteLine("Нет такого месяца");
    break;
```

Аналог `else` в `if`.

---

## Несколько `case`

Можно объединять:

```csharp
int day = 6;

switch (day)
{
    case 6:
    case 7:
        Console.WriteLine("Weekend");
        break;

    default:
        Console.WriteLine("Work day");
        break;
}
```

Результат:
```text
Weekend
```

---

## `switch expression` (новый синтаксис, C# 8+)

Более короткая запись:

```csharp
string monthName = month switch
{
    1 => "Jan",
    2 => "Feb",
    _ => "Unknown"
};
```

`_` — аналог `default`.

---

# Когда использовать `switch`, а когда `if`?

### `switch`
Подходит, когда:
- сравнивается **одна переменная**;
- много фиксированных вариантов (`1`, `2`, `"yes"`).

Пример:
```csharp
switch (grade)
```

Плюсы:
- код чище;
- читается легче;
- иногда производительнее.

---

### `if`
Подходит, когда:
- условия сложные;
- используются диапазоны;
- несколько переменных.

Пример:
```csharp
if (age >= 18 && hasTicket)
```

---

## Пример: `if` лучше

```csharp
if (score >= 90)
    Console.WriteLine("A");
```

Через `switch` так неудобно.

---

## Важно про `break`

Если забыть `break`, в C# будет ошибка:

```csharp
case 1:
    Console.WriteLine("One");
// Ошибка
```

Нужно:

```csharp
case 1:
    Console.WriteLine("One");
    break;
```
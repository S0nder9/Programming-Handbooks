## Тип данных `char`

`char` — это тип данных для хранения **одного символа** в C#.

Размер: **2 байта (16 бит)**  
Использует кодировку **UTF-16**.

```csharp
char letter = 'A';
char digit = '7';
char symbol = '#';

Console.WriteLine(letter); // A
Console.WriteLine(digit);  // 7
Console.WriteLine(symbol); // #
```

Особенности:
- символы записываются в **одинарных кавычках** `' '`;
- хранит только **один символ**.

Пример ошибки:
```csharp
char wrong = "A"; // Ошибка: двойные кавычки используются для string
```

Правильно:
```csharp
char correct = 'A';
```

---

## Unicode и UTF-16

Каждый символ в `char` хранится как **числовой код Unicode**.

Можно преобразовать символ в число:

```csharp
char letter = 'A';
Console.WriteLine((int)letter); // 65
```

И наоборот:

```csharp
char symbol = (char)65;
Console.WriteLine(symbol); // A
```

---

## Смайлики в UTF-16

Большинство обычных символов (`A`, `Б`, `#`) занимают **1 `char`**.

Но многие смайлики занимают **2 `char`**, потому что их Unicode-код больше диапазона одного `char`.

Пример:

```csharp
string emoji = "😀";

Console.WriteLine(emoji);        // 😀
Console.WriteLine(emoji.Length); // 2
```

Почему `2`?  
Потому что `"😀"` в UTF-16 хранится как **суррогатная пара** (два `char`).

Попытка записать так:

```csharp
char emoji = '😀'; // Ошибка
```

не сработает, потому что `char` хранит только один 16-битный элемент.

Для смайликов лучше использовать `string`:

```csharp
string smile = "😀";
```

---

## Таблица примеров

| Значение | Тип | Размер |
|----------|-----|--------|
| `'A'` | `char` | 1 символ |
| `"A"` | `string` | строка |
| `"Привет"` | `string` | строка |
| `"😀"` | `string` | 2 `char` в UTF-16 |
## Цикл `foreach` и длина массива

`foreach` используется для **перебора всех элементов массива или коллекции**.

Главное отличие от `for`:
- не нужен индекс;
- элементы перебираются автоматически по очереди.

---

## Синтаксис

```csharp
foreach (тип переменная in массив)
{
    // работа с элементом
}
```

---

## Пример с массивом

```csharp
int[] numbers = { 10, 20, 30, 40 };

foreach (int number in numbers)
{
    Console.WriteLine(number);
}
```

Результат:
```text
10
20
30
40
```

Как работает:
- сначала `number = 10`
- потом `number = 20`
- потом `30`
- потом `40`

---

## С `var`

Тип можно не писать явно:

```csharp
foreach (var number in numbers)
{
    Console.WriteLine(number);
}
```

Компилятор сам поймёт, что `number` имеет тип `int`.

---

## Перебор строк

```csharp
string[] names = { "Nikita", "Alex", "Kate" };

foreach (string name in names)
{
    Console.WriteLine(name);
}
```

Результат:
```text
Nikita
Alex
Kate
```

---

# Длина массива (`Length`)

Свойство `.Length` показывает **количество элементов** в массиве.

```csharp
int[] numbers = { 10, 20, 30, 40 };

Console.WriteLine(numbers.Length);
```

Результат:
```text
4
```

---

## Использование с `for`

```csharp
for (int i = 0; i < numbers.Length; i++)
{
    Console.WriteLine(numbers[i]);
}
```

Почему `<`, а не `<=`?

Потому что индексы начинаются с `0`:

```text
0 1 2 3
```

Если написать:

```csharp
numbers[4]
```

будет ошибка:

```text
IndexOutOfRangeException
```

---

## Когда использовать `foreach`, а когда `for`?

### `foreach`
Использовать, когда нужно:
- просто прочитать все элементы;
- не нужен индекс.

```csharp
foreach (var item in array)
```

---

### `for`
Использовать, когда:
- нужен индекс;
- нужно изменять элементы массива.

```csharp
for (int i = 0; i < array.Length; i++)
```

Пример изменения:

```csharp
for (int i = 0; i < numbers.Length; i++)
{
    numbers[i] *= 2;
}
```

После этого:
```text
20 40 60 80
```

`foreach` так сделать нельзя, потому что переменная внутри него **только для чтения**.
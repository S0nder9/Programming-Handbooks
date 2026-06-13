## `Random`

Класс `Random` используется для генерации **случайных чисел**.

---

## Создание объекта

```csharp
Random rand = new Random();
```

Создаётся генератор случайных чисел.

---

## Метод `Next()`

```csharp
rand.Next(0, 10);
```

Генерирует число:

```text
от 0 до 9
```

Важно:
- левая граница включается (`0`)
- правая **не включается** (`10`)

То есть:

```csharp
rand.Next(min, max)
```

→ `[min, max)`

---

## Пример

```csharp
Random rand = new Random();

int value;

while (true)
{
    value = rand.Next(0, 10);

    Console.WriteLine(value);
    Console.ReadKey();
}
```

Каждое нажатие клавиши выводит новое случайное число.

Например:

```text
3
7
1
9
0
```

---

# Проблема `Random`

Плохой код:

```csharp
for (int i = 0; i < 5; i++)
{
    Random rand = new Random();

    Console.WriteLine(rand.Next(0, 5));
}
```

Иногда вывод:

```text
4
4
4
4
4
```

Почему?

`Random()` использует **текущее время** как seed (начальное состояние).

Цикл работает слишком быстро → время одинаковое → одинаковые числа.

---

# Правильный способ

Создаём `Random` **один раз**:

```csharp
Random rand = new Random();

for (int i = 0; i < 5; i++)
{
    Console.WriteLine(rand.Next(0, 5));
}
```

Теперь результат будет случайным:

```text
1
4
0
3
2
```

---

## Другие методы

Случайный `double` от `0` до `1`:

```csharp
rand.NextDouble();
```

Пример:

```text
0.73452
```

---

Случайный `bool`:

```csharp
bool x = rand.Next(0, 2) == 1;
```

Результат:
```text
true или false
```
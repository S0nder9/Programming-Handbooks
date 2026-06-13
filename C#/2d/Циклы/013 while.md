## Цикл `while`

Цикл `while` выполняет код **пока условие истинно (`true`)**.

Синтаксис:

```csharp
while (условие)
{
    // код
}
```

---

## Пример

```csharp
int age = 0;

while (age <= 5)
{
    Console.WriteLine(age);
    age++;
}
```

Результат:

```text
0
1
2
3
4
5
```

---

## `continue` в `while`

`continue` **пропускает текущую итерацию** и переходит к следующей.

Пример:

```csharp
int age = 0;

while (age <= 5)
{
    age++;

    if (age == 4)
    {
        continue;
    }

    Console.WriteLine(age);
}
```

Результат:

```text
1
2
3
5
6
```

Почему нет `4`?
Потому что при `age == 4` выполнение `Console.WriteLine()` пропускается.

---

## `break` в `while`

`break` **полностью завершает цикл**.

```csharp
int age = 0;

while (true)
{
    age++;

    if (age == 5)
    {
        break;
    }

    Console.WriteLine(age);
}
```

Результат:

```text
1
2
3
4
```

При `age == 5` цикл остановился.

---

## Важно


```csharp
if (age == 4)
{
    continue;
}
```

если перед этим не увеличить `age`, можно получить **бесконечный цикл**:

```csharp
while (age <= 5)
{
    if (age == 4)
        continue; // age никогда не изменится
}
```

Поэтому счётчик обычно меняют **до `continue`**.
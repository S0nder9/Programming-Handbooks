## Операторы `break` и `continue`

`break` и `continue` используются для управления циклом.

---

## `break`

`break` **полностью завершает цикл**.

```csharp
for (int i = 0; i < 5; i++)
{
    if (i == 3)
    {
        break;
    }

    Console.WriteLine($"Iteration {i + 1}");
}
```

Результат:
```text
Iteration 1
Iteration 2
Iteration 3
```

Объяснение:
- `i = 0` → выводится `Iteration 1`
- `i = 1` → выводится `Iteration 2`
- `i = 2` → выводится `Iteration 3`
- `i = 3` → условие `i == 3` истинно → `break`
- цикл **сразу завершён**

---

## `continue`

`continue` **пропускает текущую итерацию** и переходит к следующей.

```csharp
for (int i = 0; i < 5; i++)
{
    if (i == 3)
    {
        continue;
    }

    Console.WriteLine($"Iteration {i + 1}");
}
```

Результат:
```text
Iteration 1
Iteration 2
Iteration 3
Iteration 5
```

Объяснение:
- при `i = 3` строка `Console.WriteLine()` пропускается,
- цикл продолжается дальше.

---

## Когда использовать

`break`
- когда нужно **досрочно завершить** цикл.

Пример: нашли нужный элемент в массиве.

---

`continue`
- когда нужно **пропустить одну итерацию**.

Пример: пропустить отрицательные числа.
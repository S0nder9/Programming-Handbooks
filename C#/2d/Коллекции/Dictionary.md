## `Dictionary<TKey, TValue>`

`Dictionary` — это коллекция, которая хранит данные в формате:

```text
ключ → значение
```

---

## Создание словаря

```csharp
Dictionary<int, string> users = new Dictionary<int, string>();
```

Здесь:
- `int` — ключ (ID пользователя)
- `string` — значение (имя пользователя)

---

## Добавление элементов

```csharp
users.Add(1, "Alex");
users.Add(2, "Bob");
users.Add(3, "Anna");
```

Результат:

```text
1 → Alex
2 → Bob
3 → Anna
```

---

## Доступ по ключу

```csharp
Console.WriteLine(users[1]);
```

Вывод:

```text
Alex
```

---

## Изменение значения

```csharp
users[2] = "Robert";
```

Теперь:

```text
2 → Robert
```

---

## Проверка наличия ключа

```csharp
if (users.ContainsKey(3))
{
    Console.WriteLine("Key exists");
}
```

---

## Безопасное получение значения

```csharp
if (users.TryGetValue(1, out string name))
{
    Console.WriteLine(name);
}
```

Если ключа нет — ошибки не будет.

---

## Удаление элемента

```csharp
users.Remove(2);
```

Удаляет пару:

```text
2 → Robert
```

---

## Перебор словаря

```csharp
foreach (var item in users)
{
    Console.WriteLine(item.Key + " " + item.Value);
}
```

Результат:

```text
1 Alex
3 Anna
```

---

## Важные свойства

```csharp
users.Count   // количество элементов
users.Keys    // все ключи
users.Values  // все значения
```

---

## Где используется Dictionary в реальных проектах?

### 1. Быстрый поиск данных

Например, поиск пользователя по ID:

```text
ID → пользователь
```

---

### 2. Кэширование (Cache)

```text
URL → результат запроса
```

Чтобы не выполнять один и тот же запрос дважды.

---

### 3. Конфигурации

```text
"Theme" → "Dark"
"Language" → "RU"
```

---

### 4. Игры

```text
"player1" → stats
"enemy5" → HP
```

---

### 5. Подсчёт элементов

```text
буква → количество повторений
```

Пример:

```text
A → 3
B → 5
C → 1
```

---

## Главное преимущество

`Dictionary` очень быстрый:

```text
поиск по ключу ≈ O(1)
```

---

## Итог

```text
Dictionary = быстрый доступ к данным по ключу
```

Используется, когда нужно:
- хранить пары данных;
- быстро находить значение по идентификатору;
- избегать медленного поиска в списках.
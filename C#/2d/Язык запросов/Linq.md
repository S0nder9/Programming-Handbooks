## LINQ

**LINQ (Language Integrated Query)** — технология для удобной работы с коллекциями, массивами, списками и другими наборами данных.

Позволяет выполнять:

- фильтрацию;
- сортировку;
- поиск;
- выбор нужных данных;
- группировку.

Без написания длинных циклов `for` и `foreach`.

Для использования нужно подключить пространство имён:

```csharp
using System.Linq;
```

---

## Без LINQ

Допустим, нужно найти игроков выше 200 уровня.

```csharp
List<Player> filteredPlayers = new List<Player>();

foreach (var player in players)
{
    if (player.Level > 200)
    {
        filteredPlayers.Add(player);
    }
}
```

Работает, но кода довольно много.

---

## С LINQ

```csharp
var filteredPlayers =
    from player in players
    where player.Level > 200
    select player;
```

---

### Что здесь происходит?

```csharp
from player in players
```

Берём элементы из коллекции `players`.

---

```csharp
where player.Level > 200
```

Оставляем только игроков выше 200 уровня.

---

```csharp
select player
```

Возвращаем найденные объекты.

---

## Выбор только имён

В твоём примере:

```csharp
var filteredPlayers =
    from player in players
    where player.Level > 200
    select player.Name;
```

Теперь результат содержит не объекты `Player`, а строки (`string`):

```text
Player2
Player3
```

---

## Вывод результата

```csharp
foreach (var item in filteredPlayers)
{
    Console.WriteLine(item);
}
```

Результат:

```text
Player2
Player3
```

---

## Ключевое слово `var`

Тип можно не писать явно:

```csharp
var filteredPlayers = ...
```

Компилятор сам определит тип.

Например:

```csharp
select player.Name;
```

означает:

```csharp
IEnumerable<string>
```

---

## Методический синтаксис

Тот же запрос можно записать короче:

```csharp
var filteredPlayers = players
    .Where(player => player.Level > 200)
    .Select(player => player.Name);
```

Это самый популярный вариант LINQ в реальных проектах.

---

## Полезные методы LINQ

### Where

Фильтрация:

```csharp
players.Where(player => player.Level > 100);
```

---

### Select

Выбор нужных данных:

```csharp
players.Select(player => player.Name);
```

---

### First

Первый элемент:

```csharp
Player player = players.First();
```

---

### FirstOrDefault

Первый элемент или `null`:

```csharp
Player player = players.FirstOrDefault();
```

---

### OrderBy

Сортировка по возрастанию:

```csharp
players.OrderBy(player => player.Level);
```

---

### OrderByDescending

Сортировка по убыванию:

```csharp
players.OrderByDescending(player => player.Level);
```

---

### Count

Количество элементов:

```csharp
int count = players.Count();
```

---

### Any

Есть ли хотя бы один элемент:

```csharp
bool exists = players.Any(player => player.Level > 500);
```

---

## Где используется?

LINQ применяется практически везде:

- `List<T>`;
- массивы;
- базы данных (Entity Framework);
- XML;
- JSON;
- коллекции объектов.

---

## Кратко

```text
LINQ — язык запросов для коллекций.
```

Пример:

```csharp
var result =
    from player in players
    where player.Level > 200
    select player.Name;
```

или

```csharp
var result = players
    .Where(player => player.Level > 200)
    .Select(player => player.Name);
```

Позволяет фильтровать, сортировать и искать данные без написания лишних циклов.
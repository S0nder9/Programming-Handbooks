## Связь Has-A

**Has-A** ("имеет", "содержит") — это отношение, при котором один объект содержит другой объект как поле.

Примеры:

```text
Автомобиль имеет двигатель
Компьютер имеет процессор
Задача имеет исполнителя
Доска имеет задачи
```

---

## Пример из кода

### Task Has-A Performer

```csharp
class Task
{
    public Performer Worker;
    public string Description;
}
```

Здесь объект `Task` содержит объект `Performer`.

```text
Task Has-A Performer
(Задача имеет исполнителя)
```

---

### Board Has-A Task[]

```csharp
class Board
{
    public Task[] Tasks;
}
```

Здесь объект `Board` содержит массив задач.

```text
Board Has-A Task[]
(Доска содержит задачи)
```

---

## Создание объектов

```csharp
Performer worker1 = new Performer("DfDFdf");
Performer worker2 = new Performer("123");
```

Создаём исполнителей.

---

```csharp
Task[] tasks =
{
    new Task(worker1, "ssds"),
    new Task(worker2, "vdsvdcs")
};
```

Создаём задачи и передаём исполнителей внутрь них.

Схема:

```text
Task 1
 ├─ Worker → DfDFdf
 └─ Description → ssds

Task 2
 ├─ Worker → 123
 └─ Description → vdsvdcs
```

---

```csharp
Board schedule = new Board(tasks);
```

Создаём доску задач.

Схема:

```text
Board
 └─ Tasks
      ├─ Task1
      └─ Task2
```

---

## Вывод информации

```csharp
schedule.ShowAllTasks();
```

Метод перебирает массив задач:

```csharp
for (int i = 0; i < Tasks.Length; i++)
{
    Tasks[i].ShowInfo();
}
```

---

А каждая задача выводит данные своего исполнителя:

```csharp
Console.WriteLine($"{Worker.Name}, {Description}");
```

---

## Кратко

```text
Has-A → содержит объект

Task Has-A Performer
Board Has-A Task[]

Обычно реализуется через поля или свойства класса.
```
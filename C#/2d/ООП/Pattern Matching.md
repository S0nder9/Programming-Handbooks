## Pattern Matching

**Pattern Matching** — это механизм проверки типа объекта с одновременным получением переменной нужного типа.

Позволяет избавиться от ручных приведений:

```csharp
if (person is Student)
{
    Student student = (Student)person;
}
```

---

## Проверка через `is`

До Pattern Matching часто писали:

```csharp
if (person is Student)
{
    Student student = (Student)person;
    Console.WriteLine(student.AvgScore);
}
```

Здесь происходит:

1. Проверка типа.
2. Приведение типа.

---

### Pattern Matching

```csharp
if (person is Student student)
{
    Console.WriteLine(student.AvgScore);
}
```

Здесь:

```csharp
Student student
```

создаётся автоматически после успешной проверки типа.

---

## Пример

```csharp
Person person = new Student(85);
```

---

```csharp
if (person is Student student)
{
    Console.WriteLine(student.AvgScore);
}
```

Результат:

```text
85
```

---

## Pattern Matching в `switch`

Можно проверять сразу несколько типов:

```csharp
switch (person)
{
    case Student student:
        student.ShowName();
        Console.WriteLine(student.AvgScore);
        break;

    case Mentor mentor:
        mentor.ShowName();
        Console.WriteLine(mentor.NumberOfStudents);
        break;
}
```

---

### Что происходит?

Если объект:

```csharp
new Student(85)
```

то выполнится:

```csharp
case Student student:
```

---

Если объект:

```csharp
new Mentor("John", 10)
```

то выполнится:

```csharp
case Mentor mentor:
```

---

## Почему это удобно?

Без Pattern Matching пришлось бы писать:

```csharp
if (person is Student)
{
    Student student = (Student)person;
}
else if (person is Mentor)
{
    Mentor mentor = (Mentor)person;
}
```

С `switch` код становится компактнее и понятнее.

---

## Где используется?

Часто встречается при работе с:

- наследованием;
- интерфейсами;
- обработкой разных типов объектов;
- игровыми объектами;
- коллекциями базового типа.

Например:

```csharp
List<Person> people;
```

где внутри могут быть:

```text
Student
Mentor
Teacher
Admin
```
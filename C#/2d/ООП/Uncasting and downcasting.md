## Upcasting и Downcasting

**Кастинг (casting)** — это преобразование объекта одного типа в другой в рамках иерархии наследования.

---

## Upcasting (приведение вверх)

Преобразование объекта наследника к типу базового класса.

```csharp
Mentor mentor = new Mentor("John", 10);

Person person = mentor;
```

или

```csharp
Person person = new Student("Jim", 5);
```

---

### Почему это работает?

Потому что:

```text
Mentor IS-A Person
Student IS-A Person
```

Каждый студент является человеком, поэтому такое преобразование безопасно.

---

### Особенность

После upcasting доступны только члены базового класса:

```csharp
Person person = new Mentor("John", 10);

person.ShowName(); // можно
```

---

Но:

```csharp
person.NumberOfStudents;
```

Ошибка.

Переменная имеет тип:

```csharp
Person
```

а у `Person` такого свойства нет.

---

## Downcasting (приведение вниз)

Обратное преобразование:

```csharp
Person person = new Student("Jim", 5);

Student student = (Student)person;
```

---

Теперь доступны члены класса `Student`:

```csharp
Console.WriteLine(student.AvgScore);
```

---

### Почему нужен явный каст?

Компилятор не знает, какой объект реально хранится внутри:

```csharp
Person person
```

Это может быть:

```csharp
Student
Mentor
```

или любой другой наследник.

Поэтому требуется явное приведение:

```csharp
(Student)person
```

---

## Опасность Downcasting

```csharp
Person person = new Mentor("John", 10);

Student student = (Student)person;
```

Во время выполнения возникнет:

```text
InvalidCastException
```

Потому что объект `Mentor` нельзя превратить в `Student`.

---

## Безопасное приведение через `is`

```csharp
if (person is Student)
{
    Student student = (Student)person;
}
```

---

## Современный вариант

```csharp
if (person is Student student)
{
    Console.WriteLine(student.AvgScore);
}
```

---

## Оператор `as`

Возвращает `null`, если приведение невозможно:

```csharp
Student student = person as Student;

if (student != null)
{
    Console.WriteLine(student.AvgScore);
}
```
## Связь Is-A

**Is-A** ("является") — это отношение наследования, когда один класс является частным случаем другого класса.

Примеры:

```text
Рыцарь является воином
Варвар является воином
Кошка является животным
Автомобиль является транспортом
```

В C# связь Is-A реализуется через наследование:

```csharp
class Child : Parent
{
}
```

---

## Базовый класс

```csharp
class Warrior
{
    protected int Health;
    protected int Armor;
    protected int Damage;

    public void TakeDamage(int damage)
    {
        Health -= damage - Armor;
    }
}
```

Класс `Warrior` содержит всё общее для всех воинов:

```text
Здоровье
Броня
Урон
Получение урона
```

---

## Наследование

```csharp
class Knight : Warrior
{
}
```

```text
Knight Is-A Warrior
(Рыцарь является воином)
```

---

```csharp
class Barbarian : Warrior
{
}
```

```text
Barbarian Is-A Warrior
(Варвар является воином)
```

---

## Вызов конструктора базового класса

```csharp
public Knight(int health, int armor, int damage)
    : base(health, armor, damage)
{
}
```

`base(...)` вызывает конструктор родительского класса:

```csharp
Warrior(...)
```

То есть сначала создаётся часть объекта `Warrior`, а затем часть `Knight`.

---

## protected

```csharp
protected int Health;
protected int Armor;
protected int Damage;
```

`protected` означает:

```text
Доступно внутри класса
+
Доступно во всех наследниках
```

Поэтому:

```csharp
Armor += 2;
```

работает внутри `Knight`.

---

Если бы было:

```csharp
private int Armor;
```

код не скомпилировался бы.

---

## Собственное поведение наследников

Рыцарь:

```csharp
public void Pray()
{
    Armor += 2;
}
```

Может усиливать броню.

---

Варвар:

```csharp
public void Shout()
{
    Armor -= 2;
    Health += 10;
}
```

Жертвует бронёй ради здоровья.

---

## Использование общего метода

Несмотря на разные классы:

```csharp
Knight warrior1 = new Knight(...);
Barbarian warrior2 = new Barbarian(...);
```

оба могут использовать:

```csharp
TakeDamage(...)
```

потому что этот метод наследуется от `Warrior`.

---

## Преимущество наследования

Без наследования пришлось бы дублировать код:

```csharp
Health
Armor
Damage
TakeDamage()
```

в каждом классе.

С наследованием общий код хранится в одном месте.

---

## Полиморфизм через Is-A

Так как:

```text
Knight Is-A Warrior
Barbarian Is-A Warrior
```

можно написать:

```csharp
Warrior warrior = new Knight(100, 10, 15);
```

или

```csharp
Warrior warrior = new Barbarian(100, 1, 7, 2);
```

и работать с ними через тип `Warrior`.

---

## Кратко

```text
Is-A = наследование

Knight Is-A Warrior
Barbarian Is-A Warrior

Наследник получает поля и методы базового класса.
```
## TryParse

```csharp
string entered = Console.ReadLine();

// int.Parse() выбросит FormatException, если введено не число
// int num1 = int.Parse(entered);

int num1;

bool isNumber = int.TryParse(entered, out num1);
// TryParse пытается преобразовать строку в int.
// Если успешно:
//   isNumber = true, num1 = введённое число
// Если неуспешно:
//   isNumber = false, num1 = 0

if (isNumber)
{
    num1++; // увеличиваем только если ввод корректный
    Console.WriteLine($"Your number ++: {num1}");
}
else
{
    Console.WriteLine("Enter correct number!");
}

Console.ReadKey();
```

---

## Случайное число:

```csharp
Random random = new Random(); // Объект типа Random
int randomNumber = random.Next(1, 101); // Генерация случайного числа от 1 до 100 (верхняя граница не включается)

```

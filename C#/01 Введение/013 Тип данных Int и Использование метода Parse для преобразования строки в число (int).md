## Тип данных Int и почему в него нельзя поместить строку

```csharp
int myNumber = 0;

string myString = Console.ReadLine();

myNumber = int.Parse(myString); // Преобразование строки в число

Console.WriteLine("myNumber = " + myNumber);
Console.ReadKey();
```
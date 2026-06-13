## Управляющие символы r и n, а также Thread.Sleep

```csharp
string myStr = "Hi \n Hi"; // Разрыв строки
string myStr1 = "Hi \r\n Hi"; // Разрыв строки

for (int i = 10; i >= 0; i--)
{
    Console.WriteLine(i);
    Console.WriteLine(myStr);
    Thread.Sleep(1000); // Задержна на 1000мс
}

Console.ReadKey();
```
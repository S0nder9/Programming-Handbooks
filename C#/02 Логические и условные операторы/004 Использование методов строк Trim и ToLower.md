```csharp
string? userAnswer = Console.ReadLine();

string newStr = userAnswer.Trim(); // Убирает пробелы в начале и в конце слова
string newStr1 = userAnswer.ToLower(); // Меняет регистр на маленький
string newStr2 = userAnswer.ToUpper(); // Меняет регистр на большой

// или можно комбинировать:

string newStr3 = userAnswer.Trim().ToLower();
```

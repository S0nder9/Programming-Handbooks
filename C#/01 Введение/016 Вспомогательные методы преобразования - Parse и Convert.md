```csharp

string numberStr = "123"; // Нельзя использовать что-то, кроме чисел в этой строке, иначе будет исключение при попытке преобразования
int res = int.Parse(numberStr);

string myBoolStr = "true";
bool myBool = Convert.ToBoolean(myBoolStr);

Console.WriteLine(myBoolStr);

Console.ReadKey();

```
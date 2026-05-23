## Метод с параметром

```csharp

void WriteSomething()
{
    Console.WriteLine("Sd");
}
WriteSomething();

void WriteSpec(string myString) // Метод с парметром
{
    Console.WriteLine(myString);
}

WriteSpec("123");


Console.ReadKey();
```

---

## Метод с 2 параметрами

```csharp
int AddTwoValues(int value1, int value2)
{
    int res = value1 + value2;
    return res;
}

Console.WriteLine(AddTwoValues(1, 2));
```


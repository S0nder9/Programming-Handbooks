##  Вынос методов за пределы Main-метода


`Static` - это ключевое слово, которое используется для объявления статического метода.

```csharp
namespace OldStyle
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int result = Two(5); // вызываем метод и передаём число 5

            Console.WriteLine(result); // выведет 10
        }

        static int Two(int number1)
        {
            int res = number1 * 2;
            return res;
        }
    }
}
```

Благодаря статическому методу мы можем выносить его за пределы Main-метода и использовать.


# Глава 28: Обработка ошибок - Отсутствие типа ошибки и класс Exception

# Обработка ошибок в Python - это важная часть программирования, которая позволяет вашему коду корректно справляться с ошибками во время выполнения.
# В Python существует несколько способов обработки ошибок, и одним из ключевых понятий в этом процессе является класс Exception и его использование.

# В этой главе мы рассмотрим, что такое класс Exception, как он работает, как его можно использовать для обработки ошибок, а также как понять, когда возникает ошибка, если у вас нет конкретного типа ошибки.

# 1. Что такое класс Exception?

# Класс Exception является базовым классом для всех исключений в Python. Когда происходит ошибка, Python генерирует исключение, которое можно перехватить и обработать с помощью конструкции try...except.
# Исключения помогают нам узнать о проблемах в нашем коде и принять меры для их устранения.

# Пример создания и использования исключений с базовым классом Exception:
try:
    # Попробуем выполнить код, который может вызвать ошибку
    result = 10 / 0
except Exception as e:
    # Если возникает ошибка, будет выполнен этот блок
    print(f"Произошла ошибка: {e}")

# В этом примере попытка деления на ноль вызывает ошибку ZeroDivisionError. Так как ZeroDivisionError является подклассом Exception,
# мы можем перехватить её через базовый класс Exception. Объект e содержит информацию об ошибке, которую можно вывести или обработать.

# 2. Отсутствие типа ошибки и как его обрабатывать

# В некоторых случаях вам может потребоваться перехватить все ошибки, независимо от их типа. В таких ситуациях использование базового класса Exception позволяет обработать любые исключения.

# Пример перехвата всех исключений:
try:
    # Код, который может вызвать разные ошибки
    data = {"key": "value"}
    value = data["non_existent_key"]  # Попробуем получить значение по несуществующему ключу
except Exception as e:
    # Перехватываем любую ошибку и выводим её описание
    print(f"Произошла ошибка: {e}")

# В этом примере KeyError возникает при попытке доступа к несуществующему ключу в словаре, но мы перехватываем его как Exception и выводим сообщение об ошибке.

# 3. Как можно использовать класс Exception для создания пользовательских исключений

# Вы также можете создавать собственные классы исключений, наследуясь от класса Exception. Это полезно, когда вы хотите создать специфичные для вашей программы ошибки.

# Пример создания пользовательского исключения:
class CustomError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

# Пример использования пользовательского исключения:
def risky_function():
    raise CustomError("Это пользовательская ошибка!")

try:
    risky_function()
except CustomError as e:
    print(f"Произошла ошибка: {e}")

# В этом примере CustomError наследует от Exception и мы создаем собственное исключение с определенным сообщением. 
# Это позволяет нам более точно обрабатывать ошибки, специфичные для нашей программы.

# 4. Итог

# Класс Exception и конструкция try...except являются основными инструментами для обработки ошибок в Python. 
# Использование класса Exception позволяет вам перехватывать любые ошибки и предотвращать аварийные завершения программы.
# Вы также можете создавать свои собственные исключения для более точной обработки ошибок в вашей программе.
# Понимание того, как работать с Exception и перехватывать ошибки, является важной частью написания надежного кода в Python.


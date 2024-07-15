# Глава 28: Обработка ошибок - Разные типы ошибок в разных блоках except

# В Python для обработки ошибок используется конструкция try-except.
# Это позволяет вашему коду продолжать выполнение даже в случае возникновения исключений (ошибок).
# В этой главе мы рассмотрим, как можно обрабатывать разные типы ошибок с помощью различных блоков except.

# Основные концепции обработки ошибок в Python:

# 1. Что такое try-except блоки?
# try-except блоки используются для перехвата и обработки исключений, которые могут возникнуть в вашем коде.
# Блок try содержит код, который может вызвать исключение, а блок except содержит код для обработки этого исключения.

# 2. Как работают разные блоки except?
# Вы можете иметь несколько блоков except, чтобы обработать различные типы ошибок по-разному.
# Например, вы можете обрабатывать ошибки деления на ноль отдельно от ошибок доступа к несуществующему элементу списка.

# Пример базовой структуры try-except:
try:
    # Код, который может вызвать исключение
    result = 10 / 0
except ZeroDivisionError:
    # Обработка исключения деления на ноль
    print("Ошибка: Деление на ноль")

# Пример с несколькими блоками except для разных типов ошибок:
try:
    # Код, который может вызвать несколько типов исключений
    numbers = [1, 2, 3]
    result = numbers[5]  # Эта строка вызовет исключение IndexError
    result = 10 / 0  # Эта строка вызовет исключение ZeroDivisionError
except IndexError:
    # Обработка исключения индекса вне диапазона списка
    print("Ошибка: Индекс вне диапазона списка")
except ZeroDivisionError:
    # Обработка исключения деления на ноль
    print("Ошибка: Деление на ноль")
except Exception as e:
    # Обработка всех остальных исключений
    print(f"Произошла ошибка: {e}")

# Пример с блоком else и finally
try:
    # Код, который может вызвать исключение
    result = 10 / 2
except ZeroDivisionError:
    # Обработка исключения деления на ноль
    print("Ошибка: Деление на ноль")
else:
    # Код, который выполняется, если исключение не произошло
    print(f"Результат: {result}")
finally:
    # Код, который выполняется всегда, независимо от того, произошло исключение или нет
    print("Блок finally выполнен")

# Пример с перехватом исключений по типам и с помощью конструкции as
try:
    # Код, который может вызвать исключение
    result = int("abc")  # Эта строка вызовет исключение ValueError
except ValueError as e:
    # Обработка исключения преобразования строки в число
    print(f"Ошибка преобразования строки в число: {e}")
except (TypeError, KeyError) as e:
    # Обработка исключений нескольких типов
    print(f"Произошла ошибка: {e}")

# Итог
# В Python вы можете обрабатывать разные типы ошибок с помощью различных блоков except.
# Это позволяет более точно контролировать, как ваша программа реагирует на различные исключения.
# Использование конструкций try-except, а также блоков else и finally, помогает улучшить надежность и устойчивость вашего кода.
# Понимание этих конструкций важно для написания качественного кода, который может справляться с ошибками и исключениями.


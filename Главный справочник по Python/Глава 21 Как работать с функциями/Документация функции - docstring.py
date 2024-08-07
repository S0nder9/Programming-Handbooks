# Глава 21: Как работать с функциями - Документация функции - docstring

# В Python очень важно документировать ваш код, чтобы он был понятен не только вам, но и другим разработчикам.
# Одним из способов документирования функций в Python является использование docstring (документирующих строк).

# Docstring - это строковый литерал, который используется для описания назначения функции, ее параметров и возвращаемого значения.
# Он размещается непосредственно под объявлением функции и заключается в тройные кавычки (''' или """).

# Зачем использовать docstring?
# Docstring помогает объяснить, что делает функция, какие параметры она принимает, что она возвращает и любые другие важные детали.
# Это особенно полезно для больших проектов или когда вы работаете в команде, так как помогает всем разработчикам лучше понимать код.

# Где использовать docstring?
# Docstring должен быть размещен сразу после строки объявления функции.
# Он может также использоваться в модулях и классах для их документирования.

# Как создать docstring?
# Чтобы создать docstring, поместите строковый литерал с описанием функции непосредственно под ее объявлением.
# Вы можете использовать тройные одинарные (''') или двойные (""") кавычки.

# Пример функции с docstring

def add(a, b):
    """
    Функция add принимает два числа и возвращает их сумму.
    
    Параметры:
    a (int, float): Первое число.
    b (int, float): Второе число.
    
    Возвращает:
    int, float: Сумма двух чисел.
    
    Примеры:
    >>> add(2, 3)
    5
    >>> add(5.5, 4.5)
    10.0
    """
    return a + b

# Вы можете получить доступ к docstring функции с помощью атрибута __doc__.
print(add.__doc__)

# Итог
# Использование docstring для документирования функций является важной практикой в Python.
# Это помогает создавать более понятный и поддерживаемый код, который легко читается и используется другими разработчиками.
# Docstring позволяет быстро понять, что делает функция, какие параметры она принимает и что возвращает, без необходимости погружаться в детали реализации.

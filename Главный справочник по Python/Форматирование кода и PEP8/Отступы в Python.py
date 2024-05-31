# Глава 1: Основные концепции в Python

# Функция dir и атрибуты объектов

# Функция dir() в Python возвращает список всех атрибутов и методов объекта, переданного в качестве параметра.
# Она используется для изучения структуры объекта, чтобы понять, какие атрибуты и методы доступны для использования.

# Зачем используется функция dir():
# - Для изучения доступных атрибутов и методов объекта.
# - Для отладки и анализа кода.
# - Для исследования структуры встроенных объектов и модулей.

# Как использовать функцию dir():
# - Вызвать функцию dir() с объектом в качестве параметра.
# - Результатом будет список строк, содержащих имена атрибутов и методов объекта.

# Несколько примеров:

# Пример 1: Использование функции dir() для изучения атрибутов и методов строкового объекта.
s = "Hello, World!"
print(dir(s))

# Пример 2: Использование функции dir() для изучения атрибутов и методов списка.
my_list = [1, 2, 3, 4, 5]
print(dir(my_list))

# Пример 3: Использование функции dir() для изучения атрибутов и методов модуля math.
import math
print(dir(math))

# Итог:
# Функция dir() является полезным инструментом для исследования структуры объектов в Python.
# Она позволяет получить список доступных атрибутов и методов, что помогает разработчику лучше понять объект и его возможности.


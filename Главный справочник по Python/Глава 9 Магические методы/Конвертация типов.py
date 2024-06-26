# Глава 9: Магические методы - Конвертация типов

# Магические методы (или дандер-методы) в Python - это специальные методы, которые позволяют нам определять поведение наших объектов
# при использовании встроенных функций и операций. Одним из таких применений является конвертация типов.

# Основные магические методы для конвертации типов:

# __str__(self)
# Этот метод вызывается при использовании функции str() и при попытке вывести объект с помощью print().
# Он должен возвращать строковое представление объекта.

class MyClass:
    def __init__(self, value):
        self.value = value
    
    def __str__(self):
        return f"MyClass with value: {self.value}"

obj = MyClass(10)
print(str(obj))  # Вывод: MyClass with value: 10

# __repr__(self)
# Этот метод вызывается при использовании функции repr(). Он должен возвращать строковое представление объекта, которое может быть использовано для его восстановления.
# Обычно используется для отладки.

class MyClass:
    def __init__(self, value):
        self.value = value
    
    def __repr__(self):
        return f"MyClass({self.value})"

obj = MyClass(10)
print(repr(obj))  # Вывод: MyClass(10)

# __int__(self)
# Этот метод вызывается при использовании функции int(). Он должен возвращать целочисленное представление объекта.

class MyClass:
    def __init__(self, value):
        self.value = value
    
    def __int__(self):
        return int(self.value)

obj = MyClass("10")
print(int(obj))  # Вывод: 10

# __float__(self)
# Этот метод вызывается при использовании функции float(). Он должен возвращать вещественное представление объекта.

class MyClass:
    def __init__(self, value):
        self.value = value
    
    def __float__(self):
        return float(self.value)

obj = MyClass("10.5")
print(float(obj))  # Вывод: 10.5

# __bool__(self)
# Этот метод вызывается при использовании функции bool(). Он должен возвращать булево представление объекта.

class MyClass:
    def __init__(self, value):
        self.value = value
    
    def __bool__(self):
        return bool(self.value)

obj = MyClass(0)
print(bool(obj))  # Вывод: False

obj = MyClass(10)
print(bool(obj))  # Вывод: True

# __bytes__(self)
# Этот метод вызывается при использовании функции bytes(). Он должен возвращать байтовое представление объекта.

class MyClass:
    def __init__(self, value):
        self.value = value
    
    def __bytes__(self):
        return bytes(self.value, 'utf-8')

obj = MyClass("hello")
print(bytes(obj))  # Вывод: b'hello'

# Итог
# Магические методы для конвертации типов предоставляют удобный способ контролировать, как объекты ваших классов будут вести себя
# при преобразовании в различные типы. Это важная часть создания гибких и удобных в использовании классов в Python.

# Глава 29: Распаковка списков и кортежей

# Распаковка списков и кортежей
# Распаковка (или деструктуризация) - это процесс разбиения коллекции на отдельные переменные.
# В Python можно распаковывать списки и кортежи, что позволяет присваивать значения из них отдельным переменным.

# Зачем используется распаковка списков и кортежей?
# Распаковка удобна для повышения читабельности и упрощения кода, когда нужно работать с элементами списка или кортежа по отдельности.
# Это позволяет легко присваивать значения множеству переменных из одной коллекции, избегая использования индексов.

# Как используется распаковка списков и кортежей?
# Чтобы распаковать список или кортеж, нужно просто присвоить его переменным через запятую.
# Также можно использовать оператор * для распаковки оставшихся элементов.

# Примеры

# Пример распаковки кортежа
tuple_example = (1, 2, 3)
a, b, c = tuple_example
print("a:", a)  # a: 1
print("b:", b)  # b: 2
print("c:", c)  # c: 3

# Пример распаковки списка
list_example = [4, 5, 6]
x, y, z = list_example
print("x:", x)  # x: 4
print("y:", y)  # y: 5
print("z:", z)  # z: 6

# Использование оператора * для распаковки
numbers = [1, 2, 3, 4, 5]
first, *middle, last = numbers
print("first:", first)      # first: 1
print("middle:", middle)    # middle: [2, 3, 4]
print("last:", last)        # last: 5

# Распаковка с использованием функции
def get_coordinates():
    return (45.0, 90.0)

latitude, longitude = get_coordinates()
print("Широта:", latitude)  # Широта: 45.0
print("Долгота:", longitude)  # Долгота: 90.0

# Распаковка вложенных структур
nested_list = [1, [2, 3], 4]
a, (b, c), d = nested_list
print("a:", a)  # a: 1
print("b:", b)  # b: 2
print("c:", c)  # c: 3
print("d:", d)  # d: 4

# Итог
# Распаковка списков и кортежей - мощная возможность Python, которая позволяет более удобно и читаемо работать с коллекциями данных.
# Это особенно полезно при работе с функциями, которые возвращают несколько значений, а также для улучшения структуры кода при работе со сложными данными.
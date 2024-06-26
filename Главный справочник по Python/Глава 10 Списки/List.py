# Глава 10: Списки - list

# В Python списки (list) являются одним из основных встроенных типов данных.
# Списки представляют собой упорядоченные изменяемые коллекции элементов.
# Они позволяют хранить наборы элементов любого типа и предоставляют множество методов для работы с ними.

# Основные методы списков:

# 1. append(x)
# Добавляет элемент x в конец списка.
my_list = [1, 2, 3]
my_list.append(4)
print("После append:", my_list)  # [1, 2, 3, 4]

# 2. extend(iterable)
# Расширяет список, добавляя все элементы из переданного итерируемого объекта (например, другого списка).
my_list.extend([5, 6])
print("После extend:", my_list)  # [1, 2, 3, 4, 5, 6]

# 3. insert(i, x)
# Вставляет элемент x в список по индексу i.
my_list.insert(2, 'a')
print("После insert:", my_list)  # [1, 2, 'a', 3, 4, 5, 6]

# 4. remove(x)
# Удаляет первый элемент из списка, имеющий значение x.
my_list.remove('a')
print("После remove:", my_list)  # [1, 2, 3, 4, 5, 6]

# 5. pop([i])
# Удаляет и возвращает элемент списка по индексу i. Если индекс не указан, удаляет и возвращает последний элемент.
removed_element = my_list.pop(1)
print("После pop(1):", my_list)  # [1, 3, 4, 5, 6]
print("Удаленный элемент:", removed_element)  # 2

# 6. clear()
# Удаляет все элементы из списка.
my_list.clear()
print("После clear:", my_list)  # []

# 7. index(x, [start], [end])
# Возвращает индекс первого элемента со значением x (при необходимости в указанном диапазоне).
my_list = [1, 2, 3, 4, 3]
index = my_list.index(3)
print("Индекс первого вхождения 3:", index)  # 2

# 8. count(x)
# Возвращает количество элементов в списке со значением x.
count = my_list.count(3)
print("Количество вхождений 3:", count)  # 2

# 9. sort(key=None, reverse=False)
# Сортирует элементы списка на месте (аргументы могут использоваться для настройки сортировки).
my_list.sort()
print("После sort:", my_list)  # [1, 2, 3, 3, 4]
my_list.sort(reverse=True)
print("После sort(reverse=True):", my_list)  # [4, 3, 3, 2, 1]

# 10. reverse()
# Разворачивает порядок элементов в списке.
my_list.reverse()
print("После reverse:", my_list)  # [1, 2, 3, 3, 4]

# 11. copy()
# Возвращает поверхностную копию списка.
my_list_copy = my_list.copy()
print("Копия списка:", my_list_copy)  # [1, 2, 3, 3, 4]

# Итог
# Списки в Python предоставляют мощные и гибкие средства для хранения и управления наборами данных.
# Знание и использование основных методов списков позволяет эффективно выполнять различные операции с коллекциями элементов.

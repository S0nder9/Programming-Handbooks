# Глава 11: Словари - Резюме по словарям __doc__

# В Python словари (dictionaries) являются одной из основных встроенных структур данных.
# Они представляют собой неупорядоченные коллекции пар "ключ-значение", где ключи уникальны в пределах одного словаря.

# Определение словаря
# Словарь можно определить с помощью фигурных скобок {} или функции dict().
# Пример:
my_dict = {
    "ключ1": "значение1",
    "ключ2": "значение2",
    "ключ3": "значение3"
}

# Словарь также можно создать с помощью функции dict():
another_dict = dict(ключ1="значение1", ключ2="значение2", ключ3="значение3")

# Доступ к значениям в словаре осуществляется через ключи.
# Пример:
print(my_dict["ключ1"])  # Вывод: значение1

# Методы словарей
# Словари обладают множеством встроенных методов, которые упрощают работу с ними.
# Рассмотрим основные методы:

# 1. Метод get()
# Метод get() возвращает значение для заданного ключа. Если ключ не найден, возвращается None (или значение по умолчанию, если оно указано).
value = my_dict.get("ключ1")
print(value)  # Вывод: значение1
value = my_dict.get("ключ4", "значение по умолчанию")
print(value)  # Вывод: значение по умолчанию

# 2. Метод keys()
# Метод keys() возвращает объект представления, содержащий все ключи словаря.
keys = my_dict.keys()
print(keys)  # Вывод: dict_keys(['ключ1', 'ключ2', 'ключ3'])

# 3. Метод values()
# Метод values() возвращает объект представления, содержащий все значения словаря.
values = my_dict.values()
print(values)  # Вывод: dict_values(['значение1', 'значение2', 'значение3'])

# 4. Метод items()
# Метод items() возвращает объект представления, содержащий все пары "ключ-значение" в словаре.
items = my_dict.items()
print(items)  # Вывод: dict_items([('ключ1', 'значение1'), ('ключ2', 'значение2'), ('ключ3', 'значение3')])

# 5. Метод update()
# Метод update() обновляет словарь, добавляя пары "ключ-значение" из другого словаря или итерируемого объекта пар.
new_entries = {"ключ4": "значение4", "ключ5": "значение5"}
my_dict.update(new_entries)
print(my_dict)  # Вывод: {'ключ1': 'значение1', 'ключ2': 'значение2', 'ключ3': 'значение3', 'ключ4': 'значение4', 'ключ5': 'значение5'}

# 6. Метод pop()
# Метод pop() удаляет элемент с заданным ключом и возвращает его значение. Если ключ не найден, возвращается ошибка KeyError (или значение по умолчанию, если оно указано).
value = my_dict.pop("ключ1")
print(value)  # Вывод: значение1
print(my_dict)  # Вывод: {'ключ2': 'значение2', 'ключ3': 'значение3', 'ключ4': 'значение4', 'ключ5': 'значение5'}

# 7. Метод clear()
# Метод clear() удаляет все элементы из словаря.
my_dict.clear()
print(my_dict)  # Вывод: {}

# Итог
# Словари являются мощным инструментом для хранения и управления данными в виде пар "ключ-значение".
# Они предоставляют широкий набор методов для выполнения различных операций, таких как доступ к значениям, обновление данных, удаление элементов и многое другое.
# Понимание и умение использовать словари и их методы является важной частью работы с данными в Python.
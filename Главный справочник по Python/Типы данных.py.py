# Целое число (int):
integer = 1

# Дробное число (float):
float_num = 10.10

# Строка (string):
string = "String"
string2 = 'String2'

# Логическое значение (boolean):
boolean_true = True
boolean_false = False

# Список (list):
list_example = [100000000000, 894275980, 88888.8, 9013e9999999999999]
list_example2 = list(string)  # Преобразование строки в список

print(list_example[3])  # Вывод четвёртого элемента списка
print(list_example[-1])  # Вывод последнего элемента списка
print(len(list_example))  # Вывод длины списка

# Множество (set):
set_example = set()
set_example.add(10)  # Добавление элемента во множество
set_example.add(10)  # Повторное добавление элемента (не добавится, так как множество хранит только уникальные элементы)
print(set_example)

# Словарь (dictionary):
dict_example = {
    "key": "value",
    "key1": 10
}

print(dict_example["key1"])  # Вывод значения, связанного с ключом "key1"

dict_example["key"] = "mainKey"  # Изменение значения, связанного с ключом "key"

print(dict_example["key"])  # Вывод изменённого значения

# Кортеж (tuple):
tuple_example = (1, 2, 3, 4, 5, 6)

# Изменяемые типы данных: словарь, список, множество
# Неизменяемые типы данных: строка, число, кортеж

print(type(integer))  # Вывод типа переменной integer
print(str(integer))  # Преобразование числа в строку и вывод

 # Объявление переменных
a = 5
b = 10

    # Операции с числами
print("Сложение:", a + b)
print("Вычитание:", a - b)
print("Деление:", a / b)
print("Целочисленное деление:", a // b)
print("Умножение:", a * b)
print("Возведение в степень:", a ** b)
print("Остаток от деления:", a % b)

    # Проверка на четность
if a % 2 == 0:
    print("Число a четное")
else:
    print("Число a нечетное")
    
if b % 2 == 0:
    print("Число b четное")
else:
    print("Число b нечетное")

    # Дополнительные примеры
c = 7
d = 3
print("Дополнительные примеры:")
print("Возведение 7 в степень 3:", c ** d)
print("Остаток от деления 7 на 3:", c % d)
if c % 2 == 0:
    print("Число c четное")
else:
    print("Число c нечетное")
    
if d % 2 == 0:
    print("Число d четное")
else:
    print("Число d нечетное")

    # Вывод значений переменных
print(f"Значения переменных: a = {a}, b = {b}, c = {c}, d = {d}")
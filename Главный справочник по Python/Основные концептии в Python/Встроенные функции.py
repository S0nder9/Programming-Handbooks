# Глава 1: Основные концепции в Python

# Встроенные функции

# 1. Функции для работы со списками и последовательностями:
# - len(): возвращает длину списка или последовательности
# - max(): возвращает максимальный элемент из списка
# - min(): возвращает минимальный элемент из списка
# - sum(): возвращает сумму элементов списка

# 2. Функции для работы с числами:
# - abs(): возвращает абсолютное значение числа
# - pow(): возвращает результат возведения числа в степень
# - round(): округляет число до определенного количества знаков после запятой

# 3. Функции для работы со строками:
# - len(): возвращает длину строки
# - str(): преобразует объект в строку
# - upper(): преобразует строку в верхний регистр
# - lower(): преобразует строку в нижний регистр
# - join(): объединяет элементы списка в строку по разделителю

# 4. Функции для работы с файлами:
# - open(): открывает файл для чтения или записи
# - close(): закрывает файл
# - read(): читает содержимое файла
# - write(): записывает данные в файл

# Несколько примеров

# Примеры использования встроенных функций:

# Работа со списками
my_list = [1, 2, 3, 4, 5]
print(len(my_list))  # Выводит: 5
print(max(my_list))  # Выводит: 5
print(min(my_list))  # Выводит: 1
print(sum(my_list))  # Выводит: 15

# Работа с числами
print(abs(-10))      # Выводит: 10
print(pow(2, 3))     # Выводит: 8
print(round(3.14159, 2))  # Выводит: 3.14

# Работа со строками
my_string = "Hello, World!"
print(len(my_string))       # Выводит: 13
print(str(123))             # Выводит: '123'
print(my_string.upper())    # Выводит: 'HELLO, WORLD!'
print(my_string.lower())    # Выводит: 'hello, world!'
print('-'.join(['a', 'b', 'c']))  # Выводит: 'a-b-c'

# Работа с файлами
file = open("example.txt", "w")
file.write("Hello, Python!")
file.close()

file = open("example.txt", "r")
print(file.read())  # Выводит: 'Hello, Python!'
file.close()

# Итог
# Встроенные функции в Python предоставляют удобные инструменты для работы со списками, числами, строками и файлами.
# Они позволяют выполнять различные операции без необходимости создания пользовательских функций.

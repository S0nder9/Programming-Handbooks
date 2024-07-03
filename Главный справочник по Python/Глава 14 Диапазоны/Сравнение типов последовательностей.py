# Глава 14: Диапазоны - Сравнение типов последовательностей

# В Python существует несколько типов последовательностей, включая строки, списки, кортежи и диапазоны.
# Каждый из этих типов имеет свои особенности и используется в разных ситуациях в зависимости от задач, которые нужно решить.

# Диапазоны (range) представляют собой неизменяемую последовательность чисел и часто используются в циклах for для итерации по числовым последовательностям.
# В этой главе мы рассмотрим, как диапазоны сравниваются с другими типами последовательностей в Python.

# 1. Строки
# Строки (str) в Python представляют собой последовательности символов.
# Строки неизменяемы, что означает, что их нельзя изменять после создания.
# Примеры методов строк включают find(), upper(), lower(), split() и многие другие.

string_example = "Hello, World!"
print("Строка:", string_example)
print("Длина строки:", len(string_example))
print("Преобразование строки в верхний регистр:", string_example.upper())

# 2. Списки
# Списки (list) - это изменяемые последовательности, которые могут содержать элементы различных типов.
# Списки поддерживают различные методы, такие как append(), extend(), remove(), pop(), и т.д.

list_example = [1, 2, 3, 4, 5]
print("Список:", list_example)
print("Длина списка:", len(list_example))
list_example.append(6)
print("Список после добавления элемента:", list_example)

# 3. Кортежи
# Кортежи (tuple) - это неизменяемые последовательности, которые также могут содержать элементы различных типов.
# Кортежи похожи на списки, но их нельзя изменять после создания.

tuple_example = (1, 2, 3, 4, 5)
print("Кортеж:", tuple_example)
print("Длина кортежа:", len(tuple_example))
print("Первый элемент кортежа:", tuple_example[0])

# 4. Диапазоны
# Диапазоны (range) представляют собой неизменяемую последовательность чисел.
# Они часто используются в циклах for для генерации числовых последовательностей.
# Функция range() может принимать один, два или три аргумента: начало, конец и шаг.

range_example = range(1, 10, 2)
print("Диапазон:", list(range_example))
print("Длина диапазона:", len(range_example))

# Сравнение типов последовательностей

# 1. Изменяемость
# Строки и кортежи неизменяемы, то есть их нельзя изменять после создания.
# Списки и диапазоны изменяемы, то есть их можно изменять после создания.

# 2. Типы элементов
# Строки содержат только символы, тогда как списки, кортежи и диапазоны могут содержать элементы различных типов.
# Однако, диапазоны могут содержать только числа.

# 3. Использование памяти
# Диапазоны более эффективны по использованию памяти, так как они представляют собой генератор, а не фактическую последовательность чисел.
# Списки и кортежи хранят все свои элементы в памяти, что может быть менее эффективно.

# Итог
# Каждый тип последовательностей в Python имеет свои особенности и используется в различных сценариях.
# Строки используются для работы с текстовыми данными, списки и кортежи - для хранения коллекций элементов, а диапазоны - для генерации числовых последовательностей.
# Понимание различий между этими типами помогает выбирать наиболее подходящий инструмент для решения конкретных задач в программировании.

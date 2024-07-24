# Глава 32: Циклы - Встроенная функция filter

# Встроенная функция filter
# Функция filter() является встроенной функцией в Python, которая используется для фильтрации элементов из итерируемого объекта (например, списка) на основе определенного условия.
# Эта функция принимает два аргумента: функцию и итерируемый объект. Функция filter() применяет указанную функцию к каждому элементу итерируемого объекта и возвращает итератор с теми элементами, для которых функция вернула значение True.

# Зачем используется встроенная функция filter?
# Функция filter() полезна, когда вам нужно выбрать только те элементы из итерируемого объекта, которые удовлетворяют определенному условию.
# Это позволяет эффективно и компактно выполнять операции фильтрации данных, избегая необходимости использования явных циклов.

# Как использовать встроенную функцию filter?
# Для использования функции filter() необходимо определить условную функцию (обычно с использованием lambda) и передать ее вместе с итерируемым объектом.
# Результатом работы filter() будет итератор, который можно преобразовать в список или другой итерируемый объект.

# Несколько примеров

# Пример 1: Фильтрация четных чисел из списка
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Определяем условную функцию для проверки четности числа
def is_even(number):
    return number % 2 == 0

# Используем filter() для фильтрации четных чисел
even_numbers = filter(is_even, numbers)

# Преобразуем итератор в список и выводим результат
print(list(even_numbers))  # Вывод: [2, 4, 6, 8, 10]

# Пример 2: Фильтрация строк длиной больше 3 символов
words = ["apple", "is", "a", "fruit", "banana", "kiwi"]

# Используем lambda функцию для проверки длины строки
long_words = filter(lambda word: len(word) > 3, words)

# Преобразуем итератор в список и выводим результат
print(list(long_words))  # Вывод: ['apple', 'fruit', 'banana']

# Итог
# Встроенная функция filter() является мощным инструментом для фильтрации элементов итерируемого объекта на основе заданного условия.
# Она позволяет лаконично и эффективно выполнять фильтрацию данных, что делает код более читаемым и удобным для сопровождения.

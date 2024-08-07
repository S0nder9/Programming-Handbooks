# Глава 32: Циклы - Цикл for in

# Цикл for in является одним из основных инструментов для итерации в Python. Он позволяет проходить по элементам коллекции (например, списки, строки, кортежи и множества),
# выполняя блок кода для каждого элемента.

# Зачем используется цикл for in?
# Цикл for in используется для выполнения повторяющихся действий, таких как перебор элементов списка, обработка строковых символов, создание новой коллекции на основе существующей и многое другое.
# Это мощный и гибкий инструмент для автоматизации задач, требующих повторения.

# Где используется цикл for in?
# Цикл for in широко используется в Python-программах для различных задач, включая обработку данных, создание новых коллекций, выполнение операций над элементами и т.д.
# Он является неотъемлемой частью работы с любыми итерируемыми объектами.

# Как работает цикл for in?
# Синтаксис цикла for in прост: вы указываете переменную, которая будет принимать значение каждого элемента, и итерируемый объект, по которому будет происходить проход.
# Пример:
# for элемент in коллекция:
#     блок_кода

# Несколько примеров

# Пример 1: Перебор элементов списка
fruits = ["яблоко", "банан", "вишня"]
for fruit in fruits:
    print(fruit)
# В этом примере переменная fruit последовательно принимает значения "яблоко", "банан" и "вишня".

# Пример 2: Перебор символов строки
for char in "Python":
    print(char)
# В этом примере переменная char последовательно принимает значения 'P', 'y', 't', 'h', 'o', 'n'.

# Пример 3: Использование функции range() для создания последовательности чисел
for i in range(5):
    print(i)
# В этом примере переменная i последовательно принимает значения от 0 до 4.

# Пример 4: Итерация по ключам словаря
student_scores = {"Alice": 85, "Bob": 90, "Charlie": 78}
for student in student_scores:
    print(student, student_scores[student])
# В этом примере переменная student последовательно принимает значения "Alice", "Bob" и "Charlie", и мы выводим их имена и баллы.

# Пример 5: Использование enumerate() для получения индекса и значения
colors = ["красный", "зеленый", "синий"]
for index, color in enumerate(colors):
    print(index, color)
# В этом примере переменные index и color последовательно принимают пары значений (0, "красный"), (1, "зеленый"), (2, "синий").

# Итог
# Цикл for in является важным инструментом в Python для итерации по элементам коллекций. Он удобен для выполнения повторяющихся задач и позволяет легко обрабатывать итерируемые объекты.
# Понимание работы цикла for in и умение его применять поможет вам писать более эффективный и понятный код.

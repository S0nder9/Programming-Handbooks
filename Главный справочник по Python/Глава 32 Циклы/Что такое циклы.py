# Глава 32: Циклы

# Что такое Циклы?
# Циклы в программировании позволяют выполнять определенный блок кода несколько раз.
# Это полезно, когда нужно повторить одни и те же операции с разными значениями или пока не будет достигнуто определенное условие.

# В Python есть два основных типа циклов: цикл "for" и цикл "while".

# Цикл "for"
# Цикл "for" используется для перебора последовательности (например, списка, строки или диапазона чисел).

# Синтаксис:
# for элемент in последовательность:
#     блок кода

# Пример:
fruits = ["яблоко", "банан", "вишня"]
for fruit in fruits:
    print(fruit)

# Цикл "while"
# Цикл "while" выполняет блок кода до тех пор, пока условие истинно.

# Синтаксис:
# while условие:
#     блок кода

# Пример:
i = 1
while i < 6:
    print(i)
    i += 1

# Управление циклом
# В Python есть два ключевых слова, которые позволяют управлять выполнением циклов: "break" и "continue".

# Ключевое слово "break" используется для немедленного выхода из цикла.
# Пример:
for fruit in fruits:
    if fruit == "банан":
        break
    print(fruit)

# Ключевое слово "continue" используется для пропуска текущей итерации цикла и перехода к следующей.
# Пример:
for fruit in fruits:
    if fruit == "банан":
        continue
    print(fruit)

# Вложенные циклы
# Вы можете использовать один цикл внутри другого цикла. Это называется вложенные циклы.

# Пример:
for x in range(1, 4):
    for y in range(1, 4):
        print(f"({x}, {y})")

# Итог
# Циклы являются важной частью программирования, позволяя выполнять повторяющиеся действия с данными.
# Понимание того, как работают циклы, и умение их использовать, помогает писать более эффективные и функциональные программы.

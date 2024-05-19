# conditions_examples.py

# Условия в Python позволяют выполнять различные блоки кода в зависимости от истинности выражений.
# Основные условные операторы в Python: if, elif, else.

# 1. Конструкция if-elif-else

def check_number(x):
    """
    Эта функция проверяет, является ли число положительным, отрицательным или нулем.
    """
    # if условие: выполняется, если условие истинно
    if x > 0:
        print(f"{x} is positive")
    # elif условие: выполняется, если предыдущее условие ложно, а это условие истинно
    elif x == 0:
        print(f"{x} is zero")
    # else: выполняется, если все предыдущие условия ложны
    else:
        print(f"{x} is negative")

# Пример использования
check_number(10)  # Вывод: 10 is positive
check_number(0)   # Вывод: 0 is zero
check_number(-5)  # Вывод: -5 is negative

# 2. Вложенные условия

def nested_conditions(x, y):
    """
    Эта функция проверяет два числа и выводит соответствующее сообщение.
    """
    if x > 0:
        if y > 0:
            print(f"Both {x} and {y} are positive")
        else:
            print(f"{x} is positive, but {y} is not positive")
    else:
        print(f"{x} is not positive")

# Пример использования
nested_conditions(5, 10)  # Вывод: Both 5 and 10 are positive
nested_conditions(5, -10) # Вывод: 5 is positive, but -10 is not positive
nested_conditions(-5, 10) # Вывод: -5 is not positive

# 3. Условный оператор в одной строке (тернарный оператор)

def check_even_odd(x):
    """
    Эта функция проверяет, является ли число четным или нечетным.
    """
    # Использование тернарного оператора для коротких условий
    print(f"{x} is even") if x % 2 == 0 else print(f"{x} is odd")

# Пример использования
check_even_odd(4)  # Вывод: 4 is even
check_even_odd(7)  # Вывод: 7 is odd

# 4. Логические операторы

def logical_operators(x, y):
    """
    Эта функция демонстрирует использование логических операторов and, or.
    """
    # Логический оператор and: условие истинно, если оба выражения истинны
    if x > 0 and y > 0:
        print(f"Both {x} and {y} are positive")
    # Логический оператор or: условие истинно, если хотя бы одно выражение истинно
    if x > 0 or y > 0:
        print(f"At least one of {x} or {y} is positive")
    # Логический оператор not: возвращает истинное значение, если выражение ложно, и наоборот
    if not x > 0:
        print(f"{x} is not positive")

# Пример использования
logical_operators(5, 10)   # Вывод: Both 5 and 10 are positive
                          # Вывод: At least one of 5 or 10 is positive
logical_operators(5, -10)  # Вывод: At least one of 5 or -10 is positive
logical_operators(-5, -10) # Вывод: -5 is not positive

# 5. Сравнительные операторы

def comparative_operators(a, b):
    """
    Эта функция демонстрирует использование сравнительных операторов.
    """
    if a == b:
        print(f"{a} is equal to {b}")
    if a != b:
        print(f"{a} is not equal to {b}")
    if a > b:
        print(f"{a} is greater than {b}")
    if a < b:
        print(f"{a} is less than {b}")
    if a >= b:
        print(f"{a} is greater than or equal to {b}")
    if a <= b:
        print(f"{a} is less than or equal to {b}")

# Пример использования
comparative_operators(10, 5)  # Вывод: 10 is not equal to 5
                              # Вывод: 10 is greater than 5
                              # Вывод: 10 is greater than or equal to 5
comparative_operators(5, 5)   # Вывод: 5 is equal to 5
                              # Вывод: 5 is greater than or equal to 5
                              # Вывод: 5 is less than or equal to 5

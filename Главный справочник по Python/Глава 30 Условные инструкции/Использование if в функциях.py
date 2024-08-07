# Глава 30: Условные инструкции - Использование if в функциях

# Условные инструкции в Python используются для выполнения определенного блока кода в зависимости от условий, которые должны быть выполнены.
# Одной из наиболее распространенных условных инструкций является инструкция if.
# В этой главе мы рассмотрим, как использовать инструкцию if внутри функций для принятия решений на основе входных данных.

# Условные инструкции if, elif и else
# Инструкция if проверяет, истинно ли выражение, и если да, выполняет блок кода, связанный с этим условием.
# Инструкция elif (сокращение от "else if") позволяет проверить несколько выражений.
# Инструкция else выполняет блок кода, если все предыдущие условия являются ложными.

# Использование if в функциях
# Условные инструкции if часто используются внутри функций для выполнения различных действий в зависимости от входных параметров функции.
# Это делает функции более гибкими и способными обрабатывать различные сценарии.

# Пример функции с использованием if

def check_even_odd(number):
    """Эта функция проверяет, является ли число четным или нечетным."""
    if number % 2 == 0:
        return f"{number} является четным числом."
    else:
        return f"{number} является нечетным числом."

# Вызов функции
result = check_even_odd(10)
print(result)  # Вывод: 10 является четным числом.

result = check_even_odd(11)
print(result)  # Вывод: 11 является нечетным числом.

# Пример функции с использованием if, elif и else

def get_grade(score):
    """Эта функция возвращает оценку на основе переданного балла."""
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

# Вызов функции
grade = get_grade(85)
print(f"Оценка: {grade}")  # Вывод: Оценка: B

grade = get_grade(72)
print(f"Оценка: {grade}")  # Вывод: Оценка: C

# Условные инструкции позволяют функциям выполнять различную логику в зависимости от входных данных, что делает их более универсальными и мощными.

# Итог
# Использование условных инструкций if, elif и else внутри функций является важной концепцией в программировании на Python.
# Эти инструкции позволяют функциям принимать решения и выполнять определенные действия в зависимости от входных данных, что повышает их гибкость и функциональность.

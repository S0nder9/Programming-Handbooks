# Глава 31: Тернарный оператор

# Тернарный оператор в Python

# Тернарный оператор (или условное выражение) - это способ написать условное выражение в одной строке.
# Это позволяет сократить код и сделать его более читаемым, если используется правильно.

# Зачем используется тернарный оператор?
# Тернарный оператор используется для написания простых условных выражений в одной строке, что может сделать код более компактным и читабельным.
# Это особенно полезно, когда нужно присвоить значение переменной на основе простого условия.

# Синтаксис тернарного оператора
# В Python тернарный оператор имеет следующий синтаксис:
# <значение_если_истина> if <условие> else <значение_если_ложь>

# Где используется тернарный оператор?
# Тернарный оператор можно использовать в любых выражениях, где вам нужно выбрать одно из двух значений на основе условия.
# Он часто используется для присвоения значений переменным и для возвращения значений из функций.

# Примеры использования тернарного оператора

# Пример 1: Присвоение значения переменной
age = 18
status = "Взрослый" if age >= 18 else "Несовершеннолетний"
print("Статус:", status)
# В этом примере переменной status присваивается значение "Взрослый" если age >= 18, иначе "Несовершеннолетний".

# Пример 2: Использование тернарного оператора в функции
def check_even_or_odd(number):
    return "Четное" if number % 2 == 0 else "Нечетное"

print(check_even_or_odd(10))  # Вывод: Четное
print(check_even_or_odd(7))   # Вывод: Нечетное

# Пример 3: Тернарный оператор внутри списка
numbers = [1, 2, 3, 4, 5]
even_or_odd = ["Четное" if num % 2 == 0 else "Нечетное" for num in numbers]
print(even_or_odd)
# В этом примере используется тернарный оператор для определения, является ли число четным или нечетным, и создания нового списка с результатами.

# Итог
# Тернарный оператор - это удобный инструмент для написания компактных и читабельных условных выражений в Python.
# Он помогает сократить код и сделать его более понятным в случаях, когда условие простое и ясно.
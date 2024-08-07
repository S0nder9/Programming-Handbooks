# Глава 21: Как работать с функциями

# Ключевое слово global в функциях

# В Python ключевое слово global используется внутри функции, чтобы указать, что переменная является глобальной, а не локальной.
# По умолчанию все переменные, объявленные внутри функции, считаются локальными и доступны только внутри этой функции.
# Ключевое слово global позволяет изменить это поведение и работать с глобальными переменными внутри функции.

# Зачем используется ключевое слово global?
# Ключевое слово global используется тогда, когда нужно изменить значение глобальной переменной внутри функции.
# Это может быть полезно, когда нужно, чтобы функция изменяла состояние, которое сохраняется за пределами ее области видимости.

# Где используется ключевое слово global?
# Оно используется в тех случаях, когда необходимо, чтобы несколько функций или различные части программы имели доступ к одной и той же переменной и могли изменять ее значение.
# Например, при создании счетчика, который должен сохранять свое значение между вызовами различных функций.

# Как использовать ключевое слово global?
# Для использования ключевого слова global его необходимо указать внутри функции перед использованием переменной.
# Это позволяет функции работать с глобальной переменной, а не создавать новую локальную переменную с тем же именем.

# Несколько примеров

# Пример 1: Изменение глобальной переменной внутри функции
counter = 0

def increment_counter():
    global counter
    counter += 1

print("Начальное значение counter:", counter)  # Вывод: 0
increment_counter()
print("Значение counter после вызова функции increment_counter:", counter)  # Вывод: 1

# Пример 2: Работа с глобальной переменной в нескольких функциях
value = 10

def increase_value():
    global value
    value += 5

def decrease_value():
    global value
    value -= 3

print("Начальное значение value:", value)  # Вывод: 10
increase_value()
print("Значение value после вызова функции increase_value:", value)  # Вывод: 15
decrease_value()
print("Значение value после вызова функции decrease_value:", value)  # Вывод: 12

# Итог
# Ключевое слово global является важным инструментом в Python для работы с глобальными переменными внутри функций.
# Оно позволяет изменять значения глобальных переменных и обеспечивает возможность совместного использования данных между различными частями программы.
# Правильное использование ключевого слова global помогает избежать ошибок и сделать код более читаемым и понятным.

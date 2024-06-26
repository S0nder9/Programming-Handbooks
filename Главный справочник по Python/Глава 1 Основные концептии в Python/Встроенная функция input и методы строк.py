# Глава 1: Основные концепции в Python

# Встроенная функция input и методы строк

# В Python есть встроенная функция input(), которая позволяет вашей программе взаимодействовать с пользователем, запрашивая ввод с клавиатуры.
# Это чрезвычайно полезно, когда вы хотите, чтобы ваша программа получала данные от пользователя во время выполнения.

# Кроме того, Python предоставляет множество методов для работы со строками, которые являются основным типом данных для представления текста.
# Эти методы позволяют вам выполнять различные операции с текстом, такие как поиск подстроки, замена символов, разделение строки на подстроки и многое другое.

# Зачем используется встроенная функция input и методы строк?
# Функция input() используется тогда, когда вам нужно получить ввод от пользователя во время выполнения программы.
# Это может быть полезно, например, когда вы хотите, чтобы пользователь ввел свое имя, пароль или любую другую информацию.

# Методы строк используются во множестве сценариев, когда вам нужно манипулировать текстовыми данными.
# Например, вы можете использовать методы строк для проверки, содержит ли строка определенную подстроку, или для форматирования текста перед его выводом.

# Как использовать встроенную функцию input и методы строк?
# Для использования функции input() просто вызовите ее в своем коде, например: user_input = input("Введите ваше имя: ").
# Для использования методов строк примените их к строковой переменной, например: text.upper() для преобразования строки в верхний регистр.

# Несколько примеров

# Пример использования функции input
user_input = input("Введите ваше имя: ")
print("Привет, ", user_input)

# Пример использования методов строк
text = "Пример строки для демонстрации методов"
# Преобразование строки в верхний регистр
upper_case = text.upper()
print("Строка в верхнем регистре:", upper_case)
# Поиск подстроки в строке
substring = "для"
index = text.find(substring)
print("Индекс первого вхождения подстроки:", index)

# Итог
# Встроенная функция input и методы строк представляют собой важные инструменты для взаимодействия с пользователем и обработки текстовых данных в Python.
# Использование этих функций и методов помогает создавать более интерактивные и функциональные программы.

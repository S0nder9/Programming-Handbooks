# Глава 22: Операторы - Приоритетность операторов

# В Python, как и в большинстве языков программирования, операторы имеют определенный порядок выполнения.
# Это известно как приоритетность операторов. Понимание приоритетности операторов важно, чтобы правильно интерпретировать и писать выражения.

# Операторы с высоким приоритетом выполняются перед операторами с низким приоритетом.
# Приоритетность операторов определяет порядок выполнения операций в сложных выражениях.
# Скобки можно использовать для изменения порядка выполнения операций, если это необходимо.

# Общая таблица приоритетности операторов в Python (от самого высокого к самому низкому):
# 1.  ()                  Скобки (группировка)
# 2.  **                  Возведение в степень
# 3.  +x, -x, ~x          Унарный плюс, унарный минус, битовое НЕ
# 4.  *, /, //, %         Умножение, деление, целочисленное деление, остаток от деления
# 5.  +, -                Сложение, вычитание
# 6.  <<, >>              Битовые сдвиги влево и вправо
# 7.  &                   Битовое И
# 8.  ^                   Битовое исключающее ИЛИ
# 9.  |                   Битовое ИЛИ
# 10. ==, !=, >, >=, <, <=, is, is not, in, not in  Сравнение, тождественность, принадлежность
# 11. not                 Логическое НЕ
# 12. and                 Логическое И
# 13. or                  Логическое ИЛИ

# Примеры для иллюстрации приоритетности операторов:

# Пример 1: Возведение в степень имеет более высокий приоритет, чем умножение.
result = 2 ** 3 * 4
# Это выражение сначала вычисляет 2 ** 3, что равно 8, затем умножает 8 на 4, что равно 32.
print(result)  # Вывод: 32

# Пример 2: Унарный минус имеет более высокий приоритет, чем возведение в степень.
result = -2 ** 2
# Это выражение сначала вычисляет 2 ** 2, что равно 4, затем применяет унарный минус, что дает -4.
print(result)  # Вывод: -4

# Пример 3: Скобки изменяют порядок выполнения операций.
result = (2 + 3) * 4
# Это выражение сначала вычисляет (2 + 3), что равно 5, затем умножает 5 на 4, что равно 20.
print(result)  # Вывод: 20

# Пример 4: Операторы сравнения имеют более низкий приоритет, чем арифметические операторы.
result = 3 + 2 > 4
# Это выражение сначала вычисляет 3 + 2, что равно 5, затем сравнивает 5 > 4, что возвращает True.
print(result)  # Вывод: True

# Пример 5: Логические операторы and и or
a = True
b = False
result = a and b or a
# Это выражение сначала вычисляет a and b, что равно False, затем вычисляет False or a, что равно True.
print(result)  # Вывод: True

# Итог
# Понимание приоритетности операторов в Python необходимо для правильного написания и интерпретации сложных выражений.
# Использование скобок позволяет явно определить порядок выполнения операций, что улучшает читаемость и надежность кода.

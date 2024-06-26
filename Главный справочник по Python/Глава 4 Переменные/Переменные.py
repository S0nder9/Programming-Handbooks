# Глава 4: Переменные

# Переменные

# В Python переменные используются для хранения данных, которые могут быть использованы и изменены в ходе выполнения программы.
# Переменная в Python создается в момент присвоения ей значения.
# Имя переменной должно быть уникальным в пределах области видимости и следовать определенным правилам именования.

# Как создаются переменные?
# Для создания переменной в Python просто присвойте ей значение с помощью оператора = (равно).
# Пример:
x = 5
y = "Hello, World!"

# Правила именования переменных
# 1. Имена переменных могут содержать буквы (a-z, A-Z), цифры (0-9) и символ подчеркивания (_).
# 2. Имена переменных должны начинаться с буквы или символа подчеркивания (_), но не с цифры.
# 3. Имена переменных чувствительны к регистру, что означает, что переменные `age` и `Age` будут разными.
# 4. Не используйте зарезервированные слова (ключевые слова) Python в качестве имен переменных, такие как `class`, `for`, `if`, и т.д.

# Примеры корректных имен переменных
name = "Alice"
age = 30
is_student = True

# Примеры некорректных имен переменных
# 2name = "Bob"  # Неверно, начинается с цифры
# my-name = "Charlie"  # Неверно, содержит дефис
# class = "Physics"  # Неверно, зарезервированное слово

# Как использовать переменные?
# Переменные можно использовать для хранения различных типов данных, таких как числа, строки, списки, кортежи и т.д.
# Пример:
a = 10          # Целое число
b = 3.14        # Число с плавающей точкой
c = "Привет"    # Строка
d = [1, 2, 3]   # Список
e = (4, 5, 6)   # Кортеж

# Вывод значений переменных
print("a =", a)
print("b =", b)
print("c =", c)
print("d =", d)
print("e =", e)

# Изменение значений переменных
a = 20
c = "Hello"
d.append(4)  # Добавление элемента в список

print("Измененные значения переменных:")
print("a =", a)
print("c =", c)
print("d =", d)

# Итог
# Переменные являются фундаментальной концепцией в программировании на Python.
# Они позволяют хранить и манипулировать данными в ходе выполнения программы.
# Понимание того, как создавать, использовать и изменять переменные, является ключевым для написания эффективного кода на Python.

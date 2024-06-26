# Глава 7: Целые и другие числа в Python

# Целые числа int, метод pow, разделение чисел, int(), int(input())

# Целые числа int
# В Python целые числа представлены типом int. Этот тип используется для хранения целых чисел, как положительных, так и отрицательных, а также нуля.
# Python поддерживает произвольную точность для целых чисел, что означает, что вы можете работать с очень большими числами без потери точности.

# Примеры целых чисел:
positive_integer = 42
negative_integer = -42
zero = 0

print("Положительное целое число:", positive_integer)
print("Отрицательное целое число:", negative_integer)
print("Ноль:", zero)

# Метод pow
# Метод pow() используется для возведения числа в степень. В Python есть два способа возведения числа в степень: оператор ** и функция pow().
# Функция pow() принимает два или три аргумента. Если передаются два аргумента, то это основание и показатель степени.
# Если передаются три аргумента, то третий аргумент является модулем, и функция возвращает результат по модулю.

# Примеры использования pow():
base = 2
exponent = 3
modulus = 5

result1 = pow(base, exponent)
result2 = pow(base, exponent, modulus)

print("2 в степени 3:", result1)
print("2 в степени 3 по модулю 5:", result2)

# Разделение чисел
# В Python можно использовать символ подчеркивания (_) в числах для улучшения читаемости.
# Это особенно полезно при работе с большими числами.

# Примеры разделения чисел:
large_number = 1_000_000
binary_number = 0b1010_1010

print("Большое число с разделением:", large_number)
print("Двоичное число с разделением:", binary_number)

# Функция int()
# Функция int() используется для преобразования значений других типов данных в целое число.
# Она может принимать строку или число в качестве аргумента. Если строка не может быть преобразована в целое число, будет вызвано исключение ValueError.

# Примеры использования int():
string_number = "123"
floating_point_number = 123.456

converted_from_string = int(string_number)
converted_from_float = int(floating_point_number)

print("Преобразованная строка в int:", converted_from_string)
print("Преобразованное число с плавающей запятой в int:", converted_from_float)

# Функция int(input())
# Функция int(input()) используется для получения целого числа от пользователя.
# Сначала вызывается функция input(), которая запрашивает ввод от пользователя и возвращает строку.
# Затем функция int() преобразует эту строку в целое число.

# Пример использования int(input()):
user_input = int(input("Введите целое число: "))
print("Вы ввели число:", user_input)

# Итог
# В Python работа с целыми числами реализована через тип int, который поддерживает произвольную точность.
# Метод pow() позволяет возводить числа в степень, функция int() преобразует значения в целые числа,
# а использование int(input()) позволяет получать целые числа от пользователя.
# Эти инструменты обеспечивают мощные возможности для работы с числовыми данными в Python.

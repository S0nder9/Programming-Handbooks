# string_examples.py

# Пример работы со строками в Python

# Перебор символов строки
word = "Hello!"

for item in word:
    print(item)
    
# Конкатенация строк
print(word + ", world!")  # Вывод: Hello!, world!

# Получение длины строки
print(len(word))  # Вывод: 6

# Проверка на вхождение подстроки в строку
word2 = "pencil"

if "pen" in word2:
    print("true")  # Вывод: true

# Доступ к последнему символу строки
alphabet = "klfmo;kWARRFKOIW[OI]"

length = len(alphabet) - 1

print(alphabet[length])  # Вывод: ]

# Итерация по строке с использованием индексов
for i in range(len(alphabet)):
    print(alphabet[i])

# Итерация по строке с использованием enumerate
for ind, element in enumerate(alphabet):
    # ind - это индекс внутри итератора
    # element - это значение внутри итератора
    print(ind, element)

# Срезы строк

# Срез с 3-го по 10-й символ
print(alphabet[3:10])  # Вывод: mo;kWAR

# Срез от начала до 10 символов с конца
print(alphabet[:-10])  # Вывод: klfmo;kWARRFK

# Проверка строки на палиндром
word4 = "шалаш"

def is_palindrome(word: str) -> bool:
    """
    Эта функция проверяет, является ли слово палиндромом.
    """
    if word == word[::-1]:  # Слово будет перевернуто
        return True
    return False

print(is_palindrome(word4))  # Вывод: True
print(is_palindrome("word4"))  # Вывод: False

# Методы строк

# Пример строки
example_string = " Hello, World! "

# Приведение строки к верхнему регистру
print(example_string.upper())  # Вывод: " HELLO, WORLD! "

# Приведение строки к нижнему регистру
print(example_string.lower())  # Вывод: " hello, world! "

# Удаление пробелов в начале и конце строки
print(example_string.strip())  # Вывод: "Hello, World!"

# Замена подстроки
print(example_string.replace("World", "Python"))  # Вывод: " Hello, Python! "

# Разделение строки по разделителю
print(example_string.split(","))  # Вывод: [' Hello', ' World! ']

# Поиск подстроки в строке
print(example_string.find("World"))  # Вывод: 8

# Проверка, начинается ли строка с определенной подстроки
print(example_string.startswith(" Hello"))  # Вывод: True

# Проверка, заканчивается ли строка определенной подстрокой
print(example_string.endswith("! "))  # Вывод: True

# Форматирование строк

# Использование метода format
name = "Alice"
age = 30
greeting = "Hello, my name is {} and I am {} years old.".format(name, age)
print(greeting)  # Вывод: Hello, my name is Alice and I am 30 years old.

# f-строки (форматированные строковые литералы)
greeting_f = f"Hello, my name is {name} and I am {age} years old."
print(greeting_f)  # Вывод: Hello, my name is Alice and I am 30 years old.

# Еще примеры работы с методами строк

# Подсчет количества вхождений подстроки
example_string2 = "banana"
print(example_string2.count("a"))  # Вывод: 3

# Проверка, состоит ли строка только из цифр
print(example_string2.isdigit())  # Вывод: False

# Проверка, состоит ли строка только из букв
print(example_string2.isalpha())  # Вывод: True

# Проверка, состоит ли строка только из букв и цифр
print(example_string2.isalnum())  # Вывод: True

# Глава 42: Модули для работы с числами

# Модуль secrets для генерации паролей

# В Python есть встроенный модуль secrets, который предназначен для генерации криптографически безопасных случайных чисел.
# Этот модуль обычно используется для задач, требующих повышенной безопасности, таких как генерация паролей, токенов аутентификации и других данных, которые должны быть случайными и защищенными от предсказания.

# Зачем нужен модуль secrets?
# Модуль secrets необходим в тех случаях, когда требуется создание криптографически стойких случайных данных, которые нельзя предсказать.
# В отличие от псевдослучайных чисел, генерируемых с помощью модуля random, числа, сгенерированные модулем secrets, могут быть использованы в приложениях, где требуется безопасность (например, в генерации паролей или криптографических ключей).

# Как используется модуль secrets?
# Модуль secrets предоставляет несколько полезных функций, таких как:
# - secrets.token_hex(n): Генерирует случайную строку длиной n байтов, представленную в виде шестнадцатеричной строки.
# - secrets.token_urlsafe(n): Генерирует случайную строку длиной n байтов, закодированную в безопасный для URL формат.
# - secrets.choice(sequence): Возвращает случайный элемент из последовательности.
# Эти функции удобны для создания паролей, токенов и других уникальных значений, используемых в безопасности.

# Пример генерации случайного пароля с помощью модуля secrets

import secrets
import string

# Функция для генерации безопасного пароля
def generate_password(length=12):
    # Определим возможные символы для пароля: буквы, цифры и специальные символы
    characters = string.ascii_letters + string.digits + string.punctuation
    # Генерируем пароль указанной длины
    password = ''.join(secrets.choice(characters) for _ in range(length))
    return password

# Генерируем случайный пароль длиной 12 символов
password = generate_password()
print("Случайный безопасный пароль:", password)

# Пример использования token_hex для генерации токена аутентификации
token = secrets.token_hex(16)  # Генерация токена длиной 16 байтов (32 символа в hex)
print("Токен аутентификации:", token)

# Пример использования token_urlsafe для создания безопасного токена для URL
url_token = secrets.token_urlsafe(16)
print("Безопасный токен для URL:", url_token)

# Итог
# Модуль secrets предоставляет удобные и безопасные инструменты для генерации случайных чисел, которые можно использовать в приложениях, требующих криптографической стойкости.
# Он особенно полезен при создании паролей, токенов и других уникальных данных, которые должны быть защищены от предсказания.
# Модуль secrets заменяет использование более простых, но менее безопасных генераторов случайных чисел в тех случаях, когда безопасность имеет первостепенное значение.

# Глава 6: Строки - Диапазон

# В Python строки представляют собой последовательности символов. Мы можем работать с подстроками, используя диапазоны (или срезы).
# Диапазоны позволяют извлекать части строки, определяя начальный и конечный индексы. Это мощный инструмент для обработки текстовых данных.

# Зачем используются диапазоны строк?
# Диапазоны используются для извлечения подстрок из строки. Они позволяют удобно работать с частями строк,
# извлекая нужные фрагменты для последующей обработки или анализа. Например, можно извлечь определенные символы,
# подстроки, или даже реверсировать строку.

# Как использовать диапазоны строк?
# Синтаксис диапазонов строк следующий: string[start:stop:step]
# - start: начальный индекс (включительно). Если не указан, начинается с 0.
# - stop: конечный индекс (исключительно). Если не указан, заканчивается в конце строки.
# - step: шаг (опционально, по умолчанию 1). Указывает, через сколько символов брать следующий.

# Несколько примеров

# Пример строки
text = "Пример строки для демонстрации диапазонов"

# Извлечение подстроки с 0 по 6 символ (не включая 7)
substring = text[0:7]
print("Подстрока с 0 по 6 символ:", substring)

# Извлечение подстроки с 7 символа до конца
substring_from_7 = text[7:]
print("Подстрока с 7 символа до конца:", substring_from_7)

# Извлечение подстроки с начала до 6 символа (не включая 7)
substring_to_7 = text[:7]
print("Подстрока с начала до 6 символа:", substring_to_7)

# Извлечение подстроки с шагом 2 (каждый второй символ)
substring_step_2 = text[::2]
print("Подстрока с шагом 2:", substring_step_2)

# Реверсирование строки
reversed_text = text[::-1]
print("Реверсированная строка:", reversed_text)

# Извлечение подстроки с отрицательными индексами (с 7-го с конца до конца)
substring_negative_index = text[-7:]
print("Подстрока с отрицательными индексами (последние 7 символов):", substring_negative_index)

# Итог
# Использование диапазонов строк позволяет гибко и эффективно манипулировать текстовыми данными.
# Они предоставляют простой способ извлекать, анализировать и модифицировать части строки, что делает их важным инструментом в арсенале разработчика.

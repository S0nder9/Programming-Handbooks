# Глава 40: Работа с CSV файлами

# Чтение из CSV файлов

# CSV (Comma-Separated Values) - это простой формат файлов для представления табличных данных, таких как данные из таблицы или базы данных.
# Файлы CSV используют запятые для разделения значений, а каждая строка в файле представляет собой новую запись.

# В Python для работы с CSV файлами существует встроенный модуль csv, который предоставляет удобные методы для чтения и записи данных в CSV формате.
# В этой главе мы сосредоточимся на чтении данных из CSV файлов.

# Зачем используется чтение из CSV файлов?
# Чтение из CSV файлов позволяет загружать данные из внешних источников, таких как таблицы, экспортированные из Excel или баз данных.
# Это полезно для анализа данных, обработки информации и интеграции данных из различных систем.

# Как читать данные из CSV файлов?
# Для чтения данных из CSV файлов в Python используется модуль csv.
# Сначала необходимо открыть файл с помощью функции open(), затем создать объект reader для чтения данных, и, наконец, перебрать строки в файле для обработки.

# Пример 1: Простое чтение из CSV файла
import csv

# Открываем CSV файл
with open('example.csv', mode='r', newline='') as file:
    # Создаем объект reader
    csv_reader = csv.reader(file)
    
    # Перебираем строки в файле
    for row in csv_reader:
        # Печатаем каждую строку
        print(row)

# Пример 2: Чтение CSV файла с заголовками
import csv

# Открываем CSV файл
with open('example_with_headers.csv', mode='r', newline='') as file:
    # Создаем объект DictReader для чтения данных в виде словарей
    csv_reader = csv.DictReader(file)
    
    # Перебираем строки в файле
    for row in csv_reader:
        # Печатаем каждую строку как словарь
        print(row)

# Итог
# Чтение из CSV файлов с помощью модуля csv в Python предоставляет удобный способ загружать и обрабатывать табличные данные.
# Понимание того, как использовать csv.reader и csv.DictReader, позволяет эффективно работать с различными форматами CSV файлов и интегрировать данные из внешних источников в ваши приложения.

# Важно отметить, что при работе с CSV файлами следует учитывать кодировку файла и возможные вариации в разделителях (например, использование точек с запятой вместо запятых в некоторых регионах).

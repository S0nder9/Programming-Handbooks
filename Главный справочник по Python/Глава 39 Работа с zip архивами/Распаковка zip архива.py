# Глава 39: Работа с zip архивами - Распаковка zip архива

# В Python работа с zip архивами осуществляется с помощью встроенного модуля zipfile.
# Модуль zipfile предоставляет инструменты для создания, чтения, записи, добавления и извлечения файлов из zip архивов.
# В этом разделе мы рассмотрим, как распаковывать zip архивы с помощью модуля zipfile.

# Импортирование модуля zipfile
import zipfile
import os

# Основные концепции и методы

# Открытие zip архива
# Для открытия zip архива используйте класс ZipFile. Можно открыть архив в режиме чтения, записи или добавления.
# Для распаковки архива нам потребуется режим чтения ('r').

# Проверка содержимого zip архива
# После открытия архива можно проверить его содержимое с помощью метода namelist(), который возвращает список всех файлов и директорий в архиве.

# Извлечение файлов из zip архива
# Для извлечения всех файлов из архива используйте метод extractall(), который распакует все содержимое архива в указанную директорию.
# Можно также использовать метод extract(), чтобы извлечь отдельные файлы из архива.

# Пример: Распаковка zip архива
# Допустим, у нас есть zip архив 'example.zip', содержащий несколько файлов и директорий, и мы хотим его распаковать.

# Путь к zip архиву
zip_file_path = 'example.zip'
# Директория для распаковки содержимого архива
extract_to_directory = 'extracted_files'

# Открываем zip архив в режиме чтения
with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
    # Проверяем содержимое архива
    print("Содержимое архива:")
    for file_name in zip_ref.namelist():
        print(file_name)
    
    # Создаем директорию для распаковки, если она не существует
    if not os.path.exists(extract_to_directory):
        os.makedirs(extract_to_directory)
    
    # Распаковываем все файлы в указанную директорию
    zip_ref.extractall(extract_to_directory)
    print(f"Все файлы распакованы в директорию: {extract_to_directory}")

# Итог
# Работа с zip архивами в Python с использованием модуля zipfile является простой и удобной.
# Основные шаги включают открытие архива, проверку его содержимого и извлечение файлов.
# Эти операции позволяют легко работать с zip архивами для различных задач, таких как резервное копирование данных, передача файлов и многое другое.

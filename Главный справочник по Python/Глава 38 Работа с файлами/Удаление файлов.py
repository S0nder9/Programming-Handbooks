# Глава 38: Работа с файлами - Удаление файлов os и pathlib

# В Python есть несколько способов работы с файловой системой, включая удаление файлов.
# В этой главе мы рассмотрим два модуля, которые предоставляют функциональность для удаления файлов: os и pathlib.

# Модуль os
# Модуль os предоставляет множество функций для работы с операционной системой, включая функции для удаления файлов и директорий.

import os

# Удаление файла с помощью os.remove
# Функция os.remove(path) используется для удаления файла по указанному пути.

file_path = 'example.txt'
try:
    os.remove(file_path)
    print(f"Файл {file_path} успешно удален.")
except FileNotFoundError:
    print(f"Файл {file_path} не найден.")
except PermissionError:
    print(f"Нет разрешения на удаление файла {file_path}.")
except Exception as e:
    print(f"Ошибка при удалении файла {file_path}: {e}")

# Удаление директории с помощью os.rmdir
# Функция os.rmdir(path) используется для удаления пустой директории по указанному пути.

dir_path = 'example_dir'
try:
    os.rmdir(dir_path)
    print(f"Директория {dir_path} успешно удалена.")
except FileNotFoundError:
    print(f"Директория {dir_path} не найдена.")
except PermissionError:
    print(f"Нет разрешения на удаление директории {dir_path}.")
except OSError as e:
    print(f"Ошибка при удалении директории {dir_path}: {e}")

# Модуль pathlib
# Модуль pathlib предоставляет объектно-ориентированный интерфейс для работы с файловой системой.
# Он был добавлен в стандартную библиотеку Python начиная с версии 3.4 и является более современным и удобным для использования.

from pathlib import Path

# Удаление файла с помощью Path.unlink
# Метод Path.unlink() используется для удаления файла.

file_path = Path('example.txt')
try:
    file_path.unlink()
    print(f"Файл {file_path} успешно удален.")
except FileNotFoundError:
    print(f"Файл {file_path} не найден.")
except PermissionError:
    print(f"Нет разрешения на удаление файла {file_path}.")
except Exception as e:
    print(f"Ошибка при удалении файла {file_path}: {e}")

# Удаление директории с помощью Path.rmdir
# Метод Path.rmdir() используется для удаления пустой директории.

dir_path = Path('example_dir')
try:
    dir_path.rmdir()
    print(f"Директория {dir_path} успешно удалена.")
except FileNotFoundError:
    print(f"Директория {dir_path} не найдена.")
except PermissionError:
    print(f"Нет разрешения на удаление директории {dir_path}.")
except OSError as e:
    print(f"Ошибка при удалении директории {dir_path}: {e}")

# Итог
# Модули os и pathlib предоставляют функциональность для удаления файлов и директорий в Python.
# os является более старым и хорошо известным модулем, предоставляющим низкоуровневые функции для работы с файловой системой.
# pathlib предоставляет более современный и объектно-ориентированный подход к работе с файлами и директориями.
# Оба модуля имеют свои преимущества, и выбор между

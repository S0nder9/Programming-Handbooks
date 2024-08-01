# Глава 39: Работа с zip архивами - Создание zip архива

# В Python работа с zip архивами осуществляется с помощью модуля zipfile, который предоставляет инструменты для создания, чтения, записи и извлечения zip архивов.
# Создание zip архива может быть полезно для упаковки нескольких файлов в один архив для удобной транспортировки или хранения.

# Модуль zipfile предоставляет класс ZipFile, который используется для работы с zip архивами.

# Как создается zip архив:
# 1. Импортируйте модуль zipfile.
# 2. Откройте или создайте zip файл с помощью класса ZipFile.
# 3. Добавьте файлы в архив с помощью метода write().

import zipfile
import os

# Пример создания zip архива
def create_zip_archive(zip_name, files):
    # Создаем zip архив с именем zip_name
    with zipfile.ZipFile(zip_name, 'w') as zipf:
        for file in files:
            # Добавляем каждый файл в архив
            zipf.write(file, os.path.basename(file))
            print(f"Файл {file} добавлен в архив {zip_name}")

# Список файлов для добавления в zip архив
files_to_zip = ['file1.txt', 'file2.txt', 'file3.txt']

# Создание zip архива с именем 'archive.zip'
create_zip_archive('archive.zip', files_to_zip)

# Итог:
# Модуль zipfile позволяет легко создавать и управлять zip архивами в Python.
# Класс ZipFile и его методы, такие как write(), предоставляют удобный интерфейс для добавления файлов в архивы.
# Использование zip архивов может значительно упростить процесс хранения и передачи множества файлов.

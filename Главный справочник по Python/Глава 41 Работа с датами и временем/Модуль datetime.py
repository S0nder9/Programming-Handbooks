# Глава 41: Работа с датами и временем - Модуль datetime

# Модуль datetime
# Модуль datetime в Python предоставляет классы для работы с датами и временем.
# Он позволяет создавать, манипулировать и форматировать объекты даты и времени.

# Зачем используется модуль datetime?
# Модуль datetime используется для различных задач, связанных с датами и временем, таких как вычисление временных интервалов, форматирование дат и времени, а также их сравнение.
# Он полезен в приложениях, где требуется точное управление временем и датами, например, в календарных приложениях, системах учета времени и при работе с временными метками.

# Классы модуля datetime
# Основные классы модуля datetime:
# - datetime.date: представляет дату (год, месяц, день)
# - datetime.time: представляет время (часы, минуты, секунды, микросекунды)
# - datetime.datetime: объединяет дату и время
# - datetime.timedelta: представляет разницу между двумя датами или временами

# Создание объектов даты и времени
import datetime

# Создание объекта даты
date_object = datetime.date(2024, 8, 3)
print("Дата:", date_object)

# Создание объекта времени
time_object = datetime.time(14, 30, 45)
print("Время:", time_object)

# Создание объекта datetime
datetime_object = datetime.datetime(2024, 8, 3, 14, 30, 45)
print("Дата и время:", datetime_object)

# Методы класса datetime
# Получение текущей даты и времени
current_datetime = datetime.datetime.now()
print("Текущая дата и время:", current_datetime)

# Форматирование даты и времени
formatted_date = current_datetime.strftime("%d/%m/%Y")
print("Форматированная дата:", formatted_date)

formatted_time = current_datetime.strftime("%H:%M:%S")
print("Форматированное время:", formatted_time)

# Разбор строки даты и времени
date_string = "03/08/2024"
parsed_date = datetime.datetime.strptime(date_string, "%d/%m/%Y")
print("Разобранная дата:", parsed_date)

# Операции с объектами datetime
# Разница между двумя датами
date1 = datetime.date(2024, 8, 3)
date2 = datetime.date(2023, 8, 3)
difference = date1 - date2
print("Разница между датами:", difference.days, "дней")

# Добавление и вычитание времени с использованием timedelta
time_delta = datetime.timedelta(days=10)
new_date = date1 + time_delta
print("Новая дата (через 10 дней):", new_date)

# Итог
# Модуль datetime предоставляет мощные инструменты для работы с датами и временем в Python.
# С его помощью можно легко создавать, форматировать и манипулировать объектами даты и времени, что делает его незаменимым для многих приложений.
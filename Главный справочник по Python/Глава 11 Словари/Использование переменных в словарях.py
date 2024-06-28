# Глава 11: Словари - Использование переменных в словарях

# В Python словари (dictionaries) являются неупорядоченными коллекциями пар ключ-значение. 
# Они позволяют быстро находить значения по заданным ключам и являются одним из самых полезных и часто используемых типов данных.

# Использование переменных в словарях

# В словарях можно использовать переменные в качестве ключей и значений. Это позволяет гибко работать с данными и динамически изменять содержимое словаря.

# Зачем используются переменные в словарях?
# Переменные в словарях позволяют динамически изменять ключи и значения, что делает словари очень гибкими для хранения данных, которые могут изменяться во время выполнения программы.
# Это особенно полезно при работе с данными, которые могут обновляться или модифицироваться.

# Как используются переменные в словарях?
# Чтобы использовать переменные в словарях, достаточно присвоить переменной ключ или значение, а затем использовать эту переменную при создании или модификации словаря.

# Несколько примеров

# Пример 1: Использование переменных в качестве ключей и значений
name_key = "name"
age_key = "age"
name_value = "Alice"
age_value = 30

person = {
    name_key: name_value,
    age_key: age_value
}

print("Словарь person:", person)

# Пример 2: Обновление значений в словаре с использованием переменных
new_name_value = "Bob"
person[name_key] = new_name_value

print("Обновленный словарь person:", person)

# Пример 3: Использование переменных для динамического создания словаря
keys = ["name", "age", "city"]
values = ["Charlie", 25, "New York"]

dynamic_dict = {}
for key, value in zip(keys, values):
    dynamic_dict[key] = value

print("Динамически созданный словарь:", dynamic_dict)

# Итог
# Использование переменных в словарях позволяет гибко и динамично управлять данными.
# Это делает словари мощным инструментом для работы с изменяющимися данными и обеспечивает удобный способ хранения и поиска информации.


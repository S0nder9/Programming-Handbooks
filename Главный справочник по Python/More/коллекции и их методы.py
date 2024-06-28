# list_and_dict_examples.py

# Пример создания и работы со списками

# Создание списка с разными типами данных
_list = [10, 10, 10, 10, "word", True]

# Итерация по элементам списка
for item in _list:
    print(item)
    
# Конкатенация списков
print([10] + _list)  # Вывод: [10, 10, 10, 10, 10, 'word', True]

# Проверка наличия элемента в списке
if 10 in _list:
    print(True)  # Вывод: True
    
    # Изменение последнего элемента списка
    _list[-1] = False

# Списковое включение (list comprehension)
# Создание списка чисел от 1 до 999999
list_comprehension = [_ for _ in range(1, 1000000)]
# print(list_comprehension) # Закомментировано, чтобы избежать вывода огромного списка

# Создание списка с элементами True
f = [True for _ in range(1, 10)]

# Изменение значений в списке по условию
for ind, value in enumerate(f):
    if ind % 2 == 0:
        f[ind] = not value
print(f)  # Вывод: [False, True, False, True, False, True, False, True, False]

# Методы списков:
_listMain = [11, 11, 11, 11, "word", True]

# Добавление элемента в конец списка
_listMain.append(1)
print(_listMain)  # Вывод: [11, 11, 11, 11, 'word', True, 1]

# Добавление элемента в определенную позицию
length = len(_listMain) // 2
_listMain.insert(length, "word")
# индекс, объект
print(_listMain)  # Вывод: [11, 11, 11, 11, 'word', 'word', True, 1]

# Поиск индекса элемента
print(_listMain.index(1))  # Вывод: 7

# Удаление элемента с конца списка
var = _listMain.pop()
print(var)  # Вывод: 1
print(_listMain)  # Вывод: [11, 11, 11, 11, 'word', 'word', True]

# Удаление любого элемента
try:
    _listMain.remove("world")  # Попытка удалить элемент "world"
except ValueError:
    print("Элемент 'world' не найден в списке")

# Сортировка списка
a = [20, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
a.sort()
print(a)  # Вывод: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

# Очистка списка
a.clear()
print(a)  # Вывод: []

# Удаление списка
del a
# print(a)  # Это вызовет ошибку, так как список 'a' удален

# Расширение одного списка другим
_listMain.extend([22, 23])
print(_listMain)  # Вывод: [11, 11, 11, 11, 'word', 'word', True, 22, 23]

# Пример создания и работы со словарями

# Создание словаря
my_dict = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}

# Доступ к значениям по ключу
print(my_dict["name"])  # Вывод: Alice

# Добавление новой пары ключ-значение
my_dict["email"] = "alice@example.com"
print(my_dict)  # Вывод: {'name': 'Alice', 'age': 30, 'city': 'New York', 'email': 'alice@example.com'}

# Изменение значения по ключу
my_dict["age"] = 31
print(my_dict)  # Вывод: {'name': 'Alice', 'age': 31, 'city': 'New York', 'email': 'alice@example.com'}

# Удаление пары ключ-значение
del my_dict["city"]
print(my_dict)  # Вывод: {'name': 'Alice', 'age': 31, 'email': 'alice@example.com'}

# Получение значения по ключу с использованием метода get
print(my_dict.get("name"))  # Вывод: Alice
print(my_dict.get("city", "Not Found"))  # Вывод: Not Found

# Итерация по ключам и значениям словаря
for key, value in my_dict.items():
    print(f"{key}: {value}")

# Проверка наличия ключа в словаре
if "email" in my_dict:
    print("Email is present in the dictionary")

# Получение всех ключей и значений словаря
keys = my_dict.keys()
values = my_dict.values()
print(keys)  # Вывод: dict_keys(['name', 'age', 'email'])
print(values)  # Вывод: dict_values(['Alice', 31, 'alice@example.com'])

# Очистка словаря
my_dict.clear()
print(my_dict)  # Вывод: {}



# Метод списка sum()

def flatten_list(nested_list):
    return sum(nested_list, [])

# Пример использования
nested_list = [[1, 2, 3], [4, 5], [6, 7, 8]]
flat_list = flatten_list(nested_list)
print(flat_list)  # Вывод: [1, 2, 3, 4, 5, 6, 7, 8]

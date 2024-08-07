# Глава 13: Наборы - set

# В Python наборы (sets) представляют собой неупорядоченные коллекции уникальных элементов.
# Они могут быть полезны в различных сценариях, где требуется гарантировать уникальность элементов или выполнять быстрые операции множества, такие как объединение, пересечение и разность.

# Определение набора
# Наборы создаются с помощью фигурных скобок {} или с использованием функции set().
# Примеры:
my_set = {1, 2, 3, 4, 5}
print("Набор my_set:", my_set)

another_set = set([1, 2, 3, 2, 1])
print("Набор another_set:", another_set)

# Основные операции с наборами
# 1. Добавление элемента в набор
# Метод add() используется для добавления нового элемента в набор.
my_set.add(6)
print("Набор после добавления элемента 6:", my_set)

# 2. Удаление элемента из набора
# Методы remove() и discard() используются для удаления элементов из набора.
my_set.remove(3)  # Удаляет элемент 3 из набора. Если элемент отсутствует, вызовет ошибку.
print("Набор после удаления элемента 3:", my_set)

another_set.discard(2)  # Удаляет элемент 2 из набора. Если элемент отсутствует, ошибки не будет.
print("Набор после удаления элемента 2 методом discard:", another_set)

# 3. Проверка наличия элемента в наборе
# Оператор in используется для проверки, содержится ли элемент в наборе.
print("Содержится ли 1 в my_set?", 1 in my_set)
print("Содержится ли 10 в my_set?", 10 in my_set)

# Операции множеств
# 1. Объединение (union)
# Метод union() или оператор | объединяет два набора, возвращая новый набор, содержащий все уникальные элементы.
set1 = {1, 2, 3}
set2 = {3, 4, 5}
union_set = set1.union(set2)
print("Объединение set1 и set2:", union_set)

# 2. Пересечение (intersection)
# Метод intersection() или оператор & возвращает новый набор, содержащий только общие элементы.
intersection_set = set1.intersection(set2)
print("Пересечение set1 и set2:", intersection_set)

# 3. Разность (difference)
# Метод difference() или оператор - возвращает новый набор, содержащий элементы, которые присутствуют в первом наборе, но отсутствуют во втором.
difference_set = set1.difference(set2)
print("Разность set1 и set2:", difference_set)

# 4. Симметрическая разность (symmetric difference)
# Метод symmetric_difference() или оператор ^ возвращает новый набор, содержащий элементы, которые присутствуют в одном из наборов, но не в обоих сразу.
symmetric_difference_set = set1.symmetric_difference(set2)
print("Симметрическая разность set1 и set2:", symmetric_difference_set)

# Итерирование по набору
# Наборы поддерживают итерирование, что позволяет легко перебрать все элементы в наборе.
print("Элементы в my_set:")
for elem in my_set:
    print(elem)

# Итог
# Наборы (sets) в Python представляют собой мощный инструмент для работы с уникальными элементами и выполнения операций множества.
# Они обеспечивают высокую производительность для проверки наличия элементов и выполнения различных операций множества.
# Понимание и использование наборов помогает создавать более эффективные и логичные программы.

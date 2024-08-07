# Глава 21: Как работать с функциями

# Правила работы с функциями

# В Python функции являются одним из основополагающих блоков построения программ.
# Они позволяют группировать код в логические блоки, которые можно многократно использовать.
# Ниже приведены основные правила работы с функциями в Python, включая их определение, вызов, аргументы, возвращаемые значения и другие важные аспекты.

# Определение функции
# Функция в Python определяется с использованием ключевого слова 'def', за которым следует имя функции, список параметров в круглых скобках и двоеточие.
# Тело функции следует за строкой определения и должно быть отступлено.
def my_function():
    print("Это пример функции")

# Вызов функции
# Для вызова функции используйте имя функции, за которым следуют круглые скобки.
my_function()

# Аргументы функции
# Функции могут принимать аргументы, которые позволяют передавать данные в функцию при её вызове.
def greet(name):
    print(f"Привет, {name}")

greet("Алексей")

# Значения по умолчанию для аргументов
# Вы можете задавать значения по умолчанию для аргументов, которые будут использоваться, если значение не было передано.
def greet(name="гость"):
    print(f"Привет, {name}")

greet()
greet("Алексей")

# Возвращаемые значения
# Функции могут возвращать значения с использованием ключевого слова 'return'.
def add(a, b):
    return a + b

result = add(5, 3)
print("Результат сложения:", result)

# Локальные и глобальные переменные
# Переменные, определенные внутри функции, являются локальными и недоступны за её пределами.
# Для доступа к глобальным переменным внутри функции используйте ключевое слово 'global'.
x = 10

def modify_global():
    global x
    x = 5

modify_global()
print("Значение глобальной переменной x:", x)

# Документация функций
# Строки документации (docstrings) используются для документирования функций.
# Они размещаются сразу после строки определения функции и заключаются в тройные кавычки.
def example_function():
    """
    Это пример функции с документацией.
    Она просто выводит сообщение на экран.
    """
    print("Пример функции")

# Анонимные функции (lambda)
# Анонимные функции или lambda-функции - это небольшие однострочные функции, которые не требуют использования 'def'.
# Они могут принимать любое количество аргументов, но содержат только одно выражение.
add = lambda a, b: a + b
print("Результат сложения с lambda:", add(5, 3))

# Итог
# Работа с функциями в Python включает их определение, вызов, использование аргументов, возвращаемых значений и управление областью видимости переменных.
# Понимание этих принципов позволяет создавать чистый, читаемый и многократно используемый код.

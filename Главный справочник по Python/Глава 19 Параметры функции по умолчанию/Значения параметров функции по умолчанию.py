# Глава 19: Параметры функции по умолчанию

# В языке Python функции могут иметь параметры с значениями по умолчанию.
# Это означает, что если при вызове функции аргумент для такого параметра не передан, будет использовано значение по умолчанию.
# Это очень полезно, когда вы хотите создать функции с гибкими параметрами, которые можно не указывать при каждом вызове функции.

# Значения параметров функции по умолчанию
# Параметры функции по умолчанию задаются в заголовке функции при её определении.
# Их использование позволяет делать функции более универсальными и сокращать количество кода, так как не нужно повторять одно и то же значение во многих вызовах функции.

# Зачем используются значения параметров функции по умолчанию?
# Они используются для того, чтобы сделать функции более гибкими и удобными для использования.
# Это позволяет пользователю функции передавать только те аргументы, которые действительно необходимы для конкретного вызова, а остальные параметры будут использовать значения по умолчанию.

# Как создавать параметры функции по умолчанию?
# Для создания параметра функции с значением по умолчанию, просто укажите это значение в заголовке функции после знака "=".
# Например, def my_function(param1='default_value'):.

# Пример использования значений параметров функции по умолчанию

def greet(name, greeting="Привет"):
    print(f"{greeting}, {name}!")

# В этом примере параметр "greeting" имеет значение по умолчанию "Привет".
# Это означает, что если при вызове функции значение для этого параметра не передано, будет использовано "Привет".

# Вызов функции без указания параметра greeting
greet("Алексей")

# Вызов функции с указанием параметра greeting
greet("Алексей", "Здравствуйте")

# Пример использования значений параметров функции по умолчанию для математических вычислений

def power(base, exponent=2):
    return base ** exponent

# В этом примере параметр "exponent" имеет значение по умолчанию 2.
# Это означает, что если при вызове функции значение для этого параметра не передано, будет использовано значение 2.

# Вызов функции без указания параметра exponent
print(power(3))  # 3^2 = 9

# Вызов функции с указанием параметра exponent
print(power(3, 3))  # 3^3 = 27

# Итог
# Значения параметров функции по умолчанию - это мощный инструмент, позволяющий создавать более гибкие и удобные функции в Python.
# Они позволяют задавать стандартные значения для параметров, которые могут быть переопределены при вызове функции.
# Это делает функции более универсальными и упрощает их использование.


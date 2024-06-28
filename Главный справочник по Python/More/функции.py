# # def foo(number):
# #     return number + 10
# # foo(10)

# # def fnc(a, b):
# #     x = a * 10
# #     y = b + 10
# #     z = a + b
# #     print(x,y,z)
# #     return x + y + z
# # fnc(10, 10)

# # #Комментарий в функции

# # def f(x):
# #     """Функция, возвращающая куб x:
    
# #         Подробное описание...
# #     """
# #     return x ** 2
# # f(10)

# # f.__doc__

# # #Упаковка переменных

# # def func(*things):
# #     print (things)
    
# # func(1, 10)

# # def f(a, b, *others):
# #     print("a = ", str(a))
# #     print("b = ", str(b))
    
# #     print("others = ", others)
    
# # f(1, 2, 12, 19)

# # #Распаковка переменных

# # standart_values = [1, 2, 3]

# # def f(a, b, *others):
# #     print("a = ", str(a))
# #     print("b = ", str(b))
    
# #     print("others = ", others)
    
    
# # f(**standart_values[0], *standart_values[1], *standart_values[2])

# # #
# # from matplotlib import pyplot as plt

# # standard_args = {
# #     'color': 'green'
# # }


# # plt.plot([1, 2], [1, 3], **standard_args)

# def function_name () -> int: # Тип значения, возвращаемого функцией
#     # Тело функции
#     print("Hello")
#     a = 1
#     b = 2
#     c = a + b
#     return c
    
# function_name();


# def fn ():
#     print("Hello")


# def fn2 ():
#     a = 5 
#     b = 6
#     return a + b






# def fn_with_arg (first_digit: int, second_digit: int) -> int:
#     return first_digit + second_digit

# print(fn_with_arg(10, 11))
    



# def print_main (honey_position: list[tuple[str, int, int]]):
#     total_amount = 0
    
#     for position in honey_position:
#         # pos_name = position[0]
#         # amount = position[1]
#         # position_price = position[2]
        
#         pos_name, amount, position_price = position
#         print(f"{pos_name} ({amount}) -- {position_price}")
#         total_amount += amount * position_price
#     # pass - Функция ничего не делает
    
#     print(total_amount)

# honey_position_date = {
#     ("h", 10, 10),
#     ("a", 12, 12),
# }

# print_main(honey_position = honey_position_date)











# Функция без параметров и возвращаемого значения
def greet():
    """Функция приветствия"""
    print("Привет, мир!")

# Вызов функции greet()
greet()

# Функция с параметрами
def greet_name(name):
    """Функция приветствия с именем"""
    print("Привет,", name, "!")

# Вызов функции greet_name() с аргументом
greet_name("Анна")

# Функция с параметрами и возвращаемым значением
def add(x, y):
    """Функция сложения двух чисел"""
    return x + y

# Вызов функции add() с аргументами и присваивание результата переменной
result = add(3, 5)
print("Результат сложения:", result)

# Функция с параметрами по умолчанию
def power(base, exponent=2):
    """Функция возведения числа в степень"""
    return base ** exponent

# Вызов функции power() с одним аргументом
result1 = power(3)
print("3 в квадрате:", result1)

# Вызов функции power() с двумя аргументами
result2 = power(2, 3)
print("2 в кубе:", result2)

# Функция с произвольным числом аргументов
def average(*args):
    """Функция вычисления среднего значения"""
    if len(args) == 0:
        return 0
    else:
        return sum(args) / len(args)

# Вызов функции average() с разным числом аргументов
print("Среднее значение:", average(1, 2, 3, 4, 5))
print("Среднее значение (без аргументов):", average())

# Функция с произвольным числом именованных аргументов
def info(**kwargs):
    """Функция вывода информации о переданных аргументах"""
    for key, value in kwargs.items():
        print(key + ":", value)

# Вызов функции info() с разным числом именованных аргументов
info(name="John", age=30, city="New York")
info(name="Alice", profession="Engineer")

# Функция внутри функции
def outer_function():
    """Внешняя функция"""
    print("Начало выполнения внешней функции")

    def inner_function():
        """Внутренняя функция"""
        print("Выполнение внутренней функции")

    inner_function()  # Вызов внутренней функции

    print("Продолжение выполнения внешней функции")

# Вызов внешней функции
outer_function()






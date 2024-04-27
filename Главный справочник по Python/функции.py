def foo(number):
    return number + 10
foo(10)

def fnc(a, b):
    x = a * 10
    y = b + 10
    z = a + b
    print(x,y,z)
    return x + y + z
fnc(10, 10)

#Комментарий в функции

def f(x):
    """Функция, возвращающая куб x:
    
        Подробное описание...
    """
    return x ** 2
f(10)

f.__doc__

#Упаковка переменных

def func(*things):
    print (things)
    
func(1, 10)

def f(a, b, *others):
    print("a = ", str(a))
    print("b = ", str(b))
    
    print("others = ", others)
    
f(1, 2, 12, 19)

#Распаковка переменных

standart_values = [1, 2, 3]

def f(a, b, *others):
    print("a = ", str(a))
    print("b = ", str(b))
    
    print("others = ", others)
    
    
f(**standart_values[0], *standart_values[1], *standart_values[2])

#
from matplotlib import pyplot as plt

standard_args = {
    'color': 'green'
}


plt.plot([1, 2], [1, 3], **standard_args)
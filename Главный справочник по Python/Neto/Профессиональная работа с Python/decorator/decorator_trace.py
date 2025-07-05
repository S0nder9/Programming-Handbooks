from functools import wraps


def decorator_trace(func):
    number = 0
    
    @wraps(func)
    def wrapper(*args, **kwargs):
        nonlocal number
        number += 1
        print('Вызвана функция:', func.__name__, "с аргумантами:", args, kwargs)
        return print(func(*args, **kwargs))
    return wrapper


@decorator_trace
def foo(a, b, c):
    return a + b + c

foo(1, 2, 4)
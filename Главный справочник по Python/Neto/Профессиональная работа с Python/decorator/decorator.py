from functools import wraps

def decorator_template(func):
    @wraps(func)
    def new_func(*args, **kwargs):
        print("Что-то до вызова функции")
        result = func(*args, **kwargs)
        print(result)
        print("Что-то после вызова функции")
        return result
    
    return new_func

@decorator_template
def foo(a, b, c):
    return a + b + c

@decorator_template
def div(a, b):
    return a / b
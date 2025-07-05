import datetime
from functools import wraps
import time
def decorator_time_freeze(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        
        start_time = datetime.datetime.now()
        print(start_time)
        
        res = func(*args, **kwargs)
        print(res)
        end_time = datetime.datetime.now()
        print(end_time)
        
        return res
    return wrapper


@decorator_time_freeze
def foo(a, b, c):
    time.sleep(1.1)
    return a + b + c

foo(1, 2, 4)
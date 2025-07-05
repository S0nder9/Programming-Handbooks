
from functools import wraps
import time

def attempts(n_arguments=10, time_sleep=0.1):

    def decorator__attempts(func):
        @wraps(func)
        def new_func(*args, **kwargs):
            error = None
            for _ in range(n_arguments):
                try:
                    result = func(*args, **kwargs)
                    return result
                except Exception as exception:
                    error = exception
                    time.sleep(time_sleep)
            return error
        
        return new_func
    return decorator__attempts        

attempts_10 = attempts(n_arguments=20, time_sleep=1)
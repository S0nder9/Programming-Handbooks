import requests
from decorator_timefreeze import decorator_time_freeze
from decorator_trace import decorator_trace
from decorator_attempts import attempts

# @decorator_trace
# @decorator_time_freeze
@attempts(n_arguments=20, time_sleep=1)
def get_person_by_id(id):
    return requests.get(f"https://swapi.dev/api/people/{id}").json()

get_person_by_id(1)
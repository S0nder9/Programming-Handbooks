import random

def get_random_numbers(n):
    for i in range(n):
        yield random.randint(1, 10)

for item in get_random_numbers(4):
    print(item)
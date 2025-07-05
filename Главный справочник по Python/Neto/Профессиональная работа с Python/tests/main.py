def sum ( x, y):
    return x+ y


def mul ( x, y):
    return x* y


def dist ( ):
    return {"dsd": 1}


def list ( ):
    return [1, 2]

def factorial(number: int) -> int:
    if number == 0:
        return 1
    else:
        return number * factorial(number - 1)

# #assert
# a =10
# b=22
# res = summ(a, b)

# expected = 322

# assert res == expected
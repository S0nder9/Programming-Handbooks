camelCaseVariable = 12
inderscore_style_variable = 12 #Main
PascalStyleVariable = 12 #Function

Name = "Tom"
name = "Tom"

#Области видимости: Глобальные переменные

a = 1
b = 2

def f():
    global a
    a = a + 1
    b = a + 2
    print(a, b)
    
f()

print(b)

#Примеры

difficulty = 20

def calculate_damage(attacker_attack, target_defense, difficulty):
    return attacker_attack * (100 - target_defense) * difficulty / 100

difficulty = 20
damage = calculate_damage(100, 99, difficulty)
print("Damage inflicted:", damage)

#Задача 1

def even_odd(*values):
    print("Четные значения")
    for i in range(0, len(values), 2):
        print(values[i])
    
    print("Нечетные значения:")
    for i in range(1, len(values), 2):
        print(values[i])

even_odd(1, 2, 3, 4, 5, 6)

#Задача 2

global_var = "cat"

def my_func ():
    global global_var
    global_var = "dog"
    
my_func ()

if global_var == "dog":
    print("Успех")
else:
    print("Неудача")

#assert

global_var == "cat"

#Задача 3

def my_sum(*args):
    total = 0
    for number in args:
        total += number
    return total
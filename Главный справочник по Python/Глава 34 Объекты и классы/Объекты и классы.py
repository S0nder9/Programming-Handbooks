# Глава 34: Объекты и классы

# Объекты и классы

# В Python, как и в большинстве объектно-ориентированных языков программирования, объект - это экземпляр класса.
# Класс - это шаблон или чертеж для создания объектов. Он определяет данные и поведение, которые будут иметь все объекты этого класса.

# Классы позволяют вам структурировать ваш код более эффективно и логично, группируя данные и функции, которые работают с этими данными, в одно целое.

# Зачем использовать объекты и классы?
# Классы и объекты помогают организовать код, сделать его более читаемым и поддерживаемым.
# Они позволяют вам создавать шаблоны для объектов, что делает ваш код более модульным и переиспользуемым.

# Как создать класс и объект?
# Класс создается с помощью ключевого слова `class`, за которым следует имя класса.
# Внутри класса вы можете определить атрибуты (данные) и методы (функции).

# Пример создания класса и объекта
class Car:
    # Метод-конструктор __init__ используется для инициализации объекта
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year

    # Метод класса
    def get_description(self):
        return f"{self.year} {self.make} {self.model}"

# Создание экземпляра (объекта) класса Car
my_car = Car("Toyota", "Corolla", 2020)

# Вызов метода объекта
print(my_car.get_description())

# Наследование
# Наследование позволяет создавать новый класс на основе существующего класса. Новый класс наследует атрибуты и методы родительского класса.
class ElectricCar(Car):
    def __init__(self, make, model, year, battery_size):
        # Вызов конструктора родительского класса
        super().__init__(make, model, year)
        self.battery_size = battery_size

    def get_battery_info(self):
        return f"Этот автомобиль имеет батарею размером {self.battery_size}-kWh."

# Создание экземпляра (объекта) класса ElectricCar
my_electric_car = ElectricCar("Tesla", "Model S", 2022, 100)

# Вызов методов объекта
print(my_electric_car.get_description())
print(my_electric_car.get_battery_info())

# Инкапсуляция
# Инкапсуляция позволяет скрыть внутренние детали реализации класса и предоставлять доступ только к определенным данным и методам.
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.__balance = balance  # Приватный атрибут

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"{amount} добавлено на счет. Новый баланс: {self.__balance}")

    def withdraw(self, amount):
        if amount <= self.__balance:
            self.__balance -= amount
            print(f"{amount} снято со счета. Новый баланс: {self.__balance}")
        else:
            print("Недостаточно средств.")

    def get_balance(self):
        return self.__balance

# Создание экземпляра (объекта) класса BankAccount
my_account = BankAccount("Nikita", 1000)

# Взаимодействие с объектом через публичные методы
my_account.deposit(500)
my_account.withdraw(200)
print(f"Текущий баланс: {my_account.get_balance()}")

# Полиморфизм
# Полиморфизм позволяет использовать один и тот же интерфейс для разных типов объектов.
class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Гав"

class Cat(Animal):
    def speak(self):
        return "Мяу"

def make_animal_speak(animal):
    print(animal.speak())

# Создание экземпляров (объектов) классов Dog и Cat
my_dog = Dog()
my_cat = Cat()

# Вызов функции с разными типами объектов
make_animal_speak(my_dog)
make_animal_speak(my_cat)

# Итог
# Классы и объекты являются фундаментальными концепциями объектно-ориентированного программирования.
# Они помогают структурировать код, делают его более понятным и модульным.
# Понимание и использование этих концепций позволяет создавать более сложные и масштабируемые программы.

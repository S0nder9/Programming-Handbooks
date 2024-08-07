# Глава 34: Объекты и классы - Методы и экземпляры классов

# Введение в объекты и классы
# Классы и объекты являются основными концепциями объектно-ориентированного программирования (ООП).
# Класс - это шаблон для создания объектов (экземпляров). Он определяет атрибуты и методы, которые будут у объектов данного класса.
# Объект (экземпляр класса) - это конкретная реализация класса, имеющая свои собственные данные и поведение.

# Методы классов
# Методы - это функции, определенные внутри класса. Они описывают поведение объектов класса.
# Методы могут получать доступ к атрибутам объекта и изменять их.

# Создание класса и экземпляра класса
# Для создания класса используется ключевое слово class. 
# После создания класса, вы можете создать его экземпляр (объект) и работать с ним.

# Пример класса с методами и созданием экземпляров
class Dog:
    # Конструктор класса, вызывается при создании нового объекта
    def __init__(self, name, age):
        self.name = name  # Атрибут экземпляра
        self.age = age    # Атрибут экземпляра

    # Метод класса, который возвращает строковое представление объекта
    def description(self):
        return f"{self.name} is {self.age} years old"

    # Метод класса, который увеличивает возраст собаки
    def birthday(self):
        self.age += 1

# Создание экземпляра класса Dog
my_dog = Dog("Buddy", 3)

# Вызов методов экземпляра
print(my_dog.description())  # Вывод: Buddy is 3 years old
my_dog.birthday()            # Увеличение возраста
print(my_dog.description())  # Вывод: Buddy is 4 years old

# Актуальность
# Понимание классов и объектов актуально для разработки сложных программных систем, где важно организовать код в понятные и управляемые структуры.
# Классы помогают инкапсулировать данные и поведение, делают код более модульным и многократно используемым.

# Пример более сложного класса
class BankAccount:
    def __init__(self, account_holder, balance=0.0):
        self.account_holder = account_holder
        self.balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            return True
        return False

    def withdraw(self, amount):
        if 0 < amount <= self.balance:
            self.balance -= amount
            return True
        return False

    def get_balance(self):
        return self.balance

# Создание экземпляра класса BankAccount
account = BankAccount("Alice", 1000.0)

# Взаимодействие с экземпляром класса
print(account.get_balance())  # Вывод: 1000.0
account.deposit(500.0)
print(account.get_balance())  # Вывод: 1500.0
account.withdraw(200.0)
print(account.get_balance())  # Вывод: 1300.0

# Итог
# Классы и объекты являются краеугольными камнями объектно-ориентированного программирования.
# Они позволяют создавать шаблоны для объектов, инкапсулировать данные и методы, а также структурировать код для лучшего управления и повторного использования.
# Методы классов обеспечивают функциональность объектов и позволяют взаимодействовать с их атрибутами.

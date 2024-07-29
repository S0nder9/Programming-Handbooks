# Глава 35: Магические методы в классах - Наследование из других классов

# Наследование - это один из ключевых аспектов объектно-ориентированного программирования (ООП).
# Оно позволяет одному классу (дочернему или производному) унаследовать атрибуты и методы другого класса (родительского или базового).
# Это способствует повторному использованию кода и облегчает его поддержку и расширение.

# Магические методы (или методы с двойным подчеркиванием) в Python играют важную роль в наследовании и других аспектах ООП.
# Эти методы определяют поведение экземпляров классов для различных операций, таких как сложение, вычитание, сравнение и т.д.
# Некоторые из наиболее часто используемых магических методов: __init__, __str__, __repr__, __add__, __eq__, __lt__, и т.д.

# Определение наследования
# Для создания наследуемого класса необходимо указать родительский класс в скобках после имени дочернего класса.
# Например, class ChildClass(ParentClass):.

# Пример использования наследования и магических методов

class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        raise NotImplementedError("Subclass must implement this method")

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

# Создание экземпляров классов
dog = Dog("Buddy")
cat = Cat("Whiskers")

print(dog.speak())  # Output: Buddy says Woof!
print(cat.speak())  # Output: Whiskers says Meow!

# Переопределение магических методов
# Давайте рассмотрим пример переопределения магического метода __str__, чтобы изменить строковое представление объекта.

class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
    
    def __str__(self):
        return f"'{self.title}' by {self.author}"

book = Book("1984", "George Orwell")
print(book)  # Output: '1984' by George Orwell

# Наследование и расширение функциональности
# Вы также можете расширять функциональность базового класса, добавляя новые методы в дочерний класс.

class AdvancedBook(Book):
    def __init__(self, title, author, pages):
        super().__init__(title, author)
        self.pages = pages
    
    def __str__(self):
        return f"'{self.title}' by {self.author}, {self.pages} pages"

advanced_book = AdvancedBook("1984", "George Orwell", 328)
print(advanced_book)  # Output: '1984' by George Orwell, 328 pages

# Итог
# Наследование в Python позволяет создавать иерархии классов, повторно использовать код и упрощать его поддержку.
# Магические методы помогают определить поведение объектов для различных операций, делая их более гибкими и мощными.
# Понимание этих концепций является важной частью объектно-ориентированного программирования в Python и способствует написанию более структурированного и чистого кода.

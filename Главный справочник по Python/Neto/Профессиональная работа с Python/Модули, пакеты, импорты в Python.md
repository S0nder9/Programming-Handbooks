`Модули` - файлы, имеющие расширение .py, содержащие определенные функции, классы, переменные и другие объекты.
`Пекеты` - объединение модулей по тематике.
`Импорты`:
1. import request
2. form os import path
3. form os import * - лучше так не делать
4. import math as m

---
Декомпозиция:

1. до функций
2. до классов
3. до модулей
4. до пакетов

--- Для чего

if __name__ == `__main__`:
    pass

- точка входа, проверяющая, что мы находимся в запускаемом файле.

(допустим, мы хотим имопртировать что-либо из модуля, сделали испорт, а пайтон испольнил весь модуль. То есть он не только импоритровал, а исполнил полностью файл). Чтобы этого избежать, нужно использовать конструкцию if __name__ == `__main__`:

---
## pip - установка пакетов из интернета

requirements.txt - текстовый файл, содержащий список пакетов, которые нужно установить (нужно писать вручную).
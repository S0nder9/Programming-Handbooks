# Глава 28: Обработка ошибок - Блоки else и finally в обработке ошибок

# Обработка ошибок в Python осуществляется с помощью конструкции try-except.
# Однако помимо блоков try и except, есть и другие важные блоки, такие как else и finally, которые помогают улучшить управление исключениями.

# 1. Блок else в обработке ошибок

# Блок else используется вместе с блоком try-except, и он выполняется, если в блоке try не произошло исключений.
# Это позволяет вам определить код, который должен быть выполнен только в случае успешного выполнения блока try.

# Зачем используется блок else?
# Блок else позволяет определить действия, которые должны быть выполнены, если все операции в блоке try завершились успешно.
# Это помогает разделить логику обработки исключений и успешного выполнения.

# Пример использования блока else
try:
    number = int(input("Введите число: "))
    result = 10 / number
except ValueError:
    print("Ошибка: введено не числовое значение.")
except ZeroDivisionError:
    print("Ошибка: деление на ноль.")
else:
    print(f"Результат деления 10 на {number} равен {result}")

# В этом примере блок else выполняется только в случае, если оба исключения (ValueError и ZeroDivisionError) не произошли.

# 2. Блок finally в обработке ошибок

# Блок finally выполняется в любом случае, независимо от того, произошло исключение или нет.
# Это идеальное место для размещения кода, который должен выполняться после выполнения блока try и независимо от того, возникло ли исключение.

# Зачем используется блок finally?
# Блок finally используется для выполнения важного кода, который должен быть выполнен в любом случае, например, закрытие файлов или освобождение ресурсов.

# Пример использования блока finally
try:
    file = open("example.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("Ошибка: файл не найден.")
finally:
    file.close()
    print("Файл успешно закрыт.")

# В этом примере блок finally гарантирует, что файл будет закрыт независимо от того, возникло исключение или нет.

# 3. Использование блоков else и finally вместе

# Вы можете использовать блоки else и finally вместе, чтобы сначала выполнить код, если исключений не возникло, а затем выполнить завершающие действия, которые необходимы в любом случае.

# Пример использования блоков else и finally вместе
try:
    number = int(input("Введите число: "))
    result = 10 / number
except ValueError:
    print("Ошибка: введено не числовое значение.")
except ZeroDivisionError:
    print("Ошибка: деление на ноль.")
else:
    print(f"Результат деления 10 на {number} равен {result}")
finally:
    print("Блок finally выполнен в любом случае.")

# В этом примере блок else выполнится при отсутствии исключений, а блок finally выполнится в любом случае.

# Итог

# Блоки else и finally расширяют возможности обработки исключений в Python.
# Блок else выполняется при успешном выполнении блока try, а блок finally выполняется в любом случае, что позволяет правильно управлять ресурсами и завершающими действиями.
# Понимание и умение использовать эти блоки помогает создавать более надежные и управляемые программы.


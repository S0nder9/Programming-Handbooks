# Глава 32: Циклы - Использование continue в циклах

# В Python циклы позволяют выполнять определенный блок кода многократно.
# Циклы бывают двух типов: for и while. В обоих типах циклов можно использовать оператор continue, чтобы пропустить текущую итерацию и перейти к следующей.

# Оператор continue
# Оператор continue используется для пропуска оставшейся части кода в текущей итерации цикла и перехода к следующей итерации.
# Это полезно, когда вы хотите пропустить определенные условия или значения в цикле.

# Зачем используется оператор continue?
# Оператор continue позволяет вам более точно контролировать выполнение цикла.
# Например, если у вас есть цикл, который перебирает числа от 1 до 10, и вы хотите пропустить четные числа, вы можете использовать оператор continue для этой цели.

# Где используется оператор continue?
# Оператор continue используется в циклах for и while, когда вам нужно пропустить выполнение определенного блока кода для текущей итерации.
# Это может быть полезно в различных сценариях, таких как обработка данных, где некоторые значения должны быть пропущены.

# Примеры использования оператора continue

# Пример 1: Использование continue в цикле for
print("Пример 1: Использование continue в цикле for")
for i in range(1, 11):
    if i % 2 == 0:
        continue
    print(i)
# В этом примере цикл for перебирает числа от 1 до 10. Оператор continue пропускает четные числа, и они не выводятся.

# Пример 2: Использование continue в цикле while
print("\nПример 2: Использование continue в цикле while")
i = 0
while i < 10:
    i += 1
    if i % 2 == 0:
        continue
    print(i)
# В этом примере цикл while увеличивает значение переменной i от 1 до 10.
# Оператор continue пропускает четные числа, и они не выводятся.

# Итог
# Оператор continue является мощным инструментом для управления потоком выполнения циклов в Python.
# Он позволяет пропускать выполнение определенных итераций цикла, что делает ваш код более гибким и управляемым.
# Использование оператора continue может помочь вам избежать выполнения ненужных операций и улучшить производительность вашего кода.

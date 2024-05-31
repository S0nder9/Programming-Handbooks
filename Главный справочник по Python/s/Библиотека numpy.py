# numpy_examples.py

import numpy as np

# Создание одномерного массива с типом данных float
np_array = np.array([1, 1, 1, 1, 21, 3, 43.9], dtype="float")
print("Одномерный массив:", np_array)

# Создание двумерного массива (матрицы) с типом данных int32
matrix_arr = np.array(
    [
        [10],
        [10]
    ], dtype="int32")

# Доступ к элементу матрицы
print("Элемент матрицы:", matrix_arr[0][0])

# Форма массива (количество строк и столбцов)
print("Форма массива:", matrix_arr.shape)

# Тип данных массива
print("Тип данных массива:", matrix_arr.dtype)

# Число элементов в массиве
print("Число элементов в массиве:", len(matrix_arr))

# Проверка наличия элемента в массиве
print("Наличие элемента 10 в массиве:", 10 in matrix_arr)

# Перевод массива в список
to_list = matrix_arr.tolist()
print("Массив в виде списка:", to_list)

# Создание массива с числами от 1 до 10
random_arr = np.array([i for i in range(1, 11)], dtype="int32")
print("Массив от 1 до 10:", random_arr)

# Заполнение массива нулями
random_arr.fill(0)
print("Массив заполненный нулями:", random_arr)

# Преобразование массива в строку
arr_string = random_arr.tostring()
print("Массив в строке:", arr_string)

# Восстановление массива из строки
# Этот метод устарел и его не рекомендуется использовать, вместо этого используйте frombuffer
restored_arr = np.frombuffer(arr_string, dtype="int32")
print("Восстановленный массив:", restored_arr)

# Создание двумерного массива и транспонирование (смена строк местами со столбцами)
np_matrix = np.array([[1, 3, 4, 5, 6, 7, 8, 9, 10, 11], [1, 2, 0, 0, 0, 0, 0, 0, 0, 0]], dtype="int32")
print("Оригинальная матрица:\n", np_matrix)
transposed_matrix = np_matrix.transpose()
print("Транспонированная матрица:\n", transposed_matrix)

# Превращение матрицы в одномерный массив (вектор)
flat_arr = np_matrix.flatten()
print("Одномерный массив (вектор):", flat_arr)

# Создание и конкатенация массивов
ex_arr = np.array([i for i in range(9, 11)], dtype="int32")
concat_arr = np.concatenate([ex_arr, ex_arr])
print("Конкатенированный массив:", concat_arr)

# Создание массива с числами от 0 до 9
flat_arr_main = np.arange(10, dtype="float")
print("Массив от 0 до 9:", flat_arr_main)

# Создание массивов, заполненных нулями и единицами
zeros_arr = np.zeros((10, 9), dtype="int32")
print("Массив заполненный нулями:\n", zeros_arr)

ones_arr = np.ones((2, 2), dtype="int32")
print("Массив заполненный единицами:\n", ones_arr)

# Создание единичной матрицы
main_arr = np.identity(10, dtype="int32")
print("Единичная матрица:\n", main_arr)

# Создание диагональной матрицы с диагональю смещенной на 1
eye_arr = np.eye(4, k=1, dtype="int32")
print("Диагональная матрица:\n", eye_arr)

# Пример арифметических операций с массивами
a = np.ones(10)
b = np.arange(10)
c = a + b
print("Сумма массивов a и b:", c)

extract = c - b
print("Разность массивов c и b:", extract)

# Пример умножения матриц
arr1 = np.array([[1, 2], [3, 4]])
arr2 = np.array([[2, 0], [1, 3]])

main = arr1 * arr2
print("Элементное умножение матриц:\n", main)

# Итерация по элементам матрицы с использованием zip
for x, y in zip(arr1.flatten(), arr2.flatten()):
    print(x, y)

# Сумма всех элементов массива
print("Сумма всех элементов матрицы main:", main.sum())

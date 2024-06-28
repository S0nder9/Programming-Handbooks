# pandas_guide.py

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 1. Введение в Pandas
"""
Pandas - это библиотека для анализа данных в Python. Она предоставляет удобные и эффективные инструменты для работы с данными:
- Series: одномерный массив с метками (индексами).
- DataFrame: двумерная таблица данных с метками по строкам и столбцам.
"""

# 2. Создание объектов Series и DataFrame
# Создание Series
series = pd.Series([1, 2, 3, 4, 5], index=['a', 'b', 'c', 'd', 'e'])
print("Series:\n", series)

# Создание DataFrame
data = {
    'A': [1, 2, 3],
    'B': [4, 5, 6],
    'C': [7, 8, 9]
}
df = pd.DataFrame(data, index=['row1', 'row2', 'row3'])
print("\nDataFrame:\n", df)

# 3. Чтение данных из различных источников
# Из CSV файла
# df = pd.read_csv('data.csv')

# Из Excel файла
# df = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# Из SQL базы данных
# import sqlite3
# conn = sqlite3.connect('database.db')
# df = pd.read_sql_query("SELECT * FROM table_name", conn)

# 4. Основные операции с DataFrame
# Просмотр первых/последних строк
print("\nПервые 2 строки:\n", df.head(2))
print("\nПоследние 2 строки:\n", df.tail(2))

# Получение информации о DataFrame
print("\nИнформация о DataFrame:\n", df.info())
print("\nОписание DataFrame:\n", df.describe())

# Доступ к данным
print("\nДоступ к столбцу 'A':\n", df['A'])
print("\nДоступ к строке 'row1':\n", df.loc['row1'])

# Фильтрация данных
filtered_df = df[df['A'] > 1]
print("\nОтфильтрованные данные (A > 1):\n", filtered_df)

# Добавление нового столбца
df['D'] = df['A'] + df['B']
print("\nDataFrame с новым столбцом 'D':\n", df)

# Удаление столбца
df.drop('D', axis=1, inplace=True)
print("\nDataFrame без столбца 'D':\n", df)

# 5. Работа с пропущенными данными
# Обнаружение пропущенных данных
print("\nОбнаружение пропущенных данных:\n", df.isna())

# Заполнение пропущенных данных
df_filled = df.fillna(0)
print("\nDataFrame с заполненными пропущенными данными:\n", df_filled)

# Удаление строк с пропущенными данными
df_dropped = df.dropna()
print("\nDataFrame с удаленными строками с пропущенными данными:\n", df_dropped)

# 6. Группировка данных и агрегирование
grouped_df = df.groupby('A').sum()
print("\nСгруппированный DataFrame по 'A' и агрегированный sum():\n", grouped_df)

# 7. Слияние и объединение DataFrame
df1 = pd.DataFrame({
    'key': ['A', 'B', 'C'],
    'value': [1, 2, 3]
})
df2 = pd.DataFrame({
    'key': ['A', 'B', 'D'],
    'value': [4, 5, 6]
})
merged_df = pd.merge(df1, df2, on='key', how='inner')
print("\nСлияние DataFrame по ключу 'key':\n", merged_df)

# 8. Сохранение данных в файл
# В CSV файл
# df.to_csv('output.csv')

# В Excel файл
# df.to_excel('output.xlsx', sheet_name='Sheet1')

# В SQL базу данных
# df.to_sql('table_name', conn, if_exists='replace', index=False)

# 9. Получение данных по условию
# Условие на основе одного столбца
conditional_df = df[df['A'] > 1]
print("\nDataFrame с данными, где A > 1:\n", conditional_df)

# Условие на основе нескольких столбцов
conditional_df = df[(df['A'] > 1) & (df['B'] < 6)]
print("\nDataFrame с данными, где A > 1 и B < 6:\n", conditional_df)

# 10. Построение графиков
# Простая линейная диаграмма
df.plot(kind='line')
plt.title('Линейная диаграмма DataFrame')
plt.xlabel('Индекс')
plt.ylabel('Значение')
plt.show()

# Гистограмма
df.plot(kind='bar')
plt.title('Гистограмма DataFrame')
plt.xlabel('Индекс')
plt.ylabel('Значение')
plt.show()

# Коробчатая диаграмма
df.plot(kind='box')
plt.title('Коробчатая диаграмма DataFrame')
plt.xlabel('Столбцы')
plt.ylabel('Значение')
plt.show()

# 11. Работа с временными рядами
# Создание временного ряда
date_rng = pd.date_range(start='2020-01-01', end='2020-01-10', freq='D')
time_series = pd.Series(np.random.randn(len(date_rng)), index=date_rng)
print("\nВременной ряд:\n", time_series)

# Скользящее среднее
rolling_mean = time_series.rolling(window=3).mean()
print("\nСкользящее среднее:\n", rolling_mean)

# Построение временного ряда и скользящего среднего
plt.figure(figsize=(10, 6))
plt.plot(time_series, label='Временной ряд')
plt.plot(rolling_mean, label='Скользящее среднее', color='red')
plt.legend(loc='best')
plt.title('Временной ряд и скользящее среднее')
plt.show()

# 12. Применение функций к данным
# Применение функции к каждому элементу столбца
df['A_squared'] = df['A'].apply(lambda x: x ** 2)
print("\nDataFrame со столбцом 'A', возведенным в квадрат:\n", df)

# Применение функции к каждой строке DataFrame
df['sum_A_B'] = df.apply(lambda row: row['A'] + row['B'], axis=1)
print("\nDataFrame с суммой столбцов 'A' и 'B':\n", df)

# 13. Работа с категориальными данными
# Создание категориальных данных
df['Category'] = pd.Categorical(['test', 'train', 'test'])
print("\nDataFrame с категориальными данными:\n", df)

# 14. Продвинутая фильтрация
# Фильтрация с использованием метода query
filtered_query_df = df.query('A > 1 and B < 6')
print("\nDataFrame, отфильтрованный с использованием query (A > 1 и B < 6):\n", filtered_query_df)

# 15. Сводные таблицы
pivot_df = df.pivot_table(values='C', index='A', columns='B', aggfunc=np.mean)
print("\nСводная таблица:\n", pivot_df)

# 16. Работа с текстовыми данными
# Создание текстовых данных
text_data = pd.Series(['Hello World', 'Pandas is great', 'Python is awesome'])

# Преобразование текста в нижний регистр
print("\nТекстовые данные в нижнем регистре:\n", text_data.str.lower())

# Разделение строк
print("\nРазделение строк:\n", text_data.str.split())

# Замена подстрок
print("\nЗамена 'is' на 'IS':\n", text_data.str.replace('is', 'IS'))

# 17. Работа с индексами
# Сброс индекса
reset_index_df = df.reset_index()
print("\nDataFrame с сброшенным индексом:\n", reset_index_df)

# Установка нового индекса
set_index_df = df.set_index('A')
print("\nDataFrame с новым индексом 'A':\n", set_index_df)

# 18. Итерация по DataFrame
print("\nИтерация по строкам DataFrame:")
for index, row in df.iterrows():
    print(f"Индекс: {index}, Значение строки: {row['A']}, {row['B']}, {row['C']}")

# 19. Объединение DataFrame
df3 = pd.DataFrame({
    'A': ['A0', 'A1', 'A2'],
    'B': ['B0', 'B1', 'B2'],
    'C': ['C0', 'C1', 'C2']
})
df4 = pd.DataFrame({
    'A': ['A3', 'A4', 'A5'],
    'B': ['B3', 'B4', 'B5'],
    'C': ['C3', 'C4', 'C5']
})
concatenated_df = pd.concat([df3, df4])
print("\nОбъединенный DataFrame:\n", concatenated_df)

# 20. Обработка строковых данных
# Разделение строки в столбце
df['split_column'] = df['Category'].astype(str) + "_suffix"
print("\nDataFrame со столбцом, объединенным с суффиксом:\n", df)

# Проверка наличия подстроки
contains_test = df['Category'].str.contains('test')
print("\nСтроки, содержащие 'test' в столбце 'Category':\n", contains_test)

# 21. Преобразование типов данных
# Преобразование столбца в тип float
df['A_float'] = df['A'].astype(float)
print("\nDataFrame со столбцом 'A', преобразованным в float:\n", df)

# 22. Сортировка данных
# Сортировка по значениям столбца 'A'
sorted_df = df.sort_values(by='A', ascending=False)
print("\nDataFrame, отсортированный по столбцу 'A' по убыванию:\n", sorted_df)

# 23. Удаление дубликатов
# Добавление дублирующихся данных для примера
df_with_duplicates = df.append(df.iloc[0])
print("\nDataFrame с дублирующей строкой:\n", df_with_duplicates)

# Удаление дубликатов
df_without_duplicates = df_with_duplicates.drop_duplicates()
print("\nDataFrame без дублирующих строк:\n", df_without_duplicates)

# 24. Изменение формы данных
# Сведение (pivoting) данных
pivot_df = df.pivot(index='A', columns='B', values='C')
print("\nСведенная таблица (pivot):\n", pivot_df)

# Расплавление (melting) данных
melted_df = df.melt(id_vars=['A'], value_vars=['B', 'C'])
print("\nРасплавленная таблица (melt):\n", melted_df)

# 25. Вычисление скользящего окна
# Скользящее среднее
rolling_mean = df['A'].rolling(window=2).mean()
print("\nСкользящее среднее для столбца 'A':\n", rolling_mean)

# Скользящее стандартное отклонение
rolling_std = df['A'].rolling(window=2).std()
print("\nСкользящее стандартное отклонение для столбца 'A':\n", rolling_std)

# 26. Вычисление процентного изменения
percent_change = df['A'].pct_change()
print("\nПроцентное изменение для столбца 'A':\n", percent_change)

# 27. Преобразование иерархических индексов
# Создание многоуровневого индекса
arrays = [
    ['A', 'A', 'B', 'B'],
    ['one', 'two', 'one', 'two']
]
index = pd.MultiIndex.from_arrays(arrays, names=('first', 'second'))
multi_df = pd.DataFrame({'value': [1, 2, 3, 4]}, index=index)
print("\nDataFrame с многоуровневым индексом:\n", multi_df)

# Преобразование многоуровневого индекса в столбцы
reset_multi_df = multi_df.reset_index()
print("\nDataFrame с преобразованным многоуровневым индексом в столбцы:\n", reset_multi_df)

# 28. Работа с временными интервалами
# Создание данных с временными метками
time_rng = pd.date_range(start='2020-01-01', periods=100, freq='D')
time_series = pd.Series(np.random.randn(len(time_rng)), index=time_rng)
print("\nВременной ряд:\n", time_series)

# Выбор данных по дате
date_selection = time_series['2020-01-10':'2020-01-20']
print("\nВыбор данных с 2020-01-10 по 2020-01-20:\n", date_selection)

# 29. Удаление и заполнение пропущенных данных
# Создание данных с пропущенными значениями
nan_data = {
    'A': [1, 2, np.nan, 4],
    'B': [np.nan, 2, 3, 4],
    'C': [1, 2, 3, np.nan]
}
nan_df = pd.DataFrame(nan_data)
print("\nDataFrame с пропущенными данными:\n", nan_df)

# Заполнение пропущенных значений
nan_df_filled = nan_df.fillna(method='ffill')
print("\nDataFrame с заполненными пропущенными данными методом 'ffill':\n", nan_df_filled)

# Удаление строк с пропущенными значениями
nan_df_dropped = nan_df.dropna()
print("\nDataFrame с удаленными строками с пропущенными данными:\n", nan_df_dropped)

# 30. Векторизированные операции
# Арифметические операции
df['A_plus_B'] = df['A'] + df['B']
print("\nDataFrame со столбцом 'A + B':\n", df)

# 31. Применение пользовательских функций
# Применение функции к каждой строке DataFrame
def custom_function(row):
    return row['A'] * 2 + row['B']

df['Custom'] = df.apply(custom_function, axis=1)
print("\nDataFrame с пользовательской функцией 'A * 2 + B':\n", df)

# 32. Обработка больших данных
# Чтение больших файлов с использованием iterator и chunksize
# chunk_iter = pd.read_csv('large_data.csv', iterator=True, chunksize=1000)
# for chunk in chunk_iter:
#     process(chunk)

# 33. Визуализация данных
# Построение диаграммы рассеяния
df.plot(kind='scatter', x='A', y='B')
plt.title('Диаграмма рассеяния A и B')
plt.xlabel('A')
plt.ylabel('B')
plt.show()

# Построение круговой диаграммы
df['A'].plot(kind='pie', autopct='%1.1f%%')
plt.title('Круговая диаграмма столбца A')
plt.show()

# 35. Заключение
"""
Этот файл охватывает еще больше возможностей библиотеки Pandas. Вы узнали о работе с временными рядами, текстовыми данными, пропущенными значениями, многоуровневыми индексами и о многих других функциях. Pandas является мощным инструментом для анализа данных, и его возможности продолжают расширяться. Для более глубокого изучения, обязательно ознакомьтесь с официальной документацией и другими ресурсами.
"""
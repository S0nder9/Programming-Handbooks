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

# 11. Заключение
"""
Это руководство покрывает основные функции библиотеки Pandas. Pandas обладает гораздо большим количеством возможностей, включая работу с временными рядами, построение графиков, продвинутую фильтрацию и многое другое. Для более детального изучения рекомендую ознакомиться с официальной документацией Pandas.
"""

if __name__ == "__main__":
    print("\nЗапуск примеров из файла pandas_guide.py")


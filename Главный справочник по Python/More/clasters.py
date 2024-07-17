import numpy as np
from sklearn.cluster import DBSCAN
from sklearn.datasets import make_blobs
import matplotlib.pyplot as plt

# Создаем центры кластеров и данные
centers = [[1, 1], [-1, -1], [1, -1]]
x, _ = make_blobs(n_samples=800, centers=centers)

# Применяем алгоритм DBSCAN
db_scan = DBSCAN(eps=0.3, min_samples=10).fit(x)
db_labels = db_scan.labels_

# Количество кластеров и шумов
n_clusters = len(set(db_labels)) - (1 if -1 in db_labels else 0)
n_noise = list(db_labels).count(-1)

# Уникальные метки и цвета для каждого кластера
unique_labels = set(db_labels)
colors = [plt.cm.Spectral(each) for each in np.linspace(0, 1, len(unique_labels))]

# Построение графика для каждого кластера
for k, col in zip(unique_labels, colors):
    if k == -1:
        # Черный цвет для шума
        col = (0, 0, 0, 1)

    class_member_mask = (db_labels == k)

    xy = x[class_member_mask & True]
    plt.plot(xy[:, 0], xy[:, 1], 'o', markerfacecolor=tuple(col), markeredgecolor='k', markersize=6)

plt.title(f'кол-во кластеров: {n_clusters}')
plt.show()
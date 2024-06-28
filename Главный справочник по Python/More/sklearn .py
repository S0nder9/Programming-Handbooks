# Библиотека scikit-learn (sklearn)

# Scikit-learn (sklearn) - это одна из самых популярных и широко используемых библиотек в Python для машинного обучения.
# Она предоставляет простые и эффективные инструменты для анализа данных и построения предсказательных моделей.
# Scikit-learn основана на библиотеках NumPy, SciPy и matplotlib и является частью экосистемы SciPy.

# Зачем используется библиотека scikit-learn?
# Scikit-learn используется для выполнения различных задач машинного обучения, включая классификацию, регрессию, кластеризацию, снижение размерности данных и выборку моделей.
# Она предоставляет удобные и высокоуровневые интерфейсы для работы с данными и построения моделей, что делает её идеальной для быстрого прототипирования и разработки.

# Как использовать библиотеку scikit-learn?
# Чтобы начать использовать scikit-learn, необходимо установить библиотеку, импортировать нужные модули и следовать стандартному процессу машинного обучения:
# 1. Загрузка и подготовка данных
# 2. Разделение данных на обучающую и тестовую выборки
# 3. Выбор и обучение модели
# 4. Оценка модели и её использование для предсказаний

# Пример использования библиотеки scikit-learn

# Импортируем необходимые модули
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans

# Шаг 1: Загрузка и подготовка данных
# Загрузим набор данных "Ирисы"
iris = load_iris()
X = iris.data
y = iris.target

# Шаг 2: Разделение данных на обучающую и тестовую выборки
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Шаг 3: Масштабирование данных (опционально)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Шаг 4: Выбор и обучение модели
model = LogisticRegression()
model.fit(X_train, y_train)

# Шаг 5: Оценка модели
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Точность модели: {accuracy:.2f}")

# Дополнительные команды для оценки модели
# Отчет по классификации
report = classification_report(y_test, y_pred)
print("Отчет по классификации:\n", report)

# Матрица ошибок
conf_matrix = confusion_matrix(y_test, y_pred)
print("Матрица ошибок:\n", conf_matrix)

# Пример использования метода снижения размерности PCA
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)

# Пример использования метода кластеризации KMeans
kmeans = KMeans(n_clusters=3, random_state=42)
kmeans.fit(X)
clusters = kmeans.predict(X)
print("Кластеры:\n", clusters)

# Итог
# Библиотека scikit-learn является мощным инструментом для решения задач машинного обучения.
# Она предлагает простой и интуитивно понятный API, который позволяет быстро и эффективно разрабатывать предсказательные модели.
# Благодаря богатому набору алгоритмов и утилит, scikit-learn остаётся одним из главных инструментов для исследователей и инженеров в области машинного обучения.
# Дополнительные команды и методы, такие как PCA и KMeans, расширяют возможности библиотеки, позволяя решать широкий спектр задач анализа данных.

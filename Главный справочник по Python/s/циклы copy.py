import tensorflow

import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

# Генерация данных
def generate_data(num_samples):
    X = np.random.randint(0, 1000, num_samples)
    y = X % 2
    return X, y

# Создание обучающего и тестового набора данных
num_samples = 10000
X, y = generate_data(num_samples)

# Нормализация входных данных
X = X / 1000.0

# Разделение данных на обучающую и тестовую выборки
split = int(0.8 * num_samples)
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

model = Sequential([
    Dense(16, activation='relu', input_shape=(1,)),  # Скрытый слой с 16 нейронами
    Dense(1, activation='sigmoid')  # Выходной слой с 1 нейроном и сигмоидной активацией
])

model.compile(optimizer='adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])

model.fit(X_train, y_train, epochs=20, batch_size=32, validation_split=0.2)

test_loss, test_acc = model.evaluate(X_test, y_test)
print(f'Test accuracy: {test_acc}')

# Прогнозирование
new_numbers = np.array([10, 15, 23, 42]) / 1000.0  # Примеры чисел для предсказания
predictions = model.predict(new_numbers)
predictions = (predictions > 0.5).astype(int).flatten()
print(f'Predictions: {predictions}')

// Глава 9: Работа с пикселями в Canvas

// Подглава 9.2: Обработка пиксельных данных

// В HTML5 Canvas API можно напрямую работать с пиксельными данными для создания и применения различных эффектов.
// Это включает изменение цветовых значений пикселей и создание таких эффектов, как негатив или черно-белый фильтр.

// Изменение цветовых значений пикселей:
// Для работы с пиксельными данными используется метод `getImageData`, который возвращает объект `ImageData`.
// Этот объект содержит массив данных пикселей, который можно модифицировать и затем снова отобразить на Canvas с помощью метода `putImageData`.

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Заполняем Canvas синим цветом для примера
ctx.fillStyle = 'blue';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Получаем данные пикселей из Canvas
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data;

// Изменяем цветовые значения пикселей
for (let i = 0; i < data.length; i += 4) {
  // Инвертируем цвета (эффект негатива)
  data[i] = 255 - data[i]; // Красный
  data[i + 1] = 255 - data[i + 1]; // Зеленый
  data[i + 2] = 255 - data[i + 2]; // Синий
  // Альфа-канал оставляем без изменений
}

// Применяем измененные данные пикселей обратно на Canvas
ctx.putImageData(imageData, 0, 0);

// Создание и применение эффектов (например, негатив, черно-белый фильтр):

// Функция для применения эффекта негатива
function applyNegativeEffect(imageData) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]; // Красный
    data[i + 1] = 255 - data[i + 1]; // Зеленый
    data[i + 2] = 255 - data[i + 2]; // Синий
  }
  return imageData;
}

// Функция для применения черно-белого фильтра
function applyGrayscaleEffect(imageData) {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // Красный
    data[i + 1] = avg; // Зеленый
    data[i + 2] = avg; // Синий
  }
  return imageData;
}

// Пример применения эффектов к изображению на Canvas
const canvas2 = document.getElementById('myCanvas2');
const ctx2 = canvas2.getContext('2d');

// Рисуем изображение на втором Canvas для демонстрации эффектов
const img = new Image();
img.src = 'path/to/image.jpg'; // Укажите путь к вашему изображению
img.onload = () => {
  ctx2.drawImage(img, 0, 0, canvas2.width, canvas2.height);
  
  // Получаем данные пикселей из второго Canvas
  let imageData2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
  
  // Применяем эффект негатива и отображаем результат
  const negativeData = applyNegativeEffect(imageData2);
  ctx2.putImageData(negativeData, 0, 0);
  
  // Применяем черно-белый фильтр и отображаем результат
  imageData2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height); // Получаем оригинальные данные снова
  const grayscaleData = applyGrayscaleEffect(imageData2);
  ctx2.putImageData(grayscaleData, 0, canvas2.height / 2); // Отображаем ниже оригинала для сравнения
};

// Итог:
// Обработка пиксельных данных в Canvas позволяет создавать и применять различные визуальные эффекты.
// Метод `getImageData` используется для получения данных пикселей, а метод `putImageData` - для отображения измененных данных на Canvas.
// С помощью модификации цветовых значений пикселей можно создавать такие эффекты, как негатив или черно-белый фильтр.

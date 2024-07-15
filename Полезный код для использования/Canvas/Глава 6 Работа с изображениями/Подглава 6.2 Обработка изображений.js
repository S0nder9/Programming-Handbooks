// Глава 6: Работа с изображениями в Canvas

// Подглава 6.2: Обработка изображений

// HTML5 Canvas API предоставляет мощные инструменты для работы с изображениями в веб-приложениях.
// В этой подглаве мы рассмотрим два основных аспекта обработки изображений: изменение размеров и обрезка, а также применение фильтров.

// 1. Изменение размеров и обрезка изображений

// Для изменения размеров и обрезки изображений можно использовать методы Canvas API, такие как drawImage.
// Метод drawImage позволяет масштабировать и обрезать изображения при их отрисовке на canvas.

// Пример изменения размера изображения:
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const image = new Image();
image.src = 'path/to/your/image.jpg';

image.onload = () => {
  canvas.width = 200;  // Новая ширина изображения
  canvas.height = 200; // Новая высота изображения
  ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
  // Изображение будет отрисовано с новыми размерами на canvas
};

// Пример обрезки изображения:
const canvasCrop = document.createElement('canvas');
const ctxCrop = canvasCrop.getContext('2d');

const imageCrop = new Image();
imageCrop.src = 'path/to/your/image.jpg';

imageCrop.onload = () => {
  const cropX = 50;   // Начальная координата X обрезки
  const cropY = 50;   // Начальная координата Y обрезки
  const cropWidth = 100; // Ширина обрезанного участка
  const cropHeight = 100; // Высота обрезанного участка

  canvasCrop.width = cropWidth;
  canvasCrop.height = cropHeight;
  ctxCrop.drawImage(imageCrop, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
  // Образ будет обрезан и отрисован на canvasCrop
};

// 2. Применение фильтров к изображениям

// Canvas API также поддерживает применение различных фильтров к изображениям через свойство `filter` контекста 2D.

// Пример применения фильтров к изображению:
const canvasFilter = document.createElement('canvas');
const ctxFilter = canvasFilter.getContext('2d');

const imageFilter = new Image();
imageFilter.src = 'path/to/your/image.jpg';

imageFilter.onload = () => {
  canvasFilter.width = imageFilter.width;
  canvasFilter.height = imageFilter.height;
  ctxFilter.drawImage(imageFilter, 0, 0);
  
  // Применение фильтра размытия
  ctxFilter.filter = 'blur(5px)';
  ctxFilter.drawImage(imageFilter, 0, 0);
  
  // Применение фильтра яркости
  ctxFilter.filter = 'brightness(150%)';
  ctxFilter.drawImage(imageFilter, 0, 0);
  
  // Применение фильтра контраста
  ctxFilter.filter = 'contrast(200%)';
  ctxFilter.drawImage(imageFilter, 0, 0);
  
  // Применение нескольких фильтров
  ctxFilter.filter = 'grayscale(100%) sepia(100%)';
  ctxFilter.drawImage(imageFilter, 0, 0);
};

// Итог:
// Canvas API предоставляет гибкие методы для обработки изображений, включая изменение размеров, обрезку и применение различных фильтров.
// Используйте drawImage для изменения размеров и обрезки изображений, а свойство filter для применения эффектов и фильтров.


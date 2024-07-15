const canvas = document.getElementById('galleryCanvas');
const ctx = canvas.getContext('2d');

const images = [
  '140443984799.jpeg',
  'ebc676df71275ad4300f32a902122776.jpeg',
  'ebc676df71275ad4300f32a902122776.jpeg',
  'fonstola.ru_410318.jpg',
];

const loadedImages = [];
let imagesLoaded = 0;

images.forEach((src, index) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    loadedImages[index] = img;
    imagesLoaded++;
    if (imagesLoaded === images.length) {
      drawGallery();
    }
  };
});

// Шаг 3: Отрисовка галереи изображений
// Напишем функцию для отрисовки изображений на Canvas в виде сетки.

function drawGallery() {
  const columns = 2;
  const rows = Math.ceil(images.length / columns);
  const imageWidth = canvas.width / columns;
  const imageHeight = canvas.height / rows;

  loadedImages.forEach((img, index) => {
    const x = (index % columns) * imageWidth;
    const y = Math.floor(index / columns) * imageHeight;
    ctx.drawImage(img, x, y, imageWidth, imageHeight);
  });
}

// Шаг 4: Добавление интерактивности
// Добавим возможность клика по изображению для его увеличения.

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const columns = 2;
  const rows = Math.ceil(images.length / columns);
  const imageWidth = canvas.width / columns;
  const imageHeight = canvas.height / rows;

  loadedImages.forEach((img, index) => {
    const imgX = (index % columns) * imageWidth;
    const imgY = Math.floor(index / columns) * imageHeight;

    if (
      x >= imgX && x <= imgX + imageWidth &&
      y >= imgY && y <= imgY + imageHeight
    ) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  });
});

// Итог:
// Мы создали простую интерактивную галерею изображений с использованием HTML5 Canvas.
// Галерея отображает изображения в виде сетки, и позволяет пользователю кликнуть на изображение для его увеличения.
// Этот пример может быть расширен добавлением других функций, таких как кнопки навигации, фильтры изображений и т.д.

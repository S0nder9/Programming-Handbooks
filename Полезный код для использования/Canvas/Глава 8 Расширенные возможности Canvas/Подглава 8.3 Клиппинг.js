// Глава 8: Расширенные возможности Canvas

// Подглава 8.3: Клиппинг - Создание и использование областей клиппинга

// В Canvas API клиппинг (или обрезка) используется для ограничения области рисования, так что любые дальнейшие рисунки или операции будут выполняться только в заданной области.
// Это позволяет создавать сложные формы, эффекты и манипулировать содержимым холста.

// Как работает клиппинг:
// Клиппинг на Canvas позволяет определить область, внутри которой можно рисовать. Все графические операции выполняются только в этой области.

// Пример создания и использования области клиппинга:

// Создаем новый холст и получаем его контекст для рисования
const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext('2d');

// Добавляем холст на страницу
document.body.appendChild(canvas);

// Устанавливаем цвет фона для контекста
ctx.fillStyle = 'lightgrey';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Определяем область клиппинга с помощью метода ctx.beginPath()
// Здесь создается круг, который будет служить областью клиппинга
ctx.beginPath();
ctx.arc(250, 250, 100, 0, Math.PI * 2, false); // Координаты центра (250, 250), радиус 100
ctx.clip(); // Применяем область клиппинга

// Рисуем изображение или фигуру, которая будет ограничена областью клиппинга
ctx.fillStyle = 'blue';
ctx.fillRect(0, 0, canvas.width, canvas.height); // Заполняем весь холст синим цветом

// В результате область клиппинга установлена в виде круга, и только область внутри этого круга будет видна
// Все графические операции после ctx.clip() будут ограничены этой областью

// Для удаления области клиппинга можно вызвать ctx.restore(), если нужно вернуть состояние до установки клиппинга
ctx.restore();

// Пример с использованием clip для создания прямоугольной области клиппинга:
ctx.save(); // Сохраняем текущее состояние контекста
ctx.beginPath();
ctx.rect(50, 50, 400, 400); // Создаем прямоугольную область для клиппинга
ctx.clip(); // Применяем прямоугольную область клиппинга

ctx.fillStyle = 'green';
ctx.fillRect(0, 0, canvas.width, canvas.height); // Заполняем весь холст зеленым цветом

ctx.restore(); // Восстанавливаем состояние контекста до установки клиппинга

// Итог:
// Клиппинг в Canvas API позволяет создавать сложные формы и управлять областью, в которой происходят графические операции.
// Используйте методы ctx.beginPath(), ctx.arc(), ctx.rect() и ctx.clip() для создания различных областей клиппинга.
// Метод ctx.restore() позволяет вернуть состояние контекста до применения клиппинга, что полезно для многократного использования различных областей клиппинга в одном холсте.





// Примеры

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// Рисуем фон
ctx.fillStyle = 'lightgrey';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Создаем клиппинг с текстом
ctx.font = '100px Arial';
ctx.fillStyle = 'blue';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('Clipping!', canvas.width / 2, canvas.height / 2); // Рисуем текст

ctx.globalCompositeOperation = 'destination-out'; // Устанавливаем режим композиции для удаления части холста

// Создаем область клиппинга, в которой текст будет виден
ctx.beginPath();
ctx.arc(250, 250, 150, 0, Math.PI * 2, false);
ctx.clip(); // Применяем круг для клиппинга

// Заполняем область клиппинга с фоном
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, canvas.width, canvas.height); // Красный фон будет виден только в области клиппинга


const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// Загружаем изображение
const img = new Image();
img.src = 'https://via.placeholder.com/500'; // Пример изображения

img.onload = () => {
  // Создаем область клиппинга с помощью круга
  ctx.beginPath();
  ctx.arc(250, 250, 200, 0, Math.PI * 2, false);
  ctx.clip(); // Применяем область клиппинга

  // Рисуем изображение на холсте
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Изображение будет видно только внутри области клиппинга
};




// Полезные ссылки
// MDN Web Docs: Canvas API
// MDN Web Docs: CanvasRenderingContext2D.clip()
// MDN Web Docs: CanvasRenderingContext2D.save() и restore()
// MDN Web Docs: CanvasRenderingContext2D.arc()
// MDN Web Docs: CanvasRenderingContext2D.rect()
// MDN Web Docs: CanvasRenderingContext2D.globalCompositeOperation
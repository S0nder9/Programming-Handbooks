// Глава 3: Основные методы рисования
// Подглава 3.4: Рисование текста

// В Canvas API для рисования текста используются методы `fillText()` и `strokeText()`.
// Эти методы позволяют отрисовывать текстовые строки с различными стилями и настройками.

// Метод `fillText()` используется для заполнения текста сплошным цветом:
// Пример использования `fillText()`:
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Настроим шрифт и цвет текста:
ctx.font = '30px Arial'; // Устанавливаем размер и тип шрифта
ctx.fillStyle = 'blue'; // Устанавливаем цвет заполнения текста

// Рисуем текст на Canvas:
ctx.fillText('Hello, World!', 50, 50); // Рисуем текст на координатах (50, 50)

// Метод `strokeText()` используется для рисования контурного текста:
// Пример использования `strokeText()`:
ctx.strokeStyle = 'red'; // Устанавливаем цвет контура текста
ctx.lineWidth = 2; // Устанавливаем ширину линии контура

// Рисуем контур текста на Canvas:
ctx.strokeText('Hello, World!', 50, 100); // Рисуем контур текста на координатах (50, 100)

// Настройка шрифтов и выравнивания текста:
// Чтобы изменить стиль шрифта, можно использовать свойство `font`.
// Формат: 'font-size font-family', например: '30px Arial'.

// Чтобы настроить выравнивание текста, используйте свойства `textAlign` и `textBaseline`:

// Пример настройки выравнивания текста:
ctx.font = '30px Arial';
ctx.fillStyle = 'green';
ctx.textAlign = 'center'; // Выравнивание по центру
ctx.textBaseline = 'middle'; // Вертикальное выравнивание по середине

// Рисуем текст с настроенным выравниванием:
ctx.fillText('Centered Text', canvas.width / 2, canvas.height / 2); // Рисуем текст по центру Canvas

// Примеры значений для textAlign:
// - 'start': начальное выравнивание (по умолчанию)
// - 'end': конечное выравнивание
// - 'left': выравнивание по левому краю
// - 'right': выравнивание по правому краю
// - 'center': выравнивание по центру

// Примеры значений для textBaseline:
// - 'top': выравнивание по верхнему краю
// - 'hanging': выравнивание по верхнему краю строки (в тексте)
// - 'middle': выравнивание по центру строки
// - 'alphabetic': выравнивание по базовой линии текста (по умолчанию)
// - 'bottom': выравнивание по нижнему краю

// Итог:
// Методы `fillText()` и `strokeText()` предоставляют возможности для создания текстовых элементов на Canvas.
// С помощью настроек шрифта и выравнивания текста вы можете управлять внешним видом текста и его расположением на холсте.
// Используйте `fillText()` для заполнения текста цветом и `strokeText()` для рисования контура текста.

    // Подглава 7.1: Оптимизация обработки событий

// Минимизация числа обработчиков событий
// Один из способов оптимизации обработки событий - объединение нескольких обработчиков в один.
// Вместо привязки обработчика к каждому элементу мы можем использовать делегирование событий.

// Пример: делегирование событий для управления списком элементов
const list = document.getElementById('list');

list.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        // Обработка события только для элементов списка LI
        event.target.classList.toggle('checked');
    }
});

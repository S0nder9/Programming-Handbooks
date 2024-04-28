// Подглава 3.2: Примеры использования делегирования событий

// Делегирование событий для элементов, создаваемых динамически
// В этом примере делегируем клик на кнопки, которые могут быть созданы динамически

// HTML-разметка

<div id="container">
    <button class="dynamic-btn">Кнопка 1</button>
</div>


// JavaScript
const container = document.getElementById('container');

// Добавляем обработчик события к родительскому элементу
container.addEventListener('click', (event) => {
    // Проверяем, произошло ли событие на кнопке
    if (event.target.classList.contains('dynamic-btn')) {
        // Обрабатываем событие для динамически созданной кнопки
        console.log('Нажата динамическая кнопка:', event.target.textContent);
    }
});

// Делегирование событий для списков и таблиц
// В этом примере делегируем клик на элементы списка

// HTML-разметка

<ul id="list">
    <li>Элемент 1</li>
    <li>Элемент 2</li>
    <li>Элемент 3</li>
</ul>


// JavaScript
const list = document.getElementById('list');

// Добавляем обработчик события к родительскому элементу
list.addEventListener('click', (event) => {
    // Проверяем, произошло ли событие на элементе списка
    if (event.target.tagName === 'LI') {
        // Обрабатываем событие для элемента списка
        console.log('Выбран элемент списка:', event.target.textContent);
    }
});

// Использование делегирования для уменьшения числа обработчиков событий
// В этом примере используем делегирование для управления несколькими кнопками

// HTML-разметка

<div id="buttons">
    <button class="action-btn">Действие 1</button>
    <button class="action-btn">Действие 2</button>
    <button class="action-btn">Действие 3</button>
</div>


// JavaScript
const buttonsContainer = document.getElementById('buttons');

// Добавляем обработчик события к родительскому элементу
buttonsContainer.addEventListener('click', (event) => {
    // Проверяем, произошло ли событие на кнопке
    if (event.target.classList.contains('action-btn')) {
        // Обрабатываем событие для кнопки действия
        console.log('Нажата кнопка:', event.target.textContent);
    }
});

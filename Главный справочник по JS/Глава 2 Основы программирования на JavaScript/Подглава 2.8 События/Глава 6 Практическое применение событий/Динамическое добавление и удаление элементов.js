// Подглава 6.2: Динамическое добавление и удаление элементов

// Использование событий для добавления и удаления элементов на странице
// События клика или другие события интерфейса можно использовать для динамического добавления или удаления элементов из DOM.

const addButton = document.getElementById('addButton');
const removeButton = document.getElementById('removeButton');
const list = document.getElementById('list');

addButton.addEventListener('click', function() {
    const newItem = document.createElement('li');
    newItem.textContent = 'Новый элемент';
    list.appendChild(newItem);
});

removeButton.addEventListener('click', function() {
    const items = list.getElementsByTagName('li');
    if (items.length > 0) {
        // Удаляем последний элемент списка
        list.removeChild(items[items.length - 1]);
    }
});

// Обновление интерфейса в реальном времени на основе действий пользователя
// Динамическое добавление и удаление элементов позволяет обновлять интерфейс в реальном времени в зависимости от действий пользователя.

const input = document.getElementById('input');

input.addEventListener('input', function() {
    const inputValue = input.value;
    // Обновляем интерфейс в зависимости от введенных данных
    updateUI(inputValue);
});

function updateUI(value) {
    const output = document.getElementById('output');
    output.textContent = value;
}

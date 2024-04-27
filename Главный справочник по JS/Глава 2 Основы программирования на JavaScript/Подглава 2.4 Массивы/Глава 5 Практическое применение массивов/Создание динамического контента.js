// Подглава 5.3: Создание динамического контента

// Использование массивов для генерации списков, таблиц и других элементов

// Пример генерации списка элементов
const fruits = ['Apple', 'Banana', 'Orange', 'Mango'];

// Генерируем список ul с помощью массива fruits
const ul = document.createElement('ul');

fruits.forEach(fruit => {
    const li = document.createElement('li');
    li.textContent = fruit;
    ul.appendChild(li);
});

// Добавляем созданный список в DOM
document.body.appendChild(ul);

// Динамическое добавление и удаление элементов на основе массивов

// Пример добавления элементов в список по кнопке
const addButton = document.createElement('button');
addButton.textContent = 'Add Fruit';
document.body.appendChild(addButton);

addButton.addEventListener('click', () => {
    const fruit = prompt('Enter fruit name:');
    if (fruit) {
        fruits.push(fruit);
        const li = document.createElement('li');
        li.textContent = fruit;
        ul.appendChild(li);
    }
});

// Пример удаления элементов из списка по кнопке
const removeButton = document.createElement('button');
removeButton.textContent = 'Remove Last Fruit';
document.body.appendChild(removeButton);

removeButton.addEventListener('click', () => {
    if (fruits.length > 0) {
        fruits.pop();
        ul.removeChild(ul.lastElementChild);
    }
});

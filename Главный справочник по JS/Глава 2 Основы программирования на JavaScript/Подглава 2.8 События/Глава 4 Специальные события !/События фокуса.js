// Подглава 4.3: События фокуса

// Фокусировка элементов
const inputField = document.getElementById('myInput');
inputField.addEventListener('focus', () => {
    console.log('Элемент получил фокус');
});

// Потеря фокуса элемента
inputField.addEventListener('blur', () => {
    console.log('Элемент потерял фокус');
});

// Изменение фокуса между элементами
const secondInputField = document.getElementById('secondInput');
inputField.addEventListener('focus', () => {
    console.log('Первый элемент получил фокус');
});
secondInputField.addEventListener('focus', () => {
    console.log('Второй элемент получил фокус');
});

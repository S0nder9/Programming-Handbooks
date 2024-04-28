// Событие отправки формы
form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Форма была отправлена');
});

// Событие загрузки формы
form.addEventListener('load', () => {
    console.log('Форма была загружена');
});

// Событие ошибки загрузки формы
form.addEventListener('error', () => {
    console.log('Произошла ошибка при загрузке формы');
});

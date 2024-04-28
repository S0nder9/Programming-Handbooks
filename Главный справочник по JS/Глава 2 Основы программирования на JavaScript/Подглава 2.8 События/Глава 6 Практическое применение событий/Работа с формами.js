// Подглава 6.1: Работа с формами

// Валидация форм при помощи событий
// События ввода и изменения полей формы можно использовать для реализации валидации данных перед их отправкой на сервер.

const form = document.getElementById('myForm');
const emailInput = document.getElementById('email');

emailInput.addEventListener('input', function() {
    if (!isValidEmail(this.value)) {
        this.setCustomValidity('Введите корректный email адрес');
    } else {
        this.setCustomValidity('');
    }
});

form.addEventListener('submit', function(event) {
    if (!form.checkValidity()) {
        // Если форма не проходит валидацию, предотвращаем отправку данных на сервер
        event.preventDefault();
    }
});

function isValidEmail(email) {
    // Простая проверка email адреса
    return /\S+@\S+\.\S+/.test(email);
}

// Обработка отправки формы и предотвращение повторной отправки
// Событие submit формы можно использовать для выполнения дополнительных действий перед отправкой данных на сервер, например, для проверки данных или добавления дополнительных параметров в запрос.

form.addEventListener('submit', function(event) {
    // Предотвращаем повторную отправку формы
    event.preventDefault();

    // Выполняем дополнительные действия перед отправкой данных
    sendDataToServer();
});

function sendDataToServer() {
    // Отправка данных на сервер
    console.log('Данные отправлены на сервер');
}

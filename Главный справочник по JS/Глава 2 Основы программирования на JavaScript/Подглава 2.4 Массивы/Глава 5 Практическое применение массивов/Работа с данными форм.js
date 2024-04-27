// Глава 5: Практическое применение массивов

// Подглава 5.1: Работа с данными форм

// Хранение данных форм в массивах
const formData = [];

// Обработка данных форм с помощью методов массивов
const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    const formDataEntry = {};

    // Получаем все поля формы
    const formElements = this.elements;

    // Проходимся по всем элементам формы
    for (let element of formElements) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
            // Проверяем, что это поле ввода, текстовая область или выпадающий список

            // Добавляем пару "имя поля" - "значение поля" в объект formDataEntry
            formDataEntry[element.name] = element.value;
        }
    }

    // Добавляем объект formDataEntry в массив formData
    formData.push(formDataEntry);

    // Очищаем поля формы
    this.reset();

    // Выводим массив formData в консоль
    console.log(formData);
});

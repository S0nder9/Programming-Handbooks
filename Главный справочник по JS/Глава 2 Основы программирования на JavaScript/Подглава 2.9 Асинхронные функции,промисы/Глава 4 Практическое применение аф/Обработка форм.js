// Функция для валидации данных формы
async function validateForm() {
    // Получаем данные из формы
    const formData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    // Проверяем наличие данных
    if (!formData.username || !formData.password) {
        alert('Пожалуйста, заполните все поля');
        return false;
    }

    // Валидация на сервере с помощью асинхронного запроса
    try {
        const response = await fetch('https://example.com/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Ошибка валидации');
        }

        const data = await response.json();

        // Обработка ответа сервера
        if (data.isValid) {
            alert('Данные введены корректно. Форма отправлена');
            return true;
        } else {
            alert('Ошибка валидации: ' + data.error);
            return false;
        }
    } catch (error) {
        console.error('Ошибка валидации:', error.message);
        return false;
    }
}

// Обработчик события отправки формы
document.getElementById('myForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    const isValid = await validateForm(); // Вызываем функцию валидации

    if (isValid) {
        // Отправляем данные на сервер
        // ...
    } else {
        // Действия при некорректных данных
    }
});

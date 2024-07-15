// Глава 1: Введение в CAPTCHA

// Подглава 1.1: Что такое CAPTCHA?
// CAPTCHA - это тест, который используется для определения, является ли пользователь человеком или роботом. 
// Цель CAPTCHA - предотвратить автоматические регистрации, спам и злоупотребления на веб-сайтах.

console.log("CAPTCHA - это тест, который используется для определения, является ли пользователь человеком или роботом.");

// Подглава 1.2: Зачем нужна CAPTCHA?
// CAPTCHA помогает защитить веб-сайты от злоумышленников, предотвращая автоматические атаки и спам. 
// Это важно для обеспечения безопасности и надежности веб-приложений.

console.log("CAPTCHA помогает защитить веб-сайты от злоумышленников, предотвращая автоматические атаки и спам.");

// Глава 2: Реализация простой текстовой CAPTCHA

// Подглава 2.1: Генерация случайного текста

function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
}

let captchaText = generateCaptcha();
console.log("Generated CAPTCHA:", captchaText);

// Подглава 2.2: Отображение CAPTCHA на странице
// В HTML-файле создайте элемент для отображения CAPTCHA и ввода пользователем.
document.body.innerHTML = `
    <div id="captcha-container">
        <p id="captcha">${captchaText}</p>
        <input type="text" id="captcha-input" placeholder="Введите CAPTCHA">
        <button onclick="validateCaptcha()">Проверить CAPTCHA</button>
    </div>
`;

// Подглава 2.3: Проверка пользовательского ввода

function validateCaptcha() {
    const userInput = document.getElementById('captcha-input').value;
    if (userInput === captchaText) {
        alert('CAPTCHA пройдена!');
    } else {
        alert('Неверная CAPTCHA. Попробуйте снова.');
        captchaText = generateCaptcha();
        document.getElementById('captcha').innerText = captchaText;
    }
}

// Глава 3: Расширенная CAPTCHA с изображениями

// Подглава 3.1: Генерация CAPTCHA с изображением
// В этом примере мы будем использовать библиотеку для генерации CAPTCHA-изображений.
// Для этого необходимо подключить библиотеку, такую как 'svg-captcha'.

// Установка библиотеки:
// npm install svg-captcha

const svgCaptcha = require('svg-captcha');

function generateImageCaptcha() {
    const captcha = svgCaptcha.create();
    return captcha;
}

let imageCaptcha = generateImageCaptcha();
console.log("Generated Image CAPTCHA:", imageCaptcha.text);

// Подглава 3.2: Отображение CAPTCHA изображения на странице
// В HTML-файле создайте элемент для отображения CAPTCHA изображения и ввода пользователем.
document.body.innerHTML += `
    <div id="image-captcha-container">
        <div>${imageCaptcha.data}</div>
        <input type="text" id="image-captcha-input" placeholder="Введите CAPTCHA">
        <button onclick="validateImageCaptcha()">Проверить CAPTCHA</button>
    </div>
`;

// Подглава 3.3: Проверка пользовательского ввода для CAPTCHA изображения

function validateImageCaptcha() {
    const userInput = document.getElementById('image-captcha-input').value;
    if (userInput === imageCaptcha.text) {
        alert('CAPTCHA пройдена!');
    } else {
        alert('Неверная CAPTCHA. Попробуйте снова.');
        imageCaptcha = generateImageCaptcha();
        document.getElementById('image-captcha-container').innerHTML = `
            <div>${imageCaptcha.data}</div>
            <input type="text" id="image-captcha-input" placeholder="Введите CAPTCHA">
            <button onclick="validateImageCaptcha()">Проверить CAPTCHA</button>
        `;
    }
}

// Глава 4: Интеграция reCAPTCHA от Google

// Подглава 4.1: Установка и настройка reCAPTCHA
// Зарегистрируйтесь на сайте Google reCAPTCHA и получите ключи сайта и секретные ключи.
// Вставьте следующий код в HTML-файл для подключения reCAPTCHA.

document.body.innerHTML += `
    <div class="g-recaptcha" data-sitekey="ваш_сайт_ключ"></div>
    <button onclick="validateReCaptcha()">Проверить reCAPTCHA</button>
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
`;

// Подглава 4.2: Проверка reCAPTCHA на стороне сервера
// Отправьте ответ reCAPTCHA на сервер для проверки, используя ваш секретный ключ.
// Пример использования fetch API для отправки данных на сервер.

async function validateReCaptcha() {
    const response = document.querySelector('.g-recaptcha-response').value;
    const secretKey = 'ваш_секретный_ключ';

    const verificationResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${response}`,
    });

    const verificationResult = await verificationResponse.json();

    if (verificationResult.success) {
        alert('reCAPTCHA пройдена!');
    } else {
        alert('Ошибка reCAPTCHA. Попробуйте снова.');
    }
}


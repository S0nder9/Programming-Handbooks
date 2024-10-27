// Глава 1: Дополнительные библиотеки - Nodemailer

// Nodemailer — это популярная библиотека для отправки email-сообщений с использованием Node.js.
// Она поддерживает отправку писем через SMTP, а также интеграцию с различными почтовыми сервисами, что делает её гибким решением для отправки почты в веб-приложениях.

// Установка:
// Чтобы установить Nodemailer, используйте следующую команду:
// npm install nodemailer

// Основы работы с Nodemailer:
// Для отправки письма с использованием Nodemailer, необходимо создать транспорт, указав параметры SMTP-сервера или данные почтового сервиса.
// После этого можно сформировать письмо и отправить его.

// Пример отправки email с использованием Nodemailer:

const nodemailer = require('nodemailer');

// 1. Настройка транспорта для отправки почты
// В этом примере используется SMTP-сервер Gmail, но можно заменить его на любой другой почтовый сервис.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// 2. Настройка письма
// Определяем основные параметры письма, такие как получатель, тема и текст письма.
const mailOptions = {
  from: 'your-email@gmail.com',
  to: 'recipient@example.com',
  subject: 'Пример отправки email с использованием Nodemailer',
  text: 'Это пример email-сообщения, отправленного с использованием Nodemailer и Node.js!'
};

// 3. Отправка письма
// Вызываем метод sendMail для отправки сообщения.
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Ошибка при отправке почты:', error);
  }
  console.log('Письмо успешно отправлено:', info.response);
});

// Важные настройки и параметры:

// 1. Аутентификация: 
// Если вы используете сторонний сервис, убедитесь, что введены правильные учетные данные.
// Некоторые сервисы требуют генерации специальных паролей приложений, чтобы повысить безопасность.

// 2. Настройки безопасности:
// Если отправка выполняется через Gmail, проверьте настройки аккаунта на необходимость включения параметра
// «Менее защищенные приложения» или используйте OAuth2 для безопасной аутентификации.

// Пример использования OAuth2 для Gmail:

const transporterOAuth2 = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'your-email@gmail.com',
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret',
    refreshToken: 'your-refresh-token',
    accessToken: 'your-access-token'
  }
});

// Обработка ошибок и отладка:

// Nodemailer предоставляет информацию об ошибках, если они возникают при отправке.
// Рекомендуется включить отладку для более детальной информации:

const debugTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'your-email@gmail.com', pass: 'your-email-password' },
  debug: true,
  logger: true
});

// Заключение:
// Nodemailer — это мощная и гибкая библиотека для отправки email-сообщений в Node.js.
// Она поддерживает множество почтовых сервисов, включая SMTP-серверы, Gmail, Outlook и другие, а также позволяет гибко настраивать параметры письма, такие как отправителя, получателя, вложения и формат.
// С помощью Nodemailer можно легко интегрировать функционал отправки email в любое Node.js-приложение.

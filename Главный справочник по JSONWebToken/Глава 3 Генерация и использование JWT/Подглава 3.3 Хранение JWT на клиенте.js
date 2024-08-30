// Глава 3: Генерация и использование JWT
// Подглава 3.3: Хранение JWT на клиенте

// Хранение JWT (JSON Web Tokens) на клиенте является важным аспектом обеспечения безопасности веб-приложений.
// В этой подглаве мы рассмотрим основные способы хранения JWT, их риски и методы минимизации этих рисков.

// 1. Хранение JWT в localStorage
// localStorage позволяет хранить данные в браузере без срока истечения.
// Пример хранения JWT в localStorage:
localStorage.setItem('jwt', token);
const token = localStorage.getItem('jwt');

// Риски:
// - localStorage подвержен атакам XSS (Cross-Site Scripting), что может позволить злоумышленникам получить доступ к токену.
// - localStorage доступен на стороне клиента, что делает токены уязвимыми к краже.

// Методы минимизации рисков:
// - Использование Content Security Policy (CSP) для снижения риска XSS атак.
// - Регулярная проверка и очистка данных в localStorage.
// - Обновление токенов с короткими сроками действия и использование refresh токенов.


// 2. Хранение JWT в sessionStorage
// sessionStorage работает аналогично localStorage, но данные хранятся только в течение одной сессии браузера.
// Пример хранения JWT в sessionStorage:
sessionStorage.setItem('jwt', token);
const token = sessionStorage.getItem('jwt');

// Риски:
// - sessionStorage также подвержен XSS атакам.
// - Данные теряются при закрытии вкладки или браузера.

// Методы минимизации рисков:
// - Те же методы, что и для localStorage: CSP, проверка и очистка данных, обновление токенов.


// 3. Хранение JWT в HTTP-only cookies
// HTTP-only cookies - это cookies, которые не могут быть прочитаны с помощью JavaScript, что делает их более защищенными от XSS атак.
// Пример установки JWT в HTTP-only cookie:
const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;HttpOnly`;
};

setCookie('jwt', token, 7);

// Риски:
// - Cookies подвержены атакам CSRF (Cross-Site Request Forgery), которые могут позволить злоумышленникам отправлять запросы от имени пользователя.

// Методы минимизации рисков:
// - Использование флага SameSite в cookies для защиты от CSRF:
//   document.cookie = 'jwt=' + token + '; SameSite=Strict; HttpOnly; Secure';
// - Обеспечение, что cookies устанавливаются только через HTTPS, используя флаг Secure.

// Итог:
// Хранение JWT на клиенте может осуществляться с помощью localStorage, sessionStorage или HTTP-only cookies.
// Каждый метод имеет свои риски, которые можно минимизировать с помощью соответствующих стратегий безопасности.
// Выбор метода хранения зависит от конкретных требований безопасности и функциональности вашего приложения.

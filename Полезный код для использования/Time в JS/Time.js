/*
 * Руководство по работе со временем в JavaScript
 */

// 1. Создание объекта Date
const now = new Date();
console.log('Текущее время:', now);

// 2. Создание объекта Date с определенной датой и временем
const specificDate = new Date('2024-05-19T12:00:00');
console.log('Специфическая дата:', specificDate);

// 3. Создание объекта Date через параметры
const anotherDate = new Date(2024, 4, 19, 12, 0, 0); // Месяцы от 0 до 11 (0 - январь, 4 - май)
console.log('Дата через параметры:', anotherDate);

// 4. Методы объекта Date для получения компонентов даты и времени
console.log('Год:', now.getFullYear());
console.log('Месяц (0-11):', now.getMonth());
console.log('День месяца:', now.getDate());
console.log('Час:', now.getHours());
console.log('Минута:', now.getMinutes());
console.log('Секунда:', now.getSeconds());
console.log('Миллисекунда:', now.getMilliseconds());
console.log('День недели (0-6):', now.getDay());

// 5. Методы объекта Date для установки компонентов даты и времени
const setDateExample = new Date();
setDateExample.setFullYear(2025);
setDateExample.setMonth(6); // Июль
setDateExample.setDate(4);
setDateExample.setHours(15);
setDateExample.setMinutes(45);
setDateExample.setSeconds(30);
setDateExample.setMilliseconds(123);
console.log('Измененная дата:', setDateExample);

// 6. Работа с временными зонами
console.log('Часовой пояс UTC:', now.getTimezoneOffset() / 60);

// 7. Работа с таймерами: setTimeout и setInterval
setTimeout(() => {
    console.log('Сообщение через 2 секунды');
}, 2000);

const intervalId = setInterval(() => {
    console.log('Сообщение каждые 3 секунды');
}, 3000);

// Остановка интервала через 10 секунд
setTimeout(() => {
    clearInterval(intervalId);
    console.log('Интервал остановлен');
}, 10000);

// 8. Получение метки времени (timestamp)
console.log('Метка времени в миллисекундах с 1 января 1970:', now.getTime());
console.log('Текущая метка времени:', Date.now());

// 9. Разбор и форматирование дат
const dateStr = '2024-05-19T12:00:00Z';
const parsedDate = new Date(Date.parse(dateStr));
console.log('Разобранная дата:', parsedDate);

const isoString = now.toISOString();
console.log('Дата в формате ISO:', isoString);

// 10. Дополнительные библиотеки для работы с датами
// Рекомендуется использовать библиотеки для более удобной работы с датами, такие как moment.js или date-fns
// Пример с date-fns:
import { format, parseISO } from 'date-fns';

const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
console.log('Форматированная дата с date-fns:', formattedDate);

const parsedDateFns = parseISO('2024-05-19T12:00:00Z');
console.log('Разобранная дата с date-fns:', parsedDateFns);

// 11. Разница между датами
const startDate = new Date('2024-05-19T10:00:00');
const endDate = new Date('2024-05-19T12:30:00');
const differenceInMs = endDate - startDate;
const differenceInMinutes = differenceInMs / (1000 * 60);
console.log('Разница в минутах между датами:', differenceInMinutes);

// 12. Добавление и вычитание времени
const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 10); // Добавляем 10 дней
console.log('Дата через 10 дней:', futureDate);

const pastDate = new Date();
pastDate.setHours(pastDate.getHours() - 5); // Вычитаем 5 часов
console.log('Дата 5 часов назад:', pastDate);
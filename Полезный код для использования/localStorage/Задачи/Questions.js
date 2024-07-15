/*
 * Задача 1: Сколько времени прошло с начала года?
 * Напишите функцию, которая принимает дату и возвращает количество дней, часов, минут и секунд,
 * прошедших с начала года до этой даты.
 */

// Функция для вычисления прошедшего времени с начала года
function timeSinceStartOfYear(date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const diffInMs = date - startOfYear;
    
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    const seconds = diffInSeconds % 60;
    const minutes = diffInMinutes % 60;
    const hours = diffInHours % 24;
    const days = diffInDays;

    return {
        days,
        hours,
        minutes,
        seconds
    };
}

// Пример использования функции
const now = new Date();
const timePassed = timeSinceStartOfYear(now);

console.log(`С начала года прошло:
${timePassed.days} дней,
${timePassed.hours} часов,
${timePassed.minutes} минут,
${timePassed.seconds} секунд.`);



/*
 * Задача 2: Определить, сколько времени осталось до Нового года
 * Напишите функцию, которая принимает текущую дату и возвращает количество дней, часов, минут и секунд,
 * оставшихся до наступления Нового года.
 */

// Функция для вычисления времени до Нового года
function timeUntilNewYear(date) {
    const nextYear = date.getFullYear() + 1;
    const newYearTimeDate = new Date(nextYear, 0, 1);

    const qMain = newYearTimeDate - date;

    const diffInSeconds = Math.floor(qMain / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    const seconds = diffInSeconds % 60;
    const minutes = diffInMinutes % 60;
    const hours = diffInHours % 24;
    const days = diffInDays;

    return {
        days,
        hours,
        minutes,
        seconds
    };
}

// Пример использования функции
const nowMain = new Date();
const timeLeft = timeUntilNewYear(nowMain);

console.log(`До Нового года осталось:
${timeLeft.days} дней,
${timeLeft.hours} часов,
${timeLeft.minutes} минут,
${timeLeft.seconds} секунд.`);

/*
 * Задача 3: Определить возраст
 * Напишите функцию, которая принимает дату рождения и текущую дату и возвращает количество лет, месяцев и дней,
 * прошедших с даты рождения до текущей даты.
 */

// Функция для вычисления возраста
function calculateAge(birthDate, nowYear) {
    const diffInMs = nowYear - birthDate;
    const msInDay = 1000 * 60 * 60 * 24;
    
    // Вычисляем количество прошедших дней
    const diffInDays = Math.floor(diffInMs / msInDay);
    
    // Получаем дату рождения
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();
    
    // Получаем текущую дату
    const currentYear = nowYear.getFullYear();
    const currentMonth = nowYear.getMonth();
    const currentDay = nowYear.getDate();
    
    // Определяем возраст
    let ageInYears = currentYear - birthYear;
    let ageInMonths = currentMonth - birthMonth;
    let ageInDays = currentDay - birthDay;
    
    // Корректируем возраст на случай, если текущий месяц раньше месяца рождения
    if (ageInMonths < 0 || (ageInMonths === 0 && ageInDays < 0)) {
        ageInYears--;
        ageInMonths += 12;
    }
    
    // Корректируем возраст на случай, если текущий день меньше дня рождения
    if (ageInDays < 0) {
        const lastMonth = new Date(currentYear, currentMonth - 1, 0);
        ageInDays = lastMonth.getDate() + ageInDays;
    }
    
    return {
        ageInYears,
        ageInMonths,
        ageInDays
    };
}

// Пример использования функции
const birthDate = new Date(1990, 5, 15); // 15 июня 1990 года
const nowYear = new Date();
const age = calculateAge(birthDate, nowYear);

console.log(`Возраст:
${age.ageInYears} лет,
${age.ageInMonths} месяцев,
${age.ageInDays} дней.`);

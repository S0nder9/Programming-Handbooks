// 014-аннотации-типов-в-действии-аннотации-для-переменных.ts

// Этот раздел демонстрирует, как аннотации типов применяются к переменным в TypeScript,
// чтобы явно указать их тип и обеспечить строгую проверку на этапе компиляции.

// 1. ЧИСЛОВОЙ ТИП (number)
// Аннотация указывает, что переменная принимает только числа
let oranges: number = 5; // Количество апельсинов - явно число
console.log(oranges); // 5
// oranges = "five"; // Ошибка: Type 'string' is not assignable to type 'number'
// oranges = true; // Ошибка: Type 'boolean' is not assignable to type 'number'

// Пример использования в вычислениях
oranges = oranges + 3; // Корректно: 8
console.log(`Теперь апельсинов: ${oranges}`); // "Теперь апельсинов: 8"

// 2. СТРОКОВЫЙ ТИП (string)
// Аннотация гарантирует, что переменная содержит только строки
let speed: string = "fast"; // Скорость - строка
console.log(speed); // "fast"
// speed = 100; // Ошибка: Type 'number' is not assignable to type 'string'
// speed = false; // Ошибка: Type 'boolean' is not assignable to type 'string'

// Пример манипуляции со строкой
speed = speed + "er"; // Корректно: конкатенация строк
console.log(`Новая скорость: ${speed}`); // "Новая скорость: faster"

// 3. БУЛЕВ ТИП (boolean)
// Аннотация ограничивает переменную значениями true или false
let hasDog: boolean = true; // Есть ли собака - булево значение
console.log(hasDog); // true
// hasDog = "yes"; // Ошибка: Type 'string' is not assignable to type 'boolean'
// hasDog = 1; // Ошибка: Type 'number' is not assignable to type 'boolean'

// Пример использования в логике
if (hasDog) {
  console.log("Собака есть!"); // Выполнится
}

// 4. ТИП NULL
// Аннотация указывает, что переменная может содержать только null
let nothing: null = null; // Ничего - только null
console.log(nothing); // null
// nothing = "nothing"; // Ошибка: Type 'string' is not assignable to type 'null'
// nothing = 0; // Ошибка: Type 'number' is not assignable to type 'null'

// Пример проверки на null
if (nothing === null) {
  console.log("Переменная пуста"); // Выполнится
}

// 5. ТИП UNDEFINED
// Аннотация указывает, что переменная может быть только undefined
let nothing1: undefined = undefined; // Не определено - только undefined
console.log(nothing1); // undefined
// nothing1 = null; // Ошибка: Type 'null' is not assignable to type 'undefined'
// nothing1 = "undefined"; // Ошибка: Type 'string' is not assignable to type 'undefined'

// Пример с условной логикой
if (nothing1 === undefined) {
  console.log("Значение не задано"); // Выполнится
}

// 6. ТИП DATE
// Аннотация указывает, что переменная должна быть объектом Date
let now: Date = new Date(); // Текущая дата и время
console.log(now); // Текущая дата, например: 2025-03-12T12:00:00.000Z
// now = "2025-03-12"; // Ошибка: Type 'string' is not assignable to type 'Date'
// now = 123456789; // Ошибка: Type 'number' is not assignable to type 'Date'

// Пример работы с объектом Date
console.log(`Год: ${now.getFullYear()}`); // "Год: 2025" (на основе текущей даты)

// 7. ПРАКТИЧЕСКОЕ ПРИМЕНЕНИЕ АННОТАЦИЙ
// Комбинируем переменные в функции
function describeInventory(
  items: number,
  pace: string,
  hasPet: boolean
): string {
  return `У нас ${items} предметов, скорость ${pace}, и собака: ${
    hasPet ? "да" : "нет"
  }`;
}
const description = describeInventory(oranges, speed, hasDog);
console.log(description); // "У нас 8 предметов, скорость faster, и собака: да"
// describeInventory("8", speed, hasDog); // Ошибка: Type 'string' is not assignable to type 'number'

// 8. АННОТАЦИИ С UNION TYPES
// Переменная может иметь несколько типов
let result: number | null = 10; // Может быть числом или null
result = null; // Корректно
console.log(result); // null
// result = "ten"; // Ошибка: Type 'string' is not assignable to type 'number | null'

// Пример проверки типа
if (result === null) {
  console.log("Результат отсутствует");
} else {
  console.log(`Результат: ${result}`);
}

// 9. СРАВНЕНИЕ С ВЫВОДОМ ТИПОВ
// Без аннотаций TS выведет тип автоматически, но это менее строго
let inferredOranges = 5; // TS выводит number
inferredOranges = 10; // Корректно
// inferredOranges = "ten"; // Ошибка: Type 'string' is not assignable to type 'number'

// С аннотацией мы явно контролируем тип
let explicitOranges: number = 5; // То же самое, но с явным указанием типа

// 10. РЕАЛЬНЫЙ СЦЕНАРИЙ С ПЕРЕМЕННЫМИ
// Используем все переменные в контексте миссии агента
interface MissionStatus {
  itemsCollected: number; // Количество собранных предметов
  movementSpeed: string; // Скорость передвижения
  hasCompanion: boolean; // Есть ли спутник
  lastUpdate: Date; // Время последнего обновления
  activeMission: null | string; // Текущая миссия или её отсутствие
}

const agentStatus: MissionStatus = {
  itemsCollected: oranges, // 8
  movementSpeed: speed, // "faster"
  hasCompanion: hasDog, // true
  lastUpdate: now, // текущая дата
  activeMission: nothing, // null
};

function reportStatus(status: MissionStatus): string {
  return (
    `Агент собрал ${status.itemsCollected} предметов, движется ${status.movementSpeed}, ` +
    `спутник: ${status.hasCompanion ? "есть" : "нет"}, обновлено: ${
      status.lastUpdate
    }`
  );
}
console.log(reportStatus(agentStatus));
// "Агент собрал 8 предметов, движется faster, спутник: есть, обновлено: [текущая дата]"

// Итог: Аннотации типов для переменных позволяют строго контролировать их значения,
// предотвращая ошибки и улучшая читаемость кода.

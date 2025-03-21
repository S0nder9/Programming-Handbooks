// 031-типизированные-массивы-когда-использовать-типизированные-массивы.ts

// Этот раздел объясняет, в каких ситуациях стоит использовать типизированные массивы в TypeScript,
// включая массивы с одним типом, union типами, кортежи и readonly массивы.

// 1. КОГДА ВСЕ ЭЛЕМЕНТЫ ОДНОГО ТИПА
// Используем типизированные массивы для однородных данных
let agentIds: number[] = [7, 8, 9];
// Преимущество: гарантирует, что все элементы - числа
agentIds.push(10); // Корректно
// agentIds.push("Bond"); // Ошибка: Type 'string' is not assignable to type 'number'
console.log(agentIds); // [7, 8, 9, 10]

// Пример: список имён агентов
let agentNames: string[] = ["Bond", "M", "Q"];
agentNames.push("Eve"); // Корректно
console.log(agentNames); // ["Bond", "M", "Q", "Eve"]

// Когда использовать: если массив содержит однотипные данные (например, список ID, имён, дат)

// 2. КОГДА НУЖНЫ РАЗНЫЕ ТИПЫ С ГИБКОСТЬЮ (UNION TYPES)
// Используем union для массивов с несколькими допустимыми типами
let mixedData: (string | number)[] = ["Bond", 7, "M", 8];
// Преимущество: позволяет хранить разные типы, но ограничивает их заданным набором
mixedData.push(9); // Корректно
mixedData.push("Q"); // Корректно
// mixedData.push(true); // Ошибка: Type 'boolean' is not assignable to type 'string | number'
console.log(mixedData); // ["Bond", 7, "M", 8, 9, "Q"]

// Когда использовать: если данные разнородны, но их типы заранее известны (например, логи событий с кодами и сообщениями)

// 3. КОГДА НУЖНА СТРОГАЯ СТРУКТУРА (TUPLES)
// Используем кортежи для массивов с фиксированной длиной и типами
let agentProfile: [string, number, boolean] = ["Bond", 7, true];
// Преимущество: фиксирует порядок и типы элементов
agentProfile[1] = 8; // Корректно
// agentProfile[0] = 007; // Ошибка: Type 'number' is not assignable to type 'string'
// agentProfile.push("extra"); // Корректно, но нарушает структуру (осторожно!)
console.log(agentProfile); // ["Bond", 8, true]

// Пример: координаты
let coords: [number, number] = [51.477928, -0.001545];
// Когда использовать: если массив представляет запись с определённым порядком (например, [имя, возраст], [lat, lon])

// 4. КОГДА НУЖНА НЕИЗМЕНЯЕМОСТЬ (READONLY)
// Используем readonly для защиты массива от изменений
let fixedTargets: readonly string[] = ["enemy1", "enemy2"];
// Преимущество: предотвращает случайные изменения
// fixedTargets.push("enemy3"); // Ошибка: Property 'push' does not exist on type 'readonly string[]'
// fixedTargets[0] = "new"; // Ошибка: Index signature in type 'readonly string[]' only permits reading
console.log(fixedTargets); // ["enemy1", "enemy2"]

// Readonly кортеж
let fixedCoords: readonly [number, number] = [51.477928, -0.001545];
// Когда использовать: если массив - константа или передаётся как неизменяемый параметр

// 5. КОГДА МАССИВ СОДЕРЖИТ ОБЪЕКТЫ
// Типизируем массив объектов для сложных данных
interface Gadget {
    name: string;
    type: "weapon" | "vehicle";
}
let inventory: Gadget[] = [
    { name: "Walther PPK", type: "weapon" },
    { name: "Aston Martin DB5", type: "vehicle" }
];
// Преимущество: обеспечивает строгую структуру каждого элемента
inventory.push({ name: "Jetpack", type: "vehicle" }); // Корректно
// inventory.push({ name: "Bomb", type: "tool" }); // Ошибка: Type '"tool"' is not assignable to type '"weapon" | "vehicle"'
console.log(inventory); 
// [{ name: "Walther PPK", type: "weapon" }, { name: "Aston Martin DB5", type: "vehicle" }, { name: "Jetpack", type: "vehicle" }]

// Когда использовать: если массив хранит структурированные данные (например, список пользователей, товаров)

// 6. КОГДА НУЖНА ГИБКОСТЬ С GENERICS
// Используем generics для универсальных функций с массивами
function getFirst<T>(items: T[]): T {
    return items[0];
}
// Преимущество: работает с любым типом массива
const firstAgent = getFirst<string>(["Bond", "M"]); // "Bond"
const firstId = getFirst<number>([7, 8]); // 7
console.log(firstAgent, firstId); // "Bond", 7

// Когда использовать: если функция должна работать с массивами разных типов (например, утилиты обработки массивов)

// 7. КОГДА НУЖНО ПЕРЕДАВАТЬ МАССИВЫ В ФУНКЦИИ
// Типизируем параметры и возвращаемые значения
function summarizeAgents(agents: string[]): string {
    return agents.join(", ");
}
console.log(summarizeAgents(["Bond", "M"])); // "Bond, M"
// summarizeAgents([1, 2]); // Ошибка: Type 'number' is not assignable to type 'string'

// Когда использовать: если функция ожидает массив определённого типа

// 8. ПРАКТИЧЕСКИЙ ПРИМЕР: КОГДА ИСПОЛЬЗОВАТЬ КАКОЙ ТИП
// Сценарий: управление миссией агента
interface Mission {
    codes: string[]; // Однотипный массив кодов миссий
    log: (string | number)[]; // Лог с разными типами
    target: [string, number]; // Кортеж: имя цели и приоритет
    gadgets: readonly Gadget[]; // Неизменяемый массив гаджетов
}

const mission: Mission = {
    codes: ["GF", "SF"], // Простой список кодов
    log: ["Started", 7, "Target spotted"], // Смешанные данные
    target: ["enemy1", 1], // Фиксированная структура
    gadgets: [
        { name: "Walther PPK", type: "weapon" },
        { name: "Aston Martin DB5", type: "vehicle" }
    ] // Неизменяемый список
};

function briefMission(m: Mission): string {
    const gadgetList = m.gadgets.map(g => g.name).join(", ");
    return `Codes: ${m.codes.join(", ")}, Log: ${m.log.join(", ")}, Target: ${m.target[0]} (Priority: ${m.target[1]}), Gadgets: ${gadgetList}`;
}
console.log(briefMission(mission)); 
// "Codes: GF, SF, Log: Started, 7, Target spotted, Target: enemy1 (Priority: 1), Gadgets: Walther PPK, Aston Martin DB5"

// Когда использовать:
// - codes: однотипные данные
// - log: гибкость с разными типами
// - target: строгая структура
// - gadgets: защита от изменений

// 9. КОГДА НЕ ИСПОЛЬЗОВАТЬ ТИПИЗИРОВАННЫЕ МАССИВЫ
// Если типы полностью неизвестны (редкий случай)
let unknownData: any[] = ["Bond", 7, true]; // Используем any, но это снижает безопасность
unknownData.push({ random: "data" }); // Корректно, но опасно
console.log(unknownData); // ["Bond", 7, true, { random: "data" }]

// Предпочтительнее unknown с проверкой
let saferData: unknown[] = ["Bond", 7];
if (typeof saferData[0] === "string") {
    console.log(saferData[0].toUpperCase()); // "BOND"
}

// Итог: Типизированные массивы стоит использовать, когда:
// - данные однотипны (T[])
// - нужны разные типы с контролем (union)
// - требуется строгая структура (tuples)
// - нужна неизменяемость (readonly)
// - массив передаётся в функции или содержит объекты
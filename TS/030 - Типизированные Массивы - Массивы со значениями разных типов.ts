// 030-типизированные-массивы-массивы-со-значениями-разных-типов.ts

// Этот раздел объясняет, как TypeScript работает с массивами, содержащими значения разных типов,
// используя union types, кортежи (tuples) и другие подходы для строгой типизации.

// 1. UNION TYPES ДЛЯ МАССИВОВ
// Массив может содержать элементы нескольких типов
let mixedArray: (string | number)[] = ["Bond", 7, "M", 8];
mixedArray.push("Q"); // Корректно
mixedArray.push(9); // Корректно
// mixedArray.push(true); // Ошибка: Type 'boolean' is not assignable to type 'string | number'
console.log(mixedArray); // ["Bond", 7, "M", 8, "Q", 9]

// Вывод типов для mixed array
let inferredMixed = ["Bond", 7]; // TS выводит (string | number)[]
inferredMixed.push(8); // Корректно
// inferredMixed.push(true); // Ошибка: Type 'boolean' is not assignable to type 'string | number'
console.log(inferredMixed); // ["Bond", 7, 8]

// 2. РАБОТА С UNION TYPES В ФУНКЦИЯХ
// Функция обрабатывает массив с разными типами
function processMixed(items: (string | number)[]): string {
    return items.map(item => typeof item === "string" ? item.toUpperCase() : item * 2).join(", ");
}
console.log(processMixed(["Bond", 7, "M"])); // "BOND, 14, M"
// processMixed([true, "Bond"]); // Ошибка: Type 'boolean' is not assignable to type 'string | number'

// 3. КОРТЕЖИ ДЛЯ СТРОГОЙ СТРУКТУРЫ
// Кортеж фиксирует порядок и типы элементов
let agentInfo: [string, number, boolean] = ["Bond", 7, true];
// agentInfo[0] = 007; // Ошибка: Type 'number' is not assignable to type 'string'
// agentInfo.push("extra"); // Корректно добавляет элемент, но нарушает структуру кортежа (осторожно!)
console.log(agentInfo); // ["Bond", 7, true]

// Кортеж с опциональными элементами
let missionData: [string, number, string?] = ["GF", 1];
missionData[2] = "Shanghai"; // Корректно
console.log(missionData); // ["GF", 1, "Shanghai"]

// 4. МАССИВЫ С ОБЪЕКТАМИ РАЗНЫХ ТИПОВ
// Используем интерфейсы и union для объектов
interface Weapon {
    name: string;
    type: "weapon";
    damage: number;
}
interface Vehicle {
    name: string;
    type: "vehicle";
    speed: number;
}
type Gadget = Weapon | Vehicle;

let inventory: Gadget[] = [
    { name: "Walther PPK", type: "weapon", damage: 50 },
    { name: "Aston Martin DB5", type: "vehicle", speed: 200 }
];
inventory.push({ name: "Jetpack", type: "vehicle", speed: 150 }); // Корректно
// inventory.push({ name: "Bomb", type: "tool" }); // Ошибка: Type '"tool"' is not assignable to type '"weapon" | "vehicle"'
console.log(inventory); 
// [{ name: "Walther PPK", type: "weapon", damage: 50 }, { name: "Aston Martin DB5", type: "vehicle", speed: 200 }, { name: "Jetpack", type: "vehicle", speed: 150 }]

// Функция для обработки таких массивов
function describeGadgets(gadgets: Gadget[]): string {
    return gadgets.map(g => 
        g.type === "weapon" ? `${g.name} (Damage: ${g.damage})` : `${g.name} (Speed: ${g.speed})`
    ).join(", ");
}
console.log(describeGadgets(inventory)); 
// "Walther PPK (Damage: 50), Aston Martin DB5 (Speed: 200), Jetpack (Speed: 150)"

// 5. READONLY МАССИВЫ С РАЗНЫМИ ТИПАМИ
// Запрещаем изменение массива с union типами
let readonlyMixed: readonly (string | number)[] = ["Bond", 7];
// readonlyMixed.push("M"); // Ошибка: Property 'push' does not exist on type 'readonly (string | number)[]'
// readonlyMixed[0] = 007; // Ошибка: Index signature in type 'readonly (string | number)[]' only permits reading
console.log(readonlyMixed); // ["Bond", 7]

// Readonly кортеж
let fixedData: readonly [string, number] = ["GF", 1];
// fixedData[0] = "SF"; // Ошибка: Cannot assign to '0' because it is a read-only property

// 6. GENERICS ДЛЯ МАССИВОВ С РАЗНЫМИ ТИПАМИ
// Обобщённая функция для работы с массивами
function pairItems<T, U>(first: T[], second: U[]): [T, U][] {
    return first.map((item, index) => [item, second[index] || null]);
}
const agents = ["Bond", "M"];
const ids = [7, 8];
const paired = pairItems(agents, ids);
console.log(paired); // [["Bond", 7], ["M", 8]]

// 7. REST ПАРАМЕТРЫ С UNION ТИПАМИ
// Аннотируем переменное число аргументов разных типов
function logMixed(...items: (string | number)[]): void {
    console.log(items);
}
logMixed("Bond", 7, "M", 8); // ["Bond", 7, "M", 8]
// logMixed("Bond", true); // Ошибка: Type 'boolean' is not assignable to type 'string | number'

// 8. ПРАКТИЧЕСКИЙ ПРИМЕР С МАССИВАМИ РАЗНЫХ ТИПОВ
// Сценарий: управление миссией с разными данными
interface MissionLog {
    events: (string | number | { action: string; time: Date })[];
    targets: [string, number]; // Кортеж: имя цели и приоритет
}

const missionLog: MissionLog = {
    events: [
        "Mission started",
        7, // ID агента
        { action: "Target spotted", time: new Date("2025-03-12") }
    ],
    targets: ["enemy1", 1]
};

function summarizeLog(log: MissionLog): string {
    const eventSummary = log.events.map(event => {
        if (typeof event === "string") return event;
        if (typeof event === "number") return `Agent ${event}`;
        return `${event.action} at ${event.time}`;
    }).join("; ");
    return `Events: ${eventSummary}, Target: ${log.targets[0]} (Priority: ${log.targets[1]})`;
}
console.log(summarizeLog(missionLog)); 
// "Events: Mission started; Agent 7; Target spotted at Wed Mar 12 2025 00:00:00 GMT+0000; Target: enemy1 (Priority: 1)"

// 9. ОШИБКИ С МАССИВАМИ РАЗНЫХ ТИПОВ
// Типичные проблемы
let unionArray: (string | number)[] = ["Bond", 7];
// unionArray.push(true); // Ошибка: Type 'boolean' is not assignable to type 'string | number'

let tuple: [string, number] = ["Bond", 7];
// tuple[0] = 007; // Ошибка: Type 'number' is not assignable to type 'string'

// Итог: TypeScript позволяет типизировать массивы с разными типами через union и кортежи,
// обеспечивая гибкость и строгую проверку типов.
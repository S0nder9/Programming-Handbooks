// 028-типизированные-массивы-массивы-в-typescript.ts

// Этот раздел объясняет, как TypeScript работает с массивами, включая аннотации типов,
// вывод типов, кортежи (tuples), readonly массивы и другие аспекты.

// 1. БАЗОВАЯ АННОТАЦИЯ ТИПА МАССИВА
// Указываем тип элементов массива с помощью синтаксиса T[]
let gadgets: string[] = ["Walther PPK", "Aston Martin DB5"];
gadgets.push("Jetpack"); // Корректно
// gadgets.push(007); // Ошибка: Type 'number' is not assignable to type 'string'
console.log(gadgets); // ["Walther PPK", "Aston Martin DB5", "Jetpack"]

// Альтернативный синтаксис с Array<T>
let codes: Array<number> = [7, 8, 9];
// codes.push("007"); // Ошибка: Type 'string' is not assignable to type 'number'
console.log(codes); // [7, 8, 9]

// 2. ВЫВОД ТИПОВ ДЛЯ МАССИВОВ
// TS автоматически выводит тип на основе значений
let agents = ["Bond", "M"]; // TS выводит string[]
agents.push("Q"); // Корректно
// agents.push(7); // Ошибка: Type 'number' is not assignable to type 'string'
console.log(agents); // ["Bond", "M", "Q"]

// Смешанные типы приводят к union типу
let mixed = [7, "Bond"]; // TS выводит (number | string)[]
mixed.push(8); // Корректно
mixed.push("M"); // Корректно
// mixed.push(true); // Ошибка: Type 'boolean' is not assignable to type 'string | number'
console.log(mixed); // [7, "Bond", 8, "M"]

// 3. КОРТЕЖИ (TUPLES)
// Массивы с фиксированной длиной и типами элементов
let coordinates: [number, number] = [51.477928, -0.001545];
// coordinates[0] = "lat"; // Ошибка: Type 'string' is not assignable to type 'number'
// coordinates.push(100); // Корректно добавляет элемент, но нарушает фиксированную длину (осторожно!)
console.log(coordinates); // [51.477928, -0.001545]

// Кортеж с опциональным элементом
let agentInfo: [string, number, boolean?] = ["Bond", 7];
agentInfo[2] = true; // Корректно
console.log(agentInfo); // ["Bond", 7, true]

// 4. READONLY МАССИВЫ
// Запрещаем изменение массива после инициализации
let targets: readonly string[] = ["enemy1", "enemy2"];
// targets.push("enemy3"); // Ошибка: Property 'push' does not exist on type 'readonly string[]'
// targets[0] = "new"; // Ошибка: Index signature in type 'readonly string[]' only permits reading
console.log(targets); // ["enemy1", "enemy2"]

// Readonly кортеж
let fixedCoords: readonly [number, number] = [51.477928, -0.001545];
// fixedCoords[0] = 0; // Ошибка: Cannot assign to '0' because it is a read-only property

// 5. МАССИВЫ В ФУНКЦИЯХ
// Аннотируем массивы как параметры и возвращаемые значения
function listGadgets(gadgets: string[]): string {
    return gadgets.join(", ");
}
console.log(listGadgets(["Walther PPK", "Jetpack"])); // "Walther PPK, Jetpack"
// listGadgets([1, 2]); // Ошибка: Type 'number' is not assignable to type 'string'

// Функция, возвращающая массив
function getAgentIds(): number[] {
    return [7, 8, 9];
}
const ids = getAgentIds();
console.log(ids); // [7, 8, 9]

// 6. REST ПАРАМЕТРЫ С МАССИВАМИ
// Аннотируем переменное число аргументов
function logAgents(...names: string[]): void {
    console.log(names);
}
logAgents("Bond", "M", "Q"); // ["Bond", "M", "Q"]
// logAgents("Bond", 7); // Ошибка: Type 'number' is not assignable to type 'string'

// 7. МАССИВЫ С ОБЪЕКТАМИ
// Типизируем массив объектов
interface Gadget {
    name: string;
    type: "weapon" | "vehicle";
}
let inventory: Gadget[] = [
    { name: "Walther PPK", type: "weapon" },
    { name: "Aston Martin DB5", type: "vehicle" }
];
inventory.push({ name: "Jetpack", type: "vehicle" }); // Корректно
// inventory.push({ name: "Bomb", type: "tool" }); // Ошибка: Type '"tool"' is not assignable to type '"weapon" | "vehicle"'
console.log(inventory); 
// [{ name: "Walther PPK", type: "weapon" }, { name: "Aston Martin DB5", type: "vehicle" }, { name: "Jetpack", type: "vehicle" }]

// 8. GENERICS С МАССИВАМИ
// Используем обобщённые типы для гибкости
function getFirst<T>(items: T[]): T {
    return items[0];
}
const firstGadget = getFirst<Gadget>(inventory); // Gadget
console.log(firstGadget.name); // "Walther PPK"
const firstNum = getFirst<number>([1, 2, 3]); // number
console.log(firstNum); // 1

// 9. ПРАКТИЧЕСКИЙ ПРИМЕР С МАССИВАМИ
// Сценарий: управление арсеналом агента
interface Mission {
    code: string;
    gadgets: readonly Gadget[]; // Неизменяемый массив гаджетов
    targets: [string, string]; // Кортеж с двумя целями
}

const mission: Mission = {
    code: "GF",
    gadgets: [
        { name: "Walther PPK", type: "weapon" },
        { name: "Aston Martin DB5", type: "vehicle" }
    ],
    targets: ["enemy1", "enemy2"]
};
// mission.gadgets.push({ name: "Jetpack", type: "vehicle" }); // Ошибка: Property 'push' does not exist on type 'readonly Gadget[]'
mission.targets[0] = "newTarget"; // Корректно для кортежа

function briefMission({ code, gadgets, targets }: Mission): string {
    const gadgetList = gadgets.map(g => g.name).join(", ");
    return `${code}: Gadgets - ${gadgetList}, Targets - ${targets.join(", ")}`;
}
console.log(briefMission(mission)); 
// "GF: Gadgets - Walther PPK, Aston Martin DB5, Targets - newTarget, enemy2"

// 10. ОШИБКИ С МАССИВАМИ
// Типичные проблемы
let nums: number[] = [1, 2, 3];
// nums.push("four"); // Ошибка: Type 'string' is not assignable to type 'number'

let tuple: [string, number] = ["Bond", 7];
// tuple[2] = "extra"; // Корректно добавляет элемент через push, но нарушает кортеж (осторожно!)

// Итог: TypeScript предоставляет мощные инструменты для типизации массивов (T[], tuples, readonly, generics),
// обеспечивая безопасность и контроль над данными.
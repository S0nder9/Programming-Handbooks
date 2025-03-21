// 034-tuples-кортежи-в-typescript-для-чего-нужны.ts

// Этот раздел объясняет, для чего нужны кортежи (tuples) в TypeScript,
// их преимущества и типичные сценарии использования.

// 1. ЧТО ТАКОЕ КОРТЕЖИ И ЗАЧЕМ ОНИ НУЖНЫ
// Кортежи - это массивы с фиксированной длиной и заранее заданными типами элементов.
// Они нужны для:
// - строгого контроля порядка и типов данных
// - представления данных с фиксированной структурой
// - упрощения кода вместо объектов для кратких записей

let agentTuple: [string, number] = ["Bond", 7];
console.log(agentTuple); // ["Bond", 7]
// agentTuple[0] = 007; // Ошибка: Type 'number' is not assignable to type 'string'

// 2. СТРОГИЙ ПОРЯДОК И ТИПЫ
// Кортежи гарантируют, что элементы находятся в определённом порядке и имеют заданные типы
let coordinates: [number, number] = [51.477928, -0.001545];
// Преимущество: TS проверяет тип каждого элемента по его позиции
coordinates[0] = 52; // Корректно
// coordinates[1] = "lon"; // Ошибка: Type 'string' is not assignable to type 'number'
console.log(coordinates); // [52, -0.001545]

// Когда использовать: для данных, где порядок имеет значение (например, координаты, [имя, возраст])

// 3. ВОЗВРАЩЕНИЕ НЕСКОЛЬКИХ ЗНАЧЕНИЙ ИЗ ФУНКЦИИ
// Кортежи удобны для возврата набора значений без создания объекта
function getAgentInfo(): [string, number, boolean] {
    return ["Bond", 7, true];
}
const [name, id, active] = getAgentInfo(); // Деструктуризация
console.log(`${name} (ID: ${id}, Active: ${active})`); // "Bond (ID: 7, Active: true)"

// Почему кортеж: компактнее, чем объект, и сохраняет порядок
// Альтернатива с объектом:
interface AgentInfo { name: string; id: number; active: boolean }
function getAgentObject(): AgentInfo { return { name: "Bond", id: 7, active: true }; }

// 4. ЗАМЕНА ПРОСТЫХ ОБЪЕКТОВ
// Кортежи могут заменить объекты для кратких данных
let missionTarget: [string, number] = ["enemy1", 1]; // [имя цели, приоритет]
// Против объекта:
interface Target { name: string; priority: number }
let targetObject: Target = { name: "enemy1", priority: 1 };
// Кортеж проще и короче, если имена полей не критичны
console.log(`Target: ${missionTarget[0]}, Priority: ${missionTarget[1]}`); // "Target: enemy1, Priority: 1"

// Когда использовать: для парного или краткого набора данных без необходимости именования полей

// 5. ФИКСИРОВАННАЯ СТРУКТУРА ДАННЫХ
// Кортежи подходят для данных с неизменным количеством элементов
let rgbColor: [number, number, number] = [255, 128, 0];
// rgbColor.push(100); // Корректно, но нарушает структуру (осторожно!)
// rgbColor[3] = 50; // Корректно через индекс, но нарушает длину
console.log(rgbColor); // [255, 128, 0]

// Используйте readonly для защиты структуры
let fixedColor: readonly [number, number, number] = [255, 128, 0];
// fixedColor[0] = 0; // Ошибка: Cannot assign to '0' because it is a read-only property
// fixedColor.push(100); // Ошибка: Property 'push' does not exist on type

// Когда использовать: для данных с фиксированным количеством элементов (например, RGB, XYZ)

// 6. УПРОЩЕНИЕ КОДА С ДЕСТРУКТУРИЗАЦИЕЙ
// Кортежи удобно деструктурировать для быстрого доступа к элементам
function parseCoordinates(input: string): [number, number] {
    const [lat, lon] = input.split(",");
    return [Number(lat), Number(lon)];
}
const [lat, lon] = parseCoordinates("51.477928,-0.001545");
console.log(`Lat: ${lat}, Lon: ${lon}`); // "Lat: 51.477928, Lon: -0.001545"

// Когда использовать: для парсинга или обработки данных с предсказуемой структурой

// 7. КОГДА НУЖНЫ ОПЦИОНАЛЬНЫЕ ЭЛЕМЕНТЫ
// Кортежи поддерживают опциональные элементы с "?"
let missionData: [string, number, string?] = ["GF", 1];
missionData[2] = "Switzerland"; // Корректно
console.log(missionData); // ["GF", 1, "Switzerland"]
missionData = ["SF", 2]; // Корректно, третий элемент необязателен
// missionData[2] = 3; // Ошибка: Type 'number' is not assignable to type 'string'

// Когда использовать: если некоторые элементы могут отсутствовать, но порядок фиксирован

// 8. ПРАКТИЧЕСКИЙ ПРИМЕР С КОРТЕЖАМИ
// Сценарий: управление миссией агента
type MissionSummary = [string, number, string]; // [код, приоритет, место]
type TargetPair = readonly [string, string]; // [цель1, цель2]

const mission: MissionSummary = ["GF", 1, "Switzerland"];
const targets: TargetPair = ["enemy1", "enemy2"];

function briefMission([code, priority, location]: MissionSummary, [target1, target2]: TargetPair): string {
    return `${code} (Priority: ${priority}) in ${location}, Targets: ${target1}, ${target2}`;
}
console.log(briefMission(mission, targets)); 
// "GF (Priority: 1) in Switzerland, Targets: enemy1, enemy2"

// Почему кортежи:
// - MissionSummary: фиксированная структура миссии
// - TargetPair: неизменяемый список целей

// 9. ОГРАНИЧЕНИЯ И АЛЬТЕРНАТИВЫ
// Проблема: методы массива могут нарушить длину
let riskyTuple: [string, number] = ["Bond", 7];
riskyTuple.push(8); // Добавляет элемент, нарушая структуру
console.log(riskyTuple); // ["Bond", 7, 8]

// Альтернатива: используйте объекты для сложных данных
interface MissionDetails {
    code: string;
    priority: number;
    location: string;
}
const missionObj: MissionDetails = { code: "GF", priority: 1, location: "Switzerland" };

// Когда кортежи не подходят:
// - если структура сложная и требует именованных полей
// - если длина может меняться (лучше использовать обычные массивы)

// 10. ИТОГ: ДЛЯ ЧЕГО НУЖНЫ КОРТЕЖИ
// Кортежи нужны для:
// - строгого контроля длины и типов (например, [lat, lon])
// - возврата нескольких значений из функций
// - замены простых объектов (например, [имя, возраст])
// - работы с фиксированными наборами данных
// - упрощения деструктуризации
console.log("Кортежи - это мощный инструмент для фиксированных структур данных в TS");

// Пример итогового использования
function splitAgent(agent: string): [string, number] {
    const [n, i] = agent.split("-");
    return [n, Number(i)];
}
const [agentName, agentId] = splitAgent("Bond-007");
console.log(`${agentName} (ID: ${agentId})`); // "Bond (ID: 7)"
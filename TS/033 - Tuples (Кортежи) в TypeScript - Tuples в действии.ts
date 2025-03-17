// 032-tuples-кортежи-в-typescript.ts

// Этот раздел объясняет, что такое кортежи (tuples) в TypeScript, как они работают,
// и как их использовать для строгой типизации массивов с фиксированной длиной и порядком типов.

// 1. ОСНОВЫ КОРТЕЖЕЙ
// Кортеж - это массив с фиксированной длиной и заранее заданными типами элементов
let agentProfile: [string, number] = ["Bond", 7];
// Преимущество: порядок и типы строго определены
agentProfile[0] = "M"; // Корректно (строка на позиции 0)
// agentProfile[0] = 007; // Ошибка: Type 'number' is not assignable to type 'string'
// agentProfile[2] = true; // Корректно через push, но нарушает структуру (см. ниже)
console.log(agentProfile); // ["M", 7]

// 2. ОТЛИЧИЕ ОТ ОБЫЧНОГО МАССИВА
// Обычный массив допускает любое количество элементов одного типа
let regularArray: string[] = ["Bond", "M"];
regularArray.push("Q"); // Корректно, длина не фиксирована
console.log(regularArray); // ["Bond", "M", "Q"]

// Кортеж фиксирует длину и типы
let tuple: [string, number] = ["Bond", 7];
// tuple.push("Q"); // Корректно добавляет, но нарушает фиксированную длину (осторожно!)
console.log(tuple); // ["Bond", 7]

// 3. ОПЦИОНАЛЬНЫЕ ЭЛЕМЕНТЫ В КОРТЕЖАХ
// Используем "?" для необязательных элементов
let missionInfo: [string, number, boolean?] = ["GF", 1];
missionInfo[2] = true; // Корректно
console.log(missionInfo); // ["GF", 1, true]
missionInfo = ["SF", 2]; // Корректно, третий элемент опционален
// missionInfo[2] = "test"; // Ошибка: Type 'string' is not assignable to type 'boolean'

// 4. READONLY КОРТЕЖИ
// Запрещаем изменение элементов кортежа
let fixedCoords: readonly [number, number] = [51.477928, -0.001545];
// fixedCoords[0] = 0; // Ошибка: Cannot assign to '0' because it is a read-only property
// fixedCoords.push(100); // Ошибка: Property 'push' does not exist on type 'readonly [number, number]'
console.log(fixedCoords); // [51.477928, -0.001545]

// 5. КОРТЕЖИ В ФУНКЦИЯХ
// Используем кортежи как параметры и возвращаемые значения
function getAgentData(): [string, number] {
    return ["Bond", 7];
}
const [name, id] = getAgentData(); // Деструктуризация кортежа
console.log(`${name} (ID: ${id})`); // "Bond (ID: 7)"

// Функция с параметром-кортежем
function processCoords([lat, lon]: [number, number]): string {
    return `Lat: ${lat}, Lon: ${lon}`;
}
console.log(processCoords([51.477928, -0.001545])); // "Lat: 51.477928, Lon: -0.001545"
// processCoords([51, "0"]); // Ошибка: Type 'string' is not assignable to type 'number'

// 6. КОРТЕЖИ С REST ЭЛЕМЕНТАМИ
// Используем ... для остаточных элементов одного типа
type FlexibleTuple = [string, ...number[]];
let scores: FlexibleTuple = ["Bond", 90, 85, 95];
scores = ["M", 80]; // Корректно, минимум один number необязателен
// scores = ["Q"]; // Ошибка: Type 'string' is not assignable to type 'number'
console.log(scores); // ["M", 80]

// 7. ПРАКТИЧЕСКИЙ ПРИМЕР С КОРТЕЖАМИ
// Сценарий: описание миссии с фиксированной структурой
interface Mission {
    summary: [string, number, string]; // [код миссии, приоритет, место]
    targets: readonly [string, string]; // неизменяемые цели
}

const mission: Mission = {
    summary: ["GF", 1, "Switzerland"],
    targets: ["enemy1", "enemy2"]
};
// mission.summary[0] = "SF"; // Корректно
// mission.summary[1] = "high"; // Ошибка: Type 'string' is not assignable to type 'number'
// mission.targets[0] = "new"; // Ошибка: Cannot assign to '0' because it is a read-only property

function briefMission({ summary: [code, priority, location], targets }: Mission): string {
    return `${code} (Priority: ${priority}) in ${location}, Targets: ${targets.join(", ")}`;
}
console.log(briefMission(mission)); 
// "GF (Priority: 1) in Switzerland, Targets: enemy1, enemy2"

// 8. ОШИБКИ И ОГРАНИЧЕНИЯ КОРТЕЖЕЙ
// Проблема: методы массива могут нарушить структуру
let riskyTuple: [string, number] = ["Bond", 7];
riskyTuple.push(8); // Корректно добавляет элемент, но нарушает длину кортежа
console.log(riskyTuple); // ["Bond", 7, 8] - теперь длина 3, а не 2

// Решение: используйте readonly для защиты
let safeTuple: readonly [string, number] = ["Bond", 7];
// safeTuple.push(8); // Ошибка: Property 'push' does not exist on type 'readonly [string, number]'

// Проблема: несоответствие длины
// let wrongTuple: [string, number] = ["Bond", 7, true]; // Ошибка: Type '[string, number, boolean]' is not assignable to type '[string, number]'

// 9. КОГДА ИСПОЛЬЗОВАТЬ КОРТЕЖИ
// Пример: возвращаемое значение с фиксированной структурой
function parseAgent(input: string): [string, number] {
    const [name, id] = input.split("-");
    return [name, Number(id)];
}
const [parsedName, parsedId] = parseAgent("Bond-007");
console.log(`${parsedName} (ID: ${parsedId})`); // "Bond (ID: 7)"

// Когда использовать:
// - фиксированная длина и порядок важны (например, [имя, возраст], [lat, lon])
// - возвращаемое значение функции с несколькими элементами
// - замена объектов для простых структур данных

// 10. СРАВНЕНИЕ С ОБЪЕКТАМИ
// Кортеж
let tupleData: [string, number] = ["Bond", 7];

// Объект
interface AgentData {
    name: string;
    id: number;
}
let objectData: AgentData = { name: "Bond", id: 7 };
// Кортеж проще для кратких данных, объект - для именованных полей

// Итог: Кортежи в TypeScript идеальны для массивов с фиксированной длиной и порядком типов,
// обеспечивая строгую типизацию и предсказуемость структуры.
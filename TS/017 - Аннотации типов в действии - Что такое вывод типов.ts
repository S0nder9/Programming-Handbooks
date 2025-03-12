// 017-аннотации-типов-в-действии-что-такое-вывод-типов.ts

// Этот раздел объясняет, что такое вывод типов (type inference) в TypeScript.
// Вывод типов - это способность компилятора автоматически определять типы на основе контекста,
// что уменьшает необходимость явных аннотаций, сохраняя безопасность кода.

// 1. ОСНОВЫ ВЫВОДА ТИПОВ
// TS автоматически определяет тип переменной по её начальному значению
let agentId = 7; // TS выводит тип number
let agentName = "James Bond"; // TS выводит тип string
let isActive = true; // TS выводит тип boolean
console.log(agentId, agentName, isActive); // 7, "James Bond", true
// agentId = "007"; // Ошибка: Type 'string' is not assignable to type 'number'
// agentName = 007; // Ошибка: Type 'number' is not assignable to type 'string'

// 2. ВЫВОД ТИПОВ В МАССИВАХ
// TS определяет тип элементов массива по их значениям
let gadgets = ["Walther PPK", "Aston Martin DB5"]; // TS выводит string[]
gadgets.push("Jetpack"); // Корректно
// gadgets.push(007); // Ошибка: Type 'number' is not assignable to type 'string'
console.log(gadgets); // ["Walther PPK", "Aston Martin DB5", "Jetpack"]

// Смешанные типы в массиве
let mixed = [7, "Bond"]; // TS выводит (number | string)[]
mixed.push(8); // Корректно
mixed.push("M"); // Корректно
// mixed.push(true); // Ошибка: Type 'boolean' is not assignable to type 'string | number'

// 3. ВЫВОД ТИПОВ В ФУНКЦИЯХ
// TS выводит тип возвращаемого значения на основе return
function getAgentCode(id: number) {
    return `Agent-${id}`; // TS выводит возвращаемый тип как string
}
const code = getAgentCode(7); // code автоматически имеет тип string
console.log(code); // "Agent-7"

// Вывод типов параметров по умолчанию (без аннотаций - не рекомендуется)
function add(a, b) {
    return a + b; // TS выводит any для параметров и результата
}
const sum = add(5, "10"); // "510" - нет ошибки, но это опасно

// 4. ВЫВОД ТИПОВ С ОБЪЕКТАМИ
// TS определяет структуру объекта по его свойствам
let agent = {
    id: 7,
    name: "James Bond"
}; // TS выводит тип { id: number; name: string }
// agent.id = "007"; // Ошибка: Type 'string' is not assignable to type 'number'
// agent.active = true; // Ошибка: Property 'active' does not exist on type '{ id: number; name: string }'

// Пример с вложенным объектом
let mission = {
    code: "GF",
    details: {
        location: "Switzerland"
    }
}; // TS выводит { code: string; details: { location: string } }
console.log(mission.details.location); // "Switzerland"

// 5. ВЫВОД ТИПОВ С UNION TYPES
// TS может вывести объединённый тип при работе с несколькими значениями
let status = "active"; // TS выводит string
status = 1; // TS переопределяет как string | number
console.log(status); // 1
// status = true; // Ошибка: Type 'boolean' is not assignable to type 'string | number'

// Пример с тернарным оператором
let result = true ? "success" : 0; // TS выводит string | number
console.log(result); // "success"
// let strictResult: string = result; // Ошибка: Type 'string | number' is not assignable to type 'string'

// 6. ВЫВОД ТИПОВ В GENERICS
// TS автоматически определяет типы для обобщённых функций
function getFirst<T>(items: T[]) {
    return items[0]; // TS выводит T на основе переданного массива
}
const firstNum = getFirst([1, 2, 3]); // TS выводит number
const firstStr = getFirst(["a", "b"]); // TS выводит string
console.log(firstNum, firstStr); // 1, "a"
// getFirst([1, "two"]); // TS выведет (number | string) для T

// 7. ОГРАНИЧЕНИЯ ВЫВОДА ТИПОВ
// TS не всегда может точно вывести тип без контекста
let data = null; // TS выводит null
data = "new data"; // TS переопределяет как string | null
console.log(data); // "new data"
// let strictData: string = data; // Ошибка: Type 'string | null' is not assignable to type 'string'

// Без начального значения TS не может вывести тип
// let unknown; // TS присваивает any (не рекомендуется)
// unknown = 5;
// unknown = "test";

// 8. СРАВНЕНИЕ С ЯВНЫМИ АННОТАЦИЯМИ
// Вывод типов упрощает код, но аннотации дают больше контроля
let inferredId = 7; // TS выводит number
let annotatedId: number = 7; // То же самое, но явно указано
// inferredId = "007"; // Ошибка в обоих случаях

// Когда вывод недостаточен
let missionLoose = { code: "SF" }; // TS выводит { code: string }
missionLoose = { code: "GF", location: "Switzerland" }; // Корректно, но location не проверяется

interface StrictMission {
    code: string;
    location?: string;
}
let missionStrict: StrictMission = { code: "SF" }; // Структура строго определена
// missionStrict = { code: "GF", priority: 1 }; // Ошибка: Object literal may only specify known properties

// 9. ПРАКТИЧЕСКИЙ ПРИМЕР С ВЫВОДОМ ТИПОВ
// Комбинируем вывод типов в сценарии миссии
function equipAgent(gadgets: string[]) {
    return gadgets.map(name => ({ name, active: true })); // TS выводит { name: string; active: boolean }[]
}
const equipped = equipAgent(["Walther PPK", "Jetpack"]);
console.log(equipped); // [{ name: "Walther PPK", active: true }, { name: "Jetpack", active: true }]
// equipped[0].name = 007; // Ошибка: Type 'number' is not assignable to type 'string'

// Пример с функцией и выводом
function briefAgent(id: number, name: string) {
    return { agent: `Agent-${id}`, mission: "GF" }; // TS выводит { agent: string; mission: string }
}
const briefing = briefAgent(7, "Bond");
console.log(briefing.agent); // "Agent-7"

// Итог: Вывод типов позволяет TS автоматически определять типы там, где это очевидно,
// сокращая необходимость аннотаций, но сохраняя безопасность кода.
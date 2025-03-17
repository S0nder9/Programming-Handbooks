// 021-аннотации-типов-в-действии-когда-вывод-типов-не-работает.ts

// Этот раздел объясняет ситуации, в которых вывод типов (type inference) в TypeScript не работает корректно
// или даёт нежелательные результаты, и как явные аннотации типов помогают устранить проблемы.

// 1. ОТЛОЖЕННАЯ ИНИЦИАЛИЗАЦИЯ БЕЗ НАЧАЛЬНОГО ЗНАЧЕНИЯ
// TS не может вывести тип, если переменная объявлена без значения
let agentCode; // TS присваивает тип any (небезопасно)
agentCode = 7;
agentCode = "007"; // Нет ошибки, но контроль типов потерян
console.log(agentCode); // "007"

// Исправление: явная аннотация
let strictAgentCode: number; // Указываем тип заранее
// strictAgentCode = "007"; // Ошибка: Type 'string' is not assignable to type 'number'
strictAgentCode = 7;
console.log(strictAgentCode); // 7

// 2. СЛИШКОМ ШИРОКИЙ ВЫВОД ТИПА
// TS может вывести слишком общий тип, теряя специфику
let status = "active"; // TS выводит string
status = 1; // TS переопределяет как string | number
// status = true; // Ошибка, но тип всё ещё слишком широкий
console.log(status); // 1

// Исправление: ограничиваем типы явно
let strictStatus: "active" | "inactive"; // Literal типы
strictStatus = "active"; // Корректно
// strictStatus = "pending"; // Ошибка: Type '"pending"' is not assignable to type '"active" | "inactive"'
console.log(strictStatus); // "active"

// 3. УСЛОВНЫЕ ВЫРАЖЕНИЯ С РАЗНЫМИ ТИПАМИ
// TS выводит union тип, который может быть нежелателен
let result = true ? "success" : 0; // TS выводит string | number
// let strictResult: string = result; // Ошибка: Type 'string | number' is not assignable to type 'string'
console.log(result); // "success"

// Исправление: явное указание типа результата
let explicitResult: string = true ? "success" : "default"; // Оба варианта - строки
console.log(explicitResult); // "success"

// 4. ОБЪЕКТЫ С НЕПОЛНОЙ СТРУКТУРОЙ
// TS выводит минимальный тип, игнорируя возможные дополнительные свойства
let mission = { code: "GF" }; // TS выводит { code: string }
mission = { code: "SF", location: "Shanghai" }; // Корректно, но location не проверяется
console.log(mission); // { code: "SF", location: "Shanghai" }

// Исправление: используем интерфейс для строгой структуры
interface Mission {
    code: string;
    location?: string; // Необязательное свойство
}
let strictMission: Mission = { code: "GF" };
// strictMission = { code: "SF", priority: 1 }; // Ошибка: Object literal may only specify known properties
strictMission = { code: "SF", location: "Shanghai" }; // Корректно
console.log(strictMission); // { code: "SF", location: "Shanghai" }

// 5. ФУНКЦИИ БЕЗ АННОТАЦИЙ ПАРАМЕТРОВ
// Без типов TS присваивает any, что опасно
function add(a, b) {
    return a + b; // TS выводит any для параметров и результата
}
console.log(add(5, "10")); // "510" - нет ошибки, но это нежелательно

// Исправление: явные аннотации
function strictAdd(a: number, b: number): number {
    return a + b;
}
console.log(strictAdd(5, 10)); // 15
// strictAdd(5, "10"); // Ошибка: Type 'string' is not assignable to type 'number'

// 6. GENERICS БЕЗ ЯВНОГО УКАЗАНИЯ ТИПА
// TS может вывести слишком общий тип для обобщённых функций
function getFirst<T>(items: T[]) {
    return items[0]; // T выводится из переданного массива
}
let mixed = getFirst([1, "two"]); // TS выводит T как number | string
console.log(mixed); // 1
// let strictNum: number = mixed; // Ошибка: Type 'string | number' is not assignable to type 'number'

// Исправление: явно указываем тип
let strictNum = getFirst<number>([1, 2, 3]); // T явно number
console.log(strictNum); // 1
// getFirst<number>([1, "two"]); // Ошибка: Type 'string' is not assignable to type 'number'

// 7. CALLBACK-ФУНКЦИИ БЕЗ КОНТЕКСТА
// TS не может вывести тип параметров callback без подсказок
function executeAction(action) {
    return action("test"); // action имеет тип any => any
}
const risky = executeAction((data) => data.length); // Работает, но тип результата any
console.log(risky); // 4

// Исправление: аннотация для callback
function strictExecuteAction(action: (input: string) => number): number {
    return action("test");
}
const safe = strictExecuteAction((data) => data.length); // Корректно, результат number
console.log(safe); // 4
// strictExecuteAction((data) => data + 1); // Ошибка: Type 'string' is not assignable to type 'number'

// 8. РЕАЛЬНЫЙ СЦЕНАРИЙ, ГДЕ ВЫВОД ТИПОВ НЕДОСТАТОЧЕН
// Проблемный код: миссия с выводом типов
let agent = { id: 7 }; // TS выводит { id: number }
agent = { id: "007", name: "Bond" }; // Корректно, но структура не проверяется
function processAgent(agent) {
    return agent.id; // id имеет тип any после переприсваивания
}
console.log(processAgent(agent)); // "007"

// Исправление: строгие типы с аннотациями
interface StrictAgent {
    id: number | string; // Union тип для гибкости
    name?: string; // Необязательное свойство
}
let strictAgent: StrictAgent = { id: 7 };
strictAgent = { id: "007", name: "Bond" }; // Корректно
function processStrictAgent(agent: StrictAgent): string {
    return `${agent.id}${agent.name ? ` - ${agent.name}` : ""}`; // Явно строка
}
console.log(processStrictAgent(strictAgent)); // "007 - Bond"
// processStrictAgent({ id: true }); // Ошибка: Type 'boolean' is not assignable to type 'string | number'

// Итог: Вывод типов не работает, когда нет начального значения, контекст слишком общий или структура неоднозначна.
// Явные аннотации позволяют точно контролировать типы и избегать ошибок.
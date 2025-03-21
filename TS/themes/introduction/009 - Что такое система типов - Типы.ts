// 009-что-такое-система-типов-типы.ts

// В этом разделе мы сосредоточимся на конкретных типах в TypeScript, 
// которые составляют основу его системы типов, и на том, как они помогают писать безопасный код.

// 1. ПРИМИТИВНЫЕ ТИПЫ
// Это базовые строительные блоки системы типов

// Число (number) - для целых и дробных чисел
let agentCode: number = 7; // Код агента как число
let missionBudget: number = 1000000.50; // Бюджет миссии с плавающей точкой
// agentCode = "007"; // Ошибка: Type 'string' is not assignable to type 'number'

// Строка (string) - для текстовых данных
let agentName: string = "James Bond"; // Имя агента
let missionName: string = "Goldfinger"; // Название миссии
// missionName = 007; // Ошибка: Type 'number' is not assignable to type 'string'

// Булево (boolean) - для логических значений true/false
let isActive: boolean = true; // Статус активности агента
let missionComplete: boolean = false; // Завершена ли миссия
// isActive = "yes"; // Ошибка: Type 'string' is not assignable to type 'boolean'

// 2. СПЕЦИАЛЬНЫЕ ТИПЫ
// Используются для обозначения отсутствия или неизвестности данных

// Null - явное отсутствие значения
let gadget: string | null = "Walther PPK"; // Гаджет может быть строкой или null
gadget = null; // Корректно: гаджет может быть потерян
// gadget = undefined; // Ошибка: Type 'undefined' is not assignable to type 'string | null'

// Undefined - значение не определено
let nextMission: string | undefined = undefined; // Следующая миссия ещё не назначена
nextMission = "Skyfall"; // Теперь назначена
// nextMission = 007; // Ошибка: Type 'number' is not assignable to type 'string | undefined'

// 3. ОБЪЕКТНЫЕ ТИПЫ
// Используются для описания структуры данных

// Интерфейс (interface) - задаёт форму объекта
interface Agent {
    id: number; // Уникальный идентификатор
    name: string; // Имя агента
    active: boolean; // Статус
}

const bond: Agent = {
    id: 7,
    name: "James Bond",
    active: true
};
// bond.id = "007"; // Ошибка: Type 'string' is not assignable to type 'number'
// bond.status = "ready"; // Ошибка: Property 'status' does not exist on type 'Agent'

// Тип (type) - альтернативный способ описания структуры
type Mission = {
    code: string;
    location: string;
};
const currentMission: Mission = {
    code: "GF",
    location: "Switzerland"
};
// currentMission.code = 007; // Ошибка: Type 'number' is not assignable to type 'string'

// 4. МАССИВЫ И ИХ ТИПИЗАЦИЯ
// Указываем тип элементов в массиве
let agentIds: number[] = [7, 8, 9]; // Массив чисел
// agentIds.push("10"); // Ошибка: Argument of type 'string' is not assignable to parameter of type 'number'

let missionList: Array<string> = ["Goldfinger", "Skyfall"]; // Альтернативный синтаксис
// missionList.push(007); // Ошибка: Argument of type 'number' is not assignable to parameter of type 'string'

// 5. UNION TYPES (ОБЪЕДИНЕНИЕ ТИПОВ)
// Позволяет переменной иметь один из нескольких типов
let status: string | number; // Статус может быть строкой или числом
status = "active"; // Корректно
status = 1; // Корректно
// status = true; // Ошибка: Type 'boolean' is not assignable to type 'string | number'

// Пример в функции
function reportStatus(code: string | number): string {
    return `Status code: ${code}`;
}
console.log(reportStatus("OK")); // "Status code: OK"
console.log(reportStatus(200)); // "Status code: 200"
// reportStatus(true); // Ошибка

// 6. LITERAL TYPES (ЛИТЕРАЛЬНЫЕ ТИПЫ)
// Ограничивают значение конкретными вариантами
type ClearanceLevel = "low" | "medium" | "high"; // Только эти значения разрешены
let agentClearance: ClearanceLevel = "high"; // Корректно
// agentClearance = "top"; // Ошибка: Type '"top"' is not assignable to type 'ClearanceLevel'

// Пример с числами
type AgentCode = 7 | 8 | 9; // Только конкретные коды агентов
let myCode: AgentCode = 7; // Корректно
// myCode = 10; // Ошибка: Type '10' is not assignable to type 'AgentCode'

// 7. ANY И UNKNOWN
// Any - отключает проверку типов (использовать осторожно)
let unverifiedData: any = "007";
unverifiedData = 7; // Корректно
unverifiedData = true; // Корректно - any позволяет всё

// Unknown - более безопасная альтернатива any, требует проверки
let receivedData: unknown = "007";
// let length = receivedData.length; // Ошибка: Object is of type 'unknown'
if (typeof receivedData === "string") {
    let length = receivedData.length; // Корректно после проверки типа
}

// 8. VOID И NEVER
// Void - функция ничего не возвращает
function logAgent(name: string): void {
    console.log(`Agent: ${name}`);
    // return "done"; // Ошибка: Type 'string' is not assignable to type 'void'
}

// Never - функция никогда не завершится успешно
function throwError(message: string): never {
    throw new Error(message);
    // Код после throw недостижим
}

// 9. ПРИМЕР ПРАКТИЧЕСКОГО ПРИМЕНЕНИЯ
interface Gadget {
    type: "weapon" | "tool";
    name: string;
}

function equipAgent(gadget: Gadget): string {
    return `Equipped with ${gadget.type}: ${gadget.name}`;
}

const gun: Gadget = { type: "weapon", name: "Walther PPK" };
console.log(equipAgent(gun)); // "Equipped with weapon: Walther PPK"
// equipAgent({ type: "vehicle", name: "Aston Martin" }); // Ошибка: Type '"vehicle"' is not assignable to type '"weapon" | "tool"'

// Итог: Типы в TypeScript позволяют строго контролировать данные, 
// предотвращать ошибки и делать код более предсказуемым
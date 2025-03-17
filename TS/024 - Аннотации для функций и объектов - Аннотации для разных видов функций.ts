// 024-аннотации-для-функций-и-объектов-аннотации-для-разных-видов-функций.ts

// Этот раздел демонстрирует аннотации типов для различных видов функций в TypeScript:
// стрелочные функции, функциональные выражения, методы объектов, конструкторы и другие.

// 1. СТРЕЛОЧНЫЕ ФУНКЦИИ (ARROW FUNCTIONS)
// Аннотируем параметры и возвращаемый тип
const greetAgent = (name: string, id: number): string => {
    return `Agent ${id}: ${name}`;
};
console.log(greetAgent("James Bond", 7)); // "Agent 7: James Bond"
// greetAgent("Bond", "007"); // Ошибка: Type 'string' is not assignable to type 'number'

// Сокращённая форма с выводом типа
const shortGreet = (name: string) => `Hello, ${name}`; // TS выводит возвращаемый тип string
console.log(shortGreet("Bond")); // "Hello, Bond"

// 2. ФУНКЦИОНАЛЬНЫЕ ВЫРАЖЕНИЯ (FUNCTION EXPRESSIONS)
// Объявление функции через переменную с аннотацией
const assignMission: (agent: string, code: string) => string = function(agent, code) {
    return `${agent} assigned to ${code}`;
};
console.log(assignMission("007", "GF")); // "007 assigned to GF"
// assignMission(007, "GF"); // Ошибка: Type 'number' is not assignable to type 'string'

// С использованием type alias
type Action = (target: string) => string;
const eliminate: Action = function(target) {
    return `Eliminated ${target}`;
};
console.log(eliminate("enemy")); // "Eliminated enemy"

// 3. ОБЫЧНЫЕ ФУНКЦИИ (FUNCTION DECLARATIONS)
// Классическое объявление с аннотациями
function equipAgent(agent: string, gadget: string): string {
    return `${agent} equipped with ${gadget}`;
}
console.log(equipAgent("007", "Walther PPK")); // "007 equipped with Walther PPK"
// equipAgent("007", 123); // Ошибка: Type 'number' is not assignable to type 'string'

// 4. МЕТОДЫ ОБЪЕКТОВ
// Аннотации для методов внутри объектов
const missionController = {
    code: "GF",
    start(this: { code: string }): string { // Аннотация this
        return `${this.code} started`;
    }
};
console.log(missionController.start()); // "GF started"

// С использованием интерфейса
interface Agent {
    name: string;
    getCode(this: Agent): string; // Метод с привязкой this
}
const bond: Agent = {
    name: "James Bond",
    getCode() {
        return `Agent-${this.name}`;
    }
};
console.log(bond.getCode()); // "Agent-James Bond"

// 5. КОНСТРУКТОРЫ В КЛАССАХ
// Аннотации для параметров конструктора
class Mission {
    constructor(public code: string, private priority: number) {}
    getDetails(): string {
        return `${this.code} (Priority: ${this.priority})`;
    }
}
const mission = new Mission("SF", 1);
console.log(mission.getDetails()); // "SF (Priority: 1)"
// new Mission(123, "high"); // Ошибка: Type 'number' is not assignable to type 'string'

// 6. АСИНХРОННЫЕ ФУНКЦИИ
// Аннотации для асинхронных функций с Promise
async function fetchMission(code: string): Promise<string> {
    return `Mission ${code} fetched`; // Симуляция асинхронности
}
fetchMission("GF").then(result => console.log(result)); // "Mission GF fetched"
// async function badFetch(code: string): Promise<string> { return 123; } // Ошибка: Type 'number' is not assignable to type 'string'

// Асинхронная стрелочная функция
const asyncFetch = async (id: number): Promise<string> => `Data for ID ${id}`;
asyncFetch(7).then(result => console.log(result)); // "Data for ID 7"

// 7. ФУНКЦИИ С ПЕРЕГРУЗКОЙ (OVERLOADS)
// Несколько сигнатур для одной функции
function processInput(input: string): string; // Перегрузка 1
function processInput(input: number): number; // Перегрузка 2
function processInput(input: string | number): string | number { // Реализация
    return typeof input === "string" ? input.toUpperCase() : input * 2;
}
console.log(processInput("bond")); // "BOND"
console.log(processInput(5)); // 10
// processInput(true); // Ошибка: No overload matches this call

// 8. CALLBACK-ФУНКЦИИ
// Аннотации для функций обратного вызова
function executeTask(task: (id: number) => string): string {
    return task(007);
}
const result = executeTask((id) => `Task ${id} completed`);
console.log(result); // "Task 7 completed"
// executeTask((id: string) => id); // Ошибка: Type 'string' is not assignable to type 'number'

// 9. ФУНКЦИИ С GENERICS
// Обобщённые типы для разных видов функций
const getFirst = <T>(items: T[]): T => items[0]; // Стрелочная функция
console.log(getFirst<string>(["gun", "car"])); // "gun"
console.log(getFirst<number>([1, 2])); // 1

function getLast<T>(items: T[]): T { // Обычная функция
    return items[items.length - 1];
}
console.log(getLast<string>(["gun", "car"])); // "car"

// 10. ПРАКТИЧЕСКИЙ ПРИМЕР С РАЗНЫМИ ВИДАМИ ФУНКЦИЙ
// Комбинируем аннотации в сценарии миссии
interface Gadget {
    name: string;
    type: "weapon" | "vehicle";
}

// Стрелочная функция для логирования
const logMission = (code: string): void => console.log(`Mission ${code} logged`);

// Функциональное выражение с перегрузкой
function updateStatus(code: string): string;
function updateStatus(code: string, detailed: boolean): string | number;
function updateStatus(code: string, detailed?: boolean): string | number {
    return detailed ? 200 : `Updated ${code}`;
}

// Метод в объекте
const operation = {
    agent: "007",
    gadgets: [{ name: "Walther PPK", type: "weapon" }],
    brief(this: { agent: string; gadgets: Gadget[] }): string {
        return `${this.agent} with ${this.gadgets[0].name}`;
    }
};

// Асинхронная функция с generics
async function deployAgent<T>(agent: string, resource: T): Promise<[string, T]> {
    return [agent, resource];
}

// Использование
logMission("GF"); // "Mission GF logged"
console.log(updateStatus("GF")); // "Updated GF"
console.log(updateStatus("GF", true)); // 200
console.log(operation.brief()); // "007 with Walther PPK"
deployAgent("007", { code: "SF" }).then(result => console.log(result)); // ["007", { code: "SF" }]

// Итог: Аннотации типов применимы ко всем видам функций (стрелочные, обычные, методы, конструкторы и т.д.),
// обеспечивая строгую типизацию и предотвращая ошибки.
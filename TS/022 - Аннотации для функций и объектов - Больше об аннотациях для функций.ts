// 022-аннотации-для-функций-и-объектов-больше-об-аннотациях-для-функций.ts

// Этот раздел углубляет понимание аннотаций типов для функций в TypeScript,
// рассматривая более сложные сценарии, такие как перегрузки, типы функций, деструктуризация и другие.

// 1. АННОТАЦИИ С ПЕРЕГРУЗКОЙ ФУНКЦИЙ (FUNCTION OVERLOADS)
// Одна функция может иметь несколько сигнатур для разных случаев
function assignAgent(agent: string, mission: string): string; // Перегрузка 1: строка + строка
function assignAgent(agent: number, mission: string): string; // Перегрузка 2: число + строка
function assignAgent(agent: string | number, mission: string): string { // Реализация
    return `Agent ${agent} assigned to ${mission}`;
}
console.log(assignAgent("Bond", "GF")); // "Agent Bond assigned to GF"
console.log(assignAgent(7, "GF")); // "Agent 7 assigned to GF"
// assignAgent(true, "GF"); // Ошибка: No overload matches this call

// 2. АННОТАЦИЯ ТИПА ФУНКЦИИ (FUNCTION TYPE)
// Определяем сигнатуру функции как отдельный тип
type MissionAction = (code: string, priority: number) => string;
const startMission: MissionAction = (code, priority) => {
    return `Mission ${code} started with priority ${priority}`;
};
console.log(startMission("SF", 1)); // "Mission SF started with priority 1"
// startMission("SF", "high"); // Ошибка: Type 'string' is not assignable to type 'number'

// Пример с переменной, содержащей функцию
let action: MissionAction;
action = (code, priority) => `Executing ${code} (${priority})`;
console.log(action("GF", 2)); // "Executing GF (2)"

// 3. ДЕСТРУКТУРИЗАЦИЯ ПАРАМЕТРОВ С АННОТАЦИЯМИ
// Аннотируем объект, который деструктурируется в параметрах
function briefAgent({ name, id }: { name: string; id: number }): string {
    return `${name} (ID: ${id})`;
}
const agent = { name: "James Bond", id: 7 };
console.log(briefAgent(agent)); // "James Bond (ID: 7)"
// briefAgent({ name: "Bond", id: "007" }); // Ошибка: Type 'string' is not assignable to type 'number'

// С использованием интерфейса
interface Agent {
    name: string;
    id: number;
}
function briefStrictAgent({ name, id }: Agent): string {
    return `${name} (ID: ${id})`;
}
console.log(briefStrictAgent(agent)); // "James Bond (ID: 7)"

// 4. АННОТАЦИИ С REST ПАРАМЕТРАМИ
// Указываем тип для переменного числа аргументов
function listGadgets(agent: string, ...gadgets: string[]): string {
    return `${agent} equipped with: ${gadgets.join(", ")}`;
}
console.log(listGadgets("007", "Walther PPK", "Jetpack")); // "007 equipped with: Walther PPK, Jetpack"
// listGadgets("007", "gun", 123); // Ошибка: Type 'number' is not assignable to type 'string'

// 5. АННОТАЦИИ С THIS
// Указываем тип this для методов в объектах
interface MissionController {
    code: string;
    start(this: MissionController): string;
}
const controller: MissionController = {
    code: "GF",
    start: function() { // this аннотирован как MissionController
        return `${this.code} started`;
    }
};
console.log(controller.start()); // "GF started"

// Без правильного контекста будет ошибка
const detached = controller.start;
// detached(); // Ошибка: The 'this' context of type 'void' is not assignable to method's 'this'

// 6. АННОТАЦИИ С АСИНХРОННЫМИ ФУНКЦИЯМИ
// Указываем тип возвращаемого Promise
async function fetchMission(code: string): Promise<string> {
    // Симуляция асинхронного запроса
    return new Promise(resolve => resolve(`Mission ${code} fetched`));
}
fetchMission("SF").then(result => console.log(result)); // "Mission SF fetched"
// async function badFetch(code: string): Promise<string> { return 123; } // Ошибка: Type 'number' is not assignable to type 'string'

// 7. АННОТАЦИИ С GENERICS В ФУНКЦИЯХ
// Обобщённые типы для гибкости
function equipAgent<T>(agent: string, item: T): [string, T] {
    return [agent, item];
}
const equippedString = equipAgent("007", "Walther PPK"); // TS выводит [string, string]
const equippedNumber = equipAgent("007", 1); // TS выводит [string, number]
console.log(equippedString); // ["007", "Walther PPK"]
console.log(equippedNumber); // ["007", 1]

// Явное указание типа
const explicitEquip = equipAgent<string>("007", "Jetpack"); // [string, string]

// 8. УСЛОВНЫЕ ТИПЫ В ФУНКЦИЯХ
// Используем условные типы для возвращаемого значения
type Result<T> = T extends string ? string : number;
function processInput<T>(input: T): Result<T> {
    return (typeof input === "string" ? input.toUpperCase() : 0) as Result<T>;
}
console.log(processInput("bond")); // "BOND"
console.log(processInput(7)); // 0
// processInput(true); // Ошибка в runtime, но TS требует явного приведения для сложных случаев

// 9. ПРАКТИЧЕСКИЙ ПРИМЕР С АННОТАЦИЯМИ ДЛЯ ФУНКЦИЙ
// Комбинируем разные техники в сценарии миссии
interface Gadget {
    name: string;
    type: "weapon" | "vehicle";
}

type MissionStatus = "pending" | "active" | "completed";

function prepareMission(
    { agent, gadgets }: { agent: Agent; gadgets: Gadget[] }, // Деструктуризация
    ...targets: string[] // Rest параметры
): Promise<{ code: string; status: MissionStatus }> { // Асинхронный возврат
    return new Promise(resolve => {
        const code = `M-${agent.id}`;
        resolve({
            code,
            status: targets.length > 0 ? "active" : "pending"
        });
    });
}

const bond: Agent = { name: "James Bond", id: 7 };
const gear: Gadget[] = [
    { name: "Walther PPK", type: "weapon" },
    { name: "Aston Martin DB5", type: "vehicle" }
];
prepareMission({ agent: bond, gadgets: gear }, "target1", "target2")
    .then(result => console.log(result)); // { code: "M-7", status: "active" }

// Перегрузка для другого случая
function getStatus(code: string): string;
function getStatus(code: string, detailed: boolean): string | MissionStatus;
function getStatus(code: string, detailed?: boolean): string | MissionStatus {
    return detailed ? "active" : `Status of ${code}`;
}
console.log(getStatus("M-7")); // "Status of M-7"
console.log(getStatus("M-7", true)); // "active"

// Итог: Аннотации для функций позволяют обрабатывать сложные сценарии (перегрузки, generics, деструктуризацию)
// с высокой точностью и безопасностью типов.
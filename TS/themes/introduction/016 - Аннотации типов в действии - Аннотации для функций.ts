// 016-аннотации-типов-в-действии-аннотации-для-функций.ts

// Этот раздел демонстрирует, как аннотации типов применяются к функциям в TypeScript,
// чтобы задавать типы параметров, возвращаемых значений и обеспечивать строгую проверку.

// 1. БАЗОВАЯ АННОТАЦИЯ ПАРАМЕТРОВ И ВОЗВРАЩАЕМОГО ЗНАЧЕНИЯ
// Указываем типы входных данных и результата
function greetAgent(name: string, id: number): string {
    return `Agent ${id}: ${name}`;
}
console.log(greetAgent("James Bond", 7)); // "Agent 7: James Bond"
// greetAgent(7, "Bond"); // Ошибка: Type 'number' is not assignable to type 'string'
// greetAgent("Bond", "007"); // Ошибка: Type 'string' is not assignable to type 'number'

// 2. ФУНКЦИЯ БЕЗ ВОЗВРАЩАЕМОГО ЗНАЧЕНИЯ (VOID)
// Аннотация void указывает, что функция ничего не возвращает
function logMission(code: string): void {
    console.log(`Mission ${code} started`);
    // return "done"; // Ошибка: Type 'string' is not assignable to type 'void'
}
logMission("GF"); // "Mission GF started"

// 3. ОПЦИОНАЛЬНЫЕ ПАРАМЕТРЫ
// Используем "?" для необязательных параметров
function assignMission(agent: string, mission?: string): string {
    return `${agent} assigned to ${mission ?? "no mission"}`;
}
console.log(assignMission("007")); // "007 assigned to no mission"
console.log(assignMission("007", "Goldfinger")); // "007 assigned to Goldfinger"
// assignMission("007", 123); // Ошибка: Type 'number' is not assignable to type 'string'

// 4. ЗНАЧЕНИЯ ПО УМОЛЧАНИЮ С АННОТАЦИЯМИ
// Указываем тип и значение по умолчанию
function equipAgent(agent: string, gadget: string = "Walther PPK"): string {
    return `${agent} equipped with ${gadget}`;
}
console.log(equipAgent("Bond")); // "Bond equipped with Walther PPK"
console.log(equipAgent("Bond", "Jetpack")); // "Bond equipped with Jetpack"
// equipAgent("Bond", 007); // Ошибка: Type 'number' is not assignable to type 'string'

// 5. АННОТАЦИЯ С UNION TYPES
// Параметры и результат могут иметь несколько типов
function reportStatus(status: string | number): string {
    return `Status: ${status}`;
}
console.log(reportStatus("active")); // "Status: active"
console.log(reportStatus(200)); // "Status: 200"
// reportStatus(true); // Ошибка: Type 'boolean' is not assignable to type 'string | number'

// 6. АННОТАЦИЯ ОБЪЕКТНЫХ ПАРАМЕТРОВ
// Используем интерфейс для описания структуры объекта
interface Mission {
    code: string;
    location: string;
}

function briefMission(mission: Mission): string {
    return `${mission.code} in ${mission.location}`;
}
const mission: Mission = { code: "SF", location: "Shanghai" };
console.log(briefMission(mission)); // "SF in Shanghai"
// briefMission({ code: "SF", location: 123 }); // Ошибка: Type 'number' is not assignable to type 'string'

// 7. ФУНКЦИЯ С NEVER
// Аннотация never для функций, которые никогда не завершаются успешно
function failMission(message: string): never {
    throw new Error(`Mission failed: ${message}`);
    // Код после throw недостижим
}
// failMission("Target escaped"); // Вызов выбросит исключение

// 8. АННОТАЦИЯ ФУНКЦИОНАЛЬНОГО ТИПА
// Описываем сигнатуру функции как тип
type Action = (agent: string, target: string) => string;

const eliminate: Action = (agent, target) => `${agent} eliminated ${target}`;
console.log(eliminate("007", "enemy")); // "007 eliminated enemy"
// const wrongAction: Action = (agent) => agent; // Ошибка: Несоответствие сигнатуре

// 9. АННОТАЦИИ С GENERICS
// Обобщённые типы для гибкости
function getFirstItem<T>(items: T[]): T {
    return items[0];
}
const firstGadget: string = getFirstItem<string>(["gun", "car"]); // "gun"
const firstCode: number = getFirstItem<number>([7, 8]); // 7
// getFirstItem<string>([1, 2]); // Ошибка: Type 'number' is not assignable to type 'string'

// 10. АННОТАЦИИ ДЛЯ CALLBACK-ФУНКЦИЙ
// Указываем типы для функций обратного вызова
function executeMission(action: (code: string) => string): string {
    return action("GF");
}
const result = executeMission((code) => `Mission ${code} completed`);
console.log(result); // "Mission GF completed"
// executeMission((code: number) => `${code}`); // Ошибка: Type 'number' is not assignable to type 'string'

// 11. ПРАКТИЧЕСКИЙ ПРИМЕР С ФУНКЦИЯМИ
// Комбинируем аннотации в сценарии миссии
interface Agent {
    id: number;
    name: string;
}

type Gadget = {
    name: string;
    type: "weapon" | "vehicle";
};

function prepareAgent(agent: Agent, gadgets: Gadget[]): string {
    const gadgetList = gadgets.map(g => g.name).join(", ");
    return `${agent.name} (ID: ${agent.id}) prepared with ${gadgetList}`;
}

const bond: Agent = { id: 7, name: "James Bond" };
const equipment: Gadget[] = [
    { name: "Walther PPK", type: "weapon" },
    { name: "Aston Martin DB5", type: "vehicle" }
];
console.log(prepareAgent(bond, equipment)); 
// "James Bond (ID: 7) prepared with Walther PPK, Aston Martin DB5"

// Пример с опциональным параметром и union type
function updateStatus(agent: Agent, status: "success" | "failure" | null = null): string {
    return `${agent.name} mission status: ${status ?? "pending"}`;
}
console.log(updateStatus(bond)); // "James Bond mission status: pending"
console.log(updateStatus(bond, "success")); // "James Bond mission status: success"
// updateStatus(bond, "aborted"); // Ошибка: Type '"aborted"' is not assignable to type '"success" | "failure" | null'

// Итог: Аннотации типов для функций обеспечивают строгую проверку параметров и возвращаемых значений,
// делая код предсказуемым и безопасным.
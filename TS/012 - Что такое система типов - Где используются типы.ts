// 012-что-такое-система-типов-где-используются-типы.ts

// Этот раздел объясняет, где и как применяются типы в TypeScript, 
// демонстрируя их использование в различных частях кода для повышения надёжности.

// 1. ПЕРЕМЕННЫЕ
// Типы используются для определения допустимых значений переменных
let agentCode: number = 7; // Переменная принимает только числа
let agentName: string = "James Bond"; // Только строки
// agentCode = "007"; // Ошибка: Type 'string' is not assignable to type 'number'

// Пример с union type для гибкости
let missionId: string | number = "M-007"; // Может быть строкой или числом
missionId = 7; // Корректно
// missionId = true; // Ошибка: Type 'boolean' is not assignable to type 'string | number'

// 2. ПАРАМЕТРЫ ФУНКЦИЙ
// Типы указывают, какие значения можно передать в функцию
function assignMission(agent: string, missionCode: string): string {
    return `${agent} assigned to ${missionCode}`;
}
console.log(assignMission("Bond", "GF")); // "Bond assigned to GF"
// assignMission(007, "GF"); // Ошибка: Type 'number' is not assignable to type 'string'

// Пример с опциональным параметром
function logActivity(agent: string, action?: string): void {
    console.log(`${agent}${action ? ` performed ${action}` : " is idle"}`);
}
logActivity("007"); // "007 is idle"
logActivity("007", "infiltration"); // "007 performed infiltration"

// 3. ВОЗВРАЩАЕМЫЕ ЗНАЧЕНИЯ ФУНКЦИЙ
// Типы определяют, что функция должна вернуть
function getAgentCode(id: number): string {
    return `Agent-${id}`;
}
const code: string = getAgentCode(7); // "Agent-7"
// function getAgentCode(id: number): string { return 007; } // Ошибка: Type 'number' is not assignable to type 'string'

// Пример с void (ничего не возвращает)
function reportStatus(message: string): void {
    console.log(message);
    // return "done"; // Ошибка: Type 'string' is not assignable to type 'void'
}

// 4. ОБЪЕКТЫ (ИНТЕРФЕЙСЫ И TYPE ALIAS)
// Типы используются для описания структуры объектов
interface Agent {
    id: number;
    name: string;
    active: boolean;
}

const bond: Agent = {
    id: 7,
    name: "James Bond",
    active: true
};
// bond.id = "007"; // Ошибка: Type 'string' is not assignable to type 'number'

// Пример с type alias и необязательным свойством
type Mission = {
    code: string;
    location?: string;
};
const mission: Mission = { code: "SF" }; // Корректно
const fullMission: Mission = { code: "GF", location: "Switzerland" }; // Корректно

// 5. МАССИВЫ
// Типы указывают, какие элементы допустимы в массиве
let gadgets: string[] = ["Walther PPK", "Aston Martin DB5"];
// gadgets.push(007); // Ошибка: Type 'number' is not assignable to type 'string'

// Пример с кортежем (tuple)
let coordinates: [number, number] = [51.477928, -0.001545];
// coordinates[0] = "lat"; // Ошибка: Type 'string' is not assignable to type 'number'

// 6. КЛАССЫ
// Типы применяются к свойствам и методам классов
class SecretAgent {
    constructor(public id: number, public name: string) {}

    getCode(): string {
        return `Agent-${this.id}`;
    }
}

const agent007 = new SecretAgent(7, "James Bond");
console.log(agent007.getCode()); // "Agent-7"
// agent007.id = "007"; // Ошибка: Type 'string' is not assignable to type 'number'

// 7. ENUM В УПРАВЛЕНИИ СОСТОЯНИЕМ
// Типы используются для ограничения значений состояния
enum MissionStatus {
    Pending = "PENDING",
    Active = "ACTIVE",
    Completed = "COMPLETED"
}

let status: MissionStatus = MissionStatus.Active;
console.log(status); // "ACTIVE"
// status = "FAILED"; // Ошибка: Type '"FAILED"' is not assignable to type 'MissionStatus'

// 8. GENERICS (ОБОБЩЁННЫЕ ТИПЫ)
// Типы используются для создания переиспользуемых конструкций
function getFirstItem<T>(items: T[]): T {
    return items[0];
}

const firstGadget: string = getFirstItem<string>(["gun", "car"]); // "gun"
const firstCode: number = getFirstItem<number>([7, 8, 9]); // 7
// getFirstItem<string>([1, 2, 3]); // Ошибка: Type 'number' is not assignable to type 'string'

// 9. МОДУЛИ И ВНЕШНИЕ БИБЛИОТЕКИ
// Типы используются для описания импортируемых данных
// Предположим, у нас есть модуль с типами
interface ExternalMissionData {
    code: string;
    priority: number;
}
// Пример имитации импорта
const importedMission: ExternalMissionData = { code: "GF", priority: 1 };
console.log(`Imported mission: ${importedMission.code}`); // "Imported mission: GF"

// 10. ПРАКТИЧЕСКИЙ ПРИМЕР С НЕСКОЛЬКИМИ ОБЛАСТЯМИ ПРИМЕНЕНИЯ
// Комбинируем типы в реальном сценарии
interface Gadget {
    name: string;
    type: "weapon" | "vehicle";
}

class Operation {
    constructor(
        public agent: Agent,
        public mission: Mission,
        public gadgets: Gadget[]
    ) {}

    brief(): string {
        return `${this.agent.name} on ${this.mission.code} with ${this.gadgets[0].name}`;
    }
}

const op = new Operation(
    bond,
    fullMission,
    [{ name: "Walther PPK", type: "weapon" }]
);
console.log(op.brief()); // "James Bond on GF with Walther PPK"
// op.gadgets[0].type = "tool"; // Ошибка: Type '"tool"' is not assignable to type '"weapon" | "vehicle"'

// Итог: Типы в TypeScript используются повсеместно - от переменных и функций до классов и модулей,
// обеспечивая строгую проверку кода и предотвращая ошибки
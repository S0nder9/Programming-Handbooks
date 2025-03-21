// 011-что-такое-система-типов-примеры-типов.ts

// Этот раздел демонстрирует систему типов TypeScript через конкретные примеры, 
// показывая, как различные типы применяются на практике для обеспечения безопасности кода.

// 1. ПРИМИТИВНЫЕ ТИПЫ В ДЕЙСТВИИ
// Пример: управление данными агента
let agentId: number = 7; // Код агента - число
let agentName: string = "James Bond"; // Имя агента - строка
let isLicensedToKill: boolean = true; // Лицензия на убийство - булево значение

// Попытка неправильного присваивания
// agentId = "007"; // Ошибка: Type 'string' is not assignable to type 'number'
// agentName = 007; // Ошибка: Type 'number' is not assignable to type 'string'
// isLicensedToKill = "yes"; // Ошибка: Type 'string' is not assignable to type 'boolean'

// Пример функции с примитивными типами
function introduceAgent(id: number, name: string): string {
    return `Agent ${id}: ${name}`;
}
console.log(introduceAgent(agentId, agentName)); // "Agent 7: James Bond"
// introduceAgent("007", agentName); // Ошибка: Type 'string' is not assignable to type 'number'

// 2. UNION TYPES (ОБЪЕДИНЕНИЕ ТИПОВ)
// Пример: статус миссии может быть строкой или числом
let missionStatus: string | number = "active"; // Статус миссии
missionStatus = 1; // Теперь числовой код статуса
// missionStatus = true; // Ошибка: Type 'boolean' is not assignable to type 'string | number'

// Пример функции с union type
function reportMission(status: string | number): string {
    return `Mission status: ${status}`;
}
console.log(reportMission("pending")); // "Mission status: pending"
console.log(reportMission(0)); // "Mission status: 0"

// 3. LITERAL TYPES (ЛИТЕРАЛЬНЫЕ ТИПЫ)
// Пример: ограничение возможных значений для уровня доступа
type AccessLevel = "low" | "medium" | "high";
let clearance: AccessLevel = "high"; // Только указанные значения
// clearance = "top"; // Ошибка: Type '"top"' is not assignable to type 'AccessLevel'

// Пример с числовыми литералами
type Priority = 1 | 2 | 3;
let missionPriority: Priority = 1; // Только 1, 2 или 3
// missionPriority = 4; // Ошибка: Type '4' is not assignable to type 'Priority'

// 4. INTERFACE (ИНТЕРФЕЙСЫ)
// Пример: описание структуры объекта агента
interface Agent {
    id: number;
    name: string;
    gadgets: string[];
}

const bond: Agent = {
    id: 7,
    name: "James Bond",
    gadgets: ["Walther PPK", "Aston Martin DB5"]
};
// bond.id = "007"; // Ошибка: Type 'string' is not assignable to type 'number'
// bond.gadgets = ["gun", 007]; // Ошибка: Type 'number' is not assignable to type 'string'

// Пример функции с интерфейсом
function equipAgent(agent: Agent, newGadget: string): void {
    agent.gadgets.push(newGadget);
}
equipAgent(bond, "Jetpack");
console.log(bond.gadgets); // ["Walther PPK", "Aston Martin DB5", "Jetpack"]

// 5. TUPLE (КОРТЕЖ)
// Пример: координаты для миссии
let targetLocation: [number, number, string] = [51.477928, -0.001545, "Greenwich"];
// targetLocation = [51.477928, "long"]; // Ошибка: Type 'string' is not assignable to type 'number'

// Пример функции, возвращающей кортеж
function getMissionCoords(): [number, number] {
    return [51.477928, -0.001545];
}
const [lat, lon] = getMissionCoords();
console.log(`Lat: ${lat}, Lon: ${lon}`); // "Lat: 51.477928, Lon: -0.001545"

// 6. ENUM (ПЕРЕЧИСЛЕНИЕ)
// Пример: статусы агента
enum AgentStatus {
    OnDuty = "ON_DUTY",
    OffDuty = "OFF_DUTY",
    OnLeave = "ON_LEAVE"
}

let currentAgentStatus: AgentStatus = AgentStatus.OnDuty;
console.log(currentAgentStatus); // "ON_DUTY"
// currentAgentStatus = "RETIRED"; // Ошибка: Type '"RETIRED"' is not assignable to type 'AgentStatus'

// Числовой enum для рангов
enum Rank {
    Junior,    // 0
    Senior,    // 1
    Elite      // 2
}
let rank: Rank = Rank.Elite;
console.log(rank); // 2

// 7. TYPE ALIAS С OPTIONAL PROPERTIES
// Пример: описание миссии с необязательными полями
type Mission = {
    code: string;
    location?: string; // Необязательное поле
    priority: Priority;
};

const mission1: Mission = { code: "GF", priority: 1 }; // Корректно
const mission2: Mission = { code: "SF", location: "Shanghai", priority: 2 }; // Корректно
// mission1.priority = 4; // Ошибка: Type '4' is not assignable to type 'Priority'

// Пример функции с type alias
function logMission(mission: Mission): string {
    return `${mission.code}${mission.location ? ` in ${mission.location}` : ""}`;
}
console.log(logMission(mission1)); // "GF"
console.log(logMission(mission2)); // "SF in Shanghai"

// 8. INTERSECTION TYPES (ПЕРЕСЕЧЕНИЕ ТИПОВ)
// Пример: комбинирование характеристик агента
interface Skills {
    stealth: boolean;
    combat: boolean;
}
type EliteAgent = Agent & Skills;

const eliteBond: EliteAgent = {
    id: 7,
    name: "James Bond",
    gadgets: ["Walther PPK"],
    stealth: true,
    combat: true
};
// Отсутствие любого свойства вызовет ошибку

// 9. ПРАКТИЧЕСКИЙ ПРИМЕР С НЕСКОЛЬКИМИ ТИПАМИ
// Комбинируем типы для сложной задачи
enum GadgetType {
    Weapon = "WEAPON",
    Vehicle = "VEHICLE"
}

type Equipment = {
    name: string;
    type: GadgetType;
};

interface Assignment {
    agent: Agent;
    mission: Mission;
    equipment: Equipment[];
}

const operation: Assignment = {
    agent: bond,
    mission: mission2,
    equipment: [
        { name: "Walther PPK", type: GadgetType.Weapon },
        { name: "Aston Martin DB5", type: GadgetType.Vehicle }
    ]
};
// operation.equipment[0].type = "TOOL"; // Ошибка: Type '"TOOL"' is not assignable to type 'GadgetType'

// Функция для вывода информации о задании
function briefAgent(assignment: Assignment): string {
    return `${assignment.agent.name} assigned to ${assignment.mission.code} with ${assignment.equipment[0].name}`;
}
console.log(briefAgent(operation)); // "James Bond assigned to SF with Walther PPK"

// Итог: Примеры показывают, как различные типы в TypeScript помогают структурировать код 
// и предотвращать ошибки на этапе компиляции
// 010-что-такое-система-типов-больше-о-типах.ts

// Этот раздел углубляет понимание системы типов в TypeScript, 
// рассматривая более сложные и гибкие конструкции для описания данных.

// 1. TUPLE (КОРТЕЖ)
// Кортеж - это массив с фиксированной длиной и строго заданными типами элементов
let agentCoordinates: [number, number] = [51.477928, -0.001545]; // Широта и долгота
// agentCoordinates = [51.477928, "Greenwich"]; // Ошибка: Type 'string' is not assignable to type 'number'
// agentCoordinates.push(100); // Корректно добавляет элемент, но лучше избегать изменения длины

// Пример использования кортежа в функции
function getAgentPosition(): [string, number, number] {
    return ["London", 51.477928, -0.001545];
}
const [location, lat, lon] = getAgentPosition(); // Деструктуризация кортежа
console.log(`${location}: ${lat}, ${lon}`); // "London: 51.477928, -0.001545"

// 2. ENUM (ПЕРЕЧИСЛЕНИЕ)
// Enum позволяет задавать именованные наборы значений
enum MissionStatus {
    Pending = "PENDING",    // Можно задавать строковые значения
    Active = "ACTIVE",
    Completed = "COMPLETED"
}

let currentStatus: MissionStatus = MissionStatus.Active;
console.log(currentStatus); // "ACTIVE"
// currentStatus = "FAILED"; // Ошибка: Type '"FAILED"' is not assignable to type 'MissionStatus'

// Числовые перечисления (по умолчанию начинаются с 0)
enum AgentRank {
    Rookie,     // 0
    Operative,  // 1
    Elite       // 2
}
let bondRank: AgentRank = AgentRank.Elite;
console.log(bondRank); // 2

// 3. TYPE ALIAS (ПСЕВДОНИМ ТИПА)
// Удобный способ создавать новые имена для типов
type AgentCode = string | number; // Псевдоним для объединения типов
let code: AgentCode = "007"; // Корректно
code = 7; // Корректно
// code = true; // Ошибка: Type 'boolean' is not assignable to type 'AgentCode'

// Более сложный пример с объектом
type Gadget = {
    name: string;
    type: "weapon" | "tool";
};
const gadget: Gadget = { name: "Walther PPK", type: "weapon" };
// gadget.type = "vehicle"; // Ошибка: Type '"vehicle"' is not assignable to type '"weapon" | "tool"'

// 4. INTERSECTION TYPES (ПЕРЕСЕЧЕНИЕ ТИПОВ)
// Комбинирует несколько типов в один
interface Identity {
    name: string;
    code: number;
}
interface Skills {
    stealth: boolean;
    combat: boolean;
}
type Agent = Identity & Skills; // Агент должен иметь все свойства из обоих интерфейсов

const bond: Agent = {
    name: "James Bond",
    code: 7,
    stealth: true,
    combat: true
};
// Отсутствие любого свойства вызовет ошибку, например:
// const incompleteAgent: Agent = { name: "Bond", code: 7 }; // Ошибка: Property 'stealth' is missing

// 5. OPTIONAL PROPERTIES (НЕОБЯЗАТЕЛЬНЫЕ СВОЙСТВА)
// Позволяют делать свойства объекта необязательными
interface Mission {
    name: string;
    location?: string; // Необязательное свойство
    deadline?: Date;
}

const mission: Mission = { name: "Goldfinger" }; // Корректно, остальные свойства опциональны
const fullMission: Mission = {
    name: "Skyfall",
    location: "Shanghai",
    deadline: new Date("2025-12-31")
};

// Безопасный доступ к опциональным свойствам
console.log(mission.location?.toUpperCase() ?? "Unknown"); // "Unknown", если location отсутствует

// 6. READONLY PROPERTIES (ТОЛЬКО ДЛЯ ЧТЕНИЯ)
// Запрещает изменение свойства после инициализации
interface AgentProfile {
    readonly id: number;
    name: string;
}

const profile: AgentProfile = { id: 7, name: "James Bond" };
// profile.id = 8; // Ошибка: Cannot assign to 'id' because it is a read-only property
profile.name = "Bond, James Bond"; // Корректно, name не readonly

// 7. FUNCTION TYPES (ТИПЫ ФУНКЦИЙ)
// Описывают сигнатуру функции
type ReportFunction = (agent: string, status: string) => string;

const sendReport: ReportFunction = (agent, status) => `${agent} reports: ${status}`;
console.log(sendReport("007", "Mission accomplished")); // "007 reports: Mission accomplished"

// Пример с опциональными параметрами
type LogMission = (code: string, details?: string) => void;
const log: LogMission = (code, details) => {
    console.log(`Mission ${code}${details ? `: ${details}` : ""}`);
};
log("GF"); // "Mission GF"
log("SF", "Shanghai"); // "Mission SF: Shanghai"

// 8. ПРИМЕР РЕАЛЬНОГО ПРИМЕНЕНИЯ
// Комбинируем разные типы для описания сложной структуры
enum Clearance {
    Low = "LOW",
    High = "HIGH"
}

type Equipment = "gun" | "car" | "gadget";

interface Operation {
    readonly code: string;
    agents: [string, number]; // Кортеж: имя и код агента
    clearance: Clearance;
    equipment: Equipment[];
}

const op: Operation = {
    code: "OP-007",
    agents: ["James Bond", 7],
    clearance: Clearance.High,
    equipment: ["gun", "car"]
};
// op.code = "OP-008"; // Ошибка: Cannot assign to 'code' because it is a read-only property
// op.agents[1] = "7"; // Ошибка: Type 'string' is not assignable to type 'number'

// Итог: TypeScript предоставляет богатый набор инструментов для точного описания типов,
// что делает код более надёжным и предсказуемым
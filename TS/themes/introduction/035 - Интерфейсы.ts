// 035-интерфейсы.ts

// Этот раздел объясняет, что такое интерфейсы в TypeScript, как они используются
// для описания структуры объектов, функций и других сущностей, и их преимущества.

// 1. ОСНОВЫ ИНТЕРФЕЙСОВ
// Интерфейс определяет структуру объекта
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
console.log(bond); // { id: 7, name: "James Bond", active: true }
// bond.id = "007"; // Ошибка: Type 'string' is not assignable to type 'number'
// bond.status = "on duty"; // Ошибка: Property 'status' does not exist on type 'Agent'

// 2. ОПЦИОНАЛЬНЫЕ СВОЙСТВА
// Свойства с "?" могут отсутствовать
interface Gadget {
    name: string;
    type?: "weapon" | "vehicle"; // Необязательное свойство
}
const gun: Gadget = { name: "Walther PPK" }; // Корректно
const car: Gadget = { name: "Aston Martin DB5", type: "vehicle" }; // Корректно
console.log(gun.type ?? "Unknown"); // "Unknown"
// car.type = "tool"; // Ошибка: Type '"tool"' is not assignable to type '"weapon" | "vehicle"'

// 3. READONLY СВОЙСТВА
// Свойства, которые нельзя изменить после инициализации
interface Mission {
    readonly code: string;
    location: string;
}
const mission: Mission = {
    code: "GF",
    location: "Switzerland"
};
// mission.code = "SF"; // Ошибка: Cannot assign to 'code' because it is a read-only property
mission.location = "Shanghai"; // Корректно
console.log(mission); // { code: "GF", location: "Shanghai" }

// 4. ИНТЕРФЕЙСЫ ДЛЯ ФУНКЦИЙ
// Описываем сигнатуру функции
interface LogFunction {
    (message: string): void;
}
const logMission: LogFunction = (message) => console.log(`Mission log: ${message}`);
logMission("Started"); // "Mission log: Started"
// logMission(123); // Ошибка: Type 'number' is not assignable to type 'string'

// 5. НАСЛЕДОВАНИЕ ИНТЕРФЕЙСОВ
// Расширяем интерфейс с помощью extends
interface Person {
    name: string;
}
interface Agent extends Person {
    id: number;
    active: boolean;
}
const agent007: Agent = {
    name: "James Bond",
    id: 7,
    active: true
};
console.log(agent007); // { name: "James Bond", id: 7, active: true }

// Множественное наследование
interface Employee {
    salary: number;
}
interface Spy extends Agent, Employee {
    codename: string;
}
const spy: Spy = {
    name: "Bond",
    id: 7,
    active: true,
    salary: 100000,
    codename: "007"
};
console.log(spy); // { name: "Bond", id: 7, active: true, salary: 100000, codename: "007" }

// 6. ИНДЕКСНЫЕ ПОДПИСИ
// Описываем объекты с динамическими ключами
interface SkillSet {
    [skill: string]: number; // Ключ - строка, значение - число
}
const skills: SkillSet = {
    stealth: 90,
    combat: 85
};
skills["driving"] = 95; // Корректно
// skills["stealth"] = "high"; // Ошибка: Type 'string' is not assignable to type 'number'
console.log(skills); // { stealth: 90, combat: 85, driving: 95 }

// 7. ВЛОЖЕННЫЕ ИНТЕРФЕЙСЫ
// Описываем сложные структуры
interface Operation {
    mission: {
        code: string;
        details: {
            location: string;
            deadline?: Date;
        };
    };
}
const op: Operation = {
    mission: {
        code: "SF",
        details: {
            location: "Shanghai"
        }
    }
};
op.mission.details.deadline = new Date("2025-12-31"); // Корректно
console.log(op.mission.details); // { location: "Shanghai", deadline: 2025-12-31... }

// 8. ИНТЕРФЕЙСЫ ДЛЯ КЛАССОВ
// Интерфейс как контракт для класса
interface AgentContract {
    name: string;
    getId(): string;
}
class SecretAgent implements AgentContract {
    constructor(public name: string, private id: number) {}
    getId(): string {
        return `Agent-${this.id}`;
    }
}
const secretBond = new SecretAgent("James Bond", 7);
console.log(secretBond.getId()); // "Agent-7"
// const fakeAgent: AgentContract = { name: "Bond" }; // Ошибка: Property 'getId' is missing

// 9. ПРАКТИЧЕСКИЙ ПРИМЕР С ИНТЕРФЕЙСАМИ
// Сценарий: управление миссией агента
interface GadgetItem {
    name: string;
    type: "weapon" | "vehicle";
}

interface MissionDetails {
    code: string;
    location: string;
    gadgets: GadgetItem[];
}

interface AgentMission {
    readonly agentId: number;
    profile: {
        name: string;
        skills: { [skill: string]: number };
    };
    mission: MissionDetails;
}

const mission007: AgentMission = {
    agentId: 7,
    profile: {
        name: "James Bond",
        skills: {
            stealth: 90,
            combat: 85
        }
    },
    mission: {
        code: "GF",
        location: "Switzerland",
        gadgets: [
            { name: "Walther PPK", type: "weapon" },
            { name: "Aston Martin DB5", type: "vehicle" }
        ]
    }
};
// mission007.agentId = 8; // Ошибка: Cannot assign to 'agentId' because it is a read-only property
mission007.profile.skills["driving"] = 95; // Корректно

function briefMission(mission: AgentMission): string {
    const gadgetList = mission.mission.gadgets.map(g => g.name).join(", ");
    const skillList = Object.entries(mission.profile.skills).map(([k, v]) => `${k}: ${v}`).join(", ");
    return `${mission.profile.name} (ID: ${mission.agentId}) - ${mission.mission.code} in ${mission.mission.location}, Gadgets: ${gadgetList}, Skills: ${skillList}`;
}
console.log(briefMission(mission007)); 
// "James Bond (ID: 7) - GF in Switzerland, Gadgets: Walther PPK, Aston Martin DB5, Skills: stealth: 90, combat: 85, driving: 95"

// 10. СРАВНЕНИЕ С TYPE ALIAS
// Интерфейс
interface Point {
    x: number;
    y: number;
}
// Type alias
type PointAlias = {
    x: number;
    y: number;
};
// Основное отличие: интерфейсы можно расширять через extends, type - через &

interface ExtendedPoint extends Point {
    z: number;
}
const point3D: ExtendedPoint = { x: 1, y: 2, z: 3 };

// Итог: Интерфейсы нужны для:
// - описания структуры объектов
// - задания контрактов для классов
// - расширения через наследование
// - обеспечения строгой типизации и читаемости кода
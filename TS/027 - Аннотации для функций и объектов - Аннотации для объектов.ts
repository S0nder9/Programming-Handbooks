// 027-аннотации-для-функций-и-объектов-аннотации-для-объектов.ts

// Этот раздел объясняет, как аннотации типов применяются к объектам в TypeScript,
// включая интерфейсы, type aliases, опциональные свойства, readonly и другие аспекты.

// 1. БАЗОВАЯ АННОТАЦИЯ С ИНТЕРФЕЙСОМ
// Используем интерфейс для описания структуры объекта
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

// 2. АННОТАЦИЯ С TYPE ALIAS
// Альтернативный способ с использованием type
type Mission = {
    code: string;
    location: string;
    priority: number;
};
const goldfinger: Mission = {
    code: "GF",
    location: "Switzerland",
    priority: 1
};
console.log(goldfinger); // { code: "GF", location: "Switzerland", priority: 1 }
// goldfinger.priority = "high"; // Ошибка: Type 'string' is not assignable to type 'number'

// 3. ОПЦИОНАЛЬНЫЕ СВОЙСТВА
// Свойства, которые могут отсутствовать
interface Gadget {
    name: string;
    type?: "weapon" | "vehicle"; // Необязательное свойство
}
const gun: Gadget = { name: "Walther PPK" }; // Корректно
const car: Gadget = { name: "Aston Martin DB5", type: "vehicle" }; // Корректно
console.log(gun.type ?? "Unknown"); // "Unknown"
// car.type = "tool"; // Ошибка: Type '"tool"' is not assignable to type '"weapon" | "vehicle"'

// 4. READONLY СВОЙСТВА
// Свойства, которые нельзя изменить после инициализации
interface Operation {
    readonly id: string;
    agent: string;
}
const op: Operation = {
    id: "OP-007",
    agent: "James Bond"
};
// op.id = "OP-008"; // Ошибка: Cannot assign to 'id' because it is a read-only property
op.agent = "Bond, James Bond"; // Корректно
console.log(op); // { id: "OP-007", agent: "Bond, James Bond" }

// 5. ВЛОЖЕННЫЕ ОБЪЕКТЫ
// Аннотации для сложных структур
interface MissionDetails {
    mission: {
        code: string;
        details: {
            location: string;
            deadline?: Date;
        };
    };
}
const missionDetails: MissionDetails = {
    mission: {
        code: "SF",
        details: {
            location: "Shanghai"
        }
    }
};
missionDetails.mission.details.deadline = new Date("2025-12-31"); // Корректно
console.log(missionDetails.mission.details); // { location: "Shanghai", deadline: 2025-12-31... }
// missionDetails.mission.code = 007; // Ошибка: Type 'number' is not assignable to type 'string'

// 6. UNION TYPES ДЛЯ ОБЪЕКТОВ
// Объект может соответствовать одному из нескольких типов
type Status = { status: "active"; startDate: Date } | { status: "inactive"; reason: string };
const activeStatus: Status = {
    status: "active",
    startDate: new Date()
};
const inactiveStatus: Status = {
    status: "inactive",
    reason: "Mission aborted"
};
// const wrongStatus: Status = { status: "active", reason: "test" }; // Ошибка: несоответствие union типу
console.log(activeStatus); // { status: "active", startDate: [текущая дата] }

// 7. ИНДЕКСНЫЕ ПОДПИСИ (INDEX SIGNATURES)
// Для объектов с динамическими ключами
interface AgentSkills {
    [skill: string]: number; // Ключ - строка, значение - число
}
const skills: AgentSkills = {
    stealth: 90,
    combat: 85
};
skills["driving"] = 95; // Корректно
// skills["stealth"] = "high"; // Ошибка: Type 'string' is not assignable to type 'number'
console.log(skills); // { stealth: 90, combat: 85, driving: 95 }

// 8. АННОТАЦИИ В ФУНКЦИЯХ С ОБЪЕКТАМИ
// Передача объекта с аннотацией в функцию
interface Coordinates {
    lat: number;
    lon: number;
}
function setTarget(coords: Coordinates): string {
    return `Target at ${coords.lat}, ${coords.lon}`;
}
const target: Coordinates = { lat: 51.477928, lon: -0.001545 };
console.log(setTarget(target)); // "Target at 51.477928, -0.001545"
// setTarget({ lat: "51", lon: 0 }); // Ошибка: Type 'string' is not assignable to type 'number'

// 9. ПРЯМАЯ АННОТАЦИЯ ОБЪЕКТНОГО ЛИТЕРАЛА
// Аннотация без создания переменной
function processAgent(agent: { id: number; name: string }): string {
    return `${agent.name} (ID: ${agent.id})`;
}
console.log(processAgent({ id: 7, name: "James Bond" })); // "James Bond (ID: 7)"
// processAgent({ id: "007", name: "Bond" }); // Ошибка: Type 'string' is not assignable to type 'number'

// 10. ПРАКТИЧЕСКИЙ ПРИМЕР С ОБЪЕКТАМИ
// Комбинируем аннотации в сценарии миссии агента
interface AgentMission {
    readonly agentId: number;
    profile: {
        name: string;
        skills: { [key: string]: number }; // Индексная подпись
    };
    mission?: {
        code: string;
        gadgets: Gadget[];
    };
}

const agent007: AgentMission = {
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
        gadgets: [
            { name: "Walther PPK", type: "weapon" },
            { name: "Aston Martin DB5" }
        ]
    }
};
// agent007.agentId = 8; // Ошибка: Cannot assign to 'agentId' because it is a read-only property
agent007.profile.skills["driving"] = 95; // Корректно

function briefAgent(mission: AgentMission): string {
    const missionCode = mission.mission?.code ?? "No mission";
    const skillList = Object.entries(mission.profile.skills).map(([k, v]) => `${k}: ${v}`).join(", ");
    return `${mission.profile.name} (ID: ${mission.agentId}) - Mission: ${missionCode}, Skills: ${skillList}`;
}
console.log(briefAgent(agent007)); 
// "James Bond (ID: 7) - Mission: GF, Skills: stealth: 90, combat: 85, driving: 95"

// Итог: Аннотации для объектов позволяют строго задавать их структуру,
// включая опциональные и неизменяемые свойства, вложенные объекты и динамические ключи.
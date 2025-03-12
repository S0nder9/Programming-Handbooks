// 015-аннотации-типов-в-действии-аннотации-для-объектных-литералов.ts

// Этот раздел демонстрирует, как аннотации типов применяются к объектным литералам в TypeScript,
// чтобы задавать строгую структуру и предотвращать ошибки при работе с объектами.

// 1. БАЗОВЫЙ ПРИМЕР ОБЪЕКТНОГО ЛИТЕРАЛА С АННОТАЦИЕЙ
// Явно указываем тип объекта через интерфейс
interface Agent {
    id: number;        // Код агента - число
    name: string;      // Имя агента - строка
    active: boolean;   // Статус активности - булево значение
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
// Используем type вместо interface для той же цели
type Mission = {
    code: string;      // Код миссии
    location: string;  // Место проведения
    priority: number;  // Приоритет
};

const goldfinger: Mission = {
    code: "GF",
    location: "Switzerland",
    priority: 1
};
console.log(goldfinger); // { code: "GF", location: "Switzerland", priority: 1 }
// goldfinger.priority = "high"; // Ошибка: Type 'string' is not assignable to type 'number'

// 3. НЕОБЯЗАТЕЛЬНЫЕ СВОЙСТВА
// Добавляем опциональные поля с помощью "?"
interface Gadget {
    name: string;
    type?: "weapon" | "vehicle"; // Необязательное свойство с literal типами
}

const gun: Gadget = { name: "Walther PPK" }; // Корректно, type необязателен
const car: Gadget = { name: "Aston Martin DB5", type: "vehicle" }; // Корректно
// car.type = "tool"; // Ошибка: Type '"tool"' is not assignable to type '"weapon" | "vehicle"'

// Пример доступа к опциональному свойству
console.log(gun.type ?? "Тип не указан"); // "Тип не указан"

// 4. READONLY СВОЙСТВА
// Запрещаем изменение свойства после инициализации
interface Operation {
    readonly code: string; // Код операции неизменяем
    agent: string;
}

const op: Operation = {
    code: "OP-007",
    agent: "James Bond"
};
// op.code = "OP-008"; // Ошибка: Cannot assign to 'code' because it is a read-only property
op.agent = "Bond, James Bond"; // Корректно, agent можно изменить
console.log(op); // { code: "OP-007", agent: "Bond, James Bond" }

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
// missionDetails.mission.code = 007; // Ошибка: Type 'number' is not assignable to type 'string'
missionDetails.mission.details.deadline = new Date("2025-12-31"); // Корректно
console.log(missionDetails.mission.details); // { location: "Shanghai", deadline: 2025-12-31... }

// 6. АННОТАЦИИ С UNION TYPES
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

// Пример проверки типа
function logStatus(status: Status): void {
    if (status.status === "active") {
        console.log(`Started: ${status.startDate}`);
    } else {
        console.log(`Reason: ${status.reason}`);
    }
}
logStatus(activeStatus); // "Started: [текущая дата]"

// 7. АННОТАЦИИ В ФУНКЦИЯХ
// Передача объектного литерала с аннотацией в функцию
interface Coordinates {
    lat: number;
    lon: number;
}

function setTargetLocation(coords: Coordinates): string {
    return `Target at ${coords.lat}, ${coords.lon}`;
}

const target: Coordinates = { lat: 51.477928, lon: -0.001545 };
console.log(setTargetLocation(target)); // "Target at 51.477928, -0.001545"
// setTargetLocation({ lat: "51", lon: 0 }); // Ошибка: Type 'string' is not assignable to type 'number'

// 8. ПРЯМАЯ АННОТАЦИЯ БЕЗ ПЕРЕМЕННОЙ
// Аннотация применяется непосредственно к литералу
function processAgent(agent: { id: number; name: string }): string {
    return `${agent.name} (ID: ${agent.id})`;
}
console.log(processAgent({ id: 7, name: "James Bond" })); // "James Bond (ID: 7)"
// processAgent({ id: "007", name: "Bond" }); // Ошибка: Type 'string' is not assignable to type 'number'

// 9. РЕАЛЬНЫЙ СЦЕНАРИЙ С ОБЪЕКТНЫМИ ЛИТЕРАЛАМИ
// Комбинируем аннотации для описания миссии агента
interface AgentMission {
    readonly agentId: number;
    profile: {
        name: string;
        skills: string[];
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
        skills: ["stealth", "combat"]
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
agent007.profile.skills.push("driving"); // Корректно

function briefAgent(mission: AgentMission): string {
    const missionCode = mission.mission?.code ?? "No mission";
    return `${mission.profile.name} (ID: ${mission.agentId}) - Mission: ${missionCode}`;
}
console.log(briefAgent(agent007)); // "James Bond (ID: 7) - Mission: GF"

// Итог: Аннотации типов для объектных литералов позволяют строго задавать их структуру,
// предотвращать ошибки и улучшать читаемость кода.
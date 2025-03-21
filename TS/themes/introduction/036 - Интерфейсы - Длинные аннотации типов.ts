// 036-интерфейсы-длинные-аннотации-типов.ts

// Этот раздел объясняет, как TypeScript обрабатывает длинные и сложные аннотации типов
// с использованием интерфейсов, включая вложенные структуры, union типы, generics и другие подходы.

// 1. ДЛИННЫЕ АННОТАЦИИ В ИНТЕРФЕЙСАХ
// Описываем сложный объект с вложенными свойствами
interface AgentMission {
    agent: {
        id: number;
        name: string;
        skills: {
            stealth: number;
            combat: number;
            driving?: number; // Опциональное свойство
        };
    };
    mission: {
        code: string;
        details: {
            location: string;
            targets: string[];
            deadline: Date | null;
        };
        gadgets: Array<{
            name: string;
            type: "weapon" | "vehicle";
            specs: {
                power: number;
                status: "active" | "inactive";
            };
        }>;
    };
    status: "pending" | "active" | "completed";
}

const mission007: AgentMission = {
    agent: {
        id: 7,
        name: "James Bond",
        skills: {
            stealth: 90,
            combat: 85
        }
    },
    mission: {
        code: "GF",
        details: {
            location: "Switzerland",
            targets: ["enemy1", "enemy2"],
            deadline: new Date("2025-12-31")
        },
        gadgets: [
            { name: "Walther PPK", type: "weapon", specs: { power: 50, status: "active" } },
            { name: "Aston Martin DB5", type: "vehicle", specs: { power: 200, status: "active" } }
        ]
    },
    status: "active"
};
// mission007.agent.skills.combat = "high"; // Ошибка: Type 'string' is not assignable to type 'number'
console.log(mission007.agent.name, mission007.mission.code); // "James Bond", "GF"

// 2. РАЗБИЕНИЕ ДЛИННЫХ АННОТАЦИЙ НА ИНТЕРФЕЙСЫ
// Делаем код читаемее, выделяя вложенные структуры в отдельные интерфейсы
interface AgentProfile {
    id: number;
    name: string;
    skills: {
        stealth: number;
        combat: number;
        driving?: number;
    };
}

interface GadgetSpec {
    power: number;
    status: "active" | "inactive";
}

interface Gadget {
    name: string;
    type: "weapon" | "vehicle";
    specs: GadgetSpec;
}

interface MissionDetails {
    code: string;
    details: {
        location: string;
        targets: string[];
        deadline: Date | null;
    };
    gadgets: Gadget[];
}

interface AgentMissionRefined {
    agent: AgentProfile;
    mission: MissionDetails;
    status: "pending" | "active" | "completed";
}

const refinedMission: AgentMissionRefined = {
    agent: {
        id: 7,
        name: "James Bond",
        skills: {
            stealth: 90,
            combat: 85,
            driving: 95
        }
    },
    mission: {
        code: "GF",
        details: {
            location: "Switzerland",
            targets: ["enemy1", "enemy2"],
            deadline: new Date("2025-12-31")
        },
        gadgets: [
            { name: "Walther PPK", type: "weapon", specs: { power: 50, status: "active" } },
            { name: "Aston Martin DB5", type: "vehicle", specs: { power: 200, status: "active" } }
        ]
    },
    status: "active"
};
console.log(refinedMission.mission.gadgets[0].name); // "Walther PPK"

// 3. UNION ТИПЫ В ДЛИННЫХ АННОТАЦИЯХ
// Интерфейс с union типами для гибкости
interface MissionEvent {
    timestamp: Date;
    data: { type: "start"; agent: string } | { type: "end"; reason: string } | { type: "update"; details: string };
}

const events: MissionEvent[] = [
    { timestamp: new Date(), data: { type: "start", agent: "Bond" } },
    { timestamp: new Date(), data: { type: "update", details: "Target spotted" } },
    { timestamp: new Date(), data: { type: "end", reason: "Mission completed" } }
];
// events.push({ timestamp: new Date(), data: { type: "pause" } }); // Ошибка: Type '"pause"' is not assignable to type
console.log(events[1].data.details); // "Target spotted"

// 4. GENERICS В ДЛИННЫХ АННОТАЦИЯХ
// Используем обобщённые типы для универсальности
interface Inventory<T> {
    items: T[];
    capacity: number;
    addItem: (item: T) => void;
}

interface Weapon {
    name: string;
    damage: number;
}

const weaponInventory: Inventory<Weapon> = {
    items: [{ name: "Walther PPK", damage: 50 }],
    capacity: 5,
    addItem: (item) => weaponInventory.items.push(item)
};
weaponInventory.addItem({ name: "Silenced Pistol", damage: 45 });
// weaponInventory.addItem({ name: "Car" }); // Ошибка: Property 'damage' is missing
console.log(weaponInventory.items); // [{ name: "Walther PPK", damage: 50 }, { name: "Silenced Pistol", damage: 45 }]

// 5. ДЛИННЫЕ АННОТАЦИИ В ФУНКЦИЯХ
// Функция с длинной аннотацией параметра
function processMission({ agent, mission }: { 
    agent: { id: number; name: string }; 
    mission: { code: string; gadgets: { name: string; type: "weapon" | "vehicle" }[] } 
}): string {
    const gadgetList = mission.gadgets.map(g => g.name).join(", ");
    return `${agent.name} (ID: ${agent.id}) on ${mission.code} with ${gadgetList}`;
}
const missionData = {
    agent: { id: 7, name: "James Bond" },
    mission: { code: "GF", gadgets: [{ name: "Walther PPK", type: "weapon" }] }
};
console.log(processMission(missionData)); // "James Bond (ID: 7) on GF with Walther PPK"

// С использованием интерфейса для упрощения
interface MissionInput {
    agent: { id: number; name: string };
    mission: { code: string; gadgets: { name: string; type: "weapon" | "vehicle" }[] };
}
function processMissionRefined(data: MissionInput): string {
    const gadgetList = data.mission.gadgets.map(g => g.name).join(", ");
    return `${data.agent.name} (ID: ${data.agent.id}) on ${data.mission.code} with ${gadgetList}`;
}
console.log(processMissionRefined(missionData)); // "James Bond (ID: 7) on GF with Walther PPK"

// 6. ПРАКТИЧЕСКИЙ ПРИМЕР С ДЛИННЫМИ АННОТАЦИЯМИ
// Сценарий: управление сложной миссией
interface Target {
    name: string;
    coordinates: [number, number];
}

interface MissionLog {
    events: Array<{
        timestamp: Date;
        description: string;
        agentId: number;
    }>;
}

interface ComplexMission {
    readonly missionId: string;
    agent: AgentProfile;
    targets: Target[];
    log: MissionLog;
    gadgets: Gadget[];
}

const complexMission: ComplexMission = {
    missionId: "M007",
    agent: {
        id: 7,
        name: "James Bond",
        skills: { stealth: 90, combat: 85 }
    },
    targets: [
        { name: "enemy1", coordinates: [51.477928, -0.001545] },
        { name: "enemy2", coordinates: [52.0, 0.0] }
    ],
    log: {
        events: [
            { timestamp: new Date("2025-03-12"), description: "Mission started", agentId: 7 }
        ]
    },
    gadgets: [
        { name: "Walther PPK", type: "weapon", specs: { power: 50, status: "active" } }
    ]
};

function summarizeMission(mission: ComplexMission): string {
    const targetList = mission.targets.map(t => `${t.name} at ${t.coordinates}`).join(", ");
    const gadgetList = mission.gadgets.map(g => g.name).join(", ");
    return `${mission.agent.name} (ID: ${mission.agent.id}) on ${mission.missionId}: Targets - ${targetList}, Gadgets - ${gadgetList}`;
}
console.log(summarizeMission(complexMission)); 
// "James Bond (ID: 7) on M007: Targets - enemy1 at 51.477928,-0.001545, enemy2 at 52,0, Gadgets - Walther PPK"

// Итог: Длинные аннотации типов в интерфейсах полезны для:
// - описания сложных структур данных
// - повышения читаемости через разбиение на подинтерфейсы
// - обеспечения строгой типизации вложенных объектов
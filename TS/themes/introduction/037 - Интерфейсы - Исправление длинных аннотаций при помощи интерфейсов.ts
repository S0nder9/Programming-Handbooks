// 037-интерфейсы-исправление-длинных-аннотаций-при-помощи-интерфейсов.ts

// Этот раздел демонстрирует, как длинные и сложные аннотации типов можно упростить,
// разделяя их на более мелкие интерфейсы для повышения читаемости и переиспользования.

// 1. ПРОБЛЕМА: ДЛИННАЯ АННОТАЦИЯ БЕЗ ИНТЕРФЕЙСОВ
// Пример сложной аннотации в функции
function processMissionRaw(data: { 
    agent: { id: number; name: string; skills: { stealth: number; combat: number } }; 
    mission: { code: string; details: { location: string; targets: string[] }; gadgets: { name: string; type: "weapon" | "vehicle" }[] }; 
    status: "pending" | "active" | "completed" 
}): string {
    return `${data.agent.name} (ID: ${data.agent.id}) on ${data.mission.code}, Status: ${data.status}`;
}

const rawMission = {
    agent: { id: 7, name: "James Bond", skills: { stealth: 90, combat: 85 } },
    mission: { 
        code: "GF", 
        details: { location: "Switzerland", targets: ["enemy1"] }, 
        gadgets: [{ name: "Walther PPK", type: "weapon" }] 
    },
    status: "active"
};
console.log(processMissionRaw(rawMission)); 
// "James Bond (ID: 7) on GF, Status: active"

// Проблемы:
// - длинная аннотация трудно читаема
// - повторное использование невозможно
// - поддержка сложнее при изменениях

// 2. ИСПРАВЛЕНИЕ: РАЗБИЕНИЕ НА ИНТЕРФЕЙСЫ
// Разделяем на логические части
interface Agent {
    id: number;
    name: string;
    skills: {
        stealth: number;
        combat: number;
    };
}

interface MissionDetails {
    location: string;
    targets: string[];
}

interface Gadget {
    name: string;
    type: "weapon" | "vehicle";
}

interface Mission {
    code: string;
    details: MissionDetails;
    gadgets: Gadget[];
}

interface AgentMission {
    agent: Agent;
    mission: Mission;
    status: "pending" | "active" | "completed";
}

// Упрощённая функция
function processMission(data: AgentMission): string {
    return `${data.agent.name} (ID: ${data.agent.id}) on ${data.mission.code}, Status: ${data.status}`;
}

const mission007: AgentMission = {
    agent: { id: 7, name: "James Bond", skills: { stealth: 90, combat: 85 } },
    mission: { 
        code: "GF", 
        details: { location: "Switzerland", targets: ["enemy1"] }, 
        gadgets: [{ name: "Walther PPK", type: "weapon" }] 
    },
    status: "active"
};
console.log(processMission(mission007)); 
// "James Bond (ID: 7) on GF, Status: active"

// Преимущества:
// - читаемость улучшена
// - интерфейсы можно переиспользовать
// - легче вносить изменения

// 3. ЕЩЁ БОЛЕЕ СЛОЖНЫЙ ПРИМЕР С ДЛИННОЙ АННОТАЦИЕЙ
// Проблемный код без интерфейсов
function logComplexMission(data: { 
    agent: { id: number; name: string; skills: { [skill: string]: number } }; 
    mission: { code: string; events: { timestamp: Date; description: string }[]; targets: { name: string; coordinates: [number, number] }[] }; 
    gadgets: { name: string; type: "weapon" | "vehicle"; specs: { power: number; status: "active" | "inactive" } }[] 
}): void {
    console.log(`${data.agent.name} on ${data.mission.code}`);
}

// Исправление с интерфейсами
interface SkillSet {
    [skill: string]: number;
}

interface AgentProfile {
    id: number;
    name: string;
    skills: SkillSet;
}

interface MissionEvent {
    timestamp: Date;
    description: string;
}

interface Target {
    name: string;
    coordinates: [number, number];
}

interface MissionData {
    code: string;
    events: MissionEvent[];
    targets: Target[];
}

interface GadgetSpec {
    power: number;
    status: "active" | "inactive";
}

interface GadgetItem {
    name: string;
    type: "weapon" | "vehicle";
    specs: GadgetSpec;
}

interface ComplexMission {
    agent: AgentProfile;
    mission: MissionData;
    gadgets: GadgetItem[];
}

function logComplexMissionRefined(data: ComplexMission): void {
    console.log(`${data.agent.name} on ${data.mission.code}`);
}

const complexMission: ComplexMission = {
    agent: { id: 7, name: "James Bond", skills: { stealth: 90, combat: 85 } },
    mission: {
        code: "GF",
        events: [{ timestamp: new Date("2025-03-12"), description: "Started" }],
        targets: [{ name: "enemy1", coordinates: [51.477928, -0.001545] }]
    },
    gadgets: [{ name: "Walther PPK", type: "weapon", specs: { power: 50, status: "active" } }]
};
logComplexMissionRefined(complexMission); 
// "James Bond on GF"

// 4. ПЕРЕИСПользование ИНТЕРФЕЙСОВ
// Интерфейсы можно использовать в других местах
function getAgentSkills(agent: AgentProfile): string {
    return Object.entries(agent.skills).map(([k, v]) => `${k}: ${v}`).join(", ");
}
console.log(getAgentSkills(complexMission.agent)); // "stealth: 90, combat: 85"

// Использование GadgetItem в другой функции
function listGadgets(gadgets: GadgetItem[]): string {
    return gadgets.map(g => g.name).join(", ");
}
console.log(listGadgets(complexMission.gadgets)); // "Walther PPK"

// 5. ДОБАВЛЕНИЕ GENERICS ДЛЯ ГИБКОСТИ
// Исправляем длинные аннотации с обобщёнными типами
interface Inventory<T> {
    items: T[];
    capacity: number;
}

interface Operation<T> {
    agent: AgentProfile;
    mission: MissionData;
    inventory: Inventory<T>;
}

const weaponOperation: Operation<GadgetItem> = {
    agent: { id: 7, name: "James Bond", skills: { stealth: 90 } },
    mission: { code: "SF", events: [], targets: [] },
    inventory: {
        items: [{ name: "Walther PPK", type: "weapon", specs: { power: 50, status: "active" } }],
        capacity: 5
    }
};
console.log(weaponOperation.inventory.items[0].name); // "Walther PPK"

// 6. ПРАКТИЧЕСКИЙ ПРИМЕР: УПРОЩЕНИЕ СЛОЖНОЙ СТРУКТУРЫ
// Исходная длинная аннотация
function summarizeRaw(data: { agent: { id: number; name: string }; mission: { code: string; targets: { name: string; priority: number }[] } }): string {
    return `${data.agent.name} on ${data.mission.code}`;
}

// Исправленная версия
interface AgentSummary {
    id: number;
    name: string;
}

interface MissionTarget {
    name: string;
    priority: number;
}

interface MissionSummary {
    code: string;
    targets: MissionTarget[];
}

interface MissionBrief {
    agent: AgentSummary;
    mission: MissionSummary;
}

function summarize(data: MissionBrief): string {
    const targetList = data.mission.targets.map(t => t.name).join(", ");
    return `${data.agent.name} on ${data.mission.code}, Targets: ${targetList}`;
}

const brief: MissionBrief = {
    agent: { id: 7, name: "James Bond" },
    mission: { code: "GF", targets: [{ name: "enemy1", priority: 1 }] }
};
console.log(summarize(brief)); 
// "James Bond on GF, Targets: enemy1"

// Итог: Исправление длинных аннотаций через интерфейсы:
// - улучшает читаемость
// - делает код модульным и переиспользуемым
// - упрощает поддержку и расширение
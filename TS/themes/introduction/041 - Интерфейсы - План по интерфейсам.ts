// 041-интерфейсы-план-по-интерфейсам.ts

// Этот раздел представляет план использования интерфейсов в TypeScript,
// включая шаги по их созданию, применению и оптимизации для структурирования кода.

// ПЛАН ПО ИНТЕРФЕЙСАМ:
// 1. Определение базовых структур
// 2. Добавление методов и поведения
// 3. Использование опциональных свойств и readonly
// 4. Наследование для расширения
// 5. Применение в функциях и классах
// 6. Оптимизация с помощью generics
// 7. Разбиение сложных структур
// 8. Практическое применение в проекте

// 1. ОПРЕДЕЛЕНИЕ БАЗОВЫХ СТРУКТУР
// Начинаем с простых интерфейсов для ключевых сущностей
interface Agent {
    id: number;
    name: string;
}
interface Mission {
    code: string;
    location: string;
}
const bond: Agent = { id: 7, name: "James Bond" };
const goldfinger: Mission = { code: "GF", location: "Switzerland" };
console.log(`${bond.name} on ${goldfinger.code}`); // "James Bond on GF"

// 2. ДОБАВЛЕНИЕ МЕТОДОВ И ПОВЕДЕНИЯ
// Расширяем интерфейсы, добавляя функции
interface Agent {
    id: number;
    name: string;
    getCode(): string; // Метод для получения кода агента
}
interface Mission {
    code: string;
    location: string;
    brief(): string; // Метод для краткого описания
}
const bondWithMethod: Agent = {
    id: 7,
    name: "James Bond",
    getCode: () => "007"
};
const goldfingerWithMethod: Mission = {
    code: "GF",
    location: "Switzerland",
    brief: () => "Goldfinger mission in Switzerland"
};
console.log(bondWithMethod.getCode()); // "007"
console.log(goldfingerWithMethod.brief()); // "Goldfinger mission in Switzerland"

// 3. ИСПОЛЬЗОВАНИЕ ОПЦИОНАЛЬНЫХ СВОЙСТВ И READONLY
// Добавляем гибкость и защиту
interface Agent {
    id: number;
    name: string;
    getCode(): string;
    status?: "active" | "inactive"; // Опциональное свойство
}
interface Mission {
    readonly code: string; // Неизменяемый код
    location: string;
    brief(): string;
    deadline?: Date; // Опциональная дата
}
const flexibleBond: Agent = { id: 7, name: "James Bond", getCode: () => "007" }; // Без status
const activeBond: Agent = { id: 7, name: "James Bond", getCode: () => "007", status: "active" };
const fixedMission: Mission = {
    code: "GF",
    location: "Switzerland",
    brief: () => "Goldfinger mission"
};
// fixedMission.code = "SF"; // Ошибка: Cannot assign to 'code' because it is a read-only property
console.log(activeBond.status); // "active"
console.log(flexibleBond.status ?? "unknown"); // "unknown"

// 4. НАСЛЕДОВАНИЕ ДЛЯ РАСШИРЕНИЯ
// Создаём производные интерфейсы
interface Spy extends Agent {
    skills: { [skill: string]: number };
}
interface DetailedMission extends Mission {
    targets: string[];
}
const spyBond: Spy = {
    id: 7,
    name: "James Bond",
    getCode: () => "007",
    skills: { stealth: 90, combat: 85 }
};
const detailedGF: DetailedMission = {
    code: "GF",
    location: "Switzerland",
    brief: () => "Goldfinger mission",
    targets: ["enemy1", "enemy2"]
};
console.log(spyBond.skills.stealth); // 90
console.log(detailedGF.targets[0]); // "enemy1"

// 5. ПРИМЕНЕНИЕ В ФУНКЦИЯХ И КЛАССАХ
// Используем интерфейсы как контракты
function briefAgent(agent: Agent): string {
    return `${agent.name} (Code: ${agent.getCode()})`;
}
class SecretMission implements DetailedMission {
    constructor(
        public code: string,
        public location: string,
        public targets: string[]
    ) {}
    brief(): string {
        return `${this.code} in ${this.location}`;
    }
}
const secretGF = new SecretMission("GF", "Switzerland", ["enemy1"]);
console.log(briefAgent(spyBond)); // "James Bond (Code: 007)"
console.log(secretGF.brief()); // "GF in Switzerland"

// 6. ОПТИМИЗАЦИЯ С ПОМОЩЬЮ GENERICS
// Добавляем универсальность через обобщённые типы
interface Inventory<T> {
    items: T[];
    addItem(item: T): void;
}
interface Gadget {
    name: string;
}
const gadgetInventory: Inventory<Gadget> = {
    items: [{ name: "Walther PPK" }],
    addItem: (item) => gadgetInventory.items.push(item)
};
gadgetInventory.addItem({ name: "Aston Martin DB5" });
console.log(gadgetInventory.items.map(g => g.name)); // ["Walther PPK", "Aston Martin DB5"]

// 7. РАЗБИЕНИЕ СЛОЖНЫХ СТРУКТУР
// Дробим большие интерфейсы на переиспользуемые части
interface Skills {
    stealth: number;
    combat: number;
}
interface AgentProfile {
    id: number;
    name: string;
    skills: Skills;
}
interface MissionTarget {
    name: string;
    priority: number;
}
interface FullMission {
    agent: AgentProfile;
    mission: {
        code: string;
        targets: MissionTarget[];
    };
}
const fullMission: FullMission = {
    agent: { id: 7, name: "James Bond", skills: { stealth: 90, combat: 85 } },
    mission: { code: "GF", targets: [{ name: "enemy1", priority: 1 }] }
};
console.log(fullMission.agent.skills.stealth); // 90

// 8. ПРАКТИЧЕСКИЙ ПРИМЕР: ПЛАН В ДЕЙСТВИИ
// Сценарий: управление миссией агента
// Шаг 1: Базовая структура
interface Operative {
    id: number;
    name: string;
}
// Шаг 2: Добавляем методы
interface Operative {
    id: number;
    name: string;
    report(): string;
}
// Шаг 3: Опциональные свойства
interface Operative {
    id: number;
    name: string;
    report(): string;
    status?: "active" | "inactive";
}
// Шаг 4: Наследование
interface SpyOperative extends Operative {
    codename: string;
}
// Шаг 5: Применение в функциях
function deployOperative(operative: Operative): string {
    return `${operative.name} deployed (${operative.report()})`;
}
// Шаг 6: Generics для инвентаря
interface OperativeInventory<T> {
    items: T[];
    equip(item: T): void;
}
// Шаг 7: Разбиение структуры
interface MissionData {
    code: string;
    location: string;
}
interface SpyMission {
    operative: SpyOperative;
    mission: MissionData;
    inventory: OperativeInventory<string>;
}

// Реализация
const spy007: SpyOperative = {
    id: 7,
    name: "James Bond",
    report: () => "Ready for action",
    codename: "007",
    status: "active"
};
const missionControl: SpyMission = {
    operative: spy007,
    mission: { code: "GF", location: "Switzerland" },
    inventory: {
        items: ["Walther PPK"],
        equip: (item) => missionControl.inventory.items.push(item)
    }
};
missionControl.inventory.equip("Jetpack");
console.log(deployOperative(spy007)); // "James Bond deployed (Ready for action)"
console.log(missionControl.inventory.items); // ["Walther PPK", "Jetpack"]

// Итог: План по интерфейсам помогает:
// - структурировать код поэтапно
// - добавлять функциональность постепенно
// - обеспечивать переиспользование и гибкость
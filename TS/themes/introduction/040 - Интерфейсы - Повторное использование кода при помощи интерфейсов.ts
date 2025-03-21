// 040-интерфейсы-повторное-использование-кода-при-помощи-интерфейсов.ts

// Этот раздел объясняет, как интерфейсы в TypeScript способствуют повторному использованию кода,
// позволяя задавать общие структуры и контракты для различных объектов и функций.

// 1. ОПРЕДЕЛЕНИЕ ПЕРЕИСПОЛЬЗУЕМОЙ СТРУКТУРЫ
// Интерфейс как общий контракт для объектов
interface Agent {
    id: number;
    name: string;
    getCode(): string;
}

// Повторное использование в разных объектах
const bond: Agent = {
    id: 7,
    name: "James Bond",
    getCode: () => "007"
};
const moneypenny: Agent = {
    id: 2,
    name: "Miss Moneypenny",
    getCode: () => "MP"
};
console.log(bond.getCode()); // "007"
console.log(moneypenny.getCode()); // "MP"

// Преимущество: одна структура для разных агентов

// 2. ИСПОЛЬЗОВАНИЕ В ФУНКЦИЯХ
// Функция работает с любым объектом, соответствующим интерфейсу
function briefAgent(agent: Agent): string {
    return `${agent.name} (ID: ${agent.id}, Code: ${agent.getCode()})`;
}
console.log(briefAgent(bond)); // "James Bond (ID: 7, Code: 007)"
console.log(briefAgent(moneypenny)); // "Miss Moneypenny (ID: 2, Code: MP)"

// Преимущество: функция переиспользуется без дублирования кода

// 3. НАСЛЕДОВАНИЕ ДЛЯ РАСШИРЕНИЯ
// Расширяем базовый интерфейс для специфических нужд
interface Spy extends Agent {
    skills: { [skill: string]: number };
}
const spyBond: Spy = {
    id: 7,
    name: "James Bond",
    getCode: () => "007",
    skills: { stealth: 90, combat: 85 }
};
// Функция briefAgent всё ещё работает
console.log(briefAgent(spyBond)); // "James Bond (ID: 7, Code: 007)"
console.log(spyBond.skills.stealth); // 90

// Преимущество: базовый интерфейс переиспользуется, а новый добавляет специфичность

// 4. ПЕРЕИСПОЛЬЗОВАНИЕ В КЛАССАХ
// Интерфейс как контракт для классов
interface Gadget {
    name: string;
    activate(): string;
}
class Weapon implements Gadget {
    constructor(public name: string) {}
    activate(): string {
        return `${this.name} fired`;
    }
}
class Vehicle implements Gadget {
    constructor(public name: string) {}
    activate(): string {
        return `${this.name} started`;
    }
}
const gun = new Weapon("Walther PPK");
const car = new Vehicle("Aston Martin DB5");
console.log(gun.activate()); // "Walther PPK fired"
console.log(car.activate()); // "Aston Martin DB5 started"

// Функция для любого Gadget
function useGadget(gadget: Gadget): string {
    return gadget.activate();
}
console.log(useGadget(gun)); // "Walther PPK fired"
console.log(useGadget(car)); // "Aston Martin DB5 started"

// Преимущество: один интерфейс для разных классов и функций

// 5. ПЕРЕИСПОЛЬЗОВАНИЕ С GENERICS
// Интерфейс с обобщённым типом для универсальности
interface Inventory<T> {
    items: T[];
    addItem(item: T): void;
    getCount(): number;
}
const gadgetInventory: Inventory<Gadget> = {
    items: [gun, car],
    addItem: function(item) { this.items.push(item); },
    getCount: function() { return this.items.length; }
};
gadgetInventory.addItem(new Weapon("Jetpack"));
console.log(gadgetInventory.getCount()); // 3

const numberInventory: Inventory<number> = {
    items: [1, 2, 3],
    addItem: function(item) { this.items.push(item); },
    getCount: function() { return this.items.length; }
};
numberInventory.addItem(4);
console.log(numberInventory.getCount()); // 4

// Преимущество: один интерфейс для разных типов данных

// 6. ПЕРЕИСПОЛЬЗОВАНИЕ ВЛОЖЕННЫХ СТРУКТУР
// Разделяем сложные структуры на переиспользуемые части
interface Target {
    name: string;
    priority: number;
}
interface Mission {
    code: string;
    targets: Target[];
}
interface AgentMission {
    agent: Agent;
    mission: Mission;
}
const mission007: AgentMission = {
    agent: bond,
    mission: {
        code: "GF",
        targets: [{ name: "enemy1", priority: 1 }]
    }
};
// Переиспользуем Target отдельно
const standaloneTarget: Target = { name: "enemy2", priority: 2 };
console.log(mission007.mission.targets[0].name); // "enemy1"
console.log(standaloneTarget.name); // "enemy2"

// Преимущество: Target и Mission переиспользуются в разных контекстах

// 7. ПРАКТИЧЕСКИЙ ПРИМЕР С ПЕРЕИСПОЛЬЗОВАНИЕМ
// Сценарий: управление миссиями и арсеналом
interface Loggable {
    log(event: string): void;
}

interface Operative extends Agent, Loggable {
    skills: { stealth: number };
}

interface MissionControl {
    operatives: Operative[];
    assignMission(operative: Operative, mission: Mission): string;
}

// Реализация
const operativeBond: Operative = {
    id: 7,
    name: "James Bond",
    getCode: () => "007",
    skills: { stealth: 90 },
    log: (event) => console.log(`${operativeBond.name}: ${event}`)
};

const missionControl: MissionControl = {
    operatives: [operativeBond],
    assignMission: (operative, mission) => {
        operative.log(`Assigned to ${mission.code}`);
        return `${operative.getCode()} on ${mission.code}`;
    }
};

const goldfinger: Mission = {
    code: "GF",
    targets: [{ name: "enemy1", priority: 1 }]
};
console.log(missionControl.assignMission(operativeBond, goldfinger)); 
// "James Bond: Assigned to GF"
// "007 on GF"

// Переиспользование Loggable в другом контексте
const gadgetLogger: Loggable = {
    log: (event) => console.log(`Gadget log: ${event}`)
};
gadgetLogger.log("Activated"); // "Gadget log: Activated"

// 8. ПЕРЕИСПОЛЬЗОВАНИЕ ЧЕРЕЗ СОСТАВЛЕНИЕ
// Комбинируем интерфейсы для новых структур
interface Reportable {
    report(): string;
}
interface EnhancedAgent extends Agent, Reportable, Loggable {}
const enhancedBond: EnhancedAgent = {
    id: 7,
    name: "James Bond",
    getCode: () => "007",
    report: () => "Mission status: active",
    log: (event) => console.log(event)
};
console.log(enhancedBond.report()); // "Mission status: active"
enhancedBond.log("Reporting in"); // "Reporting in"

// 9. ОШИБКИ И ОГРАНИЧЕНИЯ
// Неправильная реализация интерфейса
// const fakeAgent: Agent = { id: "007", name: "Bond" }; // Ошибка: Property 'getCode' is missing

// Итог: Интерфейсы способствуют повторному использованию кода:
// - задают общие структуры для объектов и классов
// - используются в функциях и generics
// - расширяются через наследование
// - составляются для новых сущностей
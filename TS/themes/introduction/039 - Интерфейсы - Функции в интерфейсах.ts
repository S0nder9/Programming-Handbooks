// 039-интерфейсы-функции-в-интерфейсах.ts

// Этот раздел объясняет, как функции включаются в интерфейсы в TypeScript,
// включая синтаксис сигнатур функций, методы объектов и их использование.

// 1. СИГНАТУРА ФУНКЦИИ В ИНТЕРФЕЙСЕ
// Интерфейс может описывать функцию через её сигнатуру
interface LogFunction {
    (message: string): void; // Сигнатура: принимает строку, ничего не возвращает
}
const log: LogFunction = (msg) => console.log(`Log: ${msg}`);
log("Mission started"); // "Log: Mission started"
// log(123); // Ошибка: Type 'number' is not assignable to type 'string'

// С несколькими параметрами
interface MathOperation {
    (a: number, b: number): number;
}
const add: MathOperation = (x, y) => x + y;
console.log(add(5, 3)); // 8
// add("5", "3"); // Ошибка: Type 'string' is not assignable to type 'number'

// 2. МЕТОДЫ В ИНТЕРФЕЙСЕ
// Интерфейс может определять методы как свойства объекта
interface Agent {
    name: string;
    getCode(): string; // Метод без параметров, возвращает строку
    logActivity(activity: string): void; // Метод с параметром
}
const bond: Agent = {
    name: "James Bond",
    getCode: () => "007",
    logActivity: (activity) => console.log(`${bond.name}: ${activity}`)
};
console.log(bond.getCode()); // "007"
bond.logActivity("Infiltrating"); // "James Bond: Infiltrating"

// 3. ОПЦИОНАЛЬНЫЕ МЕТОДЫ
// Методы с "?" могут быть необязательными
interface Gadget {
    name: string;
    activate?(): string; // Опциональный метод
}
const gun: Gadget = { name: "Walther PPK" }; // Корректно без activate
const car: Gadget = {
    name: "Aston Martin DB5",
    activate: () => "Car activated"
};
console.log(gun.activate?.() ?? "No activation"); // "No activation"
console.log(car.activate?.()); // "Car activated"

// 4. READONLY МЕТОДЫ (ОГРАНИЧЕНИЕ)
// Readonly применимо только к свойствам, а не к методам напрямую
interface Mission {
    readonly code: string;
    getDetails(): string; // Метод не может быть readonly, но само свойство code защищено
}
const mission: Mission = {
    code: "GF",
    getDetails: () => mission.code // Доступ к readonly свойству
};
// mission.code = "SF"; // Ошибка: Cannot assign to 'code' because it is a read-only property
console.log(mission.getDetails()); // "GF"

// 5. НАСЛЕДОВАНИЕ С МЕТОДАМИ
// Интерфейс может наследовать методы от другого интерфейса
interface Person {
    getName(): string;
}
interface AgentExtended extends Person {
    getId(): number;
}
const agent: AgentExtended = {
    getName: () => "James Bond",
    getId: () => 7
};
console.log(agent.getName(), agent.getId()); // "James Bond", 7

// 6. ФУНКЦИИ С THIS В ИНТЕРФЕЙСАХ
// Указываем тип this для методов
interface Counter {
    increment(): number;
    getCount(this: Counter): number; // Явно указываем this
}
const counter: Counter = {
    count: 0,
    increment: function() { return this.count += 1; },
    getCount: function() { return this.count; }
};
console.log(counter.increment()); // 1
console.log(counter.getCount()); // 1

// 7. GENERICS В МЕТОДАХ ИНТЕРФЕЙСА
// Методы могут быть обобщёнными
interface Inventory {
    addItem<T>(item: T): T[];
    getItems(): any[]; // Для простоты
}
const inventory: Inventory = {
    items: [],
    addItem: function<T>(item: T) { this.items.push(item); return this.items as T[]; },
    getItems: function() { return this.items; }
};
inventory.addItem<string>("Walther PPK");
inventory.addItem<number>(7);
console.log(inventory.getItems()); // ["Walther PPK", 7]

// 8. ГИБРИДНЫЙ ИНТЕРФЕЙС (ФУНКЦИЯ + СВОЙСТВА)
// Интерфейс может описывать и функцию, и её свойства
interface LoggerHybrid {
    (message: string): void; // Сигнатура вызова
    level: "info" | "error"; // Свойство
}
const createLogger = (): LoggerHybrid => {
    const logger = ((msg: string) => console.log(`${logger.level}: ${msg}`)) as LoggerHybrid;
    logger.level = "info";
    return logger;
};
const logger: LoggerHybrid = createLogger();
logger("Mission started"); // "info: Mission started"
logger.level = "error";
logger("Mission failed"); // "error: Mission failed"

// 9. ПРАКТИЧЕСКИЙ ПРИМЕР С ФУНКЦИЯМИ В ИНТЕРФЕЙСАХ
// Сценарий: управление миссией агента
interface Target {
    name: string;
    eliminate(): string;
}

interface MissionOperations {
    code: string;
    start(this: MissionOperations): string; // Метод с this
    addTarget(target: string): Target;      // Метод возвращает объект
    getStatus?(): "pending" | "active";    // Опциональный метод
}

const missionOps: MissionOperations = {
    code: "GF",
    start: function() { return `${this.code} started`; },
    addTarget: (name) => ({ name, eliminate: () => `${name} eliminated` })
};
console.log(missionOps.start()); // "GF started"
const target = missionOps.addTarget("enemy1");
console.log(target.eliminate()); // "enemy1 eliminated"

// Расширение для полной миссии
interface AgentMission extends MissionOperations {
    agent: {
        name: string;
        report(this: { name: string }): string;
    };
}

const fullMission: AgentMission = {
    code: "GF",
    start: function() { return `${this.code} started`; },
    addTarget: (name) => ({ name, eliminate: () => `${name} eliminated` }),
    getStatus: () => "active",
    agent: {
        name: "James Bond",
        report: function() { return `${this.name} reporting`; }
    }
};
console.log(fullMission.agent.report()); // "James Bond reporting"
console.log(fullMission.getStatus?.()); // "active"

// 10. ОШИБКИ И ОГРАНИЧЕНИЯ
interface BadMethod {
    log(message: string): void;
}
const badImpl: BadMethod = {
    // log: (msg: number) => console.log(msg) // Ошибка: Type 'number' is not assignable to type 'string'
    log: (msg) => console.log(msg) // Корректно
};

// Итог: Функции в интерфейсах могут быть:
// - сигнатурами ((param: T): R)
// - методами (method(): R)
// - опциональными (method?(): R)
// - с this (method(this: Type): R)
// - обобщёнными (method<T>(param: T): R)
// - частью гибридных интерфейсов
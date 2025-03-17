// 038-интерфейсы-синтаксис-интерфейсов.ts

// Этот раздел объясняет синтаксис интерфейсов в TypeScript,
// включая базовые конструкции, опциональные свойства, readonly, наследование и другие элементы.

// 1. БАЗОВЫЙ СИНТАКСИС ИНТЕРФЕЙСА
// Интерфейс задаётся ключевым словом interface и описывает структуру объекта
interface Agent {
    id: number;          // Обязательное свойство
    name: string;        // Обязательное свойство
    active: boolean;     // Обязательное свойство
}
const bond: Agent = {
    id: 7,
    name: "James Bond",
    active: true
};
console.log(bond); // { id: 7, name: "James Bond", active: true }
// bond.id = "007"; // Ошибка: Type 'string' is not assignable to type 'number'

// 2. ОПЦИОНАЛЬНЫЕ СВОЙСТВА
// Свойства с "?" могут отсутствовать
interface Gadget {
    name: string;
    type?: "weapon" | "vehicle"; // Необязательное свойство (optional)
}
const gun: Gadget = { name: "Walther PPK" }; // Корректно без type
const car: Gadget = { name: "Aston Martin DB5", type: "vehicle" }; // Корректно с type
console.log(gun.type ?? "Unknown"); // "Unknown"

// 3. READONLY СВОЙСТВА
// Модификатор readonly делает свойство неизменяемым после инициализации
interface Mission {
    readonly code: string; // Только для чтения
    location: string;      // Изменяемое свойство
}
const mission: Mission = { code: "GF", location: "Switzerland" };
// mission.code = "SF"; // Ошибка: Cannot assign to 'code' because it is a read-only property
mission.location = "Shanghai"; // Корректно
console.log(mission); // { code: "GF", location: "Shanghai" }

// 4. ИНДЕКСНЫЕ ПОДПИСИ
// Синтаксис для объектов с динамическими ключами
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

// 5. НАСЛЕДОВАНИЕ ИНТЕРФЕЙСОВ (extends)
// Один интерфейс может расширять другой
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
console.log(spy.codename); // "007"

// 6. ИНТЕРФЕЙСЫ ДЛЯ ФУНКЦИЙ
// Синтаксис для описания сигнатуры функции
interface LogFunction {
    (message: string): void; // Параметр и возвращаемый тип
}
const log: LogFunction = (msg) => console.log(msg);
log("Mission started"); // "Mission started"

// Альтернативный синтаксис с методом
interface Logger {
    log(message: string): void;
}
const logger: Logger = {
    log: (msg) => console.log(msg)
};
logger.log("Agent reporting"); // "Agent reporting"

// 7. ВЛОЖЕННЫЕ ИНТЕРФЕЙСЫ
// Интерфейсы могут содержать другие интерфейсы или типы
interface Operation {
    agent: {
        id: number;
        name: string;
    };
    mission: {
        code: string;
        details: {
            location: string;
        };
    };
}
const op: Operation = {
    agent: { id: 7, name: "James Bond" },
    mission: { code: "GF", details: { location: "Switzerland" } }
};
console.log(op.mission.details.location); // "Switzerland"

// 8. GENERICS В ИНТЕРФЕЙСАХ
// Синтаксис с обобщёнными типами
interface Inventory<T> {
    items: T[];
    capacity: number;
}
const gadgetInventory: Inventory<string> = {
    items: ["Walther PPK", "Aston Martin DB5"],
    capacity: 5
};
console.log(gadgetInventory.items); // ["Walther PPK", "Aston Martin DB5"]

// Пример с объектом
interface Gadget {
    name: string;
}
const complexInventory: Inventory<Gadget> = {
    items: [{ name: "Walther PPK" }],
    capacity: 3
};
console.log(complexInventory.items[0].name); // "Walther PPK"

// 9. ГИБРИДНЫЕ ИНТЕРФЕЙСЫ
// Комбинация свойств и сигнатуры функции
interface Counter {
    (start: number): string; // Сигнатура вызова
    count: number;           // Свойство
}
const createCounter = (): Counter => {
    const counter = (start: number) => `Count from ${start}` as const;
    counter.count = 0;
    return counter;
};
const counter: Counter = createCounter();
counter.count = 5;
console.log(counter(10)); // "Count from 10"
console.log(counter.count); // 5

// 10. ПРАКТИЧЕСКИЙ ПРИМЕР С РАЗНЫМ СИНТАКСИСОМ
interface Target {
    name: string;
    priority: number;
}

interface MissionDetails {
    code: string;
    targets: Target[];
    log: (event: string) => void; // Метод
}

interface AgentMission {
    readonly id: string;
    agent: {
        name: string;
        skills: { [skill: string]: number };
    };
    mission: MissionDetails;
}

const mission007: AgentMission = {
    id: "M007",
    agent: {
        name: "James Bond",
        skills: { stealth: 90, combat: 85 }
    },
    mission: {
        code: "GF",
        targets: [{ name: "enemy1", priority: 1 }],
        log: (event) => console.log(`Log: ${event}`)
    }
};
// mission007.id = "M008"; // Ошибка: Cannot assign to 'id' because it is a read-only property
mission007.mission.log("Started"); // "Log: Started"
console.log(mission007.mission.targets[0].name); // "enemy1"

// Итог: Синтаксис интерфейсов включает:
// - базовые свойства (id: number)
// - опциональные свойства (type?: string)
// - readonly свойства (readonly code: string)
// - индексные подписи ([key: string]: number)
// - наследование (extends)
// - сигнатуры функций ((param: T): R)
// - вложенные структуры
// - generics (<T>)
// 047-создание-функциональности-при-помощи-классов-где-используются-классы.ts

// Этот раздел объясняет, в каких сценариях и областях разработки классы в TypeScript наиболее полезны,
// включая моделирование сущностей, управление состоянием, реализацию паттернов и организацию кода.

// 1. МОДЕЛИРОВАНИЕ СУЩНОСТЕЙ РЕАЛЬНОГО МИРА
// Классы идеальны для представления объектов с данными и поведением
class Agent {
    constructor(public name: string, private id: number) {}

    getCode(): string {
        return `Agent-${this.id}`;
    }

    report(): string {
        return `${this.name} reporting`;
    }
}

const bond = new Agent("James Bond", 7);
console.log(bond.getCode()); // "Agent-7"
console.log(bond.report()); // "James Bond reporting"
// Где используется: моделирование пользователей, сотрудников, предметов (например, в CRM, играх)

// 2. УПРАВЛЕНИЕ СОСТОЯНИЕМ
// Классы хранят и управляют состоянием через поля и методы
class Mission {
    private targets: string[] = [];
    public status: "pending" | "active" | "completed" = "pending";

    constructor(public code: string) {}

    addTarget(target: string): void {
        this.targets.push(target);
    }

    complete(): void {
        this.status = "completed";
    }

    brief(): string {
        return `${this.code}: ${this.status}, Targets: ${this.targets.length}`;
    }
}

const missionGF = new Mission("GF");
missionGF.addTarget("enemy1");
console.log(missionGF.brief()); // "GF: pending, Targets: 1"
missionGF.complete();
console.log(missionGF.brief()); // "GF: completed, Targets: 1"
// Где используется: управление задачами, игровыми состояниями, процессами (например, в TODO-приложениях)

// 3. НАСЛЕДОВАНИЕ ДЛЯ ИЕРАРХИЙ
// Классы позволяют строить иерархии сущностей
class Vehicle {
    constructor(public name: string) {}

    move(): string {
        return `${this.name} moving`;
    }
}

class SpyCar extends Vehicle {
    constructor(name: string, private gadgets: string[]) {
        super(name);
    }

    deployGadget(gadget: string): string {
        return `${this.name} deploying ${gadget}`;
    }
}

const astonMartin = new SpyCar("Aston Martin DB5", ["Smoke Screen"]);
console.log(astonMartin.move()); // "Aston Martin DB5 moving"
console.log(astonMartin.deployGadget("Smoke Screen")); // "Aston Martin DB5 deploying Smoke Screen"
// Где используется: моделирование транспортных средств, животных, ролей пользователей (например, в симуляциях)

// 4. РЕАЛИЗАЦИЯ ПАТТЕРНОВ ПРОЕКТИРОВАНИЯ
// Классы удобны для паттернов, таких как Singleton, Factory
class MissionControl {
    private static instance: MissionControl;

    private constructor() {}

    static getInstance(): MissionControl {
        if (!MissionControl.instance) {
            MissionControl.instance = new MissionControl();
        }
        return MissionControl.instance;
    }

    assignMission(code: string): string {
        return `Mission ${code} assigned`;
    }
}

const control1 = MissionControl.getInstance();
const control2 = MissionControl.getInstance();
console.log(control1 === control2); // true (один и тот же экземпляр)
console.log(control1.assignMission("GF")); // "Mission GF assigned"
// Где используется: управление ресурсами, логирование, фабрики объектов (например, в веб-приложениях)

// 5. ОРГАНИЗАЦИЯ КОДА И МОДУЛЬНОСТЬ
// Классы группируют связанную логику
class Inventory {
    private items: string[] = [];

    addItem(item: string): void {
        this.items.push(item);
    }

    listItems(): string {
        return this.items.join(", ") || "Empty";
    }
}

class SpyAgent {
    constructor(public name: string, private inventory: Inventory) {}

    equip(item: string): void {
        this.inventory.addItem(item);
    }

    brief(): string {
        return `${this.name} equipped with ${this.inventory.listItems()}`;
    }
}

const inventory = new Inventory();
const spyBond = new SpyAgent("James Bond", inventory);
spyBond.equip("Walther PPK");
console.log(spyBond.brief()); // "James Bond equipped with Walther PPK"
// Где используется: модули в больших проектах, компоненты UI, сервисы (например, в Angular)

// 6. РАБОТА С ИНТЕРФЕЙСАМИ
// Классы реализуют интерфейсы для стандартизации поведения
interface Operative {
    execute(): string;
}

class FieldAgent implements Operative {
    constructor(private name: string, private mission: string) {}

    execute(): string {
        return `${this.name} executing ${this.mission}`;
    }
}

const fieldBond = new FieldAgent("James Bond", "GF");
console.log(fieldBond.execute()); // "James Bond executing GF"
// Где используется: плагины, модули с общим API, фреймворки (например, в плагинах VS Code)

// 7. УПРАВЛЕНИЕ СОБЫТИЯМИ И АСИНХРОННОСТЬЮ
// Классы организуют обработку событий и асинхронных операций
class EventManager {
    private events: Map<string, (() => void)[]> = new Map();

    on(event: string, callback: () => void): void {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event)!.push(callback);
    }

    trigger(event: string): void {
        this.events.get(event)?.forEach(callback => callback());
    }
}

const manager = new EventManager();
manager.on("missionStart", () => console.log("Mission started"));
manager.trigger("missionStart"); // "Mission started"
// Где используется: системы событий, асинхронные очереди, игры (например, в Node.js)

// 8. ПРАКТИЧЕСКИЙ ПРИМЕР: КОМПЛЕКСНОЕ ИСПОЛЬЗОВАНИЕ
// Сценарий: управление миссией агента
class BaseAgent {
    constructor(public name: string) {}

    report(): string {
        return `${this.name} reporting`;
    }
}

class SpyOperative extends BaseAgent implements Operative {
    private gadgets: string[] = [];

    constructor(name: string, private missionCode: string) {
        super(name);
    }

    addGadget(gadget: string): void {
        this.gadgets.push(gadget);
    }

    execute(): string {
        return `${this.name} on ${this.missionCode} with ${this.gadgets.join(", ") || "no gadgets"}`;
    }
}

class MissionManager {
    static instance: MissionManager;
    private operatives: SpyOperative[] = [];

    private constructor() {}

    static getInstance(): MissionManager {
        if (!MissionManager.instance) {
            MissionManager.instance = new MissionManager();
        }
        return MissionManager.instance;
    }

    deploy(operative: SpyOperative): string {
        this.operatives.push(operative);
        return operative.execute();
    }
}

const spy007 = new SpyOperative("James Bond", "GF");
spy007.addGadget("Walther PPK");
const managerInstance = MissionManager.getInstance();
console.log(managerInstance.deploy(spy007)); 
// "James Bond on GF with Walther PPK"

// Где используется этот пример:
// - моделирование агента (сущность)
// - управление состоянием (гаджеты, миссия)
// - паттерн Singleton (MissionManager)
// - организация кода (разделение логики)

// Итог: Классы используются в TypeScript для:
// - моделирования сущностей (объекты реального мира)
// - управления состоянием (данные и их изменения)
// - создания иерархий (наследование)
// - реализации паттернов (Singleton, Factory)
// - организации кода (модульность)
// - работы с интерфейсами (контракты)
// - обработки событий и асинхронности
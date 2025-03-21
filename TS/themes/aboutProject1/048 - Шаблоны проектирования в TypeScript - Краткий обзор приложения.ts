// 048-шаблоны-проектирования-в-typescript-краткий-обзор-приложения.ts

// Этот раздел представляет краткий обзор популярных шаблонов проектирования в TypeScript,
// включая их применение в реальных сценариях с примерами кода.

// 1. SINGLETON (ОДИНОЧКА)
// Обеспечивает единственный экземпляр класса
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
console.log(control1 === control2); // true
console.log(control1.assignMission("GF")); // "Mission GF assigned"
// Применение: управление глобальными ресурсами (например, логгер, конфигурация)

// 2. FACTORY (ФАБРИКА)
// Создаёт объекты без явного указания их классов
interface Gadget {
    use(): string;
}

class Weapon implements Gadget {
    constructor(private name: string) {}
    use(): string { return `${this.name} fired`; }
}

class Vehicle implements Gadget {
    constructor(private name: string) {}
    use(): string { return `${this.name} driven`; }
}

class GadgetFactory {
    static createGadget(type: "weapon" | "vehicle", name: string): Gadget {
        switch (type) {
            case "weapon": return new Weapon(name);
            case "vehicle": return new Vehicle(name);
            default: throw new Error("Unknown gadget type");
        }
    }
}

const gun = GadgetFactory.createGadget("weapon", "Walther PPK");
const car = GadgetFactory.createGadget("vehicle", "Aston Martin DB5");
console.log(gun.use()); // "Walther PPK fired"
console.log(car.use()); // "Aston Martin DB5 driven"
// Применение: создание объектов с общей логикой (например, UI-компоненты, игровые сущности)

// 3. OBSERVER (НАБЛЮДАТЕЛЬ)
// Устанавливает зависимость "один-ко-многим" для уведомлений
class Mission {
    private observers: ((status: string) => void)[] = [];

    constructor(private code: string) {}

    subscribe(observer: (status: string) => void): void {
        this.observers.push(observer);
    }

    notify(status: string): void {
        this.observers.forEach(observer => observer(status));
    }

    complete(): void {
        this.notify(`Mission ${this.code} completed`);
    }
}

const missionGF = new Mission("GF");
missionGF.subscribe(status => console.log(`Agent notified: ${status}`));
missionGF.subscribe(status => console.log(`HQ notified: ${status}`));
missionGF.complete();
// "Agent notified: Mission GF completed"
// "HQ notified: Mission GF completed"
// Применение: системы событий, обновление UI (например, в веб-приложениях)

// 4. DECORATOR (ДЕКОРАТОР)
// Динамически добавляет функциональность объектам
interface Agent {
    report(): string;
}

class BaseAgent implements Agent {
    constructor(private name: string) {}
    report(): string { return `${this.name} reporting`; }
}

class SkilledAgent implements Agent {
    constructor(private agent: Agent, private skill: string) {}
    report(): string { return `${this.agent.report()} with ${this.skill}`; }
}

const bond = new BaseAgent("James Bond");
const skilledBond = new SkilledAgent(bond, "stealth");
console.log(bond.report()); // "James Bond reporting"
console.log(skilledBond.report()); // "James Bond reporting with stealth"
// Применение: расширение функциональности (например, логирование, авторизация)

// 5. STRATEGY (СТРАТЕГИЯ)
// Позволяет выбирать алгоритм поведения во время выполнения
interface AttackStrategy {
    attack(): string;
}

class GunAttack implements AttackStrategy {
    attack(): string { return "Firing gun"; }
}

class StealthAttack implements AttackStrategy {
    attack(): string { return "Silent takedown"; }
}

class Spy {
    constructor(private strategy: AttackStrategy) {}

    executeAttack(): string {
        return this.strategy.attack();
    }

    setStrategy(strategy: AttackStrategy): void {
        this.strategy = strategy;
    }
}

const spy007 = new Spy(new GunAttack());
console.log(spy007.executeAttack()); // "Firing gun"
spy007.setStrategy(new StealthAttack());
console.log(spy007.executeAttack()); // "Silent takedown"
// Применение: переключение алгоритмов (например, сортировка, рендеринг)

// 6. ПРАКТИЧЕСКИЙ ПРИМЕР: КОМБИНАЦИЯ ШАБЛОНОВ
// Сценарий: управление миссией агента
class AgentControl { // Singleton
    private static instance: AgentControl;
    private constructor() {}

    static getInstance(): AgentControl {
        if (!AgentControl.instance) {
            AgentControl.instance = new AgentControl();
        }
        return AgentControl.instance;
    }

    deployAgent(name: string): string {
        return `${name} deployed`;
    }
}

interface Weapon { // Для Factory
    fire(): string;
}

class Pistol implements Weapon {
    fire(): string { return "Pistol shot"; }
}

class Rifle implements Weapon {
    fire(): string { return "Rifle burst"; }
}

class WeaponFactory { // Factory
    static createWeapon(type: "pistol" | "rifle"): Weapon {
        switch (type) {
            case "pistol": return new Pistol();
            case "rifle": return new Rifle();
            default: throw new Error("Unknown weapon");
        }
    }
}

class MissionAgent { // Observer + Strategy
    private observers: ((update: string) => void)[] = [];
    private weapon: Weapon;

    constructor(private name: string) {
        this.weapon = WeaponFactory.createWeapon("pistol"); // Используем фабрику
    }

    subscribe(observer: (update: string) => void): void {
        this.observers.push(observer);
    }

    notify(update: string): void {
        this.observers.forEach(observer => observer(update));
    }

    attack(): string {
        const result = this.weapon.fire();
        this.notify(`${this.name} attacked with ${result}`);
        return result;
    }

    switchWeapon(type: "pistol" | "rifle"): void {
        this.weapon = WeaponFactory.createWeapon(type); // Стратегия через фабрику
    }
}

const control = AgentControl.getInstance();
console.log(control.deployAgent("James Bond")); // "James Bond deployed"

const agent007 = new MissionAgent("James Bond");
agent007.subscribe(update => console.log(`HQ: ${update}`));
console.log(agent007.attack()); // "Pistol shot"
// "HQ: James Bond attacked with Pistol shot"
agent007.switchWeapon("rifle");
console.log(agent007.attack()); // "Rifle burst"
// "HQ: James Bond attacked with Rifle burst"

// Итог: Шаблоны проектирования в TypeScript применяются для:
// - Singleton: глобальный доступ (управление ресурсами)
// - Factory: создание объектов (гибкость типов)
// - Observer: уведомления (события, обновления)
// - Decorator: расширение (дополнительная логика)
// - Strategy: выбор поведения (сменные алгоритмы)
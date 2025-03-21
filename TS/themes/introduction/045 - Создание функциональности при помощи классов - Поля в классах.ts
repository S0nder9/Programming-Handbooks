// 045-создание-функциональности-при-помощи-классов-поля-в-классах.ts

// Этот раздел объясняет, как поля (свойства) в классах TypeScript используются для хранения данных
// и создания функциональности, включая модификаторы доступа, инициализацию и геттеры/сеттеры.

// 1. БАЗОВЫЕ ПОЛЯ В КЛАССАХ
// Поля определяют состояние объекта
class Agent {
    name: string; // Поле без инициализации
    id: number;   // Поле без инициализации

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }

    getInfo(): string {
        return `${this.name} (ID: ${this.id})`;
    }
}

const bond = new Agent("James Bond", 7);
console.log(bond.getInfo()); // "James Bond (ID: 7)"
console.log(bond.name); // "James Bond"

// 2. ИНИЦИАЛИЗАЦИЯ ПОЛЕЙ ПРИ ОБЪЯВЛЕНИИ
// Поля можно инициализировать сразу
class Spy {
    name: string = "Unknown"; // Значение по умолчанию
    id: number = 0;

    constructor(name?: string, id?: number) {
        if (name) this.name = name;
        if (id) this.id = id;
    }
}

const defaultSpy = new Spy();
console.log(defaultSpy.name, defaultSpy.id); // "Unknown 0"
const spyBond = new Spy("James Bond", 7);
console.log(spyBond.name, spyBond.id); // "James Bond 7"

// 3. МОДИФИКАТОРЫ ДОСТУПА ДЛЯ ПОЛЕЙ
// public, private, protected управляют доступом
class SecretAgent {
    public name: string;         // Доступно везде
    private codename: string;    // Доступно только внутри класса
    protected rank: string;      // Доступно в классе и подклассах

    constructor(name: string, codename: string, rank: string) {
        this.name = name;
        this.codename = codename;
        this.rank = rank;
    }

    getDetails(): string {
        return `${this.name}, ${this.codename}, ${this.rank}`;
    }
}

const secretBond = new SecretAgent("James Bond", "007", "Commander");
console.log(secretBond.name); // "James Bond"
// console.log(secretBond.codename); // Ошибка: Property 'codename' is private
console.log(secretBond.getDetails()); // "James Bond, 007, Commander"

// 4. СОКРАЩЁННЫЙ СИНТАКСИС ПОЛЕЙ В КОНСТРУКТОРЕ
// Автоматическое создание полей через параметры
class Gadget {
    constructor(
        public name: string,
        private type: "weapon" | "vehicle",
        protected power: number = 0
    ) {}

    use(): string {
        return `${this.name} (${this.type}, Power: ${this.power})`;
    }
}

const gun = new Gadget("Walther PPK", "weapon", 50);
console.log(gun.name); // "Walther PPK"
// console.log(gun.type); // Ошибка: Property 'type' is private
console.log(gun.use()); // "Walther PPK (weapon, Power: 50)"

// 5. READONLY ПОЛЯ
// Поля, которые нельзя изменить после инициализации
class Mission {
    readonly code: string;
    location: string;

    constructor(code: string, location: string) {
        this.code = code;
        this.location = location;
    }

    brief(): string {
        return `${this.code} in ${this.location}`;
    }
}

const missionGF = new Mission("GF", "Switzerland");
console.log(missionGF.brief()); // "GF in Switzerland"
// missionGF.code = "SF"; // Ошибка: Cannot assign to 'code' because it is a read-only property
missionGF.location = "Shanghai"; // Корректно
console.log(missionGF.brief()); // "GF in Shanghai"

// 6. СТАТИЧЕСКИЕ ПОЛЯ (STATIC)
// Поля, общие для всех экземпляров класса
class MissionControl {
    static missionCount: number = 0;
    code: string;

    constructor(code: string) {
        this.code = code;
        MissionControl.missionCount++;
    }
}

const mission1 = new MissionControl("GF");
const mission2 = new MissionControl("SF");
console.log(MissionControl.missionCount); // 2
console.log(mission1.code); // "GF"
// mission1.missionCount; // Ошибка: Property 'missionCount' is static

// 7. ГЕТТЕРЫ И СЕТТЕРЫ ДЛЯ ПОЛЕЙ
// Управление доступом к полям через аксессоры
class SecureAgent {
    private _codename: string;

    constructor(codename: string) {
        this._codename = codename;
    }

    get codename(): string {
        return this._codename;
    }

    set codename(value: string) {
        if (value.length >= 3) {
            this._codename = value;
        } else {
            throw new Error("Codename must be at least 3 characters");
        }
    }
}

const secureBond = new SecureAgent("007");
console.log(secureBond.codename); // "007"
secureBond.codename = "008"; // Корректно
console.log(secureBond.codename); // "008"
// secureBond.codename = "00"; // Ошибка: Codename must be at least 3 characters

// 8. ПОЛЯ В НАСЛЕДОВАНИИ
// Поля родителя наследуются подклассом
class BaseSpy {
    protected gadgets: string[] = [];

    addGadget(gadget: string): void {
        this.gadgets.push(gadget);
    }
}

class EliteSpy extends BaseSpy {
    constructor(private codename: string) {
        super();
    }

    listGadgets(): string {
        return `${this.codename}: ${this.gadgets.join(", ")}`;
    }
}

const elite007 = new EliteSpy("007");
elite007.addGadget("Walther PPK");
console.log(elite007.listGadgets()); // "007: Walther PPK"

// 9. ПРАКТИЧЕСКИЙ ПРИМЕР С ПОЛЯМИ
// Сценарий: агент с функциональностью на основе полей
class FieldAgent {
    private targets: string[] = [];
    readonly missionCode: string;
    public static activeAgents: number = 0;

    constructor(public name: string, missionCode: string) {
        this.missionCode = missionCode;
        FieldAgent.activeAgents++;
    }

    private getTargetCount(): number {
        return this.targets.length;
    }

    public addTarget(target: string): void {
        this.targets.push(target);
    }

    public brief(): string {
        return `${this.name} on ${this.missionCode}, Targets: ${this.getTargetCount()}`;
    }
}

const fieldBond = new FieldAgent("James Bond", "GF");
fieldBond.addTarget("enemy1");
console.log(fieldBond.brief()); // "James Bond on GF, Targets: 1"
console.log(FieldAgent.activeAgents); // 1
// fieldBond.targets; // Ошибка: Property 'targets' is private

// 10. ОШИБКИ И ОГРАНИЧЕНИЯ
// Неинициализированные поля без строгой проверки
class LooseAgent {
    name: string; // Без инициализации
    // constructor() {} // Ошибка в strict mode: Property 'name' has no initializer
}

// Попытка изменить readonly поле
const mission = new Mission("GF", "Switzerland");
// mission.code = "SF"; // Ошибка: Cannot assign to 'code' because it is a read-only property

// Итог: Поля в классах обеспечивают функциональность через:
// - хранение данных (public, private, protected)
// - инициализацию (при объявлении или в конструкторе)
// - защиту (readonly, private)
// - общие данные (static)
// - контролируемый доступ (getters/setters)
// - наследование
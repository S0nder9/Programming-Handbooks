// 044-создание-функциональности-при-помощи-классов-модификаторы-методов-объекта.ts

// Этот раздел объясняет, как модификаторы доступа (public, private, protected) и другие ключевые слова
// (static, abstract) применяются к методам классов в TypeScript для управления функциональностью.

// 1. МОДИФИКАТОР PUBLIC
// Метод с модификатором public доступен везде (по умолчанию)
class Agent {
    constructor(public name: string) {}

    public greet(): string {
        return `Hello, I'm ${this.name}`;
    }
}

const bond = new Agent("James Bond");
console.log(bond.greet()); // "Hello, I'm James Bond"
// Public методы доступны снаружи класса без ограничений

// 2. МОДИФИКАТОР PRIVATE
// Метод с модификатором private доступен только внутри класса
class Spy {
    constructor(private codename: string) {}

    private revealCode(): string {
        return `Codename: ${this.codename}`;
    }

    public getInfo(): string {
        return this.revealCode(); // Доступ к private методу внутри класса
    }
}

const spyBond = new Spy("007");
console.log(spyBond.getInfo()); // "Codename: 007"
// spyBond.revealCode(); // Ошибка: Property 'revealCode' is private and only accessible within class 'Spy'

// 3. МОДИФИКАТОР PROTECTED
// Метод с модификатором protected доступен внутри класса и в подклассах
class BaseAgent {
    constructor(protected rank: string) {}

    protected getRank(): string {
        return `Rank: ${this.rank}`;
    }

    public report(): string {
        return this.getRank();
    }
}

class EliteAgent extends BaseAgent {
    constructor(rank: string, public name: string) {
        super(rank);
    }

    public getDetails(): string {
        return `${this.name}, ${this.getRank()}`; // Доступ к protected методу
    }
}

const eliteBond = new EliteAgent("Commander", "James Bond");
console.log(eliteBond.getDetails()); // "James Bond, Rank: Commander"
console.log(eliteBond.report()); // "Rank: Commander"
// eliteBond.getRank(); // Ошибка: Property 'getRank' is protected and only accessible within class 'BaseAgent' and its subclasses

// 4. СТАТИЧЕСКИЕ МЕТОДЫ (STATIC)
// Метод с модификатором static принадлежит классу, а не экземпляру
class MissionControl {
    private static activeMissions: number = 0;

    constructor(public code: string) {
        MissionControl.activeMissions++;
    }

    static getMissionCount(): number {
        return MissionControl.activeMissions;
    }

    public getCode(): string {
        return this.code;
    }
}

const mission1 = new MissionControl("GF");
const mission2 = new MissionControl("SF");
console.log(MissionControl.getMissionCount()); // 2
console.log(mission1.getCode()); // "GF"
// mission1.getMissionCount(); // Ошибка: Property 'getMissionCount' is static

// 5. АБСТРАКТНЫЕ МЕТОДЫ (ABSTRACT)
// Метод с модификатором abstract определяет контракт, который подклассы должны реализовать
abstract class Operative {
    constructor(public name: string) {}

    abstract executeMission(): string; // Абстрактный метод без реализации

    public greet(): string {
        return `Hello from ${this.name}`;
    }
}

class FieldOperative extends Operative {
    constructor(name: string, private mission: string) {
        super(name);
    }

    executeMission(): string {
        return `${this.name} executing ${this.mission}`;
    }
}

// const op = new Operative("Bond"); // Ошибка: Cannot create an instance of an abstract class
const fieldBond = new FieldOperative("James Bond", "GF");
console.log(fieldBond.executeMission()); // "James Bond executing GF"
console.log(fieldBond.greet()); // "Hello from James Bond"

// 6. КОМБИНИРОВАНИЕ МОДИФИКАТОРОВ
// Пример класса с разными модификаторами методов
class SecretSpy {
    constructor(private codename: string, protected clearance: string) {}

    private decodeMessage(msg: string): string {
        return `Decoded: ${msg}`;
    }

    protected brief(): string {
        return `${this.codename} briefed with ${this.clearance}`;
    }

    public operate(): string {
        return this.decodeMessage("Target located") + " - " + this.brief();
    }

    static createSpy(codename: string, clearance: string): SecretSpy {
        return new SecretSpy(codename, clearance);
    }
}

class EliteSpy extends SecretSpy {
    constructor(codename: string, clearance: string, public name: string) {
        super(codename, clearance);
    }

    public getBriefing(): string {
        return `${this.name}: ${this.brief()}`; // Доступ к protected методу
    }
}

const elite007 = SecretSpy.createSpy("007", "Top Secret");
console.log(elite007.operate()); // "Decoded: Target located - 007 briefed with Top Secret"
const eliteBond = new EliteSpy("007", "Top Secret", "James Bond");
console.log(eliteBond.getBriefing()); // "James Bond: 007 briefed with Top Secret"

// 7. ПРАКТИЧЕСКИЙ ПРИМЕР С МОДИФИКАТОРАМИ
// Сценарий: управление миссией агента с разными уровнями доступа
abstract class MissionAgent {
    constructor(protected name: string, private missionCode: string) {}

    protected logActivity(activity: string): string {
        return `${this.name} - ${activity} on ${this.missionCode}`;
    }

    abstract deploy(): string;

    public static createAgent(name: string, missionCode: string): MissionAgent {
        return new FieldAgent(name, missionCode);
    }
}

class FieldAgent extends MissionAgent {
    private gadgets: string[] = [];

    constructor(name: string, missionCode: string) {
        super(name, missionCode);
    }

    public addGadget(gadget: string): void {
        this.gadgets.push(gadget);
    }

    deploy(): string {
        const gadgetList = this.gadgets.length ? `with ${this.gadgets.join(", ")}` : "without gadgets";
        return this.logActivity(`Deployed ${gadgetList}`);
    }
}

const agent007 = MissionAgent.createAgent("James Bond", "GF") as FieldAgent;
agent007.addGadget("Walther PPK");
console.log(agent007.deploy()); // "James Bond - Deployed with Walther PPK on GF"

// 8. ОШИБКИ И ОГРАНИЧЕНИЯ
// Нельзя напрямую вызывать private методы снаружи
class Restricted {
    private restrictedMethod(): string {
        return "Restricted";
    }
}
const restricted = new Restricted();
// restricted.restrictedMethod(); // Ошибка: Property 'restrictedMethod' is private

// Нельзя переопределять static методы как обычные
class Base {
    static getInfo(): string {
        return "Base info";
    }
}
class Derived extends Base {
    // getInfo(): string { return "Derived info"; } // Ошибка: 'getInfo' is static in 'Base'
    static getInfo(): string {
        return "Derived info";
    }
}

// Итог: Модификаторы методов объекта в классах:
// - public: доступ везде
// - private: только внутри класса
// - protected: в классе и подклассах
// - static: принадлежит классу
// - abstract: требует реализации в подклассах
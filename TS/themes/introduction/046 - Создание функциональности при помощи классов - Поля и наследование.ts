// 046-создание-функциональности-при-помощи-классов-поля-и-наследование.ts

// Этот раздел объясняет, как поля в классах взаимодействуют с наследованием в TypeScript,
// включая доступ к полям родителя, их модификацию и расширение функциональности.

// 1. НАСЛЕДОВАНИЕ ПОЛЕЙ
// Поля родительского класса автоматически наследуются подклассом
class Agent {
    name: string; // Поле доступно в подклассах
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }

    getInfo(): string {
        return `${this.name} (ID: ${this.id})`;
    }
}

class Spy extends Agent {
    constructor(name: string, id: number) {
        super(name, id); // Инициализация полей родителя
    }
}

const spyBond = new Spy("James Bond", 7);
console.log(spyBond.name); // "James Bond"
console.log(spyBond.getInfo()); // "James Bond (ID: 7)"

// 2. МОДИФИКАТОРЫ ДОСТУПА И НАСЛЕДОВАНИЕ
// public, private, protected влияют на доступ к полям в подклассах
class BaseAgent {
    public rank: string;         // Доступно везде
    private secret: string;      // Доступно только в BaseAgent
    protected clearance: string; // Доступно в классе и подклассах

    constructor(rank: string, secret: string, clearance: string) {
        this.rank = rank;
        this.secret = secret;
        this.clearance = clearance;
    }

    getSecret(): string {
        return this.secret; // private поле доступно внутри класса
    }
}

class EliteAgent extends BaseAgent {
    constructor(rank: string, secret: string, clearance: string, public codename: string) {
        super(rank, secret, clearance);
    }

    getDetails(): string {
        return `${this.codename}, ${this.rank}, ${this.clearance}`;
        // this.secret; // Ошибка: Property 'secret' is private and only accessible within class 'BaseAgent'
    }
}

const eliteBond = new EliteAgent("Commander", "Classified", "Top Secret", "007");
console.log(eliteBond.rank); // "Commander"
console.log(eliteBond.codename); // "007"
// console.log(eliteBond.secret); // Ошибка: Property 'secret' is private
console.log(eliteBond.getDetails()); // "007, Commander, Top Secret"
console.log(eliteBond.getSecret()); // "Classified"

// 3. ИНИЦИАЛИЗАЦИЯ НАСЛЕДУЕМЫХ ПОЛЕЙ
// Подкласс может дополнять или использовать поля родителя
class Operative {
    protected gadgets: string[] = []; // Инициализация в родителе

    constructor(public name: string) {}

    addGadget(gadget: string): void {
        this.gadgets.push(gadget);
    }
}

class FieldOperative extends Operative {
    constructor(name: string, private mission: string) {
        super(name);
    }

    brief(): string {
        return `${this.name} on ${this.mission} with ${this.gadgets.join(", ") || "no gadgets"}`;
    }
}

const fieldBond = new FieldOperative("James Bond", "GF");
fieldBond.addGadget("Walther PPK");
console.log(fieldBond.brief()); // "James Bond on GF with Walther PPK"

// 4. ПЕРЕОПРЕДЕЛЕНИЕ ПОЛЕЙ (SHADOWING)
// Подкласс может объявить поле с тем же именем, перекрывая родительское
class BaseSpy {
    protected status: string = "inactive";

    getStatus(): string {
        return this.status;
    }
}

class ActiveSpy extends BaseSpy {
    protected status: string = "active"; // Перекрывает поле родителя

    report(): string {
        return `Status: ${this.status}`;
    }
}

const activeBond = new ActiveSpy();
console.log(activeBond.getStatus()); // "active"
console.log(activeBond.report()); // "Status: active"

// 5. READONLY ПОЛЯ И НАСЛЕДОВАНИЕ
// Readonly поля остаются неизменяемыми в подклассах
class Mission {
    readonly code: string;

    constructor(code: string) {
        this.code = code;
    }
}

class DetailedMission extends Mission {
    constructor(code: string, public location: string) {
        super(code);
    }

    brief(): string {
        return `${this.code} in ${this.location}`;
    }
}

const missionGF = new DetailedMission("GF", "Switzerland");
console.log(missionGF.brief()); // "GF in Switzerland"
// missionGF.code = "SF"; // Ошибка: Cannot assign to 'code' because it is a read-only property

// 6. СТАТИЧЕСКИЕ ПОЛЯ И НАСЛЕДОВАНИЕ
// Статические поля принадлежат классу, но доступны через подкласс
class MissionControl {
    static activeMissions: number = 0;

    constructor(public code: string) {
        MissionControl.activeMissions++;
    }
}

class SpyMissionControl extends MissionControl {
    constructor(code: string, public spyCount: number) {
        super(code);
    }
}

const mission1 = new SpyMissionControl("GF", 2);
const mission2 = new SpyMissionControl("SF", 1);
console.log(SpyMissionControl.activeMissions); // 2
console.log(MissionControl.activeMissions); // 2 (одно и то же поле)

// 7. ПРАКТИЧЕСКИЙ ПРИМЕР С ПОЛЯМИ И НАСЛЕДОВАНИЕМ
// Сценарий: агент с миссией и гаджетами
class BaseFieldAgent {
    protected targets: string[] = [];
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    addTarget(target: string): void {
        this.targets.push(target);
    }
}

class GadgetAgent extends BaseFieldAgent {
    private gadgets: string[] = [];

    constructor(name: string, private missionCode: string) {
        super(name);
    }

    addGadget(gadget: string): void {
        this.gadgets.push(gadget);
    }

    brief(): string {
        return `${this.name} on ${this.missionCode}, Targets: ${this.targets.length}, Gadgets: ${this.gadgets.join(", ") || "none"}`;
    }
}

class EliteGadgetAgent extends GadgetAgent {
    readonly clearance: string;

    constructor(name: string, missionCode: string, clearance: string) {
        super(name, missionCode);
        this.clearance = clearance;
    }

    secureBrief(): string {
        return `${this.brief()}, Clearance: ${this.clearance}`;
    }
}

const elite007 = new EliteGadgetAgent("James Bond", "GF", "Top Secret");
elite007.addTarget("enemy1");
elite007.addGadget("Walther PPK");
console.log(elite007.brief()); // "James Bond on GF, Targets: 1, Gadgets: Walther PPK"
console.log(elite007.secureBrief()); // "James Bond on GF, Targets: 1, Gadgets: Walther PPK, Clearance: Top Secret"

// 8. ОШИБКИ И ОГРАНИЧЕНИЯ
// Доступ к private полю родителя
class BaseWithPrivate {
    private info: string = "secret";
}

class Derived extends BaseWithPrivate {
    // getInfo() { return this.info; } // Ошибка: Property 'info' is private
}

// Изменение readonly поля в подклассе
class BaseWithReadonly {
    readonly code: string = "BASE";
}

class DerivedWithReadonly extends BaseWithReadonly {
    // constructor() { super(); this.code = "DERIVED"; } // Ошибка: Cannot assign to 'code' because it is a read-only property
}

// Итог: Поля и наследование в классах:
// - наследуются автоматически (public, protected)
// - private поля недоступны подклассам
// - подклассы могут перекрывать поля (shadowing)
// - readonly сохраняет неизменяемость
// - static поля общие для иерархии
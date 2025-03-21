// 043-создание-функциональности-при-помощи-классов-основы-наследования.ts

// Этот раздел объясняет основы наследования в TypeScript,
// включая синтаксис extends, переопределение методов и использование модификаторов доступа.

// 1. БАЗОВЫЙ СИНТАКСИС НАСЛЕДОВАНИЯ
// Наследование позволяет одному классу (подклассу) унаследовать свойства и методы другого (родительского)
class Agent {
    constructor(public name: string, public id: number) {}

    getCode(): string {
        return `Agent-${this.id}`;
    }

    report(): string {
        return `${this.name} reporting`;
    }
}

class Spy extends Agent {
    // Подкласс автоматически наследует name, id и методы
    constructor(name: string, id: number) {
        super(name, id); // Вызов конструктора родителя
    }
}

const bond = new Spy("James Bond", 7);
console.log(bond.getCode()); // "Agent-7"
console.log(bond.report()); // "James Bond reporting"

// 2. ДОБАВЛЕНИЕ НОВОЙ ФУНКЦИОНАЛЬНОСТИ В ПОДКЛАССЕ
// Подкласс может расширять функциональность родителя
class FieldSpy extends Agent {
    constructor(name: string, id: number, public skills: { stealth: number }) {
        super(name, id);
    }

    infiltrate(): string {
        return `${this.name} infiltrating with stealth ${this.skills.stealth}`;
    }
}

const fieldBond = new FieldSpy("James Bond", 7, { stealth: 90 });
console.log(fieldBond.getCode()); // "Agent-7"
console.log(fieldBond.infiltrate()); // "James Bond infiltrating with stealth 90"

// 3. ПЕРЕОПРЕДЕЛЕНИЕ МЕТОДОВ (OVERRIDING)
// Подкласс может изменить поведение унаследованного метода
class SecretAgent extends Agent {
    constructor(name: string, id: number, private codename: string) {
        super(name, id);
    }

    // Переопределяем метод getCode
    getCode(): string {
        return this.codename; // Заменяем логику родителя
    }

    report(): string {
        return `${this.name} (Code: ${this.getCode()}) reporting`;
    }
}

const secretBond = new SecretAgent("James Bond", 7, "007");
console.log(secretBond.getCode()); // "007"
console.log(secretBond.report()); // "James Bond (Code: 007) reporting"

// 4. МОДИФИКАТОРЫ ДОСТУПА И НАСЛЕДОВАНИЕ
// private, protected и public влияют на доступ в подклассах
class BaseAgent {
    public name: string;         // Доступно везде
    private secret: string;      // Доступно только в BaseAgent
    protected rank: string;      // Доступно в классе и подклассах

    constructor(name: string, secret: string, rank: string) {
        this.name = name;
        this.secret = secret;
        this.rank = rank;
    }

    getInfo(): string {
        return `${this.name}, ${this.secret}, ${this.rank}`;
    }
}

class EliteAgent extends BaseAgent {
    constructor(name: string, secret: string, rank: string) {
        super(name, secret, rank);
    }

    getRank(): string {
        return this.rank; // protected свойство доступно
        // return this.secret; // Ошибка: Property 'secret' is private and only accessible within class 'BaseAgent'
    }
}

const eliteBond = new EliteAgent("James Bond", "Classified", "Commander");
console.log(eliteBond.name); // "James Bond"
console.log(eliteBond.getRank()); // "Commander"
// console.log(eliteBond.secret); // Ошибка: Property 'secret' is private
console.log(eliteBond.getInfo()); // "James Bond, Classified, Commander"

// 5. ВЫЗОВ МЕТОДОВ РОДИТЕЛЯ ЧЕРЕЗ SUPER
// Используем super для доступа к родительским методам
class Operative extends Agent {
    constructor(name: string, id: number, private mission: string) {
        super(name, id);
    }

    report(): string {
        const baseReport = super.report(); // Вызов родительского метода
        return `${baseReport} for ${this.mission}`;
    }
}

const operativeBond = new Operative("James Bond", 7, "GF");
console.log(operativeBond.report()); // "James Bond reporting for GF"

// 6. НАСЛЕДОВАНИЕ И ИНТЕРФЕЙСЫ
// Класс может наследовать и реализовать интерфейс
interface SpySkills {
    infiltrate(): string;
}

class MasterSpy extends Agent implements SpySkills {
    constructor(name: string, id: number) {
        super(name, id);
    }

    infiltrate(): string {
        return `${this.name} infiltrating silently`;
    }
}

const masterBond = new MasterSpy("James Bond", 7);
console.log(masterBond.infiltrate()); // "James Bond infiltrating silently"
console.log(masterBond.getCode()); // "Agent-7"

// 7. ПРАКТИЧЕСКИЙ ПРИМЕР С НАСЛЕДОВАНИЕМ
// Сценарий: управление миссией агента с разными ролями
class MissionAgent {
    constructor(public name: string, protected missionCode: string) {}

    startMission(): string {
        return `${this.name} starting ${this.missionCode}`;
    }
}

class GadgetAgent extends MissionAgent {
    private gadgets: string[] = [];

    constructor(name: string, missionCode: string) {
        super(name, missionCode);
    }

    addGadget(gadget: string): void {
        this.gadgets.push(gadget);
    }

    startMission(): string {
        const baseStart = super.startMission();
        return `${baseStart} with gadgets: ${this.gadgets.join(", ") || "none"}`;
    }
}

class EliteSpy extends GadgetAgent {
    constructor(name: string, missionCode: string, private codename: string) {
        super(name, missionCode);
    }

    infiltrate(): string {
        return `${this.codename} infiltrating ${this.missionCode}`;
    }
}

const elite007 = new EliteSpy("James Bond", "GF", "007");
elite007.addGadget("Walther PPK");
console.log(elite007.startMission()); // "James Bond starting GF with gadgets: Walther PPK"
console.log(elite007.infiltrate()); // "007 infiltrating GF"

// 8. ОШИБКИ И ОГРАНИЧЕНИЯ
// Неправильное использование super
class WrongSpy extends Agent {
    constructor(name: string, id: number) {
        // super(name, id); // Ошибка: Must call super constructor in derived class before accessing 'this'
        console.log(this.name); // Будет ошибка, если не вызвать super
    }
}

// Попытка доступа к private свойству
class BaseWithPrivate {
    private secret = "classified";
}
class Derived extends BaseWithPrivate {
    // getSecret() { return this.secret; } // Ошибка: Property 'secret' is private
}

// Итог: Основы наследования в классах включают:
// - extends для создания подклассов
// - super для вызова родительского конструктора и методов
// - переопределение методов для изменения поведения
// - модификаторы доступа для контроля наследования
// - совместимость с интерфейсами для добавления контрактов
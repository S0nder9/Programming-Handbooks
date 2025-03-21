// 042-создание-функциональности-при-помощи-классов-классы.ts

// Этот раздел объясняет, как классы в TypeScript используются для создания функциональности,
// включая синтаксис, свойства, методы, наследование и интерфейсы.

// 1. БАЗОВЫЙ СИНТАКСИС КЛАССА
// Класс как шаблон для создания объектов с функциональностью
class Agent {
    // Поля (свойства)
    id: number;
    name: string;

    // Конструктор для инициализации
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    // Метод
    getCode(): string {
        return `Agent-${this.id}`;
    }
}
const bond = new Agent(7, "James Bond");
console.log(bond.getCode()); // "Agent-7"
console.log(bond.name); // "James Bond"

// 2. МОДИФИКАТОРЫ ДОСТУПА
// public, private, protected для контроля доступа
class Spy {
    public name: string;         // Доступно везде
    private id: number;          // Доступно только внутри класса
    protected codename: string;  // Доступно в классе и наследниках

    constructor(name: string, id: number, codename: string) {
        this.name = name;
        this.id = id;
        this.codename = codename;
    }

    getDetails(): string {
        return `${this.name} (${this.id}, ${this.codename})`;
    }
}
const spyBond = new Spy("James Bond", 7, "007");
console.log(spyBond.name); // "James Bond"
// console.log(spyBond.id); // Ошибка: Property 'id' is private
console.log(spyBond.getDetails()); // "James Bond (7, 007)"

// 3. СОКРАЩЁННЫЙ СИНТАКСИС КОНСТРУКТОРА
// Автоматическое создание свойств через параметры конструктора
class Gadget {
    constructor(public name: string, private type: "weapon" | "vehicle") {}

    use(): string {
        return `${this.name} (${this.type}) activated`;
    }
}
const gun = new Gadget("Walther PPK", "weapon");
console.log(gun.name); // "Walther PPK"
// console.log(gun.type); // Ошибка: Property 'type' is private
console.log(gun.use()); // "Walther PPK (weapon) activated"

// 4. НАСЛЕДОВАНИЕ КЛАССОВ
// Расширение функциональности через extends
class SecretAgent extends Spy {
    constructor(name: string, id: number, codename: string) {
        super(name, id, codename); // Вызов конструктора родителя
    }

    // Переопределение метода
    getDetails(): string {
        return `${this.name} (Code: ${this.codename})`; // Доступ к protected codename
    }

    // Новый метод
    infiltrate(): string {
        return `${this.name} infiltrating`;
    }
}
const secretBond = new SecretAgent("James Bond", 7, "007");
console.log(secretBond.getDetails()); // "James Bond (Code: 007)"
console.log(secretBond.infiltrate()); // "James Bond infiltrating"

// 5. ИНТЕРФЕЙСЫ С КЛАССАМИ
// Класс реализует интерфейс как контракт
interface Operative {
    name: string;
    executeMission(): string;
}
class FieldAgent implements Operative {
    constructor(public name: string) {}

    executeMission(): string {
        return `${this.name} on mission`;
    }
}
const fieldBond = new FieldAgent("James Bond");
console.log(fieldBond.executeMission()); // "James Bond on mission"

// 6. СТАТИЧЕСКИЕ СВОЙСТВА И МЕТОДЫ
// Доступны без создания экземпляра
class MissionControl {
    static activeMissions: number = 0; // Статическое свойство

    constructor(public code: string) {
        MissionControl.activeMissions++;
    }

    static getMissionCount(): number { // Статический метод
        return MissionControl.activeMissions;
    }
}
const mission1 = new MissionControl("GF");
const mission2 = new MissionControl("SF");
console.log(MissionControl.getMissionCount()); // 2

// 7. АБСТРАКТНЫЕ КЛАССЫ
// Базовый класс, который нельзя инстанцировать напрямую
abstract class BaseAgent {
    constructor(public name: string) {}

    abstract getRole(): string; // Абстрактный метод, требует реализации

    greet(): string { // Обычный метод
        return `Hello, I'm ${this.name}`;
    }
}
class FieldSpy extends BaseAgent {
    getRole(): string {
        return "Field Spy";
    }
}
// const base = new BaseAgent("Bond"); // Ошибка: Cannot create an instance of an abstract class
const fieldSpy = new FieldSpy("James Bond");
console.log(fieldSpy.getRole()); // "Field Spy"
console.log(fieldSpy.greet()); // "Hello, I'm James Bond"

// 8. ПРАКТИЧЕСКИЙ ПРИМЕР С ФУНКЦИОНАЛЬНОСТЬЮ
// Сценарий: управление миссией агента
interface GadgetItem {
    name: string;
    use(): string;
}

class SpyGadget implements GadgetItem {
    constructor(public name: string, private power: number) {}

    use(): string {
        return `${this.name} used (Power: ${this.power})`;
    }
}

class SpyMission extends SecretAgent {
    private gadgets: SpyGadget[] = [];

    constructor(name: string, id: number, codename: string, private missionCode: string) {
        super(name, id, codename);
    }

    addGadget(gadget: SpyGadget): void {
        this.gadgets.push(gadget);
    }

    execute(): string {
        const gadgetActions = this.gadgets.map(g => g.use()).join(", ");
        return `${this.getDetails()} executing ${this.missionCode} with ${gadgetActions || "no gadgets"}`;
    }
}

const spy007 = new SpyMission("James Bond", 7, "007", "GF");
const gunGadget = new SpyGadget("Walther PPK", 50);
const carGadget = new SpyGadget("Aston Martin DB5", 200);
spy007.addGadget(gunGadget);
spy007.addGadget(carGadget);
console.log(spy007.execute()); 
// "James Bond (Code: 007) executing GF with Walther PPK used (Power: 50), Aston Martin DB5 used (Power: 200)"

// 9. ДОБАВЛЕНИЕ GETTERS И SETTERS
// Управление доступом к свойствам
class SecureAgent {
    private _code: string;

    constructor(public name: string, code: string) {
        this._code = code;
    }

    get code(): string {
        return this._code;
    }

    set code(value: string) {
        if (value.length >= 3) {
            this._code = value;
        } else {
            throw new Error("Code must be at least 3 characters");
        }
    }
}
const secureBond = new SecureAgent("James Bond", "007");
console.log(secureBond.code); // "007"
secureBond.code = "008"; // Корректно
console.log(secureBond.code); // "008"
// secureBond.code = "00"; // Ошибка: Code must be at least 3 characters

// Итог: Классы позволяют создавать функциональность через:
// - свойства и методы
// - модификаторы доступа (public, private, protected)
// - наследование и интерфейсы
// - статические элементы и абстрактные классы
// - геттеры и сеттеры
// 051-шаблоны-проектирования-в-typescript-генерация-случайных-данных.ts

// Этот раздел демонстрирует применение шаблонов проектирования в TypeScript
// для генерации случайных данных, таких как имена агентов, коды миссий и гаджеты.

// 1. ШАБЛОН STRATEGY ДЛЯ ГЕНЕРАЦИИ СЛУЧАЙНЫХ ДАННЫХ
// Strategy позволяет выбирать алгоритм генерации данных
interface RandomGenerator {
    generate(): string;
}

class RandomNameGenerator implements RandomGenerator {
    private names: string[] = ["James Bond", "Ethan Hunt", "Jason Bourne", "Natasha Romanoff"];

    generate(): string {
        const index = Math.floor(Math.random() * this.names.length);
        return this.names[index];
    }
}

class RandomCodeGenerator implements RandomGenerator {
    generate(): string {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        const randomNumber = Math.floor(Math.random() * 100);
        return `${randomLetter}${randomNumber}`;
    }
}

class RandomGadgetGenerator implements RandomGenerator {
    private gadgets: string[] = ["Walther PPK", "Jetpack", "Smoke Grenade", "Laser Watch"];

    generate(): string {
        const index = Math.floor(Math.random() * this.gadgets.length);
        return this.gadgets[index];
    }
}

// 2. ШАБЛОН FACTORY ДЛЯ СОЗДАНИЯ ОБЪЕКТОВ С ГЕНЕРАЦИЕЙ
// Factory использует стратегии для создания сущностей с случайными данными
interface Agent {
    name: string;
    execute(): string;
}

class SpyAgent implements Agent {
    constructor(public name: string, private gadget: string) {}

    execute(): string {
        return `${this.name} using ${this.gadget}`;
    }
}

interface Mission {
    code: string;
    agent: Agent;
    brief(): string;
}

class SpyMission implements Mission {
    constructor(public code: string, public agent: Agent) {}

    brief(): string {
        return `${this.code}: ${this.agent.execute()}`;
    }
}

class EntityFactory {
    private nameGen: RandomGenerator;
    private codeGen: RandomGenerator;
    private gadgetGen: RandomGenerator;

    constructor() {
        this.nameGen = new RandomNameGenerator();
        this.codeGen = new RandomCodeGenerator();
        this.gadgetGen = new RandomGadgetGenerator();
    }

    createAgent(): Agent {
        const name = this.nameGen.generate();
        const gadget = this.gadgetGen.generate();
        return new SpyAgent(name, gadget);
    }

    createMission(): Mission {
        const code = this.codeGen.generate();
        const agent = this.createAgent();
        return new SpyMission(code, agent);
    }

    // Позволяет заменить стратегию генерации (гибкость)
    setNameGenerator(generator: RandomGenerator): void {
        this.nameGen = generator;
    }

    setCodeGenerator(generator: RandomGenerator): void {
        this.codeGen = generator;
    }

    setGadgetGenerator(generator: RandomGenerator): void {
        this.gadgetGen = generator;
    }
}

// 3. ПРИМЕР ИСПОЛЬЗОВАНИЯ С ГЕНЕРАЦИЕЙ СЛУЧАЙНЫХ ДАННЫХ
const factory = new EntityFactory();

// Генерация случайного агента
const agent1 = factory.createAgent();
console.log(agent1.execute()); // Например: "James Bond using Jetpack"

// Генерация случайной миссии
const mission1 = factory.createMission();
console.log(mission1.brief()); // Например: "A42: Ethan Hunt using Smoke Grenade"

// Создание кастомной стратегии
class CustomNameGenerator implements RandomGenerator {
    generate(): string {
        return `Agent-${Math.floor(Math.random() * 1000)}`;
    }
}

factory.setNameGenerator(new CustomNameGenerator());
const agent2 = factory.createAgent();
console.log(agent2.execute()); // Например: "Agent-742 using Laser Watch"

// 4. ПРАКТИЧЕСКИЙ ПРИМЕР: ГЕНЕРАЦИЯ СПИСКА МИССИЙ
class MissionControl {
    private missions: Mission[] = [];

    constructor(private factory: EntityFactory) {}

    generateMissions(count: number): void {
        for (let i = 0; i < count; i++) {
            this.missions.push(this.factory.createMission());
        }
    }

    listMissions(): string[] {
        return this.missions.map(m => m.brief());
    }
}

const control = new MissionControl(factory);
control.generateMissions(3);
const missionList = control.listMissions();
console.log(missionList);
// Пример вывода:
// [
//   "B17: Agent-123 using Walther PPK",
//   "K89: Agent-456 using Jetpack",
//   "X34: Agent-789 using Smoke Grenade"
// ]

// 5. ИНТЕГРАЦИЯ С ВЕБ-ПРИЛОЖЕНИЕМ (ДЛЯ Parcel)
// Добавим вывод в DOM (предполагается запуск с Parcel)
const app = document.getElementById("app");
if (app) {
    missionList.forEach(mission => {
        app.innerHTML += `<p>${mission}</p>`;
    });
}

// Экспорт для модульности (опционально)
export {};

// Настройка запуска с Parcel:
// 1. Создайте проект: `npm init -y`
// 2. Установите зависимости: `npm install --save-dev parcel typescript`
// 3. Создайте `tsconfig.json`:
// {
//   "compilerOptions": {
//     "target": "ESNext",
//     "module": "ESNext",
//     "strict": true
//   }
// }
// 4. Создайте `index.html`:
// <!DOCTYPE html>
// <html>
//   <body>
//     <h1>Random Missions</h1>
//     <div id="app"></div>
//     <script type="module" src="./index.ts"></script>
//   </body>
// </html>
// 5. Запустите: `npx parcel index.html`
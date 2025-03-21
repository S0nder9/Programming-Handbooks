// 050-шаблоны-проектирования-в-typescript-структура-проекта.ts

// Этот раздел демонстрирует структуру проекта в TypeScript с использованием шаблонов проектирования,
// включая организацию файлов, модулей и применение паттернов Singleton, Factory и Observer.

// Рекомендуемая структура проекта:
// project-root/
// ├── src/                    # Исходный код
// │   ├── models/            # Модели данных и сущности
// │   │   ├── agent.ts      # Классы и интерфейсы агентов
// │   │   └── mission.ts    # Классы и интерфейсы миссий
// │   ├── factories/        # Фабрики для создания объектов
// │   │   └── agentFactory.ts
// │   ├── services/         # Сервисы и бизнес-логика
// │   │   └── missionControl.ts
// │   └── index.ts          # Точка входа
// ├── tsconfig.json         # Конфигурация TypeScript
// ├── package.json          # Зависимости и скрипты
// └── index.html            # HTML для запуска (если веб-приложение)

// 1. ФАЙЛ: src/models/agent.ts
// Моделирование агента с интерфейсом и базовым классом
interface Agent {
    name: string;
    execute(): string;
}

class BaseAgent implements Agent {
    constructor(public name: string) {}
    execute(): string {
        return `${this.name} executing mission`;
    }
}

class StealthAgent extends BaseAgent {
    execute(): string {
        return `${this.name} executing in stealth mode`;
    }
}

// 2. ФАЙЛ: src/models/mission.ts
// Модель миссии с поддержкой Observer
class Mission {
    private observers: ((status: string) => void)[] = [];
    private status: string = "pending";

    constructor(public code: string) {}

    subscribe(observer: (status: string) => void): void {
        this.observers.push(observer);
    }

    setStatus(status: string): void {
        this.status = status;
        this.notify();
    }

    private notify(): void {
        this.observers.forEach(observer => observer(this.status));
    }

    getStatus(): string {
        return `${this.code}: ${this.status}`;
    }
}

// 3. ФАЙЛ: src/factories/agentFactory.ts
// Фабрика для создания агентов (Factory Pattern)
class AgentFactory {
    static createAgent(type: "base" | "stealth", name: string): Agent {
        switch (type) {
            case "base": return new BaseAgent(name);
            case "stealth": return new StealthAgent(name);
            default: throw new Error("Unknown agent type");
        }
    }
}

// 4. ФАЙЛ: src/services/missionControl.ts
// Singleton для управления миссиями
class MissionControl {
    private static instance: MissionControl;
    private agents: Agent[] = [];
    private missions: Mission[] = [];

    private constructor() {}

    static getInstance(): MissionControl {
        if (!MissionControl.instance) {
            MissionControl.instance = new MissionControl();
        }
        return MissionControl.instance;
    }

    deployAgent(agent: Agent, mission: Mission): string {
        this.agents.push(agent);
        this.missions.push(mission);
        return `${agent.name} deployed to ${mission.code}`;
    }

    updateMissionStatus(missionCode: string, status: string): void {
        const mission = this.missions.find(m => m.code === missionCode);
        if (mission) mission.setStatus(status);
    }

    getActiveAgents(): number {
        return this.agents.length;
    }
}

// 5. ФАЙЛ: src/index.ts
// Точка входа приложения
import { AgentFactory } from "./factories/agentFactory";
import { Mission } from "./models/mission";
import { MissionControl } from "./services/missionControl";

// Создание экземпляров
const control = MissionControl.getInstance();
const bond = AgentFactory.createAgent("stealth", "James Bond");
const missionGF = new Mission("GF");

// Подписка на обновления миссии
missionGF.subscribe(status => {
    console.log(`Mission Update: ${status}`);
    const app = document.getElementById("app");
    if (app) app.innerHTML += `<p>${status}</p>`;
});

// Использование функциональности
console.log(control.deployAgent(bond, missionGF)); // "James Bond deployed to GF"
console.log(bond.execute()); // "James Bond executing in stealth mode"
control.updateMissionStatus("GF", "active"); // "Mission Update: active"
console.log(control.getActiveAgents()); // 1

// Экспорт для модульности (опционально)
export {};

// 6. НАСТРОЙКА TSConfig (tsconfig.json)
// {
//   "compilerOptions": {
//     "target": "ESNext",
//     "module": "ESNext",
//     "strict": true,
//     "outDir": "./dist",
//     "rootDir": "./src"
//   },
//   "include": ["src/**/*"]
// }

// 7. НАСТРОЙКА package.json
// {
//   "scripts": {
//     "start": "parcel index.html",
//     "build": "parcel build index.html"
//   },
//   "devDependencies": {
//     "parcel": "^2.12.0",
//     "typescript": "^5.4.2"
//   }
// }

// 8. HTML-ФАЙЛ: index.html
// <!DOCTYPE html>
// <html>
//   <body>
//     <h1>Spy Agency</h1>
//     <div id="app"></div>
//     <script type="module" src="./src/index.ts"></script>
//   </body>
// </html>

// Инструкции по запуску:
// 1. Инициализируйте проект: `npm init -y`
// 2. Установите зависимости: `npm install --save-dev parcel typescript`
// 3. Создайте структуру файлов как указано выше
// 4. Запустите приложение: `npm start`
// 5. Откройте браузер на http://localhost:1234 (или другой порт, указанный Parcel)
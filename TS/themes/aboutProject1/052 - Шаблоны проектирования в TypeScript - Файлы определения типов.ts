// 052-шаблоны-проектирования-в-typescript-файлы-определения-типов.ts

// Этот раздел демонстрирует применение шаблонов проектирования в TypeScript
// с использованием файлов определения типов (.d.ts) для описания интерфейсов и типов.

// Структура проекта:
// project-root/
// ├── src/
// │   ├── factories/          # Фабрики
// │   │   └── agentFactory.ts
// │   ├── models/            # Модели
// │   │   └── agent.ts
// │   ├── services/          # Сервисы
// │   │   └── missionControl.ts
// │   ├── types/             # Файлы определения типов
// │   │   └── index.d.ts     # Основной файл типов
// │   └── index.ts           # Точка входа
// ├── tsconfig.json
// ├── package.json
// └── index.html

// 1. ФАЙЛ: src/types/index.d.ts
// Определение типов и интерфейсов для повторного использования
/*
declare namespace SpyAgency {
    interface Agent {
        name: string;
        execute(): string;
    }

    interface Mission {
        code: string;
        brief(): string;
    }

    interface AgentFactory {
        createAgent(type: "field" | "stealth", name: string): Agent;
    }

    interface MissionControl {
        deployAgent(agent: Agent, mission: Mission): string;
        getAgentCount(): number;
    }
}
*/

// 2. ФАЙЛ: src/models/agent.ts
// Реализация моделей с использованием типов из .d.ts
class FieldAgent implements SpyAgency.Agent {
    constructor(public name: string) {}
    execute(): string {
        return `${this.name} on field mission`;
    }
}

class StealthAgent implements SpyAgency.Agent {
    constructor(public name: string) {}
    execute(): string {
        return `${this.name} in stealth mode`;
    }
}

class SpyMission implements SpyAgency.Mission {
    constructor(public code: string) {}
    brief(): string {
        return `Mission ${this.code} active`;
    }
}

// 3. ФАЙЛ: src/factories/agentFactory.ts
// Фабрика с типами из .d.ts
class AgentFactory implements SpyAgency.AgentFactory {
    createAgent(type: "field" | "stealth", name: string): SpyAgency.Agent {
        switch (type) {
            case "field": return new FieldAgent(name);
            case "stealth": return new StealthAgent(name);
            default: throw new Error("Unknown agent type");
        }
    }
}

// 4. ФАЙЛ: src/services/missionControl.ts
// Singleton-сервис с типами из .d.ts
class MissionControl implements SpyAgency.MissionControl {
    private static instance: MissionControl;
    private agents: SpyAgency.Agent[] = [];
    private missions: SpyAgency.Mission[] = [];

    private constructor() {}

    static getInstance(): MissionControl {
        if (!MissionControl.instance) {
            MissionControl.instance = new MissionControl();
        }
        return MissionControl.instance;
    }

    deployAgent(agent: SpyAgency.Agent, mission: SpyAgency.Mission): string {
        this.agents.push(agent);
        this.missions.push(mission);
        return `${agent.name} deployed to ${mission.code}`;
    }

    getAgentCount(): number {
        return this.agents.length;
    }
}

// 5. ФАЙЛ: src/index.ts
// Точка входа приложения
import { AgentFactory } from "./factories/agentFactory";
import { SpyMission } from "./models/agent";
import { MissionControl } from "./services/missionControl";

// Использование типов из .d.ts
const factory: SpyAgency.AgentFactory = new AgentFactory();
const control: SpyAgency.MissionControl = MissionControl.getInstance();

const bond = factory.createAgent("stealth", "James Bond");
const missionGF = new SpyMission("GF");

console.log(control.deployAgent(bond, missionGF)); // "James Bond deployed to GF"
console.log(bond.execute()); // "James Bond in stealth mode"
console.log(control.getAgentCount()); // 1

// Интеграция с DOM (для Parcel)
const app = document.getElementById("app");
if (app) {
    app.innerHTML = `<p>${bond.execute()}</p><p>${missionGF.brief()}</p>`;
}

// Экспорт для модульности
export {};

// 6. НАСТРОЙКА tsconfig.json
// {
//   "compilerOptions": {
//     "target": "ESNext",
//     "module": "ESNext",
//     "strict": true,
//     "outDir": "./dist",
//     "rootDir": "./src",
//     "typeRoots": ["./src/types"]
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

// 8. ФАЙЛ: index.html
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
// 3. Создайте структуру файлов как указано
// 4. Создайте файл `src/types/index.d.ts` с типами
// 5. Запустите: `npm start`
// 6. Откройте http://localhost:1234 в браузере
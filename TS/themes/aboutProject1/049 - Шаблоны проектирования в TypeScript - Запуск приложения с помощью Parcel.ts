// 049-шаблоны-проектирования-в-typescript-запуск-приложения-с-помощью-parcel.ts

// Этот раздел демонстрирует применение шаблонов проектирования в TypeScript
// и настройку запуска приложения с использованием Parcel.

// npx parcel index.html

// Предварительные шаги для запуска с Parcel:
// 1. Установите Node.js (если не установлен)
// 2. Инициализируйте проект: `npm init -y`
// 3. Установите Parcel: `npm install --save-dev parcel`
// 4. Установите TypeScript: `npm install --save-dev typescript`
// 5. Создайте файл `tsconfig.json` с базовой конфигурацией:
// {
//   "compilerOptions": {
//     "target": "ESNext",
//     "module": "ESNext",
//     "strict": true,
//     "outDir": "./dist"
//   }
// }
// 6. Создайте HTML-файл (index.html) с подключением скрипта:
// <!DOCTYPE html>
// <html>
//   <body>
//     <h1>Mission Control</h1>
//     <div id="app"></div>
//     <script type="module" src="./index.ts"></script>
//   </body>
// </html>
// 7. Запустите Parcel: `npx parcel index.html`

// 1. ШАБЛОН SINGLETON
// Управление единственным экземпляром центра миссий
class MissionControl {
    private static instance: MissionControl;

    private constructor() {}

    static getInstance(): MissionControl {
        if (!MissionControl.instance) {
            MissionControl.instance = new MissionControl();
        }
        return MissionControl.instance;
    }

    deployAgent(name: string): string {
        return `${name} deployed`;
    }
}

// 2. ШАБЛОН FACTORY
// Создание агентов с разными ролями
interface Agent {
    name: string;
    execute(): string;
}

class FieldAgent implements Agent {
    constructor(public name: string) {}
    execute(): string { return `${this.name} on field mission`; }
}

class StealthAgent implements Agent {
    constructor(public name: string) {}
    execute(): string { return `${this.name} in stealth mode`; }
}

class AgentFactory {
    static createAgent(type: "field" | "stealth", name: string): Agent {
        switch (type) {
            case "field": return new FieldAgent(name);
            case "stealth": return new StealthAgent(name);
            default: throw new Error("Unknown agent type");
        }
    }
}

// 3. ШАБЛОН OBSERVER
// Уведомление о статусе миссии
class Mission {
    private observers: ((status: string) => void)[] = [];
    private status: string = "pending";

    constructor(private code: string) {}

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

// 4. ПРИЛОЖЕНИЕ С ИСПОЛЬЗОВАНИЕМ ШАБЛОНОВ
// Основная логика приложения
const control = MissionControl.getInstance();
const bond = AgentFactory.createAgent("stealth", "James Bond");
const missionGF = new Mission("GF");

// Подписка на обновления миссии
missionGF.subscribe(status => {
    const app = document.getElementById("app");
    if (app) app.innerHTML += `<p>Mission Update: ${status}</p>`;
});

// Выполнение действий
console.log(control.deployAgent(bond.name)); // "James Bond deployed"
console.log(bond.execute()); // "James Bond in stealth mode"
missionGF.setStatus("active"); // Обновление в консоли и DOM
console.log(missionGF.getStatus()); // "GF: active"

// Экспортируем для использования в браузере (опционально)
export {};

// Дополнительные шаги для Parcel:
// 1. Убедитесь, что файл назван с расширением `.ts` (например, `index.ts`)
// 2. Запустите `npx parcel index.html` для сборки и запуска
// 3. Откройте браузер по адресу, указанному Parcel (обычно http://localhost:1234)
// Parcel автоматически обработает TypeScript, создаст bundle и обеспечит горячую перезагрузку
1. expo
2. npx create-expo-app@latest ./
3. npx expo start

Коннектим к приложению

---

## Структура проекта

1. tsconfig.json - настройки typescript
2. package.json - настройки проекта
3. app.json - настройки приложения
4. scripts - настройки скриптов
5. assets, hooks, components, constants - компоненты приложения
6. app - роуты (скрины) приложения

---

4. `npm run reset-project` - сброс проекта для быстрого старта

---

1. `npm i nativewind tailwindcss react-native-reanimated react-native-safe-area-context`

2. `npx tailwindcss init`
   меняем содержимое файла `./tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

3. @tailwind base;
   @tailwind components;
   @tailwind utilities;

4. Создаем в корне babel.config.js

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```

5. npx expo customize metro.config.js

6. заменяем на

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
```

7. импортируем в \_layout.tsx
   import "./globals.css";

8. в корне создаем nativewind-env.d.ts
   /// <reference types="nativewind/types" />

9. изменяем в metro на module.exports = withNativeWind(config, { input: './app/globals.css' })

10. npx expo start --clear

https://www.nativewind.dev/docs/getting-started/installation

---
Или
1. `npx create-expo-app .`
2. `npm run reset-project`
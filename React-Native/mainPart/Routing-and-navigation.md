## Роуты

Создаем файл onboarding.tsx в папке app

```tsx
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-dark-200 font-bold">Hi</Text>
      <Link href="/onboarding">onboarding</Link>
    </View>
  );
}
```

, а затем в index добавляем роут:

```tsx
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-dark-200 font-bold">Hi</Text>
      <Link href="/onboarding">onboarding</Link>
    </View>
  );
}
```

---

## Динамический роут

1. Создаем папку movie/[id].tsx

```tsx
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Details = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
```

2. Подключаем роут:

```tsx
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-dark-200 font-bold">Hi</Text>
      <Link href="/onboarding">onboarding</Link>
      <Link
        href={{
          pathname: "/movie/[id]",
          params: { id: "avengers" },
        }}
      >
        Movie: Avengers
      </Link>
    </View>
  );
}
```

---
## Группы роутов

Группы роутов позволяют организовать маршруты по логическим блокам без влияния на URL. Для этого используются папки в круглых скобках, например: (auth), (tabs).

Пример структуры:
app/
├── (auth)/
│ ├── login.tsx
│ └── signup.tsx
├── (main)/
│ ├── index.tsx
│ └── profile.tsx
└── _layout.tsx

Пути будут: /login, /signup, /, /profile — без префикса (auth) или (main).

Группы полезны для:

Разных layout’ов (например, отдельный для авторизации и основного приложения).

Управления навигацией (например, табы только внутри (tabs)).

Логической организации кода.
Пример _layout.tsx внутри (auth):

```tsx
import { Stack } from "expo-router";

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

---
## РОУТЫ

https://icons.expo.fyi/Index - иконки
https://appwrite.io/ - сервис для хостинга бэкендов

`npx expo install react-native-appwrite react-native-url-polyfill`

`npx expo install react-native-paper`
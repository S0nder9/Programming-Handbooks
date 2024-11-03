// Глава 20: Redux Persist - Сохранение и восстановление состояния Redux

// Redux Persist — это библиотека, которая помогает сохранять состояние хранилища Redux в локальном хранилище браузера (localStorage, sessionStorage) или в базе данных (например, AsyncStorage на мобильных устройствах).
// Это позволяет сохранять данные между сессиями, делая работу приложения более удобной для пользователя.

// Установка Redux Persist
// Для начала необходимо установить библиотеку в проект:
npm install redux-persist

// Основные шаги настройки Redux Persist:

// 1. Импортирование необходимых функций и создание конфигурации
// Redux Persist требует инициализации, где мы настраиваем способ хранения данных.
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Выбираем storage (localStorage по умолчанию)

// Конфигурация для Redux Persist
const persistConfig = {
    key: 'root', // Ключ для хранения данных
    storage, // Указываем storage (localStorage или sessionStorage)
    whitelist: ['auth', 'user'] // Массив редьюсеров, которые должны сохраняться
};

// 2. Создание persistReducer для rootReducer
// Redux Persist использует обертку persistReducer для сохранения определённых данных из корневого редьюсера.
import rootReducer from './reducers'; // Импортируем корневой редьюсер

const persistedReducer = persistReducer(persistConfig, rootReducer); // Создаем persistReducer

// 3. Настройка хранилища Redux с использованием persistedReducer
// Здесь мы создаем хранилище с добавленным persistedReducer.
import { createStore } from 'redux';

const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Интеграция с Redux DevTools
);

// 4. Настройка Persistor для запуска сохранения и восстановления состояния
// Persistor — это объект, который запускает процессы синхронизации и очистки хранилища.
import { persistStore } from 'redux-persist';

const persistor = persistStore(store); // Инициализируем persistor

// Теперь store и persistor можно использовать в приложении.


// Интеграция с React-приложением
// Чтобы Redux Persist корректно работал в React, нужно использовать компонент PersistGate от библиотеки react-redux.

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Компонент для контроля восстановления данных

import App from './App';

ReactDOM.render(
    <Provider store={store}>
        {/* PersistGate позволяет дождаться восстановления данных перед рендерингом приложения */}
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// Структура Reducers и Пример
// С помощью Redux Persist можно сохранять часть или все состояние Redux. Ниже приведен пример, как сохранить только отдельные редьюсеры.

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({
    auth: authReducer, // Будет сохранен благодаря whitelist
    user: userReducer, // Будет сохранен благодаря whitelist
    settings: settingsReducer // Не будет сохранен
});

export default rootReducer;


// Конфигурация Persistence с использованием черного списка (Blacklist)
// В Redux Persist можно использовать blacklist вместо whitelist, если нужно сохранить большинство редьюсеров, исключив некоторые.
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['settings'] // 'settings' не будет сохранен
};

// Перезагрузка и сброс состояния
// Redux Persist позволяет перезагрузить и сбросить состояние хранилища, что может быть полезно, например, при выходе пользователя.

persistor.purge(); // Очищает все сохраненные данные
persistor.persist(); // Повторно сохраняет состояние, если оно было приостановлено

// Пример использования: сброс состояния при выходе
const logoutUser = () => (dispatch) => {
    persistor.purge(); // Очищаем данные при выходе
    dispatch({ type: 'USER_LOGOUT' });
};

// Настройки синхронизации: управление состоянием в разных вкладках
// Redux Persist поддерживает функцию синхронизации состояния в разных вкладках браузера. Это полезно, если требуется, чтобы изменение состояния в одной вкладке отражалось в другой.

import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const webStorage = createWebStorage('local');
const persistConfig = {
    key: 'root',
    storage: webStorage,
    synchronize: true // Включаем синхронизацию
};

// Примеры для React Native и других сред
// Redux Persist поддерживает использование других хранилищ, например AsyncStorage, что делает его полезным для приложений React Native.

import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

// Полезные функции и параметры
// - `key`: Ключ для хранения состояния (например, 'root').
// - `storage`: Выбор хранилища (например, `localStorage`, `sessionStorage` или `AsyncStorage`).
// - `whitelist`: Массив редьюсеров, которые должны быть сохранены.
// - `blacklist`: Массив редьюсеров, которые не должны быть сохранены.
// - `timeout`: Время в миллисекундах, в течение которого Redux Persist ожидает завершения синхронизации.


// Итог:
// Redux Persist упрощает работу с состоянием в приложениях, делая их более устойчивыми к перезагрузкам и разрыву соединения. 
// Он позволяет управлять сохранением и восстановлением данных, а также настраивать поведение хранилища для повышения удобства и безопасности.